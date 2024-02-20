<script setup>
import Logo from './icons/Logo.vue';
</script>

<template>
<div class="auth-container">
  <div class="logo">
    <Logo/>
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
  <a href="#" class="close-button">&times;</a>
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
    async login(){
      try {
        const response = await axios.post("http://localhost:8080/api/users/authuser", {
          userlogin: this.userlogin,
          userpassword: this.userpassword
        });

        if (response.data) {
          alert("ok");
          this.$router.push({name: "carcasPage"});
        } else {
          alert(response.data.message);
        }
      } catch (error) {
        this.error = error.response.data.message;
        console.log(error)
      }
    },
  },
  mounted() {
  }
};
</script>

<style scoped>
@import '../assets/style/index_page_style/style.css';
@import '../assets/style/index_page_style/responsive.css';
</style>

<!--<style>-->
<!--  @import url(http://fonts.googleapis.com/css?family=Open+Sans:100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i);-->
<!--</style>-->

<!--<style>-->
<!--  @import url(http://fonts.googleapis.com/css?family=Open+Sans:100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i);-->
<!--</style>-->