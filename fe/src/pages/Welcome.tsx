import {defineComponent} from 'vue';

import Img from '../assets/welcome/welcome_page_01.png';

export const Welcome = defineComponent({
    setup() {
        return () => <>
            <div class="flex justify-between flex-col min-h-dvh py-8 bg-white">
                <main class="px-2.5">
                    <div class="relative">
                        <div class="w-full h-0 pt-[122%]" />
                        <img src={Img} class="absolute top-0 left-0" />
                    </div>

                    <div class="text-xl text-center py-5 font-bold">
                        Welcome
                    </div>

                    <div class="text-sm	text-center">
                        Done is more important than perfect.
                    </div>
                </main>

                <section class="flex px-6 juestify-between mt-9">
                    <button class="mr-4 flex-1 bg-main-yellow text-center py-4 rounded-lg text-white font-bold">
                        Sign In
                    </button>

                    <button class="flex-1 text-center py-4 font-bold text-black">
                        Get Started
                    </button>
                </section>
            </div>
        </>
    }
});