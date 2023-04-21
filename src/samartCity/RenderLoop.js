import { scene } from "./scene/index.js";

import { camera, renderer, controls } from "./RenderCamera.js";

function render() {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}
render();

console.log("renderloop");
export{renderer}
