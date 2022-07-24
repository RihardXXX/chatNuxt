<template>
    <div :class="$style.IndexPage">
        <Welcome v-if="!isLoggedIn" />
        <div v-else
             :class="$style.container"
        >
            <nuxt-link to="/chat">перейти в комнату для общения</nuxt-link>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import Welcome from '~/components/welcome/Welcome';

export default {
    name: 'IndexPage',

    components: {
        Welcome,
    },

    head() {
        return {
            title: 'главная',
            meta: [
                // hid is used as unique identifier. Do not use `vmid` for it as it will not work
                {
                    hid: 'description',
                    name: 'description',
                    content: 'главная страница приложения',
                },
            ],
        };
    },

    computed: {
        ...mapState('authorization', [
            'isLoggedIn',
        ]),
    },
};
</script>

<style lang="scss" module>
    .IndexPage {
        width: 100%;
        height: 100%;
    }

    .container {
        width: 100%;
        height: 100%;
        background-color: $gray-700;
    }
</style>
