<template>
  <div id="page-user-view">
    <vs-alert
      color="danger"
      v-bind:title="$t('DriverNotFound')"
      :active.sync="ID_not_found"
    >
      <span>record with ID : {{ $route.params.Id }} not found. </span>
      <span>
        <span>Check </span
        ><router-link :to="{ name: 'Driver' }" class="text-inherit underline"
          >All Drivers</router-link
        >
      </span>
    </vs-alert>

    <div id="user-data" v-if="FormData">
      <vx-card v-bind:title="$t('BankAccountInfo')" class="mb-base">
        <!-- Avatar -->
        <div class="vx-row">
          <!-- Avatar Col -->
          <!-- Information - Col 1 -->
          <div class="vx-col flex-1" id="account-info-col-1">
            <table>
              <table>
                <tr>
                  <td class="font-semibold">{{ $t("FullName") }}</td>
                  <td>{{ accountBank_data.FullName }}</td>
                </tr>
                <tr>
                  <td class="font-semibold">{{ $t("BankName") }}</td>
                  <td>{{ accountBank_data.BankName }}</td>
                </tr>
                <tr>
                  <td class="font-semibold">{{ $t("BranchName") }}</td>
                  <td>{{ accountBank_data.BranchName }}</td>
                </tr>
                <tr>
                  <td class="font-semibold">{{ $t("AccountNumber") }}</td>
                  <td>{{ accountBank_data.AccountNumber }}</td>
                </tr>
              </table>
            </table>
          </div>
          <!-- /Information - Col 1 -->

          <!-- Information - Col 2 -->
          <div class="vx-col flex-1" id="account-info-col-2">
            <table>
              <tr>
                <td class="font-semibold">{{ $t("SWIFT") }}</td>
                <td>{{ accountBank_data.SWIFT }}</td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("BankAddress") }}</td>
                <td>{{ accountBank_data.BankAddress }}</td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("City") }}</td>
                <td>{{ accountBank_data.City }}</td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("State") }}</td>
                <td>{{ accountBank_data.State }}</td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("Country") }}</td>
                <td>{{ accountBank_data.Country }}</td>
              </tr>
            </table>
          </div>
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
      </vx-card>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import moduleDriver from "@/store/driver/moduleDriver.js";
import moduleBiadjo from "@/store/biadjo/moduleBiadjo.js";
import StarRating from "vue-star-rating";
import AccountStatus_JSON from "./json/accountStatus.json";
import Vehicle_JSON from "./json/vehicles.json";

export default {
  AccountStatusJson: AccountStatus_JSON,
  VehicleJson: Vehicle_JSON,
  data() {
    return {
      Biadjo: {},
      FormData: {},
      accountBank_data: {},
      ID_not_found: false,
      OldAccountStatus: ""
    };
  },
  components: {
    StarRating
  },
  methods: {
    Back() {
      this.$router.go(-1);
    },
    CancelAlert() {
      this.FormData.AccountStatus = this.OldAccountStatus;
    }
  },
  created() {
    this.$vs.loading();
    if (!moduleBiadjo.isRegistered) {
      this.$store.registerModule("BiadjoList", moduleBiadjo);
      moduleBiadjo.isRegistered = true;
    }
    if (!moduleDriver.isRegistered) {
      this.$store.registerModule("DriverList", moduleDriver);
      moduleDriver.isRegistered = true;
    }
    var driver = {};
    driver.Id = this.$route.params.Id;

    this.$store
      .dispatch("DriverList/bankAccountInfoData", driver.Id)
      .then(response => {
        this.accountBank_data = response.data[0];
        this.$vs.loading.close();
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
