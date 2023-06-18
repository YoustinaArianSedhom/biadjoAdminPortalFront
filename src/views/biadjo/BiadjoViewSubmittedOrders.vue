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
          v-if="SubmittedOrderModel != undefined || SubmittedOrderModel != null"
        >
          <vs-table
            ref="table"
            :max-items="itemsPerPage"
            pagination
            search
            :data="SubmittedOrderModel"
          >
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
              <vs-th sort-key="SubmittedOrderNumber">{{
                $t("SubmittedOrderNumber")
              }}</vs-th>
              <vs-th sort-key="BiadjoNumber">{{ $t("BiadjoNumber") }}</vs-th>
              <vs-th sort-key="Offer">{{ $t("Offer") }}</vs-th>
              <vs-th sort-key="KMOffer"> {{ $t("KMOffer") }} </vs-th>
              <vs-th sort-key="Status"> {{ $t("Status") }} </vs-th>
              <vs-th sort-key="Date">{{ $t("Date") }}</vs-th>
              <vs-th sort-key="DriverID">{{ $t("DriverID") }}</vs-th>
              <vs-th>{{ $t("EditOffer") }}</vs-th>
              <vs-th>{{ $t("pay") }}</vs-th>

              <vs-th>{{ $t("DriverInfo") }}</vs-th>
              <vs-th>{{ $t("AssignToDriver") }}</vs-th>
            </template>

            <template slot-scope="{ data }">
              <tbody>
                <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
                  <vs-td>
                    <p class="id font-medium truncate">{{ tr.Id }}</p>
                  </vs-td>

                  <vs-td>
                    <p class="BiadjoRequestID">{{ tr.BiadjoRequestID }}</p>
                  </vs-td>
                  <vs-td>
                    <p class="Offer">
                      {{ tr.Offer | numFormat("###,##0.00") }}
                    </p>
                  </vs-td>
                  <vs-td>
                    <span v-if="tr.KMOffer">{{ $t("trueBool") }}</span>
                    <span v-else>{{ $t("falseBool") }}</span>
                  </vs-td>
                  <vs-td>
                    <vs-chip
                      :color="getOrderStatusColor(tr.Status)"
                      class="Status"
                      >{{ $t(tr.Status) }}</vs-chip
                    >
                  </vs-td>

                  <vs-td>
                    <p class="DateTime">
                      {{ tr.DateTime | formatDate("yyyy/MM/dd HH:mm") }}
                    </p>
                  </vs-td>

                  <vs-td>
                    <p class="BiadjoRequestID">{{ tr.DriverID }}</p>
                  </vs-td>

                  <vs-td class="whitespace-no-wrap">
                    <vs-button
                      v-show="tr.Status == 'SO2'"
                      :disabled="BiadjoStatus != 'BS3'"
                      size="small"
                      class=" w-full"
                      @click="EditDriverOfferPopup(tr)"
                      >{{ $t("EditOffer") }}</vs-button
                    >
                  </vs-td>
                  <vs-td class="whitespace-no-wrap">
                    <vs-button
                      v-if="
                        tr.Offer > 0 &&
                          (BiadjoStatus == 'BS1' ||
                            BiadjoStatus == 'BS2' ||
                            BiadjoStatus == 'BS3')
                      "
                      @click="
                        confirmPay(tr.BiadjoRequestID, tr.DriverID, tr.OfferId)
                      "
                      size="small"
                      class=" w-full"
                      >{{ $t("pay") }}</vs-button
                    >
                  </vs-td>

                  <vs-td class="whitespace-no-wrap">
                    <router-link
                      :to="{
                        name: 'DriverProfile',
                        params: { Id: tr.DriverID }
                      }"
                    >
                      <vs-button size="small" class=" w-full">{{
                        $t("ViewDriverDetails")
                      }}</vs-button>
                    </router-link>
                  </vs-td>
                  <vs-td class="whitespace-no-wrap">
                    <vs-button
                      size="small"
                      @click="confirmSave(tr.BiadjoRequestID, tr.DriverID)"
                      color="primary"
                      class=" w-full"
                      type="filled"
                      :disabled="disable"
                      >{{ $t("AssignToDriver") }}</vs-button
                    >
                  </vs-td>
                </vs-tr>
              </tbody>
            </template>
          </vs-table>
        </div>
      </vx-card>
    </div>
    <div class="parentx-static">
      <vs-popup
        classContent="popup-example"
        v-bind:title="$t('EditOffer')"
        :active.sync="ViewEditOfferPopup"
      >
        <EditDriverOffer
          :PopupModel="PopupModel"
          @ClosePopup="ViewEditOfferPopup = false"
          @Refresh="RefreshPage"
        ></EditDriverOffer>
      </vs-popup>
    </div>

    <div class="parentx-static">
      <vs-popup
        classContent="popup-example"
        v-bind:title="$t('ResetID')"
        :active.sync="popupResetID"
        @ClosePopup="popupResetID = false"
      >
        <h3>
          {{ $t("ResetID") }} :
          {{ this.ResetID }}
        </h3>
      </vs-popup>
    </div>
  </div>
</template>
<script>
import moduleBiadjo from "@/store/biadjo/moduleBiadjo.js";
export default {
  data() {
    return {
      popupResetID: false,
      ResetID: "",
      itemsPerPage: 20,
      ViewEditOfferPopup: false,
      PopupModel: {
        BiadjoRequestID: "",
        DriverID: "",
        AdminUserId: "",
        Price: "",
        CountryCode: null
      },
      driver_id: "",
      biadjo_id: "",
      offer_id: "",
      user_id: "",
      SubmittedOrderModel: {
        Offer: 0
      },
      Biadjo_not_found: false,
      disable: true,

      driver: {},
      BiadjoStatus: null
    };
  },
  components: {
    EditDriverOffer: () => import("@/views/generalPopups/EditDriverOffer.vue")
  },
  methods: {
    RefreshPage() {
      this.fetchData();
    },
    EditDriverOfferPopup(tr) {
      this.PopupModel.BiadjoRequestID = tr.BiadjoRequestID;
      this.PopupModel.DriverID = tr.DriverID;
      this.PopupModel.Price = "";
      this.PopupModel.AdminUserId = JSON.parse(
        localStorage.getItem("userInfo")
      ).Id;
      this.PopupModel.CountryCode = JSON.parse(
        localStorage.getItem("userInfo")
      ).countrycode;
      this.ViewEditOfferPopup = true;
    },
    getOrderStatusColor(status) {
      if (status == "SO3") {
        return "#F8BD30";
      }
      if (status == "SO1") {
        return "#F8BD30";
      }
      if (status == "SO2") {
        return "#F8BD30";
      }
      if (status == "SO4") {
        return "#039BE5";
      }
      // return "primary";
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
        .dispatch("BiadjoList/AssignDriverToBiadjo", Biadjo)
        .then(response => {
          if (response.status == 200) {
            window.showAddDriverToBiadjoSuccess();
          }
        });
    },
    confirmPay(BiadjoRequestID, driverID, OfferId) {
      this.driver_id = driverID;
      this.biadjo_id = BiadjoRequestID;
      this.offer_id = OfferId;
      this.$vs.dialog({
        type: "confirm",
        color: "#27ABBE",
        title: this.$t("ConfirmChange"),
        text: this.$t("YouAreAboutToPayThisBiadjo"),
        accept: this.pay,
        acceptText: this.$t("Save"),
        cancelText: this.$t("Cancel")
      });
    },
    pay() {
      this.$vs.loading();
      let Biadjo = {};
      Biadjo.BiadjoId = this.biadjo_id;
      Biadjo.OfferID = this.offer_id;
      Biadjo.UserId = this.user_id;

      Biadjo.DriverId = this.driver_id;
      Biadjo.AdminUserId = JSON.parse(localStorage.getItem("userInfo")).Id;

      this.$store
        .dispatch("BiadjoList/PayBiadjoWallet", Biadjo)
        .then(response => {
          if (response.status == 200) {
            this.$vs.loading.close();
            this.ResetID = response.data;
            this.popupResetID = true;
          }
        })
        .catch(() => {
          window.showError();
          this.$vs.loading.close();
        });
    },
    Back() {
      this.$router.go(-1);
    },
    fetchData() {
      this.$vs.loading();
      var Biadjo = {};
      Biadjo.BiadjoId = this.$route.params.Id;
      this.$store
        .dispatch("BiadjoList/ViewSubmitedOrdersAndOffers", Biadjo)
        .then(response => {
          if (response.data.length > 0) {
            this.SubmittedOrderModel = response.data;
            var Status = {};
            Status.id = this.$route.params.Id;
            this.$store
              .dispatch("BiadjoList/GetBiadjoByid", Status)
              .then(response => {
                this.BiadjoStatus = response.data[0].Status;
                if (
                  this.BiadjoStatus == "BS4" ||
                  this.BiadjoStatus == "BS5" ||
                  this.BiadjoStatus == "BS6" ||
                  this.BiadjoStatus == "BS7" ||
                  this.BiadjoStatus == "BS8" ||
                  this.BiadjoStatus == "BS9" ||
                  this.BiadjoStatus == "BS10"
                ) {
                  this.disable = false;
                }
              });
            this.$vs.loading.close();
            // if (this.SubmittedOrderModel.Status == "BS11") {
            //   this.disable = true;
            // }
          } else {
            this.$vs.loading.close();
            window.showNoRecords();
          }
        })
        .catch(() => {
          this.$vs.loading.close();
          window.showError();
          this.$router.push("/BiadjoSearch");
        });
    }
  },
  created() {
    if (!moduleBiadjo.isRegistered) {
      this.$store.registerModule("BiadjoList", moduleBiadjo);
      moduleBiadjo.isRegistered = true;
    }
    this.fetchData();
    var Biadjo = {};
    Biadjo.id = this.$route.params.Id;
    this.$store.dispatch("BiadjoList/GetBiadjoByid", Biadjo).then(response => {
      if (response.status == 200) {
        this.user_id = response.data[0].UserId;
      }
    });
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
