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
        alert("treatment successfully created");
        location.reload();
    }

    else if (response.status === 401) {
        console.log(await response.text());
      }

    else {
    }

}

export const deleteTreatment = async (id) => {
    const auth = useAuthStore();

    const response = await fetch(`${BASE_URL}/api/treatment/treatmentId/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${auth.token}`
        }
    });
    
    if (response.status === 200) {

        alert("treatment successfully deleted");
    }

    else if (response.status === 401) {
        console.log(await response.text());
      }

    else {
    }
}

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

        alert("treatment successfully updated");
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

export const fetchTreatments = async () => {
    const auth = useAuthStore();

    const response = await fetch(`${BASE_URL}/api/treatment/`, {
        headers: {
            "Authorization": `Bearer ${auth.token}`
        }
    });
    
    
    if (response.status === 200) {
        const data = await response.json();
    
        return data;
    };

}

export const fetchAvailableTreatments = async () => {
    const auth = useAuthStore();

    const response = await fetch(`${BASE_URL}/api/treatment/available`, {
        headers: {
            "Authorization": `Bearer ${auth.token}`
        }
    });
    
    
    if (response.status === 200) {
        const data = await response.json();

        return data;
    };

}