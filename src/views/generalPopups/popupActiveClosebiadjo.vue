<template>
  <div class="w-full bg-img vx-row no-gutter items-center justify-center">
    <div class="vx-col">
      <div>
        <star-rating
          :rtl="$vs.rtl"
          :increment="0.5"
          v-model="CloseBiadjo.Rating"
        ></star-rating>
      </div>
      <div class="vx-row">
        <vs-button
          icon-pack="feather"
          icon="icon-close"
          @click="closeBiadjo"
          class="mr-2 mb-2"
          >{{ $t("CloseBiadjo") }}</vs-button
        >
        <vs-button @click="ClosePopup" class="mr-2 mb-2">{{
          $t("Cancel")
        }}</vs-button>
      </div>
    </div>
  </div>
</template>
<script>
import StarRating from "vue-star-rating";
export default {
  components: {
    StarRating
  },
  props: {
    CloseBiadjo: {
      type: Object
    }
  },
  data() {
    return {
      Rating: ""
    };
  },
  computed: {
    validateCloseBiadjo() {
      return !this.errors.any() && this.CloseBiadjo.Rating !== "";
    }
  },
  methods: {
    ClosePopup() {
      this.$emit("ClosePopup");
    },

    closeBiadjo() {
      if (!this.validateCloseBiadjo) {
        return;
      }
      this.$vs.loading();

      this.CloseBiadjo.BiadjoID = this.$route.params.Id;
      this.popupActiveClosebiadjo = false;
      this.CloseBiadjo.AdminUserId = JSON.parse(
        localStorage.getItem("userInfo")
      ).Id;

      this.$store
        .dispatch("BiadjoList/closeBiadjo", this.CloseBiadjo)
        .then(response => {
          if (response.status == 200) {
            this.$vs.loading.close();
            window.showSuccess();

            location.reload("/");
          } else {
            this.$vs.loading.close();
            window.showError();
          }
          this.$vs.loading.close();
        })
        .catch(() => {
          this.$vs.loading.close();
          window.showError();
        });
    }
  }
};
</script>
