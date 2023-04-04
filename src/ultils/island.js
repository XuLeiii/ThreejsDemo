import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { Water } from "three/examples/jsm/objects/Water2.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import SkyImg from "../../public/IslandTextures/sky.jpg";
import SkyVideo from "../../public/IslandTextures/sky.mp4";
// import draco from "../../public/draco/"
// import islandGLTF from "../../public/model/island2.glb"
// import gsap from "gsap";
// import * as dat from "dat.gui";

function island() {
  //创建场景
  const scene = new THREE.Scene();
  // //添加坐标辅助器
  // const axes = new THREE.AxesHelper(500);
  // scene.add(axes);
  //创建相机
  const camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    0.1,
    2000
  );
  camera.position.set(-50, 50, 130);
  camera.lookAt(0, 0, 0);
  //创建光源
  // const ambient = new THREE.DirectionalLight(0xffffff, 5);
  // scene.add(ambient);

  //1.创建天空材质和贴图
  //1.1天空盒材质
  const SkyMaterial = new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load(SkyImg),
  });
  //1.2创建天空盒模型并贴图和视频
  const SkyGeometry = new THREE.SphereGeometry(1000, 60, 60);
  SkyGeometry.scale(1, 1, -1);
  const SkyMesh = new THREE.Mesh(SkyGeometry, SkyMaterial);
  //贴视频
  const video = document.createElement("video");
  video.src = SkyVideo;
  video.loop = true;
  window.addEventListener("click", () => {
    if (video.paused) {
      video.play();
      SkyMaterial.map = new THREE.VideoTexture(video);
      SkyMaterial.map.needsUpdate = true;
    }
  });
  scene.add(SkyMesh);

  // 2.创建水面模型和材质
  const WaterGeometry = new THREE.CircleGeometry(300, 60);
  const water = new Water(WaterGeometry, {
    textureHeight: 1024,
    textureWidth: 1024,
    color: 0xeeeeff,
    flowDirection: new THREE.Vector2(1, 1),
    scale: 1,
  });
  water.position.y = 3;
  water.rotation.x = -Math.PI / 2;
  scene.add(water);

  //3.导入小岛模型和材质贴图
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("../draco/");
  loader.setDRACOLoader(dracoLoader);
  loader.load("../model/island2.glb", (gltf) => {
    scene.add(gltf.scene);
    console.log(gltf);
  });
  //4.载入hdr贴图
  const hdrLoader = new RGBELoader();
  hdrLoader.loadAsync("../050.hdr").then((texture) => {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    scene.background = texture;
    scene.environment = texture;
  });
  //3.渲染与轨道控制器
  const renderer = new THREE.WebGLRenderer({
    //抗锯齿
    antialias: true,
    logarithmicDepthBuffer: true,
  });
  const controls = new OrbitControls(camera, renderer.domElement);
  //3.1开启轨道控制器阻尼感
  controls.enableDamping = true;
  //3.2渲染器设置
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0xb9d3ff, 1);
  renderer.physicallyCorrectLights = true
  document.body.appendChild(renderer.domElement);

  function render() {
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }
  render();
}
export { island };
