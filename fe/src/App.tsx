import { defineComponent, Transition } from 'vue'
import { RouterView } from "vue-router"

export const App = defineComponent({
    setup() {
        return () => {
            return <>
                <RouterView>{
                    ({Component}) => {
                        return (
                        <Transition
                            enterActiveClass='ease-in-out duration-150 transition-opacity'
                            leaveActiveClass='ease-in-out duration-150 transition-opacity'
                            enterFromClass='opacity-0'
                            leaveToClass='opacity-0'
                            mode="out-in"
                        >
                            { Component }
                        </Transition>)
                    }      
                }</RouterView>
            </>
        }
    }
})