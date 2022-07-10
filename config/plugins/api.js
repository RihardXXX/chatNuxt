import apiConfig from '~/config/apiConfig';

export default (ctx, inject) => {
    ctx.$api = apiConfig;
    inject('api', apiConfig);
};
