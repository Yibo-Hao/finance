import { ref, Ref, computed, onMounted } from "vue";

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

    onMounted(() => {
        element.value?.addEventListener('touchstart', e => {
            start.value = {
                x: e.touches[0].clientX,
                y: e.touches[0].clientY
            }

            end.value = null;
            swiping.value = true; 
        })

        element.value?.addEventListener('touchmove', e => {
            if (swiping.value) {
                end.value = {
                    x: e.touches[0].clientX,
                    y: e.touches[0].clientY
                }
            }
        })

        element.value?.addEventListener('touchend', e => {
            swiping.value = false;
        })
    })

    return {
        swiping,
        distance,
        direction
    }
}