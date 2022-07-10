// TODO: Set favicons

const faviconsLinks = [
    {
        rel: 'icon',
        href: '/favicons/favicon.ico',
    },
    {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/favicons/apple-touch-icon.png',
    },
    {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicons/favicon-32x32.png',
    },
    {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicons/favicon-16x16.png',
    },
    {
        rel: 'manifest',
        href: '/favicons/site.webmanifest',
        crossorigin: 'use-credentials',
    },
    {
        rel: 'mask-icon',
        href: '/favicons/safari-pinned-tab.svg',
        color: '#f2aaaa',
    },
];

const faviconsMeta = [
    {
        name: 'msapplication-TileColor',
        content: '#282828',
    },
    {
        name: 'theme-color',
        content: '#ffffff',
    },
];

export { faviconsLinks, faviconsMeta };
