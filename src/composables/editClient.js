import { BASE_URL } from "../config";
import { useAuthStore } from '../stores/auth';

export const editClient = async (client) => {
    const auth = useAuthStore();

    const response = await fetch(`${BASE_URL}/api/client/clientId/${client.id}`, {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${auth.token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({firstname: client.firstname, surname: client.surname, email: client.email, telephone: client.telephone})
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