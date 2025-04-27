import type { Config } from "@react-router/dev/config";

export default {
  // Config options...
  // Need to handle the basepath for GitHub Pages
  basename: import.meta.env.DEV ? "/" : "/dsa-notes/",
  // Server-side render by default, to enable SPA mode set this to `false`
  ssr: false,
} satisfies Config;
