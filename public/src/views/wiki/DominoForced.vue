<script setup>
import Vector3D from '@/library/3d-elements/vector3d'
import Rotate from '@/library/3d-transforms/rotate'
import DominoFrame from '@/library/domino-stuffs/dominoframe'
import Domino from '@/library/domino-stuffs/domino'

import { ref, watch } from 'vue'

import ViewPlate from '@/components/ViewPlate.vue'
import Vector3DInput from '@/components/Vector3DInput.vue'
import RotateInput from '@/components/RotateInput.vue'
import Vector3DLabel from '@/components/Vector3DLabel.vue'

import { useCamera } from '@/composables/useCamera'
import { useInterval } from '@/composables/useInterval'

const tick = ref(0)

const frame = new DominoFrame(5, 2, 10, 100)
const dominos = ref([])

const rc = Rotate(new Vector3D(0, 0, 1), 0)

const point = ref(new Vector3D(0, 1, 6))
const force = ref(new Vector3D(0, -20, 0))

const v = ref(new Vector3D(0, 0, 0))
const angle = ref(0)
const axis = ref(new Vector3D(0, 0, 1))

let domino = new Domino(frame, new Vector3D(0, 0, 5), rc, v.value, rc)
dominos.value.push(domino)

const { Play, Pause, isActive } = useInterval(50, () => {
  for (let domino of dominos.value) {
    domino.Move()
  }
  tick.value++
})

const Force = () => {
  Stop()
  console.log(domino.ConvertForceCoord(point.value, force.value))
  const { acceleration, angularacceleration } = domino.Force(point.value, force.value)
  domino.Accelerate(acceleration)
  domino.AngularAccelerate(Rotate(angularacceleration.axis, angularacceleration.angle))
  v.value = domino.velocity
  axis.value = angularacceleration.axis
  angle.value = angularacceleration.angle
  Play()
}

const Stop = () => {
  Pause()
  domino.position = new Vector3D(0, 0, 5)
  domino.rotation = rc.copy()
  domino.velocity = new Vector3D(0, 0, 0)
  domino.angularvelocity = rc.copy()
  tick.value++
}

const { projection } = useCamera(new Vector3D(40, 40, 40), new Vector3D(-1, -1, -1), new Vector3D(0, 0, 1), Math.PI / 8, 200)
</script>

<template>
  <div>
    <h3> DominoForced </h3>
    <ViewPlate :width="200" :height="200" :tick="tick" :dominos="dominos" :projection="projection" />
    <div>
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