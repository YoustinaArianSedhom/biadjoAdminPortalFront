<template>
  <div class="w-full bg-img vx-row no-gutter items-center justify-center">
    <div class="vx-row">
      <div class="vx-col  w-full">
        <label class="text-sm opacity-75">{{ $t("Discount") }}</label>
        <vs-input
          @keypress="isNumber($event)"
          :min="0"
          :max="100"
          class="w-full"
          name="Discount"
          type="Number"
          icon-pack="feather"
          icon="icon-percent"
          v-model="Discount"
          v-validate="'required|max_value:100'"
        />
        <span class="text-danger text-sm" v-show="errors.has('Discount')">
          {{ errors.first("Discount") }}
        </span>
      </div>

      <div class="vx-row pt-4 m-auto">
        <vs-button
          @click="AddDiscount"
          color="primary"
          class="mr-4 mb-2"
          type="filled"
          :disabled="!validateModelSendOffer"
          >{{ $t("AddDiscount") }}</vs-button
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
      ModelSendOffer: {},
      Discount: ""
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
      return !this.errors.any() && this.Discount !== "";
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
    },

    AddDiscount() {
      if (!this.validateModelSendOffer) {
        window.showError();
        return;
      }
      this.$vs.loading();
      this.ModelSendOffer.Discount = this.Discount;
      this.ModelSendOffer.BiadjoId = this.BiadjoId;
      let userInfo = JSON.parse(localStorage.getItem("userInfo"));
      this.ModelSendOffer.AdminUserId = userInfo.Id;
      this.$store
        .dispatch("BiadjoList/AddDiscount", this.ModelSendOffer)
        .then(response => {
          if (response.status == 200) {
            window.showSuccess();
            this.$emit("ClosePopup");
            this.$vs.loading.close();
            this.Discount = "";
            this.$emit("Refresh");
          }
        })
        .catch(() => {
          window.showError();
          this.$emit("ClosePopup");
          this.$vs.loading.close();
          this.Discount = "";
          this.$emit("Refresh");
        });
    }
  }
};
</script>
