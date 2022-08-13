<script setup>
import { reactive, computed, onMounted } from 'vue'

import RenderMachine from '@/library/render-system/render'

const props = defineProps({
    dominos: {
        type: Array
    },
    projection: {
        type: Object
    },
    width: {
        type: Number
    },
    height: {
        type: Number
    }
})

const figure = reactive({
    rects: []
})

const rendermachine = new RenderMachine(props.projection)

function render() {
    rendermachine.SetCamera(props.projection)
    figure.rects = []
    for (const domino of props.dominos) {
        for (const rect of rendermachine.RenderFigure(domino.GetFigure())) {
            figure.rects.push(rect)
        }
    }
}

function mergePoints(points) {
    let res = ''
    for (const point of points) {
        res += String(point.x) + ',' + String(point.y) + ' '
    }
    return res
}

const rectsordered = computed(() => {
    const res = figure.rects.filter(() => true);
    res.sort(function(a, b) {
        return b.zorder - a.zorder
    })
    return res;
})

const viewbox = computed(() => {
    const w = props.width
    const h = props.height
    return String(0) + ' ' + String((w - h) / 2) + ' ' + String(w) + ' ' + String((w + h) / 2)
})

onMounted(() => {
    render()
})
</script>

<template>
    <svg :width="width" :height="height" :view-box.camel="viewbox" style="outline: 2px solid red;">
        <template v-for="rect in rectsordered">
            <polygon :points="mergePoints(rect.points)" style="fill:green;stroke:black;stroke-width:1" />
        </template>
    </svg>
</template>