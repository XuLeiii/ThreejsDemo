//相机，webgl渲染的配置，轨道控制器,css2drender的配置

import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const camera = new THREE.PerspectiveCamera(
  70,
  window.innerWidth / window.innerHeight,
  0.1,
  2000
);
camera.position.set(100, 100, 100);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({
  antialias: true,
});

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;


renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xb9d3ff, 1);
renderer.outputEncoding = THREE.sRGBEncoding;


console.log("RenderCamera.js文件");

export { renderer, camera, controls };
