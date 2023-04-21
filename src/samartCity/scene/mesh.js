import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
//计算包围盒模型
import { box3Compute } from "../utils/box3Compute.js";
import { lon2xy } from "../utils/math.js";
//1.上海城市模型
const group = new THREE.Group();
// console.log("box3Compute", box3Compute);
const loader = new GLTFLoader();
loader.load("/smartCity/上海外滩.glb", (gltf) => {
  //1.添加网格
  // console.log("gltf.scene", gltf.scene);
  group.add(gltf.scene);
  //2.选中网格
  const river = gltf.scene.getObjectByName("河面");
  const plane = gltf.scene.getObjectByName("地面");
  river.material.color.set(0x00ff00);
  plane.material.color.set(0xff0000);

  gltf.scene.getObjectByName("楼房").traverse((obj) => {
    if (obj.type === "Mesh") {
      obj.material = new THREE.MeshLambertMaterial({
        color: 0xffffff,
      });
    }
  });
  const bigBall = gltf.scene.getObjectByName("东方明珠");
  bigBall.material.color.set(0xffffff);
});

// 2.GeoJson生成河流模型
const loaderfile = new THREE.FileLoader();
loaderfile.setResponseType("json");
loaderfile.load("/smartCity/黄浦江.json", async (data) => {
  let b = [];
  const coordinatesArr = data.features[0].geometry.coordinates[0];
  await coordinatesArr.forEach((item) => {
    let xy = lon2xy(item[0], item[1]);
    b.push(new THREE.Vector2(xy.x, xy.y));
  });
  const shape = new THREE.Shape(b); //[{},{},{}]
  var geometry = new THREE.ShapeGeometry(shape);
  var material = new THREE.MeshLambertMaterial({
    color: 0x00ffff,
    side: THREE.DoubleSide,
    // wireframe: true, //查看生成的三角形
  }); //材质对象
  var mesh = new THREE.Mesh(geometry, material);
  group.add(mesh);
  box3Compute(group);
});



//3.Geojson生成城市网格模型
loaderfile.load("/smartCity/上海外滩.json", async (data) => {
  let buildGroup = new THREE.Group();
  let buildVectorArr = [];
  let buildShapeArr = [];
  // console.log("data", data);
  await data.features.forEach((item) => {
    item.geometry.coordinates[0].forEach((val) => {
      let xy = lon2xy(val[0], val[1]);
      buildVectorArr.push(new THREE.Vector2(xy.x, xy.y));
    });
    const shape = new THREE.Shape(buildVectorArr); //[{},{},{}]
    buildShapeArr.push(shape);
    buildVectorArr = [];

    const geometry1 = new THREE.ExtrudeGeometry(buildShapeArr, {
      depth: item.properties.Floor * 5, //拉伸高度
      bevelEnabled: false, //无倒角
    });
    buildShapeArr = [];

    console.log("geometry1", geometry1);
    var material1 = new THREE.MeshLambertMaterial({
      color: 0x00ffff,
      side: THREE.DoubleSide,
      // wireframe: true, //查看生成的三角形
    });
    const mesh1 = new THREE.Mesh(geometry1, material1);

    buildGroup.add(mesh1);
    // console.log("buildVectorArr",buildVectorArr);
  });
  group.add(buildGroup);
  console.log("buildGroup", buildGroup);
  // console.log("group", group);
});
console.log("mesh.js");
export { group };
