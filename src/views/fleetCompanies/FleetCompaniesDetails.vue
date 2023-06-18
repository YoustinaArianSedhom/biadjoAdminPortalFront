<!-- =========================================================================================
  File Name: clientView.vue
  Description: Fleet View page
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/Fleet/pixinvent
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
          <!-- <img :src="FormData.CompanyLogo" /> -->
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
                  {{ CompanyWalletBalance | numFormat("###,##0.00") }}
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
              <tr>
                <td class="font-semibold">{{ $t("TaxID") }}</td>
                <td>
                  {{ FormData.TaxID }}
                </td>
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
              <!--   <tr>
                <td class="font-semibold">{{ $t("WalletCountryCode") }}</td>
                <td>
                  {{ FormData.WalletCountryCode }}
                </td>
              </tr> -->
            </table>
          </div>
          <!-- Buttons - Col 2 -->
          <div class="flex flex-wrap m-4">
            <div class="btn-group mb-2 mt-2 ">
              <router-link
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
                <vs-button icon-pack="feather" icon="icon-edit" class="mr-4">
                  {{ $t("Edit") }}</vs-button
                >
              </router-link>
            </div>
            <div class="btn-group mb-2 mt-2 ">
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
            </div>
            <div class="btn-group mb-2 mt-2 ">
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
            <div class="btn-group mb-2 mt-2 ">
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
            </div>
            <div class="btn-group mb-2 mt-2 ">
              <vs-button
                icon-pack="feather"
                class="mr-4"
                @click="confirmApplyBank"
                icon="icon-edit"
                >{{ $t("ApplyBankInfoToAllDrivers") }}</vs-button
              >
            </div>

            <div class="btn-group mb-2 mt-2 ">
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
            </div>

            <div class="btn-group mb-2 mt-2 ">
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
            </div>

            <div class="btn-group mb-2 mt-2 ">
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
            </div>

            <div class="btn-group mb-2 mt-2 ">
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
            </div>

            <div class="btn-group mb-2 mt-2 ">
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
            </div>

            <div class="btn-group mb-2 mt-2 ">
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
            </div>

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
        </div>
      </vx-card>
      <fleetCompanyPermissions
        :FormData="FormData"
        @Refresh="Refresh"
      ></fleetCompanyPermissions>
    </div>
    <vx-card>
      <div class="vx-row ">
        <div class="vx-col scroll-area scroll" id="ScrollToEnd">
          <VxTimeline v-if="IsFleetNotes" :data="FleetNotes"></VxTimeline>
          <span v-else class="text-warning text-lg">{{
            $t("NoNotesAvailable")
          }}</span>
        </div>
      </div>
      <div>
        <vs-row>
          <div class="vx-col sm:w-2/3 mb-2">
            <vs-textarea
              class="w-full"
              color="primary"
              label-placeholder="Note"
              v-model="NoteModel.Notice"
            />
          </div>

          <div class="vx-col sm:w-1/3 ">
            <vs-button
              class="mt-4 ml-2"
              radius
              color="primary"
              type="filled"
              icon-pack="feather"
              icon="icon-check"
              :disabled="NoteModel.Notice == ''"
              @click="AddFleetNote"
            ></vs-button>
          </div>
        </vs-row>
      </div>
    </vx-card>
  </div>
</template>
<script>
import moduleFleetCompanies from "@/store/fleetCompanies/moduleFleetCompanies.js";
import fleetCompanyPermissions from "@/views/fleetCompanies/fleetCompanyDetailsPermissions.vue";
import VxTimeline from "@/components/timeline/VxTimeline.vue";

export default {
  data() {
    return {
      CompanyWalletBalance: "",
      FormData: {},
      Company_not_found: false,
      NoteModel: {
        AdminUserId: "",
        CompanyID: "",
        Notice: ""
      },
      IsFleetNotes: false,
      FleetNotes: [
        {
          time: null,
          desc: null,
          title: null,
          color: "primary",
          icon: "PlusIcon"
        }
      ]
    };
  },
  components: {
    fleetCompanyPermissions,
    VxTimeline
  },
  methods: {
    Refresh() {
      this.fetchData();
    },
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
        .dispatch("CompanyList/applyBankInfoToAllDrivers", JsonObj)
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
    },
    fetchData() {
      this.$vs.loading();
      var company = {};
      company.CompanyId = this.$route.params.Id;
      this.$store
        .dispatch("CompanyList/GetComapneyDetails", company)
        .then(res => {
          if (res.status == 200) {
            this.$vs.loading.close();
            this.FormData = res.data;
          }
        })
        .catch(() => {
          this.$vs.loading.close();
          window.showError();
        });

      this.$store
        .dispatch("CompanyList/CompanyWalletBalance", company)
        .then(response => {
          if (response.status == 200) {
            this.CompanyWalletBalance = response.data;
            this.$vs.loading.close();
          }
          this.$vs.loading.close();
        });
    },
    getFleetNotes() {
      this.$vs.loading();
      this.FleetNotes = [];
      var Fleet = {};
      Fleet.CompanyID = this.$route.params.Id;
      this.$store
        .dispatch("CompanyList/GetNoticeForFleet", Fleet)
        .then(response => {
          if (response.data.length > 0) {
            this.FleetNotes = response.data;
            this.IsFleetNotes = true;
            setTimeout(() => {
              var div = document.getElementById("ScrollToEnd");
              div.scrollTop = div.scrollHeight - div.clientHeight;
            }, 1000);
            this.$vs.loading.close();
          } else {
            this.$vs.loading.close();
          }
        });
    },
    AddFleetNote() {
      this.NoteModel.AdminUserId = this.userInfo.Id;
      this.NoteModel.CompanyID = this.$route.params.Id;
      this.$vs.loading();
      this.$store
        .dispatch("CompanyList/AddNoticeToFleet", this.NoteModel)
        .then(response => {
          if (response.data == true) {
            this.NoteModel.Notice = "";
            this.getFleetNotes();
            window.showSuccessAddNote();
            setTimeout(() => {
              var div = document.getElementById("ScrollToEnd");
              div.scrollTop = div.scrollHeight - div.clientHeight;
            }, 1000);
            this.$vs.loading.close();
          } else {
            window;
            this.$vs.loading.close();
            window.showError();
          }
        });
    }
  },
  created() {
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (!moduleFleetCompanies.isRegistered) {
      this.$store.registerModule("CompanyList", moduleFleetCompanies);
      moduleFleetCompanies.isRegistered = true;
    }
    this.fetchData();
    this.getFleetNotes();
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
