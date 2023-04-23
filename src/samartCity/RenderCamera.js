import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { lon2xy } from "./utils/math.js";
//1.相机
const camera = new THREE.PerspectiveCamera(
  70,
  window.innerWidth / window.innerHeight,
  0.01,
  30000000
);
//将上海外滩的几何中心经纬度坐标点转为墨卡托坐标点，并设置相机位置到新的坐标点
let E = 121.51131393432617;
let N = 31.252206344604492;
let xy = lon2xy(E, N);
let x = xy.x;
let y = xy.y;
console.log("x,y", x, y);
// camera.position.set(x + 1000, y + 1000, 1000);
// camera.position.set(121.51131393432617,31.252206344604492, 0);
camera.position.set(1000, 1000, 1000);

//2.渲染器
const renderer = new THREE.WebGLRenderer({
  antialias: true,
  //材质闪烁问题
  logarithmicDepthBuffer: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xb9d3ff, 1);
renderer.outputEncoding = THREE.sRGBEncoding;
//3.轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// controls.target.set(121.51131393432617, 31.252206344604492, 0);
// controls.target.set(x, y, 0);
console.log("controls", controls);
console.log("RenderCamera.js");
export { camera, renderer, controls };
