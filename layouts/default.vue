<template>
    <div :class="$style.DefaultLayout">

        <TheModal :class="$style.modal" />

        <main :class="$style.page">
            <Nuxt />
        </main>

        <TheHeader v-if="isLoggedIn" />
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import TheModal from '@/components/default/TheModal';
import TheHeader from '~/components/default/TheHeader';
export default {
    name: 'Default',

    components: {
        TheModal,
        TheHeader,
    },

    computed: {
        ...mapState('authorization', [
            'isLoggedIn',
        ]),
    },

    mounted() {
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
