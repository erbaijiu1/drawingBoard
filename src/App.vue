<script setup lang="ts">
import { onMounted } from 'vue';
import DrawingBoard from './utils/DrawingBoard'

onMounted(() => new DrawingBoard('drawing-board-container'))
</script>

<template>
  <div id="drawing-board-container"></div>
  <Toolbar />
  <HelloWorld />
</template>

<style lang="scss" scoped>
#drawing-board-container {
  width: 100vw;
  height: 100vh;
}
</style>
