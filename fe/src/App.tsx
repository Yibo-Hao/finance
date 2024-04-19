import { defineComponent } from 'vue'
import { RouterView, RouterLink } from "vue-router"

export const App = defineComponent({
    setup() {
        return () => {
            return <>
                <div>
                    <RouterView></RouterView>

                    <RouterLink to="/">Foo</RouterLink>
                    <RouterLink to="/about">bar</RouterLink>
                </div>
            </>
        }
    }
})