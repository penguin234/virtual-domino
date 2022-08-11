<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const x = ref(0)
const y = ref(0)

function update(event) {
    x.value = event.layerX / 100 - 1
    y.value = event.layerY / 100 - 1
}

onMounted(() => window.addEventListener('mousemove', update))
onUnmounted(() => window.removeEventListener('mousemove', update))
</script>

<template>
    <svg width="200" height="200" viewBox="-1 -1 2 2">
        <circle cx="0" cy="0" r="1" fill="yellow" />
        <circle :cx="x" :cy="y" r="0.15" fill="green" />
    </svg>
    <br>
    <span> x: {{ x }} </span>
    <span> y: {{ y }} </span>
</template>