<template>
  <div class="account-wrapper">
    <Header />
    <div class="content">
      <form v-on:submit.prevent="submitForm" class="form-wrapper" method="post">
        <div class="title">{{ title }}</div>
        <input
          type="text"
          placeholder="Username"
          v-model="account.username"
          name="username"
          autocapitalize="off"
          autocorrect="off"
          autocomplete="off"
        />
        <input
          type="text"
          placeholder="First Name"
          v-model="account.firstname"
          name="firstname"
          autocapitalize="off"
          autocorrect="off"
          autocomplete="off"
        />
        <input
          type="text"
          placeholder="Last Name"
          v-model="account.lastname"
          name="lastname"
          autocapitalize="off"
          autocorrect="off"
          autocomplete="off"
        />
        <input
          type="password"
          placeholder="Password"
          v-model="account.password"
          name="password"
          autocapitalize="off"
          autocorrect="off"
          autocomplete="off"
        />
        <input
          type="text"
          placeholder="Phone Number"
          v-model="account.phoneNUmber"
          name="phoneNUmber"
          autocapitalize="off"
          autocorrect="off"
          autocomplete="off"
        />
        <input
          type="email"
          placeholder="Email"
          v-model="account.email"
          name="email"
          autocapitalize="off"
          autocorrect="off"
          autocomplete="off"
        />
        <input
          type="text"
          placeholder="Address"
          v-model="account.address"
          name="address"
          autocapitalize="off"
          autocorrect="off"
          autocomplete="off"
        />
        <div class="action-wrapper">
          <Button :buttonText="buttonText" />
          <Button buttonText="Cancel" @handleClick="(event) => cancelAction(event)" />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Button from "../components/Button.vue";
import Header from "../components/Header.vue";
import cookieUtils from "../utils/cookies";
import { Strings } from "../constants";

export default {
  name: "Account",
  components: {
    Button,
    Header,
  },
  data() {
    return {
      account: {
        username: "",
        password: "",
        email: "",
        firstname: "",
        lastname: "",
        phoneNumber: "",
        address: "",
      },
    };
  },
  computed: {
    ...mapGetters("user", ["getUserById"]),
    title: function() {
      if (cookieUtils.getCookie("user")) {
        return "Account Details";
      } else {
        return "Sign Up";
      }
    },
    buttonText: function() {
      if (cookieUtils.getCookie("user")) {
        return "Update";
      } else {
        return "Register";
      }
    },
  },
  methods: {
    ...mapActions("user", ["addUser", "updateUser"]),
    submitForm() {
      let user = cookieUtils.getCookie("user")
        ? JSON.parse(cookieUtils.getCookie("user"))
        : null;
      if (user) {
        console.log(user.username);
        this.updateUser({ check: user.username, value: this.account });
      } else {
        this.addUser(this.account);
        alert("Registration Successful!");
        this.$router.push(Strings.ROUTES.LOGIN);
      }
    },
    cancelAction(event) {
      event.preventDefault();
      window.history.back();
    },
  },
  mounted() {
    let user = cookieUtils.getCookie("user")
      ? JSON.parse(cookieUtils.getCookie("user"))
      : null;
    if (user) {
      let userInfo = this.getUserById(user.username);
      this.account = userInfo[0] || {};
    }
  },
};
</script>

<style lang="scss" scoped>
.account-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  .header-wrapper {
    ::v-deep(.menu-actions) {
      visibility: hidden;
    }
  }
  .content {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    .form-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      max-width: 750px;
      padding: 40px 25px;
      border-radius: 15px;
      box-shadow: 0 4px 12px 0px rgb(0 0 0 / 10%);
      input {
        width: 100%;
        padding: 15px;
        border: 1px solid $theme-light-gray;
        border-radius: 10px;
        margin: 10px 0;
      }
      .title {
        font-size: $h4;
        color: $theme-gray;
        text-align: center;
        margin-bottom: 15px;
      }
      .action-wrapper {
        width: 100%;
        display: flex;
        justify-content: center;
        button {
          width: 30%;
          margin-top: 20px;
          &:last-child {
            margin-left: 5%;
          }
        }
      }
    }
  }
}
</style>
