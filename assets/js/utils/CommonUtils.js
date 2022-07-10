export function getFontSize() {
    const html = window.document.documentElement;
    const style = window.getComputedStyle(html, null).getPropertyValue('font-size');
    return parseFloat(style);
}

export function lockBody() {
    if (!process.browser) {
        return false;
    }

    // const paddingWidth = window.innerWidth - document.body.offsetWidth;

    document.documentElement.style.height = '100%';
    document.body.style.height = '100%';
    document.body.style.overflow = 'hidden';
    // document.body.style.position = 'fixed';
    // document.body.style.paddingRight = `${paddingWidth}px`;
}

export function unlockBody() {
    if (!process.browser) {
        return false;
    }

    document.documentElement.style.height = null;
    document.body.style.height = null;
    document.body.style.overflow = null;
    document.body.style.position = null;
    document.body.style.paddingRight = null;
}

export function convertToObject(data) {
    const result = {};
    data.forEach(item => {
        if (item.choices) {
            result[item.name] = [...item.choices];
        }
        if (item.range) {
            result[item.name] = { ...item.range };
        }
        if (item.ranges) {
            result[item.name] = { ...item.ranges };
        }
    });

    return result;
}

export function isIe() {
    const ua = process.browser ? window?.navigator?.userAgent : '';
    const msie = ua.indexOf('MSIE ') > 0 || Boolean(ua.match(/Trident.*rv:11\./));

    return msie > 0;
}

export function cleanPhone(prettyPhoneNumber) {
    return prettyPhoneNumber.replace(/ |-|\(|\)|_/g, '');
}
