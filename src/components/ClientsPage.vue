<template>
  <h3>Это страница клиентов</h3>
  <button @click="goToClient">Перейти к клиенту</button>
  <button @click="goToCarcas">Перейти к каркасу</button>
</template>

<script>
export default {
  methods: {
    goToClient() {
      this.$router.push({name: "clientPage"});
    },
    goToCarcas() {
      this.$router.push({name: "carcasPage"});
    }
  }
}
</script>

<style scoped>
@import "@/assets/style/carcas_page_style/responsive.css";
@import "@/assets/style/carcas_page_style/slide.css";
@import "@/assets/style/carcas_page_style/style.css";
</style>