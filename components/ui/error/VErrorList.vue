<template>
    <ul v-if="errorList.length"
        :class="[$style.container, classContainer]"
    >
        <li v-for="(error, i) in errorList"
            :key="i"
            :class="$style.item"
        >
            <span>
                {{ error }}
            </span>
        </li>
    </ul>
</template>

<script>

export default {
    name: 'VErrorList',

    props: {
        errorList: {
            type: Array,
            required: true,
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
        padding: .5rem 1.6rem;
        border-radius: .7rem;
        border: 1px solid $gray-100;
        //text-align: center;
    }

    .name {
        font-size: 1.3rem;
        color: $gray-400;
    }

    .item {
        margin-top: .3rem;
        padding: .5rem;
        border-bottom: 1px solid $gray-100;
        list-style: none;
        font-size: 1.2rem;
        color: $red-100;

        &:first-child {
            margin-top: 0;
        }

        &:last-child {
            border-bottom: 0;
        }
    }

</style>
