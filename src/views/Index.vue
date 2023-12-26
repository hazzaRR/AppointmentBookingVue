<template>
  
<div class="bg-white dark:bg-inherit">
    <div class="flex justify-center">

        <div class="flex items-center w-full max-w-md px-6 mx-auto">
            <div class="flex-1">
                <div class="text-center">
                    <div class="flex justify-center mx-auto">
                        <!-- <img class="w-auto h-7 sm:h-8" src="https://merakiui.com/images/logo.svg" alt=""> -->
                        <h1 class="w-auto h-7 sm:h-8 text-3xl font-black">
                        The Beauty Room
                        </h1>
                    </div>

                    <p class="mt-3 text-gray-500 dark:text-gray-300">Sign in to access your account</p>
                </div>

                <div class="mt-8">
                        <div>
                            <label for="username" class="block mb-2 text-sm text-gray-600 dark:text-gray-200">Username</label>
                            <input v-model="loginDetails.username" type="text" name="username" id="username" placeholder="username" class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                        </div>

                        <div class="mt-6">
                            <div class="flex justify-between mb-2">
                                <label for="password" class="text-sm text-gray-600 dark:text-gray-200">Password</label>
                                <!-- <a href="#" class="text-sm text-gray-400 focus:text-blue-500 hover:text-blue-500 hover:underline">Forgot password?</a> -->
                            </div>

                            <input v-model="loginDetails.password" type="password" name="password" id="password" placeholder="Your Password" class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                        </div>

                        <div class="mt-6">
                            <button @click="login" class="w-full px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                                Sign in
                            </button>
                        </div>

                    <!-- <p class="mt-6 text-sm text-center text-gray-400">Don&#x27;t have an account yet? <a href="#" class="text-blue-500 focus:outline-none focus:underline hover:underline">Sign up</a>.</p> -->
                </div>
            </div>
        </div>
    </div>
</div>
  
  
</template>

<script setup>

import { ref } from "vue";
import { BASE_URL } from "../config"; //
import {useAuthStore} from '../stores/auth';




const loginDetails = ref({
    username: '',
    password: ''
})


const login = async () => {

    useAuthStore().login(loginDetails.value.username, loginDetails.value.password)
}
  
  
</script>