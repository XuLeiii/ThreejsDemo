import * as THREE from "three";
import { camera } from "../RenderCamera.js";
import { granaryArr } from "./mesh.js";

//1.此处创建label标签,便于选中网格体时对标签进行显示和隐藏的操作

let chooseMesh = null;
function choose(event) {
  if (chooseMesh) {
    chooseMesh.material.color.set(0xffffff); //当选A模型后，再选择B模型，此时需要将A模型的颜色设为本身的颜色
  }
  //1.获取当前鼠标的坐标
  let Sx = event.clientX;
  console.log("sxxxxxxxxx", Sx);
  let Sy = event.clientY;
  //2.转换屏幕坐标系为webgl坐标系
  let x = (Sx / window.innerWidth) * 2 - 1;
  let y = -(Sy / window.innerHeight) * 2 + 1;
  //3.引入射线类
  let raycaster = new THREE.Raycaster();
  //4.根据摄像机生成射线向量
  raycaster.setFromCamera(new THREE.Vector2(x, y), camera);
  //5.计算和射线相交的网格模型,若有相交则返回一个数组对象，否则返回一个空数组
  let intersetc = raycaster.intersectObjects(granaryArr, false);
  //6.如果intersetc的大于零，说明有模型被选中，可以对该模型进行后续操作
  if (intersetc.length > 0) {
    //1.取出被选中的模型
    chooseMesh = intersetc[0].object;
    //射线与网格的交点坐标
    // console.log("intersetc[0]", intersetc[0]);
    chooseMesh.point = intersetc[0].point;
    chooseMesh.material.color.set(0x00ff00);
  }else{
    chooseMesh = 0
  }
}
console.log("choose.js文件");

export { choose, chooseMesh };
