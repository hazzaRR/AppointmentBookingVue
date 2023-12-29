import { BASE_URL } from "../config";
import { useAuthStore } from '../stores/auth';

export const deleteClient = async (id) => {
    const auth = useAuthStore();

    const response = await fetch(`${BASE_URL}/api/client/clientId/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${auth.token}`
        }
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

