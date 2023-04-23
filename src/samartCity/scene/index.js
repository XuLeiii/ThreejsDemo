import * as THREE from "three";
import { group } from "./mesh.js";
//1.场景
const scene = new THREE.Scene();

//2.灯光
// const light = new THREE.PointLight(0xffffff, 0.5);
// light.position.set(0, 700, 0);
// scene.add(light);
// const amibient = new THREE.AmbientLight(0xffffff, 1);
// scene.add(amibient);
// 平行光1
var directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(200, 400, 300);
scene.add(directionalLight);
// 平行光2
var directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight2.position.set(-200, -400, 300);
scene.add(directionalLight2);
//3.坐标系
const axies = new THREE.AxesHelper(50000, 50000, 50000);
scene.add(axies);

//4.添加网格体
scene.add(group);
export { scene };

//5.雾气气
// scene.fog = new THREE.Fog(0xffffff, -100, 3000);

console.log("index.js");
