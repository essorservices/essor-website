/**
 * Paper, fastening and placement of each sticky note, in the order of `notes` in content.
 * On the collage a later note only overlaps the right-hand strip of an earlier one,
 * which stays empty (labels are kept narrower than the note), so nothing is hidden.
 * `spot` places the note on the desktop collage (percent of the board), `tilt` is its
 * rotation there; `tiltSm` is the calmer rotation used in the 2 × 2 grid below lg.
 */
export type NotePaper = "white" | "sky" | "coral" | "blue";
export type NoteFastener = "tape" | "pin";

export type NoteStyle = {
  paper: NotePaper;
  fastener: NoteFastener;
  tilt: number;
  tiltSm: number;
  spot: { left: string; top: string };
};

export const noteStyles: NoteStyle[] = [
  { paper: "white", fastener: "tape", tilt: -6, tiltSm: -3, spot: { left: "0%", top: "1%" } },
  { paper: "sky", fastener: "pin", tilt: 5, tiltSm: 2.5, spot: { left: "45%", top: "13%" } },
  { paper: "coral", fastener: "pin", tilt: 3, tiltSm: 2, spot: { left: "5%", top: "50%" } },
  { paper: "blue", fastener: "tape", tilt: -4.5, tiltSm: -2.5, spot: { left: "45%", top: "62%" } },
];

/** Face colour, and the darker tone of the folded corner. */
export const paperClasses: Record<NotePaper, { face: string; fold: string }> = {
  white: { face: "bg-white", fold: "bg-sky-200" },
  sky: { face: "bg-sky", fold: "bg-sky-300" },
  coral: { face: "bg-coral-100", fold: "bg-coral-200" },
  blue: { face: "bg-sky-200", fold: "bg-sky-300" },
};
