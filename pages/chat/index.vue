<template>
    <div :class="$style.IndexPage">
        <div :class="$style.container">
            <div :class="$style.chatWindow">
                <div :class="$style.chatRooms">
                    <h3 :class="$style.titleRoom">Комнаты:</h3>
                    <div v-for="room in rooms"
                         :key="room.id"
                         :class="[$style.item, $style._room]"
                    >
                        {{ room.title }}
                    </div>
                </div>
                <div :class="$style.chatContainer">
                    <div v-for="item in messages"
                         :key="item.id"
                         :ref="item.name"
                         :class="$style.itemContainer"
                    >
                        <div :class="$style.item">
                            <span :class="$style.username">
                                {{ item.username }}:
                            </span>
                            <span :class="$style.userMessage">
                                {{ item.text }}
                            </span>
                        </div>
                    </div>
                </div>
                <div :class="$style.userName">
                    <h3 :class="$style.titleRoom">пользователи:</h3>
                    <div v-for="room in rooms"
                         :key="room.id"
                         :class="[$style.item, $style._room]"
                    >
                        {{ room.title }}
                    </div>
                </div>
            </div>
            <div :class="$style.inputSection">
                <div :class="$style.sendSection">
                    <input v-model.trim="text"
                           :class="$style.inputMessage"
                           @keyup.enter="sendMessage"
                    />
                    <div :class="$style.sendMessage"
                         @click="sendMessage"
                    >
                        <svg-icon name="send"
                                  :class="$style.sendIcon"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'ChatRoom',

    middleware: 'auth',

    data() {
        return {
            rooms: [
                {
                    id: 0,
                    title: 'Moscow',
                },
                {
                    id: 1,
                    title: 'London',
                },
                {
                    id: 2,
                    title: 'New York',
                },
            ],

            interval: null,

            id: 1,

            text: '',

            // текущая комната

        };
    },

    head() {
        return {
            title: 'чат комнаты',
            meta: [
                // hid is used as unique identifier. Do not use `vmid` for it as it will not work
                {
                    hid: 'description',
                    name: 'description',
                    content: 'страницы с чат комнатами',
                },
            ],
        };
    },

    computed: {
        ...mapState('authorization', [
            'isLoggedIn',
            'user',
        ]),

        ...mapState(['messages']),
    },

    watch: {
        // отрезаем список если число сообщений больше 200
        list(list) {
            // console.log(112, list.length);
            if (list.length > 100) {
                this.list = this.list.slice(50);
            }
        },
    },

    mounted() {
        const room = this.$route.params.room;
        this.$socket.emit('joinedRooms', {
            user: this.user,
            room,
        });
    },


    methods: {
        sendMessage() {
            if (!this.text.length) {
                return;
            }
            const room = this.$route.params.room;
            const username = this.user.username;
            this.$socket.emit('createNewMessage', { text: this.text, room, username }, data => {
                // тут будем делать скрол как получим ответ от сервера
                const element = this.$refs[data.name][0];
                setTimeout(() => element.scrollIntoView({ block: 'center', behavior: 'smooth' }), 1000);
            });

            this.text = '';
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
        width: 100%;
        height: 100%;
        background-color: $gray-700;
    }

    .chatWindow {
        overflow: auto;
        display: flex;
        width: 100%;
        height: 90%;
    }

    .chatRooms {
        overflow: auto;
        display: flex;
        width: 10%;
        height: 100%;
        border-right: .5px solid $gray-200;
        flex-direction: column;
    }

    .userName {
        overflow: auto;
        display: flex;
        width: 10%;
        height: 100%;
        border-left: .5px solid $gray-200;
        flex-direction: column;
    }

    .titleRoom {
        margin: .2rem .5rem;
    }

    .chatContainer {
        overflow: auto;
        display: flex;
        width: 80%;
        height: 100%;
        flex-direction: column;
    }

    .itemContainer {
        width: 100%;
    }

    .item {
        display: inline-block;
        align-items: flex-start;
        justify-content: flex-start;
        width: 70%;
        //min-height: 3rem;
        margin: .2rem .5rem;
        padding: .5rem;
        border-radius: .5rem;
        border: 1px solid $gray-600;
        background-color: $white;
        word-wrap: break-word;
        flex-direction: column;

        &._room {
            border: .5px solid $black-400;
            background-color: $gray-600;
            cursor: pointer;
        }
    }

    .username {
        font-size: 1.2rem;
        font-weight: 500;
        color: $black-600;
    }

    .userMessage {
        font-size: 1.2rem;
        font-weight: 400;
        color: $black-100;
    }

    .inputSection {
        position: relative;
        width: 100%;
        height: 10%;
    }

    .run {
        position: absolute;
        top: -40px;
        left: 0;
    }

    .sendSection {
        display: flex;
        align-items: center;
        margin: .5rem;
        padding: .2rem .5rem;
        border-radius: .5rem;
        background-color: $white;
    }

    .inputMessage {
        width: 97%;
        border: none;
        font-size: 1.4rem;

        &:focus {
            outline-style: none;
        }
    }

    .sendMessage {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 3%;
    }

    .sendIcon {
        width: 2rem;
        height: 2rem;
        cursor: pointer;
        fill: $black-600;
    }

</style>
