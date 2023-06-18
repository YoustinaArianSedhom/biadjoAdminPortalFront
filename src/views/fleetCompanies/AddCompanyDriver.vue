<template>
  <div class="flex w-full vx-row items-center justify-center" id="">
    <div class="vx-col sm:w-1/2 md:w-1/2 lg:w-3/4 xl:w-3/5 sm:m-0 m-4">
      <vx-card>
        <div slot="no-body" class="full-page-bg-color">
          <div class="vx-row justify-center items-center">
            <div class="vx-col sm:w-full md:w-full lg:w-1/2 d-theme-dark-bg">
              <div class="px-2 pt-8 justify-center  login-tabs-container">
                <div class="w-full">
                  <div class=" mb-6 mt-1 w-full">
                    <label class="text-sm opacity-75">{{
                      $t("PhoneNumber")
                    }}</label>
                    <vue-tel-input
                      :dir="$vs.rtl ? 'ltr' : 'ltr'"
                      v-validate="'required'"
                      @change="onChange($event)"
                      v-bind="bindProps"
                      @onInput="onInput"
                      name="PhoneNo"
                      v-model="Model.PhoneNo"
                    >
                    </vue-tel-input>
                    <!-- <span class="text-danger text-sm"
                      >{{ errors.first("PhoneNo") }}
                    </span> -->
                    <span v-if="!isValid" class="text-danger text-sm">{{
                      $t("PhoneNumberIsNotValid")
                    }}</span>
                  </div>
                  <div class="vx-row">
                    <div class="vx-col w-2/3 m-auto">
                      <vs-button
                        class="w-full "
                        @click="AddDriverToCompany()"
                        :disabled="!isValid"
                      >
                        {{ $t("AddDriver") }}</vs-button
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </vx-card>
    </div>
  </div>
</template>

<script>
import moduleFleetCompanies from "@/store/fleetCompanies/moduleFleetCompanies.js";
import "vue-slider-component/theme/default.css";

export default {
  data() {
    return {
      isValid: false,
      Model: { PhoneNo: "" },
      Company: {
        PhoneNo: "",
        CompaneyId: ""
      },
      bindProps: {
        mode: "international",
        defaultCountry: "",
        disabledFetchingCountry: false,
        disabled: false,
        disabledFormatting: false,
        placeholder: "Enter a phone number",
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
  watch: {
    $route() {
      if (this.Dropdown) {
        this.Dropdown = false;
      }
    }
  },
  methods: {
    onInput({ number, isValid, country }) {
      this.bindProps.country = country;
      this.bindProps.number = number;
      this.isValid = isValid;
    },
    AddDriverToCompany() {
      this.$vs.loading();
      var driver = {};
      driver.CompaneyId = this.$route.params.Id;
      driver.PhoneNo = this.Model.PhoneNo.replace(/\s/g, "");
      driver.AdminUserId = JSON.parse(localStorage.getItem("userInfo")).Id;

      this.$store
        .dispatch("CompanyList/AddDriverToCompany", driver)
        .then(res => {
          if (res.status == 200) {
            this.$vs.loading.close();
            window.showDriverAddeddSuccessfuly();
          }
        })
        .catch(err => {
          if (err.status == 400) {
            if (err.data == 0) {
              window.showAlreadyExist();
              this.$vs.loading.close();
            } else {
              window.showError();
              this.$vs.loading.close();
            }
          } else {
            window.showError();
            this.$vs.loading.close();
          }
        });
    }
  },

  created() {
    if (!moduleFleetCompanies.isRegistered) {
      this.$store.registerModule("CompanyList", moduleFleetCompanies);
      moduleFleetCompanies.isRegistered = true;
    }
  }
};
</script>

<style lang="scss">
.login-tabs-container {
  min-height: 255px;

  .con-tab {
    padding-bottom: 14px;
  }

  .con-slot-tabs {
    margin-top: 1rem;
  }
}
</style>
