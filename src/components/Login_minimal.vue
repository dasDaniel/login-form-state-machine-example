<template>
  <div class="w-full max-w-xs">
    <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" @submit.prevent="onSubmit">
      <div class="mb-4">
        <h2>LOGIN</h2>
      </div>
      <div class="mb-4 mt-2">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="username">Username</label>
        <input
          v-model="username"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Username"
          :disabled="isLoading"
        >
      </div>
      <div class="mb-4 mt-2">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="password">Password</label>
        <input
          v-model="password"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          type="password"
          placeholder="******************"
          :disabled="isLoading"
        >
      </div>
      <div v-if="errorMessage" class="mt-2 mb-2">
        <p class="text-red-500 text-xs italic">{{errorMessage}}</p>
      </div>
      <div class="flex items-center justify-around mt-4">
        <button
          class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >Sign In</button>
      </div>
    </form>
    <pre>{{ {isLoading, errorMessage} }}</pre>
  </div>
</template>

<script>
import Request from "../util/request";

export default {
  data() {
    return {
      username: "",
      password: "",
      isLoading: false,
      errorMessage: null
    };
  },
  methods: {
    onSubmit(e) {
      const { username, password } = this;
      let payload = { username, password };

      if (username === "" || password === "") {
        this.errorMessage = "Fields cannot be empty";
        return;
      }

      this.isLoading = true;
      this.errorMessage = null;
      Request.login(payload)
        .then(response => {
          this.isLoading = false;
          this.onLoginSuccess(response.token);
        })
        .catch(err => {
          this.isLoading = false;
          this.errorMessage = err.message;
        });
    }
  }
};
</script>

<style>
</style>
