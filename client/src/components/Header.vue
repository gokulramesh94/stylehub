<template>
  <div class="header-wrapper">
    <div class="menu-actions">
      <div class="wishlist-icon-wrapper" @click="handleWishlistClick">
        <FontAwesomeIcon icon="heart" />
        <div v-if="wishList.length !== 0" class="cart-item-count">
          {{ wishList.length }}
        </div>
      </div>
      <div class="cart-icon-wrapper" @click="handleCartClick">
        <FontAwesomeIcon icon="shopping-cart" />
        <div v-if="getCartCount !== 0" class="cart-item-count">
          {{ getCartCount }}
        </div>
      </div>
      <div class="account-wrapper" @click="handleAccountClick">
        <FontAwesomeIcon icon="user" />
        <span v-if="getUser.username !== ''">Hi {{ getUser.username }}</span>
        <span v-else>Sign In</span>
      </div>
      <div
        class="account-wrapper"
        @click="handleLogout"
        v-if="getUser.username !== ''"
      >
        <FontAwesomeIcon icon="sign-out-alt" />
        <span>Sign Out</span>
      </div>
    </div>
    <div class="image-wrapper" @click="redirectUser">
      <Image altText="Style Hub Logo" :source="logo" />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Image from "../components/Image.vue";
import { Images, Strings } from "../constants";
import cookieUtils from "../utils/cookies";
import { productService } from "../services";

export default {
  name: "Header",
  data() {
    return {
      logo: Images.STYLEHUB_LOGO_WHITE,
      wishList: [],
    };
  },
  components: {
    Image,
  },
  methods: {
    ...mapActions("user", ["logout"]),
    ...mapActions("cart", [
      "addProductsToWishlist",
      "replaceCartFromServer",
      "replaceCartFromLocal",
    ]),
    handleLogout() {
      this.logout();
      location.reload();
    },
    redirectUser() {
      this.$router.push(Strings.ROUTES.HOME);
    },
    handleAccountClick() {
      if (this.getUser.username !== null && this.getUser.username !== "") {
        this.$router.push(Strings.ROUTES.ACCOUNT);
      } else {
        this.$router.push(Strings.ROUTES.LOGIN);
      }
    },
    handleCartClick() {
      this.$router.push(Strings.ROUTES.CART);
    },
    handleWishlistClick() {
      if (cookieUtils.getCookie("user"))
        this.$router.push(Strings.ROUTES.WISHLIST);
      else alert("Please Sign In to add product to wishlist.");
    },
  },
  watch: {
    getWishlistItems: function(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.wishList = newValue;
      }
    },
  },
  computed: {
    ...mapGetters("cart", ["getCartCount", "getWishlistItems"]),
    ...mapGetters("user", ["getUser", "isLoggedIn"]),
  },
  mounted() {
    if (this.isLoggedIn) {
      let user = this.getUser;
      productService
        .fetchCartItems(user.username, user.token)
        .then((response) => {
          if (response) {
            this.replaceCartFromServer(response);
          } else {
            alert("Session timed out. Please sign in to continue.");
            this.logout();
          }
        })
        .catch((error) => {
          console.log(error);
        });
      productService
        .getWishlistItems(user.username, user.token)
        .then((response) => {
          if (response) {
            this.wishList = response;
            this.addProductsToWishlist(response);
          } else {
            alert("Session timed out. Please sign in to continue.");
            this.logout();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      this.replaceCartFromLocal();
    }
  },
};
</script>

<style lang="scss" scoped>
.header-wrapper {
  width: 100%;
  height: 5rem;
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  align-items: center;
  padding: 1.1rem 2rem;
  background-color: $theme-red;
  .image-wrapper {
    height: 2.8rem;
    cursor: pointer;
    img {
      width: auto;
      height: 100%;
    }
  }
  .menu-actions {
    color: $theme-white;
    display: flex;
    cursor: pointer;
    svg {
      margin: 0 10px;
      font-size: $large;
    }
    .cart-icon-wrapper,
    .wishlist-icon-wrapper {
      position: relative;
      .cart-item-count {
        position: absolute;
        left: 55%;
        top: -10px;
        text-align: center;
        border-radius: 7px;
        width: 14px;
        height: 14px;
        background-color: $theme-light-yellow;
        border: 1px solid $theme-red;
        font-weight: 400;
        color: $theme-red;
        font-size: $small;
        font-weight: 500;
      }
    }
    .account-wrapper {
      margin: 0 10px;
      svg {
        margin: 0;
      }
      span {
        margin-left: 10px;
        font-size: $regular15;
        text-transform: capitalize;
      }
    }
  }
}
</style>
