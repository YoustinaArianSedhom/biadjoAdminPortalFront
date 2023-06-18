<template>
  <div id="page-Biadjo-view">
    <div id="Biadjo-data" v-if="Conflicted_data != undefined">
      <vx-card v-bind:title="$t('ConflictedBiadjo')" class="mb-base">
        <div class="vx-row">
          <div class="vx-col flex-1" id="account-info-col-1">
            <table>
              <tr>
                <td class="font-semibold">{{ $t("BiadjoNumber") }}</td>
                <td>{{ Conflicted_data.id }}</td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("DriverID") }}</td>
                <td>{{ Conflicted_data.DriverId }}</td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("Time_Deff") }}</td>
                <td>{{ Conflicted_data.Time_Deff }}</td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("CountryCode") }}</td>
                <td>{{ Conflicted_data.CountryCode }}</td>
              </tr>
            </table>
          </div>
          <div class="vx-col flex-1" id="account-info-col-2">
            <table>
              <tr>
                <td class="font-semibold">{{ $t("AssignedUserID") }}</td>
                <td>{{ Conflicted_data.AssignedUserID }}</td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("AssignedUserName") }}</td>
                <td>{{ Conflicted_data.AssignedUserName }}</td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("Status") }}</td>
                <td>{{ $t(Conflicted_data.Status) }}</td>
              </tr>

              <tr>
                <td class="font-semibold">{{ $t("ModefideDate") }}</td>
                <td>{{ Conflicted_data.ModefideDate | formatDate() }}</td>
              </tr>
            </table>
          </div>
          <div class="vx-col w-full flex" id="account-manage-buttons">
            <div
              class="flex items-center"
              style="padding: 5px;"
              v-if="UserId == Conflicted_data.AssignedUserID"
            >
              <vs-button
                v-show="!disable"
                icon-pack="feather"
                icon="icon-edit"
                class="mr-4"
                @click="close(Conflicted_data.id)"
                >{{ $t("Close") }}</vs-button
              >
            </div>
            <div class="flex items-center" style="padding-right: 10px;" v-else>
              <vs-button
                v-show="!disable"
                color="primary"
                type="filled"
                @click="AssignToUser(Conflicted_data.id)"
                >{{ $t("AssignToMe") }}</vs-button
              >
            </div>
            <div class="flex items-center" style="padding-right: 10px;">
              <router-link
                :to="{
                  name: 'DriverProfile',
                  params: { Id: Conflicted_data.DriverId }
                }"
              >
                <vs-button color="primary" type="filled">{{
                  $t("ViewDriverDetails")
                }}</vs-button>
              </router-link>
            </div>
            <div class="flex items-center" style="padding-right: 10px;">
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
        </div>
      </vx-card>
      <div class="vx-row">
        <div style="padding: 10px;">
          <vx-card v-bind:title="$t('BiadjoA')" class="mb-base">
            <div class="vx-col flex-1" id="account-info-col-1">
              <table>
                <tr>
                  <td class="font-semibold">{{ $t("BiadjoA") }}</td>
                  <td>{{ Conflicted_data.Biadjo_A }}</td>
                </tr>

                <tr style="width: 1400px;">
                  <td class="font-semibold">{{ $t("Biadjo_A_Schedule") }}</td>
                  <td>
                    {{ Conflicted_data.Biadjo_A_Schedule | formatDate() }}
                  </td>
                </tr>
              </table>
            </div>
            <div class="vx-row">
              <vs-button
                icon-pack="feather"
                icon="icon-edit"
                class="mr-4"
                :to="{
                  name: 'BiadjoDetails',
                  params: { Id: Conflicted_data.Biadjo_A }
                }"
                >{{ $t("BiadjoDetails") }}</vs-button
              >
              <vs-button
                v-show="!disable"
                @click="popupActiveassignDriverToBiadjo = true"
                color="primary"
                type="filled"
                >{{ $t("AssignToDriver") }}</vs-button
              >
            </div>
            <div style="padding-top:10px;" class="vx-row">
              <vs-button
                v-show="!disable"
                icon-pack="feather"
                icon="icon-edit"
                class="mr-4"
                :to="{
                  name: 'BiadjoViewSubmittedOrders',
                  params: { Id: Conflicted_data.Biadjo_A }
                }"
                >{{ $t("ViewSubmittedOrders") }}</vs-button
              >
            </div>
          </vx-card>
        </div>
        <div style="padding: 10px;">
          <vx-card v-bind:title="$t('BiadjoB')" class="mb-base">
            <div
              class="vx-col flex-1"
              style="padding-right: 30px;"
              id="account-info-col-2"
            >
              <table>
                <tr>
                  <td class="font-semibold">{{ $t("BiadjoB") }}</td>
                  <td>{{ Conflicted_data.Biadjo_B }}</td>
                </tr>
                <tr>
                  <td class="font-semibold">{{ $t("Biadjo_B_Schedule") }}</td>
                  <td>
                    {{ Conflicted_data.Biadjo_B_Schedule | formatDate() }}
                  </td>
                </tr>
              </table>
            </div>
            <div class="vx-row">
              <router-link
                :to="{
                  name: 'BiadjoDetails',
                  params: { Id: Conflicted_data.Biadjo_B }
                }"
              >
                <vs-button icon-pack="feather" icon="icon-edit" class="mr-4">{{
                  $t("BiadjoDetails")
                }}</vs-button>
              </router-link>
              <vs-button
                v-show="!disable"
                @click="popupActiveassignDriverToBiadjoB = true"
                color="primary"
                type="filled"
                >{{ $t("AssignToDriver") }}</vs-button
              >
            </div>
            <div style="padding-top:10px;" class="vx-row">
              <router-link
                :to="{
                  name: 'BiadjoViewSubmittedOrders',
                  params: { Id: Conflicted_data.Biadjo_B }
                }"
              >
                <vs-button
                  v-show="!disable"
                  icon-pack="feather"
                  icon="icon-edit"
                  class="mr-4"
                  >{{ $t("ViewSubmittedOrders") }}</vs-button
                >
              </router-link>
            </div>
          </vx-card>
        </div>
      </div>
    </div>

    <div class="parentx-static">
      <vs-popup
        classContent="popup-example"
        v-bind:title="$t('AssignBiadjoToDriver')"
        :active.sync="popupActiveassignDriverToBiadjoB"
      >
        <popupActiveassignDriverToBiadjoB
          :Conflicted_data="Conflicted_data"
          @ClosePopup="popupActiveassignDriverToBiadjoB = false"
          @assignDriverToBiadjo="assignDriverToBiadjo"
        ></popupActiveassignDriverToBiadjoB>
      </vs-popup>

      <vs-popup
        classContent="popup-example"
        v-bind:title="$t('AssignBiadjoToDriver')"
        :active.sync="popupActiveassignDriverToBiadjo"
      >
        <popupActiveassignDriverToBiadjo
          :Conflicted_data="Conflicted_data"
          @ClosePopup="popupActiveassignDriverToBiadjo = false"
          @assignDriverToBiadjo="assignDriverToBiadjo"
        ></popupActiveassignDriverToBiadjo>
      </vs-popup>
    </div>
  </div>
</template>

<script>
import moduleBiadjo from "@/store/biadjo/moduleBiadjo.js";
export default {
  data() {
    return {
      Conflicted_data: {},
      driver: {},
      disable: false,
      active: false,
      active2: false,
      UserId: "",
      popupActiveassignDriverToBiadjo: false,
      popupActiveassignDriverToBiadjoB: false
    };
  },
  components: {
    popupActiveassignDriverToBiadjo: () =>
      import("@/views/generalPopups/popupActiveassignDriverToBiadjo.vue"),
    popupActiveassignDriverToBiadjoB: () =>
      import("@/views/generalPopups/popupActiveassignDriverToBiadjoB.vue")
  },
  computed: {},
  methods: {
    assignDriverToBiadjo(biadjoID, driverID) {
      let Biadjo = {};
      Biadjo.BiadjoId = biadjoID;
      Biadjo.DriverId = driverID;
      Biadjo.AdminUserId = JSON.parse(localStorage.getItem("userInfo")).Id;
      this.$store
        .dispatch("BiadjoList/AssignDriverToBiadjo", Biadjo)
        .then(response => {
          if (response.status == 200) {
            window.showAddDriverToBiadjoSuccess();
            this.popupActiveassignDriverToBiadjo = false;
            this.popupActiveassignDriverToBiadjoB = false;
          }
        })
        .catch(() => {
          window.showError();
          this.popupActiveassignDriverToBiadjo = false;
          this.popupActiveassignDriverToBiadjoB = false;
        });
    },

    AssignToUser(biadjoID) {
      this.$vs.loading();
      let Biadjo = {};
      Biadjo.Id = biadjoID;
      let userInfo = JSON.parse(localStorage.getItem("userInfo"));
      Biadjo.UserId = userInfo.Id;
      this.$store
        .dispatch("BiadjoList/AssignUserToConflictBiadjo", Biadjo)
        .then(response => {
          if (response.status == 200) {
            window.showSuccess();

            this.$vs.loading.close();
            location.reload();
          }
        })
        .catch(() => {
          this.$vs.loading.close();
          window.showError();
        });
    },

    close(biadjoID) {
      let Biadjo = {};
      Biadjo.Id = biadjoID;
      this.$store
        .dispatch("BiadjoList/CloseConflictBiadjo", Biadjo)
        .then(response => {
          if (response.status == 200) {
            window.showSuccess();
            location.reload();
          }
        })
        .catch(() => {
          this.$vs.loading.close();
          window.showError();
        });
    },
    Back() {
      this.$router.go(-1);
    },

    CancelAlert() {
      var user = {};
      user.Id = this.$route.params.Id;
      user.PhoneNumber = "";
      this.$store.dispatch("BiadjoList/GetBiadjoById", user).then(res => {
        this.Conflicted_data = res.data[0];
      });
    }
  },
  created() {
    this.$vs.loading();
    if (!moduleBiadjo.isRegistered) {
      this.$store.registerModule("BiadjoList", moduleBiadjo);
      moduleBiadjo.isRegistered = true;
    }
    debugger;
    var Biadjo = {};
    Biadjo.Id = this.$route.params.Id;
    this.$store
      .dispatch("BiadjoList/GetConflictedBiadjoByid", Biadjo)
      .then(res => {
        if (res.data.length > 0) {
          this.Conflicted_data = res.data[0];
          if (this.Conflicted_data.Status == "CS3") {
            this.disable = true;
            this.$vs.loading.close();
          }
          this.$vs.loading.close();
        } else {
          this.$vs.loading.close();
          window.showNoRecords();
        }
      })
      .catch(() => {
        this.$vs.loading.close();
        window.showError();
      });

    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.UserId = userInfo.Id;
  }
};
</script>

<style lang="scss">
.sidebar {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100px;
  h4 {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    > button {
      margin-left: 10px;
    }
  }
}

.footer-sidebar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  > button {
    border: 0px solid rgba(0, 0, 0, 0) !important;
    border-left: 1px solid rgba(0, 0, 0, 0.07) !important;
    border-radius: 0px !important;
  }
}
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
