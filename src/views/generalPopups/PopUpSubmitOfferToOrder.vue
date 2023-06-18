<template>
  <div class="w-full bg-img vx-row no-gutter items-center justify-center">
    <div class="vx-row">
      <div class="vx-col md:w-1/2 sm:w-1/2 w-full">
        <label class="text-sm opacity-75">{{ $t("Offer") }}</label>
        <vs-input
          class="w-full"
          type="Number"
          name="Offer"
          v-model="Offer"
          @keypress="isNumber($event)"
          icon-after
          :icon="$t(`${CountryCode}_Currency`)"
        />
        <span class="text-danger text-sm" v-show="errors.has('Offer')">
          {{ errors.first("Offer") }}
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
  </div>
</template>
<script>
export default {
  data() {
    return {
      Offer: "",
      ModelSendOffer: {}
    };
  },
  props: {
    BiadjoId: {
      type: [Number, String]
    },
    SubmitedOrderID: {
      type: [Number, String]
    },
    DriverId: {
      type: [Number, String]
    },
    CountryCode: {
      type: [Number, String]
    }
  },
  computed: {
    validateModelSendOffer() {
      return !this.errors.any() && this.Offer !== "";
    }
  },
  methods: {
    isNumber: function(evt) {
      evt = evt || window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        evt.preventDefault();
      } else {
        return true;
      }
    },
    ClosePopup() {
      this.$emit("ClosePopup");
      this.ViewSubmitOfferPopup = false;
    },

    SubmitOrder() {
      if (!this.validateModelSendOffer) {
        window.showError();
        return;
      }
      this.$vs.loading();

      this.ModelSendOffer.DriverId = this.DriverId;
      this.ModelSendOffer.SubmitedOrderID = this.SubmitedOrderID;
      this.ModelSendOffer.BiadjoId = this.BiadjoId;
      this.ModelSendOffer.Offer = this.Offer;
      let userInfo = JSON.parse(localStorage.getItem("userInfo"));
      this.ModelSendOffer.AdminUserId = userInfo.Id;
      this.$store
        .dispatch("DriverList/SubmitOfferToOrder", this.ModelSendOffer)
        .then(response => {
          if (response.status == 200) {
            this.ClosePopup();
            this.$vs.loading.close();
            this.$emit("Refresh");
            window.showAddDriverToBiadjoSuccess();
          }
        })
        .catch(() => {
          this.ClosePopup();
          this.$vs.loading.close();
          this.$emit("Refresh");
          window.showError();
        });

      this.Offer = "";
    }
  }
};
</script>
