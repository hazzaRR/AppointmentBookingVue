<template>
    <div>
        <form v-if="addModalDisplay === 'addDisplay'" method="dialog">
                    <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    <h3 class="text-lg font-medium leading-6 text-gray-800 capitalize dark:text-white" id="modal-title">
                        Create Appointment
                    </h3>
                        <label for="name" class="text-sm text-gray-700 dark:text-gray-200">
                            Date
                        </label>

                        <label class="block mt-3" for="name">
                            <input v-model="createAppointmentDetails.appDate" type="date" name="name" id="name" class="block w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300" />
                        </label>

                        <label for="startTime" class="text-sm text-gray-700 dark:text-gray-200">
                            Start time
                        </label>

                        <label class="block mt-3" for="startTime">
                            <input v-model="createAppointmentDetails.startTime" type="time" name="startTime" id="startTime" class="block w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300" />
                        </label>

                        <label for="client" class="text-sm text-gray-700 dark:text-gray-200">
                            Client
                        </label>

                        <label class="block mt-3" for="duration">
                            <select v-model="createAppointmentDetails.client" id="duration" class="block w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300">
                                <option v-for="client in props.clients" :key="client.id" :value="client" >{{ client.firstname }} {{ client.surname }}</option>
                            </select>
                        </label>

                        <label for="treatments" class="text-sm text-gray-700 dark:text-gray-200">
                            Treatments
                        </label>

                        <label class="block mt-3" for="startTime">
                            <p class="block w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300">{{ selectedTreatments.map(treatment => treatment.treatmentName).join(', ') }}</p>
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
                            <input v-model="createAppointmentDetails.endTime" type="time" name="endTime" id="endTime" class="block w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300" />
                        </label>

                        <label for="totalPrice" class="text-sm text-gray-700 dark:text-gray-200">
                            Total
                        </label>

                        <label class="block mt-3" for="totalPrice">
                            <input v-model="createAppointmentDetails.totalPrice" type="number" step="any" name="totalPrice" id="totalPrice" class="block w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300" />
                        </label>

                        <div class="mt-4 sm:flex sm:items-center sm:-mx-2">
                            <!-- <button class="w-full px-4 py-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:w-1/2 sm:mx-2 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40">
                                Cancel
                            </button> -->

                            <button @click="addAppointment" class="w-full px-4 py-2 mt-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md sm:mt-0 sm:w-1/2 sm:mx-2 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40">
                                Create
                            </button>
                        </div>
        </form>
        <TreatmentSelector v-else-if="addModalDisplay === 'treatmentsDisplay'" :selectedTreatments="selectedTreatments" @update:selectedTreatments="selectedTreatments = $event" @confirmSelection="switchDisplay('addDisplay')" />

    </div>
</template>

<script setup>

import {ref, watch, watchEffect} from 'vue';
import TreatmentSelector from './TreatmentSelector.vue';
import { createAppointment } from '../composables/appointment';

const props = defineProps(['clients'])



const addModalDisplay = ref('addDisplay');
const selectedTreatments = ref([]);
const createAppointmentDetails = ref({appDate: null,startTime: null,endTime: null,client: null,totalPrice: 0,treatments: []});

const handleTreatmentChange = () => {
    let addedMinutes = 0
    let totalPrice = 0
    
    selectedTreatments.value.forEach((selected) => {
        addedMinutes = addedMinutes + selected.durationMinutes;
        totalPrice = totalPrice + selected.price;
    });

    const originalDateTime = new Date(`2000-01-01T${createAppointmentDetails.value.startTime}`);
    const newDateTime = new Date(originalDateTime.getTime() + addedMinutes * 60000); // 60000 milliseconds in a minute

    const newHours = String(newDateTime.getHours()).padStart(2, '0');
    const newMinutes = String(newDateTime.getMinutes()).padStart(2, '0');

    createAppointmentDetails.value.endTime = `${newHours}:${newMinutes}`;
    createAppointmentDetails.value.totalPrice = totalPrice;
}



// watch(selectedTreatments, handleTreatmentChange,{ deep: true})
watchEffect(() => handleTreatmentChange());


const switchDisplay = (display) => {
    addModalDisplay.value = display;
};

const addAppointment = async () => {
    createAppointmentDetails.value.treatments = selectedTreatments.value;
    await createAppointment(createAppointmentDetails.value);
    createAppointmentDetails.value = {appDate: null,startTime: null,endTime: null,client: null,totalPrice: 0,treatments: []};
};

</script>

<style lang="scss" scoped>

</style>