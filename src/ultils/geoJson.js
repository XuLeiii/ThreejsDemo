import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
//加载HDR贴图
function geojson() {
  const scene = new THREE.Scene();
  const axes = new THREE.AxesHelper(500);
  scene.add(axes);

  const camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    0.0001,
    20000
  );
  camera.position.set(121.51131393432617, 31.252206344604492, 0.02);

  // 2.GeoJson生成河流模型
  const loaderfile = new THREE.FileLoader();
  loaderfile.setResponseType("json");
  loaderfile.load("/smartCity/黄浦江.json", async (data) => {
    let b = [];
    const coordinatesArr = data.features[0].geometry.coordinates[0];
    await coordinatesArr.forEach((item) => {
      b.push(new THREE.Vector2(item[0], item[1]));
    });
    const shape = new THREE.Shape(b); //[{},{},{}]
    var geometry = new THREE.ShapeGeometry(shape);
    var material = new THREE.MeshLambertMaterial({
      color: 0x00ffff,
      side: THREE.DoubleSide,
      // wireframe: true, //查看生成的三角形
    }); //材质对象
    var mesh = new THREE.Mesh(geometry, material);
    // mesh.position.set(0,0,0)
    console.log("mesh",mesh);
    // mesh.scale.set(10,10,10) //网格模型对象
    scene.add(mesh);
    //*******************计算模型几何坐标中心用于摄像机对准

    const box3 = new THREE.Box3();
    box3.expandByObject(mesh); //计算group模型的包围盒
    console.log("包围盒极大极小值", box3);
    const size = new THREE.Vector3();
    box3.getSize(size);
    console.log("包围盒长宽高", size);

    const center = new THREE.Vector3();
    box3.getCenter(center); //计算包围盒几何体中心坐标
    console.log("几何中心", center);
  });



  //3.直线光
  var directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(200, 400, 300);
  scene.add(directionalLight);

  //5..渲染
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0xffffff);
  renderer.setPixelRatio(window.devicePixelRatio); //设置设备像素比率,防止Canvas画布输出模糊。

  document.body.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.target.set(121.49131393432617, 31.232206344604492, 0);

  function render() {
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }
  render();
}

export { geojson };
