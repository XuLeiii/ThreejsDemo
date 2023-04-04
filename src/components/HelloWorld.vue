<template>
  <div class="hello">
    <!-- <canvas id="three"></canvas> -->
  </div>
</template>
<script>
// eslint-disable-next-line no-unused-vars
import { Gsapp, datagui, buffer, caizhi } from "../ultils/three.js";
import { island } from "../ultils/island.js"
// import {niubiCar} from "../ultils/NiubiCar.js"
export default {
  name: "HelloWorld",
  mounted() {
    //01.动画库的使用
    // Gsapp()

    //02.datagui的使用
    // datagui()

    //03.buffergeometry创建矩形
    // buffer()

    //04.材质与纹理
    // caizhi();

    //05.马尔代夫小岛
    island()

    //06.汽车展厅
    // niubiCar()
  },
};
</script>

<style scoped></style>
