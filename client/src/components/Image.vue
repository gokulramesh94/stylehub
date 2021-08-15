<template>
  <img v-if="source" :src="source" :alt="altText" />
  <img v-else :src="imageUnavailable" :alt="altText" />
</template>

<script>
import { Images } from "../constants";
export default {
  name: "Image",
  data() {
    return {
      imageUnavailable: Images.IMAGE_UNAVAILABLE,
    };
  },
  props: {
    source: String,
    altText: {
      type: String,
      default: "Image Unavailable",
    },
  },
};
</script>

<style lang="scss" scoped>
img {
  width: 100%;
  height: auto;
}
</style>
