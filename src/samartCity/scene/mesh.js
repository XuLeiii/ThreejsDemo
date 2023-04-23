import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// import output_fragment from '../utils/output_fragment.glsl.js'

//计算包围盒模型
// import { box3Compute } from "../utils/box3Compute.js";
// import { lon2xy } from "../utils/math.js";
//1.上海城市模型
const group = new THREE.Group();
// console.log("box3Compute", box3Compute);
const loader = new GLTFLoader();
loader.load("/smartCity/上海外滩.glb", (gltf) => {
  //1.添加网格
  // console.log("gltf.scene", gltf.scene);
  group.add(gltf.scene);
  //2.选中网格
  let river = gltf.scene.getObjectByName("河面");
  river.material.color.set(0xff0000);

  const plane = gltf.scene.getObjectByName("地面");
  plane.material.color.set(0x000000);
  console.log("plane", plane);

  gltf.scene.getObjectByName("楼房").traverse((obj) => {
    if (obj.type === "Mesh") {
      obj.material = new THREE.MeshLambertMaterial({
        color: 0xffffff,
      });
    }
  });
  const bigBall = gltf.scene.getObjectByName("东方明珠");
  bigBall.material.color.set(0xff0000);
  console.log("bigBall", bigBall);

  //#region 5.河流材质
  // console.log("river", river);
  let geometry2 = river.geometry;
  let pos = geometry2.attributes.position; //顶点坐标
  let count = pos.count;
  let xArr = [];
  let yArr = [];
  //1.分别获取x,y坐标的集合
  for (let i = 0; i < count; i++) {
    xArr.push(pos.getX(i));
    yArr.push(pos.getZ(i));
  }
  //2.找出集合中最大最小的x,y
  let [xMin, xMax] = minMax(xArr);
  let [yMin, yMax] = minMax(yArr);
  //多边形坐标进行排序
  function minMax(arr) {
    // 数组元素排序
    arr.sort(compareNum);
    // 返回极小值和极大值
    return [arr[0], arr[arr.length - 1]];
  }
  // 数组排序规则
  function compareNum(num1, num2) {
    if (num1 < num2) {
      return -1;
    } else if (num1 > num2) {
      return 1;
    } else {
      return 0;
    }
  }
  //3.计算几何体的长宽
  let xl = xMax - xMin;
  let yl = yMax - yMin;
  let uv = [];
  //根据坐标点集合的值比上长宽来算出其对应的uv坐标
  for (let i = 0; i < count; i++) {
    let u = (pos.getX(i) - xMin) / xl;
    let v = (pos.getZ(i) - yMin) / yl;
    uv.push(u);
    uv.push(v);
  }
  const textureWater = new THREE.TextureLoader().load("./smartCity/水面.jpg");
  textureWater.wrapS = THREE.RepeatWrapping;
  textureWater.wrapT = THREE.RepeatWrapping;
  textureWater.repeat.set(10, 10);
  const textureNormal = new THREE.TextureLoader().load(
    "./smartCity/normal.jpg"
  );
  river.material = new THREE.MeshPhongMaterial({
    map: textureWater,
    normalMap: textureNormal,
    // normalScale: new THREE.Vector2(5, 5),
  });
  geometry2.setAttribute(
    "uv",
    new THREE.BufferAttribute(new Float32Array(uv), 2)
  );
  //#endregion
});

// 2.GeoJson生成河流模型
// const loaderfile = new THREE.FileLoader();
// loaderfile.setResponseType("json");
// loaderfile.load("/smartCity/黄浦江.json", async (data) => {
//   let b = [];
//   const coordinatesArr = data.features[0].geometry.coordinates[0];
//   await coordinatesArr.forEach((item) => {
//     let xy = lon2xy(item[0], item[1]);
//     b.push(new THREE.Vector2(xy.x, xy.y));
//   });
//   const shape = new THREE.Shape(b); //[{},{},{}]
//   var geometry = new THREE.ShapeGeometry(shape);
//   var material = new THREE.MeshLambertMaterial({
//     color: 0x00ffff,
//     side: THREE.DoubleSide,
//     // wireframe: true, //查看生成的三角形
//   }); //材质对象
//   var mesh = new THREE.Mesh(geometry, material);
//   group.add(mesh);
//   box3Compute(group);
// });

// //3.Geojson生成城市网格模型
// loaderfile.load("/smartCity/上海外滩.json", async (data) => {
//   let buildGroup = new THREE.Group();
//   let buildVectorArr = [];
//   let buildShapeArr = [];
//   // console.log("data", data);
//   await data.features.forEach((item) => {
//     item.geometry.coordinates[0].forEach((val) => {
//       let xy = lon2xy(val[0], val[1]);
//       buildVectorArr.push(new THREE.Vector2(xy.x, xy.y));
//     });
//     const shape = new THREE.Shape(buildVectorArr); //[{},{},{}]
//     buildShapeArr.push(shape);
//     buildVectorArr = [];

//     const geometry1 = new THREE.ExtrudeGeometry(buildShapeArr, {
//       depth: item.properties.Floor * 5, //拉伸高度
//       bevelEnabled: false, //无倒角
//     });
//     buildShapeArr = [];

//     // console.log("geometry1", geometry1);
//     var material1 = new THREE.MeshLambertMaterial({
//       color: 0x00ffff,
//       side: THREE.DoubleSide,
//       // wireframe: true, //查看生成的三角形
//     });
//     const mesh1 = new THREE.Mesh(geometry1, material1);

//     buildGroup.add(mesh1);
//     // console.log("buildVectorArr",buildVectorArr);
//   });
//   group.add(buildGroup);
//   console.log("buildGroup", buildGroup);
//   // console.log("group", group);
// });

//4.自定义生成几何体
const c = [
  0,
  0, //顶点1坐标
  60,
  0, //顶点2坐标
  60,
  80, //顶点3坐标
  40,
  120, //顶点4坐标
  -20,
  80, //顶点5坐标
  0,
  0, //顶点6坐标  和顶点1重合
];
// const geometry = new THREE.BufferGeometry();
// const posArr = [];
// const h = 20; //围墙高度
// for (let i = 0; i < c.length - 2; i += 2) {
//   //上面的三角形面片
//   posArr.push(c[i], c[i + 1], 0, c[i + 2], c[i + 3], 0, c[i + 2], c[i + 3], h);
//   //下面的三角形面片
//   posArr.push(c[i], c[i + 1], 0, c[i + 2], c[i + 3], h, c[i], c[i + 1], h);
// }
// console.log("posarr", posArr);
// geometry.attributes.position = new THREE.BufferAttribute(
//   new Float32Array(posArr),
//   3
// );
// geometry.computeVertexNormals();
// const material = new THREE.MeshLambertMaterial({
//   color: 0x00ff00,
//   side: THREE.DoubleSide,
//   // wireframe:true,//查看三角形结构
//   transparent: true, //需要开启透明度计算，否则着色器透明度设置无效
//   opacity: 0.5, //整体改变透明度
//   depthTest: false,
// });
// #region 4.1：SHADER生成透明渐变围墙的代码
// var posAtt = geometry.attributes.position; //几何体顶点位置缓冲对象
// var num = geometry.attributes.position.count;//几何体顶点数量
// var alphaArr = []; //每个顶点创建一个透明度数据(随着高度渐变)
// for (var i = 0; i < num; i++) {
//   // 线性渐变
//   alphaArr.push(1 - posAtt.getZ(i) / h);
// }
// // BufferGeometory自定义一个.attributes.alpha属性,类比.attributes.position
// // 几何体的属性.alpha和顶点着色器变量alpha是对应的
// geometry.setAttribute('alpha', new THREE.BufferAttribute(new Float32Array(alphaArr), 1));

// // GPU执行material对应的着色器代码前，通过.onBeforeCompile()插入新的代码，修改已有的代码
// material.onBeforeCompile = function (shader) {
//   // console.log('shader.fragmentShader', shader.fragmentShader)
//   // 插入代码：在顶点着色器主函数'void main() {'前面插入alpha变量的声明代码
//   shader.vertexShader = shader.vertexShader.replace(
//     'void main() {',
//     ['attribute float alpha;//透明度分量',
//       'varying float vAlpha;',
//       'void main() {',
//       'vAlpha = alpha;', // 顶点透明度进行插值计算
//     ].join('\n') // .join()把数组元素合成字符串
//   );
//   // 插入代码：片元着色器主函数前面插入`varying float vAlpha;`
//   shader.fragmentShader = shader.fragmentShader.replace(
//     'void main() {',
//     ['varying float vAlpha;',
//       'void main() {',
//     ].join('\n')
//   );
//   shader.fragmentShader = shader.fragmentShader.replace('#include <output_fragment>', output_fragment);
// };
// #endregion
//#region 4.2:UV贴图生成透明围墙和上下流光效果
var posArr = [];
var uvrr = [];
var h = 20; //围墙拉伸高度
for (var i = 0; i < c.length - 2; i += 2) {
  // 三角形1  三个顶点坐标
  posArr.push(c[i], c[i + 1], 0, c[i + 2], c[i + 3], 0, c[i + 2], c[i + 3], h);
  // 三角形2  三个顶点坐标
  posArr.push(c[i], c[i + 1], 0, c[i + 2], c[i + 3], h, c[i], c[i + 1], h);

  // 注意顺序问题，和顶点位置坐标对应
  uvrr.push(
    i / c.length,
    0,
    i / c.length + 2 / c.length,
    0,
    i / c.length + 2 / c.length,
    1
  );
  uvrr.push(i / c.length, 0, i / c.length + 2 / c.length, 1, i / c.length, 1);
}
var geometry = new THREE.BufferGeometry(); //声明一个空几何体对象
// 设置几何体attributes属性的位置position属性
geometry.attributes.position = new THREE.BufferAttribute(
  new Float32Array(posArr),
  3
);
// 设置几何体attributes属性的位置uv属性
geometry.attributes.uv = new THREE.BufferAttribute(new Float32Array(uvrr), 2);
console.log("geometry.attributes", geometry.attributes);
geometry.computeVertexNormals();
var material = new THREE.MeshLambertMaterial({
  color: 0x00ff00,
  map: new THREE.TextureLoader().load("./smartCity/渐变.png"),
  side: THREE.DoubleSide, //两面可见
  transparent: true, //需要开启透明度计算，否则着色器透明度设置无效
  // opacity: 0.5,//整体改变透明度
  depthTest: false,
});
const mesh = new THREE.Mesh(geometry, material);
mesh.position.set(0, 500, 0);
mesh.rotateX(-Math.PI / 2);
group.add(mesh);
//2.上下流光效果
const mesh2 = mesh.clone();
mesh2.material = mesh.material.clone();
const texture = new THREE.TextureLoader().load("./smartCity/流动.png");
mesh2.material.map = texture;
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.repeat.x = 8;
group.add(mesh2);
//3.水平流光效果
const mesh3 = mesh.clone();
mesh3.material = mesh.material.clone();
const texture1 = new THREE.TextureLoader().load("./smartCity/流光.png");
mesh3.material.map = texture1;
texture1.wrapS = THREE.RepeatWrapping;
texture1.wrapT = THREE.RepeatWrapping;
texture1.repeat.x = 3;
texture1.repeat.y = 5;
group.add(mesh3);
function flowAnimation() {
  requestAnimationFrame(flowAnimation);
  texture.offset.y -= 0.03;
  texture1.offset.x += 0.05;
}
flowAnimation();

// #endregion

console.log("mesh.js");
export { group };
