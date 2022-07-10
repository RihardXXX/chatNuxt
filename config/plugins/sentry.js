export default (ctx, inject) => {
    const sentry = {
        captureException() {
            return false;
        },
    };

    ctx.$sentry = ctx.$sentry || sentry;
    inject('sentry', ctx.$sentry || sentry);
};
