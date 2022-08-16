<script setup>
import Vector3D from '@/library/3d-elements/vector3d'
import Rotate from '@/library/3d-transforms/rotate'
import DominoFrame from '@/library/domino-stuffs/dominoframe'
import Domino from '@/library/domino-stuffs/domino'

import { ref, computed, watch } from 'vue'

import CameraController from '@/components/CameraController.vue'
import ViewPlate from '@/components/ViewPlate.vue'
import Vector3DInput from '@/components/Vector3DInput.vue'
import RotateInput from '@/components/RotateInput.vue'
import Vector3DLabel from '@/components/Vector3DLabel.vue'

import { useInterval } from '@/composables/useInterval'

const tick = ref(0)

const frame = new DominoFrame(5, 2, 10, 100)
const dominos = ref([])

const rc = Rotate(new Vector3D(0, 0, 1), 0)

const v = ref(new Vector3D(0, 0, 0))
const angle = ref(0)
const axis = ref(new Vector3D(0, 0, 1))

let domino = new Domino(frame, new Vector3D(0, 0, 5), rc, v.value, rc)
dominos.value.push(domino)

const pushx = ref(0.5)
const pushz = ref(0.5)
const size = ref(10)

const point = computed(() => {
  console.log('c1')
  const realx = domino.position.x + domino.frame.width * (pushx.value - 0.5)
  const realz = domino.position.z + domino.frame.height * (pushz.value - 0.5)
  return new Vector3D(realx, 1, realz)
})

const force = computed(() => {
  console.log('c2')
  return new Vector3D(0, size.value * -1, 0)
})

const { Play, Pause, isActive } = useInterval(50, () => {
  console.log('c3')
  for (let domino of dominos.value) {
    domino.Move()
  }
  tick.value++
})

const Force = () => {
  console.log('c4')
  Stop()
  const { acceleration, angularacceleration } = domino.Force(point.value, force.value)
  domino.Accelerate(acceleration)
  domino.AngularAccelerate(Rotate(angularacceleration.axis, angularacceleration.angle))
  v.value = domino.velocity
  axis.value = angularacceleration.axis
  angle.value = angularacceleration.angle
  Play()
}

const Stop = () => {
  console.log('c5')
  Pause()
  domino.position = new Vector3D(0, 0, 5)
  domino.rotation = rc.copy()
  domino.velocity = new Vector3D(0, 0, 0)
  domino.angularvelocity = rc.copy()
  tick.value++
}

const projection = ref(null)
</script>

<template>
  <div>
    <h3> DominoForced </h3>

    <CameraController v-model="projection" :position="new Vector3D(40, 40, 40)" :lookdirection="new Vector3D(-1, -1, -1)" :updirection="new Vector3D(0, 0, 1)" :horizontalangle="Math.PI / 8" :viewboxwidth="200" />

    <ViewPlate :width="200" :height="200" :tick="tick" :dominos="dominos" :vectors="[{ point: point, vector: force }]" :projection="projection" />
    <div>
      <div v-if=!isActive>
        X : <input type="range" v-model.number="pushx" min="0" max="1" step="0.01"> <br>
        Z : <input type="range" v-model.number="pushz" min="0" max="1" step="0.01"> <br>
        Size: <input type="range" v-model.number="size" min="2" max="20" step="1"> <br>
      </div>
      <Vector3DLabel name="point" :vector="point" />
      <Vector3DLabel name="force" :vector="force" />
      <button @click="Force" v-if="!isActive"> Force </button>
      <button @click="Stop" v-if="isActive"> Stop </button>
    </div>
    
    <div>
      <Vector3DLabel name="velocity" :vector="v" />
    </div>
    <div>
      <p>
        angularvelocity:
      </p>
      <p>
        angle: {{ angle }}
      </p>
      <p>
        <Vector3DLabel name="axis" :vector="axis" />
      </p>
    </div>
  </div>
</template>