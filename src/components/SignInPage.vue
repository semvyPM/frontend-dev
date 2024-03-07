<script setup>
import Logo from './icons/Logo.vue';
import LogoSignIn from "@/components/icons/LogoSignIn.vue";
</script>

<template>
<div class="auth-container">
  <div class="logo">
    <LogoSignIn />
  </div>
  <!-- Форма авторизации -->
  <div class="form">
    <form @submit.prevent="login">
      <input type="text" placeholder="Введите логин" class="login" id="userlogin" v-model="userlogin">
      <input type="password" placeholder="Введите пароль" class="pass" id="userpassword" v-model="userpassword">
      <button type="submit" class="enter">Войти</button>
    </form>
  </div>
</div>
<!-- Крестик закрытия -->
<div>
  <span class="close-button" @click="goBack">&times;</span>
</div>
</template>

<script>
import axios from "axios";
import router from "@/router.js";
import {signIn} from "@/api.js";

export default {
  data() {
    return {
      userlogin: "",
      userpassword: "",
      error: ""
    };
  },
  methods: {
    goBack() {
      window.history.go(-1);
    },
    async login(){
      const auth = {
        username: this.userlogin,
        password: this.userpassword
      };
      signIn(this.userlogin, this.userpassword);
    },
  },
  mounted() {
    // this.$store.dispatch('loadToken');
    // this.$store.dispatch('loadUser');
    // this.$store.commit('clearUser');
    // this.$store.commit('clearToken');
  }
};
</script>

<style scoped>
@import '../assets/style/index_page_style/style.css';
@import '../assets/style/index_page_style/responsive.css';
</style>

<style>
  @import url(http://fonts.googleapis.com/css?family=Open+Sans:100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i);
</style>

<style>
  @import url(http://fonts.googleapis.com/css?family=Open+Sans:100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i);
</style>