<template>
  <div class="box">
    <div
      id="messageTag"
      style="
      visibility:hidden;
        position: absolute;
        width: 500px;
        height: 400px;
        color: #fff;
        z-index: 2;
        font-size: 16px;
      "
    >
      <div style="position: relative">
        <div style="position: absolute; left: 0px; top: 0px">
          <img
            src="/granary/信息背景.png"
            alt=""
            style="width: 400px; opacity: 1"
          />
        </div>
        <div
          id="granaryName"
          style="position: absolute; left: 25px; top: 40px; font-size: 16px"
        >
          平房仓P_01
        </div>
        <div style="position: absolute; left: 290px; top: 25px">
          <img src="/granary/温度.png" alt="" style="width: 50px" />
        </div>
        <div
          id="temperature"
          style="position: absolute; left: 330px; top: 40px"
        >
          19℃
        </div>
        <div id="grain" style="position: absolute; left: 170px; top: 50px">
          红豆(吨)
        </div>
        <div
          style="
            position: absolute;
            left: 80px;
            top: 85px;
            font-size: 60px;
            color: #00ffff;
            vertical-align: middle;
          "
        >
          <img
            id="grainImg"
            src="/granary/豆子/红豆.png"
            alt=""
            style="width: 60px"
          />
        </div>
        <div
          id="weight"
          style="
            position: absolute;
            left: 155px;
            top: 80px;
            font-size: 60px;
            color: #00ffff;
            vertical-align: middle;
          "
        >
          3600 t
        </div>
        <div
          id="granaryHeight"
          style="
            position: absolute;
            left: 70px;
            top: 170px;
            padding: 8px 25px;
            border-radius: 30px;
            border: 1px solid #00ffff;
          "
        >
          仓高—12m
        </div>
        <div
          id="grainHeight"
          style="position: absolute; left: 225px; top: 170px; padding: 8px 25px"
        >
          粮高— 5 m
        </div>
      </div>
    </div>
    <!-- <el-button style="position: absolute;right: 10px;" @click="!islabel">显示粮仓标识</el-button> -->
  </div>
</template>

<script>
// import { granary } from "../granary/mapviews";
// eslint-disable-next-line no-unused-vars
import { choose, chooseMesh } from "../granary/scene/choose.js";
import { renderer } from "../granary/RenderLoop.js";
import { msgTags } from "../granary/utils/messageTag.js";
import { scene } from "../granary/scene/index.js";
import messageData from "../granary/messageData.js"; //粮仓数据模拟

export default {
  beforeCreate() {
    console.log("-----beforeCreate");
  },
  created() {
    console.log("-----created");
  },
  mounted() {
    console.log("-----mounted");
    // 内容需要改变的HTML元素对应的id
    var idArr = [
      "granaryName",
      "temperature",
      "grain",
      "grainImg",
      "weight",
      "granaryHeight",
      "grainHeight",
    ];
    //1.将粮仓内容标签转为label标签
    const messageTag = msgTags("messageTag");
    //1.1添加messagetag到场景中，默认在窗口中点
    scene.add(messageTag);
    //7.监听窗口的点击事件
    window.addEventListener("dblclick", (e) => {
      console.log("chooseMesh是否为空", chooseMesh);
      if (chooseMesh) {
        messageTag.element.style.visibility = "hidden";
      }
      choose(e);
      if (chooseMesh) {
        //批量更新粮仓chooseMesh的标签信息
        idArr.forEach(function (id) {
          var dom = document.getElementById(id);
          dom.innerHTML = messageData[chooseMesh.name][id];
          messageTag.element.style.visibility = "visible"; //显示标签
          messageTag.position.copy(chooseMesh.point); //射线在粮仓表面拾取坐标
        });
      }
    });
    document.body.appendChild(renderer.domElement);
  },
  beforeUpdate() {
    console.log("beforedate");
  },

  updated() {
    console.log("update");
  },
};
</script>

<style lang="less" scoped></style>
