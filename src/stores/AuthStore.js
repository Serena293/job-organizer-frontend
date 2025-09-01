import { defineStore } from "pinia";

export const useAuthStore = defineStore('auth',
    {
        state: () => ({
            token: localStorage.getItem('jwt') || null,
            user:null,
        }),
        getters: {
            isLoggedIn : (state) => !!state.token
        },
        actions: {
            login(token, email){
                this.token = token,
                this.email = email,
                this.isLoggedIn = true,
                localStorage.setItem('jwt', token)
            }},
            logout(){
                this.token = null,
                this.email = null,
                this.isLoggedIn = false,
                localStorage.removeItem('jwt')
            }    
        
        }

)