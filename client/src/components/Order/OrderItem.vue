<template>
  <div class="order-item-wrapper">
    <div class="image-wrapper">
      <Image :source="product.image" :altText="product.name" />
    </div>
    <div class="details">
      <div class="title">{{ product.name }}</div>
      <div class="cost">${{ product.price }}</div>
      <div class="count">Quantity - {{ count }}</div>
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
      </div>
    </div>
  </div>
</template>

<script>
import Image from "../Image.vue";

export default {
  name: "OrderItem",
  components: {
    Image,
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
};
</script>

<style lang="scss" scoped>
.order-item-wrapper {
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
      font-size: $h6;
      font-weight: 500;
    }
    .cost {
      font-size: $h6;
      margin: 10px 0 20px;
      color: $theme-red;
    }
    .count {
      font-size: $regular15;
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
