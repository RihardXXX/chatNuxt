<template>
    <div :class="[$style.container, classContainer]">
        <div v-if="label"
             :class="$style.label"
        >
            {{ label }}
        </div>
        <input :class="$style.input"
               :value="value"
               @input="$emit('input', $event.target.value.trim())"
               @change="$emit('change', $event.target.value.trim())"
        />
    </div>
</template>

<script>

export default {
    name: 'VInput',

    props: {
        label: {
            type: String,
            required: false,
            default: '',
        },

        value: {
            type: String,
            required: true,
        },

        classContainer: {
            type: [String, Array],
            required: false,
            default: '',
        },
    },

    // data() {
    //     return {
    //
    //     };
    // },
};
</script>

<style lang="scss" module>
    .container {
        position: relative;
        width: 100%;
        padding: 1.1rem 1.2rem;
        border-radius: 5rem;
        border: 1px solid $gray-100;
    }

    .label {
        position: absolute;
        top: -1.1rem;
        left: 1rem;
        z-index: 10;
        padding: .2rem .3rem;
        background-color: $white;
        font-size: 1.4rem;
    }

    .input {
        width: 100%;
        //padding: .3rem;
        border: none;
        outline: none;
        font-size: 1.4rem;
    }

</style>
