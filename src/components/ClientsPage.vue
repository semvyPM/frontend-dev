<template>
  <Header/>
  <div class="nav">
    <div class="back" @click="goToSignIn"></div>
    <div class="carcass">
      <p>
        Клиенты
      </p>
    </div>
  </div>
  <main>

    <div class="adress">
      <input type="button" value="Создать клиента" @click="togglePopup">
    </div>
      <CreateUserPopup v-if="showPopup" @close="showPopup = false"/>

      <div class="card-container">
        <div v-for="client in clients" :key="client.id">
          <div class="client-card">
            <div class="client-card-header">{{ client.firstName }} {{ client.lastName }} {{ client.secondName }}</div>
            <div class="client-card-info">
              <div class="client-info">
                <div class="info-card">
                  <div class="info-title">Адрес</div>
                  <div class="info-text">{{ client.adress }}</div>
                </div>
              </div>
              <div class="client-info">
                <div class="info-card">
                  <div class="info-title">Телефон</div>
                  <div class="info-text">{{ client.phone }}</div>
                </div>
                <div class="info-card">
                  <div class="info-title">E-mail</div>
                  <div class="info-text">{{ client.email }}</div>
                </div>
              </div>

            </div>
            <div class="client-card-footer">
              <div class="view-button"  @click="goToClient(client.id)">Просмотр</div>
            </div>
          </div>
        </div>
      </div>

  </main>
</template>

<script>
import CreateUserPopup from "@/components/CreateUserPopup.vue";
import Header from "@/components/Header.vue";
import axios from "axios";
import {getClient, getClients} from "@/api.js";

export default {
  components: {
    CreateUserPopup,
    Header
  },
  data() {
    return {
      showPopup: false,
      clients: []
    };
  },
  async mounted() {
    getClients()
        .then(data => {
          this.clients = data;
          console.log(this.clients);
        })
        .catch(error => {
          console.error("Произошла ошибка: ", error);
        });
  },
  methods: {
    togglePopup() {
      this.showPopup = !this.showPopup
    },
    saveAndRedirect() {
      alert("saveAndRedirect");
    },
    goToClient(id) {
      this.$router.push({ path: '/client/' + id });
    },
    goToSignIn() {
      this.$router.push({ name: 'signIn' });
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
