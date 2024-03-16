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
  <form @submit.prevent="saveCalculation">
    <div class="adress">
      <input type="text" placeholder="Введите адрес объекта строительства" v-model="addres" :readonly="isReadOnly">
      <input type="button" value="Сохранить" @click="saveAddress" v-if="!isReadOnly">
      <input type="reset" value="Очистить расчет">
    </div>
    <h3>Исходные данные</h3>
    <div class="table floorsInput">Количество этажей <input type="number" placeholder="Введите число этажей" v-model="floorsCount" @change="duplicateFloors"> </div>
    <div v-for="(currentFloor, index) in floors" :key="index">
      <h3>Этаж: {{ index + 1 }}</h3>
      <Floor ref="allFloors" :currentFloor="index"
                             :availableOptionsWindProtection="availableOptionsWindProtection"
                             :availableOptionsProofing="availableOptionsProofing"
                             :availableOptionsOsb="availableOptionsOsb"
                             :availableOptionsAll1="availableOptionsAll1"
                             :availableOptionsAll2="availableOptionsAll2"
      />
    </div>
    <h3>Сводный результат по материалам</h3>
    <input type="button" style="width: 200px; margin-left: 7px" value="Обновить материалы" @click="updateMaterials">
    <table class="materials-block">
      <thead>
        <tr>
          <th>Материал (ед)</th><th>Наименование</th><th>Сумма</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in resultFloorsMaterial" :key="index">
          <td class="sub-title">{{ index }}</td>
          <td>Доска 50*200*3000 Доска 50*200*3000 Доска 50*</td>
          <td class="sub-text">
            {{getRub(getPriceInfo(index))}}
            <span class="sub-text operation">x</span>
            30
            <span class="sub-text operation">=</span>
            {{getRub(55500)}}
          </td>
        </tr>
      </tbody>
      <tr>
        <th>Итоговая сумма</th><td colspan="4" class="sub-title">{{getRub(736483)}}</td>
      </tr>
    </table>
    <input type="submit" value="Рассчитать">
  </form>
</main>
</template>

<script>
import {getPrice} from "@/api.js";

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
      floor: {},
      addres: "",
      availableOptionsAll1: [{id: 15, nameOption: 'Кнауф ТеплоКнауф 100 мм'}, {id: 16, nameOption: 'Технониколь 100 мм'}, {id: 18, nameOption: 'Эковер 100 мм'}, {id: 19, nameOption: 'Эковер 150 мм'}, {id: 20, nameOption: 'Эковер 200 мм'}, {id: 17, nameOption: 'Фасад 200 мм'}, {id: 21, nameOption: 'Эковер 250 мм'}],
      availableOptionsAll2: [{id: 20, nameOption: 'Эковер 200 мм'}, {id: 17, nameOption: 'Фасад 200 мм'}, {id: 21, nameOption: 'Эковер 250 мм'}],
      availableOptionsOsb: [{id: 11, nameOption: 'ОСБ 9 мм'}, {id: 12, nameOption: 'ОСБ 10 мм'}, {id: 13, nameOption: 'ОСБ 15 мм'}, {id: 14, nameOption: 'ОСБ 18 мм'}],
      availableOptionsWindProtection: [{id: 26, nameOption: 'Ветро-влагозащитная мембрана Brane A'}, {id: 27, nameOption: 'Паропроницаемая ветро-влагозащита A Optima'}, {id: 28, nameOption: 'Гидро-ветрозащита Тип А'}],
      availableOptionsProofing: [{id: 22, nameOption: 'Ондутис'}, {id: 23, nameOption: 'Пароизоляция Axton (b)'}, {id: 24, nameOption: 'Пароизоляционная пленка Ютафол Н 96 Сильвер'}, {id: 25, nameOption: 'Пароизоляция В'}],
      resultFloor: [{}],
      resultFloorsMaterial: {},
      calculation: {customerId: {id: parseInt(this.id) }, addressObjectConstractions: "", number: this.numbers, createdDate: new Date(), calculationStateId: {id: 1}},
      pricelist: {}
    };
  },
  mounted() {
    this.isReadOnly = this.createMode !== "true";
    console.log("carcas " + this.createMode);
    getPrice()
        .then(data => {
          this.pricelist = data;
        })
        .catch(error => {
          console.error("Произошла ошибка: ", error);
        });
  },
  methods: {
    getPriceInfo(id) {
      console.log(id + " = " + this.pricelist.find(material => String(material.materialCharacteristicsId.id) === 1));
      return this.pricelist.find(material => String(material.materialCharacteristicsId.id) === id);
    },
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
    updateMaterials() {
      this.resultFloor = [];
      this.resultFloorsMaterial = {};
      this.$refs.allFloors.forEach(floor => {
        this.resultFloor[floor.floorData.currentFloor] = floor.getFloorData();
        for (const floorElement of this.resultFloor[floor.floorData.currentFloor].result) {
          if ( this.resultFloorsMaterial[String(floorElement.id)]) {
            this.resultFloorsMaterial[String(floorElement.id)] += parseFloat(floorElement.count);
          }
          else {
            this.resultFloorsMaterial[String(floorElement.id)] = parseFloat(floorElement.count);
          }
        }
        console.log(this.resultFloorsMaterial);
      });
    },
    getRub(number) {
      if (number !== undefined) {
        return number.toLocaleString('ru-RU', {
          style: 'currency',
          currency: 'RUB'
        });
      }
      else return 0;
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

    },

  }
}
</script>

<style scoped>
@import '@/assets/style/carcas_page_style/style.css';
@import '@/assets/style/carcas_page_style/slide.css';
@import '@/assets/style/carcas_page_style/responsive.css';
@import url(https://fonts.googleapis.com/css?family=Open+Sans:100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i);
@import url(https://fonts.googleapis.com/css?family=Open+Sans:100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i);
</style>
