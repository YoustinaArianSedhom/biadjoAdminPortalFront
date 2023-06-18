<template>
  <div id="page-client-view">
    <vs-alert
      color="danger"
      title="Company Not Found"
      :active.sync="company_not_found"
    >
      <!-- <span>company record with id: {{ userInfo.CompaneyId }} not found. </span> -->
    </vs-alert>
    <div id="company-data" v-if="company_data != undefined">
      <vx-card
        v-bind:title="$t('CompanyInfo')"
        class="mb-base"
        id="account-info"
      >
        <div class="vx-row">
          <div class="vx-col flex-1" id="account-info-col-1">
            <table>
              <tr>
                <td class="font-semibold">{{ $t("CompanyName") }}</td>
                <td>
                  <vs-input
                    v-validate="'required|min:3'"
                    name="CompanyName"
                    v-model="CompanyModel.CompanyName"
                    class="w-full"
                  />
                  <span class="text-danger text-sm">{{
                    errors.first("CompanyName")
                  }}</span>
                </td>
              </tr>

              <tr>
                <td class="font-semibold">{{ $t("Email") }}</td>
                <td>
                  <vs-input
                    v-validate="'email'"
                    name="Email"
                    icon-no-border
                    v-model="CompanyModel.Email"
                    class="w-full "
                  />
                  <span class="text-danger text-sm">{{
                    errors.first("Email")
                  }}</span>
                </td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("PhoneNumber") }}</td>
                <div class="td mb-3">
                  <vue-tel-input
                    :dir="$vs.rtl ? 'ltr' : 'ltr'"
                    @change="onChange($event)"
                    @onInput="onInput"
                    v-bind="bindProps"
                    v-validate="'required'"
                    name="PhoneNo"
                    v-model="CompanyModel.PhoneNo"
                  >
                  </vue-tel-input>
                  <span class="text-danger text-sm">{{
                    errors.first("PhoneNo")
                  }}</span>
                  <span v-if="!isValid" class="text-danger text-sm">{{
                    $t("PhoneNumberIsNotValid")
                  }}</span>
                </div>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("TaxID") }}</td>
                <td>
                  <vs-input
                    name="TaxID"
                    v-model="CompanyModel.TaxID"
                    class="w-full"
                  />
                </td>
              </tr>
              <tr>
                <td class="font-semibold">
                  {{ $t("CommercialRegistrationID") }}
                </td>
                <td>
                  <vs-input
                    name="CommercialRegistrationID"
                    v-model="CompanyModel.CommercialRegistrationID"
                    class="w-full"
                  />
                </td>
              </tr>
            </table>
          </div>
          <div class="vx-col flex-1" id="account-info-col-2">
            <table>
              <tr>
                <td class="font-semibold">{{ $t("Address") }}</td>
                <td>
                  <vs-input
                    name="Address"
                    v-model="CompanyModel.Address"
                    class="w-full"
                  />
                </td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("State") }}</td>
                <td>
                  <v-select
                    :get-option-label="option => $t(option[StateWithLocale])"
                    class="mt-1 w-full p-0"
                    v-validate="'required'"
                    name="State"
                    v-model="CompanyModel.State"
                    @input="GetCityList(CompanyModel.State)"
                    :reduce="admin1Name_en => admin1Name_en.admin1Name_en"
                    :options="StateList"
                    :dir="$vs.rtl ? 'rtl' : 'ltr'"
                  />

                  <span
                    class="text-danger text-sm"
                    v-show="errors.has('State')"
                    >{{ errors.first("State") }}</span
                  >
                  <!-- <vs-input
                    name="State"
                    v-model="CompanyModel.State"
                    class=" w-full"
                  /> -->
                </td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("City") }}</td>
                <td>
                  <v-select
                    :get-option-label="option => $t(option[CityWithLocale])"
                    class="mt-1 w-full p-0"
                    v-validate="'required'"
                    name="City"
                    v-model="CompanyModel.City"
                    :reduce="admin2Name_en => admin2Name_en.admin2Name_en"
                    :options="CityList"
                    :dir="$vs.rtl ? 'rtl' : 'ltr'"
                  />

                  <span
                    class="text-danger text-sm"
                    v-show="errors.has('City')"
                    >{{ errors.first("City") }}</span
                  >
                  <!-- <vs-input
                    name="City"
                    v-validate="'required'"
                    v-model="CompanyModel.City"
                    class=" w-full"
                  /> -->
                </td>
              </tr>

              <tr>
                <td class="font-semibold">{{ $t("ZipCode") }}</td>
                <td style="width:242px">
                  <vs-input
                    name="ZipCode"
                    v-model="CompanyModel.ZibCode"
                    class=" w-full"
                  />
                </td>
              </tr>
            </table>
          </div>

          <div class="vx-col w-full " id="account-manage-buttons">
            <div class="flex flex-wrap m-4">
              <div class="btn-group mb-2 mt-2 ">
                <vs-button
                  icon-pack="feather"
                  @click="SaveChanges"
                  class="mr-4"
                  icon="icon-edit"
                  :disabled="!validateForm"
                  >{{ $t("SaveChanges") }}</vs-button
                >
              </div>

              <div class="btn-group mb-2 mt-2 ">
                <vs-button
                  type="border"
                  color="warning"
                  icon-pack="feather"
                  @click="Back"
                  class="mr-4"
                >
                  {{ $t("Back") }}</vs-button
                >
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
import moduleCountry from "@/store/countrySetting/moduleCountry.js";

export default {
  data() {
    return {
      CityList: [],
      StateList: [],
      company_data: {},
      CompanyModel: {
        CompanyId: "",
        CompanyName: "",
        PhoneNo: "",
        Email: "",
        TaxID: "",
        CommercialRegistrationID: "",
        Addres: "",
        City: "",
        State: "",
        ZibCode: "",
        AdminUserId: ""
      },
      isValid: true,
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
      },
      company_not_found: false,
      userInfo: {}
    };
  },
  computed: {
    StateWithLocale() {
      let State = "admin1Name_en";
      if (this.$i18n.locale == "ar") {
        State = "admin1Name_ar";
      }
      return State;
    },
    CityWithLocale() {
      let City = "admin2Name_en";
      if (this.$i18n.locale == "ar") {
        City = "admin2Name_ar";
      }
      return City;
    },
    validateForm() {
      return (
        !this.errors.any() &&
        this.CompanyModel.CompanyName !== "" &&
        this.CompanyModel.Email !== "" &&
        this.CompanyModel.City !== "" &&
        this.CompanyModel.PhoneNo !== ""
      );
    }
  },
  methods: {
    GetCityList(StateName) {
      var Model = {};
      Model.StateName = StateName;
      this.$store
        .dispatch("CountryList/GetCityList", Model)
        .then(res => {
          debugger;
          this.CityList = res.data;
        })
        .catch(() => {});
    },
    onInput({ number, isValid, country }) {
      this.bindProps.number = number;
      this.isValid = isValid;
      this.bindProps.country = country;
    },
    Back() {
      this.$router.go(-1);
    },
    SaveChanges() {
      if (!this.validateForm) {
        window.showFillData();
        return;
      }
      this.$vs.loading();
      this.CompanyModel.AdminUserId = JSON.parse(
        localStorage.getItem("userInfo")
      ).Id;

      this.$store
        .dispatch("CompanyList/EditCompanyDetails", this.CompanyModel)
        .then(() => {
          this.$vs.loading.close();
          window.showSuccess();
        })
        .catch(Error => {
          if (Error.response.status == 400) {
            if (Error.response.data.error == "Email Exist") {
              window.showError();
            }
          } else {
            window.showError();
          }

          this.$vs.loading.close();
        });
    }
  },
  created() {
    this.$vs.loading();

    if (!moduleFleetCompanies.isRegistered) {
      this.$store.registerModule("CompanyList", moduleFleetCompanies);
      moduleFleetCompanies.isRegistered = true;
    }
    if (!moduleCountry.isRegistered) {
      this.$store.registerModule("CountryList", moduleCountry);
      moduleCountry.isRegistered = true;
    }

    var Model = {};
    Model.CountryCode = "EG";
    this.$store
      .dispatch("CountryList/GetStateList", Model)
      .then(res => {
        debugger;
        this.StateList = res.data;
      })
      .catch(() => {});

    // this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
    var company = {};
    company.CompanyId = this.$route.params.Id;
    this.$store
      .dispatch("CompanyList/GetComapneyDetails", company)
      .then(res => {
        this.company_data = res.data;
        if (this.company_data.State) {
          this.GetCityList(this.company_data.State);
        }
        this.CompanyModel.CompanyId = this.company_data.id;
        this.CompanyModel.CompanyName = this.company_data.CompanyName;
        this.CompanyModel.PhoneNo = this.company_data.PhoneNo;
        this.CompanyModel.Email = this.company_data.Email;
        this.CompanyModel.TaxID = this.company_data.TaxID;
        this.CompanyModel.CommercialRegistrationID = this.company_data.CommercialRegistrationID;
        this.CompanyModel.Address = this.company_data.Address;
        this.CompanyModel.City = this.company_data.City;
        this.CompanyModel.State = this.company_data.State;
        this.CompanyModel.ZibCode = this.company_data.ZibCode;
        this.$vs.loading.close();
      })
      .catch(err => {
        if (err.response.status === 404) {
          this.company_not_found = true;
          return;
        }
        this.$vs.loading.close();
      });
  }
};
</script>

<style lang="scss">
#avatar-col {
  width: 10rem;
}

#page-client-view {
  table {
    td {
      vertical-align: baseline !important;
      min-width: 140px;
      padding-bottom: 0.8rem;
      word-break: break-all;
    }

    &:not(.permissions-table) {
      td {
        @media screen and (max-width: 370px) {
          display: block;
        }
      }
    }
  }
}

@media screen and (min-width: 1201px) and (max-width: 1211px),
  only screen and (min-width: 636px) and (max-width: 991px) {
  #account-info-col-1 {
    width: calc(100% - 12rem) !important;
  }
}
</style>
