import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import gsap from "gsap";
import * as dat from "dat.gui";
import colorimg from "../../public/textures/door/color.jpg";
import alphaimg from "../../public/textures/door/alpha.jpg";
import aoimg from "../../public/textures/door/ambientOcclusion.jpg";
import heightimg from "../../public/textures/door/height.jpg";
import roughnessimg from "../../public/textures/door/roughness.jpg";
import metalnessimg from "../../public/textures/door/metalness.jpg";
import normalimg from "../../public/textures/door/normal.jpg";
//01.gsap动画库的使用
function Gsapp() {
  let scene = new THREE.Scene();
  const axesHelper = new THREE.AxesHelper(1000);
  scene.add(axesHelper);

  //几何体和材质
  let geometry1 = new THREE.BoxGeometry(100, 100, 100);
  let material = new THREE.MeshBasicMaterial({
    color: 0xff00ff,
  });

  let geometry2 = new THREE.SphereGeometry(100, 100);
  let material2 = new THREE.MeshStandardMaterial({
    color: 0xff00ff,
  });
  let mesh1 = new THREE.Mesh(geometry1, material);
  let mesh2 = new THREE.Mesh(geometry2, material2);
  mesh1.position.set(0, 0, 0);
  mesh1.scale.set(3, 1, 1);
  mesh2.position.set(300, 0, 0);
  // mesh1.rotation.set(Math.PI / 4, 0, 0);
  scene.add(mesh1, mesh2);

  // gsap.to(mesh.position, { x: 5, duration: 5 });

  //灯光
  // let pointlight = new THREE.PointLight(0x0000ff);
  // pointlight.position.set(400, 200, 500);
  // scene.add(pointlight);
  // const pointlighthelper = new THREE.PointLightHelper(pointlight, 10);
  // scene.add(pointlighthelper);
  const light = new THREE.DirectionalLight("white", 1);
  light.position.set(500, 500, 0);
  scene.add(light);
  //相机
  let camera = new THREE.PerspectiveCamera(
    80,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(300, 300, 300);
  camera.lookAt(0, 0, 0);
  //渲染
  let renderer = new THREE.WebGLRenderer({ antialias: true });
  const controls = new OrbitControls(camera, renderer.domElement);

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0xb9d3ff, 1);
  renderer.setPixelRatio(window.devicePixelRatio);

  document.body.appendChild(renderer.domElement);

  controls.enableDamping = true;

    //最新的动画循环写法
  renderer.setAnimationLoop(()=>{
    controls.update();
    renderer.render(scene,camera)
  })
  // function render() {
  //   controls.update();
  //   renderer.render(scene, camera);
  //   requestAnimationFrame(render);
  // }
  // render();
  //画布随窗口尺寸变化而变化
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  //双击进入全屏
  window.addEventListener("dblclick", () => {
    const fullScreenElement = document.fullscreenElement;
    if (!fullScreenElement) {
      //   双击控制屏幕进入全屏，退出全屏
      // 让画布对象全屏
      renderer.domElement.requestFullscreen();
    } else {
      //   退出全屏，使用document对象
      document.exitFullscreen();
    }
  });
}

//02.dat.gui的使用
function datagui() {
  let scene = new THREE.Scene();
  const axesHelper = new THREE.AxesHelper(1000);
  scene.add(axesHelper);

  //几何体和材质
  let geometry = new THREE.BoxGeometry(100, 100, 100);
  let material = new THREE.MeshBasicMaterial({
    color: 0x0000ff,
  });
  let mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(500, 0, 0);
  mesh.scale.set(3, 1, 1);
  mesh.rotation.set(Math.PI / 4, 0, 0);
  scene.add(mesh);

  //*********************** GUI ********************************* */
  const gui = new dat.GUI();
  //位置的移动,值为整数型
  gui.add(mesh.position, "x").min(0).max(500).step(10).name("x轴位置");
  //颜色的改变，值为字符串型
  let params = {
    color: "#fff",
    fn: () => {
      gsap.to(mesh.position, { x: 100, duration: 3, yoyo: true, repeat: -1 });
    },
  };
  gui
    .addColor(params, "color")
    .onChange((val) => {
      mesh.material.color.set(val);
    })
    .name("颜色");
  //网格是否显示的选项按钮，值为布尔型
  gui.add(mesh, "visible").name("显示");
  //是否开启动画，值为函数型
  gui.add(params, "fn");
  //添加文件夹
  let folder = gui.addFolder("立方体组");
  folder.add(mesh.material, "wireframe").name("线框显示");
  //灯光
  let pointlight = new THREE.PointLight(0x0000ff);
  pointlight.position.set(400, 200, 500);
  scene.add(pointlight);
  const pointlighthelper = new THREE.PointLightHelper(pointlight, 10);
  scene.add(pointlighthelper);
  //相机
  let camera = new THREE.PerspectiveCamera(
    80,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(300, 300, 300);
  camera.lookAt(0, 0, 0);
  //渲染
  let renderer = new THREE.WebGLRenderer();
  const controls = new OrbitControls(camera, renderer.domElement);

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0xb9d3ff, 1);
  renderer.setPixelRatio(window.devicePixelRatio);

  document.body.appendChild(renderer.domElement);

  //阻尼感
  controls.enableDamping = true;

  function render() {
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }
  render();
  //画布随窗口尺寸变化而变化
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  //双击进入全屏
  window.addEventListener("dblclick", () => {
    const fullScreenElement = document.fullscreenElement;
    if (!fullScreenElement) {
      //   双击控制屏幕进入全屏，退出全屏
      // 让画布对象全屏
      renderer.domElement.requestFullscreen();
    } else {
      //   退出全屏，使用document对象
      document.exitFullscreen();
    }
  });
}

//03.buffergeometry创建科技感三角形
function buffer() {
  let scene = new THREE.Scene();
  const axesHelper = new THREE.AxesHelper(1000);
  scene.add(axesHelper);

  //buffer创建

  for (let i = 0; i < 50; i++) {
    const geometry = new THREE.BufferGeometry();
    const vertices = new Float32Array(9);
    for (let j = 0; j < 9; j++) {
      vertices[j] = Math.random() * 10 - 5;
    }

    const attribute = new THREE.BufferAttribute(vertices, 3);
    geometry.attributes.position = attribute;

    let color = new THREE.Color(Math.random(), Math.random(), Math.random());
    const material = new THREE.MeshBasicMaterial({
      color: color,
      transparent: true,
      opacity: 0.5,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
  }

  //灯光
  // eslint-disable-next-line no-unused-vars
  let ambient = new THREE.AmbientLight(0x404040);
  //相机
  let camera = new THREE.PerspectiveCamera(
    80,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(5, 5, 5);
  camera.lookAt(0, 0, 0);
  //渲染
  let renderer = new THREE.WebGLRenderer();
  const controls = new OrbitControls(camera, renderer.domElement);

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0xb9d3ff, 1);
  renderer.setPixelRatio(window.devicePixelRatio);

  document.body.appendChild(renderer.domElement);

  //阻尼感
  controls.enableDamping = true;

  function render() {
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }
  render();
  //画布随窗口尺寸变化而变化
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  //双击进入全屏
  window.addEventListener("dblclick", () => {
    const fullScreenElement = document.fullscreenElement;
    if (!fullScreenElement) {
      //   双击控制屏幕进入全屏，退出全屏
      // 让画布对象全屏
      renderer.domElement.requestFullscreen();
    } else {
      //   退出全屏，使用document对象
      document.exitFullscreen();
    }
  });
}

//04.材质与纹理
function caizhi() {
  let scene = new THREE.Scene();
  const axesHelper = new THREE.AxesHelper(1000);
  scene.add(axesHelper);

  //01.材质与纹理贴图
  const Texture = new THREE.TextureLoader();
  //颜色贴图
  const doorcolortexture = Texture.load(colorimg);
  //alpah贴图
  const dooralphatexture = Texture.load(alphaimg);
  //ao贴图
  const dooraotexture = Texture.load(aoimg);
  //height贴图
  const doorheightxture = Texture.load(heightimg);
  //roughness贴图
  const doorroughnesstxture = Texture.load(roughnessimg);
  //金属贴图
  const doormetalnesstexture = Texture.load(metalnessimg);
  //法线贴图
  const doornormaltexture = Texture.load(normalimg);
  //1.1纹理偏移
  // doorcolor.offset.x = 0.1
  // doorcolor.offset.y = 0.1
  // doorcolor.offset.set(0.5,0.5)

  //1.2纹理旋转
  // doorcolor.center.set(0.5,0.5)
  // doorcolor.rotation = Math.PI/4
  //1.3纹理重复

  // THREE.doorcolortexture.repeat.set(3, 5);
  // doorcolortexture.wrapS = THREE.RepeatWrapping;
  // doorcolortexture.wrapT = THREE.RepeatWrapping;

  const material = new THREE.MeshStandardMaterial({
    // color: "#ff0000",
    map: doorcolortexture,
    alphaMap: dooralphatexture,
    transparent: true,
    aoMap: dooraotexture,
    aoMapIntensity: 1,
    displacementMap: doorheightxture,
    displacementScale: 0.1,
    roughness: 1,
    roughnessMap: doorroughnesstxture,
    metalnessMap: doormetalnesstexture,
    normalMap: doornormaltexture,
  });
  //****************************网格几何体************************************
  const geometry = new THREE.BoxGeometry(1, 1, 1, 300, 300);
  const cubemesh = new THREE.Mesh(geometry, material);
  scene.add(cubemesh);
  geometry.setAttribute(
    "uv2",
    new THREE.BufferAttribute(geometry.attributes.uv.array, 2)
  );
  // *************************平面几何体****************************************
  const planemesh = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), material);
  planemesh.position.set(1, 0, -0.1);
  scene.add(planemesh);

  //灯光
  let ambient = new THREE.AmbientLight(0xffffff, 1);
  scene.add(ambient);
  const directlight = new THREE.DirectionalLight(0xffffff, 0.2);
  directlight.position.set(5, 5, 5);
  scene.add(directlight);
  //相机
  let camera = new THREE.PerspectiveCamera(
    80,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(5, 5, 5);
  camera.lookAt(0, 0, 0);
  //渲染
  let renderer = new THREE.WebGLRenderer();
  const controls = new OrbitControls(camera, renderer.domElement);

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0xb9d3ff, 1);
  renderer.setPixelRatio(window.devicePixelRatio);

  document.body.appendChild(renderer.domElement);

  //阻尼感
  controls.enableDamping = true;

  function render() {
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }
  render();
  //画布随窗口尺寸变化而变化
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  //双击进入全屏
  window.addEventListener("dblclick", () => {
    const fullScreenElement = document.fullscreenElement;
    if (!fullScreenElement) {
      //   双击控制屏幕进入全屏，退出全屏
      // 让画布对象全屏
      renderer.domElement.requestFullscreen();
    } else {
      //   退出全屏，使用document对象
      document.exitFullscreen();
    }
  });
}
export { Gsapp, datagui, buffer, caizhi };
