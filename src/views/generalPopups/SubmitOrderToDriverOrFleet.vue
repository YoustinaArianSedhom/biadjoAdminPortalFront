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

      <div class="vx-row pt-4 m-auto">
        <vs-button
          @click="SubmitOrder"
          color="primary"
          class="mr-4 mb-2"
          type="filled"
          :disabled="!validateModelSendOffer"
          >{{ $t("SubmitOrder") }}</vs-button
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
    <!-- <vs-popup
      classContent="popup-example"
      v-bind:title="$t('SubmitOrder')"
      :active.sync="popupActiveSubmitOrder"
    >
      <div class="vx-row">
        <div class="vx-col w-full">
          <label class="text-sm opacity-75"
            >{{ $t("OfferWillSendWithValue") }}:{{ this.Offer }}

          </label>
        </div>
        <div class="vx-row pt-4 m-auto">
          <vs-button
            @click="SubmitOrder()"
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
    </vs-popup> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      popupActiveSubmitOrder: false,
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
      return !this.errors.any() && this.DriverId !== "";
    }
  },
  methods: {
    ClosePopup() {
      this.$emit("ClosePopup");
      this.SubmitOrderToDriverOrFleet = false;
    },

    SubmitOrder() {
      this.$vs.loading();
      if (!this.validateModelSendOffer) {
        window.showError();
        return;
      }
      this.ModelSendOffer.DriverId = this.DriverId;
      this.ModelSendOffer.BiadjoId = this.BiadjoId;
      this.ModelSendOffer.UserId = this.UserId;
      let userInfo = JSON.parse(localStorage.getItem("userInfo"));
      this.ModelSendOffer.AdminUserId = userInfo.Id;
      this.$store
        .dispatch("BiadjoList/SubmitOrderToDriverOrFleet", this.ModelSendOffer)
        .then(response => {
          if (response.status == 200) {
            this.ClosePopup();
            this.$vs.loading.close();
            window.showAddDriverToBiadjoSuccess();
            this.DriverId = "";
          }
        })
        .catch(() => {
          this.$vs.loading.close();
          window.showError();
          this.ClosePopup();
          this.DriverId = "";
        });
    }
  }
};
</script>
