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
import router from "@/components/router.js";

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
      const response = await axios.post("http://localhost:8080/auth/sign-in", auth);

      if (response.data) {
        this.$store.commit('setToken', response.data.token);
        this.$store.dispatch('loadToken');
        const token = this.$store.state.token
        const config = {
          headers: { Authorization: `Bearer ${token}` }
        };
        const responseUser = await axios.get('http://localhost:8080/api/users/get', config);

        if (responseUser.data) {
          let user = responseUser.data;
              console.log("USER: " + user);
              this.$store.commit('setUser', user);
              console.log(response.data.token);
              this.$router.push({name: "clientsPage"});

              // Обработка данных о пользователе
        } else {
          console.log(response.data.message);
          console.log("clear token");
          this.$store.commit('clearToken');
          // Обработка ошибки запроса
        }
      } else {
        console.log(response.data.message);
      }
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