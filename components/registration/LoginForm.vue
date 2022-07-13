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
        <VErrorList :error-list="errors"
                    :class-container="$style.buttonRegister"
        />
    </div>
</template>

<script>
import VInput from '~/components/ui/input/VInput';
import VButton from '~/components/ui/button/VButton';
import VErrorList from '~/components/ui/error/VErrorList';

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
            errors: [
                {
                    id: 0,
                    name: 'is name have base',
                },
                {
                    id: 1,
                    name: 'name length is big 10 characters',
                },
                {
                    id: 3,
                    name: 'password is not valid',
                },
            ],

            email: '',
            password: '',
        };
    },

    methods: {
        // установка имени
        setName(e) {
            this.name = e;
        },

        setEmail(e) {
            this.email = e;
        },

        setPassword(e) {
            this.password = e;
        },

        setLogin() {
            console.log('setLogin');
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
