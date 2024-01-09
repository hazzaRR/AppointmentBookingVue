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
        auth.logout();
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
    }
    else if (response.status === 401) {
        auth.logout();
    }

}

export const fetchAppointmentsBetweenDateRange = async (info) => {
    const auth = useAuthStore();

    const response = await fetch(`${BASE_URL}/api/appointment/appointment-between?start=${info.startStr.split('T')[0]}&end=${info.endStr.split('T')[0]}`, {
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
        auth.logout();
    }

    else {
    }

}