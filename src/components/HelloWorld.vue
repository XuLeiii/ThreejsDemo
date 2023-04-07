<template>
  <div class="hello">
    <!-- <canvas id="three"></canvas> -->
  </div>
</template>
<script>
//1.测试小DEMO
// import { Gsapp, datagui, buffer, caizhi } from "../ultils/three.js";
//2.小岛场景
// import { island } from "../ultils/island.js"
// 3.森林，雨滴，PM2.5可视化
// eslint-disable-next-line no-unused-vars
import { chinaPM ,Forest,Rain} from "../ultils/SpriteExamples.js";
import {niubiCar} from "../ultils/NiubiCar.js"
// import { Robot } from "../ultils/Robot.js";
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
    // island()

    //06.汽车展厅
    niubiCar()

    //07.城市pm2.5
    // chinaPM();

    //08.森林案例
    // Forest()

    //09.下雨
    // Rain()

    //10.机器人
    // Robot()
  },
};
</script>

<style scoped></style>
