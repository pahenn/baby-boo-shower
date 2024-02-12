// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  extends: ["@nuxt/ui-pro"],
  modules: [
    "@nuxt/content",
    "@nuxt/image",
    "@nuxt/ui",
    "@nuxtjs/fontaine",
    "@nuxtjs/google-fonts",
    "@vueuse/nuxt",
    "nuxt-og-image",
    "nuxt-icon",
    "@nuxtjs/tailwindcss",
  ],
  hooks: {
    // Define `@nuxt/ui` components as global to use them in `.md` (feel free to add those you need)
    "components:extend": (components) => {
      const globals = components.filter((c) =>
        ["UButton"].includes(c.pascalName)
      )

      globals.forEach((c) => (c.global = true))
    },
  },
  routeRules: {
    "/api/search.json": { prerender: true },
    "/docs": { redirect: "/docs/getting-started", prerender: false },
  },
  colorMode: {
    preference: "light",
  },
  runtimeConfig: {
    GOOGLE_SERVICE_ACCOUNT_CREDENTIALS_BASE64: "",
    public: {
      directusUrl: "",
    },
  },
})
