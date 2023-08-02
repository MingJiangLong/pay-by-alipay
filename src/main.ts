import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import 'amfe-flexible'
import callWhenDev from './utils/callWhenDev'
const app = createApp(App);
import Vconsole from 'vconsole'
callWhenDev(() => {
  app.use(() => new Vconsole())
})
app.use(router).mount('#app')
