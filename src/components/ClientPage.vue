<template>
  <Header :client="this.id" :clientData="clientData"/>
  <div class="nav">
    <div class="back"  @click="backToSignIn"></div>
    <div class="carcass">
      <p>
        Карточка клиента
      </p>
    </div>
  </div>
  <main>
    <form action="">
      <div class="create-calculation-button">
        <input type="button" style="cursor: pointer;" value="Создать расчет" @click="togglePopup">
        <ConstructionElementPopup v-if="showPopup" :idclient="id" :createMode="createMode" :numbers="getLastNumber()" @close="showPopup = false"/>
      </div>
    </form>
    <div class="calc-block">
        <div v-for="calculation in calculations" :key="calculation.id" class="calculation-data">
          <div class="calc-title">Расчет №{{ calculation.number }}</div>
          <div class="calc-info">
            <div class="calc-info-block info-adress">
              <div class="calc-info-title">Адрес объекта</div>
              <div>{{ calculation.addressObjectConstractions }}</div>
            </div>
            <div class="calc-info-inner">
            <div class="calc-info-block">
              <div class="calc-info-title">Дата формирования</div>
              <div>{{ calculation.createdDate }}</div>
            </div>
            <div class="calc-info-block" v-if="calculation && calculation.calculationStateId">
              <div class="calc-info-title">Статус</div>
              <div> {{ calculation.calculationStateId.stateName }}
              </div>
            </div>
            <div class="calc-info-block" v-if="calculation && calculation.calculationStateId && getStatus(calculation.calculationStateId.id)">
              <div class="calc-info-title">Бронь цен истекает</div>
              <div>{{ getDate(calculation.createdDate) }}</div>
            </div>
            </div>
          </div>
          <div class="calc-buttons">
            <div class="view-button"  @click="goToCalculation(calculation.id, client.id)">Просмотр</div>
            <div class="copy-button" @click="copyThisCalculation(calculation.id)">Копировать</div>
            <div class="delete-button" v-if="calculation && calculation.calculationStateId && getStatus(calculation.calculationStateId.id)" @click="deleteThisCalculation(calculation.id)">Удалить</div>
          </div>
      </div>
    </div>
  </main>
</template>

<script>
import ConstructionElementPopup from "@/components/ConstructionElementPopup.vue";
import Header from "@/components/Header.vue";
import axios from "axios";
import {getClient, getCalculations, getClients, getCalculation, deleteCalculation, copyCalculation} from "@/api.js";

export default {
  components: {Header, ConstructionElementPopup},
  props: {
    id: String
  },
  data() {
    return {
      clientData: true,
      client: {},
      calculations: [{}],
      showPopup: false,
      createMode: "true"
    }
  },
  async mounted() {
    getClient(this.id)
        .then(data => {
          this.client = data;
        })
        .catch(error => {
          console.error("Произошла ошибка: ", error);
        });
        this.getCalculationsData();

    console.log("client " + this.client);
    console.log("calculations " + this.calculations);
  },
  methods: {
    getDate(date) {
      let createdDate = new Date(date);

// Добавляем 10 дней
      createdDate.setDate(createdDate.getDate() + 10);

// Форматируем дату в "YYYY-MM-DD" формат
      let year = createdDate.getFullYear();
      let month = String(createdDate.getMonth() + 1).padStart(2, '0'); // Добавляем 1, так как месяцы начинаются с 0
      let day = String(createdDate.getDate()).padStart(2, '0');

      let formattedDate = year + '-' + month + '-' + day;
      return (formattedDate);

    },
    getCalculationsData() {
      getCalculations(this.id)
          .then(data => {
            this.calculations = data;
          })
          .catch(error => {
            console.error("Произошла ошибка: ", error);
          });
    },
    getLastNumber() {
      let number = 0;
      for (const calculation of this.calculations) {
        if (calculation.number > number) {
          number = calculation.number;
        }
      }
      return number + 1;
    },
    backToSignIn() {
      this.$router.push({ name: "clientsPage", props: { id: this.id } });
    },
    getStatus(id) {
      if (id === 3) { return false } else { return true }
    },
    async copyThisCalculation(id) {
      console.log("copy " + id);
      await copyCalculation(id);
      this.getCalculationsData();
    },
    async deleteThisCalculation(id) {
      await deleteCalculation(id);
      console.log("delete " + id);
      this.getCalculationsData();
    },
    togglePopup() {
      this.showPopup = !this.showPopup
    },
    saveAndRedirect() {
      alert("saveAndRedirect");
    },
    goToCalculation(idcalculation, idclient) {
      this.$router.push({ path: "/calculation/" + idcalculation + "/" + idclient});
    }
  }
}
</script>

<style scoped>
@import '../assets/style/carcas_page_style/style.css';
@import '../assets/style/carcas_page_style/slide.css';
@import '../assets/style/carcas_page_style/responsive.css';
@import url(http://fonts.googleapis.com/css?family=Open+Sans:100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i);
@import url(http://fonts.googleapis.com/css?family=Open+Sans:100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i);
</style>
