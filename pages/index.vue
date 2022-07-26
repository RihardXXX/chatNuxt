<template>
    <div :class="$style.IndexPage">
        <Welcome v-if="!isLoggedIn" />
        <div v-else
             :class="$style.container"
        >
            <div :class="$style.column">
                <div :class="$style.head">
                    <svg-icon name="chats"
                              :class="$style.chatsIcon"
                    />
                </div>
                <ul :class="$style.roomsList">
                    <li :class="$style.itemRoom"
                        @click="() => nextRoom(1)"
                    >
                        <svg-icon name="room"
                                  :class="$style.roomIcon"
                        />
                        <div :class="$style.linkItem">
                            перейти в 1 комнату для общения
                        </div>
                    </li>
                    <li :class="$style.itemRoom"
                        @click="() => nextRoom(2)"
                    >
                        <svg-icon name="room"
                                  :class="$style.roomIcon"
                        />
                        <div :class="$style.linkItem">
                            перейти в 2 комнату для общения
                        </div>
                    </li>
                </ul>
            </div>
            <div :class="$style.column">
                <div :class="$style.head">
                    <svg-icon name="tweets"
                              :class="$style.chatsIcon"
                    />
                </div>
                <h4>
                    Твиты в разработке
                </h4>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
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

    methods: {
        ...mapMutations(['setCurrentRoom']),

        nextRoom(numberRoom) {
            // устанавливаем текущую комнату
            this.setCurrentRoom(numberRoom);
            this.$router.push({
                name: 'chat',
            });
        },
    },
};
</script>

<style lang="scss" module>
    .IndexPage {
        width: 100%;
        height: 100%;
    }

    .container {
        display: flex;
        width: 100%;
        height: 100%;
        background-color: $gray-700;
    }

    .column {
        width: 50%;
        text-align: center;
    }

    .head {
        padding: .5rem 0;
        border-bottom: .1rem solid $black-200;

        &:first-child {
            border-right: .1rem solid $black-200;
        }
    }

    .chatsIcon {
        width: 3rem;
        height: 3rem;
    }

    .roomsList {
        width: 100%;
        list-style: none;
    }

    .itemRoom {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: .3rem;
        padding: .8rem 2rem;
        border: .08rem solid $gray-800;
        transition: .4s;
        cursor: pointer;

        &:first-child {
            margin-top: 0;
        }

        &:hover {
            background-color: $white;
        }
    }

    .roomIcon {
        width: 1.5rem;
        height: 1.5rem;
    }

    .linkItem {
        margin-left: 1rem;
        text-decoration: none;
        font-size: 1.3rem;
        color: $black-900;
    }

</style>
