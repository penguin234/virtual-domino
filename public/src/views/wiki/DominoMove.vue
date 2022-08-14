<script setup>
import Vector3D from '@/library/3d-elements/vector3d'
import Rotate from '@/library/3d-transforms/rotate'
import DominoFrame from '@/library/domino-stuffs/dominoframe'
import Domino from '@/library/domino-stuffs/domino'

import { ref, watch } from 'vue'

import ViewPlate from '@/components/ViewPlate.vue'
import Vector3DInput from '@/components/Vector3DInput.vue'
import RotateInput from '@/components/RotateInput.vue'

import { useCamera } from '@/composables/useCamera'
import { useInterval } from '@/composables/useInterval'

const tick = ref(0)

const frame = new DominoFrame(5, 2, 10, 1)
const dominos = ref([])

const rc = Rotate(new Vector3D(0, 0, 1), 0)
const rv = ref(Rotate(new Vector3D(0, 0, 1), 0))
const v = ref(new Vector3D(0, 0, 0))

let domino = new Domino(frame, new Vector3D(0, 0, 5), rc, v.value, rv.value)
dominos.value.push(domino)

const { Play, Pause } = useInterval(100, () => {
  for (let domino of dominos.value) {
    domino.Move()
  }
  tick.value++
})

const Stop = () => {
  Pause()
  domino.position = new Vector3D(0, 0, 5)
  domino.rotation = rc
  tick.value++
}

watch(rv, (value) => {
  domino.angularvelocity = value;
})

watch(v, (value) => {
  domino.velocity = value;
})

const { projection } = useCamera(new Vector3D(40, 40, 40), new Vector3D(-1, -1, -1), new Vector3D(0, 0, 1), Math.PI / 8, 200)
</script>

<template>
  <div>
    <h3> DominoMove </h3>
    <ViewPlate :width="200" :height="200" :tick="tick" :dominos="dominos" :projection="projection" />
    <div>
      <button @click="Play"> Play </button>
      <button @click="Pause"> Pause </button>
      <button @click="Stop"> Stop </button>
    </div>
    <Vector3DInput name="velocity" v-model="v" :minX="-1" :maxX="1" :minY="-1" :maxY="1" :minZ="-1" :maxZ="1" :step="0.05" />
    <RotateInput name="angularvelocity" v-model="rv" :minA="Math.PI / -10" :maxA="Math.PI / 10" :step="Math.PI / 500" />
  </div>
</template>