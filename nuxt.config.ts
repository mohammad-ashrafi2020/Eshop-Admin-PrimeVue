// https://nuxt.com/docs/api/configuration/nuxt-config
import Lara from "@primevue/themes/lara";
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: false },
  modules: ["@primevue/nuxt-module"],
  primevue: {
    /* Configuration */
    options: {
      theme: {
        preset: Lara,
      },
      ripple:true
    },
  },
});
