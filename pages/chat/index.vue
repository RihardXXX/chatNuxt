<template>
    <div :class="$style.IndexPage">
        <div :class="$style.container">
            <button :class="$style.UpDown"
                    @click="upOrDownList"
            >
                <svg-icon name="left-arrow"
                          :class="[$style.iconUpDown, {
                              [$style._up]: up
                          }]"
                />
            </button>
            <div :class="$style.chatWindow">
                <div :class="$style.chatRooms">
                    <!--                    <div :class="[$style.item, $style._room, $style._createRoom]"-->
                    <!--                         @click="createNewRoom"-->
                    <!--                    >-->
                    <!--                        создать комнату-->
                    <!--                    </div>-->
                    <!--                    <div :class="$style.border"></div>-->
                    <h3 :class="$style.titleRoom">Комнаты:</h3>
                    <div v-for="room in rooms"
                         :key="room.id"
                         :class="[$style.item, $style._room, {
                             [$style._activeRoom]: currentRoom.id === room.id,
                         }]"
                         @click="() => changeRoom(room)"
                    >
                        {{ room.name }}
                    </div>
                </div>
                <div ref="chatContainer"
                     :class="$style.chatContainer"
                >
                    <div v-for="message in messagesCurrentRoom"
                         :key="message._id"
                         :ref="message._id"
                         :class="[$style.itemContainer, {
                             [$style._right]: message.user._id === user._id
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
                                {{ message.user.username }}:
                            </span>
                            <span :class="$style.userMessage">
                                {{ message.message_body }}
                            </span>
                        </div>
                    </div>
                </div>
                <div :class="$style.userName">
                    <h3 :class="$style.titleRoom">пользователи:</h3>
                    <div v-for="user in usersCurrentRoom"
                         :key="user.id"
                         :class="[$style.item, $style._room]"
                    >
                        {{ user.username }}
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
import { mapState, mapGetters, mapMutations } from 'vuex';

export default {
    name: 'ChatRoom',

    middleware: 'auth',

    data() {
        return {
            interval: null,

            id: 1,

            text: '',
            // вверх или вниз включен режим
            up: false,
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

        ...mapState([
            'currentRoom',
            'rooms',
        ]),

        ...mapGetters(['usersCurrentRoom', 'messagesCurrentRoom']),
    },

    watch: {
        // тут следим за списком и у определенного списка докручиваем скролл
        messagesCurrentRoom(messages) {
            // если есть список сообщений то доклучиваем скрол к последнему сообщению
            if (messages.length && !this.up) {
                // тут будем делать скрол как получим ответ от сервера
                const _id = messages[messages.length-1]._id;
                this.nextMessageScroll(_id, 1000);
            }
        },
    },

    mounted() {
        // отправляем пользователя и текущую комнату на сервер
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
        ...mapMutations([
            'setCurrentRoom',
            'deleteMessages',
        ]),

        sendMessage() {
            if (!this.text.length) {
                return;
            }
            const user = this.user;
            // console.log('this.currentRoom: ', this.currentRoom);
            this.$socket.emit('createNewMessage', { text: this.text, room: this.currentRoom, user });

            this.text = '';
        },

        // кому мы хотим обратится в чате
        setName(username) {
            this.text = `@${username} `;
            this.$refs.input.focus();
        },

        // сменить комнату
        changeRoom(room) {
            // выход из комнаты старой
            // при смене комнаты очищаем сообщения в чате текущем
            this.deleteMessages();
            // когда пользователь выходит сообщаем остальным что пользователь вышел
            this.$socket.emit('exitRoom', { user: this.user, room: this.currentRoom });

            // вход в новую комнату
            this.setCurrentRoom(room.id);
            this.$socket.emit('joinedRooms', {
                user: this.user,
                room: room.id,
            });
        },

        // создать новую комнату для общения
        createNewRoom() {
            // console.log('create new room');
            this.$socket.emit('createNewRoom');
        },

        // функция которая скроллит автоматически к определенному элементу
        nextMessageScroll(_id, duration) {
            setTimeout(() => {
                const element = this.$refs[_id][0];
                element.scrollIntoView({ block: 'center', behavior: 'smooth' });
            }, duration);
        },

        // поднимаемся по сообщениям и спускаемся плавно
        // если спустились то включаем авто спуск для новых сообщений
        upOrDownList() {
            // перемещаем стрелку, отключаем автоскролл вниз
            this.up = !this.up;
            // скроллим плавно к верхнем элементу если включен режим вверх
            if (this.messagesCurrentRoom.length && this.up) {
                // скроллим к первому верхнему элементу
                const _id = this.messagesCurrentRoom[0]._id;
                this.nextMessageScroll(_id, 1000);
            } else {
                // включаем режим авто скролла и скроллим к последнему элементу
                const _id = this.messagesCurrentRoom[this.messagesCurrentRoom.length-1]._id;
                this.nextMessageScroll(_id, 1000);
            }
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
        position: relative;
        width: 100%;
        height: 100%;
        background-color: $gray-700;
    }

    .chatWindow {
        //position: relative;
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
        //position: relative;
        overflow: auto;
        display: flex;
        width: 80%;
        height: 100%;
        flex-direction: column;
    }

    .UpDown {
        position: absolute;
        right: 0;
        bottom: -9.5rem;
        z-index: 100;
        //border: none;
        padding: 1rem;
        border-radius: .5rem;
        border: .5px solid $gray-200;
        background: $white;
    }

    .iconUpDown {
        width: 2rem;
        height: 2rem;
        transform: rotate(90deg);
        transition: .7s;

        &._up {
            transform: rotate(-90deg);
        }
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
            transition: .4s;
            cursor: pointer;

            &:hover {
                background-color: $gray-400;
            }
        }

        &._activeRoom {
            background-color: $blue-100;
            color: $white;
        }

        &:hover {
            .username {
                font-weight: 800;
            }
        }
    }

    .border {
        width: 100%;
        height: 1px;
        margin-top: .5rem;
        background-color: $gray-200;
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
