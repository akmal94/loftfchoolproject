import Vue from "vue";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/swiper-bundle.css";

new Vue({
  el: "#reviews-component",
  template: "#reviews-container",
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      reviews: [],
      sliderOptions: {
        slidesPerView: 2,
        loop: false,
      },
      nextBtnDisabled: false,
      prevBtnDisabled: true
    };
  },
  computed: {
    slider() {
      return this.$refs["slider"].$swiper;
    },
  },
  methods: {
    requireImagesToArray(data) {
      return data.map((item) => {
        item.pic = require(`../images/content/${item.pic}`).default;
        return item;
      });
    },
    slide(direction) {
      switch (direction) {
        case "next":
          if (this.slider.activeIndex + 1 == this.slider.slides.length - 2) {
            this.nextBtnDisabled = true;
          }
          this.prevBtnDisabled = false;
          this.slider.slideNext()
          break;
        case "prev":
          if(this.slider.activeIndex == 1){
            this.prevBtnDisabled = true;
          }
          this.slider.slidePrev();
          this.nextBtnDisabled = false;
          break;
      }
    },
  },
  created() {
    const data = require("../data/reviews.json");
    this.reviews = this.requireImagesToArray(data);
  },
});
