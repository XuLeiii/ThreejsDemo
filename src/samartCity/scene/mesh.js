import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
const group = new THREE.Group();

//1.上海城市模型
const loader = new GLTFLoader();
loader.load("/smartCity/上海外滩.glb", (gltf) => {
  //1.添加网格
  console.log("gltf.scene", gltf.scene);
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
// const loaderfile = new THREE.FileLoader();
// loaderfile.setResponseType("json");
// loaderfile.load("/smartCity/黄浦江.json", (data) => {
//   let vector2Arr = [];
//   const coordinatesArr = data.features[0].geometry.coordinates[0];
//   coordinatesArr.forEach((item) => {
//     vector2Arr.push(new THREE.Vector2(item[0], item[1])); //new THREE.Vector2(x,y)返回的是对象{x:xxx,y:xxx}
//   });
//   const shape = new THREE.Shape(vector2Arr);
//   const geometry = new THREE.ShapeGeometry(shape);
//   const material = new THREE.MeshBasicMaterial({
//     color: 0xff0000,
//   });
//   const mesh = new THREE.Mesh(geometry, material);
//   console.log("mesh", mesh);
//   mesh.position.set(0, 500, 0);
//   mesh.scale.set(100,100,100)
//   console.log("mesh123", mesh);
//   group.add(mesh);
//   console.log("group", group);
//   //*******************计算模型几何坐标中心用于摄像机对准
  
//   const box3 = new THREE.Box3();
//   box3.expandByObject(group);//计算group模型的包围盒
//   console.log("包围盒极大极小值",box3);
//   const size = new THREE.Vector3()
//   box3.getSize(size)
//   console.log("包围盒长宽高",size);

//   const center = new THREE.Vector3()
//   box3.getCenter(center);//计算包围盒几何体中心坐标
//   console.log("几何中心",center);
// });

console.log("mesh.js");
export { group };
