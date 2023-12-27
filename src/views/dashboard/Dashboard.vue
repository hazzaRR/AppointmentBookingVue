<template>

    <!-- <div v-if="isMobile" class="w-full h-full">
        <FullCalendar :options="mobileCalendarOptions" :events="events"/>
    </div> -->
    <div class="flex items-center justify-center">
        <div class="w-8/12 h-8/12">
        <FullCalendar :options="calendarOptions" :events="events"/>
        </div>
    </div>
    
</template>

<script setup>
import { ref } from 'vue';
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import Calendar from '../../components/Calendar.vue';

const events = ref([]);

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
      events: [
        ],
      eventTimeFormat: {
        hour: 'numeric',
        minute: '2-digit',
        meridiem: 'short'
      },
      //redirects the page to show the details of the appointment you have selected
      eventClick: function(info) {

        selectedID.value = info.event.id;

        editBookingDetails.showModal();

        // navigateTo(`/employee/manageBookings/${info.event.id}`);
      }
});

</script>

<style lang="scss" scoped>

</style>