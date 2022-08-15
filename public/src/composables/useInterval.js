import { ref, unref, isRef } from 'vue';

export function useInterval(interval, callback) {
    const timerId = ref(null);
    const isActive = ref(false);

    const Play = () => {
        if (!isActive.value) {
            timerId.value = setInterval(unref(callback), unref(interval));
            isActive.value = true;
        }
    };

    const Pause = () => {
        if (isActive.value) {
            clearInterval(timerId.value);
            isActive.value = false;
        }
    };

    return { Play, Pause, isActive };
}