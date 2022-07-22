<template>
    <div :class="[$style.container, classContainer]">
        <form :class="$style.form"
              @submit.prevent="setLogin"
        >
            <VInput label="ваша почта"
                    :value="email"
                    :class-container="$style.inputItem"
                    @input="setEmail"
            />
            <VInput label="ваш пароль"
                    :value="password"
                    :class-container="$style.inputItem"
                    @input="setPassword"
            />
            <VButton :class-container="$style.buttonRegister"
                     name="войти"
            />
        </form>
        <VErrorList v-if="errors.length"
                    :error-list="errors"
                    :class-container="$style.buttonRegister"
        />
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import VInput from '~/components/ui/input/VInput';
import VButton from '~/components/ui/button/VButton';
import VErrorList from '~/components/ui/error/VErrorList';
import moduleApi from '~/config/api/module';

export default {
    name: 'LoginForm',

    components: {
        VInput,
        VButton,
        VErrorList,
    },

    props: {
        classContainer: {
            type: [String, Array],
            required: false,
            default: '',
        },
    },

    data() {
        return {
            errors: [],

            email: '',
            password: '',
        };
    },

    methods: {
        ...mapActions('authorization', [
            'login',
        ]),

        setEmail(e) {
            this.email = e.trim();
        },

        setPassword(e) {
            this.password = e.trim();
        },

        setLogin() {
            this.errors = [];
            console.log('setLogin');
            const url = moduleApi.authorization.login;

            this.$axios.post(url, {
                user: {
                    email: this.email,
                    password: this.password,
                },
            })
                .then(({ data }) => {
                    this.login(data.user);
                })
                .catch(err => this.errors = err.response.data.message);
        },

    },
};
</script>

<style lang="scss" module>
    .container {
        padding: 0;
    }

    .form {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        flex-direction: column;
    }

    .inputItem {
        margin-top: 1.2rem;

        &:first-child {
            margin-top: 0;
        }
    }

    .buttonRegister {
        margin-top: 1rem;
    }

    .errorList {
        margin-top: 1rem;
    }
</style>
