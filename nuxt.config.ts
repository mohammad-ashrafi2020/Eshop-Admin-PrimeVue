// https://nuxt.com/docs/api/configuration/nuxt-config
import Lara from "@primevue/themes/aura";
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: false },
  modules: ["@primevue/nuxt-module","@pinia/nuxt"],
  css: ["~/assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  primevue: {
    options: {
      theme: {
        preset: Lara,
        options: {
          darkModeSelector: "light",
        },
      },
    },
  },
});
