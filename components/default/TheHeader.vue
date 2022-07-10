<template>
    <header :class="$style.headerMain">
        <svg-icon name="logoHeader"
                  :class="$style.headerLogo"
        />
    </header>
</template>

<script>
export default {
    name: 'TheHeader',
};
</script>

<style lang="scss" module>
    .headerMain {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        padding: 1rem;
    }

    .headerLogo {
        display: block;
        height: 5rem;
    }
</style>
