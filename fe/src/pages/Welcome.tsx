import { TransitionGroup, defineComponent, ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';

import Img01 from '../assets/welcome/welcome_page_01.png';
import Img02 from '../assets/welcome/welcome_page_02.png';
import Img03 from '../assets/welcome/welcome_page_03.png';
import { useSwipe } from '../hooks/useSwipe';

export const Welcome = defineComponent({
    setup() {
        // sign in
        const router = useRouter();
        const toSignIn = () => {
            router.push('/sign-in');
        };

        // slide show
        const refImgs = ref([
            Img01,
            Img02,
            Img03
        ]);
        const refCurImgIndex = ref(0);
        const refImgsWrapper = ref<HTMLElement | null>(null);
        const {swiping, direction, distance} = useSwipe(refImgsWrapper);
        watchEffect(() => {            
            if (!direction.value || !distance.value) return;
            if (!swiping.value && direction.value === 'left' && Math.abs(distance.value.x) > (screen.width/2)) {
                refCurImgIndex.value++;
            }

            if (!swiping.value && direction.value === 'right' && Math.abs(distance.value.x) > (screen.width/2)) {
                refCurImgIndex.value--;
            }  
        })

        return () => (
            <div class="flex justify-between flex-col min-h-dvh py-8 bg-neutral-100">
                <main class="px-2.5">
                    <div ref={refImgsWrapper} class="relative overflow-hidden">
                        {
                            refImgs.value.map((img, index) => {
                                return (
                                    <TransitionGroup
                                        enterActiveClass='ease-in-out duration-300 transition-translate'
                                        leaveActiveClass='ease-in-out duration-300 transition-translate !absolute top-0'
                                        enterFromClass={direction.value === "left" ? "translate-x-[100vw]" : "-translate-x-[100vw]"}
                                        leaveToClass={direction.value === "left" ? "-translate-x-[100vw]" : "translate-x-[100vw]"}
                                     >
                                        {
                                            index === Math.abs(refCurImgIndex.value % refImgs.value.length)
                                            ? <div
                                                class={{
                                                    'w-full': true,
                                                    relative: true
                                                }}
                                                key={index}
                                            >
                                                <div class="w-full h-0 pt-[122%]" />
                                                <img
                                                    src={img}
                                                    class="absolute top-0 left-0 w-full"
                                                />
                                            </div>
                                            : null
                                        }
                                    </TransitionGroup>
                                )
                            })
                        }
                    </div>

                    <div class="text-xl text-center py-5 font-bold">
                        Welcome
                    </div>

                    <div class="text-sm	text-center">
                        Done is more important than perfect.
                    </div>

                    <div class="flex justify-center items-center py-9">
                        {
                            refImgs.value.map((img, index) => {
                                const isCurrent = index === Math.abs(refCurImgIndex.value % refImgs.value.length);
                                return (
                                    <div
                                        class={{
                                            'w-2 h-2 mr-2 rounded-full': true,
                                            'bg-main-yellow': isCurrent,
                                            'bg-main-gray': !isCurrent
                                        }}
                                        key={index}
                                    />
                                )
                            })
                        }
                    </div>
                </main>

                <section class="flex px-6 juestify-between mt-9">
                    <button onClick={toSignIn} class="mr-4 flex-1 bg-main-yellow text-center py-4 rounded-lg text-white font-bold">
                        Sign In
                    </button>

                    <button class="flex-1 text-center py-4 font-bold text-black">
                        Get Started
                    </button>
                </section>
            </div>
        )
    }
});