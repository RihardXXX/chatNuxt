<template>
    <button :class="[$style.container, classContainer]" @click="$emit('click')">
        <slot></slot>
        <span :class="$style.name">{{ name }}</span>
    </button>
</template>

<script>

export default {
    name: 'VButton',

    props: {
        name: {
            type: String,
            required: false,
            default: '',
        },

        classContainer: {
            type: [String, Array],
            required: false,
            default: '',
        },
    },

};
</script>

<style lang="scss" module>
    .container {
        position: relative;
        width: 100%;
        padding: .8rem 1.6rem;
        border-radius: .7rem;
        border: 1px solid $gray-100;
        background-color: $gray-300;
        text-align: center;
        transition: .8s;

        &:hover {
            background-color: $gray-500;
            //transition: .8s;

            .name {
                color: $white;
                transition: .8s;
            }
        }
    }

    .name {
        font-size: 1.3rem;
        color: $gray-400;
    }

</style>
