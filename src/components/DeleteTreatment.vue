<template>
    <div>
        <form method="dialog">
                    <div>
                        <div class="flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-gray-700 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                            </svg>
                        </div>
                        
                        <div class="mt-2 text-center">
                            <h3 class="text-lg font-medium leading-6 text-gray-800 capitalize dark:text-white" id="modal-title">Delete Treatment</h3>
                            <h4 class="text-md font-sm leading-6 text-gray-800 capitalize dark:text-white">Treatment: {{selectedTreatment.treatmentName }}</h4>
                            <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                Are you sure you want to delete this treatment?
                            </p>
                        </div>
                    </div>
                    
                    <div class="mt-5 sm:flex sm:items-center sm:justify-center">
                        <div class="sm:flex sm:items-center ">
                            <button class="w-full px-4 py-2 mt-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:mt-0 sm:w-auto sm:mx-2 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40">
                                Cancel
                            </button>
                            
                            <button @click="DeleteTreatment" class="w-full px-4 py-2 mt-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md sm:w-auto sm:mt-0 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40">
                                Delete
                            </button>
                        </div>
                    </div>
            </form>

    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>

</style>