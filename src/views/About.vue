<template>
  <div class="about-wrapper">
    <Header />
    <div v-for="banner in banners" class="banner-wrapper" :key="banner.NAME">
      <Image :source="banner.IMAGE_SOURCE" :altText="banner.NAME" />
    </div>
    <FeatureList :data="info" />
    <Button buttonText="Shop Now" @click="handleClick" />
  </div>
</template>

<script>
import Header from "../components/Header";
import Button from "../components/Button";
import Image from "../components/Image";
import FeatureList from "../components/Feature/FeatureList.vue";
import { Strings } from "../constants";

export default {
  name: "About",
  components: {
    Button,
    Header,
    Image,
    FeatureList,
  },
  data() {
    return {
      banners: Strings.ABOUT.BANNER,
      info: Strings.ABOUT.INFO,
    };
  },
  methods: {
    handleClick() {
      this.$router.push(Strings.ROUTES.HOME);
    },
  },
};
</script>

<style lang="scss" scoped>
.about-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 4rem;
  .banner-wrapper {
    width: 75%;
    padding: 2rem 0;
    &:last-child {
      padding-top: 0;
    }
  }
  .feature-list-wrapper {
    width: 75%;
    margin-bottom: 4rem;
  }
}
</style>
