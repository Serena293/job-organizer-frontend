import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import './assets/main.css';


import router from './router';
import ToastService from 'primevue/toastservice'
import PrimeVue from 'primevue/config'
import { createApp } from 'vue';
import App from './App.vue';




const app = createApp(App);

app.use(PrimeVue)
app.use(ToastService)
app.use(router);
app.mount('#app');
