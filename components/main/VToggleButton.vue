<template>
    <div :class="$style.containerButton">
        <div :class="$style.typeRoom">
            <VButton :name="firstName"
                     :class="[$style.buttonType, {
                         [$style.active]: !active
                     }]"
                     @click.prevent.native="$emit('clickFirst')"
            >
                <svg-icon v-if="icon"
                          name="public"
                          :class="$style.iconRoom"
                />
            </VButton>
            <VButton :name="lastName"
                     :class="[$style.buttonType, {
                         [$style.active]: active
                     }]"
                     @click.prevent.native="$emit('clickLast')"
            >
                <svg-icon v-if="icon"
                          name="private"
                          :class="$style.iconRoom"
                />
            </VButton>
        </div>
    </div>
</template>

<script>
import VButton from '~/components/ui/button/VButton';

export default {
    name: 'VToggleButton',

    components: {
        VButton,
    },

    props: {
        firstName: {
            type: String,
            required: true,
        },

        lastName: {
            type: String,
            required: true,
        },

        active: {
            type: Boolean,
            required: true,
        },

        icon: {
            type: Boolean,
            required: false,
            default: true,
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

    .containerButton {
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
