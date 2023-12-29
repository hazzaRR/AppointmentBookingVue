import { BASE_URL } from "../config";
import { useAuthStore } from '../stores/auth';

export const createTreatment = async (treatmentDetails) => {
    const auth = useAuthStore();

    const response = await fetch(`${BASE_URL}/api/treatment/`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${auth.token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(treatmentDetails)
    });
    
    if (response.status === 200) {

        console.log("treatment successfully created");
    }

    else if (response.status === 401) {
        console.log(await response.text());
      }

    else {
    }

}