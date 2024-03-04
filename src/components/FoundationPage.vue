<script setup>
import Logo from './icons/Logo.vue';
import Floor from "@/components/Floor.vue";
import LogoTest from "@/components/icons/Logo.vue";
import Header from "@/components/Header.vue";
</script>

<template>
  <Header  :client="this.id" :clientData="true"/>
  <div class="nav">
    <div class="back" @click="backToClient"></div>
    <div class="carcass">
      <p>
        Фундамент
      </p>
    </div>
  </div>
  <main>
    <form action="">
      <div class="adress">
        <input type="text" placeholder="Добавить адрес объекта строительства">
        <input type="button" value="Сохранить">

        <input type="reset" value="Очистить расчет">
      </div>
      <h3>Исходные данные</h3>
      <div class="table floorsInput">Периметр внешних стен <input type="number" placeholder=""> </div>
      <div class="table floorsInput">Длина внутренних стен <input type="number" placeholder=""> </div>
      <div class="submit">
        <input type="submit" value="Рассчитать">
      </div>
    </form>
  </main>
</template>

<script>
export default {
  components: {
    Floor
  },
  props: {
    id: String,
    createMode: String
  },
  methods: {
    backToClient() {
      this.$router.push({ name: "clientPage", props: { id: this.id } });
    },
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