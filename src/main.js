import Vue from "vue";
import App from "./App";

import VueKonva from "vue-konva";

Vue.use(VueKonva);

/* eslint-disable no-new */
new Vue({
  VueKonva,
  render: h => h(App),
}).$mount("#app");
