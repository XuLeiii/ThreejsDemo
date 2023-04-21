<template>
  <div id="app">
    <!-- <HelloWorld /> -->
    <!-- <NiuBiCar /> -->
    <!-- <granaryStore /> -->
    <smartCity />
  </div>
</template>

<script>
// import HelloWorld from "./components/HelloWorld.vue";
// import NiuBiCar from "./components/NiuBiCar.vue";
// import granaryStore from "./components/granaryStore";
import smartCity from "./components/smartCity.vue";
export default {
  name: "App",
  components: {
    // HelloWorld,
    // NiuBiCar,
    // granaryStore,
    smartCity,
  },
  beforeCreate() {
    console.log("apppppppppp");
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
.tag {
  color: aliceblue;
  background-color: rgba(10, 197, 197, 0.5);
  border-radius: 5px;
  font-size: 10px;
}
</style>
