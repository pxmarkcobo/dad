export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "Death Aid Directory",
  description: "Platform for managing death aid members.",
  mainNav: [
    {
      title: "Home",
      href: "/home",
    },
    {
      title: "Register",
      href: "/register",
    },
    {
      title: "Officers",
      href: "/officers",
    },
    {
      title: "Settings",
      href: "/settings",
    },
  ],
  links: {
    twitter: "https://twitter.com/shadcn",
    github: "https://github.com/shadcn/ui",
    docs: "https://ui.shadcn.com",
  },
}
