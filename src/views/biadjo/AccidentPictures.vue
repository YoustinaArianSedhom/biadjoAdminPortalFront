<template>
  <div id="page-Biadjo-view">
    <vs-row vs-type="flex">
      <div
        class="centerx con-example-images"
        v-for="img in FormData"
        :key="img"
      >
        <div
          class="con-img m-2"
          v-viewer="{
            toolbar: true,
            navbar: true,
            title: false,
            transition: true,
            keyboard: true,
            zoomable: true,
            scalable: true,
          }"
        >
          <img
            :src="img"
            width="300"
            height="500"
            class="square-full shadow-md cursor-pointer block"
          />
        </div>
      </div>
    </vs-row>

    <vs-button
      class="flex float-right mr-20"
      type="border"
      color="warning"
      icon-pack="feather"
      @click="Back"
      >{{ $t("Back") }}</vs-button
    >
  </div>
</template>

<script>
/* eslint-disable */
import moduleBiadjo from "@/store/biadjo/moduleBiadjo.js";
import JsonFile from "@/http/requests/auth/jwt/JsonFile.json";
var CryptoJS = require("crypto-js");
import "viewerjs/dist/viewer.css";
import Viewer from "v-viewer";
import Vue from "vue";
Vue.use(Viewer);

export default {
  data() {
    return {
      FormData: {},
      //   options: {
      //     inline: false,
      //     button: false,
      //     navbar: false,
      //     title: false,
      //     toolbar: false,
      //     tooltip: false,
      //     movable: false,
      //     zoomable: false,
      //     rotatable: false,
      //     scalable: true,
      //     transition: true,
      //     fullscreen: true,
      //     keyboard: false,
      //     url: 'data-source'
      //   },
    };
  },
  methods: {
    Back() {
      this.$router.go(-1);
    },
    decrypt(input) {
      let fileExtension = input.fileName.substr(0, input.fileName.length - 4);
      var input = JSON.parse(input.fileData);
      var iv = CryptoJS.enc.Base64.parse(input.iv).toString(CryptoJS.enc.Hex);
      iv = CryptoJS.enc.Hex.parse(iv);

      var Pass = CryptoJS.enc.Utf8.parse(JsonFile.EncryptionPassword);
      var Salt = CryptoJS.enc.Base64.parse(input.salt);

      var key = CryptoJS.PBKDF2(Pass.toString(CryptoJS.enc.Utf8), Salt, {
        keySize: JsonFile.keySize,
        iterations: JsonFile.Iterations,
      });

      var decrypted = CryptoJS.AES.decrypt(input.cipherText, key, {
        mode: CryptoJS.mode.CBC,
        iv: iv,
        padding: CryptoJS.pad.Pkcs7,
      });

      let StringDecrypt = decrypted.toString(CryptoJS.enc.Utf8);

      fileExtension = fileExtension.split(".").pop();

      var Image = `data:image/${fileExtension};base64,` + StringDecrypt;
      return Image;
    },
  },
  created() {
    this.$vs.loading();
    if (!moduleBiadjo.isRegistered) {
      this.$store.registerModule("BiadjoList", moduleBiadjo);
      moduleBiadjo.isRegistered = true;
    }
    var Biadjo = {};
    Biadjo.BiadjoID = this.$route.params.Id;
    this.$store
      .dispatch("BiadjoList/GetAccidentPicturesBiadjo", Biadjo)
      .then((response) => {
        if (response.data.length > 0) {
          for (let i = 0; i < response.data.length; i++) {
            response.data[i] = this.decrypt(response.data[i]);
          }
          this.FormData = response.data;
          this.$vs.loading.close();
        } else {
          this.$vs.loading.close();
          window.showNoRecords();
        }
      })
      .catch(() => {
        this.$vs.loading.close();
        window.showError();
      });
  },
  mounted() {},
};
</script>
<style lang="scss">
#avatar-col {
  width: 10rem;
}
#page-Biadjo-view {
  table {
    td {
      vertical-align: baseline !important;
      min-width: 140px;
      padding-bottom: 0.8rem;
      word-break: break-all;
    }

    &:not(.permissions-table) {
      td {
        @media screen and (max-width: 370px) {
          display: block;
        }
      }
    }
  }
}

@media screen and (min-width: 1201px) and (max-width: 1211px),
  only screen and (min-width: 636px) and (max-width: 991px) {
  #account-info-col-1 {
    width: calc(100% - 12rem) !important;
  }
}
</style>
