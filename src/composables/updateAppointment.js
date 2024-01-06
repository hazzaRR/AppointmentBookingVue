import { BASE_URL } from "../config";
import { useAuthStore } from '../stores/auth';

export const updateAppointment = async (appointment) => {
    const auth = useAuthStore();

    const response = await fetch(`${BASE_URL}/api/appointment/appointmentId/${appointment.id}`, {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${auth.token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(appointment)
    });
    
    if (response.status === 200) {

        console.log("treatment successfully deleted");
    }

    else if (response.status === 401) {
        console.log(await response.text());
      }

    else {
    }



}