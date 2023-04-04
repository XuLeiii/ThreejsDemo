import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

function niubiCar() {
  //创建场景
  const scene = new THREE.Scene();
  //添加坐标辅助器
  const axes = new THREE.AxesHelper(500);
  scene.add(axes);
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
  const ambient = new THREE.DirectionalLight(0xffffff, 1);
  scene.add(ambient);
  
  //模型
  const geometry = new THREE.BoxGeometry(50,50,50)
  const material = new THREE.MeshBasicMaterial({
    color:"#ffffff"
  })
  const mesh = new THREE.Mesh(geometry,material)
  scene.add(mesh)
  const gridhelper = new THREE.GridHelper(100,100)
  gridhelper.material.opacity = 0.5
  gridhelper.material.transparent = true 
  scene.add(gridhelper)

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
  document.body.appendChild(renderer.domElement);

  function render() {
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }
  render();
}

export { niubiCar };
