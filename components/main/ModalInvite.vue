<template>
    <div :class="$style.container">
        <h3 :class="$style.title">
            Пригласить пользователей
        </h3>

        <div v-if="allUsers.length"
             :class="$style.usersContainer"
        >
            <div v-for="(user, i) in allUsers"
                 :key="i+1"
                 :class="$style.userCard"
            >
                <PersonLogo :username="user.username"
                            img="/images/avatar1.png"
                            :style="{ margin: '0 auto' }"
                />
                <button :class="$style.buttonInvite"
                        @click="toInvite(user)"
                >
                    <svg-icon name="invite"
                              :class="[$style.iconInvite, {
                                  [$style._invited]: i === 0,
                              }]"
                    />
                </button>
            </div>
        </div>

        <button :class="$style.buttonClose"
                @click="$emit('close')"
        >
            <svg-icon name="close"
                      :class="$style.closeIcon"
            />
        </button>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import PersonLogo from '~/components/common/PersonLogo';
// import VInputSend from '~/components/ui/input/VInputSend';
// import VToggleButton from '~/components/main/VToggleButton';
// import RoomItem from '~/components/main/RoomItem';
// import VErrorList from '~/components/ui/error/VErrorList';

export default {
    name: 'ModalInvite',

    components: {
        // VInputSend,
        // VToggleButton,
        // RoomItem,
        // VErrorList,
        PersonLogo,
    },

    props: {
        // title: {
        //     type: String,
        //     default: '',
        // },
        //
        // description: {
        //     type: String,
        //     default: '',
        // },
    },

    data() {
        return {
            // даные для комнаты
            // room: {
            //     private: false,
            //     roomName: '',
            // },
        };
    },

    computed: {
        ...mapState('authorization', ['allUsers']),
    },

    mounted() {
        this.getAllUsers();
    },

    methods: {
        ...mapActions('authorization', ['getAllUsers']),

        toInvite(user) {
            console.log('to invite', user);
        },
    },
};
</script>

<style lang="scss" module>
    .title {
        padding-bottom: 1rem;
        border-bottom: 1px solid $gray-600;
        text-align: center;
        font-size: 2rem;
    }

    .description {
        margin-top: $offset * 3;
        text-align: center;
        font-size: 1.6rem;
    }

    .container {
        position: absolute;
        bottom: 0;
        display: block;
        width: 90%;
        height: 50%;
        padding: $offset * 4 $offset * 6;
        border-radius: 1rem 1rem 0 0;
        background-color: $gray-700;
        box-shadow: 0 8px 24px rgba($black-400, .1);
    }

    .usersContainer {
        overflow: auto;
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        height: 80%;
        //flex-direction: column;
    }

    .userCard {
        display: flex;
        width: 25%;
        flex-direction: column;
        //height: 4rem;
        //margin: 1rem;
        //border: 1px solid black;
    }

    .settingSection {
        display: flex;
        justify-content: flex-start;
    }

    .buttonClose {
        position: absolute;
        right: 0;
        bottom: 0;
        //width: 5rem;
        //height: 5rem;
        padding: 1rem;
        border-radius: .5rem;
        border: none;
        background-color: $white;
    }

    .sendInput {
        width: 25rem;
    }

    .typeRoom {
        display: flex;
        align-items: center;
        justify-content: flex-start;
    }

    .buttonType {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: .3rem;
        transition: .8s;

        &:hover {
            transition: .8s;

            svg {
                transition: .8s;
                fill: $white;
            }
        }

        &:last-child {
            margin-left: 1rem;
        }

        &.active {
            background-color: $gray-500;
            //transition: .8s;

            span {
                color: $white;
            }

            svg {
                fill: $white;
            }
        }
    }

    .iconRoom {
        width: 2rem;
        height: 2rem;
        fill: $gray-400;
    }

    .roomsList {
        overflow: auto;
        //width: 100%;
        height: 55%;
        margin: 1rem 4rem;
        list-style: none;
    }

    .closeIcon {
        width: 3rem;
        height: 3rem;
        transform: rotate(45deg);
    }

    .containerError {
        width: auto;
        margin: 1rem 4rem;
    }

    .buttonInvite {
        width: 50%;
        margin: 0 auto;
        border: none;
        background-color: transparent;
    }

    .iconInvite {
        width: 100%;
        height: 2rem;
        fill: $gray-400;
        //fill: red;
        &._invited {
            fill: $black-900;
        }
    }
</style>
