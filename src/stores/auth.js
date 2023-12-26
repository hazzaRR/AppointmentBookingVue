import { defineStore } from "pinia";
import { BASE_URL } from "../config"; //
import router from "../router/index"

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => {
        return { 
            username: localStorage.getItem('username') || null,
            token: localStorage.getItem('token') || null,
            returnUrl: '/'
        }
    },
    actions: {
        async login(username, password) {
            const response = await fetch(`${BASE_URL}/api/auth/login`, {
                method: 'POST',
                headers: {
                        'Content-Type': 'application/json'
                },
                body: JSON.stringify({username, password})
            });


            if (response.status === 200) {
                const data = await response.json();

                localStorage.setItem('username', data.username)
                localStorage.setItem('token', data.token)

                this.username = data.username,
                this.token = data.token,

                router.push(this.returnUrl || '/');
            }
            else if (response.status === 401 || response.status === 403) {
                alert("Incorrect username or password");
            }
        },

        async logout(username, password) {
            this.username = null,
            this.token = null,
            localStorage.removeItem('username');
            localStorage.removeItem('token');

            router.push('/');
            }
    
    }
})