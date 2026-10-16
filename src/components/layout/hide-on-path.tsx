"use client";

import { usePathname } from "next/navigation";
import { Suspense } from "react";

function Gate({ paths, children }: { paths: readonly string[]; children: React.ReactNode }) {
  const pathname = usePathname();
  return paths.includes(pathname) ? null : children;
}

/**
 * Renders server-rendered children everywhere except on the given paths.
 * Suspense keeps prerendering possible on routes whose pathname is only known at request time.
 */
export function HideOnPath({ paths, children }: { paths: readonly string[]; children: React.ReactNode }) {
  return (
    <Suspense fallback={children}>
      <Gate paths={paths}>{children}</Gate>
    </Suspense>
  );
}
