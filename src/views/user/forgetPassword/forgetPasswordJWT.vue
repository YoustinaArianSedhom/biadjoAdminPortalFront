<template>
  <div>
    <div class="vx-row">
      <!-- Country -->
      <!-- <div class="vx-col w-full mt-6">
        <label class="text-sm opacity-75">{{ $t("Country") }}</label>
        <v-select
          v-validate="'required'"
          label="Country"
          class=" w-full"
          name="Country"
          @input="CheckCountry"
          v-model="ForgetPasswordModel.CountryCode"
          :reduce="CountryCode => CountryCode.CountryCode"
          :options="Country"
          :dir="$vs.rtl ? 'rtl' : 'ltr'"
          style="padding-bottom: 0 !important"
        />
        <span v-if="IsEmpty" class="text-danger text-sm">{{
          this.CountryErrorMessage
        }}</span>
      </div> -->
      <!-- User Email -->
      <div class="vx-col w-full mt-6">
        <label class="text-sm opacity-75">{{ $t("Email") }}</label>
        <vs-input
          v-validate="'required|email'"
          name="Email"
          icon-no-border
          icon="icon icon-user"
          icon-pack="feather"
          v-model="ForgetPasswordModel.Email"
          class="w-full "
        />
        <span class="text-danger text-sm">{{ errors.first("Email") }}</span>
      </div>
    </div>
    <div>
      <!-- ResetPassword -->
      <vs-button
        :disabled="!validateForm"
        @click="ForgetPasswordJWT"
        class="px-4 w-full md:w-auto mt-5 flex float-right"
        >{{ $t("ResetPassword") }}</vs-button
      >
    </div>
  </div>
</template>

<script>
// import axios from "@/axios.js";
export default {
  data() {
    return {
      ForgetPasswordModel: {
        Email: ""
      },
      CountryErrorMessage: "",
      IsEmpty: false
    };
  },
  computed: {
    Country() {
      return this.$store.state.CountryList.Country;
    },
    validateForm() {
      return !this.errors.any() && this.ForgetPasswordModel.Email != "";
    }
  },

  methods: {
    checkLogin() {
      if (this.$store.state.auth.isUserLoggedIn()) {
        this.$vs.notify({
          title: "Login Attempt",
          text: "You are already logged in!",
          iconPack: "feather",
          icon: "icon-alert-circle",
          color: "warning"
        });

        return false;
      }
      return true;
    },
    ForgetPasswordJWT() {
      if (!this.checkLogin()) {
        return;
      }

      this.$vs.loading();

      this.$store
        .dispatch("auth/ForgotPasswordJWT", this.ForgetPasswordModel)
        .then(() => {
          this.$vs.loading.close();
          window.showCheckEmail();
          this.$router.push(
            this.$router.currentRoute.query.to || "/user/user/login"
          );
        })
        .catch(Error => {
          if (Error.status == 400) {
            if (Error.data.error == "Email Address not Foud") {
              this.$vs.notify({
                title: this.$t("Error"),
                text: this.$t("EmailError"),
                iconPack: "feather",
                icon: "icon-alert-circle",
                color: "danger"
              });
            }
            if (Error.data.error == "Wrong Contry") {
              this.$vs.notify({
                title: this.$t("Error"),
                text: this.$t("CountryError"),
                iconPack: "feather",
                icon: "icon-alert-circle",
                color: "danger"
              });
            }
          } else {
            this.$vs.notify({
              title: this.$t("Error"),
              text: this.$t("GeneralError"),
              iconPack: "feather",
              icon: "icon-alert-circle",
              color: "warn"
            });
          }
          this.$vs.loading.close();
        });
    }
  },
  created() {}
};
</script>
