<script setup>
import Vector3D from '@/library/3d-elements/vector3d'
import Rotate from '@/library/3d-transforms/rotate'
import DominoFrame from '@/library/domino-stuffs/dominoframe'
import Domino from '@/library/domino-stuffs/domino'

import { ref, watch } from 'vue'

import ViewPlate from '@/components/ViewPlate.vue'
import Vector3DInput from '@/components/Vector3DInput.vue'
import RotateInput from '@/components/RotateInput.vue'
import CameraController from '@/components/CameraController.vue'

import { useCamera } from '@/composables/useCamera'

const tick = ref(0)

const frame = new DominoFrame(5, 2, 10, 1)
const dominos = ref([])

const position = ref(new Vector3D(0, 0, 5))
const rotation = ref(Rotate(new Vector3D(0, 0, 1), 0))

const domino = new Domino(frame, new Vector3D(0, 0, 5), Rotate(new Vector3D(0, 0, 1), 0), new Vector3D(0, 0, 0), Rotate(new Vector3D(0, 0, 1), 0));
dominos.value.push(domino)

watch([position, rotation], ([position, rotation]) => {
  domino.position = position
  domino.rotation = rotation
  tick.value++
})

const cameraposition = new Vector3D(40, 40, 40)
const cameralookdirection = new Vector3D(-1, -1, -1)
const cameraupdirection = new Vector3D(0, 0, 1)

const projection = ref(null)
</script>

<template>
  <div>
    <h3> Domino </h3>
    <CameraController v-model="projection" :position="cameraposition" :lookdirection="cameralookdirection" :updirection="cameraupdirection" :horizontalangle="Math.PI / 8" :viewboxwidth="200" />
    <ViewPlate :width="200" :height="200" :tick="tick" :dominos="dominos" :projection="projection" />
    <Vector3DInput name="position" v-model="position" :minZ="0" :maxZ="20" :step="0.5" />
    <RotateInput name="rotation" v-model="rotation" />
  </div>
</template>