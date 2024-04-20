import {defineComponent, Transition, ref} from 'vue';

export const SignIn = defineComponent({
    setup() {
        const show = ref(false);
        const onSHow = () => {
            show.value = !show.value
        }
        return () => (
            <div>
                sign in
                <button onClick={onSHow}>
                    button
                </button>

                <Transition name="fade" mode="out-in">
                    <div key={show.value ? '1' : 2} style={{
                        display: show.value ? 'block' : 'none'
                    }}>
                        123
                    </div>
                </Transition>
            </div>
        )
    }
})