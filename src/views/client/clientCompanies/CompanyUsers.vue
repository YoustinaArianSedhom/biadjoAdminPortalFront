<template>
  <div id="page-Biadjo-view">
    <vs-alert
      color="danger"
      title="Biadjo Not Found"
      :active.sync="Biadjo_not_found"
    >
      <span>Biadjo record with id: {{ $route.params.Id }} not found.</span>
      <span>
        <span>Check</span>
        <router-link
          :to="{ name: 'BiadjoDetails' }"
          class="text-inherit underline"
          >All Biadjos</router-link
        >
      </span>
    </vs-alert>
    <div class="w-full" id="Scroll">
      <vx-card>
        <div
          id="data-list-list-view"
          class="data-list-container"
          v-if="ClompanyModel != undefined || ClompanyModel != null"
        >
          <vs-table ref="table" pagination search :data="ClompanyModel">
            <div
              slot="header"
              class="flex flex-wrap-reverse items-center flex-grow justify-between"
            >
              <vs-button
                class="mr-4"
                @click="Back"
                type="border"
                color="warning"
                icon-pack="feather"
              >
                {{ $t("Back") }}
              </vs-button>
              <div class="flex flex-wrap-reverse items-center"></div>
            </div>

            <template slot="thead">
              <vs-th sort-key="FullName">{{ $t("FullName") }}</vs-th>

              <vs-th sort-key="PhoneNumber">{{ $t("PhoneNumber") }}</vs-th>
              <vs-th sort-key="Email">{{ $t("Email") }}</vs-th>
              <vs-th sort-key="Status"> {{ $t("Status") }} </vs-th>
              <vs-th sort-key="Status"> {{ $t("AccountType") }} </vs-th>

              <vs-th>{{ $t("ClientProfile") }}</vs-th>
              <vs-th>{{ $t("RequestBiadjo") }}</vs-th>
            </template>

            <template slot-scope="{ data }">
              <tbody>
                <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
                  <vs-td>
                    <p class="id font-medium truncate">
                      {{ tr.firstName }} {{ tr.lastName }}
                    </p>
                  </vs-td>

                  <vs-td>
                    <p class="PhoneNumber">
                      {{ tr.PhoneNumber }}
                    </p>
                  </vs-td>

                  <vs-td>
                    <p class="Email">{{ tr.Email }}</p>
                  </vs-td>

                  <vs-td>
                    <vs-chip
                      :color="getOrderStatusColor(tr.AccountStatus)"
                      class="Status"
                      >{{ $t(tr.AccountStatus) }}</vs-chip
                    >
                  </vs-td>
                  <vs-td>
                    <vs-chip class="AccountType">{{
                      $t(tr.AccountType)
                    }}</vs-chip>
                  </vs-td>

                  <vs-td class="whitespace-no-wrap">
                    <router-link
                      :to="{
                        name: 'ClientProfile',
                        params: { Id: tr.Id }
                      }"
                    >
                      <vs-button size="small" class=" w-full">{{
                        $t("ClientProfile")
                      }}</vs-button>
                    </router-link>
                  </vs-td>
                  <vs-td class="whitespace-no-wrap">
                    <router-link
                      :to="{
                        name: 'RequestBiadjo',
                        params: { CID: tr.Id }
                      }"
                    >
                      <vs-button size="small" class=" w-full">{{
                        $t("RequestBiadjo")
                      }}</vs-button>
                    </router-link>
                  </vs-td>
                </vs-tr>
              </tbody>
            </template>
          </vs-table>
        </div>
      </vx-card>
    </div>
  </div>
</template>
<script>
import moduleClient from "@/store/client/moduleClient.js";

export default {
  data() {
    return {
      itemsPerPage: 10,
      ViewEditOfferPopup: false,

      driver_id: "",
      biadjo_id: "",
      ClompanyModel: {
        Offer: 0
      },
      Biadjo_not_found: false,
      disable: true,

      driver: {},
      BiadjoStatus: null
    };
  },
  components: {},
  methods: {
    getOrderStatusColor(status) {
      if (status == "AS1") {
        return "success";
      }
      if (status == "AS2") {
        return "danger";
      }
      if (status == "AS3") {
        return "warning";
      }
      return "primary";
    },
    confirmSave(BiadjoRequestID, driverID) {
      this.driver_id = driverID;
      this.biadjo_id = BiadjoRequestID;
      this.$vs.dialog({
        type: "confirm",
        color: "#27ABBE",
        title: this.$t("ConfirmChange"),
        text: this.$t("YouAreAboutToAssignDriver"),
        accept: this.assignDriverToBiadjo,
        acceptText: this.$t("Save"),
        cancelText: this.$t("Cancel")
      });
    },
    assignDriverToBiadjo() {
      let Biadjo = {};
      Biadjo.BiadjoId = this.biadjo_id;
      Biadjo.DriverId = this.driver_id;
      Biadjo.AdminUserId = JSON.parse(localStorage.getItem("userInfo")).Id;
      this.$store
        .dispatch("ClientList/AssignDriverToBiadjo", Biadjo)
        .then(response => {
          if (response.status == 200) {
            window.showAddDriverToBiadjoSuccess();
          }
        });
    },

    Back() {
      this.$router.go(-1);
    },
    fetchData() {
      this.$vs.loading();
      var Clompany = {};

      Clompany.CompanyId = this.$route.params.Id;
      this.$store
        .dispatch("ClientList/GetClientCompanyUserList", Clompany)
        .then(response => {
          if (response.data.length > 0) {
            this.ClompanyModel = response.data;

            this.$vs.loading.close();
          } else {
            this.$vs.loading.close();
            window.showNoRecords();
          }
        })
        .catch(() => {
          this.$vs.loading.close();
          window.showError();
          this.$router.push("/ClientsCompanyList");
        });
    }
  },
  created() {
    if (!moduleClient.isRegistered) {
      this.$store.registerModule("ClientList", moduleClient);
      moduleClient.isRegistered = true;
    }
    this.fetchData();
  }
};
</script>
<style lang="scss">
#avatar-col {
  width: 10rem;
}
#page-Biadjo-view {
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
