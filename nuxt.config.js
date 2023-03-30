// import language from './config/language';

const nodeEnv = process.env.NODE_ENV;
const baseUrl = process.env.BASE_URL || 'https://fakestoreapi.com/'; // add dev url here
const host = process.env.NUXT_HOST || '0.0.0.0';
const port = process.env.NUXT_PORT || 3000;

// Polyfills: https://polyfill.io/v3/url-builder/
// const features = ['NodeList.prototype.forEach'].join('%2C');

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'nuxt-boilerplate',
    htmlAttrs: {
      lang: 'ru',
    },
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: ''},

    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
      {rel: 'stylesheet', href: '/css/index.css'},
      // Preload fonts
      // {
      //   rel: 'preload',
      //   as: 'font',
      //   crossorigin: 'crossorigin',
      //   type: 'font/woff2',
      //   href: '/fonts/HyundaiSansHead.woff2',
      // },
    ],
    // script: [
    //   { src: `https://polyfill.io/v3/polyfill.min.js?features=${features}` }, // Polyfills
    // ],
  },

  // https://nuxtjs.org/docs/2.x/features/loading
  loading: false,

  // https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-server
  server: {host, port},

  // Env variables: https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-env
  // env: {
  //   someKey: process.env.SOME_KEY,
  // },

  // Router: https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-router
  mode: 'static',
  generate: {
    fallback: true,
  },
  router: {
    base: '/nuxt-product-catalog/',
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/scss/app.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/axios',
    '@/plugins/device',
    '@/plugins/helpers',
    '@/plugins/global',
    '@/plugins/ui',
    '@/plugins/typograf',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  // components: true,

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios', // https://axios.nuxtjs.org/
    '@nuxtjs/proxy', // https://github.com/nuxt-community/proxy-module
    '@nuxtjs/device', // https://github.com/nuxt-community/device-module
    // '@nuxtjs/google-gtag', // https://github.com/nuxt-community/google-gtag-module
    // 'nuxt-i18n', // https://i18n.nuxtjs.org/
  ],

  axios: {
    baseURL: baseUrl,
    proxy: nodeEnv === 'development',
    // headers: {
    //   accept: 'application/json',
    // },
  },

  proxy: {
    '/api': {
      target: baseUrl,
    },
  },

  device: {
    refreshOnResize: true,
  },

  // 'google-gtag': {
  //   id: 'UA-XXXX-XX',
  //   config: {
  //     // anonymize_ip: true, // anonymize IP
  //   },
  //   debug: nodeEnv === 'development', // enable to track in dev mode
  //   // disable if you don't want to track each page route with router.afterEach(...).
  //   disableAutoPageTrack: false,
  // },

  // i18n: {
  //   locales: ['ru', 'en'],
  //   defaultLocale: 'ru',
  //   strategy: 'prefix',
  //   vueI18n: {
  //     fallbackLocale: 'en',
  //     messages: language,
  //   },
  // },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    ['@nuxtjs/eslint-module', {cache: false}], // https://go.nuxtjs.dev/eslint
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    analyze: false,
    extractCSS: nodeEnv === 'production',
    cssSourceMap: nodeEnv === 'development',
    postcss: {
      preset: {
        autoprefixer: {
          grid: 'autoplace',
        },
      },
    },
    // transpile: [], // Transpile dependencies, example: 'swiper'
    babel: {
      presets({isServer}, [preset, options]) {
        return [
          [
            preset,
            {
              ...options,
              targets: isServer ? {node: '10'} : {ie: '11'},
            },
          ],
        ];
      },
    },
    extend(config) {
      config.module.rules
        .filter((r) => r.test.toString().includes('svg'))
        .forEach((r) => {
          r.test = /\.(png|jpe?g|gif)$/;
        });

      config.module.rules.push({
        test: /\.svg$/,
        loader: 'svg-loader',
        exclude: /node_modules/,
      });
    },
  },
};
