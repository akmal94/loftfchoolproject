<template>
  <div class="user-component">
    <avatar size="2.7" :src="userPic" />
    <div class="username">Акмаль Искаков</div>
  </div>
</template>

<script>
import avatar from "../avatar";
export default {
  components: {
    avatar,
  },
  computed: {
    userPic() {
      return require("../../../images/content/user.jpg").default;
    },
  },
};
</script>

<style lang="postcss" scoped src="./user.pcss">
</style>