import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

//1.相机
const camera = new THREE.PerspectiveCamera(
  70,
  window.innerWidth / window.innerHeight,
  0.1,
  5000
);
camera.position.set(122, 1033, 0);
camera.lookAt(124, 1035, 0);

//2.渲染器
const renderer = new THREE.WebGLRenderer({
  antialias:true
})
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setClearColor(0xb9d3ff, 1)
renderer.outputEncoding = THREE.sRGBEncoding
//3.轨道控制器
const controls = new OrbitControls(camera,renderer.domElement)
controls.enableDamping = true;


console.log("RenderCamera.js");
export{camera,renderer,controls}