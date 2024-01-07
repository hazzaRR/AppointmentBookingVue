<template>
    {{ reportParams.startDate }}
    <div class="grow my-6">

        <section class="container px-4 mx-auto w-full lg:w-3/4">
            <div class="mt-6 md:flex md:items-center md:justify-between">
                <div class="relative flex items-center mt-4 md:mt-0">

                    <div class="m-2" v-if="!customDateRange">
                        <label class="block text-sm text-gray-700 dark:text-gray-200">Month</label>
                        <input type="month" v-model="month"
                            class="block w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300" />
                    </div>

                    <div class="flex" v-else>
                        <div class="w-1/2 m-2">

                            <label class="block text-sm text-gray-700 dark:text-gray-200">Start Date</label>
                            <input type="date" v-model="reportParams.startDate"
                                class="block w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300" />
                        </div>

                        <div class="w-1/2 m-2">
                            <label class="block text-sm text-gray-700 dark:text-gray-200">End Date</label>
                            <input type="date" v-model="reportParams.endDate"
                                class="block w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300" />
                        </div>
                    </div>

                    <div class="m-2">
                        <label class="block text-sm text-gray-700 dark:text-gray-200">Payment Type</label>
                        <select v-model="reportParams.paymentType" id="status"
                            class="block w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300 capitalize">
                            <option class="capitalize" v-for="paymentType in paymentTypes" :key="paymentType"
                                :value="paymentType">{{ paymentType }}</option>
                        </select>
                    </div>
                </div>

                <div class="flex items-center mt-4 gap-x-3">
                    <div class="m-2">
                        <label class="cursor-pointer label">
                            <span class="label-text">Custom Date Range</span>
                            <input type="checkbox" class="toggle toggle-primary ml-2" v-model="customDateRange" />
                        </label>
                    </div>
                    <button
                        @click="fetchReport"
                        class="flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Zm3.75 11.625a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                        </svg>
                        <span>Generate Report</span>
                    </button>
                </div>
            </div>


            <div class="flex flex-col mt-6">
                <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div class="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                            <table class="table">
                                <!-- head -->
                                <thead>
                                    <tr>
                                        <th>Appointment Number</th>
                                        <th>Date</th>
                                        <th>Services</th>
                                        <th>Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <!-- row 1 -->
                                    <tr class="hover">
                                        <th>1</th>
                                        <td>Cy Ganderton</td>
                                        <td>Quality Control Specialist</td>
                                        <td>Blue</td>
                                    </tr>
                                    <!-- row 2 -->
                                    <tr class="hover">
                                        <th>2</th>
                                        <td>Hart Hagerty</td>
                                        <td>Desktop Support Technician</td>
                                        <td>Purple</td>
                                    </tr>
                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
            </div>
        </section>

    </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { fetchSummaryReport } from '../../composables/fetchSummaryReport';

const currentDate = new Date();

const fetchStartAndEndDate = (selectedMonth) => {
    const [year, month] = selectedMonth.split('-');
    const firstDay = new Date(year, parseInt(month) - 1, 1).toISOString().split('T')[0];
    const lastDay = new Date(year, parseInt(month), 0).toISOString().split('T')[0];


    return [firstDay, lastDay]
}

const month = ref(`${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}`)

watch(month, (newMonth) => {
    const dates = fetchStartAndEndDate(newMonth);
    reportParams.value.startDate = dates[0];
    reportParams.value.endDate = dates[1];
});

const paymentTypes = ["all", "cash", "card", "voucher"];
const customDateRange = ref(false);
const reportParams = ref({
    startDate: fetchStartAndEndDate(month.value)[0],
    endDate: fetchStartAndEndDate(month.value)[1],
    paymentType: 'all',
})


const fetchReport = async () => {
    const records = await fetchSummaryReport(reportParams.value)
    console.log(records)
}


</script>

<style lang="scss" scoped></style>