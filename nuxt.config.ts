import { defineNuxtConfig } from "nuxt/config";

const isProduction = process.env.NODE_ENV === "production";

const locales = [
  {
    code: "en",
    iso: "en-US",
    file: "en.json",
    name: "English",
    flag: "US",
  },
  {
    code: "nl",
    iso: "nl-NL",
    file: "nl.json",
    name: "Nederlands",
    flag: "NL",
  },
  {
    code: "de",
    iso: "de-DE",
    file: "de.json",
    name: "Deutsch",
    flag: "DE",
  },
  {
    code: "es",
    iso: "es-ES",
    file: "es.json",
    name: "Español",
    flag: "ES",
  },
  {
    code: "fr",
    iso: "fr-FR",
    file: "fr.json",
    name: "Français",
    flag: "FR",
  },
  {
    code: "it",
    iso: "it-IT",
    file: "it.json",
    name: "Italiano",
    flag: "IT",
  },
];

const BASE_URL = isProduction
  ? "https://www.simpleanalytics.com"
  : "http://localhost:3005";

const env = {
  NODE_ENV: process.env.NODE_ENV,
  BASE_URL,
  MAIN_URL: isProduction
    ? "https://simpleanalytics.com"
    : "http://localhost:3000",
  CDN_URL:
    process.env.DEPLOYING === "true"
      ? "https://www-cdn.simpleanalytics.com"
      : undefined,
  LOCALES: locales,
};

const privateKeys = {
  deploying: process.env.DEPLOYING === "true",
  strapiToken: process.env.STRAPI_TOKEN,
  trelloPersonalKey: process.env.TRELLO_PERSONAL_KEY,
  trelloPersonalToken: process.env.TRELLO_PERSONAL_TOKEN,
};

// https://nuxt.com/docs/migration/configuration/#nuxtconfig
export default defineNuxtConfig({
  runtimeConfig: {
    // Private keys are only available on the server
    ...privateKeys,

    // Public keys that are exposed to the client
    public: env,
  },
  experimental: {
    treeshakeClientOnly: true,
  },
  app: {
    baseURL: "/",
    buildAssetsDir: "/_nuxt/",
    cdnURL: env.CDN_URL,
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
    },
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
      "postcss-hover-media-feature": {},
    },
  },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/i18n",
    "nuxt-runtime-compiler",
    "nuxt-schema-org",
    "nuxt-simple-sitemap",
  ],
  sitemap: {
    autoAlternativeLangPrefixes: ["de", "nl", "fr", "it", "es"],
    xslColumns: [
      { label: 'URL', width: '50%' },
      { label: 'Last Modified', select: 'sitemap:lastmod', width: '25%' },
      { label: 'Hreflangs', select: 'count(xhtml)', width: '15%' },
    ],
  },
  schemaOrg: { host: BASE_URL },
  i18n: {
    vueI18n: './i18n.config.ts'
  },
  nitro: {
    timing: false,
  },
});
