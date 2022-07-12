<template>
    <div :class="$style.IndexPage">
        <div :class="$style.swiper">
            <div ref="slider"
                 class="swiper"
            >
                <div class="swiper-wrapper">
                    <div v-for="slide in slides"
                         :key="slide.id"
                         :class="$style.slide"
                         class="swiper-slide"
                    >
                        <div ref="image" :class="$style.image">
                            <!--                            1112-->
                            <img :src="slide.src" :class="$style.img" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div :class="$style.registerSection">
            <div :class="[$style.headerRegister, {
                [$style.headerRegister_active]: step !== 1
            }]"
            >
                <svg-icon v-if="step !== 1"
                          name="left-arrow"
                          :class="$style.iconBack"
                          @click="step = 1"
                />
                <h2 :class="$style.titleRegister">
                    {{ titleForm }}
                </h2>
            </div>
            <div v-if="step === 1"
                 :class="$style.contentRegister"
            >
                <div :class="$style.itemRegister"
                     @click="startRegister"
                >
                    регистрация
                </div>
                <div :class="$style.border"></div>
                <div :class="$style.itemLogin"
                     @click="startLogin"
                >
                    войти
                </div>
            </div>
            <div v-else-if="step === 2"
                 :class="$style.contentRegister"
            >
                <form :class="$style.form">
                    <VInput label="ваше имя"
                            :value="name"
                            :class-container="$style.inputItem"
                            @input="setName"
                    />
                    <VInput label="ваше почта"
                            :value="email"
                            :class-container="$style.inputItem"
                            @input="setEmail"
                    />
                    <VInput label="ваш пароль"
                            :value="password"
                            :class-container="$style.inputItem"
                            @input="setPassword"
                    />
                </form>
            </div>
            <div v-else-if="step === 3"
                 :class="$style.contentRegister"
            >
                login
            </div>
        </div>
    </div>
</template>

<script>
// import ImageLazy from '~/components/common/ImageLazy';
import Swiper from 'swiper/swiper-bundle.min';
import VInput from '~/components/input/VInput';
import { addResizeListener, removeResizeListener } from '~/assets/js/utils/resizeUtils';

export default {
    name: 'IndexPage',

    components: {
        // ImageLazy,
        VInput,
    },

    data() {
        return {

            step: 1,

            options: {
                slidesPerView: 3,
                loop: true,
            },

            slides: [
                {
                    id: 0,
                    src: '/images/slide1.jpeg',
                    // src: require('~/static/images/slide1.jpeg'),
                },
                {
                    id: 1,
                    // src: '~/static/images/slide2.jpeg',
                    src: require('~/static/images/slide2.jpeg'),
                },
                {
                    id: 2,
                    // src: '~/static/images/slide3.jpeg',
                    src: require('~/static/images/slide3.jpeg'),
                },
            ],

            name: '',
            email: '',
            password: '',
        };
    },

    head() {
        return {
            title: 'главная',
            meta: [
                // hid is used as unique identifier. Do not use `vmid` for it as it will not work
                {
                    hid: 'description',
                    name: 'description',
                    content: 'главная страница приложения',
                },
            ],
        };
    },

    computed: {
        titleForm() {
            switch (this.step) {
                case 1:
                    return 'начало';
                case 2:
                    return 'регистрация';
                case 3:
                    return 'войти';
                default:
                    return 'начало';
            }
        },
    },

    mounted() {
        addResizeListener(this.$refs.slider, this.update);
    },

    beforeDestroy() {
        removeResizeListener(this.$refs.slider, this.update);
        this.slider?.destroy();
    },

    methods: {
        initSwiper() {
            const options = {
                slidesPerView: 1,
                preventInteractionOnTransition: true,
                loop: true,
                effect: 'creative',
                speed: 2000,
                autoplay: {
                    delay: 4000,
                },

                creativeEffect: {
                    prev: {
                        shadow: false,
                        translate: ['-50%', 0, -1],
                    },

                    next: {
                        translate: ['100%', 0, 0],
                    },
                },

                navigation: {
                    nextEl: this.$refs.next || false,
                    prevEl: this.$refs.prev || false,
                    disabledClass: 'is-disabled',
                },
            };

            if (this.$refs?.slider) {
                this.slider = new Swiper(this.$refs?.slider, options);

                this.slider.on('slideChange', () => {
                    this.currentSlide = this.slider.realIndex;
                });
            }
        },

        update() {
            this.slider?.destroy();
            this.$nextTick(() => {
                this.initSwiper();
            });
        },

        // переход на форму регистрации
        startRegister() {
            this.step = 2;
        },

        // переход на форму входа
        startLogin() {
            this.step = 3;
        },

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
    },
};
</script>

<style lang="scss" module>
    .IndexPage {
        overflow: hidden;
        width: 100%;
        height: 100vh;
    }

    .swiper {
        width: 100%;
        height: 100%;
    }

    .slide {
        position: relative;
        width: 100%;
        height: 78rem;

        &:after {
            content: "";
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(75deg, rgba(0, 0, 0, .4) 0%, rgba(0, 0, 0, 0) 50.99%, rgba(217, 217, 217, 0) 50.99%);
        }

        @include respond-to(tablet) {
            height: 52.6rem;
        }

        @include respond-to(mobile) {
            height: 46.6rem;
        }
    }

    .image {
        position: relative;
        width: 100%;
        height: 100%;
        //display: flex;
    }

    .img {
        height: 100%;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
    }

    .registerSection {
        position: absolute;
        top: 50%;
        left: 50%;
        z-index: 100;
        overflow: hidden;
        min-width: 30rem;
        border-radius: 1.2rem;
        background-color: $white;
        transform: translate(-50%, -50%);
    }

    .headerRegister {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 1.3rem 1.1rem;
        background-color: $black-bg;

        &_active {
            justify-content: flex-start;

            .iconBack {
                margin-right: 10rem;
            }
        }
    }

    .titleRegister {
        text-align: center;
        font-size: 1.6rem;
        font-weight: 600;
        //line-height: 2rem;
        color: $white;
    }

    .contentRegister {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1.2rem 1.3rem;
    }

    .itemRegister {
        width: 50%;
        //padding: 1rem 2rem;
        text-align: center;
        font-size: 1.8rem;
        font-weight: 500;
        color: $green-main;
        cursor: pointer;
    }

    .border {
        position: absolute;
        top: 0;
        left: 50%;
        transform: translate(-50%, 0);
        width: 1px;
        background-color: #c6c6c6;
        height: 100%;
    }

    .itemLogin {
        width: 50%;
        //padding: 1rem 2rem;
        text-align: center;
        font-size: 1.8rem;
        font-weight: 500;
        color: $blue-main;
        cursor: pointer;
    }

    .iconBack {
        width: 1.6rem;
        height: 1.6rem;
        margin-right: 5rem;
        cursor: pointer;
        fill: $white;
    }

    .form {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
    }

    .inputItem {
        margin-top: 1.2rem;

        &:first-child {
            margin-top: 0;
        }
    }

</style>
