import { BASE_URL } from "../config";
import { useAuthStore } from '../stores/auth';

export const editTreatment = async (treatment) => {
    const auth = useAuthStore();

    const response = await fetch(`${BASE_URL}/api/treatment/treatmentId/${treatment.id}`, {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${auth.token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({treatmentName: treatment.treatmentName, price: treatment.price, durationMinutes: treatment.durationMinutes})
    });
    
    if (response.status === 200) {

        console.log("treatment successfully updated");
    }

    else if (response.status === 401) {
        console.log(await response.text());
      }

    else {
    }

}

export const archiveTreatment = async (treatment) => {
    const auth = useAuthStore();

    const response = await fetch(`${BASE_URL}/api/archiveTreatment/${treatment.id}?archive=${archive}`, {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${auth.token}`,
            'Content-Type': 'application/json'
        }}
    )
    if (response.status === 200) {

        console.log("treatment updated")
        alert("treatment details successfully updated");
    }

    else if (response.status === 401) {
        console.log(await response.text());
      }

    else {
    }

}