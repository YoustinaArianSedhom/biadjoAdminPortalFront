<template>
  <div>
    <vs-alert
      color="danger"
      v-bind:title="$t('DriverNotFound')"
      :active.sync="ID_not_found"
    >
      <span>record with ID : {{ $route.params.DriverId }} not found. </span>
      <span>
        <span>Check </span
        ><router-link :to="{ name: 'Driver' }" class="text-inherit underline"
          >All Drivers</router-link
        >
      </span>
    </vs-alert>

    <vs-row v-if="Documents" vs-type="flex">
      <div
        class="centerx con-example-images"
        v-for="(item, index) in Documents"
        :key="index"
      >
        <div
          v-for="(value, key, index) in item"
          :key="key"
          class="con-img ml-3"
          v-viewer
          style="text-align: center"
        >
          <p class="text-2xl mb-2" v-if="index == 0">{{ $t(key) }}</p>

          <img
            v-if="index == 0"
            :src="value"
            :alt="key"
            width="300"
            height="500"
            class="square-full shadow-md cursor-pointer block"
          />
          <v-select
            v-if="index == 2"
            :reduce="Code => Code.Code"
            class="mt-1 w-full"
            :options="DocumentStatusJson"
            :dir="$vs.rtl ? 'rtl' : 'ltr'"
            :get-option-label="option => $t(option.Code)"
            :placeholder="$t('DocumentStatus')"
            v-model="item[key]"
            :ignoreAccent="true"
          >
          </v-select>
        </div>
        <div class="vx-col w-full">
          <vs-button
            class="ConfirmBtn beforeClickColor"
            @click="UpdateStatus(item, index)"
            :class="{ afterClick: isShown(index) }"
            type="filled"
            icon-pack="feather"
            :icon="`icon-check`"
            >{{ $t("Confirm") }}</vs-button
          >
        </div>
      </div>
    </vs-row>
  </div>
</template>

<script>
import moduleDriver from "@/store/driver/moduleDriver.js";
import DocumentStatus_JSON from "./json/documentStatus.json";
var CryptoJS = require("crypto-js");
import "viewerjs/dist/viewer.css";
import Viewer from "v-viewer";
import Vue from "vue";
import JsonFile from "@/http/requests/auth/jwt/JsonFile.json";

Vue.use(Viewer);

export default {
  /* eslint-disable */
  data() {
    return {
      show: [],
      DocumentStatusJson: DocumentStatus_JSON,
      AdminUserId: "",
      PersonalPicture: null,
      Documents: {},
      ID_not_found: false,
      NoImageFound: require("@/assets/images/NoDocumentUploaded.png")
    };
  },
  created() {
    this.$vs.loading();
    this.AdminUserId = JSON.parse(localStorage.getItem("userInfo")).Id;
    if (!moduleDriver.isRegistered) {
      this.$store.registerModule("DriverList", moduleDriver);
      moduleDriver.isRegistered = true;
    }
    var Model = {};
    Model.DriverId = this.$route.params.DriverId;

    this.$store
      .dispatch("DriverList/GetDocumentById", Model)
      .then(response => {
        if (response.status === 200) {
          // if (response.data.length > 0) {

          for (let i = 0; i < response.data.length; i++) {
            response.data[i][Object.keys(response.data[i])[0]] = this.decrypt(
              response.data[i][Object.keys(response.data[i])[0]]
            ); //returns 'someVal'
          }
          this.Documents = response.data;
          this.Documents.forEach((element, i) => {
            if (element[Object.keys(response.data[i])[2]] == "DS3") {
              this.changeShow(i);
            }
          });
          this.$vs.loading.close();
        }
      })
      .catch(() => {
        this.$vs.loading.close();
        window.showError();
      });
  },
  methods: {
    isShown(i) {
      return this.show[i];
    },
    changeShow(i) {
      if (!this.show[i]) {
        Vue.set(this.show, i, !this.show[i]);
      }
    },
    setIcon(Status) {
      switch (Status) {
        case "DS3":
          return "check-circle";
          break;
        default:
          return "check";
          break;
      }
    },
    setBtnColor(Status) {
      switch (Status) {
        case "DS1":
          return "warning";
          break;
        case "DS2":
          return "primary";
          break;
        case "DS3":
          return "success";
          break;
        case "DS4":
          return "danger";
          break;
      }
    },
    decrypt(input) {
      var input = JSON.parse(input);
      var iv = CryptoJS.enc.Base64.parse(input.iv).toString(CryptoJS.enc.Hex);
      iv = CryptoJS.enc.Hex.parse(iv);

      var Pass = CryptoJS.enc.Utf8.parse(JsonFile.EncryptionPassword);
      var Salt = CryptoJS.enc.Base64.parse(input.salt);

      var key = CryptoJS.PBKDF2(Pass.toString(CryptoJS.enc.Utf8), Salt, {
        keySize: JsonFile.keySize,
        iterations: JsonFile.Iterations
      });

      var decrypted = CryptoJS.AES.decrypt(input.cipherText, key, {
        mode: CryptoJS.mode.CBC,
        iv: iv,
        padding: CryptoJS.pad.Pkcs7
      });

      var XX = decrypted.toString(CryptoJS.enc.Utf8);

      var xxxx = CryptoJS.enc.Base64.parse(XX);

      this.PersonalPicture = "data:image/jpg;base64," + XX;
      return this.PersonalPicture;
    },
    UpdateStatus(item, index) {
      var item = item;
      this.$vs.loading();
      var DocumentDetails = {};
      DocumentDetails.DriverId = this.$route.params.DriverId;
      DocumentDetails.DocType = Object.keys(item)[0];
      DocumentDetails.Status = Object.values(item)[2];

      this.Documents.DriverId = this.$route.params.DriverId;
      DocumentDetails.AdminUserId = this.AdminUserId;
      this.$store
        .dispatch("DriverList/updateDocumentStatusByID", DocumentDetails)
        .then(response => {
          if (response.status == 200) {
            this.changeShow(index);
            this.$vs.loading.close();
            window.showSuccess();
          }
        })
        .catch(() => {
          this.$vs.loading.close();
          window.showError();
        });
    },
    confirmChangeStatus() {
      this.$vs.dialog({
        type: "confirm",
        color: "#27ABBE",
        title: this.$t("ConfirmChange"),
        text: this.$t("YouAreAboutToChangeDocumentStatus"),
        accept: this.save_changes,
        acceptText: this.$t("Save")
      });
    }
  }
};
</script>

<style scoped>
.ConfirmBtn {
  margin: auto;
  margin-top: 3px !important;
}

.centerx {
  padding: 20px;
}

.vs-radio-primary {
  padding-left: 15px !important;
}
</style>
<style>
.beforeClickColor {
}
.afterClick {
  background-color: #28c76f !important;
}
[dir="rtl"] .viewer-container {
  direction: ltr;
  right: 0;
  left: 0;
}
</style>
