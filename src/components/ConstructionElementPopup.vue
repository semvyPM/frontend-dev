<template>
  <div class="popup">
    <div class="popup-content" >
      <span class="close" @click="closeModal">&times;</span>
      <h2>Выбор конструктивного элемента</h2>
      <div class="popup-elements">
        <div @click="redirectToCarcasPage" style="cursor: pointer;" class="element">
          <img src="@/assets/img/house.png" alt="">
          <h3>Каркас</h3>
        </div>
        <div @click="redirectToFoundationPage" style="cursor: pointer;" class="element">
          <img src="@/assets/img/foundation.png" alt="">
          <h3>Фундамент</h3>
        </div>
        <div @click="redirectToRoofPage" style="cursor: pointer;" class="element">
          <img src="@/assets/img/roof.png" alt="">
          <h3>Крыша</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: String,
    createMode: String
  },
  mounted() {
    console.log("popup " + this.createMode);
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
    redirectToCarcasPage() {
      // Используем маршрутизатор для перенаправления
      this.$router.push({ name: 'carcasPage', params: { id: this.id, createMode: this.createMode }});
    },
    redirectToFoundationPage() {
      // Используем маршрутизатор для перенаправления
      this.$router.push({ name: 'foundationPage', props: { id: this.id }});
    },
    redirectToRoofPage() {
      // Используем маршрутизатор для перенаправления
      this.$router.push({ name: 'roofPage', props: { id: this.id }});
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