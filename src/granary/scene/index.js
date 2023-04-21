//场景，辅助线，灯光，雾效果，添加网格
import * as THREE from "three";
import {model } from "./mesh.js"

const scene = new THREE.Scene();

const AxesHelper = new THREE.AxesHelper(500, 500, 500);
scene.add(AxesHelper);

scene.fog = new THREE.Fog(0xffffff,-100,1000)

const light = new THREE.PointLight(0xffffff, 0.5);
light.position.set(500, 500, 500);
scene.add(light);
console.log("index.js文件");
//添加网格体
scene.add(model)

export { scene };
