<template>
    <div :class="$style.container">
        <h3 :class="$style.title">
            Пригласить пользователей
        </h3>


        <div :class="$style.usersContainer">
            <div v-for="(item, i) in new Array(70)"
                 :key="i+1"
                 :class="$style.userCard"
            >
                {{ i }}
            </div>
        </div>

        <!--        <p :class="$style.description">-->
        <!--            {{ description }}-->
        <!--        </p>-->

        <!--        <ul v-if="myRooms.length"-->
        <!--            :class="$style.roomsList"-->
        <!--        >-->
        <!--            <RoomItem v-for="myRoom in myRooms"-->
        <!--                      :key="myRoom.id"-->
        <!--                      :name="myRoom.name"-->
        <!--                      :is-my-room="myRoom.author === user._id"-->
        <!--                      :is-private="myRoom.author === user._id && myRoom.private"-->
        <!--                      :count-user="myRoom.users.length"-->
        <!--                      disabled-->
        <!--                      @deleteRoom="() => deleteRoom(myRoom)"-->
        <!--            />-->
        <!--        </ul>-->

        <!--        <VErrorList v-if="errors.length"-->
        <!--                    :error-list="errors"-->
        <!--                    :class-container="$style.containerError"-->
        <!--        />-->


        <!--        <div v-if="user.roomCount > 0" :class="$style.settingSection">-->
        <!--            <VInputSend :value="room.roomName"-->
        <!--                        label="имя комнаты"-->
        <!--                        icon-name="send"-->
        <!--                        :style="{ width: '50%' }"-->
        <!--                        @input="event => room.roomName = event.target.value.trim()"-->
        <!--                        @keyup.enter.native="createNewRoom"-->
        <!--                        @click="createNewRoom"-->
        <!--            />-->
        <!--            <VToggleButton :active="room.private"-->
        <!--                           first-name="публичная"-->
        <!--                           last-name="приватная"-->
        <!--                           @clickFirst="room.private = false"-->
        <!--                           @clickLast="room.private = true"-->
        <!--            />-->
        <!--        </div>-->
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
        ...mapState(['myRooms', 'errors']),
        ...mapState('authorization', ['user']),

        description() {
            return this.user.roomCount > 0
                ? `Вы можете создать не более ${this.user.roomCount} комнат`
                : 'Вы не можете создать более 5 комнат';
        },
    },

    methods: {
        ...mapMutations(['setCurrentRoom']),

        createNewRoom() {
            if (!this.room.roomName) {
                return false;
            }
            this.$socket.emit('createNewRoom', { room: this.room, user: this.user });
            this.room.roomName = '';
            this.room.private = false;
        },

        deleteRoom(room) {
            console.log('delete room: ', room);
            this.$socket.emit('deleteMyRoom', { room, user: this.user });
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
        width: 25%;
        height: 4rem;
        //margin: 1rem;
        border: 1px solid black;
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
</style>
