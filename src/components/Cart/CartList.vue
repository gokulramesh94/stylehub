<template>
  <div class="cart-list-wrapper">
    <div v-if="isEmpty" class="empty">Your Cart is Empty!</div>
    <CartItem v-for="item in data" :key="item.id" :product="item" />
  </div>
</template>

<script>
import CartItem from "./CartItem";

export default {
  name: "CartList",
  components: {
    CartItem,
  },
  props: {
    data: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  computed: {
    isEmpty: function() {
      return this.data.length === 0 ? true : false;
    },
  },
};
</script>

<style lang="scss" scoped>
.cart-list-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  .cart-item-wrapper {
    &:not(:last-child) {
      margin-bottom: 20px;
    }
  }
  .empty {
    font-size: $h4;
  }
}
</style>
