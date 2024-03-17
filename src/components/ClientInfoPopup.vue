<template>
  <div class="popup">
    <div class="popup-content">
      <span class="close" onclick="closeModal">&times;</span>
      <h2>Введите данные:</h2>
      <form class="create-customer-form" @submit.prevent="updateClient">
        <label for="lastname">Фамилия:</label>
        <input type="text" id="lastname" v-model="customer_lastname" required>

        <label for="firstname">Имя:</label>
        <input type="text" id="firstname" v-model="customer_firstname" required>

        <label for="patronymic">Отчество:</label>
        <input type="text" id="patronymic" v-model="customer_patronymic" required>

        <label for="phone">Телефон:</label>
        <input type="text" id="phone" v-model="customer_phone" v-mask="'+7 (###) ### ##-##'" @blur="checkPhoneValidity" required>

        <label for="email">Email:</label>
        <input type="email" id="email" v-model="customer_email" required>

        <label for="address">Адрес:</label>
        <input type="text" id="address" v-model="customer_address" required>
        <p class="error-message">{{ errorMsg }}</p>

        <div class="but">
          <input type="button"  onclick="editClient" class="edit" value="Редактировать">
          <input type="submit" class="save" value="Сохранить">
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {mask} from 'vue-the-mask';

export default {
  directives: {mask},
  props: {
    clientObject: {}
  },
  mounted() {
    //   здесь прописываются действия, которые выполняются сразу при отрисовке компонента,
    //   то есть нужно вывести данные из clientObject в поля формы
    console.log("сюда можно выводить инфо о запросе")
  },
  methods: {
    checkPhoneValidity() {
      if (this.customer_phone.replace(/\D/g,'').length !== 11) {
        this.errorMsg = 'Пожалуйста, укажите полный номер телефона в формате +7 (XXX) XXX XX-XX.';
      } else {
        this.errorMsg = ''; // Очищаем ошибку при успешном вводе номера
      }
    },
    closeModal() {
      this.$emit('close');
    },
    editClient() {
      console.log("поля ввода разблокируются для редактирования, до этого они не кликабельны");
    },
    async updateClient() {
      console.log("await axios.update для обновления данных клиента на основе введенных данных, если обновление прошло успешно - вывести в окно инфо новые данные, вывести окно об успехе обновления");
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
