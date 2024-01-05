<template>
    <div class="grow my-6">

        <dialog id="addAppointmentModal" class="modal modal-bottom sm:modal-middle">
            <AddAppointment class="modal-box" v-if="modalDisplay === 'addFormDisplay'" :clients="clients" />
            <!-- <AppointmentOptions class="modal-box" v-if="modalDisplay === 'optionsDisplay'" :appointmentDetails="selectedAppointment" /> -->
            <EditAppointment class="modal-box" v-else-if="modalDisplay === 'editFormDisplay'" :appointmentDetails="selectedAppointment"/>
            <form method="dialog" class="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
        
        <!-- <div v-if="isMobile" class="w-full h-full">
            <FullCalendar :options="mobileCalendarOptions"/>
        </div> -->
        <div class="flex items-center justify-center">
            <div class="sm:w-10/12 sm:h-10/12 w-full h-full xl:w-8/12 xl:h-8/12 m-6">
                <div class="flex items-center my-4 gap-x-3 justify-end">
                    <button @click="openAddModal" class="flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        
                        <span>Add Appointment</span>
                    </button>
                </div>
                <FullCalendar :options="calendarOptions"/>
            </div>
        </div>
        
    </div>
    </template>

<script setup>
import { ref, onMounted } from 'vue';
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import EditAppointment from '../../components/EditAppointment.vue';
import AddAppointment from '../../components/AddAppointment.vue';
import AppointmentOptions from '../../components/AppointmentOptions.vue';
import {fetchAppointments} from '../../composables/fetchAppointments';
import {fetchClients} from '../../composables/fetchClients';

const appointments = ref(null);
const events = ref([]);
const clients = ref([]);
const selectedAppointment = ref(null);

const modalDisplay = ref('addFormDisplay');

const switchDisplay = (display) => {
  modalDisplay.value = display;
};



const calendarOptions = ref({
    plugins: [ dayGridPlugin, interactionPlugin, timeGridPlugin ],
    initialView: 'timeGridWeek',
      firstDay: 1,
      slotMinTime: '07:00',
      slotMaxTime: '21:00',
      slotDuration: '00:15',
      nowIndicator: true,
      headerToolbar: {
        left: 'prev,next',
        center: 'title',
        // right: 'dayGridMonth,timeGridWeek,timeGridDay'
        right:'timeGridWeek,timeGridDay'
      },
      default: 'standard',
      events: events.value,
      eventTimeFormat: {
        hour: 'numeric',
        minute: '2-digit',
        meridiem: 'short'
      },
      height: 'auto',
//   aspectRatio: 1.5,
      //opens modal with the selected appointment details
      eventClick: function(info) {
        selectedAppointment.value = appointments.value.filter(appointment => String(appointment['id']) === String(info.event.id))[0]
        console.log(selectedAppointment.value)
        switchDisplay('editFormDisplay');
        addAppointmentModal.showModal();
      }
});

onMounted(async () => {
  appointments.value = await fetchAppointments();

  for (let i = 0; i < appointments.value.length; i++) {

  events.value.push({
    id: appointments.value[i].id,
    title: `${appointments.value[i].client.firstname} ${appointments.value[i].client.surname}`,
    start: `${appointments.value[i].appDate}T${appointments.value[i].startTime}`,
    end: `${appointments.value[i].appDate}T${appointments.value[i].endTime}`
  });

}

});

const openAddModal = async () => {
    clients.value = await fetchClients();
    switchDisplay('addFormDisplay');
    addAppointmentModal.showModal();
};

</script>

<style lang="scss" scoped>

</style>