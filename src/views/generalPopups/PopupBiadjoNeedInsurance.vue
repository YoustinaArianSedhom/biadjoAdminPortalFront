<template>
  <div class="w-full bg-img vx-row no-gutter items-center justify-center ">
    <div class="vx-col w-full no-gutter items-center justify-center">
      <div class="vx-row no-gutter items-center justify-center">
        <label class=" text-sm opacity-75">{{ $t("InsurancePolicyNo") }}</label>
      </div>
      <div class="vx-row no-gutter items-center justify-center">
        <vs-input
          name="Price"
          v-model="ModelAddnIsurance.InsurancePolicyNo"
          v-validate="'required'"
        />
        <span
          class="text-danger text-sm"
          v-show="errors.has('InsurancePolicyNo')"
        >
          {{ errors.first("InsurancePolicyNo") }}
        </span>
      </div>
    </div>

    <div class="vx-row pt-4 m-auto">
      <vs-button
        @click="AddInsurancePolictToBiadjo()"
        color="primary"
        class="mr-4 mb-2"
        type="filled"
        :disabled="!validateModelAddnIsurance"
        >{{ $t("AddInsurance") }}</vs-button
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
</template>
<script>
export default {
  props: {
    ModelAddnIsurance: {
      type: Object
    }
  },
  computed: {
    validateModelAddnIsurance() {
      return (
        !this.errors.any() &&
        this.ModelAddnIsurance.InsurancePolicyNo !== "" &&
        this.ModelAddnIsurance.InsurancePolicyNo !== null
      );
    }
  },
  methods: {
    ClosePopup() {
      this.$emit("ClosePopup");
    },
    AddInsurancePolictToBiadjo() {
      if (!this.validateModelAddnIsurance) {
        window.showError();
        return;
      }
      this.ModelAddnIsurance.AdminUserId = JSON.parse(
        localStorage.getItem("userInfo")
      ).Id;

      this.$emit("AddInsurancePolictToBiadjo", this.ModelAddnIsurance);
      this.ModelAddnIsurance.InsurancePolicyNo = "";
    }
  }
};
</script>
