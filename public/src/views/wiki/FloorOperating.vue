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

const frame = new DominoFrame(5, 2, 10, 100)
const dominos = ref([])

const rc = Rotate(new Vector3D(0, 0, 1), 0)

const v = ref(new Vector3D(0, 0, 0))
const angle = ref(0)
const axis = ref(new Vector3D(0, 0, 1))

const gravity = ref(0.001)
const gravityAcceleration = computed(() => new Vector3D(0, 0, gravity.value * -1))

let dominosystem = new DominoSystem();

const initialangle = ref(0)
const initialheight = ref(0)

const norm = new Vector3D(0, 0, 1)
const colp = ref(null)
const colv = ref(null)
const drag = ref(null)

const InitialRotation = computed(() => {
  return Rotate(new Vector3D(1, 0, 0), initialangle.value)
})

const InitialPoint = computed(() => {
  return new Vector3D(0, 0, 5 + initialheight.value)
})


let domino = new Domino(frame, new Vector3D(0, 0, 0), rc, v.value, rc)
dominos.value.push(domino)

const { Play, Pause, isActive } = useInterval(50, () => {
  for (let domino of dominos.value) {
    let { acceleration, angularacceleration } = domino.Force(domino.position, gravityAcceleration.value.copy().mult(domino.frame.mass))
    domino.Accelerate(acceleration)
    domino.AngularAccelerate(Rotate(angularacceleration.axis, angularacceleration.angle))

    const collision = DominoSystem.CheckFloorCollisions(domino)
    colp.value = collision.point
    colv.value = collision.velocity
    if (collision.point) {
      drag.value = domino.GetAccelerationForce(collision.point, norm, norm.innerProduct(collision.velocity) * -1)
      let { acceleration, angularacceleration } = domino.Force(collision.point, drag.value)
      domino.Accelerate(acceleration)
      domino.AngularAccelerate(Rotate(angularacceleration.axis, angularacceleration.angle))
    }

    domino.Move()
  }
  
  v.value = domino.velocity
  const av = Rotate.GetMetadata(domino.angularvelocity);
  axis.value = av.axis;
  angle.value = av.angle;
  tick.value++
})

const Force = () => {
  Stop()
  v.value = domino.velocity
  const av = Rotate.GetMetadata(domino.angularvelocity);
  axis.value = av.axis;
  angle.value = av.angle;
  Play()
}

const Stop = () => {
  Pause()
  domino.position = InitialPoint.value
  domino.rotation = InitialRotation.value
  domino.velocity = new Vector3D(0, 0, 0)
  domino.angularvelocity = rc.copy()
  tick.value++
}

const { projection } = useCamera(new Vector3D(40, 40, 40), new Vector3D(-1, -1, -1), new Vector3D(0, 0, 1), Math.PI / 8, 200)
</script>

<template>
  <div>
    <h3> FloorOperating </h3>

    <ViewPlate :width="200" :height="200" :tick="tick" :dominos="dominos" :projection="projection" />
    <div>
      <h4> Initial Status </h4>
      Angle : <input type="range" v-model.number="initialangle" :min="Math.PI / -2" :max="Math.PI / 2" :step="Math.PI / 100"> <br>
      Height : <input type="range" v-model.number="initialheight" min="0" max="5" step="0.1"> <br>
      <div>
        <span> Rotation: </span>
        <Vector3DLabel name="axis" :vector="new Vector3D(1, 0, 0)" />
        <span> angle: {{ initialangle }} </span>
      </div>
      <Vector3DLabel name="position" :vector="InitialPoint" />
      <button @click="Force" v-if="!isActive"> Force </button>
      <button @click="Stop" v-if="isActive"> Stop </button>
    </div>

    <div>
      <h4> Gravity </h4>
      Size : <input type="range" v-model.number="gravity" min="0" max="0.01" step="0.0001"> <br>
      <Vector3DLabel name="acceleration" :vector="gravityAcceleration" />
    </div>
    
    <div>
      <h4> Velocity </h4> 
      <Vector3DLabel name="velocity" :vector="v" />
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

      <div>
        <h4> CollisionInfo </h4>
        <template v-if="colp">
          <Vector3DLabel name="point" :vector="colp" />
          <Vector3DLabel name="velocity" :vector="colv" />
          <Vector3DLabel name="drag" :vector="drag" />
        </template>
        <template v-else>
          No collision
        </template>
      </div>
    </div>
  </div>
</template>