# Formulaire « Démarrer un projet » : mise en service

Ce guide explique comment brancher le formulaire de la page `/contact` pour que chaque brief envoyé par un client arrive :

1. **par e-mail** dans votre boîte (service **Resend**) ;
2. **dans un Google Sheet**, une ligne par brief (via un petit script **Google Apps Script**).

Les deux canaux fonctionnent en parallèle. Si l’un des deux tombe en panne, l’autre suffit : le client voit quand même « Brief reçu ». Si les deux échouent, le visiteur voit un message d’erreur et le contenu du brief est écrit dans les journaux Vercel, qui ne sont conservés que peu de temps (selon votre offre Vercel) : consultez-les rapidement, ou branchez une alerte (Log Drains / notifications).

Comptez **20 à 30 minutes** la première fois.

---

## Ce qu’il vous faut

- Un compte **Vercel** avec le projet du site déjà déployé.
- Un compte **Google** (celui de l’agence, de préférence).
- Une adresse e-mail où recevoir les briefs.
- Facultatif, mais recommandé : l’accès au **DNS de votre nom de domaine** (chez votre registrar : OVH, Hostinger, GoDaddy, Cloudflare…), pour envoyer les e-mails depuis votre propre domaine.

Les variables à renseigner sont listées dans le fichier `.env.example`, à la racine du projet.

---

## Étape 1 : l’e-mail avec Resend

### 1.1 Créer le compte et la clé API

1. Allez sur [resend.com](https://resend.com) et créez un compte **avec l’adresse qui doit recevoir les briefs** (important tant que le domaine n’est pas vérifié, voir plus bas).
2. Dans le menu, ouvrez **API Keys**, puis **Create API Key**.
3. Nom : `essor-site`. Permission : **Sending access**. Domaine : **All domains**.
4. Copiez la clé (elle commence par `re_`). Elle ne s’affiche qu’une fois : gardez-la dans un endroit sûr, ne l’envoyez jamais par messagerie.

Vous avez maintenant :

| Variable | Valeur |
|---|---|
| `RESEND_API_KEY` | la clé `re_…` |
| `BRIEF_TO_EMAIL` | l’adresse qui reçoit les briefs. Plusieurs adresses : séparez-les par des virgules, par exemple `contact@votre-domaine.com, equipe@votre-domaine.com` |

> **Sans domaine vérifié**, Resend envoie depuis son adresse de test `onboarding@resend.dev`, et **uniquement vers l’adresse du compte Resend**. C’est suffisant pour démarrer si `BRIEF_TO_EMAIL` est cette adresse-là.

### 1.2 (Recommandé) Vérifier votre domaine

C’est ce qui permet d’envoyer depuis `brief@votre-domaine.com`, d’arriver moins souvent dans les spams, d’envoyer à plusieurs adresses et d’activer l’accusé de réception au client.

1. Dans Resend, ouvrez **Domains**, puis **Add Domain**. Saisissez votre domaine (par exemple `votre-domaine.com`) et choisissez la région la plus proche (Europe).
2. Resend affiche plusieurs enregistrements DNS (type **TXT** et **MX**). Ajoutez-les **exactement** dans la zone DNS de votre domaine, chez votre registrar.
3. Revenez sur Resend et cliquez sur **Verify DNS Records**. La vérification prend de quelques minutes à quelques heures.
4. Une fois le domaine au statut **Verified**, renseignez :

| Variable | Valeur |
|---|---|
| `BRIEF_FROM_EMAIL` | `essor <brief@votre-domaine.com>` (l’adresse n’a pas besoin d’exister comme boîte) |
| `BRIEF_SEND_CONFIRMATION` | `true` pour que le client reçoive un e-mail « Votre brief est bien arrivé ». Laissez `false` tant que le domaine n’est pas vérifié. |

Quand vous recevez un brief, **répondez simplement à l’e-mail** : la réponse part directement au client (son adresse est en « Répondre à »).

---

## Étape 2 : le Google Sheet

### 2.1 Créer la feuille

1. Sur [sheets.google.com](https://sheets.google.com), créez une feuille vierge et nommez-la par exemple **« essor : briefs »**.
2. Pas besoin de créer d’onglet ni de colonnes : le script crée l’onglet **Briefs** et la ligne d’en-tête au premier brief :
   `Date | Nom | Entreprise | Secteur | Ville | Besoins | Budget | Délai | Description | E-mail | Téléphone | Source`

### 2.2 Coller le script

1. Dans la feuille, menu **Extensions > Apps Script**. Un éditeur s’ouvre dans un nouvel onglet.
2. Renommez le projet (en haut à gauche) : `essor briefs`.
3. Effacez tout le contenu du fichier `Code.gs`, puis collez **tout** le contenu du fichier `integrations/google-apps-script.gs` du projet.
4. Cliquez sur l’icône **Enregistrer** (disquette).

### 2.3 Définir le secret

Le secret empêche n’importe qui d’écrire dans votre feuille : seul le site le connaît.

1. Générez une longue chaîne aléatoire. Par exemple dans un terminal : `openssl rand -hex 32`, ou avec un générateur de mots de passe (40 caractères minimum, lettres et chiffres).
2. Dans l’éditeur Apps Script, cliquez sur la **roue dentée « Paramètres du projet »** (barre de gauche).
3. Tout en bas, section **Propriétés du script**, cliquez sur **Ajouter une propriété de script**.
4. Propriété : `SECRET`. Valeur : la chaîne générée. Cliquez sur **Enregistrer les propriétés du script**.

Gardez cette même valeur pour `GOOGLE_SHEETS_SECRET` (étape 3).

Facultatif : dans ces mêmes paramètres, réglez le **fuseau horaire** du projet. L’heure affichée dans la colonne Date suit le fuseau du classeur (**Fichier > Paramètres > Fuseau horaire** dans Google Sheets).

### 2.4 Tester depuis l’éditeur (facultatif, recommandé)

1. Revenez à l’éditeur (icône **< >**), choisissez la fonction **`testDoPost`** dans la liste déroulante en haut, puis **Exécuter**.
2. Google demande d’autoriser le script : **Examiner les autorisations**, choisissez votre compte. Si l’écran « Google n’a pas validé cette application » s’affiche, cliquez sur **Paramètres avancés**, puis **Accéder à essor briefs (non sécurisé)**, puis **Autoriser**. C’est normal : c’est votre propre script.
3. Le journal d’exécution doit afficher `{"ok":true}` et une ligne « Test essor » apparaît dans l’onglet **Briefs**. Supprimez-la ensuite.

### 2.5 Publier le script en application Web

1. En haut à droite : **Déployer > Nouveau déploiement**.
2. À côté de « Sélectionner le type », cliquez sur la roue dentée et choisissez **Application Web**.
3. Remplissez :
   - Description : `essor site`
   - **Exécuter en tant que : Moi** (votre adresse)
   - **Qui a accès : Tout le monde**
4. Cliquez sur **Déployer**, autorisez l’accès si Google le redemande.
5. Copiez l’**URL de l’application Web**. Elle ressemble à `https://script.google.com/macros/s/AKfy…/exec`.

> « Tout le monde » signifie que l’URL accepte des requêtes sans connexion Google. Elle reste protégée par le secret : sans lui, le script refuse d’écrire. Ne partagez ni l’URL ni le secret.

Vérification rapide : ouvrez l’URL dans votre navigateur. Vous devez voir `{"ok":true,"service":"essor-briefs"}`.

| Variable | Valeur |
|---|---|
| `GOOGLE_SHEETS_WEBHOOK_URL` | l’URL qui se termine par `/exec` |
| `GOOGLE_SHEETS_SECRET` | la même valeur que la propriété `SECRET` |

> **Si vous modifiez le script plus tard** : **Déployer > Gérer les déploiements**, cliquez sur le crayon, Version : **Nouvelle version**, puis **Déployer**. L’URL ne change pas. Sans cette étape, l’ancienne version continue de tourner.

---

## Étape 3 : les variables sur Vercel

1. Sur [vercel.com](https://vercel.com), ouvrez le projet du site, puis **Settings > Environment Variables**.
2. Ajoutez chaque variable ci-dessous. Cochez l’environnement **Production** (et **Preview** si vous voulez tester sur les liens de prévisualisation ; attention, les tests y enverront de vrais e-mails et de vraies lignes).
3. Les valeurs secrètes (`RESEND_API_KEY`, `GOOGLE_SHEETS_SECRET`) peuvent être marquées **Sensitive**.

| Variable | Obligatoire | Exemple |
|---|---|---|
| `RESEND_API_KEY` | pour l’e-mail | `re_123…` |
| `BRIEF_TO_EMAIL` | pour l’e-mail | `contact@votre-domaine.com` |
| `BRIEF_FROM_EMAIL` | non | `essor <brief@votre-domaine.com>` (par défaut `essor <onboarding@resend.dev>`) |
| `BRIEF_SEND_CONFIRMATION` | non | `true` ou `false` (par défaut `false`) |
| `BRIEF_TIMEZONE` | non | `Africa/Algiers` (par défaut `Europe/Paris`), heure affichée dans l’e-mail |
| `GOOGLE_SHEETS_WEBHOOK_URL` | pour le Sheet | `https://script.google.com/macros/s/…/exec` |
| `GOOGLE_SHEETS_SECRET` | pour le Sheet | la chaîne aléatoire |
| `NEXT_PUBLIC_SITE_URL` | non | `https://votre-domaine.com`, utilisée pour les liens dans les e-mails |

Il faut **au moins un canal complet** : `RESEND_API_KEY` + `BRIEF_TO_EMAIL`, ou `GOOGLE_SHEETS_WEBHOOK_URL` + `GOOGLE_SHEETS_SECRET`. Idéalement les deux.

4. **Redéployez** : les variables ne sont lues qu’au déploiement. Onglet **Deployments**, sur le dernier déploiement de production : menu **⋯ > Redeploy**.

---

## Étape 4 : tester en conditions réelles

1. Ouvrez `https://votre-domaine/contact` (de préférence en navigation privée).
2. Remplissez les quatre étapes avec vos propres coordonnées. Patientez quelques secondes avant d’envoyer (un envoi en moins de 3 secondes est refusé comme robot).
3. Vous devez voir « Brief reçu. », puis :
   - un e-mail « Nouveau brief : … » dans la boîte `BRIEF_TO_EMAIL` (regardez aussi les spams la première fois) ;
   - une nouvelle ligne dans l’onglet **Briefs** de la feuille ;
   - si `BRIEF_SEND_CONFIRMATION=true`, l’accusé de réception dans votre boîte de test.

---

## En cas de problème

Les erreurs sont écrites dans les journaux du serveur : sur Vercel, **Logs**, puis cherchez `[brief]`. Les messages ne contiennent jamais vos clés.

| Ce que vous voyez dans les journaux | Cause probable | Solution |
|---|---|---|
| `No delivery channel configured in production` | aucune variable lue | vérifiez les noms des variables, l’environnement coché (Production), puis **redéployez** |
| `Channel "email" failed: Resend: validation_error…` | expéditeur ou destinataire refusé | sans domaine vérifié, `BRIEF_TO_EMAIL` doit être l’adresse du compte Resend ; avec domaine, `BRIEF_FROM_EMAIL` doit utiliser ce domaine |
| `Channel "email" failed: Resend: …api_key…` | clé invalide ou révoquée | recréez une clé dans Resend et mettez à jour `RESEND_API_KEY` |
| `Channel "sheets" failed: … ok:false (unauthorized)` | secret différent | `GOOGLE_SHEETS_SECRET` (Vercel) et `SECRET` (Apps Script) doivent être identiques, sans espace |
| `… ok:false (missing SECRET script property)` | propriété absente | refaites l’étape 2.3 |
| `… HTML response …` | l’application Web n’est pas ouverte à « Tout le monde » | refaites l’étape 2.5 avec **Qui a accès : Tout le monde** |
| `… TimeoutError` | Google a mis plus de 10 secondes à répondre | souvent passager ; l’e-mail est parti quand même s’il est configuré |
| La ligne arrive mais les colonnes ont changé | ancienne version du script | **Gérer les déploiements > Nouvelle version** |

Côté visiteur, « Vous avez envoyé plusieurs briefs en peu de temps » signifie qu’une même connexion a envoyé plus de 5 briefs en 10 minutes (protection anti-abus, voir ci-dessous).

---

## Bon à savoir

**Anti-spam, sans captcha.** Trois protections invisibles pour les visiteurs :
- un champ caché que seuls les robots remplissent (le robot reçoit une fausse confirmation, rien n’est envoyé) ;
- un envoi moins de 3 secondes après l’ouverture de la page est refusé ;
- au maximum 5 briefs par connexion toutes les 10 minutes. Cette limite est gardée en mémoire par chaque serveur : sur Vercel, plusieurs serveurs peuvent coexister, elle ralentit donc un abus sans le bloquer à coup sûr. Si le spam devient un problème, on pourra brancher un stockage partagé (Upstash Redis) ou un captcha discret (Cloudflare Turnstile).

**Brouillon.** Les réponses en cours sont gardées dans le navigateur du visiteur (sur son appareil uniquement, jamais envoyées avant qu’il clique sur « Envoyer mon brief ») et effacées après l’envoi. Un lien « Tout effacer » est proposé sous le formulaire.

**Modifier les choix proposés.** Secteurs, besoins, budgets, délais et sources se modifient dans `src/content/brief.ts`. Le Sheet et l’e-mail reçoivent le **libellé** affiché (par exemple « 100 000 – 300 000 DA »), pas un code : pensez-y si vous filtrez la feuille sur ces valeurs.

**Données personnelles.** Les briefs sont conservés dans votre boîte mail, dans le Google Sheet et dans l’historique des envois de Resend. Limitez l’accès au Sheet à l’équipe, et gardez la page `/mentions-legales` à jour (rubrique « Données personnelles »).

**En local (développeurs).** Copiez `.env.example` en `.env.local`. Sans aucune variable, `npm run dev` affiche chaque brief dans le terminal au lieu de l’envoyer, pour tester le formulaire sans compte.
