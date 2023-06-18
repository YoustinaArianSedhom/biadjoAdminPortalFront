<template>
  <div>
    <vx-card v-bind:title="$t('CompanyPermissions')" class="mb-base">
      <div class="vx-row">
        <div class="vx-col flex-1" id="account-info-col-1">
          <table>
            <tr>
              <td class="font-semibold PermissionsTD">
                {{ $t("DriverSendOffer") }}
              </td>
              <vs-switch
                icon-pack="feather"
                vs-icon-off="icon-x"
                vs-icon-on="icon-circle"
                :disabled="!IsEditable"
                v-model="FormData.DriverSendOffer"
              />
            </tr>
            <tr>
              <td class="font-semibold PermissionsTD">
                {{ $t("DriverViewBalance") }}
              </td>
              <vs-switch
                icon-pack="feather"
                vs-icon-off="icon-x"
                vs-icon-on="icon-circle"
                :disabled="!IsEditable"
                v-model="FormData.DriverViewBalance"
              />
            </tr>

            <tr>
              <td class="font-semibold PermissionsTD">
                {{ $t("DriverViewPrice") }}
              </td>
              <vs-switch
                icon-pack="feather"
                vs-icon-off="icon-x"
                vs-icon-on="icon-circle"
                :disabled="!IsEditable"
                v-model="FormData.DriverViewPrice"
              />
            </tr>
          </table>
        </div>
        <div class="vx-col flex-1" id="account-info-col-2">
          <table>
            <tr>
              <td class="font-semibold PermissionsTD">
                {{ $t("DriverViewRequests") }}
              </td>
              <vs-switch
                icon-pack="feather"
                vs-icon-off="icon-x"
                vs-icon-on="icon-circle"
                :disabled="!IsEditable"
                v-model="FormData.DriverViewRequests"
              />
            </tr>
            <tr>
              <td class="font-semibold PermissionsTD ">
                {{ $t("DriverViewTransactionHistory") }}
              </td>
              <td>
                <vs-switch
                  icon-pack="feather"
                  vs-icon-off="icon-x"
                  vs-icon-on="icon-circle"
                  :disabled="!IsEditable"
                  v-model="FormData.DriverViewTransactionHistory"
                />
              </td>
            </tr>
          </table>
        </div>
      </div>
      <div class="flex flex-wrap">
        <vs-button
          icon-pack="feather"
          icon="icon-edit"
          class="w-1/3 text-xl ml-auto m-2"
          v-if="!IsEditable"
          @click="IsEditable = true"
        >
          {{ $t("Edit") }}</vs-button
        >
        <vs-button
          icon-pack="feather"
          icon="icon-edit"
          class="w-1/3 text-xl ml-auto m-2"
          v-if="IsEditable"
          @click="EditPermissions"
        >
          {{ $t("Save") }}</vs-button
        >
        <vs-button
          type="flat"
          class="w-1/3 text-xl mr-auto m-2"
          @click="CancelEditPermissions"
        >
          {{ $t("Cancel") }}</vs-button
        >
      </div>
    </vx-card>
  </div>
</template>
<script>
import moduleFleetCompanies from "@/store/fleetCompanies/moduleFleetCompanies.js";
export default {
  name: "fleetCompanyPermissions",
  data() {
    return {
      IsEditable: false
    };
  },
  props: {
    FormData: {
      type: Object
    }
  },
  methods: {
    CancelEditPermissions() {
      this.IsEditable = false;
      this.$emit("Refresh");
    },
    EditPermissions() {
      this.$vs.loading();
      var Obj = {};
      Obj.CompanyId = this.FormData.id;
      Obj.DriverViewPrice = this.FormData.DriverViewPrice;
      Obj.DriverViewRequests = this.FormData.DriverViewRequests;
      Obj.DriverSendOffer = this.FormData.DriverSendOffer;
      Obj.DriverViewBalance = this.FormData.DriverViewBalance;
      Obj.DriverViewTransactionHistory = this.FormData.DriverViewTransactionHistory;
      Obj.AdminUserId = JSON.parse(localStorage.getItem("userInfo")).Id;

      this.$store
        .dispatch("CompanyList/EditCompanyDriversPermissions", Obj)
        .then(response => {
          if (response.status == 200) {
            this.$emit("Refresh");
            this.IsEditable = false;
            this.$vs.loading.close();
            window.showSuccess();
          }
        })
        .catch(() => {
          window.showError();
          this.$emit("Refresh");
          this.IsEditable = false;
          this.$vs.loading.close();
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
<style>
.PermissionsTD {
  min-width: 300px !important;
}
</style>
