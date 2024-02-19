import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
//import "./sass/main.scss";
import "bootstrap";
import "normalize.css";
import "bootstrap/dist/css/bootstrap.css";
createApp(App).use(store).use(router).mount("#app");
