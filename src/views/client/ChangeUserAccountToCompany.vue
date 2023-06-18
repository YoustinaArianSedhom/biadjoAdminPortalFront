<!-- =========================================================================================
  File Name: clientView.vue
  Description: client View page
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/client/pixinvent
========================================================================================== -->

<template>
  <div id="page-user-view">
    <form>
      <vx-card class="mb-base">
        <div class="vx-row">
          <div
            class="vx-col sm:w-full md:w-1/2 lg:w-1/2 xl:w-1/2 sm:m-0"
            id="account-info-col-1"
          >
            <div class="vx-row m-4">
              <label class="text-sm opacity-75">{{ $t("CompanyName") }}</label>
              <vs-input
                class="w-full"
                v-model="FormData.CompanyName"
                v-validate="'required'"
                name="CompanyName"
              />
              <span
                class="text-danger text-sm"
                v-show="errors.has('CompanyName')"
                >{{ errors.first("CompanyName") }}</span
              >
            </div>
            <div class="vx-row m-4">
              <label class="text-sm opacity-75">{{
                $t("CompanyPhoneNo")
              }}</label>
              <vue-tel-input
                class="w-full"
                v-model="FormData.CompanyPhoneNo"
                v-validate="'required'"
                name="CompanyPhoneNo"
                :dir="$vs.rtl ? 'ltr' : 'ltr'"
                v-bind="bindProps"
                @onInput="onInput"
              >
              </vue-tel-input>
              <span v-if="!isValid" class="text-danger text-sm">{{
                $t("InvalidPhoneNumber")
              }}</span>
            </div>
            <div class="vx-row m-4">
              <label class="text-sm opacity-75">{{ $t("Email") }}</label>
              <vs-input
                class="w-full"
                v-model="FormData.Email"
                v-validate="'required|email'"
                name="Email"
              />
              <span class="text-danger text-sm" v-show="errors.has('Email')">{{
                errors.first("Email")
              }}</span>
            </div>
          </div>

          <div
            class="vx-col sm:w-full md:w-1/2 lg:w-1/2 xl:w-1/2 sm:m-0"
            id="account-info-col-2"
          >
            <div class="vx-row m-4">
              <label class="text-sm opacity-75">{{ $t("City") }}</label>
              <vs-input
                class="w-full"
                v-model="FormData.City"
                v-validate="'required'"
                name="City"
              />
              <span class="text-danger text-sm" v-show="errors.has('City')">{{
                errors.first("City")
              }}</span>
            </div>

            <div class="vx-row m-4">
              <label class="text-sm opacity-75">{{ $t("State") }}</label>
              <vs-input
                class="w-full"
                v-model="FormData.State"
                v-validate="'required'"
                name="State"
              />
              <span class="text-danger text-sm" v-show="errors.has('State')">{{
                errors.first("State")
              }}</span>
            </div>
            <div class="vx-row m-4">
              <label class="text-sm opacity-75">{{ $t("Address") }}</label>
              <vs-input
                class="w-full"
                v-model="FormData.Address"
                v-validate="'required'"
                name="Address"
              />
              <span
                class="text-danger text-sm"
                v-show="errors.has('Address')"
                >{{ errors.first("Address") }}</span
              >
            </div>
            <div class="vx-row m-4">
              <label class="text-sm opacity-75">{{ $t("ZipCode") }}</label>

              <vs-input
                class="w-full"
                v-model="FormData.ZibCode"
                v-validate="'required'"
                name="ZibCode"
              />
              <span
                class="text-danger text-sm"
                v-show="errors.has('ZibCode')"
                >{{ errors.first("ZibCode") }}</span
              >
            </div>
          </div>
          <div class="vx-row w-full m-2" id="account-manage-buttons">
            <div class="mb-2 mt-2 ">
              <vs-button
                class="mr-4"
                @click="save_changes"
                :disabled="!validateForm"
              >
                {{ $t("SaveChanges") }}
              </vs-button>
            </div>
            <div class="mb-2 mt-2 ">
              <vs-button
                class="mr-4"
                type="border"
                color="warning"
                icon-pack="feather"
                @click="Back"
                >{{ $t("Back") }}</vs-button
              >
            </div>
          </div>
        </div>
      </vx-card>
    </form>
  </div>
</template>
<script>
import moduleClient from "@/store/client/moduleClient.js";

export default {
  data() {
    return {
      bindProps: {
        mode: "international",
        defaultCountry: "",
        disabledFetchingCountry: false,
        disabled: false,
        disabledFormatting: false,
        required: true,
        enabledCountryCode: true,
        enabledFlags: true,
        preferredCountries: ["EG", "US"],
        onlyCountries: [],
        ignoredCountries: [],
        placeholder: "",
        autocomplete: "on",
        name: "telephone",
        maxLen: 20,
        wrapperClasses: "",
        inputClasses: "",
        dropdownOptions: {
          disabledDialCode: true
        }
      },
      isValid: true,
      isThisValid: true,
      FormData: {}
    };
  },
  computed: {
    validateForm() {
      return (
        !this.errors.any() &&
        this.FormData.CompanyName != "" &&
        this.FormData.CompanyName != null &&
        this.FormData.CompanyPhoneNo != "" &&
        this.FormData.CompanyPhoneNo != null &&
        // this.FormData.UserPhoneNo != "" &&
        // this.FormData.UserPhoneNo != null &&
        this.FormData.Email != "" &&
        this.FormData.Email != null &&
        this.FormData.Address != "" &&
        this.FormData.Address != null &&
        this.FormData.City != "" &&
        this.FormData.City != null &&
        this.FormData.State != "" &&
        this.FormData.State != null &&
        this.FormData.ZibCode != "" &&
        this.FormData.ZibCode != null &&
        this.isValid == true &&
        this.isThisValid == true
      );
    }
  },
  methods: {
    onInput({ number, isValid, country }) {
      this.bindProps.number = number;
      this.isValid = isValid;
      this.bindProps.country = country;
    },

    Back() {
      this.$router.go(-1);
    },

    save_changes() {
      if (!this.validateForm) {
        window.showFillData();
        return;
      }
      this.$vs.loading();
      // this.FormData.UserPhoneNo = this.$router.mob;

      this.FormData.UserPhoneNo = this.FormData.UserPhoneNo.replace(/\s/g, "");
      this.FormData.CompanyPhoneNo = this.FormData.CompanyPhoneNo.replace(
        /\s/g,
        ""
      );
      this.$store
        .dispatch("ClientList/ChangeUserAccountToCompany", this.FormData)
        .then(response => {
          if (response.status == 200) {
            this.$vs.loading.close();
            window.showSuccess();
            this.$router.push({
              name: "ClientCompanyDetails",
              params: { Id: response.data }
            });
          }
        })
        .catch(error => {
          this.$vs.loading.close();
          this.$vs.notify({
            title: this.$t("Error"),
            text: error.response.data,
            iconPack: "feather",
            icon: "icon-alert-circle",
            color: "danger"
          });
        });
    }
  },
  created() {
    if (!moduleClient.isRegistered) {
      this.$store.registerModule("ClientList", moduleClient);
      moduleClient.isRegistered = true;
    }
    this.FormData.UserPhoneNo = this.$route.params.mob;
  }
};
</script>
