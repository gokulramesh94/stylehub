<template>
  <div class="cart-item-wrapper">
    <div class="image-wrapper">
      <Image :source="product.image" :altText="product.name" />
    </div>
    <div class="details">
      <div class="title">{{ product.name }}</div>
      <div class="cost">${{ product.price }}</div>
      <ProductCounter
        :count="product.quantity"
        @increaseCount="increaseCount"
        @decreaseCount="decreaseCount"
      />
    </div>
    <div class="ratings-section">
      <div>
        <div class="ratings">
          <FontAwesomeIcon
            v-for="(item, index) in product.ratings"
            :key="index"
            icon="star"
          />
        </div>
        <div class="comments">({{ product.comments.length }} reviews)</div>
      </div>
      <div class="remove" @click="removeProduct">Remove</div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Image from "../Image.vue";
import ProductCounter from "../ProductCounter.vue";

export default {
  name: "CartItem",
  components: {
    Image,
    ProductCounter,
  },
  props: {
    product: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      count: this.product.quantity || 1,
    };
  },
  methods: {
    ...mapActions("cart", ["removeProductFromCart", "updateCart"]),
    increaseCount() {
      this.count++;
      this.updateCart({
        product: this.product,
        key: "quantity",
        value: this.count,
      });
    },
    decreaseCount() {
      if (this.count > 1) {
        this.count--;
        this.updateCart({
          product: this.product,
          key: "quantity",
          value: this.count,
        });
      }
    },
    removeProduct() {
      if (confirm("Would you like to remove this product from Cart?")) {
        this.removeProductFromCart(this.product);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.cart-item-wrapper {
  display: flex;
  justify-content: space-between;
  padding: 20px;
  background-color: $theme-white;
  color: $theme-dark-gray;
  border-radius: 15px;
  box-shadow: 0 4px 12px 0px rgb(0 0 0 / 10%);
  .image-wrapper {
    height: 150px;
    width: 15%;
    overflow: hidden;
    cursor: pointer;
    position: relative;
    img {
      width: auto;
      height: 100%;
    }
    .heart-wrapper {
      position: absolute;
      top: -15px;
      right: 0;
    }
  }
  .details {
    width: 50%;
    .title {
      font-size: $regular17;
    }
    .cost {
      font-size: $h6;
      margin: 10px 0 20px;
    }
  }
  .ratings-section {
    width: 20%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    text-align: center;
    .ratings {
      color: $theme-red;
      margin-bottom: 10px;
    }
    .remove {
      color: $theme-red;
      cursor: pointer;
    }
  }
}
</style>
