<script setup>
import Logo from './icons/Logo.vue';
import Floor from "@/components/Floor.vue";
import LogoTest from "@/components/icons/Logo.vue";
import Header from "@/components/Header.vue";
</script>

<template>
<Header/>
  <div class="nav">
    <div class="back"></div>
    <div class="carcass">
      <p>
        Карточка клиента
      </p>
    </div>
  </div>
  <main>
    <form action="">
      <input type="submit" value="Создать расчет">
    </form>
    <div class="line">
      <hr>
    </div>

    <div class="client">
      <div class="calculation">
        <div class="container"> <div> Расчет №2 </div> </div>
        <div class="container"> <div> 02.02.2021 </div> </div>
        <div class="container"> <div> Актуален </div> </div>
        <div class="container"> <div> Адрес <br> строительства </div> </div>
      </div>
      <div class="buttons">
        <div class="copy">
          <img src="@/assets/img/copy.png" alt="">
        </div>
        <div class="delete">
          <img src="@/assets/img/delete.png" alt="">
        </div>
      </div>

    </div>
    <hr>
  </main>
</template>

<script>
export default {
  components: {
    Floor
  },
  data() {
    return {
      floorsCount: 1, // Начальное количество этажей
      floors: [{}] // Массив с данными для каждого этажа, начинаем с одного пустого объекта
    };
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
