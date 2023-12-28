<template>
  
  <div class="navbar relative bg-white shadow dark:bg-gray-800">
  <div class="flex-1">
    <router-link to="/dashboard">
                    <h1 class="w-auto h-6 sm:h-7 text-xl font-black">
                        The Beauty Room
                    </h1>
                </router-link>
  </div>
  <div v-if="isLoggedIn" class="flex-none">
    <ul class="menu-horizontal px-1">
    <li class="my-2 text-gray-700 transition-colors duration-300 transform dark:text-gray-200 mx-2 lg:mx-4 md:my-0">{{ greeting }}</li>
    </ul>
    <div class="dropdown dropdown-end">
      <div>

        <button class="btn btn-square btn-ghost">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
    </button>
        <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
          <li v-for="(tool, index) in tools" :key="index"><router-link :to="tool.link">{{tool.name}}</router-link></li>
          <li @click="logout"><p>Logout</p></li>
        </ul>
      </div>
    </div>
  </div>
</div>

</template>

<script setup>

const props = defineProps(["tools"]);
import {useAuthStore} from '../stores/auth';
import {computed} from 'vue';

const auth = useAuthStore();


const isLoggedIn = computed(() => {
  return auth.username? true: false
});

const greeting = computed(() => {
  const hours = new Date().getHours();

    if (hours < 12) {
      return `Good morning`;
    } else if (hours < 18) {
      return `Good afternoon`;
    } else {
      return `Good evening`;
    }
});

const logout = () => {
  useAuthStore().logout();
}

</script>

<style lang="scss" scoped>

</style>