// constants.ts
export type MenuKey = "home" | "our-story" | "reviews" | "faqs";

export const menuItems: Array<{ id: MenuKey; href: string }> = [
  { id: "home", href: "/" },
  { id: "our-story", href: "/our-story" },
  { id: "reviews", href: "/reviews" },
  { id: "faqs", href: "/faqs" },
];
