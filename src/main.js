import Vue from "vue";
import App from "./App.vue";

// Vuesax Component Framework
import Vuesax from "vuesax";
import "material-icons/iconfont/material-icons.css"; //Material Icons
import "vuesax/dist/vuesax.css"; // Vuesax
import numeral from "numeral";
import numFormat from "vue-filter-number-format";
Vue.use(Vuesax);
Vue.filter("numFormat", numFormat(numeral));

import moment from "moment";

Vue.filter("formatDate", function(value) {
  if (value) {
    return moment(String(value)).format("DD/MM/YYYY HH:mm:ss");
  }
});

// Dex Express
import "jquery-ui/themes/base/all.css";
import "devextreme/dist/css/dx.common.css";
import "devextreme/dist/css/dx.light.css";
import "@devexpress/analytics-core/dist/css/dx-analytics.common.css";
import "@devexpress/analytics-core/dist/css/dx-analytics.light.css";
import "devexpress-reporting/dist/css/dx-webdocumentviewer.css";

// Vue Print
import VueHtmlToPaper from "vue-html-to-paper";

const options = {
  name: "_blank",
  specs: ["fullscreen=yes", "titlebar=yes", "scrollbars=yes"],
  styles: [""]
};

Vue.use(VueHtmlToPaper, options);

// or, using the defaults with no stylesheet
Vue.use(VueHtmlToPaper);

//Idle timeout
import IdleVue from "idle-vue";

const eventsHub = new Vue();

Vue.use(IdleVue, {
  eventEmitter: eventsHub,
  store,
  idleTime: 8 * 60 * 60 * 1000, // 30 seconds,
  startAtIdle: false
});

// axios
import axios from "./axios.js";
Vue.prototype.$http = axios;

// API Calls
import "./http/requests";

// Theme Configurations
import "../themeConfig.js";

// autocomplete html disable v-select and make it readonly
// import DisableAutocomplete from "vue-disable-autocomplete";

// Vue.use(DisableAutocomplete);

// ACL
import acl from "./acl/acl";

// Globally Registered Components
import "./globalComponents.js";

// Styles: SCSS
import "./assets/scss/main.scss";

// Tailwind
import "@/assets/css/main.css";

// Vue Router
import router from "./router";

// Vuex Store
import store from "./store/store";

// i18n
import i18n from "./i18n/i18n";

// Vuexy Admin Filters
import "./filters/filters";

// Clipboard
import VueClipboard from "vue-clipboard2";
Vue.use(VueClipboard);

// VeeValidate
import VeeValidate from "vee-validate";
Vue.use(VeeValidate);
/*eslint-disable */
VeeValidate.Validator.extend("lowCase", {
  getMessage: field => `The password must contain at least: 1 lowercase letter`,
  validate: value => {
    var strongRegex = new RegExp("^(?=.*[a-z])");
    return strongRegex.test(value);
  }
});
VeeValidate.Validator.extend("UpCase", {
  getMessage: field => `The password must contain at least: 1 uppercase letter`,
  validate: value => {
    var strongRegex = new RegExp("^(?=.*[A-Z])");
    return strongRegex.test(value);
  }
});

VeeValidate.Validator.extend("number", {
  getMessage: field => `The password must contain at least: 1 number`,
  validate: value => {
    var strongRegex = new RegExp("^(?=.*[0-9])");
    return strongRegex.test(value);
  }
});
VeeValidate.Validator.extend("SpecialChar", {
  getMessage: field =>
    `The password must contain at least: 1 special character`,
  validate: value => {
    var strongRegex = new RegExp("^(?=.*[!@#$%^&*])");
    return strongRegex.test(value);
  }
});
/* eslint-enable*/
// if ("serviceWorker" in navigator) {
//   window.addEventListener("load", () => {
//     navigator.serviceWorker
//       .register("../../sw_cached.js")
//       .then(() => console.log("Registered"))
//       .catch(err => console.log(`Err : ${err}`));
//   });
// }
// Vue Hotkey
import VueHotkey from "v-hotkey";

Vue.use(VueHotkey);

//Vue-Select
import vSelect from "vue-select";
Vue.component("v-select", vSelect);

import ECharts from "vue-echarts";
import "echarts/lib/chart/bar";
import "echarts/lib/component/tooltip";
import "echarts-gl";
// register component to use
Vue.component("v-chart", ECharts);

// Vuejs - Vue wrapper for hammerjs
import { VueHammer } from "vue2-hammer";
Vue.use(VueHammer);

import VueTelInput from "vue-tel-input";

Vue.use(VueTelInput);
// PrismJS
import "prismjs";
import "prismjs/themes/prism-tomorrow.css";

// Feather font icon
require("./assets/css/iconfont.css");

// Vue ScrollTo
var VueScrollTo = require("vue-scrollto");

Vue.use(VueScrollTo, {
  container: "body",
  duration: 3000,
  easing: "ease",
  offset: 0,
  force: true,
  cancelable: true,
  onStart: false,
  onDone: false,
  onCancel: false,
  x: false,
  y: true
});
// Vue select css
// Note: In latest version you have to add it separately
// import 'vue-select/dist/vue-select.css';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  acl,
  render: h => h(App)
}).$mount("#app");
