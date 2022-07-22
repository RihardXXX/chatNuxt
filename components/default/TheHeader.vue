<template>
    <header :class="$style.headerMain">
        <div :class="$style.person">
            <div :class="$style.borderLogo">
                <img src="/images/avatar1.png"
                     :class="$style.avatar"
                />
            </div>
            <div :class="$style.username">
                {{ username }}
            </div>
        </div>
        <div :class="$style.exit"
             @click="exitLogin"
        >
            <svg-icon name="exit"
                      :class="$style.exitIcon"
            />
        </div>
    </header>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    name: 'TheHeader',

    computed: {
        ...mapState('authorization', [
            'user',
        ]),

        username() {
            return this.user.username;
        },
    },

    methods: {
        ...mapActions('authorization', [
            'logout',
        ]),

        // разлогинится
        exitLogin() {
            this.logout();
        },
    },
};
</script>

<style lang="scss" module>
    .headerMain {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        max-height: 20vh;
        //padding: 1rem;
        border-top: 1px solid $gray-600;
    }

    .person {
        position: relative;
        display: flex;
        justify-content: center;
        width: 8rem;
        height: 9.1rem;
        //border: 1px solid black;
    }

    .borderLogo {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 6.7rem;
        height: 6.7rem;
        margin-top: .5rem;
        border-radius: 100%;
        background: #fff;
        text-align: center;

        &:before {
            content: "";
            position: absolute;
            top: -2.3px;
            right: -2.3px;
            bottom: -2.3px;
            left: -2.3px;
            z-index: -1;
            border-radius: 100%;
            background: linear-gradient(180deg, #de0046, #f7a34b);
        }
    }

    .avatar {
        z-index: 112;
        width: 6rem;
        height: 6rem;
    }

    .username {
        position: absolute;
        bottom: .5rem;
        left: 50%;
        text-align: center;
        font-size: 1.15rem;
        font-weight: 400;
        transform: translateX(-50%);
    }

    .exit {
        position: relative;
        height: 100%;

        &:before {
            content: "выйти";
            position: absolute;
            top: -1.5rem;
            left: 0;
            z-index: 112;
            font-size: 1.2rem;
            font-weight: 500;
        }
    }

    .exitIcon {
        width: 2rem;
        height: 2rem;
        cursor: pointer;
        fill: $black-600;
    }
</style>
