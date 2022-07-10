import Vue from 'vue';

export default (ctx, inject) => {
    const modal = {
        event: new Vue(),

        // Modal methods
        open(component, attrs, onclose) {
            this.event.$emit('open', component, attrs, onclose);
        },

        // Common methods
        close() {
            this.event.$emit('close');
        },
    };

    ctx.$modal = modal;
    inject('modal', modal);
};
