import commonModules from './config/modules/commonModules';
import prodModules from './config/modules/prodModules';

const nuxtProdConfig = {
    modules: [
        ...commonModules,
        ...prodModules,
    ],

    // Sentry config
    sentry: {
        dsn: process.env.SENTRY_DSN || false,
    },

    // Polyfills
    polyfill: {
        features: [],
    },
};

export default nuxtProdConfig;
