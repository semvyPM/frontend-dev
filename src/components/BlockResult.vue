<script setup>

</script>

<template>
  <h3>Результаты расчета {{ floor.floorData.floorNumber }} этажа</h3>
  <div class="results-in-cards">
    <div class="results-in-card result-data-by-floor-type-1">
      <div class="result-header">
        <div class="result-title">Внешние стены</div>
        <div class="title-sum">{{ getRub(floor.resultForInnerWallsSum) }}</div>
      </div>
      <div class="body-result" v-for="result in floor.resultForInnerWalls" :key="result.id">
        <div class="body-note">
          <div class="body-title"><b>Материал ({{ result.materialCharacteristics.measurementUnitId.measurementUnitsName }}):</b> </div><div class="body-text body-text-1"> {{ result.materialCharacteristics.materialsId.materialType }}</div>
        </div>
        <div class="body-note">
          <div class="body-title">Наименование:</div><div class="body-text body-text-1"> {{ result.materialCharacteristics.name }}</div>
        </div>
        <div class="body-note">
          <div class="body-text-card right-border">
            <div class="body-title">Количество</div>
            <div class="body-text">{{ result.amount }}</div>
          </div>
          <div class="body-text-card right-border">
            <div class="body-title">Стоимость</div>
            <div class="body-text">{{ getRub(result.price) }}</div>
          </div>
          <div class="body-text-card">
            <div class="body-title">Сумма</div>
            <div class="body-text result-sum">{{ getRub(result.fullPrice) }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="results-in-card result-data-by-floor-type-2">
      <div class="result-header">
        <div class="result-title">Внутренние стены</div>
        <div class="title-sum">{{ getRub(floor.resultForOuterWallsSum) }}</div>
      </div>
      <div class="body-result" v-for="result in floor.resultForOuterWalls" :key="result.id">
        <div class="body-note">
          <div class="body-title"><b>Материал ({{ result.materialCharacteristics.measurementUnitId.measurementUnitsName }}):</b> </div><div class="body-text body-text-1"> {{ result.materialCharacteristics.materialsId.materialType }}</div>
        </div>
        <div class="body-note">
          <div class="body-title">Наименование:</div><div class="body-text body-text-1"> {{ result.materialCharacteristics.name }}</div>
        </div>
        <div class="body-note">
          <div class="body-text-card right-border">
            <div class="body-title">Количество</div>
            <div class="body-text">{{ result.amount }}</div>
          </div>
          <div class="body-text-card right-border">
            <div class="body-title">Стоимость</div>
            <div class="body-text">{{ getRub(result.price) }}</div>
          </div>
          <div class="body-text-card">
            <div class="body-title">Сумма</div>
            <div class="body-text result-sum">{{ getRub(result.fullPrice) }}</div>
          </div>
        </div>
      </div>

    </div>
    <div class="results-in-card result-data-by-floor-type-3">
      <div class="result-header">
        <div class="result-title">Перекрытия</div>
        <div class="title-sum">{{ getRub(floor.resultForOverlapsSum) }}</div>
      </div>
      <div class="body-result" v-for="result in floor.resultForOverlaps" :key="result.id">
        <div class="body-note">
          <div class="body-title"><b>Материал ({{ result.materialCharacteristics.measurementUnitId.measurementUnitsName }}):</b> </div><div class="body-text body-text-1"> {{ result.materialCharacteristics.materialsId.materialType }}</div>
        </div>
        <div class="body-note">
          <div class="body-title">Наименование:</div><div class="body-text body-text-1"> {{ result.materialCharacteristics.name }}</div>
        </div>
        <div class="body-note">
          <div class="body-text-card right-border">
            <div class="body-title">Количество</div>
            <div class="body-text">{{ result.amount }}</div>
          </div>
          <div class="body-text-card right-border">
            <div class="body-title">Стоимость</div>
            <div class="body-text">{{ getRub(result.price) }}</div>
          </div>
          <div class="body-text-card">
            <div class="body-title">Сумма</div>
            <div class="body-text result-sum">{{ getRub(result.fullPrice) }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="results-in-card result-data-by-floor-type-4">
      <div class="result-header">
        <div class="result-title">Итоговая сумма (этаж)</div>
        <div class="title-sum">{{ getRub(floor.resultSum) }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    floor: {}
  },
  mounted() {
    console.log("from calc " + this.floor)
  },
  methods: {
    getRub(number) {
      return number.toLocaleString('ru-RU', {
        style: 'currency',
        currency: 'RUB'
      });
    }
  }
}
</script>

<style scoped>
.results-in-cards {
  display: flex;
  flex-direction: column;
}
.results-in-card {
  background-color: #dbe8db;
  padding: 10px;
  margin: 5px;
  border: 2px solid #54654e;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}
.result-data-by-floor-type-4 {
  border: 2px solid #eeb423;
  border-radius: 5px;
  box-shadow: none;
  background-color: #f5db85;
}
.result-data-by-floor-type-4 .title-sum {
  background-color: white;
}
.result-header, .body-note {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
}
.body-note {
  border-bottom: 1px solid lightgray;
  padding: 5px;
}
.result-title {
  //color: #5e6c5d;
  color: #232020;
  padding: 5px;
}
.title-sum {
  color: #0d4d0d;
  background: #fdf7b5;
  padding: 5px;
  border-radius: 4px;
}
.result-title, .title-sum {
  font-weight: bolder;
  font-size: 16px;
}
.body-result {
  border: 1.5px solid #818a80;
  background-color: white;
  border-radius: 4px;
  padding: 5px;
  margin-top: 10px;
}
.body-title {
  text-align: left;
  color: #6c706b;
}
.body-text {
  text-align: left;
}
.result-sum {
}

.body-text-card .body-title {
  margin-bottom: 5px;
}
h3 {
  margin-left: 7px;
}
.body-text-1 {
  padding-left: 5px;
  text-align: right;
}
.right-border {
  width: 33%;
  border-right: 1px solid lightgray;
  margin-right: 2%;
}

.result-sum-2 {
  background-color: #fcf9ef
}

</style>