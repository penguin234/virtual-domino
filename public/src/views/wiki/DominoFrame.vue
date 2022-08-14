<script setup>
import Vector3D from '@/library/3d-elements/vector3d'
import Rotate from '@/library/3d-transforms/rotate'
import DominoFrame from '@/library/domino-stuffs/dominoframe'
import Domino from '@/library/domino-stuffs/domino'

import { ref, reactive, watch } from 'vue'

import ViewPlate from '@/components/ViewPlate.vue'
import Vector3DInput from '@/components/Vector3DInput.vue'
import RotateInput from '@/components/RotateInput.vue'

import { useCamera } from '@/composables/useCamera'

const tick = ref(0)

const Width = ref(5)
const Length = ref(2)
const Height = ref(10)

const frame = new DominoFrame(Width.value, Length.value, Height.value, 1)
const dominos = ref([])

const rc = Rotate(new Vector3D(0, 0, 1), 0)
const vc = new Vector3D(0, 0, 0)

const start = new Vector3D(0, -20, 5)
const diff = new Vector3D(0, 10, 0)
let curr = start.copy()

for (let i = 0; i < 5; i++) {
  let domino = new Domino(frame, curr, rc, vc, rc)
  dominos.value.push(domino)
  curr.add(diff)
}

watch([Width, Length, Height], ([width, length, height]) => {
  frame.width = width
  frame.length = length
  frame.height = height
  tick.value++
})

const { projection } = useCamera(new Vector3D(40, 40, 40), new Vector3D(-1, -1, -1), new Vector3D(0, 0, 1), Math.PI / 8, 200)
</script>

<template>
  <div>
    <h3> DominoFrame </h3>
    <ViewPlate :width="200" :height="200" :tick="tick" :dominos="dominos" :projection="projection" />
    <div>
      DominoFrame: <br>
      <label for="Width">Width: </label> <input name="Width" type="range" min="1" :max="20" :step="1" v-model.number="Width" /> {{ Width }} <br>
      <label for="Length">Length: </label> <input name="Length" type="range" min="1" :max="8" :step="1" v-model.number="Length" /> {{ Length }} <br>
      <label for="Height">Height: </label> <input name="Height" type="range" min="1" :max="20" :step="1" v-model.number="Height" /> {{ Height }} <br>
    </div>
  </div>
</template>