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
          v-model="account.phone"
          name="phoneNumber"
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
          <Button
            buttonText="Cancel"
            @handleClick="(event) => cancelAction(event)"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Button from "../components/Button.vue";
import Header from "../components/Header.vue";
import cookieUtils from "../utils/cookies";
import { Strings } from "../constants";
import { userService } from "../services";
import { isValidPhoneNumber, isValidEmail } from "../utils/validations";

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
        phone: "",
        address: "",
      },
    };
  },
  computed: {
    ...mapGetters("user", ["getUser"]),
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
    submitForm() {
      if (
        this.account.username &&
        this.account.username !== "" &&
        this.account.password &&
        this.account.password !== "" &&
        this.account.email &&
        this.account.email !== "" &&
        this.account.firstname &&
        this.account.firstname !== "" &&
        this.account.lastname &&
        this.account.lastname !== "" &&
        this.account.phone &&
        this.account.phone !== "" &&
        this.account.address &&
        this.account.address !== ""
      ) {
        if (isValidEmail(this.account.email)) {
          if (isValidPhoneNumber(this.account.phone)) {
            userService
              .register(this.account)
              .then((response) => {
                alert(response);
                if (this.getUser.username !== null) {
                  this.$router.push(Strings.ROUTES.HOME);
                } else {
                  this.$router.push(Strings.ROUTES.LOGIN);
                }
              })
              .catch((error) => console.log(error));
          } else {
            alert("Incorrect Phone Number format!");
          }
        } else {
          alert("Incorrect Email format!");
        }
      } else {
        alert("Please fill all the fields!");
      }
    },
    cancelAction(event) {
      event.preventDefault();
      window.history.back();
    },
  },
  mounted() {
    let user = JSON.parse(cookieUtils.getCookie("user")) || {};
    if (user.username !== null) {
      userService
        .fetchUserInfo(user.username, user.token)
        .then((response) => {
          this.account = response || {};
        })
        .catch((error) => {
          alert("Oops! Something went wrong!");
          console.log(error);
        });
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
