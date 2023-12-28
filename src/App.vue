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

const links = [
{name: "Home", link: "/dashboard"},
{name: "Treatments", link: "/dashboard/treatment"}
]

const tools = [
{name: "Manage Posts", link: "/dashboard/manage-posts"},
{name: "Add Post", link: "/dashboard/add-post"},
{name: "Settings", link: "/settings"}
]

</script>

<template>
  <div class="min-h-screen flex flex-col">
    <Navbar :tools="tools" :links="links" class="sticky top-0 z-50" />
    <router-view class="grow my-6"/>
    <Footer class="sticky bottom-0 z-50"/>
  </div>
  </template>

<style scoped>

</style>
