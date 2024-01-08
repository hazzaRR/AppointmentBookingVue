<template>
    <div>
        <form method="dialog">
                    <h3 class="text-lg font-medium leading-6 text-gray-800 capitalize dark:text-white" id="modal-title">
                        Create Treatment
                    </h3>

                        <label for="name" class="text-sm text-gray-700 dark:text-gray-200">
                            Name
                        </label>

                        <label class="block mt-3" for="name">
                            <input type="text" name="name" id="name" placeholder="Pedicure" v-model="treatmentDetails.treatmentName" class="block w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300" />
                        </label>

                        <label for="price" class="text-sm text-gray-700 dark:text-gray-200">
                            Price
                        </label>

                        <label class="block mt-3" for="price">
                            <input type="number" name="price" id="price" step="any" min="0" placeholder="£30.50" v-model="treatmentDetails.price" class="block w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300" />
                        </label>

                        <label for="duration" class="text-sm text-gray-700 dark:text-gray-200">
                            Duration
                        </label>

                        <label class="block mt-3" for="duration">
                            <input type="number" name="duration" id="duration" placeholder="30" v-model="treatmentDetails.durationMinutes" class="block w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300" />
                        </label>

                        <div class="mt-4 sm:flex sm:items-center sm:-mx-2">
                            <button class="w-full px-4 py-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:w-1/2 sm:mx-2 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40">
                                Cancel
                            </button>

                            <button @click="AddTreatment" class="w-full px-4 py-2 mt-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md sm:mt-0 sm:w-1/2 sm:mx-2 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40">
                                Create
                            </button>
                        </div>
      </form>

    </div>
</template>

<script setup>
import {createTreatment} from '../composables/treatment';
import {ref} from 'vue';

const treatmentDetails = ref({treatmentName: null, price: null, durationMinutes: null});


const AddTreatment = async () => {
        await createTreatment(treatmentDetails.value);
        // treatments.value = await fetchTreatments();
        treatmentDetails.value = {treatmentName: null, price: null, durationMinutes: null};
    }



</script>

<style lang="scss" scoped>

</style>