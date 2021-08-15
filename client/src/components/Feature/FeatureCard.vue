<template>
  <div class="feature-card-wrapper">
    <div class="image-wrapper">
      <Image :source="data.IMAGE" :altText="data.TITLE" />
    </div>
    <div class="details">
      <div class="title">{{ data.TITLE }}</div>
      <div class="description">{{ data.DESCRIPTION }}</div>
    </div>
  </div>
</template>

<script>
import Image from "../Image.vue";
export default {
  name: "FeatureCard",
  props: {
    data: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  components: {
    Image,
  },
};
</script>

<style lang="scss" scoped>
.feature-card-wrapper {
  text-align: center;
  background-color: $theme-silver;
  box-shadow: 0 4px 12px 0px rgba(0, 0, 0, 0.2);
  .image-wrapper {
    height: 160px;
    overflow: hidden;
    cursor: pointer;
    img {
      height: 100%;
      transition: transform 3s;
      -webkit-transition: transform 3s;
      &:hover {
        transform: translateZ(0) scale(1.15);
      }
    }
  }
  .details {
    padding: 2rem;
    .title {
      font-size: $h5;
      font-weight: 500;
      padding: 10px 0;
    }
    .description {
      font-size: $medium;
    }
  }
}
</style>
