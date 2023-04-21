import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
//加载HDR贴图
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { Reflector } from "three/examples/jsm/objects/Reflector";
import bottomvideo from "../../public/RobotSource/zp2.mp4";
function Robot() {
  const scene = new THREE.Scene();
  const axes = new THREE.AxesHelper(500);
  scene.add(axes);

  const camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    0.1,
    2000
  );
  camera.position.set(2, 2, 2);

  //1.1创建天空盒子
  let HDRLoader = new RGBELoader();
  HDRLoader.load("/RobotSource/sky12.hdr", (HDRTexture) => {
    HDRTexture.mapping = THREE.EquirectangularReflectionMapping;
    scene.background = HDRTexture;
    scene.environment = HDRTexture;
  });
  //1.2底部贴图制作
  let video = document.createElement("video");
  video.src = bottomvideo;
  video.muted = true;
  video.loop = true;
  video.play();

  let VideoTexture = new THREE.VideoTexture(video);
  let plane = new THREE.PlaneGeometry(8, 4.5);
  let planeMaterial = new THREE.MeshBasicMaterial({
    map: VideoTexture,
    //定义此材质是否有透明
    transparent: true,
    //双面显示
    side: THREE.DoubleSide,
    //开启透明贴图，以原视频贴图为透明贴图，透明贴图是纯黑色的地方完全透明，
    alphaMap: VideoTexture,
  });
  let planeMesh = new THREE.Mesh(plane, planeMaterial);
  planeMesh.position.set(0, 0.2, 0);
  planeMesh.rotation.set(-Math.PI / 2, 0, 0);
  scene.add(planeMesh);

  //2.解析模型盒子
  //设置解码路径和解码格式
  let dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("../draco/");
  dracoLoader.setDecoderConfig({ type: "js" });

  const gltfLoader = new GLTFLoader();
  gltfLoader.setDRACOLoader(dracoLoader);
  gltfLoader.load("/RobotSource/robot.glb", (gltf) => {
    scene.add(gltf.scene);
    // console.log(gltf);
  });

  //3.直线光
  let light1 = new THREE.DirectionalLight(0xffffff, 0.5);
  light1.position.set(0, 10, 10);
  let light2 = new THREE.DirectionalLight(0xffffff, 1);
  light2.position.set(0, 10, -10);
  let light3 = new THREE.DirectionalLight(0xffffff, 1);
  light3.position.set(10, 10, 10);
  scene.add(light1, light2, light3);

  //4.添加镜面反射
  let reflectionGeometry = new THREE.PlaneGeometry(100, 100);
  let reflectionPlaneMesh = new Reflector(reflectionGeometry, {
    //贴图宽高等于屏幕宽高
    color: "0x333333",
    textureWidth: window.innerWidth,
    textureHeight: window.innerHeight,
  });
  console.log(reflectionPlaneMesh);
  reflectionPlaneMesh.rotation.x = -Math.PI / 2;
  scene.add(reflectionPlaneMesh);
  //5..渲染
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  
  //是否开启相机的旋转功能
  // controls.enableRotate = false;
  function render() {
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }
  render();
}

export { Robot };
