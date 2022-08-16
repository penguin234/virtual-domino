<script setup>
console.log('a-4')
import { ref, watch } from 'vue'

console.log('a-3')
import Vector3D from '@/library/3d-elements/vector3d'

console.log('a-2')
import Vector3DInput from '@/components/Vector3DInput.vue'

console.log('a-1')
import { useCamera } from '@/composables/useCamera'

console.log('a1')
const props = defineProps({
    position: {
        type: Object,
        default: new Vector3D(0, 0, 0)
    },
    lookdirection: {
        type: Object,
        default: new Vector3D(1, 0, 0)
    },
    updirection: {
        type: Object,
        default: new Vector3D(0, 0, 1)
    },
    horizontalangle: {
        type: Number,
        default: Math.PI / 8
    },
    viewboxwidth: {
        type: Number,
        required: true
    }
})
console.log('a2')
const emit = defineEmits(['update:modelValue'])
console.log('a3')

const position = ref(props.position)
const lookdirection = ref(props.lookdirection)
const updirection = ref(props.updirection)
const horizontalangle = ref(props.horizontalangle)
const viewboxwidth = ref(props.viewboxwidth)

console.log('position', position.value)
console.log('lookdirection', lookdirection.value)
console.log('updirection', updirection.value)
console.log('horizontalangle', horizontalangle.value)
console.log('viewboxwidth', viewboxwidth.value)

const { projection, properUpdirection } = useCamera(position, lookdirection, updirection, horizontalangle, viewboxwidth)

emit('update:modelValue', projection.value)
watch(projection, (value) => {
    emit('update:modelValue', projection.value)
})
</script>

<template>
    <div>
        <Vector3DInput name="position" v-model="position" :minX="-100" :maxX="100" :minY="-100" :maxY="100" :minZ="-100" :maxZ="100" />
        <Vector3DInput name="lookdirection" v-model="lookdirection" :minX="-10" :maxX="10" :minY="-10" :maxY="10" :minZ="-10" :maxZ="10" :step="0.1" />
        <Vector3DInput name="updirection" v-model="updirection" :minX="-10" :maxX="10" :minY="-10" :maxY="10" :minZ="-10" :maxZ="10" :step="0.1" />
        <div>
            <span> Angle: </span>
            <input type="range" v-model.number="horizontalangle" :min="Math.PI / 100" :max="Math.PI * 49 / 100" :step="Math.PI / 100" />
        </div>
    </div>
</template>