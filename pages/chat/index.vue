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
                         :class="$style.item"
                    >
                        <span :class="$style.username">
                            {{ item.username }}:
                        </span>
                        <span :class="$style.userMessage">
                            {{ item.text }}
                        </span>
                        <!--                    {{ item.title }}-->
                    </div>
                </div>
            </div>
            <div :class="$style.inputSection">
                <!--                <div :class="$style.run">-->
                <!--                    <button @click="stop">-->
                <!--                        stop-->
                <!--                    </button>-->
                <!--                    <button @click="start">-->
                <!--                        start-->
                <!--                    </button>-->
                <!--                </div>-->
                <div :class="$style.sendSection">
                    <input v-model.trim="message"
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

            message: '',
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
        this.$socket.emit('joinedRooms', this.user);
    },


    methods: {
        createItem() {
            this.id += 1;
            const newItem = {
                id: this.id,
                name: `name${this.id}`,
                title: 'test'.repeat(this.id),
            };
            this.list.push(newItem);
            // console.log(newItem.name);
            const str = newItem.name;
            setTimeout(() => {
                const element = this.$refs[str][0];
                element.scrollIntoView({ block: 'center', behavior: 'smooth' });
            }, 300);
        },

        stop() {
            clearInterval(this.interval);
        },

        start() {
            this.interval = setInterval(() => this.createItem(), 200);
        },

        sendMessage() {
            this.id += 1;
            const newItem = {
                id: this.id,
                name: `name${this.id}`,
                title: this.message,
            };
            // this.list.push(newItem);
            // console.log(newItem.name);
            // отправляем на сервер созданный объект
            this.$socket.emit('createNewMessage', newItem);

            const str = newItem.name;
            setTimeout(() => {
                const element = this.$refs[str][0];
                element.scrollIntoView({ block: 'center', behavior: 'smooth' });
            }, 1000);
            this.message = '';
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
        width: 20%;
        height: 100%;
        border-right: .5px solid $gray-200;
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

    .item {
        display: inline-block;
        align-items: flex-start;
        justify-content: flex-start;
        //width: 100%;
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
