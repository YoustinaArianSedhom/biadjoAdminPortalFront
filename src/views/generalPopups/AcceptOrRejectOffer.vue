<template>
  <div class="w-full bg-img vx-row no-gutter items-center justify-center">
    <div style="padding: 20px; margin: auto">
      <div v-if="result.Approval == 'R'" class="vx-col w-full">
        <h3>
          {{ $t("Areyoushureyouwanttoremovethisoffer") }}
        </h3>
      </div>
      <div v-else class="vx-col w-full">
        <h3>
          {{ $t("Areyoushureyouwanttoacceptthisoffer") }}
        </h3>
      </div>

      <div class="vx-row" style="padding: 20px; margin: auto">
        <vs-button
          @click="SubmitOffer()"
          color="primary"
          class="mr-4 mb-2"
          type="filled"
          >{{ $t("Submit") }}</vs-button
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
import moduleBiadjo from "@/store/biadjo/moduleBiadjo.js";

export default {
  props: {
    result: {
      type: Object
    }
  },
  data() {
    return {};
  },

  methods: {
    ClosePopup() {
      this.$emit("ClosePopup");
    },
    SubmitOffer() {
      this.$vs.loading();
      var Model = {};
      Model.BiadjoId = this.result.BiadjoId;
      Model.DriverId = this.result.DriverId;
      Model.Approval = this.result.Approval;
      // Model.AdminUserId = this.result.AdminUserId;

      this.$store
        .dispatch("BiadjoList/AcceptOrRejectOffer", Model)
        .then(response => {
          if (response.status == 200) {
            this.$vs.loading.close();
            window.showSuccess();
            this.$emit("Refresh");
          }
        })
        .catch(() => {
          this.$vs.loading.close();
          window.showError();
          this.result.Price = "";
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
