<template>
  <div class="w-full bg-img vx-COL no-gutter items-center justify-center">
    <div class="vx-row">
      <!-- <span
        style="margin: auto"
        class="text-center"
        v-show="
          BiadjoStatus == 'BS1' ||
            BiadjoStatus == 'BS2' ||
            BiadjoStatus == 'BS3' ||
            BiadjoStatus == 'BS12' 
        "
      >
        <h3>{{ $t("THereIsNoCancelationFees") }}</h3></span
      > -->
      <!-- Cancel With Fees -->
      <span
        style="margin: auto"
        class="text-center"
        v-show="
          BiadjoStatus == 'BS4' ||
            BiadjoStatus == 'BS5' ||
            BiadjoStatus == 'BS6' ||
            BiadjoStatus == 'BS7' ||
            BiadjoStatus == 'BS8' ||
            BiadjoStatus == 'BS9' ||
            BiadjoStatus == 'BS10'
        "
      >
        <h3>
          {{ $t("YourCancelationFeesIs") }} :
          {{ BiadjoCancelationFee | numFormat("###,##0.00") }}
          {{ $t(BiadjoCountryCode + "_Currency") }}
        </h3>
        <!-- <h3 v-else>
          {{ $t("showError") }}
        </h3> -->
      </span>
    </div>

    <div class="vx-row" style="padding-top: 20px">
      <vs-button
        style="margin: auto"
        icon-pack="feather"
        icon="icon-close"
        @click="cancelBiadjo"
        >{{ $t("CancelBiadjo") }}</vs-button
      >
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      CancelBiadjo: {
        BiadjoID: null,
        BiadjoCancelationFee: null,
        AdminUserId: null
      }
    };
  },
  props: {
    FormData: {
      type: Number
    },
    BiadjoCancelationFee: {
      type: [String, Number]
    },
    BiadjoStatus: {
      type: String
    },
    BiadjoCountryCode: {
      type: String
    }
  },
  computed: {
    validateFormData() {
      return (
        !this.errors.any() &&
        this.FormData !== "" &&
        this.FormData !== null &&
        this.BiadjoCancelationFee !== null &&
        this.BiadjoCancelationFee !== ""
      );
    }
  },
  methods: {
    ClosePopup() {
      this.$emit("ClosePopup");
    },

    cancelBiadjo() {
      if (!this.validateFormData) {
        window.showFillData();
        return;
      }

      this.$vs.loading();
      this.CancelBiadjo.BiadjoID = this.FormData;
      this.CancelBiadjo.BiadjoCancelationFee = this.BiadjoCancelationFee;

      this.CancelBiadjo.AdminUserId = JSON.parse(
        localStorage.getItem("userInfo")
      ).Id;

      this.$store
        .dispatch("BiadjoList/cancelBiadjo", this.CancelBiadjo)
        .then(response => {
          if (response.status == 200) {
            this.$vs.loading.close();
            window.showSuccess();
            location.reload("/");
          } else {
            this.$vs.loading.close();
            window.showError;
            location.reload("/");
          }
        })
        .catch(() => {
          this.$vs.loading.close();
          window.showError();
          location.reload("/");
        });
    }
  }
};
</script>
