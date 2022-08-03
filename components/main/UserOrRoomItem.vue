<template>
    <div :class="[$style.item, $style._room, {
             [$style._activeRoom]: active,
         }]"
         @click="$emit('click')"
    >
        {{ label }}
    </div>
</template>

<script>

export default {
    name: 'UserOrRoomItem',

    props: {
        active: {
            type: Boolean,
            required: false,
            default: false,
        },

        label: {
            type: String,
            required: false,
            default: '',
        },
    },
};
</script>

<style lang="scss" module>

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

</style>
