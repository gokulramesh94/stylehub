<template>
  <div class="menu-wrapper">
    <div className="logo-wrapper" @click="redirectUser">
      <Image altText="Style Hub Logo" :source="logo" />
    </div>
    <div class="menu-items">
      <div class="menu-item" v-for="menu in menuItems" :key="menu.NAME">
        <div @click="handleMenuClick(menu.PATH)">{{ menu.NAME }}</div>
      </div>
      <div class="menu-item">
        <div @click="handleMenuClick('/about')">About</div>
      </div>
      <div class="menu-item">
        <div @click="handleMenuClick('/order-history', true)">
          Order History
        </div>
      </div>
    </div>
    <div class="copyright">
      <small>&copy; Copyright 2021, StyleHub Corporation</small>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Image from "../components/Image.vue";
import { Images, Strings } from "../constants";

export default {
  name: "Menu",
  data() {
    return {
      logo: Images.STYLEHUB_LOGO_WHITE,
      menuItems: Strings.SHOP.CATEGORIES,
    };
  },
  methods: {
    handleMenuClick(path, check) {
      if (check) {
        if (this.isLoggedIn) this.$router.push(path);
        else alert("Please sign in to view order history!");
      } else {
        this.$router.push(path);
      }
    },
  },
  computed: {
    ...mapGetters("user", ["isLoggedIn"]),
  },
  components: {
    Image,
  },
};
</script>

<style lang="scss" scoped>
.menu-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 1rem;
  background-color: $theme-red;
  color: $theme-white;
  .logo-wrapper {
    width: 75%;
  }
  .menu-items {
    padding: 3rem 0;
    text-align: center;
    .menu-item {
      padding: 1rem 0;
      text-transform: uppercase;
      font-size: $h6;
      cursor: pointer;
      &.active {
      }
    }
  }
  .copyright {
    font-size: $smallMedium;
  }
}
</style>
