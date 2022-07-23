const pluginsConfig = [
    '~/config/plugins/axios.js',
    '~/config/plugins/api.js',
    '~/config/plugins/filters.js',
    '~/config/plugins/modal.js',
    '~/config/plugins/sentry.js',
    { src: '~/config/plugins/socket.client.js', ssr: false },
    // { src: '~/config/plugins/swiper.js', mode: 'client' },
];

export default pluginsConfig;
