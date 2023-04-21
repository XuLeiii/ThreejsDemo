//封装的一个函数，用来批量生成html标签和CSS2D模型。

// import {
//   CSS2DRenderer,
//   CSS2DObject,
// } from "three/addons/renderers/CSS2DRenderer.js";
import {
  // CSS3DObject,
  CSS3DRenderer,
  CSS3DSprite,
} from "three/addons/renderers/CSS3DRenderer.js";
//1.创建一个html标签，并包装为css2d模型
function tags(name) {

    //创建一个div标签
    let dom = document.createElement("div");
    dom.innerHTML = name;
    dom.classList.add("tag");
    //div标签包装为css2dobject label模型
    let label1 = new CSS3DSprite(dom);
    dom.style.pointerEvents = "none";
    label1.rotateY(Math.PI / 2);
    label1.scale.set(0.5, 0.5, 0.5);
    return label1; //返回label模型
  
}

//2.创建CSS2D渲染器,想象为一个画布
let labelRenderer = new CSS3DRenderer();
labelRenderer.setSize(window.innerWidth, window.innerHeight);
labelRenderer.domElement.style.position = "absolute";
// labelRenderer.domElement.style.top = "0px";
// labelRenderer.domElement.style.left = "0px";
labelRenderer.domElement.style.pointerEvents = "none";
console.log("tags.js文件");
document.body.appendChild(labelRenderer.domElement);

// console.log(labelRenderer.domElement);

export { tags, labelRenderer };
