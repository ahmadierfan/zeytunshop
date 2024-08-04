export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: 'server',


  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    htmlAttrs: {
      lang: 'fa',
      dir: 'rtl'
    },
    title: 'فروشگاه زیتون شاپ |‌ خرید زیتون خارجی و روغن زیتون خارجی',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'format-detection', content: 'telephone=no' },
      { hid: 'description', name: 'description', content: 'فروشگاه اینترنتی زیتون شاپ، مرجع فروش محصولات اصیل زیتون با یسش از 20 سال سابقه در بازار بزرگ تهران' },
      { hid: 'og:description', name: 'og:description', property: 'og:description', content: 'فروشگاه اینترنتی زیتون شاپ، مرجع فروش محصولات اصیل زیتون' },
    ],
    link: [
      { rel: 'alternate', hreflang: 'fa-ir', href: 'https://www.zeytunshop.com/' },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }
    ]
  },

  loading: {
    color: '#41b518',
    height: '5px'
  },

  //Set middlewere
  router: {
    middleware: ['redirects']
  },

  auth: {
    strategies: {
      'laravelJWT': {
        provider: 'laravel/jwt',
        url: 'https://laraapi.zeytunshop.com',
        endpoints: {
          login: { url: '/api/auth/login', method: 'post' },
          logout: { url: '/api/logout', method: 'post' },
          refresh: { url: '/api/auth/refresh', method: 'post' },
          user: { url: '/api/auth/user-profile', method: 'get' }
        },
        token: {
          property: 'access_token',
          maxAge: 60 * 600
        },
        refreshToken: {
          maxAge: 20160 * 600
        },
      }
    },
    redirect: {
      login: '/login',
      logout: '/',
      callback: '/login',
      //home: '/panel/'
    }

  },

  // Global CSS (https://go.nuxtjs.dev/config-css)

  css: [
    '@/assets/css/bulma-rtl.min.css',
    '@/assets/scss/main.scss',
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    { src: '~plugins/vuelayers.js', ssr: false },
    '~/plugins/axios',
    '~/plugins/toast.js',
    //{ src: "@/plugins/hotjar", mode: "client" },
  ],


  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: {
    dirs: [
      '~/components',
    ]
  },

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    //https://auth.nuxtjs.org/
    '@nuxtjs/auth-next',
  ],

  buildModules: [
    '@nuxtjs/device',
  ],

  pwa: {
    icon: {
      fileName: 'img/zeytunshop-white-logo.png'
    },
  },

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    baseURL: "https://laraapi.zeytunshop.com/api/"
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    postcss: false,
    extractCSS: true,
    publicPath: 'zeytunshop',
  }
}
