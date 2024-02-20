<script setup>

</script>

<template>
  <div class="floor">
    <div class="table">Высота этажа <input type="text" placeholder=""> </div>
    <div class="table">Периметр внешних стен <input type="text" placeholder=""></div>
    <div class="table">Площадь основания <input type="text" placeholder=""></div>
    <div class="table">
      Толщина внешних стен
      <select>
        <option value="100">100</option>
        <option value="100">150</option>
        <option value="100">200</option>
        <option value="100">250</option>
      </select>
    </div>
    <div class="table">Длина внутренних стен <input type="text" placeholder=""></div>
    <div class="table">
      Толщина внутренних стен
      <select>
        <option value="100">100</option>
        <option value="100">150</option>
        <option value="100">200</option>
        <option value="100">250</option>
      </select>
    </div>



    <h3>Обшивки внешних стен</h3>
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
    <br>
    <div>
      <input class="hide" id="hd-1" type="checkbox" >
      <label for="hd-1">
        <div class="plus">
          <div class="circle">+</div>
          <div class="plus_text">Добавить расчет обшивки внутренних стен</div>
        </div>
      </label>
      <div>
        <br>
        <div class="table">
          ОСБ
          <select>
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
      <input class="hide" id="hd-2" type="checkbox" >
      <label for="hd-2">
        <div class="plus">
          <div class="circle" >+</div>
          <div class="plus_text">Учесть двери и окна</div>
        </div>
      </label>
      <div class="proemi">
        <br>

        Оконные проемы
        <br><br>

        <div class="table2" v-for="(itemWindow, indexWindow) in floorData.itemsWindow" :key="indexWindow">
          <div>Высота</div>
          <div>Ширина</div>
          <div>Количество</div>
          <input type="text" placeholder="" v-model="itemWindow.heightWindow">
          <input type="text" placeholder="" v-model="itemWindow.widthWindow">
          <input type="text" placeholder="" v-model="itemWindow.quantityWindow">
        </div>
        <br>
        <div class="plus11" @click="duplicateBlockWindow">
          <div class="plus1">+</div>
        </div>


        <br>
        <div>Дверные проемы внешние</div>
        <br>
        <div class="table2" v-for="(itemDoorsOut, indexDoorOut) in floorData.itemsDoorsOut" :key="indexDoorOut">
          <div>Высота</div>
          <div>Ширина</div>
          <div>Количество</div>
          <input type="text" placeholder="" v-model="itemDoorsOut.heightDoorsOut">
          <input type="text" placeholder="" v-model="itemDoorsOut.widthDoorsOut">
          <input type="text" placeholder="" v-model="itemDoorsOut.quantityDoorsOut">
        </div>
        <br>
        <div class="plus12" @click="duplicateBlockDoorsOut">
          <div class="plus1">+</div>
        </div>
        <br>
        <div>Дверные проемы внутренние</div>
        <br>
        <div class="table2" v-for="(itemDoorsInner, indexDoorInner) in floorData.itemsDoorsInner" :key="indexDoorInner">
          <div>Высота</div>
          <div>Ширина</div>
          <div>Количество</div>
          <input type="text" placeholder="" v-model="itemDoorsInner.heightDoorsInner">
          <input type="text" placeholder="" v-model="itemDoorsInner.widthDoorsInner">
          <input type="text" placeholder="" v-model="itemDoorsInner.quantityDoorsInner">
        </div>
        <br>
        <div class="plus13" @click="duplicateBlockDoorsInner">
          <div class="plus1">+</div>
        </div>
      </div>
    </div>
    <br>
    <div>
      <input class="hide" id="hd-3" type="checkbox" >
      <label for="hd-3">
        <div class="plus">
          <div class="circle">+</div>
          <div class="plus_text">Добавить расчет перекрытий</div>
        </div>
      </label>
      <div>
        <br>
        <div class="table">Толщина перекрытия <input type="text" placeholder=""></div>
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
export default {props: {
    currentFloor: Number // Передаем номер текущего этажа в компонент
  },
  data() {
    return {
      floorData: {
        currentFloor: this.currentFloor,
        itemsWindow: [{ heightWindow: '', widthWindow: '', quantityWindow: '' }],
        itemsDoorsOut: [{ heightDoorsOut: '', widthDoorsOut: '', quantityDoorsOut: '' }],
        itemsDoorsInner: [{ heightDoorsInner: '', widthDoorsInner: '', quantityDoorsInner: '' }],
      }
    };
  },
  methods: {
    duplicateBlockWindow() {
      // this.$emit('duplicateBlock', this.currentFloor);
      this.floorData.itemsWindow.push({ heightWindow: '', widthWindow: '', quantityWindow: '' });
    },
    duplicateBlockDoorsOut() {
      // this.$emit('duplicateBlock', this.currentFloor);
      this.floorData.itemsDoorsOut.push({ heightDoorsOut: '', widthDoorsOut: '', quantityDoorsOut: '' });
    },
    duplicateBlockDoorsInner() {
      // this.$emit('duplicateBlock', this.currentFloor);
      this.floorData.itemsDoorsInner.push({ heightDoorsInner: '', widthDoorsInner: '', quantityDoorsInner: '' });
    }
  }
};
</script>

<style scoped>
@import '../assets/style/carcas_page_style/style.css';
@import '../assets/style/carcas_page_style/slide.css';
@import '../assets/style/carcas_page_style/responsive.css';
</style>