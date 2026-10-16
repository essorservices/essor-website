import type { FlowIconName } from "./copy";

export type MockIconName =
  | FlowIconName
  | "heart"
  | "comment"
  | "send"
  | "bookmark"
  | "more"
  | "camera"
  | "music"
  | "home"
  | "bag"
  | "user"
  | "chevron"
  | "lock"
  | "menu"
  | "search"
  | "check"
  | "arrow"
  | "pin";

export const mockIconPath: Record<MockIconName, string> = {
  heart: "M12 20.5S3.5 15.4 3.5 9.2A4.7 4.7 0 0 1 12 6.6a4.7 4.7 0 0 1 8.5 2.6c0 6.2-8.5 11.3-8.5 11.3Z",
  comment: "M20.5 11.6a8.4 8.4 0 0 1-12.4 7.4L3.5 20.5l1.5-4.4a8.4 8.4 0 1 1 15.5-4.5Z",
  send: "M21 3.5 10.4 13.6M21 3.5l-6.6 17-4-6.9-6.9-4Z",
  bookmark: "M6.5 3.8h11v16.7L12 16.4l-5.5 4.1Z",
  more: "M5.5 12h.01M12 12h.01M18.5 12h.01",
  camera: "M4 8.5h3.2L9 6h6l1.8 2.5H20v10.5H4ZM12 16.4a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z",
  music: "M9 18V5.5l10-2V16M9 18a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm10-2a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z",
  home: "M4 10.5 12 4l8 6.5V20h-5.5v-5.5h-5V20H4Z",
  calendar: "M4.5 6.5h15v13h-15ZM4.5 10.5h15M8.5 4v4M15.5 4v4",
  bag: "M5 8h14l-1 12H6ZM9 8V6.5a3 3 0 0 1 6 0V8",
  user: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM4.5 20.5a7.5 7.5 0 0 1 15 0",
  chevron: "m9.5 6 6 6-6 6",
  lock: "M7 11h10v8.5H7ZM9 11V8.5a3 3 0 0 1 6 0V11",
  menu: "M4 8h16M4 16h16",
  search: "M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14ZM20 20l-4-4",
  check: "m5.5 12.5 4 4 9-9",
  arrow: "M5 12h13M13 6.5l5.5 5.5-5.5 5.5",
  pin: "M12 21s6.5-6.1 6.5-11a6.5 6.5 0 0 0-13 0c0 4.9 6.5 11 6.5 11ZM12 12.2a2.2 2.2 0 1 0 0-4.4 2.2 2.2 0 0 0 0 4.4Z",
  bolt: "M13 3 5.5 13.5H12L11 21l7.5-10.5H12Z",
  message: "M4 5.5h16v11H9l-5 3.5Z",
  clock: "M12 20.5a8.5 8.5 0 1 0 0-17 8.5 8.5 0 0 0 0 17ZM12 7.5V12l3 2",
  stamp: "M9.5 3.5h5v5.2l2.5 3.3H7l2.5-3.3ZM4.5 12h15v4h-15ZM7 20h10",
  branch: "M6 4v16M6 12c0-4 4-5 8-5h4M15 4l3 3-3 3M6 12c0 4 4 5 8 5h4M15 14l3 3-3 3",
  bell: "M6 16.5V11a6 6 0 0 1 12 0v5.5l1.5 2h-15ZM10 20.5a2 2 0 0 0 4 0",
  tag: "M3.5 12.2V4.5h7.7l9.3 9.3-7.7 7.7ZM8 9a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1Z",
  star: "M12 3.5 14.4 9l5.6.4-4.3 3.6 1.4 5.5L12 15.5l-5.1 3 1.4-5.5L4 9.4 9.6 9Z",
  mail: "M4 6h16v12H4ZM4 7l8 6 8-6",
};

/** Small UI glyph for the mockups. Stroke follows currentColor; `filled` paints it solid. */
export function MockIcon({
  name,
  className,
  filled = false,
  strokeWidth = 1.9,
}: {
  name: MockIconName;
  className?: string;
  filled?: boolean;
  strokeWidth?: number;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={name === "more" ? 3.2 : strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      focusable="false"
    >
      <path d={mockIconPath[name]} />
    </svg>
  );
}
