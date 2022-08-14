<script setup>
import { ref, watchEffect } from 'vue'

const props = defineProps({
    name: {
        type: String
    },
    vector: {
        type: Object,
        required: true
    }
})

const X = ref(props.vector.x)
const Y = ref(props.vector.y)
const Z = ref(props.vector.z)

watchEffect(() => {
    X.value = props.vector.x
    Y.value = props.vector.y
    Z.value = props.vector.z
})
</script>

<template>
    <p> <span v-if="name"> {{ name }}: </span> ({{ X }}, {{ Y }}, {{ Z }}) </p>
</template>