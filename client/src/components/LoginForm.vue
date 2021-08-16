<template>
  <div class="login-wrapper">
    <Header />
    <section class="login-form-wrapper">
      <div class="login-form">
        <div class="title">Sign In</div>
        <label for="username">User Name or Email</label>
        <input
          name="username"
          type="text"
          autocapitalize="off"
          autocorrect="off"
          autocomplete="off"
          v-model="username"
        />

        <label for="password">Password</label>
        <input
          name="password"
          type="password"
          autocomplete="off"
          v-model="password"
          class="password"
        />

        <div v-if="emptyFields" class="empty-fields-message">
          Please fill all the fields!
        </div>
        <div v-if="errorMessage" class="error-message">
          Incorrect username or password
        </div>

        <Button buttonText="Sign In" @handleClick="login" />

        <div class="signup">
          <div class="login-help">
            <div>
              Forgot your password? <span>Click here to reset it</span>.
            </div>
            <div class="new-account" @click="redirectToSignUp">
              Click here to create an account
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Button from "../components/Button";
import Header from "../components/Header";
import { Strings } from "../constants";
import userService from "../services/userService";

export default {
  data() {
    return {
      username: "",
      password: "",
      errorMessage: false,
      emptyFields: false,
    };
  },
  methods: {
    ...mapActions("user", ["setUser"]),
    login() {
      if (this.username === "" || this.password === "") {
        this.emptyFields = true;
      } else {
        this.emptyFields = false;
        userService
          .login(this.username, this.password)
          .then((response) => {
            if (response && response.username !== null) {
              this.errorMessage = false;
              this.setUser({
                username: this.username,
                token: response.token,
              });
              this.$router.push(Strings.ROUTES.HOME);
            } else {
              this.errorMessage = true;
            }
          })
          .catch((error) => console.error("Error while logging in : ", error));
      }
    },
    redirectToSignUp() {
      this.$router.push(Strings.ROUTES.ACCOUNT);
    },
  },
  components: {
    Button,
    Header,
  },
};
</script>

<style lang="scss" scoped>
.login-wrapper {
  .header-wrapper {
    ::v-deep(.menu-actions) {
      .account-wrapper {
        display: none;
      }
    }
  }
  .login-form-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 85vh;

    .login-form {
      display: flex;
      flex-direction: column;
      justify-content: center;
      max-width: 500px;
      width: 100%;
      padding: 20px;
      color: $theme-dark-gray;
      box-shadow: 0 4px 12px 0px rgb(0 0 0 / 10%);
      .title {
        font-size: $h4;
        font-weight: 500;
        text-align: center;
        margin-bottom: 10px;
      }
      label {
        margin: 10px 0;
      }
      input {
        padding: 10px;
      }
      .empty-fields-message,
      .error-message {
        margin-top: 10px;
        color: $theme-red;
      }
      button {
        margin-top: 20px;
      }
      .signup {
        margin-top: 20px;
        text-align: center;
        color: $theme-dark-gray;
        .new-account,
        span {
          color: $theme-red;
        }
        .new-account {
          margin-top: 10px;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
