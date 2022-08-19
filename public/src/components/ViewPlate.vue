<script setup>
import { reactive, computed, watch, watchEffect, onMounted } from 'vue'

import RenderMachine from '@/library/render-system/render'
import VectorFigure from '@/library/assistant-stuffs/vectorfigure'

const props = defineProps({
    tick: {
        type: Number,
        default: 0
    },
    dominos: {
        type: Array,
        default: []
    },
    vectors: {
        type: Array,
        default: []
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
    surfaces: []
})

const rendermachine = new RenderMachine(props.projection)

function render() {
    if (!props.projection) {
        return
    }
    rendermachine.SetCamera(props.projection)
    figure.surfaces = []
    for (const domino of props.dominos) {
        for (const rect of rendermachine.RenderFigure(domino.GetFigure())) {
            figure.surfaces.push({...rect, fill: 'green'})
        }
    }
    for (const vector of props.vectors) {
        let vectorfigure = new VectorFigure(vector.point, vector.vector, 1);
        for (const surface of rendermachine.RenderFigure(vectorfigure.GetFigure())) {
            figure.surfaces.push({...surface, fill: 'orange'})
        }
    }
}

function mergePoints(points) {
    let res = ''
    for (const point of points) {
        res += String(point.x) + ',' + String(point.y) + ' '
    }
    res = res.slice(0, -2)
    return res
}

watchEffect(() => {
    props.projection
    props.tick
    render()
})

const surfacessordered = computed(() => {
    const res = figure.surfaces.filter(() => true);
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
    //render()
})
</script>

<template>
    <svg :width="width" :height="height" :view-box.camel="viewbox" style="outline: 2px solid red;">
        <template v-for="surface in surfacessordered">
            <polygon :fill="surface.fill" style="stroke:black;stroke-width:0.3" :points="mergePoints(surface.points)" />
        </template>
    </svg>
</template>