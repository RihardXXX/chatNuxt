<template>
    <transition name="modal"
                mode="out-in"
                duration="100"
                @before-enter="beforeEnter"
                @after-leave="afterLeave"
    >
        <div v-if="component"
             :key="key"
             :class="$style.TheModal"
        >
            <div :class="$style.wrapper" @click.self="close">
                <component :is="component"
                           :key="key"
                           v-bind="attrs"
                           @close="close"
                />
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    name: 'TheModal',

    data() {
        return {
            component: null,
            attrs: null,
            onClose: null,
            key: null,
        };
    },

    beforeMount() {
        this.$modal.event.$on('open', this.open);
        this.$modal.event.$on('close', this.close);
    },

    beforeDestroy() {
        this.$modal.event.$off('open', this.open);
        this.$modal.event.$off('close', this.close);
    },

    methods: {
        open(component, attrs, onClose) {
            this.component = component;
            this.attrs = attrs;
            this.onClose = onClose;
            this.key = Math.random();
        },

        close() {
            if (this.onClose) {
                this.onClose();
            }

            this.component = this.attrs = this.onClose = this.key = null;
        },

        lockBody() {
            document.documentElement.style.height = '100%';
            document.body.style.height = '100%';
            document.body.style.overflow = 'hidden';
            document.body.style.paddingRight = '15px';
        },

        unlockBody() {
            document.documentElement.style.height = null;
            document.body.style.height = null;
            document.body.style.overflow = null;
            document.body.style.paddingRight = null;
        },

        beforeEnter() {
            this.lockBody();
        },

        afterLeave() {
            this.unlockBody();
        },
    },
};
</script>

<style lang="scss" module>
    .TheModal {
        &:global(.modal-enter-active),
        &:global(.modal-leave-to) {
            &:after {
                opacity: 1;
                transition: opacity .3s ease;
            }

            .container {
                opacity: 1;
                transform: translate3d(0, 0, 0) scale(1);
                transition: opacity .2s ease .3s, transform .2s ease .3s;
            }
        }

        &:global(.modal-enter),
        &:global(.modal-leave-active) {
            &:after {
                opacity: 0;
                transition: opacity .3s ease .2s;
            }

            .container {
                opacity: 0;
                transform: translate3d(0, 0, 0) scale(.4);
                transition: opacity .2s ease, transform .2s ease;
            }
        }

        &:after {
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            z-index: 1;
            background-color: rgba($black-400, .2);
        }
    }

    .wrapper {
        position: relative;
        z-index: 2;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
    }
</style>
