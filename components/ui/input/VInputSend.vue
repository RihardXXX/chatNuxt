<template>
    <div :class="$style.sendSection">
        <input ref="input"
               :value="value"
               :class="$style.inputMessage"
               @input="$emit('input', $event)"
               @keyup.enter="$emit('keyup.enter')"
        />
        <div :class="$style.sendMessage"
             @click="$emit('click')"
        >
            <svg-icon :name="iconName"
                      :class="$style.sendIcon"
            />
        </div>
    </div>
</template>

<script>

export default {
    name: 'VInputSend',

    props: {
        value: {
            type: String,
            required: false,
            default: '',
        },

        iconName: {
            type: String,
            required: false,
            default: '',
        },
    },

    methods: {
        // Used to focus the input from the parent
        focus: function() {
            this.$refs.input.focus();
        },
    },
};
</script>

<style lang="scss" module>

    .sendSection {
        display: flex;
        align-items: center;
        margin: .5rem;
        padding: .2rem .5rem;
        border-radius: .5rem;
        background-color: $white;
    }

    .inputMessage {
        width: 97%;
        border: none;
        font-size: 1.4rem;

        &:focus {
            outline-style: none;
        }
    }

    .sendMessage {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 3%;
    }

    .sendIcon {
        width: 2rem;
        height: 2rem;
        cursor: pointer;
        fill: $black-600;
    }

</style>
