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

export default {
    name: 'ModalRoomCreate',

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
                name: '',
            },
        };
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
        padding-bottom: 1rem;
        border-bottom: 1px solid $gray-600;
        text-align: center;
    }

    .description {
        margin-top: $offset * 3;
        text-align: center;
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

    .closeIcon {
        width: 4rem;
        height: 4rem;
        transform: rotate(45deg);
    }
</style>
