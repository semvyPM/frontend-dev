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
    <div class="form">
      <form @submit.prevent="login">
        <input type="text" placeholder="Введите логин" class="login" id="userlogin" v-model="userlogin">
        <input type="password" placeholder="Введите пароль" :class="{ 'pass': true, 'disabledStyle': isStyleDisabled }" id="userpassword" v-model="userpassword">
        <p v-if="error" class="error-message">{{ error }}</p>
        <button type="submit" class="enter" @click="disableStyle">Войти</button>
      </form>
    </div>
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
      error: "",
      isStyleDisabled: false
    };
  },
  methods: {
    goBack() {
      window.history.go(-1);
    },
    async login(){
      this.error = ""; // Сбрасываем предыдущие ошибки
      if (!this.userlogin.trim() && !this.userpassword.trim()) {
        this.error = "Введите логин и пароль";
        return;
      }
      if (!this.userlogin.trim()) {
        this.error = "Введите логин";
        return;
      }
      if (!this.userpassword.trim()) {
        this.error = "Введите пароль";
        return;
      }

      try {
        const passField = document.getElementById("userpassword");
        passField.classList.remove("disabledStyle");
        await signIn(this.userlogin, this.userpassword);
        // Успешный вход - перенаправляем пользователя
      } catch (error) {
        if (error.response.status === 401) {
          if (error.response.data.message === "Incorrect username") {
            this.error = "Логин введен неверно";
          } else if (error.response.data.message === "Incorrect password") {
            this.error = "Пароль введен неверно";
          }
        } else {
          const passField = document.getElementById("userpassword");
          passField.classList.add("disabledStyle");
          this.error = "Неверный логин или пароль";
        }
      }
    },
    disableStyle() {
      const passField = document.getElementById("userpassword");
      passField.classList.add("disabledStyle");
    }
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