<template>
  <div class="grow my-6">

          <button @click="dateFinder"
            class="flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
            <span>Fetch new Appointments</span>
          </button>

    <dialog id="AppointmentModal" class="modal modal-bottom sm:modal-middle">
      <AddAppointment class="modal-box" v-if="modalDisplay === 'addFormDisplay'" :clients="clients" />
      <!-- <AppointmentOptions class="modal-box" v-if="modalDisplay === 'optionsDisplay'" :appointmentDetails="selectedAppointment" /> -->
      <EditAppointment class="modal-box" v-else-if="modalDisplay === 'editFormDisplay'"
        :appointmentDetails="selectedAppointment" />
      <form method="dialog" class="modal-backdrop">
        <button @click="switchDisplay('addFormDisplay')">close</button>
      </form>
    </dialog>

    <!-- <div v-if="isMobile" class="w-full h-full">
            <FullCalendar :options="mobileCalendarOptions"/>
        </div> -->
    <div class="flex items-center justify-center">
      <div class="sm:w-10/12 sm:h-10/12 w-full h-full xl:w-8/12 xl:h-8/12 m-6">
        <div class="flex items-center my-4 gap-x-3 justify-end">
          <button @click="openAddModal"
            class="flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>

            <span>Add Appointment</span>
          </button>
        </div>
        <FullCalendar :options="calendarOptions" ref="calendarInstance" />

        <!-- <FullCalendar :options="calendarOptions">
                  <template v-slot:eventContent='arg'>
                    <b>{{ arg.event.start }} -.227c0 {{ arg.event.end }}</b>
                    <b>{{ arg.event.title }}</b>
                  </template>
                </FullCalendar> -->
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction'
import EditAppointment from '../../components/EditAppointment.vue';
import AddAppointment from '../../components/AddAppointment.vue';
import { fetchAppointments } from '../../composables/appointment';
import { fetchClients } from '../../composables/client';

const calendarInstance = ref(null);
const appointments = ref(null);
const events = ref([]);
const clients = ref([]);
const selectedAppointment = ref(null);

const modalDisplay = ref('addFormDisplay');

const switchDisplay = (display) => {
  modalDisplay.value = display;
};



const calendarOptions = ref({
  plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin],
  initialView: 'timeGridWeek',
  firstDay: 1,
  slotMinTime: '07:00',
  slotMaxTime: '21:00',
  slotDuration: '00:15',
  nowIndicator: true,
  headerToolbar: {
    left: 'title',
    // center: 'title',
    right: 'prev,next'
    // right: 'timeGridWeek,timeGridDay,listYear,listWeek'
  },
  footerToolbar: {
    right: 'dayGridMonth,timeGridWeek,timeGridDay,listDay,listWeek'
    // right: 'timeGridWeek,timeGridDay,listYear,listWeek'
  },
  default: 'standard',
  events: events.value,
  eventTimeFormat: {
    hour: 'numeric',
    minute: '2-digit',
    meridiem: 'short'
  },
  height: 'auto',
  eventClick: function (info) {
    selectedAppointment.value = appointments.value.filter(appointment => String(appointment['id']) === String(info.event.id))[0]
    switchDisplay('editFormDisplay');
    AppointmentModal.showModal();
  },
  eventDidMount: function (info) {
    const eventStatus = info.event.extendedProps.status;
    if (eventStatus === 'completed') {
      info.el.style.backgroundColor = '#32de84';
      info.el.style.borderColor = '#32de84';
      info.el.style.color = 'white';
    } else if (eventStatus === 'cancelled') {
      info.el.style.backgroundColor = '#C60C30';
      info.el.style.borderColor = '#C60C30';
      info.el.style.color = 'white';
    }
    else {
      info.el.style.backgroundColor = '#007FFF';
      info.el.style.borderColor = '#007FFF';
      info.el.style.color = 'white';
    }

    // const dotEl = info.el.getElementsByClassName('fc-list-event-dot')[0];
    // if (dotEl) {
    // dotEl.style.backgroundColor = 'white';
    // }
  }
});

onMounted(async () => {
  appointments.value = await fetchAppointments();

  for (let i = 0; i < appointments.value.length; i++) {

    const event = {
      id: appointments.value[i].id,
      title: `${appointments.value[i].client.firstname} ${appointments.value[i].client.surname}`,
      start: `${appointments.value[i].appDate}T${appointments.value[i].startTime}`,
      end: `${appointments.value[i].appDate}T${appointments.value[i].endTime}`,
      extendedProps: {
        status: appointments.value[i].status
      }
    }
    // if (!events.value.has(event)) {

    events.value.push(event);
  }


  calendarInstance.value = calendarInstance.value.getApi()

  console.log(new Date(parseInt(calendarInstance.value.getDate().getFullYear()), 0, 1).toISOString().split('T')[0])
  console.log(new Date(parseInt(calendarInstance.value.getDate().getFullYear()), 11, 1).toISOString().split('T')[0])


});

const openAddModal = async () => {
  clients.value = await fetchClients();
  switchDisplay('addFormDisplay');
  AppointmentModal.showModal();
};


const dateFinder = () => {
  // console.log(calendarInstance.value.getDate().getFullYear())
  //   console.log(new Date(parseInt(calendarInstance.value.getDate().getFullYear()), 0, 1).toISOString().split('T')[0])
  // console.log(new Date(parseInt(calendarInstance.value.getDate().getFullYear()), 11, 1).toISOString().split('T')[0])
  console.log(calendarInstance.value.currentData.dateProfile.currentRange);
  // console.log(calendarInstance.value.getCurrentRange());
}

</script>

<style lang="scss" scoped></style>