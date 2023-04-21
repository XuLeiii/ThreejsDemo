import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";

//1.场景
const scene = new THREE.Scene();
//设置场景的环境贴图
scene.environment = new THREE.Color("#ccc");
// 设置场景的背景颜色
scene.background = new THREE.Color("#ccc");
//添加坐标辅助器
const axes = new THREE.AxesHelper(500);
scene.add(axes);
//2.相机
const camera = new THREE.PerspectiveCamera(
  70,
  window.innerWidth / window.innerHeight,
  0.1,
  2000
);
camera.position.set(2, 2, 3);
camera.lookAt(0, 0, 0);
//3.光源
let light1 = new THREE.DirectionalLight(0xffffff, 0.5);
light1.position.set(0, 10, 10);
let light2 = new THREE.DirectionalLight(0xffffff, 1);
light2.position.set(0, 10, -10);
let light3 = new THREE.DirectionalLight(0xffffff, 1);
light3.position.set(10, 10, 10);
scene.add(light1, light2, light3);
//4.材质与模型
//材质
let CarBodyMaterial = new THREE.MeshPhysicalMaterial({
  // 绿色
  color: 0xc0ff3e,
  metalness: 0.5,
  roughness: 0.2,
  clearcoat: 1,
  clearcoatRoughness: 0,
});
// 前脸
let FrontMaterial = new THREE.MeshPhysicalMaterial({
  color: 0xc0ff3e,
  metalness: 0.5,
  roughness: 0.2,
  clearcoat: 1,
  clearcoatRoughness: 0,
});
// 引擎盖
let HoodMaterial = new THREE.MeshPhysicalMaterial({
  color: 0xc0ff3e,
  metalness: 0.5,
  roughness: 0.2,
  clearcoat: 1,
  clearcoatRoughness: 0,
});
// 轮毂
let WheelMaterial = new THREE.MeshPhysicalMaterial({
  color: 0xc0ff3e,
  metalness: 0.5,
  roughness: 0.2,
});
//玻璃
let GlassMaterial = new THREE.MeshPhysicalMaterial({
  color: 0xffffff,
  metalness: 0,
  roughness: 0,
  transmission: 1,
  transparent: true,
});

// 汽车
//解码gltf文件
let dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("/draco/");
dracoLoader.setDecoderConfig({ type: "js" });
let gltfLoader = new GLTFLoader();
gltfLoader.setDRACOLoader(dracoLoader);
//定义模型组
let wheel = [];
// eslint-disable-next-line no-unused-vars
let CarBody, HoodCar, FrontCar, GlassCar;
// 加载并分组模型
gltfLoader.load("/NiubiCarSource/bmw01.glb", (gltf) => {
  gltf.scene.traverse((child) => {
    // if (child.isMesh) {
    //   console.log(child.name);
    // }
    //找出轮毂节点模型
    if (child.isMesh && child.name.includes("轮毂")) {
      wheel.push(child);
      wheel.forEach((val) => {
        val.material = WheelMaterial;
      });
    }
    //找出车身节点模型
    if (child.isMesh && child.name.includes("Mesh002")) {
      CarBody = child;
      CarBody.material = CarBodyMaterial;
    }
    //前脸模型
    if (child.isMesh && child.name.includes("前脸")) {
      FrontCar = child;
      FrontCar.material = FrontMaterial;
    }
    //引擎盖
    if (child.isMesh && child.name.includes("引擎盖_1")) {
      HoodCar = child;
      HoodCar.material = HoodMaterial;
    }
    //挡风玻璃
    if (child.isMesh && child.name.includes("挡风玻璃")) {
      GlassCar = child;
      GlassCar.material = GlassMaterial;
    }
  });
  scene.add(gltf.scene);
});
// 网格地面
const gridhelper = new THREE.GridHelper(100, 100);
gridhelper.material.opacity = 0.5;
gridhelper.material.transparent = true;
scene.add(gridhelper);

//5.渲染与轨道控制器
const renderer = new THREE.WebGLRenderer({
  //抗锯齿
  antialias: true,
  logarithmicDepthBuffer: true,
});
const controls = new OrbitControls(camera, renderer.domElement);
//轨道控制器阻尼感
controls.enableDamping = true;
//渲染器设置
renderer.setSize(window.innerWidth, window.innerHeight);
export function a() {
  document.getElementById("NiuBiCar_Box").appendChild(renderer.domElement);
}
// console.log(document.getElementById("NiuBiCar_Box"));

export function render() {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}
export function changeColor(item){
  CarBodyMaterial.color.set(item)
}
export function changeColor1(item){
  FrontMaterial.color.set(item)
}
// render();
