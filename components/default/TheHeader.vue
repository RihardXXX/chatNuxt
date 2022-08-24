<template>
    <header :class="$style.headerMain">
        <VButton name="создать комнату"
                 :class-container="$style.button"
                 @click.native="openModal"
        >
            <div :class="$style.addRoom">
                <div :class="$style.horizontal"></div>
                <div :class="$style.vertical"></div>
            </div>
        </VButton>
        <div :class="$style.iconInstagramSection">
            <svg-icon name="logoHeader"
                      :class="$style.iconInstagram"
            />
        </div>
        <div :class="$style.rooms"
             @click="selectRooms"
        >
            <svg-icon name="rooms"
                      :class="$style.exitIcon"
            />
        </div>
        <PersonLogo :username="username"
                    img="/images/avatar1.png"
        />
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
import VButton from '~/components/ui/button/VButton';
import ModalRoomCreate from '~/components/main/ModalRoomCreate';
import PersonLogo from '~/components/common/PersonLogo';

export default {
    name: 'TheHeader',

    components: {
        VButton,
        PersonLogo,
    },

    computed: {
        ...mapState('authorization', [
            'user',
        ]),

        ...mapState([
            'currentRoom',
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

        // выбрать комнату
        selectRooms() {
            // выходим из текущей комнаты
            // когда пользователь выходит сообщаем остальным что пользователь вышел
            this.$socket.emit('exitRoom', { user: this.user, room: this.currentRoom });
            this.$router.push('/');
        },

        // открываем модалку для создания комнаты
        openModal() {
            console.log('open');
            this.$modal.open(ModalRoomCreate);
        },
    },
};
</script>

<style lang="scss" module>
    .headerMain {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        max-height: 20vh;
        //padding: 1rem;
        border-top: 1px solid $gray-600;
    }

    .iconInstagramSection {
        position: absolute;
        bottom: 0;
        left: 0;
    }

    .iconInstagram {
        width: 14rem;
        height: 4rem;
    }

    //.person {
    //    position: relative;
    //    display: flex;
    //    justify-content: center;
    //    width: 8rem;
    //    height: 9.1rem;
    //    //border: 1px solid black;
    //}
    //
    //.borderLogo {
    //    position: relative;
    //    display: flex;
    //    align-items: center;
    //    justify-content: center;
    //    width: 6.7rem;
    //    height: 6.7rem;
    //    margin-top: .5rem;
    //    border-radius: 100%;
    //    background: #fff;
    //    text-align: center;
    //
    //    &:before {
    //        content: "";
    //        position: absolute;
    //        top: -2.3px;
    //        right: -2.3px;
    //        bottom: -2.3px;
    //        left: -2.3px;
    //        z-index: -1;
    //        border-radius: 100%;
    //        background: linear-gradient(180deg, #de0046, #f7a34b);
    //    }
    //}

    //.avatar {
    //    z-index: 112;
    //    width: 6rem;
    //    height: 6rem;
    //}
    //
    //.username {
    //    position: absolute;
    //    bottom: .5rem;
    //    left: 50%;
    //    text-align: center;
    //    font-size: 1.15rem;
    //    font-weight: 400;
    //    transform: translateX(-50%);
    //}

    .rooms {
        position: relative;
        height: 100%;

        &:before {
            content: "комнаты";
            position: absolute;
            top: -1.5rem;
            right: 0;
            z-index: 112;
            font-size: 1.2rem;
            font-weight: 500;
        }
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

    .button {
        position: absolute;
        top: 0;
        left: 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 20%;
        padding: .4rem .6rem;
        border: 2px solid $black-900;

        span {
            color: $black-900;
        }

        &:hover {
            border: 2px solid $white;

            .addRoom {
                border: 2px solid $white;
                transition: .7s;
            }

            .horizontal {
                background-color: $white;
                transition: .7s;
            }

            .vertical {
                background-color: $white;
                transition: .7s;
            }
        }
    }

    .addRoom {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 2rem;
        height: 2rem;
        padding: .2rem;
        border-radius: .5rem;
        border: 2px solid $black-900;
    }

    .horizontal {
        width: 100%;
        height: .3rem;
        border-radius: 2px;
        background-color: $black-900;
    }

    .vertical {
        position: absolute;
        top: 50%;
        left: 50%;
        width: .3rem;
        height: 85%;
        border-radius: 2px;
        background-color: $black-900;
        transform: translate(-50%, -50%);
    }
</style>
