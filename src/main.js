import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { auth } from "./services/firebase";
import { onAuthStateChanged } from "firebase/auth";

let app;
onAuthStateChanged(auth, () => {
  if (!app) {
    app = createApp(App);
    app.use(router);
    app.mount("#app");
  }
});
