<template>
  <div class="popup">
    <div class="popup-content" >
      <span class="close" @click="closeModal">&times;</span>
      <h2>Введите данные:</h2>
      <form action="" class="create-customer-form">
        <label for="lastname">Фамилия:</label>
        <input type="text" id="lastname">

        <label for="firstname">Имя:</label>
        <input type="text" id="firstname">

        <label for="patronymic">Отчество:</label>
        <input type="text" id="patronymic">

        <label for="phone">Телефон:</label>
        <input type="text" id="phone">

        <label for="email">Email:</label>
        <input type="email" id="email">

        <label for="address">Адрес:</label>
        <input type="text" id="address">

        <input type="submit" @click="saveAndRedirect()" value="Сохранить" class="save">
      </form>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    closeModal() {
      this.$emit('close');
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