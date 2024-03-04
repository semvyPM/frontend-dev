<template>
  <Header :client="idclient" :clientData="clientData"/>
  <div class="nav">
    <router-link :to="'/client/' + idclient"><div class="back"></div></router-link>
    <div class="carcass">
      <p>
        Расчет <input type="button" :value="calculation && calculation.сalculationStateId ? calculation.сalculationStateId.stateName : 'не установлен'" >
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
        <input type="button" value="Добавить конструктивный элемент" @click="togglePopup">
        <ConstructionElementPopup v-if="showPopup" :idclient="idclient" :createMode="createMode" @close="showPopup = false"/>
      </div>
      <div class="report">
        <table style="border: 1px solid black">
          <tr><td>Результат</td><td>Результат</td></tr>
          <tr><td>Результат</td><td>Результат</td></tr>
        </table>
        <input @click="exportToExcel" type="button" value="Экспорт в Excel">

      </div>
    </form>
  </main>
</template>
<script>
import Header from "@/components/Header.vue";
import axios from "axios";
import { getCalculation, getFloors, getBasementData } from "@/api.js";
import { saveAs } from 'file-saver';
import * as ExcelJS from "exceljs";

export default {
  components: {Header},
  props: {
    idcalculation: "",
    idclient: ""
  },
  data() {
    return {
      clientData: true,
      calculation: {},
      floors: {},
      basement: {},
      createMode: "false",
      showPopup: false
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
    getFloors(this.idcalculation)
        .then(data => {
          this.floors = data;
          console.log(this.floors);
        })
        .catch(error => {
          console.error("Произошла ошибка: ", error);
        });
  },
  methods: {
    backToClient() {
      this.$router.push({ name: "clientPage" });
    },
    togglePopup() {
      this.showPopup = !this.showPopup
    },
    async exportToExcel() {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Sheet 1');

      // Добавление данных в таблицу
      worksheet.addRow(['Имя', 'Фамилия', 'Email']);
      worksheet.addRow(['John', 'Doe', 'john.doe@example.com']);

      // Генерация и сохранение Excel файла
      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      saveAs(blob, 'exported_data.xlsx');
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
import ConstructionElementPopup from "@/components/ConstructionElementPopup.vue";
</script>