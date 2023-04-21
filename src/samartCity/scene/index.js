import * as THREE from "three";
import { group } from "./mesh.js";
//1.场景
const scene = new THREE.Scene();

//2.灯光
const light = new THREE.PointLight(0xffffff, 0.5);
light.position.set(0, 700, 0);
scene.add(light);

//3.坐标系
const axies = new THREE.AxesHelper(5000, 5000, 5000);
scene.add(axies);

//4.添加网格体
scene.add(group);
export { scene };

//5.网格体
scene.fog = new THREE.Fog(0xffffff, -100, 3000);

console.log("index.js");