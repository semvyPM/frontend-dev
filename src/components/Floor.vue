<script setup>

</script>

<template>
<!--  Компонент этажа-->
  <div class="floor">
    <div class="table">Высота этажа <input type="number" class="outBlock"  placeholder=""> </div>
    <div class="table">Периметр внешних стен <input type="number" class="outBlock" placeholder=""></div>
    <div class="table">Площадь основания <input type="number" class="outBlock" placeholder=""></div>
    <div class="table">
      <span>Толщина внешних стен</span>
      <select>
        <option value="100">100</option>
        <option value="100">150</option>
        <option value="100">200</option>
        <option value="100">250</option>
      </select>
    </div>
    <div class="table">Длина внутренних стен <input type="number" class="outBlock" placeholder=""></div>
    <div class="table">
      <span>Толщина внутренних стен</span>
      <select>
        <option value="100">100</option>
        <option value="100">150</option>
        <option value="100">200</option>
        <option value="100">250</option>
      </select>
    </div>



    <h3>Обшивки внешних стен</h3>
    <div class="table">
      <span>ОСБ</span>
      <select>
        <option value="9">ОСБ 9мм</option>
        <option value="10">ОСБ 10мм</option>
        <option value="15">ОСБ 15мм</option>
        <option value="18">ОСБ 18мм</option>
      </select>
    </div>
    <div class="table">
      <span>Парогидроизоляция</span>
      <select>
        <option value="1">Ондутис</option>
        <option value="2">Пароизоляция Axton (b)</option>
        <option value="3">Пароизоляционная пленка Ютафол Н 96 Сильвер</option>
        <option value="4">Пароизоляция В</option>
      </select>
    </div>
    <div class="table">
      <span>Ветрозащита</span>
      <select>
        <option value="1">Ветро-влагозащитная мембрана Brane A</option>
        <option value="2">Паропроницаемая ветро-влагозащита A Optima</option>
        <option value="3">Гидро-ветрозащита Тип А</option>
      </select>
    </div>
    <div class="table">
      <span>Утеплитель</span>
      <select>
        <option value="1">Кнауф ТеплоКнауф 100 мм</option>
        <option value="2">Технониколь 100 мм</option>
        <option value="3">Эковер 100 мм</option>
        <option value="4">Эковер 150 мм</option>
        <option value="5">Эковер 200 мм</option>
        <option value="6">Фасад 200 мм</option>
        <option value="7">Эковер 250 мм</option>
      </select>
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
          <select >
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
          <div>Высота</div>
          <div>Ширина</div>
          <div>Количество</div>
          <input type="number" class="inBlock" placeholder="" v-model="itemWindow.heightWindow">
          <input type="number" class="inBlock" placeholder="" v-model="itemWindow.widthWindow">
          <input type="number" class="inBlock" placeholder="" v-model="itemWindow.quantityWindow">
        </div>
        <br>
        <div class="plus11" @click="duplicateBlockWindow">
          <div class="plus1">+</div>
        </div>


        <br>
        <div><span class="formItemHeader">Дверные проемы внешние</span></div>
        <br>
        <div class="table2" v-for="(itemDoorsOut, indexDoorOut) in floorData.itemsDoorsOut" :key="indexDoorOut">
          <div>Высота</div>
          <div>Ширина</div>
          <div>Количество</div>
          <input type="number" class="inBlock" placeholder="" v-model="itemDoorsOut.heightDoorsOut">
          <input type="number" class="inBlock" placeholder="" v-model="itemDoorsOut.widthDoorsOut">
          <input type="number" class="inBlock" placeholder="" v-model="itemDoorsOut.quantityDoorsOut">
        </div>
        <br>
        <div class="plus12" @click="duplicateBlockDoorsOut">
          <div class="plus1">+</div>
        </div>
        <br>
        <div><span class="formItemHeader">Дверные проемы внутренние</span></div>
        <br>
        <div class="table2" v-for="(itemDoorsInner, indexDoorInner) in floorData.itemsDoorsInner" :key="indexDoorInner">
          <div>Высота</div>
          <div>Ширина</div>
          <div>Количество</div>
          <input type="number" class="inBlock" placeholder="" v-model="itemDoorsInner.heightDoorsInner">
          <input type="number" class="inBlock" placeholder="" v-model="itemDoorsInner.widthDoorsInner">
          <input type="number" class="inBlock" placeholder="" v-model="itemDoorsInner.quantityDoorsInner">
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
        <div class="table">Толщина перекрытия <input type="number" class="outBlock" placeholder=""></div>
        <div class="table">
          ОСБ
          <select>
            <option value="9">ОСБ 9мм</option>
            <option value="10">ОСБ 10мм</option>
            <option value="15">ОСБ 15мм</option>
            <option value="18">ОСБ 18мм</option>
          </select>
        </div>
        <div class="table">
          Парогидроизоляция
          <select>
            <option value="1">Ондутис</option>
            <option value="2">Пароизоляция Axton (b)</option>
            <option value="3">Пароизоляционная пленка Ютафол Н 96 Сильвер</option>
            <option value="4">Пароизоляция В</option>
          </select>
        </div>
        <div class="table">
          Ветрозащита
          <select>
            <option value="1">Ветро-влагозащитная мембрана Brane A</option>
            <option value="2">Паропроницаемая ветро-влагозащита A Optima</option>
            <option value="3">Гидро-ветрозащита Тип А</option>
          </select>
        </div>
        <div class="table">
          Утеплитель
          <select>
            <option value="1">Кнауф ТеплоКнауф 100 мм</option>
            <option value="2">Технониколь 100 мм</option>
            <option value="3">Эковер 100 мм</option>
            <option value="4">Эковер 150 мм</option>
            <option value="5">Эковер 200 мм</option>
            <option value="6">Фасад 200 мм</option>
            <option value="7">Эковер 250 мм</option>
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
        currentFloor: this.currentFloor,
        itemsWindow: [{ heightWindow: '', widthWindow: '', quantityWindow: '' }],
        itemsDoorsOut: [{ heightDoorsOut: '', widthDoorsOut: '', quantityDoorsOut: '' }],
        itemsDoorsInner: [{ heightDoorsInner: '', widthDoorsInner: '', quantityDoorsInner: '' }],
        osbInput: "",
        overlapInputs: [{slabThickness: '', OSB: '', steamAndWaterproofing: '', windProtection: '', insulation: ''}]
      }
    };
  },
  methods: {
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
    }
  }
};
</script>

<style scoped>
@import '../assets/style/carcas_page_style/style.css';
@import '../assets/style/carcas_page_style/slide.css';
@import '../assets/style/carcas_page_style/responsive.css';
</style>