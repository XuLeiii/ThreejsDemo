import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

//1.pm2.5案例
function chinaPM() {
  const scene = new THREE.Scene();
  // const axes = new THREE.AxesHelper(500);
  // scene.add(axes);

  const camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    0.1,
    2000
  );
  camera.position.set(0, 0, 20);

  const texture = new THREE.TextureLoader().load("/pm2.5source/sprite.png");
  console.log(texture);
  let loader = new THREE.FileLoader().setResponseType("json");
  let group1 = new THREE.Group();
  loader.load("/pm2.5source/数据.json", (data) => {
    let spriteMaterial = new THREE.SpriteMaterial({
      map: texture,
      transparent: true,
      opacity: 0.8,
    });

    data.forEach((ele) => {
      let sprite = new THREE.Sprite(spriteMaterial);
      group1.add(sprite);
      let m = ele.value / 200;
      sprite.scale.set(m, m, 0);
      sprite.position.set(ele.coordinate[0], ele.coordinate[1], 1);
    });
    group1.position.set(-110, -30, 0);
    scene.add(group1);
  });
  console.log(group1);
  const ambient = new THREE.AmbientLight(10);
  scene.add(ambient);

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  renderer.setClearColor(0x000000, 1);
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.enableRotate = false;
  function render() {
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }
  render();
}
//2.树林案例
function Forest() {
  const scene = new THREE.Scene();
  const axes = new THREE.AxesHelper(500);
  scene.add(axes);

  const camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    0.1,
    2000
  );
  camera.position.set(100, 100, 100);

  const GrassTexture = new THREE.TextureLoader().load(
    "/forestSource/grass.jpg"
  );
  const TreeTexture = new THREE.TextureLoader().load("/forestSource/tree.png");
  //1.地面的制作
  let PlaneGeometry = new THREE.PlaneGeometry(100, 100);
  let PlaneMaterial = new THREE.MeshBasicMaterial({
    map: GrassTexture,
  });
  let PlaneMesh = new THREE.Mesh(PlaneGeometry, PlaneMaterial);
  PlaneMesh.rotateX(-Math.PI / 2);
  PlaneMesh.position.set(50, 0, 50);
  //设置纹理的重复样式
  GrassTexture.wrapS = THREE.RepeatWrapping;
  GrassTexture.wrapT = THREE.RepeatWrapping;
  GrassTexture.repeat.set(5, 5);
  scene.add(PlaneMesh);
  // 2.树的制作
  let SpriteMaterial = new THREE.SpriteMaterial({
    map: TreeTexture,
    transparent: true,
    opacity: 1,
  });
  for (let i = 0; i < 1000; i++) {
    let SpriteMesh = new THREE.Sprite(SpriteMaterial);
    SpriteMesh.scale.set(20, 20, 1);
    SpriteMesh.position.set(Math.random() * 100, 8, Math.random() * 100);
    scene.add(SpriteMesh);
  }
  // let group1 = new THREE.Group();

  const ambient = new THREE.AmbientLight(10);
  scene.add(ambient);

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  renderer.setClearColor(0x000000, 1);
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
//3.下雨场景
function Rain() {
  const scene = new THREE.Scene();
  // const axes = new THREE.AxesHelper(500);
  // scene.add(axes);

  const camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    0.1,
    2000
  );
  camera.position.set(100, 100, 100);

  const RainTexture = new THREE.TextureLoader().load("/RainSource/rain.png");

  //1. 雨滴的制作
  let SpriteMaterial = new THREE.SpriteMaterial({
    map: RainTexture,
    transparent: true,
    opacity: 1,
  });
  let group = new THREE.Group()
  for (let i = 0; i < 200; i++) {
    let SpriteMesh = new THREE.Sprite(SpriteMaterial);
    SpriteMesh.scale.set(10, 10, 1);
    SpriteMesh.position.set(
      Math.random() * 150,
      Math.random() * 150,
      Math.random() * 150
    );
    group.add(SpriteMesh)
  }
  scene.add(group);

  const ambient = new THREE.AmbientLight(10);
  scene.add(ambient);

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  renderer.setClearColor(0x000000, 1);
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  //是否开启相机的旋转功能
  // controls.enableRotate = false;
  function render() {
    controls.update();
    renderer.render(scene, camera);
    group.children.forEach((sprite)=>{
      sprite.position.y-=1
      if(sprite.position.y < 0){
        sprite.position.y = 150
      }
    })
    requestAnimationFrame(render);
  }
  render();
}
export { chinaPM, Forest, Rain };
