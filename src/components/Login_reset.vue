<template>
  <div class="w-full max-w-xs">
    <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" @submit.prevent="onSubmit">
      <div class="mb-4" v-if="!showUpdatePassword">
        <h2>LOGIN</h2>
      </div>
      <div class="mb-4" v-else>
        <h2>UPDATE PASSWORD</h2>
        <p
          class="text-red-500 text-xs italic mt-2"
        >Your password has expired. Please enter a new password.</p>
      </div>
      <div class="mb-4 mt-2" v-show="!showUpdatePassword">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="username">Username</label>
        <input
          v-model="username"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Username"
          :disabled="isLoading"
        >
      </div>
      <div class="mb-4 mt-2" v-show="!showUpdatePassword">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="password">Password</label>
        <input
          v-model="password"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          type="password"
          placeholder="******************"
          :disabled="isLoading"
        >
      </div>
      <div class="mb-4 mt-2" v-if="showUpdatePassword">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="newPassword">New Password</label>
        <input
          v-model="newPassword"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          type="password"
          placeholder="******************"
          :disabled="isLoading"
        >
      </div>
      <div class="mb-4 mt-2" v-if="showUpdatePassword">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="newPassword"
        >New Password (again)</label>
        <input
          v-model="newPassword2"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          type="password"
          placeholder="******************"
          :disabled="isLoading"
        >
      </div>
      <div v-if="errorMessage" class="mt-2 mb-2">
        <p class="text-red-500 text-xs italic">{{ errorMessage }}</p>
      </div>
      <div class="flex items-center justify-around mt-4">
        <button
          class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >Sign In</button>
      </div>
    </form>
    <pre>{{ {isLoading, errorMessage, showUpdatePassword, loginSuccess} }}</pre>
  </div>
</template>

<script>
import Request from "../util/request";

export default {
  data() {
    return {
      username: "",
      password: "",
      newPassword: "",
      newPassword2: "",
      isLoading: false,
      errorMessage: null,
      showUpdatePassword: false,
      loginSuccess: false
    };
  },
  methods: {
    onSubmit(e) {
      this.isLoading = true;
      this.errorMessage = null;

      if (this.showUpdatePassword) {
        const { username, password, newPassword, newPassword2 } = this;

        if (newPassword !== newPassword2) {
          this.isLoading = false;
          this.errorMessage = "The new passwords do not match";
          return;
        }
        if (newPassword === "" || newPassword2 === "" || password === "") {
          this.isLoading = false;
          this.errorMessage = "Fields cannot be empty";
          return;
        }

        let payload = { username, password, newPassword };

        Request.updatePassword(payload)
          .then(({ token }) => {
            this.isLoading = false;
            this.showUpdatePassword = false;
            this.onLoginSuccess(token);
          })
          .catch(err => {
            this.isLoading = false;
            this.showUpdatePassword = false;
            this.errorMessage = err.message;
          });
      } else {
        const { username, password } = this;

        if (username === "" || password === "") {
          this.errorMessage = "Fields cannot be empty";
          return;
        }

        let payload = { username, password };

        Request.login(payload)
          .then(({ updatePassword, token }) => {
            this.isLoading = false;
            if (updatePassword) {
              this.showUpdatePassword = true;
            } else if (token) {
              this.onLoginSuccess(token);
            }
          })
          .catch(err => {
            this.isLoading = false;
            this.errorMessage = err.message;
          });
      }
    },
    onLoginSuccess(token) {
      this.loginSuccess = true;
      this.$emit("login", token);
    }
  }
};
</script>

<style>
</style>
