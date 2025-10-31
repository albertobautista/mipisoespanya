import { routing } from "@/i18n/routing";

type AppPathname = keyof typeof routing.pathnames;

type MenuKey = "home" | "our-story" | "reviews" | "faqs";

export const menuItems = [
  { id: "home", href: "/" },
  { id: "our-story", href: "/our-story" },
  { id: "reviews", href: "/reviews" },
  { id: "faqs", href: "/faqs" },
] as const satisfies ReadonlyArray<{ id: MenuKey; href: AppPathname }>;
