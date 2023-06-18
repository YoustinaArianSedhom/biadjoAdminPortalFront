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
    <vs-alert
      color="danger"
      v-bind:title="$t('CompanyNotFound')"
      :active.sync="Company_not_found"
    >
      <span>record with ID : {{ $route.params.Id }} not found. </span>
      <span>
        <span>Check </span
        ><router-link
          :to="{ name: 'FleetCompaniesDetails' }"
          class="text-inherit underline"
          >All Clients</router-link
        >
      </span>
    </vs-alert>

    <div id="user-data" v-if="FormData">
      <vx-card v-bind:title="$t('CompanyInformation')" class="mb-base">
        <div class="vx-row">
          <!-- Avatar Col -->
          <div class="vx-col" id="avatar-col">
            <div class="img-container mb-4">
              <img :src="CompanyLogo" class="rounded w-full" />
            </div>
          </div>
          <!-- Information - Col 1 -->
          <div class="vx-col flex-1" id="account-info-col-1">
            <table>
              <tr>
                <td class="font-semibold">{{ $t("Id") }}</td>
                <td>{{ FormData.id }}</td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("CompanyName") }}</td>
                <td>{{ FormData.CompanyName }}</td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("PhoneNumber") }}</td>
                <td>
                  <span :dir="$vs.rtl ? 'ltr' : 'ltr'">{{
                    FormData.PhoneNo
                  }}</span>
                </td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("Email") }}</td>
                <td>{{ FormData.Email }}</td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("Balance") }}</td>
                <td>
                  {{ FormData.Balance | numFormat("###,##0.00") }}
                  {{ $t(FormData.countrycode + "_Currency") }}
                </td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("CustomerId") }}</td>
                <td>{{ FormData.CustomerId }}</td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("Status") }}</td>
                <td>{{ $t(FormData.Status) }}</td>
              </tr>
            </table>
          </div>
          <!-- /Information - Col 1 -->

          <!-- Information - Col 2 -->
          <div class="vx-col flex-1" id="account-info-col-2">
            <table>
              <tr>
                <td class="font-semibold">{{ $t("Country") }}</td>
                <td>{{ FormData.country }}</td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("CountryCode") }}</td>
                <td>{{ FormData.countrycode }}</td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("City") }}</td>
                <td>{{ FormData.City }}</td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("Address") }}</td>
                <td>{{ FormData.Address }}</td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("State") }}</td>
                <td>{{ FormData.State }}</td>
              </tr>

              <tr>
                <td class="font-semibold">{{ $t("RegistrationDate") }}</td>
                <td>
                  {{
                    FormData.RegistrationDate | formatDate("yyyy/MM/dd HH:mm")
                  }}
                </td>
              </tr>
              <tr>
                <td class="font-semibold">
                  {{ $t("CommercialRegistrationID") }}
                </td>
                <td>
                  {{ FormData.CommercialRegistrationID }}
                </td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("ZibCode") }}</td>
                <td>
                  {{ FormData.ZibCode }}
                </td>
              </tr>
              <!-- <tr>
                <td class="font-semibold">{{ $t("TaxID") }}</td>
                <td>
                  {{ FormData.TaxID }}
                </td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("WalletCountryCode") }}</td>
                <td>
                  {{ FormData.WalletCountryCode }}
                </td>
              </tr> -->
            </table>
          </div>
          <!-- Buttons - Col 2 -->
        </div>
        <div class="flex flex-wrap m-4">
          <!-- <div class="btn-group mb-2 mt-2 ">
              <vs-button
                icon-pack="feather"
                icon="icon-edit"
                class="mr-4"
                :to="{
                  name: 'EditCompany',
                  params: {
                    data: {
                      Id: FormData.id,
                      CountryCode: FormData.CountryCode,
                      PhoneNumber: FormData.PhoneNumber
                    }
                  }
                }"
              >
                {{ $t("Edit") }}</vs-button
              >
            </div>
             -->

          <!-- <div class="btn-group mb-2 mt-2 ">
              <router-link
                :to="{
                  name: 'FleetCompanyUsers',
                  params: { Id: FormData.id }
                }"
              >
                <vs-button icon-pack="feather" class="mr-4">
                  {{ $t("CompanyUsers") }}</vs-button
                >
              </router-link>
            </div> -->

          <!-- <div class="btn-group mb-2 mt-2 ">
              <router-link
                :to="{
                  name: 'CompanyDrivers',
                  params: { Id: FormData.id }
                }"
              >
                <vs-button icon-pack="feather" class="mr-4">
                  {{ $t("CompanyDrivers") }}</vs-button
                >
              </router-link>
            </div>
             -->

          <!-- <div class="btn-group mb-2 mt-2 ">
              <router-link
                :to="{
                  name: 'CompanyBankAccountInformation',
                  params: { Id: FormData.id }
                }"
              >
                <vs-button icon-pack="feather" class="mr-4">
                  {{ $t("BankAccountInfo") }}</vs-button
                >
              </router-link>
            </div> -->

          <!-- <div class="btn-group mb-2 mt-2 ">
              <vs-button
                icon-pack="feather"
                class="mr-4"
                @click="confirmApplyBank"
                icon="icon-edit"
                >{{ $t("ApplyBankInfoToAllDrivers") }}</vs-button
              >
            </div> -->

          <!-- <div class="btn-group mb-2 mt-2 ">
              <router-link
                :to="{
                  name: 'AddCompanyDriver',
                  params: { Id: FormData.id }
                }"
              >
                <vs-button icon-pack="feather" class="mr-4">
                  {{ $t("AddDriver") }}</vs-button
                >
              </router-link>
            </div> -->

          <!-- <div class="btn-group mb-2 mt-2 ">
              <router-link
                :to="{
                  name: 'CompanyBiadjosHistory',
                  params: { Id: FormData.id }
                }"
              >
                <vs-button icon-pack="feather" class="mr-4">
                  {{ $t("BiadjosHistory") }}</vs-button
                >
              </router-link>
            </div> -->

          <!-- <div class="btn-group mb-2 mt-2 ">
              <router-link
                :to="{
                  name: 'CompanyScheduledBiadjos',
                  params: { Id: FormData.id }
                }"
              >
                <vs-button icon-pack="feather" class="mr-4">
                  {{ $t("ScheduledBiadjos") }}</vs-button
                >
              </router-link>
            </div> -->

          <!-- <div class="btn-group mb-2 mt-2 ">
              <router-link
                :to="{
                  name: 'CompanySubmitedOrdersAndOffers',
                  params: { Id: FormData.id, CountryCode: FormData.countrycode }
                }"
              >
                <vs-button icon-pack="feather" class="mr-4">
                  {{ $t("ViewSubmittedOrders") }}</vs-button
                >
              </router-link>
            </div> -->

          <!-- <div class="btn-group mb-2 mt-2 ">
              <router-link
                :to="{
                  name: 'CompanyTransactionHistory',
                  params: { Id: FormData.id }
                }"
              >
                <vs-button icon-pack="feather" class="mr-4">
                  {{ $t("TransactionsHistory") }}</vs-button
                >
              </router-link>
            </div> -->

          <!-- <div class="btn-group mb-2 mt-2 ">
              <router-link
                :to="{
                  name: 'FleetCompanyWalletBalance',
                  params: { Id: FormData.id, CC: FormData.countrycode }
                }"
              >
                <vs-button icon-pack="feather" class="mr-4">
                  {{ $t("CompanyWalletBalance") }}</vs-button
                >
              </router-link>
            </div> -->

          <div class="btn-group mb-2 mt-2 ">
            <vs-button
              type="border"
              color="warning"
              class="mr-4"
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
import moduleClient from "@/store/client/moduleClient.js";
import FileEncryptionHandler from "@/http/requests/auth/jwt/FileEncryptionHandler.js";

export default {
  data() {
    return {
      CompanyWalletBalance: "",
      FormData: {},
      CompanyLogo: "",
      Company_not_found: false
    };
  },
  methods: {
    Back() {
      this.$router.go(-1);
    },
    confirmApplyBank() {
      this.$vs.dialog({
        type: "confirm",
        color: "#27ABBE",
        title: this.$t("ConfirmChange"),
        text: this.$t("YouAreAboutToUpdateBankInfoForAllDrivers"),
        cancelText: this.$t("Cancel"),
        accept: this.ApplyBankInfoToAllDrivers,
        acceptText: this.$t("Save")
      });
    },
    ApplyBankInfoToAllDrivers() {
      this.$vs.loading();
      let JsonObj = {};
      JsonObj.CompanyId = this.$route.params.Id;
      this.$store
        .dispatch("ClientList/applyBankInfoToAllDrivers", JsonObj)
        .then(response => {
          if (response.status == 200) {
            this.$vs.loading.close();
            window.showSuccess();
          }
          this.$vs.loading.close();
        })
        .catch(() => {
          this.$vs.loading.close();
          window.showError();
        });
    },

    CancelAlert() {
      this.FormData.AccountStatus = this.OldAccountStatus;
    }
  },
  created() {
    this.$vs.loading();
    if (!moduleClient.isRegistered) {
      this.$store.registerModule("ClientList", moduleClient);
      moduleClient.isRegistered = true;
    }

    var company = {};
    company.Id = this.$route.params.Id;
    company.PhoneNumber = "";

    this.$store
      .dispatch("ClientList/GetClientCompanyDetails", company)
      .then(res => {
        this.FormData = res.data;

        if (res.data.CompanyLogo) {
          this.CompanyLogo = FileEncryptionHandler.decrypt(
            JSON.parse(res.data.CompanyLogo)
          );
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

#page-user-view {
  table {
    td {
      vertical-align: top;
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

// #account-info-col-1 {
//   // flex-grow: 1;
//   width: 30rem !important;
//   @media screen and (min-width:1200px) {
//     & {
//       flex-grow: unset !important;
//     }
//   }
// }

@media screen and (min-width: 1201px) and (max-width: 1211px),
  only screen and (min-width: 636px) and (max-width: 991px) {
  #account-info-col-1 {
    width: calc(100% - 12rem) !important;
  }

  // #account-manage-buttons {
  //   width: 12rem !important;
  //   flex-direction: column;

  //   > button {
  //     margin-right: 0 !important;
  //     margin-bottom: 1rem;
  //   }
  // }
}
</style>
