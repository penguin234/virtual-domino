<script setup>
import Vector3D from '@/library/3d-elements/vector3d'
import Rotate from '@/library/3d-transforms/rotate'
import { ref, watch } from 'vue'

import Vector3DInput from '@/components/Vector3DInput.vue'

const props = defineProps({
    name: {
        type: String
    },
    modelValue: {
        type: Object
    },
    step: {
        type: Number,
        default: 0.01
    }
})
const emit = defineEmits(['update:modelValue'])

const Angle = ref(0)
const Axis = ref(new Vector3D(0, 0, 1))

watch([Axis, Angle], ([axis, angle]) => {
    if (axis.abs() == 0) {
        axis = new Vector3D(0, 0, 1)
        angle = 0
    }
    emit('update:modelValue', Rotate(axis, angle))
})
</script>

<template>
    <div>
        <p> {{ name }}: </p>
        <label for="Angle">Angle: {{ Angle }} </label> <br>
        <input name="Angle" type="range" min="0" :max="Math.PI * 2" :step="props.step" v-model.number="Angle" />
        <Vector3DInput name="Axis" :minX="-1" :maxX="1" :minY="-1" :maxY="1" :minZ="-1" :maxZ="1" :step="props.step" v-model="Axis" />
    </div>
</template>