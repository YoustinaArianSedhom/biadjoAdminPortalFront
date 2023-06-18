<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
// import themeConfig from "@/../themeConfig.js";
import jwt from "@/http/requests/auth/jwt/index.js";
import moduleDashboard from "@/store/dashboard/moduleDashboard.js";
import moduleDriver from "@/store/driver/moduleDriver.js";

import { Howl } from "howler";
import firebase from "firebase/app";
import "firebase/messaging";
export default {
  data() {
    return {
      CurrentStatus: null,
      RotationPoint: null
    };
  },
  watch: {
    "$store.state.theme"(val) {
      this.toggleClassInBody(val);
    },
    "$vs.rtl"(val) {
      document.documentElement.setAttribute("dir", val ? "rtl" : "ltr");
    }
  },
  methods: {
    FcmStart() {
      var config = {
        apiKey: "AIzaSyDVxcAS9EWP-Pc8Pu0Bi84WtHFZu7PePVk",
        authDomain: "biadjo-1546341863949.firebaseapp.com",
        databaseURL: "https://biadjo-1546341863949.firebaseio.com",
        projectId: "biadjo-1546341863949",
        storageBucket: "biadjo-1546341863949.appspot.com",
        messagingSenderId: "1058566822933",
        appId: "1:1058566822933:web:ba286bb9d92214e83d421c",
        measurementId: "G-1HC49S7B6H"
      };
      firebase.initializeApp(config);

      var messaging = firebase.messaging();

      messaging.usePublicVapidKey(
        "BHifL1PykXA3YBKzKJQERNau4OdyXP2Xj1Sarqqs2Kl5q4z9lcUK7n0EsTxknRkx8gtylQqKAJFGQIrv4PD_jK4"
      );

      messaging
        .requestPermission()
        .then(() => {
          messaging.getToken().then(token => {
            messaging.onMessage(
              payload => {
                switch (payload.data.controller) {
                  case "logout":
                    this.$store.dispatch("auth/logout");

                    break;
                  case "reset":
                    location.reload("/");

                    break;

                  // case "changeCountry":
                  //   break;
                  case "GoTo":
                    this.$router.push({ name: payload.data.routeName });

                    break;
                }
                if (!payload.data.controller) {
                  this.$store.commit("UPDATE_NotificationList", payload);
                }
              },
              e => {
                console.log(e);
              }
            );
            this.saveNotificationToken(token);
          });
        })
        .catch(err => {
          console.log("Unable to get permission to notify.", err);
        });
    },
    saveNotificationToken(token) {
      var Obj = {};

      Obj.FCMToken = token;
      // Obj.UserId = this.$store.state.AppActiveUser.Id;
      Obj.Id = this.$store.state.AppActiveUser.Id;

      this.$store.dispatch("auth/UpdateFCMToken", Obj).then(() => {
        this.$store.dispatch("auth/refreshCurrentUser");
      });
    },
    /* eslint-disable */
    checkAndAttachMapScriptGoogleMaps(callback) {
      if (!!window.google) {
        // If you're using vue cli, then directly checking
        // 'google' obj will throw an error at the time of transpiling.
        callback();
        return true;
      }
      window.mapApiInitialized = callback;
      let script = document.createElement("script");
      let language = this.$i18n.locale;
      let region = JSON.parse(
        localStorage.getItem("userInfo")
      ).countrycode.toUpperCase();
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAoTlXgH1pKuHPcbZsrIijQV0T_Tr926UE&hl=ar&libraries=places,geometry&language=${language}
      &region=${region}&callback=mapApiInitialized`;
      script.defer = true;
      script.async = true;
      document.body.appendChild(script);
    },

    checkAndAttachMapScript() {
      let initialized = !!window.google;
      return new Promise(async (resolve, reject) => {
        if (initialized) {
          return resolve(window.google);
        }

        initialized = true;
        window.mapApiInitialized = () => resolve(window.google);
        let language = await this.$i18n.locale;
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAoTlXgH1pKuHPcbZsrIijQV0T_Tr926UE&libraries=places,geometry&language=${language}&callback=mapApiInitialized`;
        script.async = true;
        script.defer = true;
        script.onload = () => {
          resolve(window.google);
        };
        // script.onerror = () => reject(new Error("Script load error: " + src));
        document.body.appendChild(script);
      });
    },
    /* eslint-enable */
    CheckForDriversWaitingForVerfication() {
      if (!moduleDriver.isRegistered) {
        this.$store.registerModule("DriverList", moduleDriver);
        moduleDriver.isRegistered = true;
      }

      var Model = {};
      Model.CountryCode = JSON.parse(
        localStorage.getItem("userInfo")
      ).countrycode;
      this.$store
        .dispatch("DriverList/WaitingForVerificationDrivers", Model)
        .then(res => {
          if (res.status == 200) {
            if (res.data.length > 0) {
              var sound = new Howl({
                src: require("@/assets/notification.mp3"),
                autoplay: true
                // loop: true
              });
              sound.play();
              this.$vs.notify({
                title: this.$t("AS6"),
                text:
                  this.$t("ThereISNumber") +
                  " " +
                  res.data.length +
                  " " +
                  this.$t("DriversWaitingForVerfication") +
                  " " +
                  this.$t("In") +
                  " " +
                  this.$t(Model.CountryCode) +
                  " " +
                  this.$t("ClickHere"),
                color: "primary",
                fixed: false,
                time: 8000,
                click: () => {
                  this.$router.push({ name: "WaitingForVerfication" });
                }
              });
            }
          }
        });
    },
    CheckForBiadjos() {
      if (!moduleDashboard.isRegistered) {
        this.$store.registerModule("Dashboard", moduleDashboard);
        moduleDashboard.isRegistered = true;
      }

      var Model = {};
      Model.CountryCode = JSON.parse(
        localStorage.getItem("userInfo")
      ).countrycode;
      this.$store
        .dispatch("Dashboard/TodayBiadojsForTodayperStatus", Model)
        .then(res => {
          if (res.status == 200) {
            res.data.forEach(element => {
              if (
                element.Key == "BS1" ||
                element.Key == "BS2" ||
                element.Key == "BS3"
              ) {
                if (element.Value > 0) {
                  var sound = new Howl({
                    src: require("@/assets/Biadjo.mp3"),
                    autoplay: true
                    // loop: true
                  });
                  sound.play();
                  this.$vs.notify({
                    title: this.$t("NewBiadjoRequest"),
                    text:
                      this.$t("ThereISNumber") +
                      " " +
                      element.Value +
                      " " +
                      this.$t("BiadjoStatus") +
                      " " +
                      this.$t(element.Key) +
                      " " +
                      this.$t("ClickHere"),
                    color: "primary",
                    fixed: false,
                    time: 8000,
                    click: () => {
                      this.$router.push({ name: "BiadjoSearch" });
                    }
                  });
                }
              }
            });
          }
        });
    },
    showFillData() {
      this.$vs.notify({
        color: "danger",
        position: "right-bottom",
        text: "Please fill all required data..."
      });
    },
    showError() {
      this.$vs.notify({
        color: "danger",
        position: "right-bottom",
        title: this.$t("Error"),
        text: this.$t("showError")
      });
    },
    showSuccessCreate() {
      this.$vs.notify({
        color: "primary",
        position: "top-center",
        title: this.$t("Create"),
        text: this.$t("RegisterCreatedSuccessfuly")
      });
    },
    showAlreadyExist() {
      this.$vs.notify({
        color: "warning",
        position: "bottom-center",
        title: this.$t("AlreadyExist"),
        text: this.$t("ThisUserAlreadyExist")
      });
    },
    showAddDriverToBiadjoSuccess() {
      this.$vs.notify({
        color: "primary",
        position: "top-center",
        title: this.$t("AssignToDriver"),
        text: this.$t("Assign")
      });
    },
    showSuccess() {
      this.$vs.notify({
        color: "primary",
        position: "top-center",
        title: this.$t("Update"),
        text: this.$t("showUpdate")
      });
    },
    showSuccessAddNote() {
      this.$vs.notify({
        color: "primary",
        position: "top-center",
        title: this.$t("Update"),
        text: this.$t("SuccessAddNote")
      });
    },
    showDriverAddeddSuccessfuly() {
      this.$vs.notify({
        color: "primary",
        position: "top-center",
        title: this.$t("Success"),
        text: this.$t("DriverAddeddSuccessfuly")
      });
    },
    showNoRecords() {
      this.$vs.notify({
        color: "warning",
        position: "bottom-center",
        title: this.$t("Search"),
        text: this.$t("showNoDataAvailable")
      });
    },
    showCheckEmail() {
      this.$vs.notify({
        color: "primary",
        position: "top-center",
        title: this.$t("ResetPassword"),
        text: this.$t("showCheckEmail")
      });
    },
    showPasswordChanged() {
      this.$vs.notify({
        color: "primary",
        position: "top-center",
        title: this.$t("ResetPassword"),
        text: this.$t("showPasswordChanged")
      });
    },
    notAllowedToAccessCurrentPage(CurrentStatus) {
      if (
        CurrentStatus == "BS11" ||
        CurrentStatus == "BS13" ||
        CurrentStatus == "BS14" ||
        CurrentStatus == "BS15" ||
        CurrentStatus == "BS16" ||
        CurrentStatus == "SO3" ||
        CurrentStatus == "SO4" ||
        CurrentStatus == "CS2" ||
        CurrentStatus == "CS3" ||
        CurrentStatus == "PS1" ||
        CurrentStatus == "DPS1"
      ) {
        this.$router.go(-1);
      }
    },
    notAuthorizeToAccessCurrentPage(AccountType) {
      if (
        AccountType !== "AAT0" &&
        AccountType !== "AAT1" &&
        AccountType !== "AAT2" &&
        AccountType !== "AAT3" &&
        AccountType !== "AAT12" &&
        AccountType !== "AAT13"
      ) {
        this.$router.go(-1);
      }
    },
    InvalidImageType() {
      this.$vs.notify({
        color: "warning",
        position: "bottom-center",
        title: this.$t("InvalidType"),
        text: this.$t("InvalidImageType")
      });
    },
    toggleClassInBody(className) {
      if (className == "dark") {
        if (document.body.className.match("theme-semi-dark")) {
          document.body.classList.remove("theme-semi-dark");
        }
        document.body.classList.add("theme-dark");
      } else if (className == "semi-dark") {
        if (document.body.className.match("theme-dark")) {
          document.body.classList.remove("theme-dark");
        }
        document.body.classList.add("theme-semi-dark");
      } else {
        if (document.body.className.match("theme-dark")) {
          document.body.classList.remove("theme-dark");
        }
        if (document.body.className.match("theme-semi-dark")) {
          document.body.classList.remove("theme-semi-dark");
        }
      }
    },
    handleWindowResize() {
      this.$store.commit("UPDATE_WINDOW_WIDTH", window.innerWidth);
    },
    handleScroll() {
      this.$store.commit("UPDATE_WINDOW_SCROLL_Y", window.scrollY);
    },
    ErrorData() {
      this.$vs.notify({
        color: "danger",
        position: "bottom-center",
        text: this.$t("PleaseEnterAllData")
      });
    },
    onCopy() {
      this.$vs.notify({
        text: this.$t("TextCopiedSuccessfully"),
        color: "success",
        iconPack: "feather",
        position: "top-center",
        icon: "icon-check-circle"
      });
    },
    StartLoading() {
      this.$vs.loading();
    },
    CloseLoading() {
      this.$vs.loading.close();
    }
  },
  mounted() {
    this.toggleClassInBody(this.$store.state.theme);
    this.$store.commit("UPDATE_WINDOW_WIDTH", window.innerWidth);
    if (this.$store.state.auth.isUserLoggedIn()) {
      if (Notification.permission === "granted") {
        this.FcmStart();
      }
      if (Notification.permission === "default") {
        // If it's okay let's create a notification
        this.$vs.dialog({
          type: "confirm",
          color: "primary",
          title: this.$t("Notification"),
          text: this.$t("PleaseAllowNotification"),
          accept: this.FcmStart,
          cancel: this.FcmStart,
          cancelText: this.$t("Cancel"),
          acceptText: this.$t("Save")
        });
      }
      // if (Notification.permission === "denied") {
      //   // If it's okay let's create a notification
      //   this.$vs.notify({
      //     title: this.$t("Notification"),
      //     text: this.$t("PleaseAllowNotification"),
      //     color: "warning",
      //     position: "top-center",
      //     iconPack: "feather",
      //     icon: "icon-bell"
      //   });
      // }
    }
  },
  async created() {
    this.$store.commit("UpdateSessionExpired", false);
    try {
      setInterval(() => {
        if (this.$store.state.auth.isUserLoggedIn()) {
          // this.CheckForBiadjos();
          this.CheckForDriversWaitingForVerfication();
        }
      }, 5 * 60 * 1000);
    } catch {
      /* eslint-disable */
    }
    // jwt
    jwt.init();
    if (this.$store.state.auth.isUserLoggedIn()) {
      this.$store
        .dispatch("auth/refreshCurrentUser")
        .then(response => {
          if (response.data.status == "AS1") {
            this.$acl.change(response.data.accounttype);
          }
          if (response.data.status != "AS1") {
            this.$store.commit("CLEAR_USER_INFO", null, { root: true });
            this.$store.commit("REMOVE_USER_STORE", null, { root: true });
            this.$store.dispatch("auth/logout");
          }
        })
        .catch(() => {
          this.$store.commit("CLEAR_USER_INFO", null, { root: true });
          this.$store.commit("REMOVE_USER_STORE", null, { root: true });
          this.$store.dispatch("auth/logout");
        });
    }

    if (localStorage.getItem("SaveLang") === "ar") {
      this.$vs.rtl = true;
    }

    window.RotationPoint = this.RotationPoint;
    window.showError = this.showError;
    window.InvalidImageType = this.InvalidImageType;
    window.showFillData = this.showFillData;
    window.showSuccess = this.showSuccess;
    window.showAddDriverToBiadjoSuccess = this.showAddDriverToBiadjoSuccess;
    window.showNoRecords = this.showNoRecords;
    window.showCheckEmail = this.showCheckEmail;
    window.showPasswordChanged = this.showPasswordChanged;
    window.onCopy = this.onCopy;
    window.notAllowedToAccessCurrentPage = this.notAllowedToAccessCurrentPage;
    window.notAuthorizeToAccessCurrentPage = this.notAuthorizeToAccessCurrentPage;
    window.showSuccessCreate = this.showSuccessCreate;
    window.showAlreadyExist = this.showAlreadyExist;
    window.checkAndAttachMapScriptGoogleMaps = this.checkAndAttachMapScriptGoogleMaps;
    window.checkAndAttachMapScript = this.checkAndAttachMapScript;
    window.showDriverAddeddSuccessfuly = this.showDriverAddeddSuccessfuly;
    window.showSuccessAddNote = this.showSuccessAddNote;
    window.StartLoading = this.StartLoading;
    window.CloseLoading = this.CloseLoading;
    window.ErrorData = this.ErrorData;

    let dir = this.$vs.rtl ? "rtl" : "ltr";
    document.documentElement.setAttribute("dir", dir);

    window.addEventListener("resize", this.handleWindowResize);
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("resize", this.handleWindowResize);
    window.removeEventListener("scroll", this.handleScroll);
  }
};
</script>
<style scoped>
#loading-bg {
  width: 100%;
  height: 100%;
  background: transparent;
  display: block;
  position: absolute;
}

.loading-logo {
  position: absolute;
  left: calc(50% - 45px);
  top: 35%;
}

.loading {
  position: absolute;
  left: calc(50% - 35px);
  top: 50%;
  width: 55px;
  height: 55px;
  border-radius: 50%;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  border: 3px solid transparent;
}

.loading .effect-1,
.loading .effect-2 {
  position: absolute;
  width: 100%;
  height: 100%;
  border: 3px solid transparent;
  border-left: 3px solid rgba(121, 97, 249, 1);
  border-radius: 50%;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

.loading .effect-1 {
  animation: rotate 1s ease infinite;
}

.loading .effect-2 {
  animation: rotateOpacity 1s ease infinite 0.1s;
}

.loading .effect-3 {
  position: absolute;
  width: 100%;
  height: 100%;
  border: 3px solid transparent;
  border-left: 3px solid rgba(121, 97, 249, 1);
  -webkit-animation: rotateOpacity 1s ease infinite 0.2s;
  animation: rotateOpacity 1s ease infinite 0.2s;
  border-radius: 50%;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

.loading .effects {
  transition: all 0.3s ease;
}

@keyframes rotate {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(1turn);
    transform: rotate(1turn);
  }
}

@keyframes rotateOpacity {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
    opacity: 0.1;
  }
  100% {
    -webkit-transform: rotate(1turn);
    transform: rotate(1turn);
    opacity: 1;
  }
}
</style>
