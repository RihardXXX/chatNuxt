<template>
    <div :class="$style.container">
        <div :class="$style.column">
            <div :class="$style.head">
                <svg-icon name="chats"
                          :class="$style.chatsIcon"
                />
            </div>
            <h4>
                все  комнаты
            </h4>
            <ul v-if="rooms.length"
                :class="$style.roomsList"
            >
                <RoomItem v-for="room in rooms"
                          :key="room.id"
                          :name="room.name"
                          :is-my-room="room.author === user._id"
                          :is-private="room.author === user._id && room.private"
                          :count-user="room.users.length"
                          @click="() => nextRoom(room)"
                          @deleteRoom="() => deleteRoom(room)"
                          @toInvite="() => toInvite(room)"
                />
            </ul>
        </div>
        <div :class="$style.column">
            <div :class="$style.head">
                <svg-icon name="tweets"
                          :class="$style.chatsIcon"
                />
            </div>
            <h4>
                ваши комнаты
            </h4>
            <ul v-if="myRooms.length"
                :class="$style.roomsList"
            >
                <RoomItem v-for="room in myRooms"
                          :key="room.id"
                          :name="room.name"
                          :is-my-room="room.author === user._id"
                          :is-private="room.author === user._id && room.private"
                          :count-user="room.users.length"
                          @click="() => nextRoom(room)"
                          @deleteRoom="() => deleteRoom(room)"
                          @toInvite="() => toInvite(room)"
                />
            </ul>
            <div v-else>
                вы пока не создали не одну комнату
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import RoomItem from '~/components/main/RoomItem';
import ModalInvite from '~/components/main/ModalInvite';

export default {
    name: 'RoomList',

    components: {
        RoomItem,
    },

    async fetch() {
        // инициализация всех комнат
        // инициализация комнат пользователя
        await this.$socket.emit('initialRooms', { user: this.user });
    },

    head() {
        return {
            title: 'главная',
            meta: [
                // hid is used as unique identifier. Do not use `vmid` for it as it will not work
                {
                    hid: 'description',
                    name: 'description',
                    content: 'Список комнат',
                },
            ],
        };
    },

    computed: {
        ...mapState('authorization', [
            'user',
        ]),

        ...mapState([
            'rooms',
            'myRooms',
        ]),

    },

    methods: {
        ...mapMutations(['setCurrentRoom']),

        nextRoom(currentRoom) {
            // устанавливаем текущую комнату
            this.setCurrentRoom(currentRoom);
            this.$router.push({
                name: 'chat',
            });
        },

        deleteRoom(room) {
            console.log('delete room: ', room);
            this.$socket.emit('deleteMyRoom', { room, user: this.user });
        },

        toInvite(room) {
            console.log(room);
            this.$modal.open(ModalInvite);
        },
    },
};
</script>

<style lang="scss" module>
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
        overflow: auto;
        width: 100%;
        height: 88%;
        list-style: none;
    }

    .itemRoom {
        display: flex;
        align-items: center;
        justify-content: space-around;
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

    .roomName {
        display: flex;
        align-items: center;
        justify-content: space-between;
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
