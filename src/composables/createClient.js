import { BASE_URL } from "../config";
import { useAuthStore } from '../stores/auth';

export const createClient = async (clientDetails) => {
    const auth = useAuthStore();

    const response = await fetch(`${BASE_URL}/api/client/`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${auth.token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(clientDetails)
    });
    
    if (response.status === 200) {

        console.log("client successfully created");
    }

    else if (response.status === 401) {
        console.log(await response.text());
      }

    else {
    }

}