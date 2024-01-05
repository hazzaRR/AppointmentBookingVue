<template>
        <div>
        <form v-if="addModalDisplay === 'addDisplay'" method="dialog">
                    <h3 class="text-lg font-medium leading-6 text-gray-800 capitalize dark:text-white" id="modal-title">
                        Create Appointment
                    </h3>

                        <label for="client" class="text-sm text-gray-700 dark:text-gray-200">
                            Client
                        </label>

                        <label class="block mt-3" for="duration">
                            <select v-model="createAppointmentDetails.client" id="duration" class="block w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300">
                                <option v-for="client in props.clients" :key="client.id" :value="client" >{{ client.firstname }} {{ client.surname }}</option>
                            </select>
                        </label>
                        <div class="mt-4 sm:flex sm:items-center sm:-mx-2">
                            <button class="w-full px-4 py-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:w-1/2 sm:mx-2 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40">
                                Cancel
                            </button>

                            <button @click="addAppointment" class="w-full px-4 py-2 mt-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md sm:mt-0 sm:w-1/2 sm:mx-2 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40">
                                Create
                            </button>
                        </div>
        </form>
        </div>
</template>

<script setup>
import { ref, onMounted} from 'vue';
import EditAppointment from './EditAppointment.vue';

const emits = defineEmits(['confirmSelection']);
const props = defineProps(['appointmentDetails'])

// onMounted(async () => {
    
// })

const modalDisplay = ref('optionDisplay');

const switchDisplay = (display) => {
  modalDisplay.value = display;
};


</script>

<style lang="scss" scoped>

</style>