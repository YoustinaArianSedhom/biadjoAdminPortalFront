<template>
  <div id="page-companyBankInfo-view">
    <div id="companyBankInfo-data" v-if="accountBank_data != undefined">
      <vx-card v-bind:title="$t('BankAccountInfo')" class="mb-base">
        <div class="vx-row">
          <div class="vx-col flex-1" id="account-info-col-1">
            <table>
              <tr>
                <td class="font-semibold">{{ $t("CompanyID") }} :</td>
                <td>{{ accountBank_data.CompanyID }}</td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("FullName") }} :</td>
                <td>{{ accountBank_data.FullName }}</td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("BankName") }} :</td>
                <td>{{ accountBank_data.BankName }}</td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("BranchName") }} :</td>
                <td>{{ accountBank_data.BranchName }}</td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("AccountNumber") }} :</td>
                <td>{{ accountBank_data.AccountNumber }}</td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("SWIFT") }} :</td>
                <td>{{ accountBank_data.SWIFT }}</td>
              </tr>
            </table>
          </div>

          <div class="vx-col flex-1" id="account-info-col-1">
            <table>
              <tr>
                <td class="font-semibold">{{ $t("ZipCode") }} :</td>
                <td>{{ accountBank_data.ZipCode }}</td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("BankAddress") }} :</td>
                <td>{{ accountBank_data.BankAddress }}</td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("City") }} :</td>
                <td>{{ accountBank_data.City }}</td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("State") }} :</td>
                <td>{{ accountBank_data.State }}</td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("Country") }} :</td>
                <td>{{ accountBank_data.Country }}</td>
              </tr>
            </table>
          </div>
        </div>

        <div class="flex flex-wrap m-4">
          <div class="btn-group mb-2 mt-2">
            <router-link
              :to="{
                name: 'EditCompanyBankAccountInformation',
                params: {
                  data: {
                    Id: accountBank_data.CompanyID
                  }
                }
              }"
            >
              <vs-button class="mr-4">
                {{ $t("Edit") }}
              </vs-button>
            </router-link>
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

import { en, ar } from "vuejs-datepicker/src/locale";

export default {
  Option: [],
  data() {
    return {
      format: "dd/MM/yyyy",
      ar: ar,
      en: en,
      //driver_data: {},
      accountBank_data: {
        CompanyID: "",
        FullName: "",
        BankName: "",
        BranchName: "",
        AccountNumber: "",
        SWIFT: "",
        BankAddress: "",
        City: "",
        State: "",
        ZipCode: "",
        Country: ""
      }
      //driver_not_found: false
    };
  },
  components: {},
  computed: {
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
    }
  },
  created() {
    this.$vs.loading();
    if (!moduleFleetCompanies.isRegistered) {
      this.$store.registerModule("CompanyList", moduleFleetCompanies);
      moduleFleetCompanies.isRegistered = true;
    }

    let JsonObj = {};
    JsonObj.CompanyId = this.$route.params.Id;
    this.$store
      .dispatch("CompanyList/fetchCompanyBankAccountInfo", JsonObj)
      .then(response => {
        if (response.status == 200) {
          this.accountBank_data = response.data[0];
          //   var accountInfo = response.data[0];
          //   this.accountBank_data.BranchName = accountInfo.BranchName;
          //   this.accountBank_data.FullName = accountInfo.FullName;
          //   this.accountBank_data.CompanyId = JsonObj.CompanyId;
          //   this.accountBank_data.BankName = accountInfo.BankName;
          //   this.accountBank_data.BankAddress = accountInfo.BankAddress;
          //   this.accountBank_data.AccountNumber = accountInfo.AccountNumber;
          //   this.accountBank_data.SWIFT = accountInfo.SWIFT;
          //   this.accountBank_data.City = accountInfo.City;
          //   this.accountBank_data.State = accountInfo.State;
          //   this.accountBank_data.ZipCode = accountInfo.ZipCode;
          //   this.accountBank_data.Country = accountInfo.Country;
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
