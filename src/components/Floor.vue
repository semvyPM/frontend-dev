<script setup>

</script>

<template>
<!--  Компонент этажа-->
  <div class="floor">
    <div class="table">Высота этажа (м)
      <input type="number" required min="1" max="3" class="outBlock" placeholder="Не более 3 метров" v-model="floorData.floorMainData.heightFloor">
    </div>
    <div class="table">Периметр внешних стен (м)
      <input type="number" class="outBlock" placeholder="" v-model="floorData.floorMainData.perimetrOuterWalls">
    </div>
    <div class="table">Площадь основания (м2)
      <input type="number" class="outBlock" placeholder="" v-model="floorData.floorMainData.baseArea">
    </div>
    <div class="table">
      <span>Толщина внешних стен (мм)</span>
      <select required  @change="handleChangeSelect1" v-model="floorData.floorMainData.thicknessOuterWalls">
        <option value="100">100</option>
        <option value="100">150</option>
        <option value="100">200</option>
        <option value="100">250</option>
      </select>
    </div>
    <div class="table">Длина внутренних стен (м)
      <input min="1" required type="number" class="outBlock" placeholder="" v-model="floorData.floorMainData.lengthInnerWalls">
    </div>

    <div class="table">
      <span>Толщина внутренних стен (мм)</span>
      <select v-model="floorData.floorMainData.thicknessInnerWalls">
        <option value="100">100 мм</option>
        <option value="150">150 мм</option>
        <option value="200">200 мм</option>
        <option value="250">250 мм</option>
      </select>
    </div>
    <div>
      <div class="plus" @click="openOuterWallsInputs">
        <div class="circle">+</div>
        <div class="plus_text">Добавить расчет обшивки внешних стен</div>
      </div>
      <div v-if="floorData.openOuterWallsShow">
        <br>
      <h3>Обшивки внешних стен</h3>
      <div class="table">
        <span>ОСБ</span>
        <select v-model="floorData.dataOuterOverlap.OSB">
          <option value="1">ОСБ 9 мм</option>
          <option value="2">ОСБ 10 мм</option>
          <option value="3">ОСБ 15 мм</option>
          <option value="4">ОСБ 18 мм</option>
        </select>
      </div>
      <div class="table">
        <span>Парогидроизоляция</span>
        <select required v-model="floorData.dataOuterOverlap.steamAndWaterproofing">
          <option value="1">Ондутис</option>
          <option value="2">Пароизоляция Axton (b)</option>
          <option value="3">Пароизоляционная пленка Ютафол Н 96 Сильвер</option>
          <option value="4">Пароизоляция В</option>
        </select>
      </div>
      <div class="table">
        <span>Ветрозащита</span>
        <select v-model="floorData.dataOuterOverlap.windProtection">
          <option value="1">Ветро-влагозащитная мембрана Brane A</option>
          <option value="2">Паропроницаемая ветро-влагозащита A Optima</option>
          <option value="3">Гидро-ветрозащита Тип А</option>
        </select>
      </div>
      <div class="table">
        <span>Утеплитель</span>
        <select required v-model="floorData.dataOuterOverlap.insulation">
          <option v-for="option in availableOptions1" :value="option">{{ option }}</option>
        </select>
      </div>
      </div>
    </div>
    <br>
    <div>
        <div class="plus" @click="openWallsInputs">
          <div class="circle">+</div>
          <div class="plus_text">Добавить расчет обшивки внутренних стен</div>
        </div>
      <div v-if="floorData.showTable">
        <br>
        <div class="table">
          <span>ОСБ</span>
          <select v-model="floorData.osbInnerOvarlap">
            <option value="9">ОСБ 9мм</option>
            <option value="10">ОСБ 10мм</option>
            <option value="15">ОСБ 15мм</option>
            <option value="18">ОСБ 18мм</option>
          </select>
        </div>
        <br>
      </div>
    </div>
    <br>
    <div>
        <div class="plus" @click="openWindowInputs">
          <div class="circle" >+</div>
          <div class="plus_text">Учесть двери и окна</div>
        </div>
      <div class="proemi" v-if="floorData.windowsTableShow">
        <br>
        <span class="formItemHeader">Оконные проемы</span>
        <br><br>
        <div class="table2" v-for="(itemWindow, indexWindow) in floorData.itemsWindow" :key="indexWindow">
          <div>Высота (м)</div>
          <div>Ширина (м)</div>
          <div>Количество (шт)</div>
          <input min="1" type="number" class="inBlock" placeholder="" v-model="itemWindow.heightWindow">
          <input min="1" type="number" class="inBlock" placeholder="" v-model="itemWindow.widthWindow">
          <input min="1" type="number" class="inBlock" placeholder="" v-model="itemWindow.quantityWindow">
        </div>
        <br>
        <div class="plus11" @click="duplicateBlockWindow">
          <div class="plus1">+</div>
        </div>
        <br>
        <div><span class="formItemHeader">Дверные проемы внешние</span></div>
        <br>
        <div class="table2" v-for="(itemDoorsOut, indexDoorOut) in floorData.itemsDoorsOut" :key="indexDoorOut">
          <div>Высота (м)</div>
          <div>Ширина (м)</div>
          <div>Количество (шт)</div>
          <input min="1" required type="number" class="inBlock" placeholder="" v-model="itemDoorsOut.heightDoorsOut">
          <input min="1" required type="number" class="inBlock" placeholder="" v-model="itemDoorsOut.widthDoorsOut">
          <input min="1" required type="number" class="inBlock" placeholder="" v-model="itemDoorsOut.quantityDoorsOut">
        </div>
        <br>
        <div class="plus12" @click="duplicateBlockDoorsOut">
          <div class="plus1">+</div>
        </div>
        <br>
        <div><span class="formItemHeader">Дверные проемы внутренние</span></div>
        <br>
        <div class="table2" v-for="(itemDoorsInner, indexDoorInner) in floorData.itemsDoorsInner" :key="indexDoorInner">
          <div>Высота (м)</div>
          <div>Ширина (м)</div>
          <div>Количество (шт)</div>
          <input min="1" required type="number" class="inBlock" placeholder="" v-model="itemDoorsInner.heightDoorsInner">
          <input min="1" required type="number" class="inBlock" placeholder="" v-model="itemDoorsInner.widthDoorsInner">
          <input min="1" required type="number" class="inBlock" placeholder="" v-model="itemDoorsInner.quantityDoorsInner">
        </div>
        <br>
        <div class="plus13" @click="duplicateBlockDoorsInner">
          <div class="plus1">+</div>
        </div>
      </div>
    </div>
    <br>
    <div>
        <div class="plus" @click="openOverlapInputs">
          <div class="circle">+</div>
          <div class="plus_text">Добавить расчет перекрытий</div>
        </div>
      <div v-if="floorData.overlapInputsShow">
        <br>
        <div class="table">
          <span>Толщина перекрытия (мм)</span>
          <select required @change="handleChangeSelect2" v-model="floorData.dataOuterOverlap.slabThickness">
            <option value="200">200 мм</option>
            <option value="250">250 мм</option>
          </select>
        </div>
        <div class="table">
          ОСБ
          <select required v-model="floorData.dataOuterOverlap.OSB">
            <option value="9">ОСБ 9 мм</option>
            <option value="10">ОСБ 10 мм</option>
            <option value="15">ОСБ 15 мм</option>
            <option value="18">ОСБ 18 мм</option>
          </select>
        </div>
        <div class="table">
          Парогидроизоляция
          <select required v-model="floorData.dataOuterOverlap.steamAndWaterproofing">
            <option value="1">Ондутис</option>
            <option value="2">Пароизоляция Axton (b)</option>
            <option value="3">Пароизоляционная пленка Ютафол Н 96 Сильвер</option>
            <option value="4">Пароизоляция В</option>
          </select>
        </div>
        <div class="table">
          Ветрозащита
          <select required v-model="floorData.dataOuterOverlap.windProtection">
            <option value="1">Ветро-влагозащитная мембрана Brane A</option>
            <option value="2">Паропроницаемая ветро-влагозащита A Optima</option>
            <option value="3">Гидро-ветрозащита Тип А</option>
          </select>
        </div>
        <div class="table">
          Утеплитель
          <select required v-model="floorData.dataOuterOverlap.insulation2">
            <option v-for="option1 in availableOptions2" :value="option1">{{ option1 }}</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: ['currentFloor'],
  data() {
    return {
      floorData: {
        showTable: false,
        overlapInputsShow: false,
        windowsTableShow: false,
        openOuterWallsShow: false,
        currentFloor: this.currentFloor,
        floorMainData: {heightFloor: '', perimetrOuterWalls: '', baseArea: '', thicknessOuterWalls: '', lengthInnerWalls: '', thicknessInnerWalls: ''},
        itemsWindow: [{ heightWindow: '', widthWindow: '', quantityWindow: '' }],
        itemsDoorsOut: [{ heightDoorsOut: '', widthDoorsOut: '', quantityDoorsOut: '' }],
        itemsDoorsInner: [{ heightDoorsInner: '', widthDoorsInner: '', quantityDoorsInner: '' }],
        osbInnerOvarlap: '',
        dataOuterOverlap: {OSB: '', steamAndWaterproofing: '', windProtection: '', insulation: '', slabThickness: '' , insulation2: '' }
      },
      maxHeightFloor: 3,
      selectedOption1: '',
      availableOptions1: ['Кнауф ТеплоКнауф 100 мм', 'Технониколь 100 мм', 'Эковер 100 мм', 'Эковер 150 мм', 'Эковер 200 мм', 'Фасад 200 мм', 'Эковер 250 мм'],
      selectedOption2: '',
      availableOptions2: ['Фасад 200 мм', 'Эковер 250 мм'],
    };
  },
  methods: {
    handleChangeSelect1() {
      if (this.floorData.floorMainData.thicknessOuterWalls === '100') {
        console.log("Абоба");
        this.availableOptions1 = ['Кнауф ТеплоКнауф 100 мм', 'Технониколь 100 мм', 'Эковер 100 мм'];
      } else if (this.floorData.floorMainData.thicknessOuterWalls === '150') {
        this.availableOptions1 = ['Эковер 150 мм'];
      }
      else if (this.floorData.floorMainData.thicknessOuterWalls === '200') {
        this.availableOptions1 = ['Эковер 200 мм', 'Фасад 200 мм'];
      }
      else if (this.floorData.floorMainData.thicknessOuterWalls === '250') {
        this.availableOption1 = ['Эковер 250 мм'];
      }
      console.log(this.floorData.floorMainData.thicknessOuterWalls);
    },
    handleChangeSelect2() {
      if (this.floorData.dataOuterOverlap.slabThickness === '200') {
        this.availableOptions2 = ['Эковер 200 мм', 'Фасад 200 мм'];
      }
      else if (this.floorData.dataOuterOverlap.slabThickness === '250') {
        this.availableOptions2 = ['Эковер 250 мм'];
      }
      console.log(this.floorData.dataOuterOverlap.slabThickness);
    },
    duplicateBlockWindow() {
      this.floorData.itemsWindow.push({ heightWindow: '', widthWindow: '', quantityWindow: '' });
    },
    duplicateBlockDoorsOut() {
      this.floorData.itemsDoorsOut.push({ heightDoorsOut: '', widthDoorsOut: '', quantityDoorsOut: '' });
    },
    duplicateBlockDoorsInner() {
      this.floorData.itemsDoorsInner.push({ heightDoorsInner: '', widthDoorsInner: '', quantityDoorsInner: '' });
    },
    openWallsInputs() {
      this.floorData.showTable = !this.floorData.showTable;
      this.floorData.osbInput = 0;
    },
    openOverlapInputs() {
      this.floorData.overlapInputsShow = !this.floorData.overlapInputsShow;
    },
    openWindowInputs() {
      this.floorData.windowsTableShow = !this.floorData.windowsTableShow;
    },
    openOuterWallsInputs() {
      this.floorData.openOuterWallsShow = !this.floorData.openOuterWallsShow;
    },
    getFloorData() {
      console.log("check " + JSON.stringify(this.floorData));
      return this.floorData;
    }

  }
};
</script>

<style scoped>

@import '../assets/style/carcas_page_style/style.css';
@import '../assets/style/carcas_page_style/slide.css';
@import '../assets/style/carcas_page_style/responsive.css';

</style>