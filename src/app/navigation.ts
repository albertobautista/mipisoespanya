// src/i18n/navigation.ts
import { routing } from "@/i18n/routing";
import { createNavigation } from "next-intl/navigation";

export const { Link, useRouter, usePathname, redirect, getPathname } =
  createNavigation(routing);
