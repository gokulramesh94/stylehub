<template>
  <div class="order-summary-wrapper">
    <div class="heading">
      <div class="title">Product</div>
      <div class="title">Price</div>
      <div class="title">Quantity</div>
    </div>
    <div v-for="item in data" :key="item.id" class="order-tile">
      <div class="title">{{ item.name }}</div>
      <div class="price">${{ item.price }}</div>
      <div class="quantity">{{ item.quantity }}</div>
    </div>
    <div class="grand-total">Grand Total : ${{ grandTotal }}</div>
    <Button @handleClick="confirmOrder" buttonText="Place Order" />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Button from "../components/Button.vue";
import { Strings } from "../constants";

export default {
  name: "OrderSummary",
  components: {
    Button,
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
    grandTotal: function() {
      let count = 0;
      this.data.forEach((item) => {
        count += item.price * item.quantity;
      });
      return count;
    },
  },
  methods: {
    ...mapActions("cart", ["removeAllProductsFromCart", "placeOrder"]),
    confirmOrder() {
      this.placeOrder({
        date: Date.now(),
        order: this.data,
        total: this.grandTotal,
      });
      this.removeAllProductsFromCart();
      alert("Order Placed!");
      this.$router.push(Strings.ROUTES.HOME);
    },
  },
};
</script>

<style lang="scss" scoped>
.order-summary-wrapper {
  .heading {
    display: flex;
    margin: 20px 0;
    .title {
      font-size: $regular17;
      font-weight: 500;
      &:first-child {
        width: 60%;
      }
      &:not(:first-child) {
        width: 20%;
      }
    }
  }
  .order-tile {
    display: flex;
    margin: 10px 0;
    font-size: $regular15;
    .title {
      width: 60%;
    }
    .price,
    .quantity {
      width: 20%;
    }
  }
  .grand-total {
    text-align: end;
    margin-top: 30px;
    font-size: $h6;
    font-weight: 500;
  }
  button {
    width: 100%;
    margin-top: 20px;
  }
}
</style>
