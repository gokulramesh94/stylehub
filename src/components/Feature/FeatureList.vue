<template>
  <div class="feature-list-wrapper">
    <FeatureCard v-for="(item, index) in data" :key="index" :data="item" />
  </div>
</template>

<script>
import FeatureCard from "./FeatureCard.vue";

export default {
  name: "FeatureList",
  components: {
    FeatureCard,
  },
  props: {
    data: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.feature-list-wrapper {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  .feature-card-wrapper {
    width: 22% !important;
    &:not(:last-child) {
      margin-right: 4%;
    }
  }
}
</style>
