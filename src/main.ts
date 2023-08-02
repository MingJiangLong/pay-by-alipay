import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import 'amfe-flexible'
import Vconsole from 'vconsole'
import callWhenDev from './utils/callWhenDev'
const app = createApp(App);
callWhenDev(() => {
  app.use(() => new Vconsole())
})
app.use(router).mount('#app')
