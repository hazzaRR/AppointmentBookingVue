import { BASE_URL } from "../config";
import { useAuthStore } from '../stores/auth';

export const fetchSummaryReport = async (reportParams) => {
    const auth = useAuthStore();

    let requestParams;

    if (reportParams.paymentType === "all") {
        requestParams = `?start=${reportParams.startDate}&end=${reportParams.endDate}`
    }
    else {
        requestParams = `?start=${reportParams.startDate}&end=${reportParams.endDate}&payment=${reportParams.paymentType}`
    }

    const response = await fetch(`${BASE_URL}/api/appointment/summary-report${requestParams}`, {
        headers: {
            "Authorization": `Bearer ${auth.token}`
        }
    });
    
    
    if (response.status === 200) {
        const data = await response.json();    
        return data;
    }
    
    else if (response.status === 401) {
        auth.logout();
    }

}