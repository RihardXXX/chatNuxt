<template>
    <div :class="$style.container">
        <div :class="$style.column">
            <div :class="$style.head">
                <svg-icon name="chats"
                          :class="$style.chatsIcon"
                />
            </div>
            <ul v-if="rooms.length"
                :class="$style.roomsList"
            >
                <RoomItem v-for="room in rooms"
                          :key="room.id"
                          :name="room.name"
                          :count="room.users.length"
                          @click="() => nextRoom(room)"
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
                Твиты в разработке
            </h4>
            <h4>
                ваши комнаты
            </h4>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import RoomItem from '~/components/main/RoomItem';

export default {
    name: 'RoomList',

    components: {
        RoomItem,
    },

    async fetch() {
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
