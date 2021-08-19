<template>
  <div class="cart-wrapper">
    <Header />
    <div class="details">
      <div class="items-wrapper">
        <OrderList :data="orders" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Header from "../components/Header.vue";
import OrderList from "../components/Order/OrderList.vue";
import { productService } from "../services";

export default {
  name: "OrderHistory",
  data() {
    return {
      orders: [],
    };
  },
  components: {
    Header,
    OrderList,
  },
  computed: {
    ...mapGetters("user", ["getUser", "isLoggedIn"]),
  },
  mounted() {
    if (this.isLoggedIn) {
      let user = this.getUser;
      productService
        .fetchOrderHistory(user.username, user.token)
        .then((response) => {
          this.orders = response;
        });
    } else {
      alert("Please sign in to view order history!");
      this.$router.push("/");
    }
  },
};
</script>

<style lang="scss" scoped>
.cart-wrapper {
  color: $theme-dark-gray;
  .details {
    display: flex;
    justify-content: center;
    width: 60%;
    margin: 30px auto;
    .items-wrapper {
      width: 100%;
    }
  }
}
</style>
