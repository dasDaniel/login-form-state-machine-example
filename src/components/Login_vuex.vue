<template>
  <div class="w-full max-w-xs">
    <form :class="formClass" @submit.prevent="onSubmit">
      <div class="mb-4">
        <h2>LOGIN</h2>
      </div>
      <div class="mb-4 mt-2">
        <label :class="labelClass" for="username">Username</label>
        <input
          v-model="username"
          :class="inputClass"
          placeholder="Username"
          :disabled="login_isLoading"
        >
      </div>
      <div class="mb-4 mt-2">
        <label :class="labelClass" for="password">Password</label>
        <input
          v-model="password"
          :class="inputClass"
          type="password"
          placeholder="******************"
          :disabled="login_isLoading"
        >
      </div>
      <div v-if="errorMessage" class="mb-4 mt-2">
        <p class="text-red-500 text-xs italic">{{ errorMessage }}</p>
      </div>
      <div class="flex items-center justify-around mt-4">
        <button :class="btnClass" type="submit">Sign In</button>
      </div>
    </form>
    <pre>{{ {login_state, errorMessage} }}</pre>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      username: "",
      password: "",
      errorMessage: null
    };
  },
  computed: {
    ...mapGetters(["login_token", "login_state", "login_isLoading"])
  },
  watch: {
    login_token(token) {
      if (token !== null) {
        this.$emit("login", token);
      }
    }
  },
  methods: {
    ...mapActions(["login"]),
    onSubmit(e) {
      if (this.login_isLoading) return;
      this.errorMessage = null;

      const { username, password } = this;
      let payload = { username, password };

      if (username === "" || password === "") {
        this.errorMessage = "Fields cannot be empty";
        return;
      }
      this.login(payload);
    }
  },
  created() {
    this.formClass = "bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4";
    this.labelClass = "block text-gray-700 text-sm font-bold mb-2";
    this.inputClass =
      "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline";
    this.btnClass =
      "bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline";
  }
};
</script>

<style>
</style>
