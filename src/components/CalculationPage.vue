<template>
  <Header :client="idclient" :clientData="clientData"/>
  <div class="nav">
    <router-link :to="'/client/' + idclient"><div class="back"></div></router-link>
    <div class="carcass">
      <p>
        Расчет <input type="button" :value="calculation && calculation.сalculationStateId ? calculation.сalculationStateId.stateName : 'не установлен'">
      </p>

    </div>
  </div>
  <main>
    <form action="">
      <h3>Дата: {{ calculation.createdDate}}</h3>
      <h3>Адрес объекта: {{ calculation.addressObjectConstractions }}</h3>
      <div class="result-buttons">
        <div>
          <input class="hide" id="hd-3" type="checkbox" >
          <label for="hd-3">
            <div class="plus">
              <div class="circle">+</div>
              <div class="plus_text">Результат расчета каркаса</div>
            </div>
          </label>
          <div>

          </div>
        </div>
        <div class="edit">
          <img src="@/assets/img/edit.png" alt="">
        </div>
        <input type="button" value="Добавить конструктивный элемент">
      </div>
      <div class="report">

      </div>
    </form>
  </main>
</template>
<script>
import Header from "@/components/Header.vue";
import axios from "axios";
import {getCalculation} from "@/api.js";

export default {
  components: {Header},
  props: {
    idcalculation: "",
    idclient: ""
  },
  data() {
    return {
      clientData: true,
      calculation: {}
    }
  },
  async mounted() {
    getCalculation(this.idcalculation)
        .then(data => {
          this.calculation = data;
        })
        .catch(error => {
          console.error("Произошла ошибка: ", error);
        });
  },
  methods: {
    backToClient() {
      this.$router.push({ name: "clientPage" });
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
<script setup>
import Header from "@/components/Header.vue";
</script>