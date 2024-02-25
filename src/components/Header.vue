<script setup>

import LogoTest from "@/components/icons/Logo.vue";
</script>

<template>
  <div class="header">
    <div class="logo">
      <LogoTest @click="signOut"/>
    </div>
    <div class="client_data">
      <p>Клиент<br></p>
      <p>
        <b>Тестовый Тест Тестович</b> <br>
        г.Ульяновск, ул. Тестовая, д.35-45 <br>
        тел. 8-900-000-00-00
      </p>
    </div>
    <div class="employee">
      <p>
        Сотрудник<br>
      </p>
      <p>
        <b>Имя Фамилия</b><br>
        должность
      </p>
    </div>
    <div class="exit"></div>
  </div>
</template>
<script>
export default {
  methods: {
      signOut() {
        this.$router.push({name: "signIn"});
      }
  }
}
</script>
<style scoped>
@import '@/assets/style/carcas_page_style/style.css';
@import '@/assets/style/carcas_page_style/slide.css';
@import '@/assets/style/carcas_page_style/responsive.css';
@import url(http://fonts.googleapis.com/css?family=Open+Sans:100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i);
@import url(http://fonts.googleapis.com/css?family=Open+Sans:100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i);
</style>