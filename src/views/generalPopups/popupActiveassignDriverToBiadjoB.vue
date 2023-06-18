<template>
  <div class="w-full bg-img vx-row no-gutter items-center justify-center ">
    <div class="vx-row">
      <!-- <div class="vx-col md:w-1/2 sm:w-1/2 w-full">
        <label class="text-sm opacity-75">{{ $t("BiadjoNumber") }}</label>
        <vs-input
          type="Number"
          name="BiadjoNumber"
          class="w-full"
          v-model="Conflicted_data.Biadjo_B"
        />
        <span class="text-danger text-sm" v-show="errors.has('id')">
          {{ errors.first("id") }}
        </span>
      </div> -->
      <div class="vx-col w-full">
        <label class="text-sm opacity-75">{{ $t("DriverID") }}</label>
        <vs-input
          type="text"
          name="DriverId"
          class="w-full"
          v-model="Conflicted_data.DriverId"
        />
        <span class="text-danger text-sm" v-show="errors.has('DriverId')">
          {{ errors.first("DriverId") }}
        </span>
      </div>
      <div class="vx-row" style="padding: 20px; margin: auto;">
        <vs-button
          @click="
            assignDriverToBiadjo(
              Conflicted_data.Biadjo_B,
              Conflicted_data.DriverId
            )
          "
          :disabled="!ValidateForm"
          color="primary"
          type="filled"
          >{{ $t("Assign") }}</vs-button
        >
        <vs-button
          icon-pack="feather"
          icon="icon-close"
          @click="ClosePopup"
          class="mr-2 ml-2"
          >{{ $t("Cancel") }}</vs-button
        >
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    Conflicted_data: {
      type: Object
    }
  },
  computed: {
    ValidateForm() {
      return (
        !this.errors.any() &&
        this.Conflicted_data.Biadjo_B !== "" &&
        this.Conflicted_data.DriverId !== "" &&
        this.Conflicted_data.Biadjo_B !== null &&
        this.Conflicted_data.DriverId !== null
      );
    }
  },
  methods: {
    ClosePopup() {
      this.$emit("ClosePopup");
    },

    assignDriverToBiadjo() {
      if (!this.ValidateForm) {
        window.showError();
        return;
      }
      // this.Conflicted_data.AdminUserId = JSON.parse(
      //   localStorage.getItem("userInfo")
      // ).Id;

      this.$emit(
        "assignDriverToBiadjo",
        this.Conflicted_data.Biadjo_B,
        this.Conflicted_data.DriverId
      );
      this.Conflicted_data.DriverId = "";
    }
  }
};
</script>
