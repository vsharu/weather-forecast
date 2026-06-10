import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { VueDatePicker } from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import WeatherPanel from './components/WeatherPanel.vue'

const app = createApp(App);

app.component('VueDatePicker', VueDatePicker);
app.component('WeatherPanel', WeatherPanel);
app.mount('#app');