"use client";

import { Link, usePathname } from "../navigation";

export function LocaleSwitcher() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Language"
      className="flex items-center gap-1 text-sm font-cocomat font-bold text-white"
    >
      <Link
        href={{ pathname }}
        locale="es"
        className="opacity-70 hover:opacity-100"
      >
        ES
      </Link>
      <span className="opacity-40">／</span>
      <Link
        href={{ pathname }}
        locale="en"
        className="opacity-70 hover:opacity-100"
      >
        EN
      </Link>
    </nav>
  );
}
