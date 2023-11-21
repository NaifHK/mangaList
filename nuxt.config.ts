// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@vueuse/nuxt',
    'nuxt-icon',
    '@nuxt/ui',
    '@pinia/nuxt',
    '@formkit/auto-animate/nuxt',
  ],

})