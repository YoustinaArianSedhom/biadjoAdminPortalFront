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
          @click="assignDriverToBiadjo"
          color="primary"
          class="mr-4 mb-2"
          type="filled"
          :disabled="!validateModelSendOffer"
          >{{ $t("AssignBiadjoToDriver") }}</vs-button
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
      popupActiveSubmitOrder: false,
      Offer: "",
      Model: {},
      DriverId: ""
    };
  },
  props: {
    BiadjoId: {
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
    assignDriverToBiadjo() {
      let Biadjo = {};
      Biadjo.BiadjoId = this.BiadjoId;
      Biadjo.DriverId = this.DriverId;
      Biadjo.AdminUserId = JSON.parse(localStorage.getItem("userInfo")).Id;
      this.$store
        .dispatch("BiadjoList/AssignDriverToBiadjo", Biadjo)
        .then(response => {
          if (response.status == 200) {
            window.showAddDriverToBiadjoSuccess();
            this.ClosePopup();
            this.$emit("Refresh");
          }
        })
        .catch(Error => {
          // window.showError();
          this.$vs.notify({
            color: "danger",
            position: "right-bottom",
            title: this.$t("Error"),
            text: this.$t(Error.response.data.Error)
          });
          this.ClosePopup();
          this.$emit("Refresh");
        });
    }
  }
};
</script>
