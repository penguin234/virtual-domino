<script setup>
import Vector3D from '@/library/3d-elements/vector3d'
import Rotate from '@/library/3d-transforms/rotate'
import DominoFrame from '@/library/domino-stuffs/dominoframe'
import Domino from '@/library/domino-stuffs/domino'
import DominoSystem from '@/library/domino-stuffs/dominosystem'

import { ref, computed, watch } from 'vue'

import CameraController from '@/components/CameraController.vue'
import ViewPlate from '@/components/ViewPlate.vue'
import Vector3DInput from '@/components/Vector3DInput.vue'
import RotateInput from '@/components/RotateInput.vue'
import Vector3DLabel from '@/components/Vector3DLabel.vue'

import { useInterval } from '@/composables/useInterval'
import { useCamera } from '@/composables/useCamera'

const tick = ref(0)

const frame = new DominoFrame(8, 2, 20, 100)
const dominos = ref([])

const rc = Rotate(new Vector3D(0, 0, 1), 0)

const v = ref(new Vector3D(0, 0, 0))
const angle = ref(0)
const axis = ref(new Vector3D(0, 0, 1))

const gravity = ref(0.001)
const gravityAcceleration = computed(() => new Vector3D(0, 0, gravity.value * -1))
const norm = new Vector3D(0, 0, 1);

let dominosystem = new DominoSystem();

const vc = new Vector3D(0, 0, 0)

const start = new Vector3D(0, -14, 10)
const diff = new Vector3D(0, 7, 0)
let curr = start.copy()

for (let i = 0; i < 5; i++) {
  let domino = new Domino(frame, curr, rc, vc, rc)
  dominos.value.push(domino)
  curr.add(diff)
}

const { Play, Pause, isActive } = useInterval(50, () => {
  for (let domino of dominos.value) {
    let { acceleration, angularacceleration } = domino.Force(domino.position, gravityAcceleration.value.copy().mult(domino.frame.mass))
    domino.Accelerate(acceleration)
    domino.AngularAccelerate(Rotate(angularacceleration.axis, angularacceleration.angle))
  }

  for (let domino of dominos.value) {
    const collision = DominoSystem.CheckFloorCollisions(domino)
    if (collision.point) {
      let drag = domino.GetAccelerationForce(collision.point, norm, norm.innerProduct(collision.velocity) * -1)
      let { acceleration, angularacceleration } = domino.Force(collision.point, drag)
      domino.Accelerate(acceleration)
      domino.AngularAccelerate(Rotate(angularacceleration.axis, angularacceleration.angle))
    }

    domino.Move()
  }

  tick.value++
})

const Force = () => {
  Stop()
  let domino = dominos.value[0]
  let { acceleration, angularacceleration } = domino.Force(new Vector3D(0, 0, 20), new Vector3D(0, 1, 0))
  domino.Accelerate(acceleration)
  domino.AngularAccelerate(Rotate(angularacceleration.axis, angularacceleration.angle))
  Play()
}

const Stop = () => {
  Pause()
  tick.value++
}

const { projection } = useCamera(new Vector3D(40, 40, 40), new Vector3D(-1, -1, -1), new Vector3D(0, 0, 1), Math.PI / 8, 200)
</script>

<template>
  <div>
    <h3> DominoOperating </h3>

    <ViewPlate :width="200" :height="200" :tick="tick" :dominos="dominos" :projection="projection" />

    <div>
      <button @click="Force" v-if="!isActive"> Force </button>
      <button @click="Stop" v-if="isActive"> Stop </button>
    </div>

    <div>
      <h4> Gravity </h4>
      Size : <input type="range" v-model.number="gravity" min="0" max="0.01" step="0.0001"> <br>
      <Vector3DLabel name="acceleration" :vector="gravityAcceleration" />
    </div>
  </div>
</template>