<script setup lang="ts">
import { onMounted } from 'vue';
import App from './utils/App';

onMounted(() => App.init({ domId: 'drawing-board-container' }));
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
