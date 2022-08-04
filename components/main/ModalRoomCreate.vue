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


        <div :class="$style.settingSection">
            <VInputSend :value="room.roomName"
                        label="имя комнаты"
                        icon-name="send"
                        :style="{ width: '50%' }"
                        @input="event => room.roomName = event.target.value.trim()"
                        @keyup.enter.native="createNewRoom"
                        @click="createNewRoom"
            />
            <div :class="$style.typeRoom">
                <VButton name="публичная"
                         :class="[$style.buttonType, {
                             [$style.active]: !room.private
                         }]"
                         @click="room.private = false"
                >
                    <svg-icon name="public" :class="$style.iconRoom" />
                </VButton>
                <VButton name="приватная"
                         :class="[$style.buttonType, {
                             [$style.active]: room.private
                         }]"
                         @click="room.private = true"
                >
                    <svg-icon name="private" :class="$style.iconRoom" />
                </VButton>
            </div>
        </div>

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
import VInputSend from '~/components/ui/input/VInputSend';
import VButton from '~/components/ui/button/VButton';

export default {
    name: 'ModalRoomCreate',

    components: {
        VButton,
        VInputSend,
    },

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
                roomName: '',
            },
        };
    },

    methods: {
        // openHelloModal() {
        //     this.$modal.open(HelloModal, {
        //         title: 'Hello world!',
        //         count: this.count + 1,
        //         description: 'It\'s modal example, glad&nbsp;to&nbsp;see you!',
        //     });
        // },
        createNewRoom() {
            console.log('createNewRoom');
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
        height: auto;
        padding: $offset * 4 $offset * 6;
        border-radius: 1rem 1rem 0 0;
        background-color: $gray-700;
        box-shadow: 0 8px 24px rgba($black-400, .1);
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

    .closeIcon {
        width: 4rem;
        height: 4rem;
        transform: rotate(45deg);
    }
</style>
