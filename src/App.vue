<script setup>
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';
import {ref, computed} from 'vue';
import {useAuthStore} from './stores/auth';
import { useHead } from '@vueuse/head'

const auth = useAuthStore();

useHead({
      title: computed(() => "Appointment Management System"),
      meta: [
        {
          name: `description`,
          content: ""
        },
        ],
     
    })

const tools = [
{name: "Manage Appointments", link: "/dashboard/"},
{name: "Manage Treatments", link: "/dashboard/treatment"},
{name: "Manage Clients", link: "/dashboard/client"},
{name: "Summary Report", link: "/dashboard/summary-report"}
]

</script>

<template>
  <div class="min-h-screen flex flex-col">
    <Navbar :tools="tools" :links="links" class="sticky top-0 z-50" />
    <router-view />
    <Footer class="sticky bottom-0 z-50"/>
  </div>
  </template>

<style scoped>

</style>
