import { ref, Ref, computed, onMounted, onUnmounted } from "vue";

type Point = { x: number, y: number };

export const useSwipe = (element: Ref<HTMLElement | null>) => {
    const start = ref<Point | null>(null)
    const end = ref<Point | null>(null)
    const swiping = ref(false)
    const distance = computed(() => {
        if (!start.value || !end.value) return null;
        return {
            x: end.value.x - start.value.x,
            y: end.value.y - start.value.y
        }
    })
    const direction = computed(() => {
        if (!distance.value) return null;
        const {x, y} = distance.value
        if (Math.abs(x) > Math.abs(y)) {
            return x > 0 ? 'right' : 'left'
        } else {
            return y > 0 ? 'down' : 'up'
        }
    })

    const onStart = (e: TouchEvent) => {
        e.preventDefault();
        start.value = {
            x: e.touches[0].clientX,
            y: e.touches[0].clientY
        }

        end.value = null;
        swiping.value = true; 
    }

    const onMove = (e: TouchEvent) => {
        if (swiping.value) {
            end.value = {
                x: e.touches[0].clientX,
                y: e.touches[0].clientY
            }
        }
    }

    const onEnd = (e: TouchEvent) => {
        swiping.value = false;
    }

    onMounted(() => {
        if (!element.value) return;
        element.value.addEventListener('touchstart', onStart)
        element.value.addEventListener('touchmove', onMove)
        element.value.addEventListener('touchend', onEnd)
    })

    onUnmounted(() => {
        if (!element.value) return;
        element.value.removeEventListener('touchstart', onStart)
        element.value.removeEventListener('touchmove', onMove)
        element.value.removeEventListener('touchend', onEnd)
    })

    return {
        swiping,
        distance,
        direction
    }
}