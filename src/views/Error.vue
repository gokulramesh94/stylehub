<template>
  <div class="error-page-wrapper">
    <img :src="Images.ERROR_PAGE" />
    <div class="details">
      <div class="heading">Oops!</div>
      <div class="sub-heading">
        We can't seem to find the page you're looking for.
      </div>
      <div class="error-code">Error Code: 404</div>
      <div class="message">
        Please return back to the site's
        <router-link to="/">Home Page</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { Images } from "../constants";
export default {
  name: "Error",
  data() {
    return {
      Images: Images,
    };
  },
};
</script>

<style lang="scss" scoped>
.error-page-wrapper {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: $theme-dark-gray;
  img {
    width: 40%;
  }
  .details {
    width: 60%;
    .heading {
      font-size: 10rem;
      font-weight: 500;
      color: $theme-red;
    }
    .sub-heading {
      font-size: $h3;
    }
    .error-code {
      font-size: $h5;
      color: $theme-gray;
      margin: 10px 0;
    }
    .message {
      font-size: $regular17;
      color: $theme-gray;
      margin: 10px 0;
      a {
        text-decoration: none;
        color: $theme-red;
      }
    }
  }
}
</style>
