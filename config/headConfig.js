import {
    faviconsLinks,
    faviconsMeta,
} from './head/favicons';

const headConfig = {
    htmlAttrs: { lang: 'ru' },

    // TODO: Set site title
    title: 'Site title',

    // Head meta
    meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },

        // TODO: Set site description
        { hid: 'description', name: 'description', content: 'Site description' },

        // Favicons
        ...faviconsMeta,
    ],

    // Head links
    link: [
        // Fonts
        {
            rel: 'stylesheet',
            // href: 'https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400;700&display=swap',
            href: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap',
        },

        // Favicons
        ...faviconsLinks,
    ],

    __dangerouslyDisableSanitizers: ['script', 'noscript'],
};

export default headConfig;
