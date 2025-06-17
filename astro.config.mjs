// @ts-check
import { defineConfig } from "astro/config";

import sitemap from "@astrojs/sitemap";

import tailwindcss from "@tailwindcss/vite";

import react from "@astrojs/react";

import addClasses from "rehype-add-classes";

export default defineConfig({
  site: "https://example.com",
  integrations: [sitemap(), react()],
  markdown: {
    rehypePlugins: [
      [
        addClasses,
        {
          h1: "text-4xl font-bold font-proxima-soft",
          h2: "text-2xl font-bold font-proxima-soft",
          h3: "text-xl font-bold font-proxima-soft",
          h4: "text-lg font-bold font-proxima-soft",
          h5: "font-bold font-proxima-soft",
          h6: "font-bold font-proxima-soft",
          img: "border border-slate-300 dark:border-zinc-700 rounded-xl mb-6",
          p: "mb-6",
          a: 'underline underline-offset-2 hover:text-orange-500 decoration-orange-500'
        },
      ],
    ],
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
