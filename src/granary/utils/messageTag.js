import { CSS3DSprite } from "three/addons/renderers/CSS3DRenderer.js";

function msgTags(name) {
  const dom = document.getElementById(name);
  dom.style.pointerEvents = "none";
  const label = new CSS3DSprite(dom);
  label.scale.set(0.3, 0.3, 0.3);
  return label;
}
console.log("messagetag.js");
export { msgTags };
