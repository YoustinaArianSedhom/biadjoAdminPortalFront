<template>
  <div id="page-client-view">
    <div id="company-data" v-if="CompanyWalletBalance != undefined">
      <vx-card
        v-bind:title="$t('CompanyWalletBalance')"
        class="mb-base"
        id="account-info"
      >
        <div class="   vx-row no-gutter justify-center">
          <div class="vx-col w-2/3 sm:m-0 m-4">
            <vx-card class="mb-base">
              <div class="flex flex-wrap justify-center ">
                <table>
                  <tr>
                    <td class="font-semibold text-4xl">
                      {{ $t("Balance") }}
                    </td>
                    <td
                      v-if="this.CompanyWalletBalance >= 0"
                      style="font-size: 30px; color:green;"
                    >
                      {{ CompanyWalletBalance | numFormat("###,##0.00")
                      }}{{ $t(countrycode + "_Currency") }}
                    </td>
                    <td
                      v-if="this.CompanyWalletBalance < 0"
                      style="font-size: 30px; color:red;"
                    >
                      {{ CompanyWalletBalance | numFormat("###,##0.00")
                      }}{{ $t(countrycode + "_Currency") }}
                    </td>
                  </tr>
                </table>
              </div>
            </vx-card>
          </div>
        </div>

        <div class="vx-row">
          <div class="vx-col w-full " id="account-manage-buttons">
            <div class="flex flex-wrap m-4">
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
export default {
  data() {
    return {
      CompanyWalletBalance: {},
      countrycode: null,
      userInfo: {}
    };
  },
  components: {},
  methods: {
    Back() {
      this.$router.go(-1);
    }
  },
  created() {
    //
    this.$vs.loading();
    if (!moduleFleetCompanies.isRegistered) {
      this.$store.registerModule("CompanyList", moduleFleetCompanies);
      moduleFleetCompanies.isRegistered = true;
    }

    this.countrycode = this.$route.params.CC;
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
    var company = {};
    company.CompanyId = this.$route.params.Id;

    this.$store
      .dispatch("CompanyList/CompanyWalletBalance", company)
      .then(response => {
        if (response.status == 200) {
          this.CompanyWalletBalance = response.data;
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
