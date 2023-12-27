<template>
  
  <div class="navbar relative bg-white shadow dark:bg-gray-800">
  <div class="flex-1">
    <router-link to="/">
                    <!-- <img class="w-auto h-6 sm:h-7" src="https://merakiui.com/images/full-logo.svg" alt=""> -->
                    <h1 class="w-auto h-6 sm:h-7 text-xl font-black">
                        The Beauty Room
                    </h1>
                </router-link>
  </div>
  <div class="flex-none">
    <ul class="menu-horizontal px-1">
    <li class="my-2 text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 mx-2 lg:mx-4 md:my-0" v-for="(link, index) in links" :key="index"><router-link :to="link.link">{{ link.name }}</router-link></li>
    </ul>
    <div class="dropdown dropdown-end">
      <div v-if="isLoggedIn">
        <label tabindex="0" class="btn btn-ghost btn-circle avatar">
        </label>
        <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
          <li v-for="(tool, index) in tools" :key="index"><router-link :to="tool.link">{{tool.name}}</router-link></li>
          <li @click="logout"><p>Logout</p></li>
        </ul>
      </div>
      <router-link v-else to="/auth/login" class="px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">Login</router-link>
    </div>
  </div>
</div>

</template>

<script setup>

const props = defineProps(['links', "tools"]);
import {useAuthStore} from '../stores/auth';
import {computed} from 'vue';

const auth = useAuthStore();


const isLoggedIn = computed(() => {
  return auth.username? true: false
});

const logout = () => {
  useAuthStore().logout();
}

</script>

<style lang="scss" scoped>

</style>