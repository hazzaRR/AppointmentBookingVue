<template>
    <div>

        <form method="dialog">
                    <h3 class="text-lg font-medium leading-6 text-gray-800 capitalize dark:text-white" id="modal-title">
                        Update Client information
                    </h3>

                        <label for="firstname" class="text-sm text-gray-700 dark:text-gray-200">
                            Firstname
                        </label>

                        <label class="block mt-3" for="firstname">
                            <input type="text" name="firstname" id="trefirstnameatment" placeholder="pedicure..." v-model="selectedClient.firstname" class="block w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300" />
                        </label>

                        <label for="surname" class="text-sm text-gray-700 dark:text-gray-200">
                            Surname
                        </label>

                        <label class="block mt-3" for="surname">
                            <input type="text" name="surname" id="surname" placeholder="£25.00" v-model="selectedClient.surname" class="block w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300" />
                        </label>

                        <label for="email" class="text-sm text-gray-700 dark:text-gray-200">
                            email
                        </label>

                        <label class="block mt-3" for="email">
                            <input type="email" name="email" id="email" placeholder="30" v-model="selectedClient.email" class="block w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300" />
                        </label>

                        <label for="telephone" class="text-sm text-gray-700 dark:text-gray-200">
                            Telephone
                        </label>

                        <label class="block mt-3" for="telephone">
                            <input type="text" name="telephone" id="telephone" placeholder="30" v-model="selectedClient.telephone" class="block w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300" />
                        </label>


                        <div class="mt-4 sm:flex sm:items-center sm:-mx-2">
                            <button class="w-full px-4 py-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:w-1/2 sm:mx-2 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40">
                                Cancel
                            </button>

                            <button @click="editClient(props.selectedClient)" class="w-full px-4 py-2 mt-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md sm:mt-0 sm:w-1/2 sm:mx-2 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40">
                                Update
                            </button>
                        </div>
      </form>

    </div>
</template>

<script setup>
import { editClient } from '../composables/client';

const props = defineProps(['selectedClient'])

</script>

<style lang="scss" scoped>

</style>