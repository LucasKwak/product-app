import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './util/router'

import { useAuthStore } from "@/util/store/auth";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);

const authStore = useAuthStore();

authStore.validateToken().then(() => {
    console.log("Aplicacion para montar")
    app.use(router);
    app.mount('#app');
});
