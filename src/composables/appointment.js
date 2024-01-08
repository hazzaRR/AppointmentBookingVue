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

export const fetchAppointments = async () => {
    const auth = useAuthStore();

    const response = await fetch(`${BASE_URL}/api/appointment/`, {
        headers: {
            "Authorization": `Bearer ${auth.token}`
        }
    });
    
    
    if (response.status === 200) {
        const data = await response.json();    
        return data;
    };

}

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

        alert("appointment successfully updated");
        location.reload()
    }

    else if (response.status === 401) {
        console.log(await response.text());
      }

    else {
    }

}