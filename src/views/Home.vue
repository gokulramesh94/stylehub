<template>
  <div class="home-wrapper">
    <Menu />
    <div class="content-wrapper">
      <Header />
      <div class="category-title">{{ category }}</div>
      <ProductList :data="products" />
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Header from "../components/Header.vue";
import Menu from "../components/Menu.vue";
import ProductList from "../components/Product/ProductList.vue";
import { productService } from "../services";

let products = [];

export default {
  name: "Home",
  props: {
    category: {
      type: String,
      default: "men",
    },
  },
  components: {
    Header,
    Menu,
    ProductList,
  },
  data() {
    return {
      products,
    };
  },
  mounted: function() {
    this.fetchProductsByCategory(this.category);
  },
  watch: {
    "$route.params.category": function(category) {
      this.fetchProductsByCategory(category);
    },
  },
  methods: {
    ...mapActions("cart", ["updateProducts"]),
    fetchProductsByCategory(category) {
      productService
        .getProductByCategory(category)
        .then((response) => {
          this.updateProducts(response);

          this.products = response;
          this.$forceUpdate();
        })
        .catch((error) =>
          console.error(
            "Error while fetching products from the product service : ",
            error
          )
        );
    },
  },
};
</script>

<style lang="scss" scoped>
.home-wrapper {
  width: 100%;
  height: 100vh;
  display: flex;
  overflow: hidden;
  .menu-wrapper {
    width: 20%;
    height: 100%;
  }

  .content-wrapper {
    width: 80%;
    height: 100%;
    padding: 0 3rem;
    overflow-y: scroll;
    .header-wrapper {
      background-color: $theme-white;
      ::v-deep(.image-wrapper) {
        display: none;
      }
      ::v-deep(.menu-actions) {
        color: $theme-red;
        span {
          color: $theme-black;
        }
      }
    }
    .category-title {
      font-size: $h4;
      font-weight: 500;
      text-transform: capitalize;
      margin: 15px 0;
    }
  }
}
</style>
