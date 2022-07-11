<template>
    <div :class="$style.DefaultLayout">

        <TheModal :class="$style.modal" />

        <!--        <TheHeader />-->

        <main :class="$style.page">
            <Nuxt />
        </main>

    </div>
</template>

<script>
import TheModal from '@/components/default/TheModal';
// import TheHeader from '~/components/default/TheHeader';
export default {
    name: 'Default',
    components: {
        TheModal,
        // TheHeader,
    },
};
</script>

<style lang="scss" module>
    .DefaultLayout {
        width: 100%;
        height: 100%;
    }

    .page {
        width: 100%;
        height: 100%;
    }

    .modal {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 5;
    }
</style>
