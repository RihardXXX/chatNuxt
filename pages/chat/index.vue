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
                    <div v-for="message in messages"
                         :key="message.id"
                         :ref="message.name"
                         :class="[$style.itemContainer, {
                             [$style._right]: message.userId === user._id
                         }]"
                    >
                        <div v-tooltip.bottom-end="{
                                 content: 'написать этому пользователю',
                                 // delay: { show: 200, hide: 100 },
                             }"
                             :class="$style.item"
                             @click="() => setName(message.username)"
                        >
                            <span :class="$style.username">
                                {{ message.username }}:
                            </span>
                            <span :class="$style.userMessage">
                                {{ message.text }}
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
                    <input ref="input"
                           :value="text"
                           :class="$style.inputMessage"
                           @input="event => text = event.target.value.trim()"
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

        ...mapState(['messages', 'currentRoom']),
    },

    watch: {
        // отрезаем список если число сообщений больше 200
        list(list) {
            // console.log(112, list.length);
            if (list.length > 100) {
                this.list = this.list.slice(50);
            }
        },

        // тут следим за списком и у определенного списка докручиваем скролл
        messages(messages) {
            // если есть список сообщений то доклучиваем скрол к последнему сообщению
            if (messages.length) {
                // тут будем делать скрол как получим ответ от сервера
                const name = messages[messages.length-1].name;
                setTimeout(() => {
                    const element = this.$refs[name][0];
                    element.scrollIntoView({ block: 'center', behavior: 'smooth' });
                }, 1000);
            }
        },
    },

    mounted() {
        this.$socket.emit('joinedRooms', {
            user: this.user,
            room: this.currentRoom,
        });
    },

    beforeDestroy() {
        // когда пользователь выходит сообщаем остальным что пользователь вышел
        this.$socket.emit('exitRoom', { user: this.user, room: this.currentRoom });
    },


    methods: {
        sendMessage() {
            if (!this.text.length) {
                return;
            }
            const user = this.user;
            this.$socket.emit('createNewMessage', { text: this.text, room: this.currentRoom, user }, data => {
                // тут будем делать скрол как получим ответ от сервера
                const element = this.$refs[data.name][0];
                setTimeout(() => element.scrollIntoView({ block: 'center', behavior: 'smooth' }), 1000);
            });

            this.text = '';
        },

        // кому мы хотим обратится в чате
        setName(username) {
            this.text = `@${username} `;
            this.$refs.input.focus();
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
        display: flex;
        justify-content: flex-start;
        width: 100%;

        &._right {
            justify-content: flex-end;
        }
    }

    .item {
        position: relative;
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
        cursor: pointer;

        &._room {
            border: .5px solid $black-400;
            background-color: $gray-600;
            cursor: pointer;
        }

        &:hover {
            .username {
                font-weight: 800;
            }
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
