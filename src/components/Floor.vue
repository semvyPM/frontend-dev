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
        <option disabled selected value="">Выберите опцию</option>
        <option value="100">100</option>
        <option value="150">150</option>
        <option value="200">200</option>
        <option value="250">250</option>
      </select>
    </div>
    <div class="table">Длина внутренних стен (м)
      <input min="1" required type="number" class="outBlock" placeholder="" v-model="floorData.floorMainData.lengthInnerWalls">
    </div>

    <div class="table">
      <span>Толщина внутренних стен (мм)</span>
      <select required @change="handleChangeSelect5" v-model="floorData.floorMainData.thicknessInnerWalls">
        <option disabled selected value="">Выберите опцию</option>
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
        <select required v-model="floorData.dataOuterOverlap.OSB">
          <option disabled selected value="">Выберите опцию</option>
          <option v-for="option in availableOptionsOsb" :value="option.id">{{ option.nameOption }}</option>
        </select>
      </div>
      <div class="table">
        <span>Парогидроизоляция</span>
        <select required v-model="floorData.dataOuterOverlap.steamAndWaterproofing">
          <option disabled selected value="">Выберите опцию</option>
          <option v-for="option in availableOptionsProofing" :value="option.id">{{ option.nameOption }}</option>
        </select>
      </div>
      <div class="table">
        <span>Ветрозащита</span>
        <select required v-model="floorData.dataOuterOverlap.windProtection">
          <option disabled selected value="">Выберите опцию</option>
          <option v-for="option in availableOptionsWindProtection" :value="option.id">{{ option.nameOption }}</option>
        </select>
      </div>
      <div class="table">
        <span>Утеплитель</span>
        <select required v-model="floorData.dataOuterOverlap.insulation" @change="handleChangeSelect3">
          <option disabled selected value="">Выберите опцию</option>
          <option v-for="option in availableOptions1" :value="option.id">{{ option.nameOption }}</option>
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
          <select required v-model="floorData.osbInnerOvarlap">
            <option disabled selected value="">Выберите опцию</option>
            <option v-for="option in availableOptionsOsb" :value="option.id">{{ option.nameOption }}</option>
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
        <br>
        <div class="table2" v-for="(itemWindow, indexWindow) in floorData.itemsWindow" :key="indexWindow">
          <div>Высота (м)</div>
          <div>Ширина (м)</div>
          <div>Количество (шт)</div>
          <input min="1" type="text" pattern="[0-9]+(\.[0-9]+)?"  class="inBlock" placeholder="" v-model="itemWindow.heightWindow">
          <input min="1" type="text" pattern="[0-9]+(\.[0-9]+)?"  class="inBlock" placeholder="" v-model="itemWindow.widthWindow">
          <input min="1" type="text" pattern="[0-9]+(\.[0-9]+)?"  class="inBlock" placeholder="" v-model="itemWindow.quantityWindow">
        </div>
        <br>
        <div class="blocksDublicate">
          <div class="plus11" @click="deleteBlockWindow">
            <div class="plus1">-</div>
          </div>
          <div class="plus11" @click="duplicateBlockWindow">
            <div class="plus1">+</div>
          </div>
        </div>
        <br>
        <span class="formItemHeader">Дверные проемы внешние</span>
        <br>
        <div class="table2" v-for="(itemDoorsOut, indexDoorOut) in floorData.itemsDoorsOut" :key="indexDoorOut">
          <div>Высота (м)</div>
          <div>Ширина (м)</div>
          <div>Количество (шт)</div>
          <input min="1" required type="text" pattern="[0-9]+(\.[0-9]+)?"  class="inBlock" placeholder="" v-model="itemDoorsOut.heightDoorsOut">
          <input min="1" required type="text" pattern="[0-9]+(\.[0-9]+)?"  class="inBlock" placeholder="" v-model="itemDoorsOut.widthDoorsOut">
          <input min="1" required type="text" pattern="[0-9]+(\.[0-9]+)?"  class="inBlock" placeholder="" v-model="itemDoorsOut.quantityDoorsOut">
        </div>
        <br>
        <div class="blocksDublicate">
          <div class="plus11" @click="deleteBlockDoorsOut">
            <div class="plus1">-</div>
          </div>
          <div class="plus11" @click="duplicateBlockDoorsOut">
            <div class="plus1">+</div>
          </div>
        </div>
        <br>
        <span class="formItemHeader">Дверные проемы внутренние</span>
        <br>
        <div class="table2" v-for="(itemDoorsInner, indexDoorInner) in floorData.itemsDoorsInner" :key="indexDoorInner">
          <div>Высота (м)</div>
          <div>Ширина (м)</div>
          <div>Количество (шт)</div>
          <input min="1" required type="text" pattern="[0-9]+(\.[0-9]+)?"  class="inBlock" placeholder="" v-model="itemDoorsInner.heightDoorsInner">
          <input min="1" required type="text" pattern="[0-9]+(\.[0-9]+)?"  class="inBlock" placeholder="" v-model="itemDoorsInner.widthDoorsInner">
          <input min="1" required type="text" pattern="[0-9]+(\.[0-9]+)?"  class="inBlock" placeholder="" v-model="itemDoorsInner.quantityDoorsInner">
        </div>
        <br>
        <div class="blocksDublicate">
          <div class="plus11" @click="deleteBlockDoorsInner">
            <div class="plus1">-</div>
          </div>
          <div class="plus11" @click="duplicateBlockDoorsInner">
            <div class="plus1">+</div>
          </div>
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
          <select required @change="handleChangeSelect2" v-model="floorData.dataOverlap.slabThickness">
            <option disabled selected value="">Выберите опцию</option>
            <option value="200">200 мм</option>
            <option value="250">250 мм</option>
          </select>
        </div>
        <div class="table">
          ОСБ
          <select required v-model="floorData.dataOverlap.OSB">
            <option disabled selected value="">Выберите опцию</option>
            <option v-for="option in availableOptionsOsb" :value="option.id">{{ option.nameOption }}</option>
          </select>
        </div>
        <div class="table">
          Парогидроизоляция
          <select required v-model="floorData.dataOverlap.steamAndWaterproofing">
            <option disabled selected value="">Выберите опцию</option>
            <option v-for="option in availableOptionsProofing" :value="option.id">{{ option.nameOption }}</option>
          </select>
        </div>
        <div class="table">
          Ветрозащита
          <select required v-model="floorData.dataOverlap.windProtection">
            <option disabled selected value="">Выберите опцию</option>
            <option v-for="option in availableOptionsWindProtection" :value="option.id">{{ option.nameOption }}</option>
          </select>
        </div>
        <div class="table">
          Утеплитель
          <select required v-model="floorData.dataOverlap.insulation">
            <option disabled selected value="">Выберите опцию</option>
            <option v-for="option in availableOptions2" :value="option.id">{{ option.nameOption }}</option>
          </select>
        </div>
      </div>
    </div>
  </div>

</template>

<script>

export default {
  props: ['currentFloor', 'availableOptionsAll1', 'availableOptionsAll2', 'availableOptionsOsb', 'availableOptionsWindProtection', 'availableOptionsProofing'],
  data() {
    return {
      floorData: {
        showTable: false,
        overlapInputsShow: false,
        windowsTableShow: false,
        openOuterWallsShow: false,
        currentFloor: this.currentFloor,
        floorMainData: {heightFloor: '', perimetrOuterWalls: '', baseArea: '', thicknessOuterWalls: '', lengthInnerWalls: '', thicknessInnerWalls: ''},
        itemsWindow: [],
        itemsDoorsOut: [],
        itemsDoorsInner: [],
        osbInnerOvarlap: '',
        dataOuterOverlap: {OSB: '', steamAndWaterproofing: '', windProtection: '', insulation: ''},
        dataOverlap: {OSB: '', steamAndWaterproofing: '', windProtection: '', insulation: '', slabThickness: ''}
      },
      selectedOption1: '',
      availableOptions1: null,
      availableOptions2: null,
      selectedOption2: '',
      boardForOuterWalls: null,
      boardForInnerWalls: null,
      boardForOverlap: null,
      resultFloorData: []
    };
  },
  methods: {
    handleChangeSelect1() {
      if (this.floorData.floorMainData.thicknessOuterWalls === '100') {
        this.availableOptions1 = [this.availableOptionsAll1.at(0), this.availableOptionsAll1.at(1), this.availableOptionsAll1.at(2)];
        this.boardForOuterWalls = 1;
      } else if (this.floorData.floorMainData.thicknessOuterWalls === '150') {
        this.availableOptions1 = [this.availableOptionsAll1.at(3)];
        this.boardForOuterWalls = 2;
      }
      else if (this.floorData.floorMainData.thicknessOuterWalls === '200') {
        this.availableOptions1 = [this.availableOptionsAll1.at(4), this.availableOptionsAll1.at(5)];
        this.boardForOuterWalls = 3;
      }
      else if (this.floorData.floorMainData.thicknessOuterWalls === '250') {
        this.availableOptions1 = [this.availableOptionsAll1.at(6)];
        this.boardForOuterWalls = 4;
      }
    },
    handleChangeSelect2() {
      if (this.floorData.dataOverlap.slabThickness === '200') {
        this.availableOptions2 = [this.availableOptionsAll2.at(0), this.availableOptionsAll2.at(1)];
        console.log(this.availableOptionsAll2);
        this.boardForOverlap = 8;
      }
      else if (this.floorData.dataOverlap.slabThickness === '250') {
        this.availableOptions2 = [this.availableOptionsAll2.at(2)];
        this.boardForOverlap = 9;
      }
      console.log(this.floorData.dataOverlap.slabThickness);
    },
    handleChangeSelect5() {
      if (this.floorData.floorMainData.thicknessInnerWalls === '100') {
        this.boardForInnerWalls = 1;
      }
      else if (this.floorData.floorMainData.thicknessInnerWalls === '150') {
        this.boardForInnerWalls = 2;
      }
      else if (this.floorData.floorMainData.thicknessInnerWalls === '200') {
        this.boardForInnerWalls = 3;
      }
      else if (this.floorData.floorMainData.thicknessInnerWalls === '250') {
        this.boardForInnerWalls = 4;
      }
    },
    duplicateBlockWindow() {
      this.floorData.itemsWindow.push({ heightWindow: '', widthWindow: '', quantityWindow: '' });
    },
    deleteBlockWindow() {
      if (this.floorData.itemsWindow.length > 0) {
        this.floorData.itemsWindow.pop();
      }
    },
    deleteBlockDoorsOut() {
      if (this.floorData.itemsDoorsOut.length > 0) {
        this.floorData.itemsDoorsOut.pop();
      }
    },
    deleteBlockDoorsInner() {
      if (this.floorData.itemsDoorsInner.length > 0) {
        this.floorData.itemsDoorsInner.pop();
      }
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
      this.calculateFloor(this.floorData);
      return {floorData: this.floorData, result: this.resultFloorData};
    },
    addMaterial(material, count, type) {
      this.resultFloorData.push({id: material, count: count, typeConstruction: type});
    },
    calculateFloor(floor) {
      this.resultFloorData = [];
      // площадь внутренних стен
      let squareInnerWalls = floor.floorMainData.lengthInnerWalls * floor.floorMainData.heightFloor;
      console.log("площадь внутренних стен: " + squareInnerWalls);
      // площадь внешних стен
      let squareOuterWalls = floor.floorMainData.perimetrOuterWalls * floor.floorMainData.heightFloor;
      console.log("площадь внешних стен: " + squareOuterWalls);

      // -- внешние стены --

      // количество досок на внешние стойки
      let countBoardOuterStand = Math.ceil((floor.floorMainData.perimetrOuterWalls / 0.6 + 1));
      console.log("количество досок на внешние стойки: " + countBoardOuterStand);

      // количество досок для основания
      let countBoardOuterPlace = floor.floorMainData.perimetrOuterWalls * 2 / 3;
      console.log("количество досок для основания: " + countBoardOuterPlace);

      var perimetrWindows = 0, perimetrOuterDoors = 0, squareWindows = 0, squareOuterDoors = 0, countBoardOuterOpenings = 0;
      if (floor.windowsTableShow) {
        if (floor.itemsWindow.length > 0) {
          for (const window of floor.itemsWindow) {
            perimetrWindows += (parseFloat(window.heightWindow) + parseFloat(window.widthWindow)) * 2 * parseFloat(window.quantityWindow);
            console.log("периметр " + perimetrWindows);
            squareWindows += parseFloat(window.heightWindow) * parseFloat(window.widthWindow) * parseFloat(window.quantityWindow);
            console.log("площадь " + squareWindows);
          }
        }
        if (floor.itemsDoorsOut.length > 0) {
          for (const doorOut of floor.itemsDoorsOut) {
            perimetrOuterDoors += (parseFloat(doorOut.heightDoorsOut) + parseFloat(doorOut.widthDoorsOut)) * 2 * parseFloat(doorOut.quantityDoorsOut);
            squareOuterDoors += parseFloat(doorOut.heightDoorsOut) * parseFloat(doorOut.widthDoorsOut) * parseFloat(doorOut.quantityDoorsOut);
          }
        }
        if (floor.itemsWindow.length > 0 || floor.itemsDoorsOut.length > 0) {
          // количество досок на проемы
          countBoardOuterOpenings = Math.round((perimetrWindows + perimetrOuterDoors) / 3);
          console.log("количество досок на проемы: " + countBoardOuterOpenings);
        }
      }

      // итого количество досок на внешние стены
      let resultOuterBoards = parseFloat(countBoardOuterStand) + parseFloat(countBoardOuterPlace) + parseFloat(countBoardOuterOpenings);
      console.log("итого количество досок на внешние стены: " + resultOuterBoards);

      // ширина доски на внешние стены
      let widthOuterBoard = floor.floorMainData.thicknessOuterWalls;
      console.log("ширина доски на внешние стены: " + widthOuterBoard);

      // объем досок на внешние стены
      let volumeOuterBoard = parseFloat(resultOuterBoards * (widthOuterBoard / 1000) * 0.05 * 3).toFixed(1);
      console.log("объем досок на внешние стены: " + volumeOuterBoard);
      this.addMaterial(this.boardForOuterWalls, volumeOuterBoard, 1);

      if (floor.openOuterWallsShow) {
        // площадь ОСБ
        let squareOsb = parseFloat(squareOuterWalls * 2 * 1.15).toFixed(1);
        console.log("площадь ОСБ: " + squareOsb);
        this.addMaterial(floor.dataOuterOverlap.OSB, squareOsb, 1);

        // площадь парогидроизоляции
        let squareSteamAndWaterproofing = parseFloat(squareOuterWalls * 1.15).toFixed(1);
        console.log("площадь парогидроизоляции: " + squareSteamAndWaterproofing);
        this.addMaterial(floor.dataOuterOverlap.steamAndWaterproofing, squareSteamAndWaterproofing, 1);

        // площадь ветрозащиты
        let squareWindProtection = parseFloat(squareOuterWalls * 1.15).toFixed(1);
        console.log("площадь ветрозащиты: " + squareWindProtection);
        this.addMaterial(floor.dataOuterOverlap.windProtection, squareWindProtection, 1);

        // площадь утеплителя на внешние стены
        let squareInsulation = parseFloat(parseFloat(squareOuterWalls) * 1.1 - parseFloat(squareWindows) - parseFloat(squareOuterDoors)).toFixed(1);
        console.log(squareWindows);
        console.log(squareOuterDoors);
        console.log(parseFloat(squareWindows) - parseFloat(squareOuterDoors));
        console.log("площадь утеплителя на внешние стены: " + squareInsulation);

        // толщина утеплителя
        let thicknessInsulation = floor.floorMainData.thicknessOuterWalls;
        console.log("толщина утеплителя: " + thicknessInsulation);

        // объем утеплителя
        let volumeInsulation = parseFloat(squareInsulation * thicknessInsulation / 1000).toFixed(1);
        console.log("объем утеплителя: " + volumeInsulation);
        this.addMaterial(floor.dataOuterOverlap.insulation, volumeInsulation, 1);

      }

      // -- внутренние стены --

      // количество досок на внутренние стойки
      let countBoardInnerStand = Math.round((floor.floorMainData.lengthInnerWalls / 0.6));
      console.log("количество досок на внутренние стойки: " + countBoardInnerStand);

      // количество досок на проемы
      let perimetrInnerDoors = 0, sqareInnerDoors = 0, countBoardInnerOpenings = 0;

      if (floor.windowsTableShow && floor.itemsDoorsInner.length > 0) {
        for (const door of floor.itemsDoorsInner) {
          perimetrInnerDoors += (parseFloat(door.heightDoorsInner) + parseFloat(door.widthDoorsInner)) * 2 * parseFloat(door.quantityDoorsInner);
          sqareInnerDoors += parseFloat(door.heightDoorsInner) * parseFloat(door.widthDoorsInner)  * parseFloat(door.quantityDoorsInner);
        }
        countBoardInnerOpenings = Math.ceil(perimetrInnerDoors / 3);
        console.log("количество досок на проемы: " + countBoardInnerOpenings);
      }

      // итого количество досок на внутренние стены
      let resultInnerBoards = countBoardInnerStand + countBoardInnerOpenings;
      console.log("итого количество досок на внутренние стены: " + resultInnerBoards);

      // ширина доски на внутренние стойки
      let widthInnerBoard = floor.floorMainData.thicknessInnerWalls;
      console.log("ширина доски на внешние стены: " + widthInnerBoard);

      // объем досок на внутренние стойки
      let volumeInnerBoard = parseFloat(resultInnerBoards * (widthInnerBoard / 1000) * 0.05 * 3).toFixed(3);
      console.log("объем досок на внутренние стойки: " + volumeInnerBoard);
      this.addMaterial(this.boardForInnerWalls, volumeInnerBoard, 2);

      if (floor.showTable) {
        // площадь ОСБ
        let squareOsbInner = parseFloat(squareInnerWalls * 2 * 1.15).toFixed(1);
        console.log("площадь ОСБ: " + squareOsbInner);
        this.addMaterial(floor.osbInnerOvarlap, squareOsbInner, 2);
      }

      if (floor.overlapInputsShow) {
        // -- перекрытия --

        // количество балок перекрытий
        let countBoardOverlaps = Math.round((floor.floorMainData.baseArea * 0.7));
        console.log("количество балок перекрытий: " + countBoardOverlaps);

        // ширина доски на балки перекрытия
        let widthBoardOverlaps = floor.dataOverlap.slabThickness;
        console.log("ширина доски на балки перекрытия: " + widthBoardOverlaps);

        // объем досок на перекрытия
        let volumeBoardOverlaps = parseFloat(countBoardOverlaps * 0.05 * widthBoardOverlaps / 1000 * 6).toFixed(1);
        console.log("ширина доски на балки перекрытия: " + widthBoardOverlaps);
        this.addMaterial(this.boardForOverlap, volumeBoardOverlaps, 3);

        // площадь ОСБ
        let squareOsbOverlap = 0;
        if (floor.currentFloor === 0) {
          squareOsbOverlap = parseFloat(floor.floorMainData.baseArea * 1.15 * 2 * 2).toFixed(1);
          console.log("площадь ОСБ 1 этажа: " + squareOsbOverlap);
          this.addMaterial(floor.dataOverlap.OSB, squareOsbOverlap, 3);
        }
        else {
          squareOsbOverlap = parseFloat(floor.floorMainData.baseArea * 1.15 * 2).toFixed(1);
          console.log("площадь ОСБ " + floor.currentFloor + " этажа: " + squareOsbOverlap);
        }

        // площадь парогидроизоляции
        let squareSteamAndWaterproofingOverlap = parseFloat(floor.floorMainData.baseArea * 1.15).toFixed(1);
        console.log("площадь парогидроизоляции: " + squareSteamAndWaterproofingOverlap);
        this.addMaterial(floor.dataOverlap.steamAndWaterproofing, squareSteamAndWaterproofingOverlap, 3);

        // площадь ветрозащиты
        let squareWindProtectionOverlap = parseFloat(floor.floorMainData.baseArea * 1.15).toFixed(1);
        console.log("площадь парогидроизоляции: " + squareSteamAndWaterproofingOverlap);
        this.addMaterial(floor.dataOverlap.windProtection, squareWindProtectionOverlap, 3);

        // площадь утеплителя перекрытия
        let squareInsulationOverlap = 0;
        if (floor.currentFloor === 0) {
          squareInsulationOverlap = parseFloat(floor.floorMainData.baseArea * 1.1 * 2).toFixed(1);
          console.log("площадь утеплителя перекрытия 1 этажа: " + squareInsulationOverlap);
        }
        else {
          squareInsulationOverlap = parseFloat(floor.floorMainData.baseArea * 1.1).toFixed(1);
          console.log("площадь утеплителя перекрытия " + floor.currentFloor + " этажа: " + squareInsulationOverlap);
        }

        // толщина утеплителя
        let thicknessInsulationOverlap = floor.dataOverlap.slabThickness;
        console.log("толщина утеплителя: " + thicknessInsulationOverlap);

        // объем утеплителя
        let volumeInsulationOverlap = parseFloat(squareInsulationOverlap * thicknessInsulationOverlap / 1000).toFixed(1);
        console.log("объем утеплителя: " + volumeInsulationOverlap);
        this.addMaterial(floor.dataOverlap.insulation, volumeInsulationOverlap, 3);
      }
    }

  }
};
</script>

<style scoped>

@import '@/assets/style/carcas_page_style/style.css';
@import '@/assets/style/carcas_page_style/slide.css';
@import '@/assets/style/carcas_page_style/responsive.css';

</style>