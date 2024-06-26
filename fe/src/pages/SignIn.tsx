import {defineComponent, reactive, ref, toRaw} from 'vue';
import { http } from '../shared/http';

import MainImage from '../assets/sign_in/main.png';
import { validate, emailReg } from '../shared/validate';

export const SignIn = defineComponent({
    setup() {
        const refFormData = reactive({
            email: '',
            code: ''
        });        
        const refErrors = reactive<string[]>([]);
        const refSendCode = ref(false);
        const refHasSendCode = ref(false); 
        const refTimer = ref(0);
        const refInterval = ref(0);

        const validateEmail = () => {
            const formData = toRaw(refFormData);
            const errors = validate(formData, [
                { key: 'email', message: 'Email is required', type: 'required' },
                { key: 'email', message: 'Please enter valid email !', type: 'pattern', pattern: emailReg }
            ]);

            if (errors.email?.length) {
                refErrors.splice(0, refErrors.length);
                errors.email.map((error) => {
                    refErrors.push(error);
                })                        
                return;
            }
            
            refErrors.splice(0, refErrors.length);
            return;
        }

        const startTimer = () => {
            refTimer.value = 60;
            clearInterval(refInterval.value);
            refInterval.value = setInterval(() => {
                refTimer.value--;
                if (refTimer.value <= 0) {
                    clearInterval(refInterval.value);
                }
            }, 1000);
        }

        const sendCode = async () => {
            if (refTimer.value > 0) return;
            const formData = toRaw(refFormData);
            const data = await http.post('/validation_codes', formData);
            const jwt = data.headers.jwt;      
            startTimer();
            refHasSendCode.value = true;
        }

        const validateCode = () => {
            const formData = toRaw(refFormData);
            const errors = validate(formData, [
                { key: 'code', message: 'Code is required', type: 'required' },
                { key: 'code', message: 'Code must be 6 digits', type: 'pattern', pattern: /^\d{6}$/ }
            ]);

            if (errors.code?.length) {
                refErrors.splice(0, refErrors.length);
                errors.code.map((error) => {
                    refErrors.push(error);
                })                        
                return;
            }
            
            refErrors.splice(0, refErrors.length);
            return;
        }

        const confirm = async () => {
            validateEmail();
            if (refErrors.length) return;
            refSendCode.value = true;
            if (!refHasSendCode.value) {
                await sendCode();
                return;           
            }
            validateCode();
            if (refErrors.length) return;
            const formData = toRaw(refFormData);
            await http.post('/sessions', formData);
        }

        return () => (
            <div class="flex flex-col justify-between min-h-dvh py-8 px-6 bg-neutral-100">
                <section>
                    <div>
                        <div class="flex items-center mb-0.5">
                            <div class="font-bold text-lg text-black mr-1">
                                Login
                            </div>
                            <svg class="svg-icon text-neutral-100">
                                <use xlinkHref='#sign_in/user_icon.svg'></use>
                            </svg>
                        </div>

                        <div class="text-sm text-main-gray">
                            welcome back                        
                        </div>
                    </div>

                    <div class="my-10">
                        <div class="relative">
                            <div class="w-full h-0 pt-[78%]" />
                            <img src={MainImage} class="absolute top-0 left-0" />
                        </div>
                        <div class="text-main-yellow text-center mt-4 font-bold">
                            Enter Your { refSendCode.value ? 'Code' : 'Email' }
                        </div>
                    </div>

                    <section class="mb-10">
                        <div class="flex items-center rounded-lg ring-inset ring-gray-300 focus-within:ring-1 focus-within:ring-inset focus-within:ring-main-yellow bg-white p-2 mb-3">
                            <input v-model={refFormData.email} type="email" name="email" id="email" autocomplete="email" class="text-sm block flex-1 border-0 bg-white py-1.5 pl-1 text-black placeholder:text-main-gray focus-visible:outline-none autofill:shadow-big-inner" placeholder="Enter Email" />
                        </div>
                        
                        {
                            refSendCode.value ? (
                                <div class="flex rounded-lg ring-inset ring-gray-300 focus-within:ring-1 focus-within:ring-inset focus-within:ring-main-yellow bg-white p-2 mb-3">
                                    <input v-model={refFormData.code} type="tel" maxlength="6" class="text-sm block flex-1 border-0 bg-white py-1.5 pl-1 text-black placeholder:text-main-gray focus-visible:outline-none autofill:shadow-big-inner" placeholder="Enter Code" />
                                    <div class="flex items-center">
                                        <div class="text-xs pr-1 font-bold" onClick={sendCode}>
                                            {
                                                refTimer.value <= 0 ? (
                                                    'Resend'
                                                ) : (
                                                    refTimer.value
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>
                            ) : null
                        }

                        <div class="text-xs text-main-yellow">
                            {
                                refErrors.join(', ')
                            }
                        </div>
                    </section>
                    
                </section>

                <section>
                    <button onClick={confirm} class="w-full rounded-xl bg-main-yellow py-3 text-white font-bold text-center text-base">
                        Login
                    </button>
                    
                    <div class="flex justify-center items-center my-10 px-6">
                        <div class="h-px w-1/2 bg-main-gray scale-y-50 opacity-40" />
                        <div class="text-xs text-main-gray mx-10">Or</div>
                        <div class="h-px w-1/2 bg-main-gray scale-y-50 opacity-40" />
                    </div>

                    <div class="text-center text-main-gray text-xs">
                        <span class="opacity-60">You Don’t have an account ? </span><span class="font-bold">Sign up</span>
                    </div>
                </section>
            </div>
        )
    }
})