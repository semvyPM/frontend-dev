<script setup>
import Logo from './icons/Logo.vue';
import Floor from "@/components/Floor.vue";
import LogoTest from "@/components/icons/Logo.vue";
import Header from "@/components/Header.vue";
</script>

<template>
<Header  :client="id" :clientData="true"/>
<div class="nav">
  <div class="back" @click="backToClient"></div>
  <div class="carcass">
    <p>
      Каркас
    </p>
  </div>
</div>
<main>
  <form action="post" @submit.prevent="saveCalculation">
    <div class="adress">
      <input type="text" placeholder="Введите адрес объекта строительства" v-model="addres" :readonly="isReadOnly">
      <input type="button" value="Сохранить" @click="saveAddress" v-if="!isReadOnly">
      <input type="reset" value="Очистить расчет">
    </div>
    <h3>Исходные данные</h3>
    <div class="table floorsInput">Количество этажей <input type="number" placeholder="Введите число этажей" v-model="floorsCount" @change="duplicateFloors"> </div>
    <div v-for="(currentFloor, index) in floors" :key="index">
      <h3>Этаж: {{ index + 1 }}</h3>
      <Floor :currentFloor="index"></Floor>
    </div>
    <input type="submit" value="Рассчитать"  @click="saveCalculation">
  </form>
</main>
</template>

<script>
import {getClient, createCalculation} from "@/api.js";

export default {
  components: {
    Floor
  },
  props: {
    id: String,
    createMode: String,
    numbers: String,
    calculationData: {}
  },
  data() {
    return {
      floorsCount: 1, // Начальное количество этажей
      floors: [{}], // Массив с данными для каждого этажа, начинаем с одного пустого объекта
      isReadOnly: false,
      addres: "",
      calculation: {customerId: {id: parseInt(this.id) }, addressObjectConstractions: "", number: this.numbers, createdDate: new Date(), calculationStateId: {id: 1}}
    };
  },
  mounted() {
    if (this.createMode === "true") {
      this.isReadOnly = false
    }
    else {
      // добавить инфо об адресе
      this.isReadOnly = true
    }
    console.log("carcas " + this.createMode);
  },
  methods: {
    duplicateFloors() {
      // Обновляем количество этажей в соответствии с введенным числом
      const newCount = Number(this.floorsCount);
      if (!isNaN(newCount) && newCount >= 0) {
        const currentCount = this.floors.length;

        if (newCount > currentCount) {
          for (let i = currentCount; i < newCount; i++) {
            this.floors.push({}); // Добавляем пустой объект для нового этажа
          }
        } else if (newCount < currentCount) {
          this.floors = this.floors.slice(0, newCount); // Обрезаем массив до нового количества этажей
        }
      }
    },
    backToPrevious() {
      window.history.go(-1);
    },
    backToClient() {
      this.$router.push({ name: "clientPage", props: { id: this.id } });
    },
    saveAddress() {
      if (this.addres === "") {
        console.log("нет")
      }
      else {
        this.calculation.addressObjectConstractions = this.addres;
        this.isReadOnly = !this.isReadOnly;
        console.log(this.calculation);
      }
    },
    saveCalculation() {
      // if (this.addres === "") {
      //   console.log("нет")
      // }
      // else {
      //   createCalculation(this.calculation)
      //       .then(data => {
      //         this.calculation = data;
      //         this.$router.push({ path: "/calculation/" + this.calculation.id + "/" + this.id});
      //       })
      //       .catch(error => {
      //         console.error("Произошла ошибка: ", error);
      //       });
      //   console.log(this.calculation);
      // }
      console.log("FLOORS")
      for (const fl in this.floors) {
        console.log(fl);
      }
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
