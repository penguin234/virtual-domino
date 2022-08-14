import { ref, unref, isRef } from 'vue';

export function useInterval(interval, callback) {
    const timerId = ref(null);

    const Play = () => {
        if (timerId.value) {
            clearInterval(timerId.value);
        }
        timerId.value = setInterval(unref(callback), unref(interval));
    };

    const Pause = () => {
        clearInterval(timerId.value);
    };

    return { Play, Pause };
}