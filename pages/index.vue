<template>
    <div :class="$style.IndexPage">
        <Welcome v-if="!isLoggedIn" />
        <div v-else
             :class="$style.container"
        >
            <div :class="$style.chatWindow">
                <div v-for="item in list"
                     :key="item.id"
                     :ref="item.name"
                     :class="$style.item"
                >
                    <span :class="$style.username">
                        {{ item.id }}:
                    </span>
                    <span :class="$style.userMessage">
                        {{ item.title }}
                    </span>
                    <!--                    {{ item.title }}-->
                </div>
            </div>
            <div :class="$style.inputSection">
                <button @click="stop">
                    stop
                </button>
                <button @click="start">
                    start
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import Welcome from '~/components/welcome/Welcome';

export default {
    name: 'IndexPage',

    components: {
        Welcome,
    },

    data() {
        return {
            list: [
                {
                    id: 0,
                    title: 'test',
                },
            ],

            interval: null,

            id: 1,
        };
    },

    head() {
        return {
            title: 'главная',
            meta: [
                // hid is used as unique identifier. Do not use `vmid` for it as it will not work
                {
                    hid: 'description',
                    name: 'description',
                    content: 'главная страница приложения',
                },
            ],
        };
    },

    computed: {
        ...mapState('authorization', [
            'isLoggedIn',
        ]),
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
    }

    .chatWindow {
        overflow: auto;
        display: flex;
        width: 100%;
        height: 90%;
        flex-direction: column;
    }

    .item {
        display: inline-block;
        align-items: flex-start;
        justify-content: flex-start;
        //width: 100%;
        //min-height: 3rem;
        margin: .5rem;
        padding: .5rem;
        border-radius: .5rem;
        border: 1px solid $gray-600;
        word-wrap: break-word;
        flex-direction: column;
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
        width: 100%;
        height: 10%;
    }

</style>
