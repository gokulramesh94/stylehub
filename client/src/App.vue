<template>
  <router-view />

  <teleport to="#loader">
    <Loader />
  </teleport>
</template>

<script>
import Loader from "./components/Loader.vue";
export default {
  name: "App",
  components: {
    Loader,
  },
};
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}
html,
body {
  margin: 0;
  padding: 0;
  font-family: $font-rubik;
  font-size: 14px;
}
body {
  position: relative;
  &.no-scroll {
    overflow: hidden;
  }
  #loader {
    height: 100vh;
    top: 0;
    position: absolute;
    background-color: rgba(0, 0, 0, 0.8);
    width: 100%;
    z-index: 2;
  }
  .hide {
    display: none !important;
  }
}
</style>
