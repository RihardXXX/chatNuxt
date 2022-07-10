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
                            <img :src="slide.src" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// import ImageLazy from '~/components/common/ImageLazy';
import Swiper from 'swiper/swiper-bundle.min';
import { addResizeListener, removeResizeListener } from '~/assets/js/utils/resizeUtils';

export default {
    name: 'IndexPage',

    components: {
        // ImageLazy,
    },

    data() {
        return {
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
        };
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
                speed: 500,
                // временно закоментил чтобы не было дублирования слайдов
                // loopedSlides: 4,
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
    },
};
</script>

<style lang="scss" module>
    .IndexPage {
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
    }

</style>
