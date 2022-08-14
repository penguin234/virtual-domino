<script setup>
import Vector3D from '@/library/3d-elements/vector3d'
import { ref, watch, watchEffect } from 'vue'
import Vector3DLabel from '@/components/Vector3DLabel.vue'

const props = defineProps({
    name: {
        type: String
    },
    modelValue: {
        type: Object,
        default: new Vector3D(0, 0, 0)
    },
    minX: {
        type: Number,
        default: -10
    },
    maxX: {
        type: Number,
        default: 10
    },
    minY: {
        type: Number,
        default: -10
    },
    maxY: {
        type: Number,
        default: 10
    },
    minZ: {
        type: Number,
        default: -10
    },
    maxZ: {
        type: Number,
        default: 10
    },
    step: {
        type: Number,
        default: 1
    }
})
const emit = defineEmits(['update:modelValue'])

const X = ref(props.modelValue.x)
const Y = ref(props.modelValue.y)
const Z = ref(props.modelValue.z)

watch([X, Y, Z], ([X, Y, Z]) => {
    emit('update:modelValue', new Vector3D(X, Y, Z))
})
watchEffect(() => {
    X.value = props.modelValue.x
    Y.value = props.modelValue.y
    Z.value = props.modelValue.z
})
</script>

<template>
    <div>
        <Vector3DLabel :name="name" :vector="props.modelValue" />

        <label for="X">X: </label>
        <input name="X" type="range" :min="props.minX" :max="props.maxX" :step="props.step" v-model.number="X" />
        <br>

        <label for="Y">Y: </label>
        <input name="Y" type="range" :min="props.minY" :max="props.maxY" :step="props.step" v-model.number="Y" />
        <br>

        <label for="Z">Z: </label>
        <input name="Z" type="range" :min="props.minZ" :max="props.maxZ" :step="props.step" v-model.number="Z" />
        <br>
    </div>
</template>