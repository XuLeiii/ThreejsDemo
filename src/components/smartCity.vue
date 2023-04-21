<template>
  <div>
  </div>
</template>

<script>
import { renderer } from '../samartCity/RenderLoop.js';
  export default {
    mounted(){
      document.body.appendChild(renderer.domElement)
    }
  }
</script>

<style lang="less" scoped>

</style>