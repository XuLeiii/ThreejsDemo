<template>
  <div>
    <!-- <button id="exportGLTF">导出</button> -->
    <!-- <el-button id="exportGLTF" @click="exportGLTF">导出模型</el-button> -->
  </div>
</template>

<script>
import { renderer } from "../samartCity/RenderLoop.js";
// import { group } from "../samartCity/scene/mesh.js";
// import { exportGLTF } from "../samartCity/utils/exportGLTF";

export default {
  // methods:{
  //   exportGLTF(group){}
  // },
  mounted() {
    //导出模型
    // var button = document.getElementById("exportGLTF");
    // button.addEventListener("click", function () {
    //   exportGLTF(group);
    // });

    document.body.appendChild(renderer.domElement);
  },
};
</script>

<style lang="less" scoped></style>
