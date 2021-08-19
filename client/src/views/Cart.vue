<template>
  <div class="cart-wrapper">
    <Header />
    <div class="details">
      <div class="items-wrapper">
        <CartList :data="getCartItems" />
      </div>
      <div v-if="getCartItems.length > 0" class="price-details">
        <div class="title">Cart Summary</div>
        <OrderSummary :data="getCartItems" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Header from "../components/Header.vue";
import CartList from "../components/Cart/CartList.vue";
import OrderSummary from "../components/OrderSummary.vue";

export default {
  name: "Cart",
  components: {
    Header,
    CartList,
    OrderSummary,
  },
  computed: {
    ...mapGetters("cart", ["getCartItems"]),
  },
};
</script>

<style lang="scss" scoped>
.cart-wrapper {
  color: $theme-dark-gray;
  .details {
    display: flex;
    justify-content: space-between;
    width: 75%;
    margin: 30px auto;
    .items-wrapper {
      width: 55%;
    }
    .price-details {
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 40%;
      height: fit-content;
      background-color: $theme-white;
      padding: 20px;
      border-radius: 15px;
      box-shadow: 0 4px 12px 0px rgb(0 0 0 / 10%);
      .title {
        font-size: $h5;
      }
    }
  }
}
</style>
