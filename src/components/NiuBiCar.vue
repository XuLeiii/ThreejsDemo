<template>
  <div id="NiuBiCar_Box">
    <!-- <canvas>画布</canvas> -->
    <div class="aside_box">
      <!-- 车身颜色 -->
      <p>车身颜色</p>
      <div class="CarBodyColor">
        <div
          class="color"
          v-for="(item, index) in colors"
          :key="index"
          @click="ChangeColor(item)"
          :style="{ backgroundColor: item }"
          style="cursor: pointer"
        >
          
        </div>
      </div>
      <!-- 引擎盖颜色 -->
      <p>前脸颜色</p>
      <div class="CarBodyColor">
        <div
          class="color"
          v-for="(item, index) in colors"
          :key="index"
          @click="ChangeColor1(item)"
          :style="{ backgroundColor: item }"
          style="cursor: pointer"
        >
          
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { render, a, changeColor ,changeColor1} from "../ultils/NiubiCar.js";

export default {
  data() {
    return {
      colors: ["red", "yellow", "blue", "green", "pink", "purple"],
    };
  },
  methods: {
    ChangeColor(item) {
      changeColor(item);
    },
    ChangeColor1(item){
      changeColor1(item)
    }
  },
  mounted() {
    a();
    render();
  },
};
</script>

<style lang="less" scoped>
#NiuBiCar_Box {
  .aside_box {
    position: absolute;
    font-size: 20px;
    top: 50px;
    right: 20px;
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 1);
  }
  p {
    margin: 5px 0px 0px 5px;
  }
  .CarBodyColor {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 500px;
    height: 100px;
    .color {
      width: 50px;
      height: 50px;
      background-color: green;
      border: 2px solid rgba(255, 255, 255, 0.5);
    }
  }
}
</style>
