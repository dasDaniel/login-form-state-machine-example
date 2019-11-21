<template>
  <div id="app" class="bg-gray-200 flex justify-center flex-col">
    <div class="w-full flex justify-center">
      <component :is="components[componentIndex]" @login="onLogin" :key="loginKey"/>
    </div>

    <div v-if="token !== null" class="w-full justify-center">
      <div class="flex items-center justify-around mt-4">
        <button
          @click="onReset"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >RESET</button>
      </div>
    </div>

    <div class="w-full justify-center flex items-center justify-around">
      <div class="flex items-center justify-around mt-4 max-w-sm">
        <button
          @click="componentIndex = 0"
          :class="componentIndex === 0 ? 'bg-blue-900' : 'bg-blue-500'"
          class="hover:bg-blue-700 text-white px-2 mx-2 rounded"
        >Login Minimal</button>
        <button
          @click="componentIndex = 1"
          :class="componentIndex === 1 ? 'bg-blue-900' : 'bg-blue-500'"
          class="hover:bg-blue-700 text-white px-2 mx-2 rounded"
        >Login Vuex</button>
        <button
          @click="componentIndex = 2"
          :class="componentIndex === 2 ? 'bg-blue-900' : 'bg-blue-500'"
          class="hover:bg-blue-700 text-white px-2 mx-2 rounded"
        >Login Reset</button>
        <button
          @click="componentIndex = 3"
          :class="componentIndex === 3 ? 'bg-blue-900' : 'bg-blue-500'"
          class="hover:bg-blue-700 text-white px-2 mx-2 rounded"
        >Login Vuex reset</button>
      </div>
    </div>
  </div>
</template>

<script>
import Login_minimal from "./components/Login_minimal";
import Login_vuex from "./components/Login_vuex";
import Login_reset from "./components/Login_reset";
import Login_vuex_reset from "./components/Login_vuex_reset";

export default {
  name: "App",
  components: {
    Login_minimal,
    Login_vuex,
    Login_reset,
    Login_vuex_reset
  },
  data() {
    return {
      loginKey: 0,
      token: null,
      components: [Login_minimal, Login_vuex, Login_reset, Login_vuex_reset],
      componentIndex: 0
    };
  },
  methods: {
    onLogin(token) {
      this.token = token;
    },
    onReset() {
      this.loginKey++;
      this.token = null;
      this.$store.dispatch("reset");
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
