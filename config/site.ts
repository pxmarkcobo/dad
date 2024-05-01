export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "Death Aid Directory",
  description: "Platform for managing death aid members.",
  mainNav: [
    {
      title: "Dashboard",
      href: "/dashboard",
    },
    {
      title: "Registration",
      href: "/registration",
    },
  ],
  links: {
    twitter: "https://twitter.com/shadcn",
    github: "https://github.com/shadcn/ui",
    docs: "https://ui.shadcn.com",
  },
}
