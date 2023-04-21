//动画，轨道控制器更新
import { scene } from "./scene/index.js";
import { camera, renderer, controls } from "./RenderCamera.js";
import { labelRenderer } from "./scene/tags";
function render() {
  controls.update();
  renderer.render(scene, camera);
  labelRenderer.render(scene, camera);
  requestAnimationFrame(render);
}
render();
console.log("RenderLoop.js文件");

export { renderer };
