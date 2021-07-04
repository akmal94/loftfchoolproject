import Vue from "vue";

const thumbs = {
  props: ["works", "currentWork"],
  template: "#preview-thumbs",
};

const btns = {
  props: ["works","currentWork"],
  template: "#preview-btns",
  computed: {
    nextBtnDisabled() {
      return this.works.length == this.currentWork.id;
    },
    prevBtnActive(){
      return this.currentWork.id > 1;
    }
  },
};

const display = {
  props: ["currentWork", "works", "currentIndex"],
  template: "#preview-display",
  components: { thumbs, btns },
  computed: {
    reversedWorks() {
      const works = [...this.works];
      return works.slice(0, 3).reverse();
    },
  },
};

const tags = {
  props: ["tags"],
  template: "#preview-tags",
};

const info = {
  props: ["currentWork"],
  template: "#preview-info",
  components: { tags },
  computed: {
    tagsArray() {
      return this.currentWork.skills.split(",");
    },
  },
};

new Vue({
  el: "#preview-component",
  template: "#preview-container",
  components: { display, info },
  data() {
    return {
      works: [],
      currentIndex: 0,
    };
  },
  computed: {
    currentWork() {
      return this.works[0];
    },
  },
  methods: {
    requireImagesToArray(data) {
      return data.map((item) => {
        const requiredImage = require(`../images/content/${item.photo}`)
          .default;
        item.photo = requiredImage;
        return item;
      });
    },
    slide(direction) {
      const lastItem = this.works[this.works.length - 1];
      switch (direction) {
        case "next":
          const worksNumber = this.works.length - 1;
          if (this.currentIndex == worksNumber) {
            return;
          }
          this.works.push(this.works[0]);
          this.works.shift();
          this.currentIndex++;
          break;
        case "prev":
          if (this.currentIndex == 0) {
            return;
          }
          this.works.unshift(lastItem);
          this.works.pop();
          this.currentIndex--;
          break;
      }
    },
  },
  created() {
    const data = require("../data/works.json");
    this.works = this.requireImagesToArray(data);
  },
});
