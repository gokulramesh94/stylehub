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
import { mapActions, mapGetters } from "vuex";
import Button from "../components/Button.vue";
import { Strings } from "../constants";
import { productService } from "../services";

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
    ...mapGetters("user", ["getUser", "isLoggedIn"]),
    grandTotal: function() {
      let count = 0;
      this.data.forEach((item) => {
        count += item.price * item.quantity;
      });
      return count;
    },
  },
  methods: {
    ...mapActions("cart", ["removeAllProductsFromCart"]),
    confirmOrder() {
      console.log(this.isLoggedIn);
      if (this.isLoggedIn) {
        let user = this.getUser;
        productService
          .placeOrder(user.username, {
            date: Date.now(),
            order: this.data,
            total: this.grandTotal,
          })
          .then((response) => {
            console.log("true");
            this.showConfirmation(response, user);
          });
      } else {
        productService
          .placeOrder(null, {
            date: Date.now(),
            order: this.data,
            total: this.grandTotal,
          })
          .then((response) => {
            console.log("false");
            this.showConfirmation(response, null);
          });
      }
    },
    showConfirmation(message, user) {
      this.removeAllProductsFromCart();
      alert(message);
      console.log(user);
      if (user) {
        productService
          .removeAllItemsFromCart(user.username, user.token)
          .then(() => {
            this.$router.push(Strings.ROUTES.HOME);
          });
      } else {
        this.$router.push(Strings.ROUTES.HOME);
      }
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
