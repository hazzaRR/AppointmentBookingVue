<template>
    <div class="grow my-6">

        <section class="container px-4 mx-auto w-full lg:w-3/4">
            <div class="mt-6 md:flex md:items-center md:justify-between">
                <div class="relative flex items-center mt-4 md:mt-0">

                    <div class="m-2" v-if="!customDateRange">
                        <label class="block text-xs text-gray-700 dark:text-gray-200">Month</label>
                        <input type="month" v-model="month"
                            class="block w-full px-4 py-3 md:text-sm text-xs text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300" />
                    </div>

                    <div class="flex w-7/12 md:w-3/4" v-else>
                        <div class="w-1/2">

                            <label class="block text-xs text-gray-700 dark:text-gray-200">Start Date</label>
                            <input type="date" v-model="reportParams.startDate"
                                class="block w-10/12 md:w-full px-4 py-3 md:text-sm text-xs text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300" />
                        </div>

                        <div class="w-1/2 md:ml-2">
                            <label class="block text-xs text-gray-700 dark:text-gray-200">End Date</label>
                            <input type="date" v-model="reportParams.endDate"
                                class="block w-10/12 md:w-full px-4 py-3 md:text-sm text-xs text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300" />
                        </div>
                    </div>

                    <div class="m-2">
                        <label class="block text-xs text-gray-700 dark:text-gray-200">Payment Type</label>
                        <select v-model="reportParams.paymentType" id="status"
                            class="block w-full px-4 py-3 md:text-sm text-xs text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300 capitalize">
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
                    <button @click="fetchReport"
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
                            <table class="table table-xs md:table-md" id="report-table">
                                <caption class="text-lg font-semibold my-4">Summary Report from {{new Date(startDate).toLocaleDateString('en-uk')}} - {{new Date(endDate).toLocaleDateString('en-uk')}}</caption>
                                <thead>
                                    <!-- <tr>
                                        <th><span class="font-bold">From: </span>{{new Date(startDate).toLocaleDateString('en-uk')}}</th>
                                        <th><span class="font-bold">To: </span>{{new Date(endDate).toLocaleDateString('en-uk')}}</th>
                                    </tr> -->
                                    <tr>
                                        <th>App ID</th>
                                        <th>Date</th>
                                        <th>Services</th>
                                        <th>Payement Type</th>
                                        <th>Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="record in records" :key="record.id" class="hover">
                                        <th>#{{ record.id }}</th>
                                        <td>{{ new Date(record.appDate).toLocaleDateString('en-uk') }}</td>
                                        <td>{{ record.treatments.map(treatment => treatment.treatmentName).join(', ') }}
                                        </td>
                                        <td class="capitalize">{{ record.paymentType }}</td>
                                        <td>£{{ record.totalPrice.toFixed(2) }}</td>
                                    </tr>
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td><span class="font-bold">Number of Appointments:</span> {{ records.length }}</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td><span class="font-bold">Total:</span> £{{ totalPrice.toFixed(2) }}</td>
                                    </tr>
                                </tfoot>
                                </table>

                        </div>
                    </div>
                </div>
            </div>
            <div class="mt-6 sm:flex items-center sm:items-end sm:justify-between">

                <button @click="generateAndDownloadPDF"
                v-if="downloadReport && records.length > 0"
                    class="flex items-center justify-center sm:ml-auto w-full px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15M9 12l3 3m0 0 3-3m-3 3V2.25" />
                    </svg>

                    <span>Download</span>
                </button>
            </div>
        </section>

    </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import { fetchSummaryReport } from '../../composables/summaryReport';
import html2pdf from 'html2pdf.js';

const currentDate = new Date();
const downloadReport = ref(false);

const records = ref([]);

const totalPrice = computed(() => {
    let total = 0
    for (let i = 0; i < records.value.length; i++) {
        total += records.value[i].totalPrice;
    }

    return total;
})

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

let startDate = reportParams.value.startDate;
let endDate = reportParams.value.endDate;


const fetchReport = async () => {
    records.value = await fetchSummaryReport(reportParams.value)
    downloadReport.value = true;
    startDate = reportParams.value.startDate;
    endDate = reportParams.value.endDate;
}

const generateAndDownloadPDF = () => {
    const pdfContent = document.getElementById('report-table');

    html2pdf(pdfContent, {
        margin: 10,
        filename: 'summary-report.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    });
};


</script>

<style lang="scss" scoped></style>