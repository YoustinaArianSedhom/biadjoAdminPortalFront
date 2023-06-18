<template>
  <div class="w-full bg-img vx-row no-gutter items-center justify-center">
    <div style="padding: 20px; margin: auto">
      <div class="vx-col w-full">
        <label class="text-sm opacity-75">{{ $t("BiadjoNumber") }}</label>
        <vs-input
          class="w-full"
          name="BiadjoNumber"
          v-model="PopupModel.Price"
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
      :active.sync="EditOfferPopup"
    >
      <div class="vx-row">
        <div class="vx-col md:w-1/2 sm:w-1/2 w-full">
          <label class="text-lg opacity-75"
            >{{ $t("OfferWillSendWithValue") }} :
            {{ this.PopupModel.Price | numFormat("###,##0.00") }}
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
      EditOfferPopup: false
    };
  },
  computed: {
    validatePopupModel() {
      return (
        !this.errors.any() &&
        this.PopupModel.BiadjoRequestID !== "" &&
        this.PopupModel.DriverID !== "" &&
        this.PopupModel.Price !== "" &&
        this.PopupModel.Price !== null
      );
    }
  },
  methods: {
    OpenSecoundPopup() {
      this.$emit("ClosePopup");
      this.EditOfferPopup = true;
    },
    closeTwoPopups() {
      this.EditOfferPopup = false;
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
      this.$vs.loading();
      var Model = {};
      Model.Price = this.PopupModel.Price;
      Model.DriverId = this.PopupModel.DriverID;
      Model.BiadjoId = this.PopupModel.BiadjoRequestID;
      Model.AdminUserId = this.PopupModel.AdminUserId;

      this.$store
        .dispatch("BiadjoList/UpdateOfferPrice", Model)
        .then(response => {
          if (response.status == 200) {
            this.$vs.loading.close();
            window.showSuccess();
            this.closeTwoPopups();
            this.$emit("Refresh");
          }
        })
        .catch(() => {
          this.closeTwoPopups();
          this.$vs.loading.close();
          window.showError();
          this.PopupModel.Price = "";
          this.$emit("Refresh");
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
