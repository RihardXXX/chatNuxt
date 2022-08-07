<template>
    <li :class="[$style.itemRoom, {
            [$style._disabled]: disabled,
        }]"
        @click="$emit('click')"
    >
        <div :class="$style.roomName">
            <svg-icon name="room"
                      :class="$style.roomIcon"
            />
            <div :class="$style.linkItem">
                {{ name }}
            </div>
        </div>
        <div>
            <span>
                {{ countUser }}
            </span>
            <span>
                {{ countUser | plural(['пользователь', 'пользователя', 'пользователей']) }}
            </span>
        </div>
        <button v-if="isMyRoom"
                :class="$style.roomName"
                @click.stop="$emit('deleteRoom')"
        >
            <svg-icon name="close"
                      :class="$style.deleteIcon"
            />
        </button>
    </li>
</template>

<script>

export default {
    name: 'RoomItem',

    props: {
        name: {
            type: String,
            required: true,
        },

        countUser: {
            type: Number,
            required: false,
            default: 0,
        },

        // eslint-disable-next-line vue/require-default-prop
        isMyRoom: {
            type: Boolean,
            required: false,
            default: false,
        },

        disabled: {
            type: Boolean,
            required: false,
            default: false,
        },
    },
};
</script>

<style lang="scss" module>

    .itemRoom {
        display: flex;
        align-items: center;
        justify-content: space-around;
        margin: .5rem;
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

        &._disabled {
            cursor: auto;

            &:hover {
                background: none;
            }
        }
    }

    .roomName {
        display: flex;
        align-items: center;
        justify-content: space-between;
        //border: none;
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

    .deleteIcon {
        width: 1.5rem;
        height: 1.5rem;
        transform: rotate(45deg);
    }

</style>
