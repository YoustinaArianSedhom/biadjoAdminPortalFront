<template>
  <div class="w-full bg-img vx-row no-gutter items-center justify-center">
    <div style="padding: 20px; margin: auto">
      <div class="vx-col w-full">
        <label class="text-sm opacity-75">{{ $t("BiadjoNumber") }}</label>
        <vs-input
          class="w-full"
          name="BiadjoNumber"
          v-model="PopupModel.BiadjoId"
        />
        <span class="text-danger text-sm" v-show="errors.has('id')">
          {{ errors.first("id") }}
        </span>
      </div>
      <div class="vx-col">
        <label class="text-sm opacity-75">{{ $t("DriverID") }}</label>
        <vs-input
          class="w-full"
          name="DriverID"
          v-model="PopupModel.DriverId"
        />
        <span class="text-danger text-sm" v-show="errors.has('id')">
          {{ errors.first("id") }}
        </span>
      </div>
      <div class="vx-col">
        <label class="text-sm opacity-75">{{ $t("Offer") }}</label>
        <vs-input
          class="w-full"
          type="Number"
          name="Offer"
          v-model="PopupModel.Offer"
          icon-after
          :icon="$t(`${PopupModel.CountryCode}_Currency`)"
        />

        <span class="text-danger text-sm" v-show="errors.has('id')">
          {{ errors.first("id") }}
        </span>
      </div>
      <div class="vx-row" style="padding: 20px; margin: auto">
        <vs-button
          @click="OpenSecoundPopup()"
          color="primary"
          class="mr-4 mb-2"
          type="filled"
          :disabled="!validatePopupModel"
          >{{ $t("SubmitOffer") }}</vs-button
        >
        <vs-button
          @click="ClosePopup()"
          color="primary"
          type="filled"
          class="mr-4 mb-2"
          >{{ $t("Cancel") }}</vs-button
        >
      </div>
    </div>
    <vs-popup
      classContent="popup-example"
      v-bind:title="$t('SubmitOffer')"
      :active.sync="popupActiveCompanySubmitOffer"
    >
      <div class="vx-row">
        <div class="vx-col md:w-1/2 sm:w-1/2 w-full">
          <label class="text-sm opacity-75"
            >{{ $t("OfferWillSendWithValue") }}:{{
              this.PopupModel.Offer | numFormat("###,##0.00")
            }}
            {{ $t(PopupModel.CountryCode + "_Currency") }}
          </label>
        </div>

        <div class="vx-row" style="padding: 20px; margin: auto">
          <vs-button
            @click="SubmitOffer()"
            color="primary"
            class="mr-4 mb-2"
            type="filled"
            >{{ $t("Send") }}</vs-button
          >
          <vs-button
            @click="closeTwoPopups()"
            color="primary"
            type="filled"
            class="mr-4 mb-2"
            >{{ $t("Cancel") }}</vs-button
          >
        </div>
      </div>
    </vs-popup>
  </div>
</template>
<script>
import moduleBiadjo from "@/store/biadjo/moduleBiadjo.js";

export default {
  props: {
    PopupModel: {
      type: Object
    }
  },
  data() {
    return {
      ModelSendOffer: {},
      CompanySubmitOffer: false,
      popupActiveCompanySubmitOffer: false
    };
  },
  computed: {
    validatePopupModel() {
      return (
        !this.errors.any() &&
        this.PopupModel.BiadjoID !== "" &&
        this.PopupModel.Offer !== "" &&
        this.PopupModel.Offer !== null
      );
    }
  },
  methods: {
    OpenSecoundPopup() {
      this.$emit("ClosePopup");
      this.popupActiveCompanySubmitOffer = true;
    },
    closeTwoPopups() {
      this.popupActiveCompanySubmitOffer = false;
      this.$emit("ClosePopup");
    },
    ClosePopup() {
      this.$emit("ClosePopup");
    },
    SubmitOffer() {
      if (!this.validatePopupModel) {
        window.showError();
        return;
      }
      var Biadjo = {};
      Biadjo.id = this.PopupModel.BiadjoId;
      this.$store
        .dispatch("BiadjoList/GetBiadjoByid", Biadjo)
        .then(response => {
          if (response.status == 200) {
            this.ModelSendOffer.UserId = response.data[0].UserId;
            this.ModelSendOffer.DriverId = this.PopupModel.DriverId;
            this.ModelSendOffer.BiadjoId = this.PopupModel.BiadjoId;

            this.ModelSendOffer.Offer = this.PopupModel.Offer;
            let userInfo = JSON.parse(localStorage.getItem("userInfo"));
            this.ModelSendOffer.AdminUserId = userInfo.Id;
            this.$store
              .dispatch("BiadjoList/SubmitOfferToBiadjo", this.ModelSendOffer)
              .then(response => {
                if (response.status == 200) {
                  this.ClosePopup();
                  this.closeTwoPopups();

                  window.showAddDriverToBiadjoSuccess();
                  this.PopupModel.Offer = "";
                }
              })
              .catch(() => {
                this.closeTwoPopups();

                window.showError();
                this.PopupModel.Offer = "";
              });
          }
        });
    }
  },
  created() {
    if (!moduleBiadjo.isRegistered) {
      this.$store.registerModule("BiadjoList", moduleBiadjo);
      moduleBiadjo.isRegistered = true;
    }
  }
};
</script>
