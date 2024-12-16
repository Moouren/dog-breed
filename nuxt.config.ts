export default defineNuxtConfig({
  modules: ["@nuxt/ui", "@nuxtjs/tailwindcss", "@nuxtjs/color-mode"],
  components: true,
  devtools: { enabled: true },
  colorMode: {
    classSuffix: "",
  },
  compatibilityDate: "2024-04-03",
});
