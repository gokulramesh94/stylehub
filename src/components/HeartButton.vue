<template>
  <div class="heart-wrapper">
    <div
      :class="customClass"
      :style="{ 'background-image': 'url(' + heartImage + ')' }"
      @click="toggleClass($event)"
    ></div>
  </div>
</template>

<script>
import { Images } from "../constants";
import cookieUtilss from "../utils/cookies";

export default {
  name: "HeartButton",
  data() {
    return {
      heartImage: Images.HEART,
      buttonState: this.isWishListed,
    };
  },
  props: {
    isWishListed: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    customClass: function() {
      return this.buttonState ? "heart is-active" : "heart";
    },
  },
  watch: {
    isWishListed: function(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.buttonState = newValue;
      }
    },
  },
  methods: {
    toggleClass: function(event) {
      if (cookieUtilss.getCookie("user")) {
        this.buttonState = !this.buttonState;
        this.$emit("handleChange", {
          buttonState: this.buttonState,
          event: event,
        });
      } else {
        event.stopPropagation();
        alert("Please Sign In to add product to wishlist.");
      }
    },
  },
  mounted() {
    this.buttonState = this.isWishListed;
  },
};
</script>

<style lang="scss" scoped>
.heart-wrapper {
  z-index: 5;
  .heart {
    width: 80px;
    height: 80px;
    background-repeat: no-repeat;
    background-position: 0 0;
    cursor: pointer;
    transition: background-position 1s steps(28);
    transition-duration: 0s;

    &.is-active {
      transition-duration: 1s;
      background-position: -2800px 0;
    }
  }
}
</style>
