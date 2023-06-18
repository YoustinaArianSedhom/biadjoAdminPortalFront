<!-- =========================================================================================
  File Name: BiadjoView.vue
  Description: Biadjo View page
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/Biadjo/pixinvent
========================================================================================== -->
<template>
  <div id="page-Biadjo-view">
    <vx-card
      ref="filterCard"
      v-bind:title="$t('Filters')"
      class="user-list-filters mb-8"
      collapse-action
    >
      <div class="vx-row">
        <div class="vx-col w-full">
          <vs-radio class="m-2" v-model="statusFilter" vs-value="SO1">{{
            $t("SO1")
          }}</vs-radio>
          <vs-radio class="m-2" v-model="statusFilter" vs-value="SO2">{{
            $t("SO2")
          }}</vs-radio>
          <vs-radio class="m-2" v-model="statusFilter" vs-value="SO3">{{
            $t("SO3")
          }}</vs-radio>
          <vs-radio class="m-2" v-model="statusFilter" vs-value="SO4">{{
            $t("SO4")
          }}</vs-radio>
          <vs-radio class="m-2" v-model="statusFilter" vs-value="All">{{
            $t("All")
          }}</vs-radio>
        </div>
      </div>
    </vx-card>
    <div class="w-full" id="Scroll">
      <vx-card>
        <div id="data-list-list-view" class="data-list-container">
          <!-- :max-items="itemsPerPage"
        v-model="selected" -->
          <vs-table
            ref="table"
            pagination
            :max-items="itemsPerPage"
            search
            :data="filteredSubmittedOrderModel"
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
              <!-- <vs-th>Image</vs-th> -->
              <vs-th sort-key="SubmittedOrderNumber">{{
                $t("SubmittedOrderNumber")
              }}</vs-th>
              <vs-th sort-key="BiadjoNumber">{{ $t("BiadjoNumber") }}</vs-th>
              <vs-th sort-key="Offer">{{ $t("Offer") }}</vs-th>
              <vs-th sort-key="Status"> {{ $t("Status") }} </vs-th>
              <vs-th sort-key="Date">{{ $t("Date") }}</vs-th>
              <vs-th
                v-show="statusFilter == 'SO1'"
                sort-key="SubmitOfferToOrder"
                >{{ $t("SubmitOfferToOrder") }}</vs-th
              >
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
                      {{ $t(CountryCode + "_Currency") }}
                    </p>
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
                  <vs-td
                    v-show="statusFilter == 'SO1'"
                    class="whitespace-no-wrap"
                  >
                    <vs-button
                      size="small"
                      class=" w-full"
                      @click="SubmitOfferToOrder(tr)"
                      >{{ $t("SubmitOfferToOrder") }}</vs-button
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
        v-bind:title="$t('SubmitOfferToOrder')"
        :active.sync="ViewSubmitOfferPopup"
      >
        <PopUpSubmitOfferToOrder
          :BiadjoId="BiadjoId"
          :CountryCode="CountryCode"
          :SubmitedOrderID="SubmitedOrderID"
          :DriverId="DriverId"
          @ClosePopup="ViewSubmitOfferPopup = false"
          @Refresh="RefreshPage"
        ></PopUpSubmitOfferToOrder>
      </vs-popup>
    </div>
  </div>
</template>
<script>
import moduleDriver from "@/store/driver/moduleDriver.js";
export default {
  data() {
    return {
      DriverId: "",
      SubmitedOrderID: "",

      BiadjoId: "",

      itemsPerPage: 10,
      statusFilter: "SO1",
      driver_id: "",
      ViewSubmitOfferPopup: false,
      //biadjo_id: "",
      SubmittedOrderModel: [],
      //filteredSubmittedOrderModel:{},
      //SubmittedOrders_not_found: false,
      disable: true,

      driver: {},
      CountryCode: null
      //BiadjoStatus: null
    };
  },
  components: {
    PopUpSubmitOfferToOrder: () =>
      import("@/views/generalPopups/PopUpSubmitOfferToOrder.vue")
  },
  computed: {
    filteredSubmittedOrderModel() {
      if (this.statusFilter != "All") {
        return this.SubmittedOrderModel.filter(order => {
          return order.Status == this.statusFilter;
        });
      } else {
        return this.SubmittedOrderModel;
      }
    }
  },
  methods: {
    RefreshPage() {
      this.Search();
    },
    SubmitOfferToOrder(obj) {
      this.ViewSubmitOfferPopup = true;
      this.BiadjoId = obj.BiadjoRequestID;
      this.SubmitedOrderID = obj.Id;
      this.DriverId = this.$route.params.Id;
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
    // confirmSave(BiadjoRequestID, driverID) {

    //   this.driver_id = driverID;
    //   this.biadjo_id = BiadjoRequestID;
    //   this.$vs.dialog({
    //     type: "confirm",
    //     color: "#27ABBE",
    //     title: this.$t("ConfirmChange"),
    //     text: this.$t("YouAreAboutToChangeThis"),
    //     accept: this.assignDriverToBiadjo,
    //     acceptText: this.$t("Save")
    //   });
    // },
    // assignDriverToBiadjo() {

    //   let Biadjo = {};
    //   Biadjo.BiadjoId = this.biadjo_id;
    //   Biadjo.DriverId = this.driver_id;
    //   this.$store
    //     .dispatch("BiadjoList/AssignDriverToBiadjo", Biadjo)
    //     .then(response => {
    //       if (response.status == 200) {
    //         window.showAddDriverToBiadjoSuccess();
    //       }
    //     });
    // },

    Back() {
      this.$router.go(-1);
    },
    Search() {
      this.$vs.loading();
      var driver = {};

      driver.DriverId = this.$route.params.Id;

      this.$store
        .dispatch("DriverList/ViewSubmitedOrders", driver)
        .then(response => {
          if (response.data.length > 0) {
            this.SubmittedOrderModel = response.data;

            this.$vs.loading.close();
          } else {
            this.$vs.loading.close();
            window.showNoRecords();
          }
        })
        .catch(() => {
          //this.SubmittedOrders_not_found = true;
          this.$vs.loading.close();
          window.showError();
          return;
        });
    },
    getDriverData() {
      var driver = {};
      driver.Id = this.$route.params.Id;
      this.$store
        .dispatch("DriverList/GetDriverById", driver)
        .then(response => {
          if (response.data.length > 0) {
            this.CountryCode = response.data[0].countrycode;
          }
        });
    }
  },
  created() {
    if (!moduleDriver.isRegistered) {
      this.$store.registerModule("DriverList", moduleDriver);
      moduleDriver.isRegistered = true;
    }
    this.Search();
    this.getDriverData();
  }
};
</script>
<style lang="scss" scopped>
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
