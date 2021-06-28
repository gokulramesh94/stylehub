<template>
  <div class="product-list-wrapper">
    <div v-if="isEmpty">No Products to display</div>
    <ProductCard v-for="item in data" :key="item.id" :product="item" />
  </div>
</template>

<script>
import ProductCard from "./ProductCard.vue";

export default {
  name: "ProductList",
  components: {
    ProductCard,
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
.product-list-wrapper {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  .product-card-wrapper {
    width: 22% !important;
    margin-bottom: 4%;
    &:not(:nth-child(4n)) {
      margin-right: 4%;
    }
  }
}
</style>
