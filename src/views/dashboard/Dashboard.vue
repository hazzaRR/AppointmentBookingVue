<template>

    <!-- <div v-if="isMobile" class="w-full h-full">
        <FullCalendar :options="mobileCalendarOptions"/>
    </div> -->
    <div class="flex items-center justify-center">
        <div class=" sm:w-10/12 sm:h-10/12 w-full h-full xl:w-8/12 xl:h-8/12 m-6">
        <FullCalendar :options="calendarOptions"/>
        </div>
    </div>
    
</template>

<script setup>
import { ref, onMounted } from 'vue';
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import Calendar from '../../components/Calendar.vue';
import {fetchAppointments} from '../../composables/fetchAppointments';

const appointments = ref(null);
const events = ref([]);
const selectedEventId = ref(null);

const calendarOptions = ref({
    plugins: [ dayGridPlugin, interactionPlugin, timeGridPlugin ],
    initialView: 'timeGridWeek',
      firstDay: 1,
      slotMinTime: '07:00',
      slotMaxTime: '21:00',
      slotDuration: '00:15',
      nowIndicator: true,
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      events: events.value,
      eventTimeFormat: {
        hour: 'numeric',
        minute: '2-digit',
        meridiem: 'short'
      },
      //redirects the page to show the details of the appointment you have selected
      eventClick: function(info) {

        selectedEventId.value = info.event.id;

        // editBookingDetails.showModal();

        // navigateTo(`/employee/manageBookings/${info.event.id}`);
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

</script>

<style lang="scss" scoped>

</style>