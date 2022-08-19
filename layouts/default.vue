<template>
    <div :class="$style.DefaultLayout">

        <TheModal :class="$style.modal" />

        <StartPage v-if="step === 1" />

        <main :class="$style.page">
            <Nuxt v-if="step === 2" />
        </main>

        <TheHeader v-if="isLoggedIn && step === 2" />
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import StartPage from '~/components/common/StartPage';
import TheModal from '@/components/default/TheModal';
import TheHeader from '~/components/default/TheHeader';

export default {
    name: 'Default',

    components: {
        StartPage,
        TheModal,
        TheHeader,
    },

    data() {
        return {
            step: 1,
        };
    },

    computed: {
        ...mapState('authorization', [
            'isLoggedIn',
        ]),
    },

    mounted() {
        this.$nextTick(() => {
            this.$nuxt.$loading.start();
            setTimeout(() => {
                this.$nuxt.$loading.finish();
                this.step = 2;
            }, 2000);
        });
    },

    beforeMount() {
        this.authUser();
    },

    methods: {
        ...mapActions('authorization', [
            'authUser',
        ]),
    },
};
</script>

<style lang="scss" module>
    .DefaultLayout {
        overflow: hidden;
        width: 100%;
        height: 100%;
    }

    .page {
        width: 100%;
        height: 80vh;
    }

    .modal {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 1111;
    }
</style>
