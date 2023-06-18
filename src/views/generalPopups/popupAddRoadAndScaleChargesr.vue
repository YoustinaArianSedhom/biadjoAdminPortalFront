<template>
  <div class="w-full bg-img vx-row no-gutter items-center justify-center">
    <div class="vx-row">
      <div class="vx-col  w-full">
        <label class="text-sm opacity-75">{{ $t("Value") }}</label>
        <vs-input
          name="Value"
          type="Number"
          v-model="Value"
          v-validate="'required'"
        />
        <span class="text-danger text-sm" v-show="errors.has('Value')">
          {{ errors.first("Value") }}
        </span>
      </div>
      <div class="vx-row pt-4 m-auto">
        <vs-button
          icon-pack="feather"
          icon="icon-close"
          @click="OpenSecoundPopup()"
          :disabled="!validateRoadAndScaleCharges"
          class="mr-2 mb-2"
          >{{ $t("AddRoadAndScaleCharges") }}</vs-button
        >
        <vs-button @click="ClosePopup" class="mr-2 mb-2">{{
          $t("Cancel")
        }}</vs-button>
      </div>
    </div>

    <vs-popup
      classContent="popup-example"
      v-bind:title="$t('RoadAndScaleCharges')"
      :active.sync="popupActiveRoadAndScaleCharges"
    >
      <div class="vx-row">
        <div class="vx-col w-full">
          <label class="text-xl"
            >{{ $t("AddRoadAndScaleCharges") }}:{{
              this.Value | numFormat("###,##0.00")
            }}
            {{ $t(BiadjoCountryCode + "_Currency") }}
          </label>
        </div>

        <div class="vx-row" style="padding: 20px; margin: auto">
          <vs-button
            @click="AddRoadAndScaleCharges()"
            color="primary"
            class="mr-4 mb-2"
            type="filled"
            >{{ $t("Confirm") }}</vs-button
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
export default {
  components: {},
  props: {
    // RoadAndScaleCharges: {
    //   type: Object
    // },
    BiadjoId: {
      type: [Number, String]
    },
    BiadjoCountryCode: {
      type: [Number, String]
    }
    // Value: {
    //   type: [Number, String]
    // }
  },
  data() {
    return {
      Value: null,
      RoadAndScaleCharges: {},
      popupActiveRoadAndScaleCharges: false
    };
  },
  computed: {
    validateRoadAndScaleCharges() {
      return !this.errors.any() && this.Value !== null;
    }
  },
  methods: {
    OpenSecoundPopup() {
      this.$emit("ClosePopup");
      this.popupActiveRoadAndScaleCharges = true;
    },
    closeTwoPopups() {
      this.popupActiveRoadAndScaleCharges = false;
      this.$emit("ClosePopup");
    },
    ClosePopup() {
      this.$emit("ClosePopup");
    },
    AddRoadAndScaleCharges() {
      if (!this.validateRoadAndScaleCharges) {
        return;
      }
      this.$vs.loading();
      debugger;
      this.RoadAndScaleCharges.BiadjoId = this.BiadjoId;
      this.RoadAndScaleCharges.Value = parseInt(this.Value);
      this.popupAddRoadAndScaleChargesr = false;
      this.RoadAndScaleCharges.AdminUserId = JSON.parse(
        localStorage.getItem("userInfo")
      ).Id;
      this.$store
        .dispatch("BiadjoList/AddRoadAndScaleCharges", this.RoadAndScaleCharges)
        .then(response => {
          if (response.status == 200) {
            this.$vs.loading.close();
            window.showSuccess();
            this.closeTwoPopups();
            this.$emit("Refresh");
            this.Value = null;
          } else {
            this.$vs.loading.close();
            this.closeTwoPopups();

            window.showError();
            this.Value = null;
            this.$emit("Refresh");
          }
          this.$vs.loading.close();
        })
        .catch(() => {
          this.$vs.loading.close();
          this.closeTwoPopups();

          window.showError();
          this.Value = null;
          this.$emit("Refresh");
        });
    }
  }
};
</script>
