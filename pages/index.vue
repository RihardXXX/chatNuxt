<template>
    <div :class="$style.IndexPage">
        <Welcome v-if="!isLoggedIn" />
        <RoomList v-else />
    </div>
</template>

<script>
import { mapState } from 'vuex';
import Welcome from '~/components/welcome/Welcome';
import RoomList from '~/components/main/RoomList';

export default {
    name: 'IndexPage',

    components: {
        Welcome,
        RoomList,
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
</style>
