<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import App from './utils/App';

onMounted(() =>
  App.init({
    domId: 'drawing-board-container',
    onChange: json => {
      console.log(json);
    },
  })
);
onUnmounted(() => App.destroy());
</script>

<template>
  <div id="drawing-board-container"></div>
</template>

<style lang="scss" scoped>
#drawing-board-container {
  width: 100vw;
  height: 100vh;
}
</style>
