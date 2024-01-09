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
        alert("client successfully created");
        location.reload()
    }

    else if (response.status === 401) {
        auth.logout();
    }

    else {
    }

}

export const deleteClient = async (id) => {
    const auth = useAuthStore();

    const response = await fetch(`${BASE_URL}/api/client/clientId/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${auth.token}`
        }
    });
    
    if (response.status === 200) {

        alert("client successfully deleted");
    }

    else if (response.status === 401) {
        auth.logout();
    }

    else {
    }

}

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

        alert("client details successfully updated");
    }

    else if (response.status === 401) {
        auth.logout();
    }

    else {
    }

}

export const fetchClients = async () => {
    const auth = useAuthStore();

    const response = await fetch(`${BASE_URL}/api/client/`, {
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