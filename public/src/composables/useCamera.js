import { ref, isRef, unref, watchEffect } from 'vue'

import PerspectiveCamera from '../library/camera/perspectivecamera';

export function useCamera(position, lookDirection, upDirection, horizontalAngle, viewboxWidth) {
    const camera = new PerspectiveCamera(null, null, null, null, null);
    const projection = ref(null);
    const properUpdirection = ref(null)

    function moveCamera() {
        camera.position = unref(position);
        camera.lookdirection = unref(lookDirection);
        properUpdirection.value = camera.GetProperUpdirection(unref(upDirection));
        camera.updirection = properUpdirection.value
        camera.horizontalangle = unref(horizontalAngle);
        camera.viewboxwidth = unref(viewboxWidth);

        console.log(camera)
        console.log(camera.GetProjectionTransform())

        projection.value = camera.GetProjectionTransform();
    }

    if (isRef(position) || isRef(lookDirection) || isRef(upDirection) || isRef(horizontalAngle) || isRef(viewboxWidth)) {
        watchEffect(moveCamera);
    }
    else {
        moveCamera();
    }

    return { projection, properUpdirection };
}