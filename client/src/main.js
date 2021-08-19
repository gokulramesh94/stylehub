import { createApp } from "vue";
import router from "./routes";
import store from "./store";
import App from "./App.vue";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";


library.add(fas);

createApp(App)
  .component("FontAwesomeIcon", FontAwesomeIcon)
  .use(router)
  .use(store)
  .mount("#app");
  
