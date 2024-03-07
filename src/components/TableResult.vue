<script setup>

</script>

<template>
  <h3>Результаты расчета {{ floor.floorData.floorNumber }} этажа</h3>
  <table class="results-in-table">
    <thead><tr><th class="header1">Материал</th><th class="header2">Наименование</th><th class="header3">Единица измерения</th><th class="header4">Количество</th><th class="header5">Стоимость</th><th class="header6">Сумма</th></tr></thead>
    <thead><tr><th colspan="5">Внешние стены</th><td class="result-sum-2">{{ getRub(floor.resultForInnerWallsSum) }}</td></tr></thead>
    <tr v-for="result in floor.resultForInnerWalls" :key="result.id">
      <td class="sub-title">{{ result.materialCharacteristics.materialsId.materialType }}</td>
      <td>{{ result.materialCharacteristics.name }}</td>
      <td>{{ result.materialCharacteristics.measurementUnitId.measurementUnitsName }}</td>
      <td>{{ result.amount }}</td>
      <td>{{ getRub(result.price) }}</td>
      <td class="result-sum-1">{{ getRub(result.fullPrice) }}</td>
    </tr>
    <thead><tr><th colspan="5">Внутренные стены</th><td class="result-sum-2">{{ getRub(floor.resultForOuterWallsSum) }}</td></tr></thead>
    <tr v-for="result in floor.resultForOuterWalls" :key="result.id">
      <td class="sub-title">{{ result.materialCharacteristics.materialsId.materialType }}</td>
      <td>{{ result.materialCharacteristics.name }}</td>
      <td>{{ result.materialCharacteristics.measurementUnitId.measurementUnitsName }}</td>
      <td>{{ result.amount }}</td>
      <td>{{ getRub(result.price) }}</td>
      <td class="result-sum-1">{{ getRub(result.fullPrice) }}</td>
    </tr>
    <thead><tr><th colspan="5">Перекрытия</th><td class="result-sum-2">{{ getRub(floor.resultForOverlapsSum) }}</td></tr></thead>
    <tr v-for="result in floor.resultForOverlaps" :key="result.id">
      <td class="sub-title">{{ result.materialCharacteristics.materialsId.materialType }}</td>
      <td>{{ result.materialCharacteristics.name }}</td>
      <td>{{ result.materialCharacteristics.measurementUnitId.measurementUnitsName }}</td>
      <td>{{ result.amount }}</td>
      <td>{{ getRub(result.price) }}</td>
      <td class="result-sum-1">{{ getRub(result.fullPrice) }}</td>
    </tr>
    <tr>
      <th colspan="5">Итоговая сумма</th>
      <td class="result-sum-3">{{ getRub(floor.resultSum) }}</td>
    </tr>

  </table>
</template>

<script>
export default {
  props: {
    floor: {}
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
.results-in-table {
  width: 100%;
  color: #232020;
  margin-bottom: 20px;
  border: 2px solid #54654e;
  border-collapse: collapse;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  max-width: 95%;
}
.results-in-table th {
  font-weight: bold;
  padding: 5px;
  background: #dbe8db;
  border: 1.5px solid #818a80;
  text-align: left;
}
.sub-title {
  background-color: #f4faf4;
}
.results-in-table td {
  border: 1px solid #acb2ab;
  padding: 5px;
  text-align: right;
}
.results-in-table th, td {
  white-space: break-spaces; /* По умолчанию строки не переносятся */
}

.header1 {
  width: 150px;
}
.header2 {
  width: 400px;
}
.header3 {
  width: 151px;
}
.header4, .header5, .header6 {
  width: 151px;
}

.result-sum-1 {
  background: #fcf9ef;
}
.result-sum-2 {
  background: #fff8a9;
}
.result-sum-3 {
  background: #f5db85;
}


</style>