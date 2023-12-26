<template>
  <footer class="bg-white dark:bg-gray-800 shadow">
    <div class="container flex flex-col items-center justify-between p-6 mx-auto space-y-4 sm:space-y-0 sm:flex-row">
        <router-link to="/">
                    <h1 class="w-auto h-6 sm:h-7 text-xl font-black">
                        Re(a)dman
                    </h1>
        </router-link>

        <!-- <p class="text-sm text-gray-600 dark:text-gray-300">© Copyright 2023. Created by Harry Redman.</p> -->
        <p class="text-sm text-gray-600 dark:text-gray-300">© 2023. Created by Harry Redman.</p>

        <div class="flex -mx-2">

            <a href="https://www.linkedin.com/in/harryredman/" class="mx-2 text-gray-600 transition-colors duration-300 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400" aria-label="Linkedin">
                <i class="devicon-linkedin-plain text-xl"></i>
            </a>
            
            <a href="https://github.com/hazzaRR" class="mx-2 text-gray-600 transition-colors duration-300 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400" aria-label="Github">
                <i class="devicon-github-original text-xl"></i>
            </a>
        </div>
    </div>
    </footer>
</template>
  
<script setup>
  
</script>