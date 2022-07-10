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

        <button :class="$style.button" @click="$emit('close')">
            Open another one modal
        </button>
    </div>
</template>

<script>

export default {
    name: 'HelloModal',

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

    // methods: {
    //     openHelloModal() {
    //         this.$modal.open(HelloModal, {
    //             title: 'Hello world!',
    //             count: this.count + 1,
    //             description: 'It\'s modal example, glad&nbsp;to&nbsp;see you!',
    //         });
    //     },
    // },
};
</script>

<style lang="scss" module>
    .title {
        text-align: center;
    }

    .description {
        margin-top: $offset * 3;
        text-align: center;
    }

    .container {
        display: block;
        width: 220px;
        padding: $offset * 4 $offset * 6;
        border-radius: $offset * 5;
        background-color: white;
        box-shadow: 0 8px 24px rgba($black-400, .1);
    }
</style>
