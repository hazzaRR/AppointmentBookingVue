import { BASE_URL } from "../config";
import { useAuthStore } from '../stores/auth';

export const createAppointment = async (appointmentDetails) => {
    const auth = useAuthStore();

    const response = await fetch(`${BASE_URL}/api/appointment/`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${auth.token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointmentDetails)
    });
    
    if (response.status === 200) {

        alert("Appointment successfully created");
        location.reload();
    }

    else if (response.status === 401) {
        console.log(await response.text());
      }

    else {
    }

}