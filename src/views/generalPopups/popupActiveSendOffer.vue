<template>
  <div class="w-full bg-img vx-row no-gutter items-center justify-center">
    <div class="vx-row">
      <div class="vx-col md:w-1/2 sm:w-1/2 w-full">
        <label class="text-sm opacity-75">{{ $t("DriverID") }}</label>
        <vs-input name="DriverID" v-model="DriverId" v-validate="'required'" />
        <span class="text-danger text-sm" v-show="errors.has('DriverID')">
          {{ errors.first("DriverID") }}
        </span>
      </div>
      <div class="vx-col md:w-1/2 sm:w-1/2 w-full">
        <label class="text-sm opacity-75">{{ $t("Price") }}</label>
        <vs-input
          type="Number"
          name="Price"
          v-model="Offer"
          v-validate="'required'"
        />
        <span class="text-danger text-sm" v-show="errors.has('Price')">
          {{ errors.first("Price") }}
        </span>
      </div>

      <div class="vx-row pt-4 m-auto">
        <vs-button
          @click="OpenNewPopup"
          color="primary"
          class="mr-4 mb-2"
          type="filled"
          :disabled="!validateModelSendOffer"
          >{{ $t("SubmitOffer") }}</vs-button
        >
        <vs-button
          @click="ClosePopup"
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
      :active.sync="popupActiveSubmitOffer"
    >
      <div class="vx-row">
        <div class="vx-col w-full m-auto">
          <label class="text-xl opacity-75"
            >{{ $t("OfferWillSendWithValue") }}:{{ this.Offer }}
            <!-- {{ $t(FormData.CountryCode + "_Currency") }} -->
          </label>
        </div>
        <div class="vx-row pt-4 m-auto">
          <vs-button
            @click="SubmitOffer()"
            color="primary"
            class="mr-4 mb-2"
            type="filled"
            >{{ $t("Send") }}</vs-button
          >
          <vs-button
            @click="ClosePopup"
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
export default {
  data() {
    return {
      popupActiveSubmitOffer: false,
      Offer: "",
      ModelSendOffer: {},
      DriverId: ""
    };
  },
  props: {
    BiadjoId: {
      type: [Number, String]
    },
    UserId: {
      type: [Number, String]
    }
  },
  computed: {
    validateModelSendOffer() {
      return !this.errors.any() && this.DriverId !== "" && this.Offer !== "";
    }
  },
  methods: {
    ClosePopup() {
      this.$emit("ClosePopup");
      this.popupActiveSubmitOffer = false;
    },
    OpenNewPopup() {
      this.$emit("ClosePopup");
      this.popupActiveSubmitOffer = true;
    },
    SubmitOffer() {
      if (!this.validateModelSendOffer) {
        window.showError();
        return;
      }
      this.ModelSendOffer.DriverId = this.DriverId;
      this.ModelSendOffer.BiadjoId = this.BiadjoId;
      this.ModelSendOffer.UserId = this.UserId;
      this.ModelSendOffer.Offer = this.Offer;
      let userInfo = JSON.parse(localStorage.getItem("userInfo"));
      this.ModelSendOffer.AdminUserId = userInfo.Id;
      this.$store
        .dispatch("BiadjoList/SubmitOfferToBiadjo", this.ModelSendOffer)
        .then(response => {
          if (response.status == 200) {
            window.showAddDriverToBiadjoSuccess();
            this.popupActiveSubmitOffer = false;
            this.DriverId = "";
            this.Offer = "";
          }
        })
        .catch(() => {
          window.showError();
          this.popupActiveSubmitOffer = false;
          this.DriverId = "";
          this.Offer = "";
        });
    }
  }
};
</script>
