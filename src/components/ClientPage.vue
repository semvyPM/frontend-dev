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
        <ConstructionElementPopup v-if="showPopup" :id="id" :createMode="createMode" @close="showPopup = false"/>
      </div>
    </form>
    <div class="client-bg">
      <hr>

      <div class="client">
      <div v-for="calculation in calculations" :key="calculation.id">
          <div class="calculation" v-if="calculation && calculation.сalculationStateId">
            <div class="container" @click="goToCalculation(calculation.id, client.id)"> <div> Расчет №{{ calculation.number }} </div></div>
            <div class="container"> <div> {{ calculation.createdDate }} </div> </div>
            <div class="container"> <div> {{ calculation.сalculationStateId.stateName }} </div> </div>
            <div class="container"> <div> {{ calculation.addressObjectConstractions }} </div> </div>
          </div>
          <div class="buttons">
            <div class="copy" @click="copyCalculation(calculation.id)">
              <img src="@/assets/img/copy.png" alt="">
            </div>
            <div class="delete" @click="deleteCalculation(calculation.id)">
              <img src="@/assets/img/delete.png" alt="">
            </div>
          </div>
      </div>

      </div>
    </div>
    <hr>
  </main>
</template>

<script>
import ConstructionElementPopup from "@/components/ConstructionElementPopup.vue";
import Header from "@/components/Header.vue";
import axios from "axios";
import {getClient, getCalculations, getClients, getCalculation} from "@/api.js";

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
      createMode: "false"
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
    getCalculations(this.id)
        .then(data => {
          this.calculations = data;
        })
        .catch(error => {
          console.error("Произошла ошибка: ", error);
        });

    console.log("client " + this.client);
    console.log("calculations " + this.calculations);
  },
  methods: {
    backToSignIn() {
      this.$router.push({ name: "clientsPage", props: { id: this.id } });
    },
    copyCalculation(id) {
      console.log("copy " + id);
    },
    deleteCalculation(id) {
      console.log("delete " + id);
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
