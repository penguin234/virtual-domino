import { ref, unref, isRef } from 'vue';

export function useInterval(interval, callback) {
    const timerId = ref(null);
    const isActive = ref(false);

    function Interval() {
        unref(callback)();
        timerId.value = setTimeout(Interval, unref(interval));
    }

    const Play = () => {
        if (!isActive.value) {
            Interval();
            isActive.value = true;
        }
    };

    const Pause = () => {
        if (isActive.value) {
            clearTimeout(timerId.value);
            isActive.value = false;
        }
    };

    return { Play, Pause, isActive };
}