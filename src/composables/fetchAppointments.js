import { BASE_URL } from "../config";
import { useAuthStore } from '../stores/auth';

export const fetchAppointments = async () => {
    const auth = useAuthStore();

    const response = await fetch(`${BASE_URL}/api/appointment/`, {
        headers: {
            "Authorization": `Bearer ${auth.token}`
        }
    });
    
    
    if (response.status === 200) {
        const data = await response.json();

        console.log(data)
    
        return data;
    };



}