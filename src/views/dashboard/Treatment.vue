<template>

    <div class="grow my-6">
    <dialog id="treatmentModal" class="modal modal-bottom sm:modal-middle">
                <AddTreatment class="modal-box" v-if="modalDisplay === 'addDisplay'" />
                <EditTreatment class="modal-box" v-if="modalDisplay === 'editDisplay'" :selectedTreatment="selectedTreatment" />

                <form v-else-if="modalDisplay === 'deleteDisplay'" method="dialog" class="modal-box">
                    <div>
                        <div class="flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-gray-700 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                            </svg>
                        </div>
                        
                        <div class="mt-2 text-center">
                            <h3 class="text-lg font-medium leading-6 text-gray-800 capitalize dark:text-white" id="modal-title">Delete Treatment</h3>
                            <h4 class="text-md font-sm leading-6 text-gray-800 capitalize dark:text-white">Treatment: {{selectedTreatment.treatmentName }}</h4>
                            <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                Are you sure you want to delete this treatment?
                            </p>
                        </div>
                    </div>
                    
                    <div class="mt-5 sm:flex sm:items-center sm:justify-center">
                        <div class="sm:flex sm:items-center ">
                            <button class="w-full px-4 py-2 mt-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:mt-0 sm:w-auto sm:mx-2 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40">
                                Cancel
                            </button>
                            
                            <button @click="DeleteTreatment" class="w-full px-4 py-2 mt-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md sm:w-auto sm:mt-0 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40">
                                Delete
                            </button>
                        </div>
                    </div>
            </form>
            <form method="dialog" class="modal-backdrop">
                 <button>close</button>
            </form>
    </dialog>
    
        <section class="container px-4 mx-auto w-full lg:w-3/4">
            <div class="mt-6 md:flex md:items-center md:justify-between">
                <div class="relative flex items-center mt-4 md:mt-0">
                    <span class="absolute">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-5 h-5 mx-3 text-gray-400 dark:text-gray-600">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                    </span>
    
                    <input type="text" placeholder="Search"
                        class="block w-full py-1.5 pr-5 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-80 placeholder-gray-400/70 pl-11 rtl:pr-11 rtl:pl-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" />
                </div>
                <div class="flex items-center mt-4 gap-x-3">
                    <button @click="openAddModal" class="flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>

                        <span>Add Treatment</span>
                    </button>
                </div>
            </div>
    
            <div class="flex flex-col mt-6">
                <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div class="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                            <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead class="bg-gray-50 dark:bg-gray-800">
                                    <tr>
                                        <th scope="col"
                                            class="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                <span>Name</span>
                                        </th>
    
                                        <th scope="col"
                                            class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                            Price
                                        </th>
    
                                        <th scope="col"
                                            class="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                            Time duration
                                        </th>
                                        <th scope="col" class="relative py-3.5 px-4">
                                            <span class="sr-only">Edit</span>
                                        </th>
                                        <th scope="col" class="relative py-3.5 px-4">
                                            <span class="sr-only">Delete</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody class="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                                    <tr v-for="treatment in displayedTreatments" :key="treatment.id">
                                        <td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                            <div>
                                                <h2 class="font-medium text-gray-800 dark:text-white capitalize">
                                                    {{ treatment.treatmentName }}
                                                </h2>
                                            </div>
                                        </td>
                                        <td class="px-4 py-4 text-sm whitespace-nowrap">
                                            <div>
                                                <h4 class="text-gray-700 dark:text-gray-200">
                                                    £{{ treatment.price.toFixed(2) }}
                                                </h4>
                                            </div>
                                        </td>
                                        <td class="px-12 py-4 text-sm font-medium whitespace-nowrap">
                                            <div
                                                class="inline px-3 py-1 text-sm font-normal rounded-full text-emerald-500 gap-x-2 bg-emerald-100/60 dark:bg-gray-800">
                                                {{ treatment.durationMinutes }} minutes
                                            </div>
                                        </td>
    
                                        <td class="px-4 py-4 text-sm whitespace-nowrap">
                                            <button
                                                @click="openEditModal(treatment)"
                                                class="px-1 py-1 text-gray-500 transition-colors duration-200 rounded-lg dark:text-gray-300 hover:bg-gray-100">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                                    class="w-6 h-6">
                                                    <path fill-rule="evenodd"
                                                        d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z"
                                                        clip-rule="evenodd" />
                                                    <path fill-rule="evenodd"
                                                        d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z"
                                                        clip-rule="evenodd" />
                                                </svg>
                                            </button>
                                        </td>
                                        <td class="px-4 py-4 text-sm whitespace-nowrap">
                                            <button
                                            @click="openDeleteModal(treatment)"
                                                class="px-1 py-1 text-gray-500 transition-colors duration-200 rounded-lg dark:text-gray-300 hover:bg-gray-100">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                                    class="w-6 h-6">
                                                    <path fill-rule="evenodd"
                                                        d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                                                        clip-rule="evenodd" />
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
    
            <div class="mt-6 sm:flex sm:items-center sm:justify-between">
                <div class="text-sm text-gray-500 dark:text-gray-400">
                    Page
                    <span class="font-medium text-gray-700 dark:text-gray-100">{{ currentPage }} of {{ totalNumberOfPages }}</span>
                </div>
    
                <div class="flex items-center mt-4 gap-x-4 sm:mt-0">
                    <button
                    @click="currentPage--"
                    :disabled="currentPage === 1"
                    class="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
                    :class="{ 'bg-gray-300 text-gray-500 cursor-not-allowed hover:bg-gray-300': currentPage === 1 }">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-5 h-5 rtl:-scale-x-100">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                        </svg>
    
                        <span> previous </span>
                    </button>
    
                    <button
                        @click="currentPage++"
                        :disabled="currentPage === totalNumberOfPages"
                        class="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
                        :class="{ 'bg-gray-300 text-gray-500 cursor-not-allowed hover:bg-gray-300': currentPage === totalNumberOfPages }">
                        <span> Next </span>
    
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-5 h-5 rtl:-scale-x-100">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                        </svg>
                    </button>
                </div>
            </div>
        </section>
    
    </div>
    </template>
    
    <script setup>
    import { ref, onMounted, computed } from "vue";
    import { fetchTreatments } from "../../composables/fetchTreatments";
    import { deleteTreatment } from "../../composables/deleteTreatment";
    import AddTreatment from '../../components/AddTreatment.vue'
    import EditTreatment from "../../components/EditTreatment.vue";
    
    const treatments = ref([]);
    const currentPage = ref(1);
    const selectedTreatment = ref({id: null, treatmentName: null, price: null, durationMinutes: null});
    const treatmentsPerPage = 10;

    const modalDisplay = ref('addDisplay');

    const switchDisplay = (display) => {
    modalDisplay.value = display;
    };
    
    const totalNumberOfPages = computed(() => {
        return Math.ceil(treatments.value.length / treatmentsPerPage);
    });
    
    const displayedTreatments = computed(() => {
        const start = (currentPage.value - 1) * treatmentsPerPage;
          const end = start + treatmentsPerPage;
          return treatments.value.slice(start, end);
    });
    
    onMounted(async () => {
        treatments.value = await fetchTreatments();
    });
    
    const openDeleteModal = (treatment) => {
        selectedTreatment.value = treatment;
        switchDisplay("deleteDisplay")
        treatmentModal.showModal();
        // deleteTreatmentModal.showModal();
    };
    
    const DeleteTreatment = async () => {
        await deleteTreatment(selectedTreatment.value.id);
        treatments.value = treatments.value.filter(treatment => treatment['id'] !== selectedTreatment.value.id);
    }
    

    const openEditModal = (treatment) => {
        selectedTreatment.value = treatment;
        switchDisplay("editDisplay");
        treatmentModal.showModal();
    };

    const openAddModal = () => {
        switchDisplay("addDisplay")
        treatmentModal.showModal();
    };

    
    </script>
    