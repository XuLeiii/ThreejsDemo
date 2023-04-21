//网格，材质
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { tags } from "../scene/tags.js";

const model = new THREE.Group();
// console.log("model结构", model);
const granaryArr = [];
const loader = new GLTFLoader();
// 粮仓模型模型加载
loader.load("./modelSource/model.gltf", (gltf) => {
  // console.log("gltf结构", gltf);
  // console.log("gltf.scene的结构", gltf.scene);
  // console.log("添加scene的model结构", model);
  gltf.scene.traverse(function (object) {
    if (object.type === "Mesh") {
      // 批量更改所有Mesh的材质
      object.material = new THREE.MeshLambertMaterial({
        map: object.material.map, //获取原来材质的颜色贴图属性值
        color: object.material.color, //读取原来材质的颜色
      });
    }
  });
  const group = gltf.scene.getObjectByName("粮仓");
  // console.log("group粮仓", group);
  group.traverse((obj) => {
    if (obj.type === "Mesh") {
      //射线拾取需要的网格模型对象数组
      // console.log("obj123123", obj);
      // console.log("obj",obj);
      granaryArr.push(obj);

      //1.提升粮仓的局部坐标位置
      let pos = new THREE.Vector3();
      obj.getWorldPosition(pos); //获取当前模型的世界坐标传入pos中成为三维向量
      // console.log("pos", pos);
      //移动当前模型的局部坐标到模型顶部
      if (obj.parent.name === "立筒仓") {
        pos.y += 36;
      } else if (obj.parent.name === "浅圆仓") {
        pos.y += 20;
      } else if (obj.parent.name === "平房仓") {
        pos.y += 17;
      }
      //1.创建一系列html标签，并转为粮仓标识label
      let label1 = tags(obj.name);
      //2.放置label标签的位置
      label1.position.copy(pos);
      //3.添加label标签到场景中去
      model.add(label1);
      model.add(gltf.scene);
    }
  });
  console.log("mesh.js文件");
});
//射线拾取需要的模型数组
export { model, granaryArr };
