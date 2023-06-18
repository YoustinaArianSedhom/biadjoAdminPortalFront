<template>
  <div class="w-full bg-img vx-row no-gutter items-center justify-center">
    <div class="vx-row">
      <div class="vx-col md:w-1/2 sm:w-1/2 w-full">
        <label class="text-sm opacity-75">{{ $t("BiadjoNumber") }}</label>
        <vs-input
          type="Number"
          name="BiadjoNumber"
          v-model="Biadjo.BiadjoNumber"
        />
        <span class="text-danger text-sm" v-show="errors.has('id')">
          {{ errors.first("id") }}
        </span>
      </div>
      <div class="vx-row" style="padding: 20px; margin: auto">
        <vs-button
          :disabled="Biadjo.BiadjoNumber == '' || Biadjo.BiadjoNumber == null"
          @click="AssignBiadjo(Biadjo.BiadjoNumber)"
          color="primary"
          type="filled"
          >{{ $t("Assign") }}</vs-button
        >
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    Biadjo: {
      type: Object
    }
  },
  computed: {
    validateBiadjo() {
      return !this.errors.any() && this.Biadjo.BiadjoNumber !== "";
    }
  },
  methods: {
    ClosePopup() {
      this.$emit("ClosePopup");
    },

    AssignBiadjo() {
      if (!this.validateBiadjo) {
        window.showError();
        return;
      }
      // this.Biadjo.AdminUserId = JSON.parse(
      //   localStorage.getItem("userInfo")
      // ).Id;

      this.$emit("AssignBiadjo", this.Biadjo.BiadjoNumber);
    }
  }
};
</script>
