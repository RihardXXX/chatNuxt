<template>
    <div :class="$style.startContainer">
        <div :class="$style.helloSection">
            приложение загружается...
        </div>
    </div>
</template>

<script>

export default {
    name: 'StartPage',
};

</script>

<style lang="scss" module>
    .startContainer {
        position: relative;
        width: 100%;
        height: 100%;
    }

    .helloSection {
        position: absolute;
        top: 50%;
        left: 50%;
        text-align: center;
        //text-transform: uppercase;
        font-size: 2.2rem;
        font-weight: 700;
        transform: translate(-50%, -50%);
    }

</style>
