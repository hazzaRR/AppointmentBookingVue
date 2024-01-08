<template>
    <div>

    <div class="max-w-sm mx-auto my-6" v-if="isEmpty">No treatments currently available</div>
    <div v-else>
        <h3 class="text-lg font-medium leading-6 text-gray-800 capitalize dark:text-white" id="modal-title">
            Select Treatments
        </h3>
        <div
            v-for="treatment in availableTreatments"
            :key="treatment.id"
            @click="selectTreatment(treatment)"
            :class="['block', 'hover:ring', 'hover:ring-white', 'w-full', 'px-4', 'py-3', 'text-sm', 'border', 'rounded-md',
            isSelected(treatment.id) ? ['shadow ring ring-blue-400 border-blue-400'] : [],
            'max-w-sm',
            'mx-auto',
            'my-4'
            ]">
            <p>{{ treatment.treatmentName }} £{{ treatment.price }}</p>
        </div>
        <div class="flex items-center justify-center mt-4">
            <button 
            @click="confirmSelection"
            class="w-full mx-auto px-4 py-2 mt-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md sm:mt-0 sm:w-1/2 sm:mx-2 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40">
                Confirm
            </button>
        </div>

    </div>

</div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import {fetchTreatments,fetchAvailableTreatments} from '../composables/treatment';

const emits = defineEmits(['update:selectedTreatments', 'confirmSelection']);
const props = defineProps(['selectedTreatments'])

const availableTreatments = ref([]);
// const selectedTreatments = ref(props.selectedTreatments);

const isEmpty = computed(() => availableTreatments.value.length === 0);


onMounted(async () => {
    availableTreatments.value = await fetchAvailableTreatments();
})

const selectTreatment = (selectedTreatment) => {
    const treatmentIndex = props.selectedTreatments.findIndex(treatment => treatment.id === selectedTreatment.id);

    if (treatmentIndex !== -1) {
        props.selectedTreatments.splice(treatmentIndex, 1);
    } else {

        props.selectedTreatments.push(selectedTreatment);
    }
};

const isSelected = (id) => {
    console.log( props.selectedTreatments.findIndex((selected) =>  String(selected.id) === String(id)))
    return (
        props.selectedTreatments.findIndex(
      (selected) => selected.id === id
    ) !== -1
  );
};

const confirmSelection = () => {
  // Perform any other actions needed before emitting the event
//   emits('update:selectedTreatments', selectedTreatments.value);
  emits('confirmSelection');
};

</script>

<style lang="scss" scoped>

</style>