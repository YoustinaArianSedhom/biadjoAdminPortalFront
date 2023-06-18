<!-- =========================================================================================
File Name: RegisterJWT.vue
Description: Register Page for JWT
----------------------------------------------------------------------------------------
Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div class="clearfix">
    <vs-input
      v-validate="'required|min:3'"
      name="FirstName"
      :placeholder="$t('FirstName')"
      v-model="Model.FirstName"
      class="LayoutCssPadding mt-1 w-full"
    />
    <span class="text-danger text-sm">{{ errors.first("FirstName") }}</span>

    <vs-input
      v-validate="'required|min:3'"
      name="LastName"
      :placeholder="$t('LastName')"
      v-model="Model.LastName"
      class="LayoutCssPadding mt-1 w-full"
    />
    <span class="text-danger text-sm">{{ errors.first("LastName") }}</span>

    <vs-input
      v-validate="'required|email'"
      name="Email"
      type="email"
      :placeholder="$t('Email')"
      v-model="Model.Email"
      class="LayoutCssPadding mt-1 w-full"
    />
    <span class="text-danger text-sm">{{ errors.first("Email") }}</span>

    <vue-tel-input
      @change="onChange($event)"
      @onInput="onInput"
      v-bind="bindProps"
      name="PhoneNo"
      class="LayoutCss mt-1 w-full"
      v-model="Model.PhoneNo"
    >
    </vue-tel-input>
    <span v-if="!isValid" class="text-danger text-sm"
      >Phone Number Is Not Valid</span
    >

    <v-select
      label="Country"
      class="mt-1 w-full"
      name="CountryCode"
      :placeholder="$t('Country')"
      v-model="Model.CountryCode"
      :reduce="CountryCode => CountryCode.CountryCode"
      :options="Country"
      v-validate="'required'"
      :dir="$vs.rtl ? 'rtl' : 'ltr'"
    />
    <v-select
      v-model="Model.AccountType"
      :reduce="Code => Code.Code"
      :placeholder="$t('AccountType')"
      class="mt-1 w-full"
      :options="this.$options.AccountTypeJSON"
      :dir="$vs.rtl ? 'rtl' : 'ltr'"
      :get-option-label="option => $t(option.Code)"
    ></v-select>

    <!-- <vs-checkbox v-model="isTermsConditionAccepted" class="mt-6">I accept the terms & conditions.</vs-checkbox> -->
    <!-- <vs-button type="border" to="/user/login/login" class="mt-6">Login</vs-button> -->
    <vs-button
      class="float-right mt-6"
      @click="registerUserJWt"
      :disabled="!validateForm"
      >{{ $t("Create") }}</vs-button
    >
  </div>
</template>

<script>
// import vueTelInput from './vue-tel-input.vue'
import AccountTypeJSON_JSON from "./../../driver/json/accountType.json";
// import moduleUser from "@/store/user/moduleUser.js";
import moduleCountry from "@/store/countrySetting/moduleCountry.js";

export default {
  AccountTypeJSON: AccountTypeJSON_JSON,
  props: {
    appendToBody: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      isMounted: false,
      isTermsConditionAccepted: true,
      placement: "top",
      Model: {
        FirstName: "",
        LastName: "",
        Email: "",
        PhoneNo: "",
        Country: "",
        CountryCode: "",
        AccountType: ""
      },
      isValid: true,
      bindProps: {
        mode: "international",
        defaultCountry: "",
        disabledFetchingCountry: false,
        disabled: false,
        disabledFormatting: false,
        placeholder: "",
        required: true,
        enabledCountryCode: true,
        enabledFlags: true,
        preferredCountries: ["EG", "US"],
        onlyCountries: [],
        ignoredCountries: [],
        autocomplete: "on",
        name: "telephone",
        maxLen: 20,
        wrapperClasses: "",
        inputClasses: "",
        dropdownOptions: {
          disabledDialCode: true
        },
        inputOptions: {
          showDialCode: false,
          tabindex: 0
        }
      }
    };
  },
  computed: {
    validateForm() {
      return (
        !this.errors.any() &&
        this.Model.FirstName !== "" &&
        this.Model.LasttName !== "" &&
        this.Model.Email !== "" &&
        this.Model.CountryCode !== "" &&
        this.Model.PhoneNo !== "" &&
        this.Model.AccountType !== ""
      );
    },
    Country() {
      return this.$store.state.CountryList.Country;
    }
  },

  methods: {
    onInput({ number, isValid, country }) {
      this.bindProps.number = number;
      this.isValid = isValid;
      this.bindProps.country = country;
    },
    checkLogin() {
      // If user is already logged in notify
      if (this.$store.state.auth.isUserLoggedIn()) {
        // Close animation if passed as payload
        // this.$vs.loading.close()

        this.$vs.notify({
          title: this.$t("LoginAttempt"),
          text: this.$t("Youarealreadyloggedin"),
          iconPack: "feather",
          icon: "icon-alert-circle",
          color: "warning"
        });

        return false;
      }
      return true;
    },
    registerUserJWt() {
      this.$vs.loading();
      if (!this.validateForm) {
        window.showFillData();
        return;
      }
      this.Model.PhoneNo = this.Model.PhoneNo.replace(/\s/g, "");
      this.ApiModel = this.Country.find(
        Country => Country.CountryCode === this.Model.CountryCode
      );
      this.Model.Country = this.ApiModel.Country;

      this.$store
        .dispatch("auth/registerUserJWT", this.Model)
        .then(res => {
          if (res.status == 200) {
            this.$vs.loading.close();
            window.showSuccessCreate();
          }
        })
        .catch(err => {
          if (err.response.status == 400) {
            if (err.response.data == 0) {
              this.$vs.loading.close();
              window.showAlreadyExist();
            }
            if (err.response.data == -1) {
              this.$vs.loading.close();
              window.showError();
            }
          }
        });
    }
  },
  created() {
    if (!moduleCountry.isRegistered) {
      this.$store.registerModule("CountryList", moduleCountry);
      moduleCountry.isRegistered = true;
    }
    this.$store.dispatch("CountryList/fetchAllCountriesList");
  },
  mounted() {
    this.isMounted = true;
  }
};
</script>

<style scoped>
.LayoutCss {
  margin-bottom: 20px;
}
.LayoutCssPadding {
  padding-bottom: 20px;
}
</style>
