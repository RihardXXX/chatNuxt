import nuxtDevConfig from './nuxt.dev.config';
import nuxtProdConfig from './nuxt.prod.config';

// require('dotenv').config();

import headConfig from './config/headConfig';
import pluginsConfig from './config/pluginsConfig';

const env = {
    SERVER_API_URL: process.env.SERVER_API_URL,
    CLIENT_API_URL: process.env.CLIENT_API_URL,
    HTTPS_KEY: process.env.HTTPS_KEY,
    HTTPS_CERT: process.env.HTTPS_CERT,
    DEVELOPMENT: process.env.NODE_ENV === 'development',
};

const isDev = process.env.NODE_ENV === 'development';

// process.env.PORT и process.env.BASE_URL берутся из файла .env

module.exports = {
    // Указываем порт, на котором будет работать приложение.
    server: {
        port: process.env.PORT,
        host: 'localhost',
    },

    env: {
        baseUrl: process.env.BASE_URL,
    },
    // /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // MAIN SECTION
    // /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // mode: 'universal',

    ssr: true,
    target: 'server',

    // Server settings
    // server: {
    //     port: 3000,
    //     host: '0.0.0.0',
    //     https: env.HTTPS_KEY && env.HTTPS_CERT
    //         ? {
    //             key: fs.readFileSync(path.resolve(__dirname, env.HTTPS_KEY)),
    //             cert: fs.readFileSync(path.resolve(__dirname, env.HTTPS_CERT)),
    //         }
    //         : null,
    // },


    render: {
        http2: {
            push: true,
        },
    },

    // Router settings
    router: {
        linkActiveClass: '--active-link',
        linkExactActiveClass: '--exact-link',
    },

    // Customize the progress-bar color
    loading: {
        color: '#FF4963',
        failedColor: '#ffcfcf',
        height: '20px',
        duration: 2000,
    },


    // Head section
    head: headConfig,

    // Plugins
    plugins: pluginsConfig,

    ...isDev ? nuxtDevConfig : nuxtProdConfig,

    // /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // MODULES SECTION
    // /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Axios && proxy
    axios: {
        progress: false,
        baseURL: env.SERVER_API_URL || '',
        browserBaseURL: env.CLIENT_API_URL || '',
        credentials: 'include',
    },

    // serverMiddleware: [
    //     { path: '/server', handler: '~/server/index.js' },
    // ],

    // Global CSS
    css: ['~/assets/scss/vendors.scss', '~/assets/scss/bundle.scss'],

    styleResources: {
        scss: '~/assets/scss/shared/*.scss',
    },

    // /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // BUILD SECTION
    // /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    build: {
        publicPath: '/n/',

        analyze: isDev,

        // Set libraries to transpile by babel
        transpile: !isDev && [],

        // You can extend webpack config here
        babel: {},

        // Terser settings
        terser: !isDev && {
            terserOptions: {
                mangle: {
                    safari10: true,
                },
            },
        },

        // Postcss settings
        postcss: !isDev && {
            preset: {
                autoprefixer: {
                    grid: true,
                },
            },
        },

        extend(config, ctx) {
            // Fixes npm packages that depend on `fs` module
            config.node = {
                fs: 'empty',
            };
        },
    },
};

export default {
    vue: {
        config: {
            productionTip: true,
            devtools: false,
        },
    },
};
