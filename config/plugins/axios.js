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

        if (window) {
            const token = window.localStorage.getItem('token') // получаем токен из локалсториджа
            const authorizationToken = token ? `token ${token}` : '' // формируем токен в виде строки
            if(authorizationToken) {
                config.headers.Authorization = authorizationToken // положили в хедеры токен
            }
        }

        return config;
    });
};
