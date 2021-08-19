<template>
  <div class="wishlist-wrapper">
    <Header />
    <div class="content">
      <List :data="getWishlistItems" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Header from "../components/Header.vue";
import List from "../components/WishList/List.vue";

export default {
  name: "Wishlist",
  components: {
    Header,
    List,
  },
  computed: {
    ...mapGetters("cart", ["getWishlistItems"]),
  },
};
</script>

<style lang="scss" scoped>
.wishlist-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .content {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 30px 0;
    width: 60%;
    ::v-deep(.product-counter-wrapper) {
      display: none;
    }
  }
}
</style>
