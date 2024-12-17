import { createApp } from "vue";
import App from "./App.vue";
import { loadFull } from "tsparticles";
import Particles from "@tsparticles/vue3";

const app = createApp(App);

app.use(Particles, {
  init: loadFull,
});

app.mount("#app");
