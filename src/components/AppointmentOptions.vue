<template>
    <div v-if="modalDisplay === 'optionDisplay'">
        <h3 class="text-lg font-medium leading-6 text-gray-800 capitalize dark:text-white" id="modal-title">
            Appointment #{{ props.appointmentDetails.id }} Options for: {{ props.appointmentDetails.client.firstname }} {{ props.appointmentDetails.client.surname }} 
        </h3>
        <div
            @click="switchDisplay('editDisplay')"
            :class="['block', 'hover:ring', 'hover:ring-white', 'w-full', 'px-4', 'py-3', 'text-sm', 'border', 'rounded-md',
            'max-w-sm',
            'mx-auto',
            'my-4'
            ]">
            <p>Edit Appointment</p>
        </div>
        <div
            @click="switchDisplay('CompleteDisplay')"
            :class="['block', 'hover:ring', 'hover:ring-white', 'w-full', 'px-4', 'py-3', 'text-sm', 'border', 'rounded-md',
            'max-w-sm',
            'mx-auto',
            'my-4'
            ]">
            <p>Complete Appointment</p>
        </div>
        <div
            @click="deleteAppointment"
            :class="['block', 'hover:ring', 'hover:ring-white', 'w-full', 'px-4', 'py-3', 'text-sm', 'border', 'rounded-md',
            'max-w-sm',
            'mx-auto',
            'my-4'
            ]">
            <p>Delete Appointment</p>
        </div>
    </div>
    <EditAppointment v-else-if="modalDisplay === 'editDisplay'" :appointmentDetails="props.appointmentDetails"/>
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