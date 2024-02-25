<script setup>
import Header from "@/components/Header.vue";
</script>

<template>
  <Header/>
  <div class="nav">
    <div class="back"></div>
    <div class="carcass">
      <p>
        Клиенты
      </p>
    </div>
  </div>
  <main>


    <input type="button" value="Создать клиента" @click="togglePopup">
    <CreateUserPopup v-if="showPopup" @close="showPopup = false"/>

    <div class="card-container">
      <div class="card">Виссарионов Амуджалибай Хабирбековиджович</div>
      <div class="card">Иванов Иван Иванович</div>
      <div class="card">Иванов Иван Иванович</div>
      <div class="card">Иванов Иван Иванович</div>
      <div class="card">Иванов Иван Иванович</div>
      <div class="card">Иванов Иван Иванович</div>
      <div class="card">Иванов Иван Иванович</div>
      <div class="card">Иванов Иван Иванович</div>
      <div class="card">Иванов Иван Иванович</div>
      <div class="card">Иванов Иван Иванович</div>
      <div class="card">Иванов Иван Иванович</div>
      <div class="card">Иванов Иван Иванович</div>
    </div>
  </main>
</template>

<script>
import CreateUserPopup from "@/components/CreateUserPopup.vue";

export default {
  components: {
    CreateUserPopup
  },
  data() {
    return {
      showPopup: false
    };
  },
  methods: {
    togglePopup() {
      this.showPopup = !this.showPopup
    },
    saveAndRedirect() {
      alert("saveAndRedirect");
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
