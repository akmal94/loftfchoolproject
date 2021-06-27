import Vue from "vue";

const skillsItem = {
  props: ["skill"],
  template: "#skills-item",
  methods: {
      setCirclePercents(){
        const circle = this.$refs["colored-circle"];
        circle.style.strokeDashoffset = this.skill.percent;
      }
  },
  mounted() {
      this.setCirclePercents();
  },
};

const skillsRow = {
  props: ["category"],
  template: "#skills-row",
  components: {
    skillsItem,
  },
};

new Vue({
  el: "#skills-component",
  template: "#skills-list",
  components: {
    skillsRow,
  },
  data() {
    return {
      skills: [],
    };
  },
  created() {
    this.skills = require("../data/skills.json");
  },
});
