<template>
    <div :class="$style.container">
        <h3 v-if="title"
            :class="$style.title"
        >
            {{ title }}
        </h3>

        <p v-if="description"
           :class="$style.description"
           v-html="description"
        >
        </p>
        {{ room }}

        <ul v-if="myRooms.length"
            :class="$style.roomsList"
        >
            <RoomItem v-for="room in myRooms"
                      :key="room.id"
                      :name="room.name"
                      :count-user="room.users.length"
            />
        </ul>


        <div :class="$style.settingSection">
            <VInputSend :value="room.roomName"
                        label="имя комнаты"
                        icon-name="send"
                        :style="{ width: '50%' }"
                        @input="event => room.roomName = event.target.value.trim()"
                        @keyup.enter.native="createNewRoom"
                        @click="createNewRoom"
            />
            <VToggleButton :active="room.private"
                           first-name="публичная"
                           last-name="приватная"
                           @clickFirst="room.private = false"
                           @clickLast="room.private = true"
            />
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
import { mapState } from 'vuex';
import VInputSend from '~/components/ui/input/VInputSend';
import VToggleButton from '~/components/main/VToggleButton';
import RoomItem from '~/components/main/RoomItem';

export default {
    name: 'ModalRoomCreate',

    components: {
        VInputSend,
        VToggleButton,
        RoomItem,
    },

    props: {
        title: {
            type: String,
            default: '',
        },

        description: {
            type: String,
            default: '',
        },

        count: {
            type: Number,
            default: 1,
        },
    },

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
        ...mapState(['myRooms']),
        ...mapState('authorization', ['user']),
    },

    methods: {
        createNewRoom() {
            if (!this.room.roomName) {
                return false;
            }
            this.$socket.emit('createNewRoom', { room: this.room, user: this.user });
            this.room.roomName = '';
            this.room.private = false;
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
        margin: 3rem 4rem;
        list-style: none;
    }

    .closeIcon {
        width: 4rem;
        height: 4rem;
        transform: rotate(45deg);
    }
</style>
