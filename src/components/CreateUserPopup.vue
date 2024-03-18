<template>
  <div class="popup" @click="closeModal">
    <div class="popup-content" >
      <span class="close" @click="closeModal">&times;</span>
      <h2>Введите данные:</h2>
      <form action="" class="create-customer-form" @submit.prevent="createCustomer">
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

        <input type="submit" value="Сохранить" class="save">
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {mask} from 'vue-the-mask';
import {createCustomer} from "@/api.js";

export default {
  directives: {mask},
  data() {
    return {
      customer_lastname: "",
      customer_firstname: "",
      customer_patronymic: "",
      customer_phone: "",
      customer_email: "",
      customer_address: "",
      errorMsg: ""
    };
  },
  methods: {
    checkPhoneValidity() {
      if (this.customer_phone.replace(/\D/g,'').length !== 11) {
        this.errorMsg = 'Пожалуйста, укажите полный номер телефона в формате +7 (XXX) XXX XX-XX.';
      } else {
        this.errorMsg = ''; // Очищаем ошибку при успешном вводе номера
      }
    },
    closeModal(event) {
      if (!event.target.closest('.popup-content')) {
        this.$emit('close');
      }
      else if (event.target.classList.contains('close')){
        this.$emit('close');
      }
    },
    async createCustomer() {
      const customer = {
        lastName: this.customer_lastname,
        firstName: this.customer_firstname,
        secondName: this.customer_patronymic,
        phone: this.customer_phone,
        email: this.customer_email,
        adress: this.customer_address,
        usersId: {id: this.$store.state.user.id}
      }
      await createCustomer(customer);
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