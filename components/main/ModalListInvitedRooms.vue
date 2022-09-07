<template>
    <div :class="$style.container">
        <h3 :class="$style.title">
            вы приглашены в комнаты
        </h3>

        <ul v-if="user.invitedRooms.length" :class="$style.listRooms">
            <li v-for="item in user.invitedRooms"
                :key="item._id"
                :class="$style.roomItem"
            >
                <button @click="nextRoom(item)" :style="{ marginRight: '2rem' }">
                    принять приглашение
                </button>
                <span>
                    в комнату {{ item.name }}
                </span>
            </li>
        </ul>

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
import { mapState, mapMutations } from 'vuex';
// import VButton from '~/components/ui/button/VButton';
// import VInputSend from '~/components/ui/input/VInputSend';
// import VToggleButton from '~/components/main/VToggleButton';
// import RoomItem from '~/components/main/RoomItem';
// // import VErrorList from '~/components/ui/error/VErrorList';
// import ModalInvite from '~/components/main/ModalInvite';

export default {
    name: 'ModalRoomCreate',

    components: {
        // VButton,
        // VInputSend,
        // VToggleButton,
        // RoomItem,
    },

    // props: {
    //     // title: {
    //     //     type: String,
    //     //     default: '',
    //     // },
    //     //
    //     // description: {
    //     //     type: String,
    //     //     default: '',
    //     // },
    //
    //     count: {
    //         type: Number,
    //         default: 1,
    //     },
    // },

    data() {
        return {
            // даные для комнаты
            room: {
                private: false,
                roomName: '',
            },
        };
    },

    computed: {
        // ...mapState(['myRooms', 'errors']),
        ...mapState('authorization', ['user']),
    },

    methods: {
        ...mapMutations(['setCurrentRoom']),

        // createNewRoom() {
        //     if (!this.room.roomName) {
        //         return false;
        //     }
        //     this.$socket.emit('createNewRoom', { room: this.room, user: this.user });
        //     this.room.roomName = '';
        //     this.room.private = false;
        // },
        //
        // deleteRoom(room) {
        //     console.log('delete room: ', room);
        //     this.$socket.emit('deleteMyRoom', { room, user: this.user });
        // },
        //
        // toInvite(room) {
        //     // console.log(123, room);
        //     this.$emit('close');
        //     this.$modal.open(ModalInvite, {
        //         invitedRoom: room,
        //     });
        // },
        nextRoom(item) {
            console.log('item: ', item);
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
        height: auto;
        padding: $offset * 4 $offset * 6;
        border-radius: 1rem 1rem 0 0;
        background-color: $gray-700;
        box-shadow: 0 8px 24px rgba($black-400, .1);
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

    .listRooms {
        overflow: auto;
        max-height: 10rem;
        margin-top: 2rem;
    }

    .roomItem {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        margin-bottom: 1.6rem;

        &:last-child {
            margin-bottom: 0;
        }
    }
</style>
