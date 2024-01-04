<template>
    <div v-if="appointment !== null">
        <form v-if="editModalDisplay === 'editDisplay'" method="dialog">
                    <h3 class="text-lg font-medium leading-6 text-gray-800 capitalize dark:text-white" id="modal-title">
                        Update Appointment
                    </h3>
                    <label for="client" class="text-sm text-gray-700 dark:text-gray-200">
                        Client
                    </label>

                    <label class="block mt-3" for="duration">
                        <p class="block w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300">
                        {{ appointment.client.firstname }} {{ appointment.client.surname }}
                        </p>
                    </label>
                        <label for="name" class="text-sm text-gray-700 dark:text-gray-200">
                            Date
                        </label>

                        <label class="block mt-3" for="name">
                            <input v-model="appointment.appDate" type="date" name="name" id="name" class="block w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300" />
                        </label>

                        <label for="startTime" class="text-sm text-gray-700 dark:text-gray-200">
                            Start time
                        </label>

                        <label class="block mt-3" for="startTime">
                            <input v-model="appointment.startTime" type="time" name="startTime" id="startTime" class="block w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300" />
                        </label>


                        <label for="treatments" class="text-sm text-gray-700 dark:text-gray-200">
                            Treatments
                        </label>

                        <label class="block mt-3" for="startTime">
                            <p class="block w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300">{{ appointment.treatments.map(treatment => treatment.treatmentName).join(', ') }}</p>
                        </label>

                    <div class="flex items-center my-4 gap-x-3 justify-end">
                    <a @click="switchDisplay('treatmentsDisplay')" class="flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600">
                        <span>Select Treatments</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                        </svg>    
                    </a>
                    </div>
                        
                        <label for="endTime" class="text-sm text-gray-700 dark:text-gray-200">
                            End Time
                        </label>

                        <label class="block mt-3" for="endTime">
                            <input v-model="appointment.endTime" type="time" name="endTime" id="endTime" class="block w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300" />
                        </label>

                        <label for="totalPrice" class="text-sm text-gray-700 dark:text-gray-200">
                            Total
                        </label>

                        <label class="block mt-3" for="totalPrice">
                            <input v-model="appointment.totalPrice" type="number" step="any" name="totalPrice" id="totalPrice" class="block w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300" />
                        </label>

                        <div class="mt-4 sm:flex sm:items-center sm:-mx-2">
                            <button class="w-full px-4 py-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:w-1/2 sm:mx-2 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40">
                                Cancel
                            </button>

                            <button  class="w-full px-4 py-2 mt-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md sm:mt-0 sm:w-1/2 sm:mx-2 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40">
                                Create
                            </button>
                            <button class="w-full px-4 py-2 mt-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md sm:mt-0 sm:w-1/2 sm:mx-2 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40">
                                Delete
                            </button>
                        </div>
        </form>
        <TreatmentSelector v-else-if="editModalDisplay === 'treatmentsDisplay'" :selectedTreatments="appointment.treatments" @update:selectedTreatments="appointment.treatments = $event" @confirmSelection="switchDisplay('editDisplay')" />

    </div>
</template>

<script setup>

import {onMounted, ref} from 'vue';
import TreatmentSelector from './TreatmentSelector.vue';


const props = defineProps(['appointmentDetails']);
const appointment = ref(null);
const editModalDisplay = ref('editDisplay');


const switchDisplay = (display) => {
    editModalDisplay.value = display;
};


onMounted(() => {
    console.log(props.appointmentDetails)
    appointment.value = props.appointmentDetails;
})




</script>

<style lang="scss" scoped>

</style>