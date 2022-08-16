import { ref, isRef, unref, watchEffect } from 'vue'

import PerspectiveCamera from '../library/camera/perspectivecamera';

export function useCamera(position, lookDirection, upDirection, horizontalAngle, viewboxWidth) {
    console.log('a')
    const camera = new PerspectiveCamera(null, null, null, null, null);
    console.log('b')
    const projection = ref(null);
    console.log('c')
    const properUpdirection = ref(null);
    console.log('d')

    function moveCamera() {
        console.log('e')
        camera.position = unref(position);
        console.log('f')
        camera.lookdirection = unref(lookDirection);
        console.log('g')
        properUpdirection.value = camera.GetProperUpdirection(unref(upDirection));
        console.log('h')
        camera.updirection = properUpdirection.value
        console.log('i')
        camera.horizontalangle = unref(horizontalAngle);
        console.log('j')
        camera.viewboxwidth = unref(viewboxWidth);

        console.log(camera)
        console.log(camera.GetProjectionTransform())

        projection.value = camera.GetProjectionTransform();
    }

    console.log('k')
    if (isRef(position) || isRef(lookDirection) || isRef(upDirection) || isRef(horizontalAngle) || isRef(viewboxWidth)) {
        console.log('l')
        watchEffect(moveCamera);
    }
    else {
        console.log('m')
        moveCamera();
    }
    console.log('n')

    return { projection, properUpdirection };
}