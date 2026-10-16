/**
 * essor : réception des briefs du site dans Google Sheets.
 *
 * Le site envoie chaque brief en JSON (POST) à ce script, publié en « Application Web ».
 * Le script vérifie le secret partagé, puis ajoute une ligne dans l'onglet « Briefs ».
 * Guide complet : docs/FORMULAIRE.md
 *
 * Réglage obligatoire : Paramètres du projet (roue dentée) > Propriétés du script >
 *   SECRET = la même valeur que la variable GOOGLE_SHEETS_SECRET du site.
 *
 * Après chaque modification de ce fichier : Déployer > Gérer les déploiements >
 *   (crayon) > Version : « Nouvelle version » > Déployer. L'URL reste la même.
 */

const SHEET_NAME = 'Briefs';

/** Colonnes, dans l'ordre. `key` = champ envoyé par le site (src/lib/brief/format.ts). */
const COLUMNS = [
  { key: 'date', title: 'Date', width: 140 },
  { key: 'name', title: 'Nom', width: 160 },
  { key: 'company', title: 'Entreprise', width: 180 },
  { key: 'sector', title: 'Secteur', width: 160 },
  { key: 'city', title: 'Ville', width: 120 },
  { key: 'needs', title: 'Besoins', width: 260 },
  { key: 'budget', title: 'Budget', width: 180 },
  { key: 'timeline', title: 'Délai', width: 150 },
  { key: 'description', title: 'Description', width: 420 },
  { key: 'email', title: 'E-mail', width: 220 },
  { key: 'phone', title: 'Téléphone', width: 160 },
  { key: 'source', title: 'Source', width: 140 },
];

/** Longueur maximale gardée par cellule (le site limite déjà la description à 3 000 caractères). */
const MAX_LENGTH = 5000;

function doPost(e) {
  try {
    const data = parseBody_(e);
    const secret = PropertiesService.getScriptProperties().getProperty('SECRET');
    if (!secret) return json_({ ok: false, error: 'missing SECRET script property' });
    if (!data || data.secret !== secret) return json_({ ok: false, error: 'unauthorized' });

    // Deux briefs envoyés en même temps ne doivent pas écrire sur la même ligne.
    // Moins de 10 s : au-delà, le site abandonne et la ligne arriverait en double au nouvel essai.
    const lock = LockService.getScriptLock();
    lock.waitLock(7000);
    try {
      const sheet = getSheet_();
      const row = COLUMNS.map(function (column) {
        // La date est celle de réception par le script : une vraie date, triable et filtrable.
        if (column.key === 'date') return new Date();
        // Le téléphone reste du texte : sinon « 0555… » perdrait son 0 et « +213… » serait lu comme un calcul.
        return cell_(data[column.key], column.key === 'phone');
      });
      sheet.appendRow(row);
      const last = sheet.getLastRow();
      sheet.getRange(last, 1).setNumberFormat('dd/MM/yyyy HH:mm');
      sheet.getRange(last, 1, 1, COLUMNS.length).setVerticalAlignment('top');
      SpreadsheetApp.flush();
    } finally {
      lock.releaseLock();
    }
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String((err && err.message) || err) });
  }
}

/** Ouvrir l'URL /exec dans un navigateur affiche ceci : pratique pour vérifier le déploiement. */
function doGet() {
  return json_({ ok: true, service: 'essor-briefs' });
}

/**
 * Test depuis l'éditeur : sélectionnez « testDoPost » puis « Exécuter ».
 * Une ligne d'exemple doit apparaître dans l'onglet « Briefs » (supprimez-la ensuite).
 */
function testDoPost() {
  const secret = PropertiesService.getScriptProperties().getProperty('SECRET');
  const sample = {
    secret: secret,
    name: 'Test essor',
    company: 'Entreprise test',
    sector: 'Café / coffee shop',
    city: 'Alger',
    needs: 'Branding & identité, Site web ou application',
    budget: 'Je ne sais pas encore',
    timeline: 'Pas de date précise',
    description: 'Ligne de test envoyée depuis l’éditeur Apps Script.',
    email: 'test@example.com',
    phone: '+213 000 00 00 00',
    source: 'Autre',
  };
  const out = doPost({ postData: { contents: JSON.stringify(sample) } });
  Logger.log(out.getContent());
}

function parseBody_(e) {
  if (!e || !e.postData || !e.postData.contents) return null;
  return JSON.parse(e.postData.contents);
}

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(COLUMNS.map(function (c) { return c.title; }));
    sheet
      .getRange(1, 1, 1, COLUMNS.length)
      .setFontWeight('bold')
      .setBackground('#0F1045')
      .setFontColor('#FFFFFF')
      .setVerticalAlignment('middle');
    sheet.setFrozenRows(1);
    sheet.setRowHeight(1, 32);
    COLUMNS.forEach(function (c, i) { sheet.setColumnWidth(i + 1, c.width); });
    // Les longues descriptions passent à la ligne au lieu de déborder.
    const description = COLUMNS.findIndex(function (c) { return c.key === 'description'; }) + 1;
    sheet.getRange(1, description, sheet.getMaxRows(), 1).setWrap(true);
  }
  return sheet;
}

/**
 * Texte saisi par un visiteur, rendu inoffensif : une valeur qui commence par = + - @
 * serait interprétée comme une formule par Google Sheets (injection de formule).
 * L'apostrophe initiale force le format texte ; Google Sheets ne l'affiche pas.
 */
function cell_(value, forceText) {
  let text = value === null || value === undefined ? '' : String(value);
  text = text.slice(0, MAX_LENGTH);
  if (text && (forceText || /^[=+\-@\t\r]/.test(text))) text = "'" + text;
  return text;
}

function json_(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(ContentService.MimeType.JSON);
}
