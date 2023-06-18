<template>
  <div id="page-companyBankInfo-view">
    <div id="companyBankInfo-data" v-if="accountBank_data != undefined">
      <vx-card v-bind:title="$t('BankAccountInfo')" class="mb-base">
        <div class="vx-row">
          <div class="vx-col flex-1" id="account-info-col-1">
            <table>
              <tr>
                <td class="font-semibold">{{ $t("FullName") }} :</td>

                <td style="width: 250px;">
                  <vs-input
                    class="w-full mt-4"
                    v-model="accountBank_data.FullName"
                    v-validate="'required'"
                    name="FullName"
                  />
                  <span
                    class="text-danger text-sm"
                    v-show="errors.has('FullName')"
                    >{{ errors.first("FullName") }}</span
                  >
                </td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("BankName") }} :</td>

                <td>
                  <vs-input
                    class="w-full mt-4"
                    v-model="accountBank_data.BankName"
                    v-validate="'required'"
                    name="BankName"
                  />
                  <span
                    class="text-danger text-sm"
                    v-show="errors.has('BankName')"
                    >{{ errors.first("BankName") }}</span
                  >
                </td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("BranchName") }} :</td>
                <!-- <td>{{ accountBank_data.BranchName}}</td> -->
                <td>
                  <vs-input
                    class="w-full mt-4"
                    v-model="accountBank_data.BranchName"
                    v-validate="'required'"
                    name="BranchName"
                  />
                  <span
                    class="text-danger text-sm"
                    v-show="errors.has('BranchName')"
                    >{{ errors.first("BranchName") }}</span
                  >
                </td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("AccountNumber") }} :</td>
                <!-- <td>{{ accountBank_data.AccountNumber  }}</td> -->
                <td>
                  <vs-input
                    @keypress="isNumber($event)"
                    class="w-full mt-4"
                    v-model="accountBank_data.AccountNumber"
                    v-validate="'required'"
                    name="AccountNumber"
                  />
                  <span
                    class="text-danger text-sm"
                    v-show="errors.has('AccountNumber')"
                    >{{ errors.first("AccountNumber") }}</span
                  >
                </td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("SWIFT") }} :</td>
                <!-- <td>{{ accountBank_data.SWIFT }}</td> -->
                <td>
                  <vs-input
                    class="w-full mt-4"
                    v-model="accountBank_data.SWIFT"
                    v-validate="'required'"
                    name="SWIFT"
                  />
                  <span
                    class="text-danger text-sm"
                    v-show="errors.has('SWIFT')"
                    >{{ errors.first("SWIFT") }}</span
                  >
                </td>
              </tr>
            </table>
          </div>

          <div class="vx-col flex-1" id="account-info-col-1">
            <table>
              <tr>
                <td class="font-semibold">{{ $t("ZipCode") }} :</td>
                <!-- <td>{{ accountBank_data.BankAddress  }}</td> -->
                <td>
                  <vs-input
                    class="w-full mt-4"
                    v-model="accountBank_data.ZipCode"
                    v-validate="'required'"
                    name="ZipCode"
                  />
                  <span
                    class="text-danger text-sm"
                    v-show="errors.has('ZipCode')"
                    >{{ errors.first("ZipCode") }}</span
                  >
                </td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("BankAddress") }} :</td>
                <!-- <td>{{ accountBank_data.BankAddress  }}</td> -->
                <td>
                  <vs-input
                    class="w-full mt-4"
                    v-model="accountBank_data.BankAddress"
                    v-validate="'required'"
                    name="BankAddress"
                  />
                  <span
                    class="text-danger text-sm"
                    v-show="errors.has('BankAddress')"
                    >{{ errors.first("BankAddress") }}</span
                  >
                </td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("State") }} :</td>

                <td>
                  <v-select
                    :get-option-label="option => $t(option[StateWithLocale])"
                    class="mt-1 w-full p-0"
                    v-validate="'required'"
                    name="State"
                    v-model="accountBank_data.State"
                    @input="GetCityList(accountBank_data.State)"
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
                    class="w-full mt-4"
                    v-model="accountBank_data.State"
                    v-validate="'required'"
                    name="State"
                  />
                  <span
                    class="text-danger text-sm"
                    v-show="errors.has('State')"
                    >{{ errors.first("State") }}</span
                  > -->
                </td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("City") }} :</td>

                <td>
                  <v-select
                    :get-option-label="option => $t(option[CityWithLocale])"
                    class="mt-1 w-full p-0"
                    v-validate="'required'"
                    name="City"
                    v-model="accountBank_data.City"
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
                    class="w-full mt-4"
                    v-model="accountBank_data.City"
                    v-validate="'required'"
                    name="City"
                  />
                  <span
                    class="text-danger text-sm"
                    v-show="errors.has('City')"
                    >{{ errors.first("City") }}</span
                  > -->
                </td>
              </tr>

              <tr>
                <td class="font-semibold">{{ $t("Country") }} :</td>

                <td>
                  <vs-input
                    class="w-full mt-4"
                    v-model="accountBank_data.Country"
                    v-validate="'required'"
                    name="Country"
                  />
                  <span
                    class="text-danger text-sm"
                    v-show="errors.has('Country')"
                    >{{ errors.first("Country") }}</span
                  >
                </td>
              </tr>
            </table>
          </div>
        </div>

        <div class="flex flex-wrap m-4">
          <div class="btn-group mb-2 mt-2">
            <vs-button
              class="mr-4"
              @click="confirmSave"
              :disabled="!validateForm"
            >
              {{ $t("SaveChanges") }}
            </vs-button>
          </div>
          <div class="btn-group mb-2 mt-2">
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
      </vx-card>
    </div>
  </div>
</template>

<script>
import moduleFleetCompanies from "@/store/fleetCompanies/moduleFleetCompanies.js";
//import VehiclOptions1_JSON from "./json/vehiclesOptions1.json";
//import VehiclOptions2_JSON from "./json/vehiclesOptions2.json";
import { en, ar } from "vuejs-datepicker/src/locale";
import moduleCountry from "@/store/countrySetting/moduleCountry.js";

export default {
  //VehiclOptionse1Json: VehiclOptions1_JSON,
  //VehiclOptionse2Json: VehiclOptions2_JSON,

  Option: [],
  data() {
    return {
      CityList: [],
      StateList: [],
      format: "dd/MM/yyyy",
      ar: ar,
      en: en,
      //driver_data: {},
      accountBank_data: {
        CompanyId: "",
        FullName: "",
        BankName: "",
        BranchName: "",
        AccountNumber: "",
        SWIFT: "",
        BankAddress: "",
        City: "",
        State: "",
        ZipCode: "",
        Country: "",
        AdminUserId: ""
      }
      //driver_not_found: false
    };
  },
  components: {},
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
        this.accountBank_data.FullName !== "" &&
        this.accountBank_data.BankName !== "" &&
        this.accountBank_data.BranchName !== "" &&
        this.accountBank_data.AccountNumber !== "" &&
        this.accountBank_data.SWIFT !== "" &&
        this.accountBank_data.BankAddress !== "" &&
        this.accountBank_data.City !== "" &&
        this.accountBank_data.State !== "" &&
        this.accountBank_data.ZipCode !== "" &&
        this.accountBank_data.Country !== ""
      );
    }
    // DatepickerLang() {
    //   var SelectedLanguage = {};
    //   if (this.$i18n.locale == "ar") {
    //     SelectedLanguage = this.ar;
    //   } else {
    //     SelectedLanguage = this.en;
    //   }
    //   return SelectedLanguage;
    // }
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
    isNumber: function(evt) {
      evt = evt || window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        evt.preventDefault();
      } else {
        return true;
      }
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
      this.accountBank_data.AdminUserId = JSON.parse(
        localStorage.getItem("userInfo")
      ).Id;

      this.$store
        .dispatch(
          "CompanyList/updateCompanyBankAccountInformation",
          this.accountBank_data
        )
        .then(res => {
          if (res.status == 200) {
            this.$vs.loading.close();
            window.showSuccess();
          }
        })
        .catch(() => {
          window.showError();
          this.$vs.loading.close();
        });
      this.$vs.loading.close();
    },

    confirmSave() {
      if (!this.validateForm) {
        window.showFillData();
        return;
      }
      this.$vs.dialog({
        type: "confirm",
        color: "#27ABBE",
        title: this.$t("ConfirmChange"),
        text: this.$t("YouAreAboutToUpdateBankInfo"),
        cancelText: this.$t("Cancel"),
        accept: this.save_changes,
        acceptText: this.$t("Save")
      });
    }
  },
  created() {
    this.$vs.loading();

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

    if (!moduleFleetCompanies.isRegistered) {
      this.$store.registerModule("CompanyList", moduleFleetCompanies);
      moduleFleetCompanies.isRegistered = true;
    }

    var company = this.$route.params.Id;
    let JsonObj = {};
    JsonObj.CompanyId = company;

    this.$store
      .dispatch("CompanyList/fetchCompanyBankAccountInfo", JsonObj)
      .then(response => {
        if (response.status == 200) {
          var accountInfo = response.data[0];
          if (response.data[0].State) {
            this.GetCityList(response.data[0].State);
          }
          this.accountBank_data.BranchName = accountInfo.BranchName;
          this.accountBank_data.FullName = accountInfo.FullName;
          this.accountBank_data.CompanyId = company;
          this.accountBank_data.BankName = accountInfo.BankName;
          this.accountBank_data.BankAddress = accountInfo.BankAddress;
          this.accountBank_data.AccountNumber = accountInfo.AccountNumber;
          this.accountBank_data.SWIFT = accountInfo.SWIFT;
          this.accountBank_data.City = accountInfo.City;
          this.accountBank_data.State = accountInfo.State;
          this.accountBank_data.ZipCode = accountInfo.ZipCode;
          this.accountBank_data.Country = accountInfo.Country;
          this.$vs.loading.close();
        }
        this.$vs.loading.close();
      })
      .catch(() => {
        this.$vs.loading.close();
        window.showError();
      });
  }
};
</script>

<style lang="scss">
#avatar-col {
  width: 10rem;
}

#page-companyBankInfo-view {
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
