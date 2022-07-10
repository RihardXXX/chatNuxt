import qs from 'qs';

export default ({ $config, $axios, req }) => {
    $axios.defaults.xsrfCookieName = 'csrftoken';
    $axios.defaults.xsrfHeaderName = 'X-CSRFToken';

    const headers = req && req.headers ? Object.assign({}, req.headers) : {};

    $axios.setHeader('X-Forwarded-Host', headers['x-forwarded-host']);
    $axios.setHeader('X-Forwarded-Port', headers['x-forwarded-port']);
    $axios.setHeader('X-Forwarded-Proto', headers['x-forwarded-proto']);

    $axios.onRequest(config => {
        config.paramsSerializer = params => qs.stringify(Object.fromEntries(Object.entries(params).filter(p => p[1] !== null)), { arrayFormat: 'repeat' });

        return config;
    });
};
