<template>
  <Header :client="idclient" :clientData="clientData"/>
  <div class="nav">
    <router-link :to="'/client/' + idclient"><div class="back"></div></router-link>
    <div class="carcass">
      <p>
        Расчет <br> <input type="button" :value="calculation && calculation.calculationStateId ? calculation.calculationStateId.stateName : 'не установлен'" >
      </p>

    </div>
  </div>
  <main>
    <form action="">
      <h3>Дата: {{ calculation.createdDate}}</h3>
      <h3>Адрес объекта: {{ calculation.addressObjectConstractions }}</h3>
      <div class="result-buttons">
        <input type="button" value="Редактировать" @click="togglePopup">
        <input type="button" value="Добавить конструктивный элемент" @click="togglePopup">
        <ConstructionElementPopup v-if="showPopup" :idclient="idclient" :createMode="createMode" :numbers="idcalculation" @close="showPopup = false"/>
      </div>
      <div v-if="showFloor">
      <div class="result-buttons-add">
        <label for="hd-3">
          <div class="plus" @click="frameInfo=!frameInfo">
            <div class="circle">+</div>
            <div class="plus_text">Результат расчета каркаса</div>
          </div>
        </label>
      </div>
      <div class="report" v-if="frameInfo">
        <div>
            <div v-for="floor in floors" :key="floor.id" >
              <h3>Результаты расчета {{ floor.floorData.floorNumber }} этажа</h3>
              <keep-alive><component :is="currentComponent" :floor="floor"></component></keep-alive>
            </div>
        </div>
      </div>
      </div>
      <div v-if="showBasement">
      <div class="result-buttons-add">
        <label for="hd-3">
          <div class="plus" @click="basementInfo=!basementInfo">
            <div class="circle">+</div>
            <div class="plus_text">Результат расчета фундамента</div>
          </div>
        </label>
      </div>
      <div class="report" v-if="basementInfo">
        <div>
          <div v-for="basement in basements" :key="basement.id" >
            <p>{{basement.id}}</p>
          </div>
        </div>

      </div>
      </div>
      <div class="result-buttons-add">
        <label for="hd-3">
          <div class="plus">
            <div class="circle" style="border: 2px solid lightgray; background-color: lightgray">+</div>
            <div class="plus_text">Результат расчета крыши</div>
          </div>
        </label>
      </div>

      <input @click="exportToExcel" class="export-to-excel-btn" type="button" value="Экспорт в Excel">
    </form>
  </main>
</template>
<script>
import Header from "@/components/Header.vue";
import BlockResult from "@/components/BlockResult.vue";
import TableResult from "@/components/TableResult.vue";
import axios from "axios";
import {getCalculation, getFloors, getBasementData, getBasement} from "@/api.js";
import { saveAs } from 'file-saver';
import * as ExcelJS from "exceljs";

export default {
  components: {Header, BlockResult, TableResult },
  props: {
    idcalculation: "",
    idclient: ""
  },
  data() {
    return {
      clientData: true,
      calculation: {},
      floors: {},
      basements: {},
      createMode: "false",
      showPopup: false,
      currentComponent: window.innerWidth < 768 ? 'BlockResult' : 'TableResult', floorsData: this.floors,
      basementInfo: false,
      frameInfo: false,
      showFloor: false,
      showBasement: false
    }
  },
  async mounted() {
    window.addEventListener('resize', this.handleResize);
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
          if (this.floors.length > 0) { this.showFloor = true; }
          console.log(this.floors);
        })
        .catch(error => {
          console.error("Произошла ошибка: ", error);
        });
    getBasement(this.idcalculation)
        .then(data => {
          this.basements = data;
          if (this.basements.length > 0) { this.showBasement = true; }
        })
        .catch(error => {
          console.error("Произошла ошибка: ", error);
        });
    console.log(this.floors.length);



  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    handleResize() {
      this.currentComponent = window.innerWidth < 768 ? 'BlockResult' : 'TableResult';
    },
    backToClient() {
      this.$router.push({ name: "clientPage" });
    },
    togglePopup() {
      this.showPopup = !this.showPopup
    },
    async exportToExcel() {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Каркас');

      // Добавление данных в таблицу
      let row = worksheet.addRow(['Результаты для этажа №: ', '1']);
      let k = 1;
      worksheet.mergeCells('A'+k+':B'+k)
      worksheet.addRow(['Внешние стены']);
      worksheet.addRow(['Материал', 'Наименование', 'Единица измерения', 'Количество', 'Стоимость', 'Сумма']);

      // Генерация и сохранение Excel файла
      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      saveAs(blob, 'exported_data.xlsx');
    },

    getSumByType(arr, field) {
      return arr.reduce((accumulator, currentValue) => accumulator + currentValue[field], 0);
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
import TableResult from "@/components/TableResult.vue";
</script>