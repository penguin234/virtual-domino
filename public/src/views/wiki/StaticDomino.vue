<script setup>
import Vector3D from '@/library/3d-elements/vector3d'
import Rotate from '@/library/3d-transforms/rotate'
import DominoFrame from '@/library/domino-stuffs/dominoframe'
import Domino from '@/library/domino-stuffs/domino'

import ViewPlate from '@/components/ViewPlate.vue'

import { useCamera } from '@/composables/useCamera'

const frame = new DominoFrame(5, 2, 10, 1)
const dominos = []

const domino = new Domino(frame, new Vector3D(0, 0, 5), Rotate(new Vector3D(0, 0, 1), 0), new Vector3D(0, 0, 0), Rotate(new Vector3D(0, 0, 1), 0));
dominos.push(domino)

const { projection } = useCamera(new Vector3D(40, 40, 40), new Vector3D(-1, -1, -1), new Vector3D(0, 0, 1), Math.PI / 8, 200)
</script>

<template>
  <div>
    <h3> Domino </h3>
    <ViewPlate :width="200" :height="200" :dominos="dominos" :projection="projection" />
  </div>
</template>