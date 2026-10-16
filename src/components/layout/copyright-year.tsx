import { cacheLife } from "next/cache";

/**
 * The current year for the copyright line. Reading the clock during render is not allowed
 * with Cache Components, so the value is cached and refreshed daily in the background.
 */
export async function CopyrightYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}
