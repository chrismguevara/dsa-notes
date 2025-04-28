import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import mdx from "@mdx-js/rollup";
import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";

export default defineConfig({
  // https://vite.dev/guide/build.html#relative-base
  // Need to handle the basepath for GitHub Pages
  base: process.env.NODE_ENV === "development" ? "/" : "/dsa-notes/",
  plugins: [tailwindcss(), mdx({
    remarkPlugins: [remarkGfm, remarkFrontmatter, remarkMdxFrontmatter],
    rehypePlugins: [[rehypePrettyCode, {
      getLineNumbers() {
        return true;
      }
    }]],
  }), reactRouter(), tsconfigPaths()],
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: "globalThis",
      },
      plugins: [NodeGlobalsPolyfillPlugin({
        buffer: true,
      })],
    },
  },
});
