<template>
    <li :class="$style.itemRoom"
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
    },
};
</script>

<style lang="scss" module>

    .itemRoom {
        display: flex;
        align-items: center;
        justify-content: space-around;
        margin-top: .3rem;
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
    }

    .roomName {
        display: flex;
        align-items: center;
        justify-content: space-between;
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

</style>
