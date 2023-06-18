<template>
  <div id="page-user-view">
    <vs-alert
      color="danger"
      title="Biadjo Not Found"
      :active.sync="Biadjo_not_found"
    >
      <span>Biadjo record with id: {{ this.$route.params.Id }} not found.</span>
      <span>
        <span>Check</span>
        <router-link
          :to="{ name: 'BiadjoDetails' }"
          class="text-inherit underline"
          >All Biadjos</router-link
        >
      </span>
    </vs-alert>

    <div id="Biadjo-data" v-if="FormData != undefined || FormData != null">
      <vx-card v-bind:title="$t('Biadjo')" class="mb-base">
        <div class="vx-row">
          <div class="vx-col flex-1" id="account-info-col-1">
            <table>
              <tr>
                <td class="font-semibold">{{ $t("BiadjoNumber") }}</td>
                <td>{{ FormData.id }}</td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("UserID") }}</td>
                <td>{{ FormData.UserId }}</td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("DriverID") }}</td>
                <td>{{ FormData.DriverId }}</td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("Price") }}</td>
                <td>
                  {{ FormData.Price | numFormat("###,##0.00") }}
                  {{ $t(FormData.CountryCode + "_Currency") }}
                </td>
              </tr>
              <!--  <tr>
                <td class="font-semibold">{{ $t("Insurance") }}</td>
                <td>{{ FormData.Insurance }}</td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("InsuranceValue") }}</td>
                <td>
                  {{ FormData.InsuranceValue | numFormat("###,##0.00") }}
                  {{ $t(FormData.CountryCode + "_Currency") }}
                </td>
              </tr> -->
              <tr>
                <td class="font-semibold">{{ $t("Rating") }}</td>
                <td style="display:flex !important;">
                  <star-rating
                    v-model="FormData.Rating"
                    v-bind:increment="0.01"
                    v-bind:max-rating="5"
                    inactive-color="gray"
                    active-color="orange"
                    v-bind:read-only="true"
                    v-bind:show-rating="false"
                    v-bind:round-start-rating="false"
                    v-bind:star-size="20"
                  >
                  </star-rating>
                  <span> ( {{ FormData.Rating | numFormat("0.00") }} ) </span>
                </td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("Country") }}</td>
                <td>{{ FormData.Country }}</td>
              </tr>
            </table>
          </div>

          <div class="vx-col flex-1" id="account-info-col-2">
            <table>
              <tr>
                <td class="font-semibold">{{ $t("PaymentMethod") }}</td>
                <td>{{ $t(FormData.PaymentMethod) }}</td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("PaymentStatus") }}</td>
                <td>{{ $t(FormData.PaymentStatus) }}</td>
              </tr>

              <tr>
                <td class="font-semibold">{{ $t("Status") }}</td>
                <td>{{ $t(FormData.Status) }}</td>
              </tr>

              <tr>
                <td class="font-semibold">{{ $t("DriverPaymentStatus") }}</td>
                <td>{{ $t(FormData.DriverPaymentStatus) }}</td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("Schedual") }}</td>
                <td>
                  {{ FormData.Schedual | formatDate("yyyy/MM/dd HH:mm") }}
                </td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("Date") }}</td>
                <td>
                  {{ FormData.Date | formatDate("yyyy/MM/dd HH:mm") }}
                </td>
              </tr>

              <tr>
                <td class="font-semibold">{{ $t("ClosingDate") }}</td>
                <td>
                  {{ FormData.ClosingDate | formatDate("yyyy/MM/dd HH:mm") }}
                </td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("CountryCode") }}</td>
                <td>{{ FormData.CountryCode }}</td>
              </tr>
            </table>
          </div>
        </div>
        <div class="vx-row">
          <div class="vx-col w-full " id="account-manage-buttons">
            <div class="flex flex-wrap m-4">
              <div class="btn-group mb-2 mt-2 ">
                <vs-button
                  icon-pack="feather"
                  class="mr-4"
                  @click="confirmUpdateStatus"
                  icon="icon-edit"
                  :disabled="DisableUpdateStatus"
                  >{{
                    $t("UpdateStatus") +
                      " " +
                      $t("To") +
                      " " +
                      $t(nextBiadjoStatus())
                  }}</vs-button
                >
              </div>

              <div class="btn-group mb-2 mt-2 ">
                <vs-button
                  icon-pack="feather"
                  class="mr-4"
                  :disabled="disableAssignDriver"
                  @click="GetDriverList"
                  v-scroll-to="'#Scroll'"
                  icon="icon-users"
                  >{{ $t("AssignToDriver") }}</vs-button
                >
              </div>

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

      <vx-card class="mb-base">
        <div class="vx-row">
          <div class="vx-col flex-1" id="account-info-col-1">
            <table>
              <tr>
                <div class="mt-2">
                  <td class="font-semibold mt-2">{{ $t("CargoType") }}</td>
                  <td>{{ FormData.CargoType }}</td>
                </div>
              </tr>

              <tr style="width: 1400px;">
                <div class="mt-2">
                  <td class="font-semibold">{{ $t("CargoDescription") }}</td>
                  <td>{{ FormData.CargoDescription }}</td>
                </div>
              </tr>
              <!-- <tr>
                <div class="mt-2">
                  <td class="font-semibold">{{ $t("CargoValue") }}</td>
                  <td>
                    {{ FormData.CargoValue | numFormat("###,##0.00") }}
                  </td>
                </div>
              </tr> -->
              <tr>
                <div class="mt-2">
                  <td class="font-semibold">{{ $t("CargoWeight") }}</td>
                  <td>
                    {{ FormData.CargoWeight | numFormat("###,##0.00") }}
                    {{ $t(FormData.CargoWeightUnit) }}
                  </td>
                </div>
              </tr>
              <tr>
                <div class="mt-2">
                  <td class="font-semibold">{{ $t("Width") }}</td>
                  <td>{{ FormData.Width }}</td>
                </div>
              </tr>
            </table>
          </div>

          <div class="vx-col flex-1" id="account-info-col-2">
            <table>
              <tr>
                <div class="mt-2">
                  <td class="font-semibold">{{ $t("VehicleType") }}</td>
                  <td>{{ $t(FormData.VehicleType) }}</td>
                </div>
              </tr>
              <tr>
                <div class="mt-2">
                  <td class="font-semibold">{{ $t("VehicleOption") }}</td>
                  <td>{{ FormData.VehicleOption }}</td>
                </div>
              </tr>
              <tr>
                <div class="mt-2">
                  <td class="font-semibold">{{ $t("NumberOfTrips") }}</td>
                  <td>{{ FormData.NumberOfTrips }}</td>
                </div>
              </tr>
              <tr>
                <div class="mt-2">
                  <td class="font-semibold">{{ $t("Height") }}</td>
                  <td>{{ FormData.Height }}</td>
                </div>
              </tr>
              <tr>
                <div class="mt-2">
                  <td class="font-semibold">{{ $t("Length") }}</td>
                  <td>{{ FormData.Length }}</td>
                </div>
              </tr>
            </table>
          </div>
        </div>
      </vx-card>

      <vx-card class="mb-base">
        <div class="vx-row">
          <div class="vx-col flex-1" id="account-info-col-1">
            <table>
              <tr>
                <div class="mt-2">
                  <td class="font-semibold">{{ $t("TripDistance") }}</td>
                  <td>{{ distance }}</td>
                </div>
              </tr>
              <tr>
                <div class="mt-2">
                  <td class="font-semibold">{{ $t("StartLocation") }}</td>
                  <td>
                    <vx-tooltip
                      text="Check Location On Google Maps"
                      position="top"
                    >
                      <a
                        target="_blank"
                        v-bind:href="
                          `${StartLink}${FormData.StLatitude},${FormData.StLongitude}${EndLink}`
                        "
                        >{{ FormData.StLatitude }},{{ FormData.StLongitude }}</a
                      >
                    </vx-tooltip>
                  </td>
                </div>
              </tr>
              <tr>
                <div class="mt-2">
                  <td class="font-semibold">{{ $t("StartPlaceId") }}</td>
                  <td>{{ FormData.StPlaceId }}</td>
                </div>
              </tr>
              <tr>
                <div class="mt-2">
                  <td class="font-semibold">{{ $t("StartCity") }}</td>
                  <td>{{ FormData.StartCity }}</td>
                </div>
              </tr>
              <tr>
                <div class="mt-2">
                  <td class="font-semibold">{{ $t("StartCountry") }}</td>
                  <td>{{ FormData.StartCountry }}</td>
                </div>
              </tr>
              <tr>
                <div class="mt-2">
                  <td class="font-semibold">{{ $t("StartCountryCode") }}</td>
                  <td>{{ FormData.StartCountryCode }}</td>
                </div>
              </tr>
              <tr>
                <div class="mt-2">
                  <td class="font-semibold">{{ $t("StartState") }}</td>
                  <td>{{ FormData.StartState }}</td>
                </div>
              </tr>
              <tr>
                <div class="mt-2">
                  <td class="font-semibold">{{ $t("StartAddress") }}</td>
                  <td>{{ FormData.StPlaceDesicription }}</td>
                </div>
              </tr>
            </table>
          </div>

          <div class="vx-col flex-1" id="account-info-col-2">
            <table>
              <tr>
                <div class="mt-2">
                  <td class="font-semibold">{{ $t("TripDuration") }}</td>
                  <td>{{ duration }}</td>
                </div>
              </tr>
              <tr>
                <div class="mt-2">
                  <td class="font-semibold">{{ $t("EndLocation") }}</td>
                  <td>
                    <vx-tooltip
                      text="Check Location On Google Maps"
                      position="top"
                    >
                      <a
                        target="_blank"
                        v-bind:href="
                          `${StartLink}${FormData.EnLatitude},${FormData.EnLongitude}${EndLink}`
                        "
                        >{{ FormData.EnLatitude }},{{ FormData.EnLongitude }}</a
                      >
                    </vx-tooltip>
                  </td>
                </div>
              </tr>
              <tr>
                <div class="mt-2">
                  <td class="font-semibold">{{ $t("EndPlaceId") }}</td>
                  <td>{{ FormData.EnPlaceId }}</td>
                </div>
              </tr>
              <tr>
                <div class="mt-2">
                  <td class="font-semibold">{{ $t("EndCountry") }}</td>
                  <td>{{ FormData.EndCountry }}</td>
                </div>
              </tr>
              <tr>
                <div class="mt-2">
                  <td class="font-semibold">{{ $t("EndCountryCode") }}</td>
                  <td>{{ FormData.EndCountryCode }}</td>
                </div>
              </tr>
              <tr>
                <div class="mt-2">
                  <td class="font-semibold">{{ $t("EndCity") }}</td>
                  <td>{{ FormData.EndCity }}</td>
                </div>
              </tr>
              <tr>
                <div class="mt-2">
                  <td class="font-semibold">{{ $t("EndState") }}</td>
                  <td>{{ FormData.EndState }}</td>
                </div>
              </tr>
              <tr>
                <div class="mt-2">
                  <td class="font-semibold">{{ $t("EndAddress") }}</td>
                  <td>{{ FormData.EnPlaceDesicription }}</td>
                </div>
              </tr>
            </table>
          </div>
        </div>
      </vx-card>

      <!-- done -->
      <div class="w-full" id="Scroll">
        <vx-card v-if="DriversList.length > 0">
          <div id="data-list-list-view" class="data-list-container">
            <vs-table
              ref="table"
              :data="DriversList"
              pagination
              :max-items="itemsPerPage"
            >
              <template slot="thead">
                <vs-th sort-key="first Name">{{ $t("FirstName") }}</vs-th>
                <vs-th sort-key="last Name">{{ $t("LastName") }}</vs-th>
                <vs-th sort-key="Phone Number">{{ $t("PhoneNumber") }}</vs-th>
                <vs-th sort-key="Country">{{ $t("Country") }}</vs-th>
                <vs-th sort-key="Driver Balance">{{
                  $t("DriverBalance")
                }}</vs-th>
                <vs-th sort-key="Account Status">{{
                  $t("AccountStatus")
                }}</vs-th>
                <vs-th sort-key="Vacation Mode">{{ $t("VacationMode") }}</vs-th>

                <vs-th>{{ $t("Actions") }}</vs-th>
              </template>

              <template slot-scope="{ data }">
                <tbody>
                  <vs-tr
                    :data="tr"
                    :key="indextr"
                    v-for="(tr, indextr) in data"
                  >
                    <vs-td>
                      <p class="product-name font-medium truncate">
                        {{ tr.firstName }}
                      </p>
                    </vs-td>
                    <vs-td>
                      <p class="product-category">{{ tr.lastName }}</p>
                    </vs-td>
                    <vs-td>
                      <p class="product-category">{{ tr.UserName }}</p>
                    </vs-td>
                    <vs-td>
                      <p class="product-category">{{ tr.country }}</p>
                    </vs-td>
                    <vs-td>
                      <p class="product-category">
                        {{ tr.DriverBalance | numFormat("###,##0.00") }}
                        {{ $t(tr.countrycode + "_Currency") }}
                      </p>
                    </vs-td>
                    <vs-td>
                      <vs-chip
                        :color="getOrderStatusColor(tr.AccountStatus)"
                        class="AccountStatus"
                        v-if="tr.AccountStatus"
                      >
                        {{ $t(tr.AccountStatus) }}
                      </vs-chip>
                    </vs-td>
                    <vs-td>
                      <p class="product-category">
                        {{ tr.vacationMode }}
                      </p>
                    </vs-td>

                    <vs-td class="whitespace-no-wrap">
                      <vs-button
                        size="small"
                        :disabled="disableAssignDriver"
                        @click="confirmAssignBiadjoToDriver(tr.Id)"
                      >
                        {{ $t("AssignBiadjo") }}
                      </vs-button>
                    </vs-td>
                  </vs-tr>
                </tbody>
              </template>
            </vs-table>
          </div>
        </vx-card>
      </div>
    </div>
  </div>
</template>

// done
<script>
/* eslint-disable */
import moduleBiadjo from "@/store/biadjo/moduleBiadjo.js";
import StarRating from "vue-star-rating";

export default {
  data() {
    return {
      FormData: {},
      distance: "",
      duration: "",
      DriversList: [],
      driverID: "",
      disableAssignDriver: false,
      itemsPerPage: 10,
      DisableUpdateStatus: false,
      MapFullLoaded: false,
      Model2: {
        DriverId: "",
        Offer: "",
        UserId: "",
        BiadjoId: ""
      },
      Biadjo_not_found: false,
      disable: false,
      CompaneyId: "",
      StartLink: "https://maps.google.com/maps?q=@",
      EndLink: "&17z",
      Model: {
        CountryCode: "",
        StartLatitude: "",
        StartLongitude: "",
        VehicleType: "",
        VehicleOption: ""
      },

      BiadjoFees: {
        CountryCodeOfBiadjo: "",
        BiadjoStatus: "",
        BiadjoPrice: "",
        BiadjoID: null
      }
    };
  },
  components: {
    StarRating
  },

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
    nextBiadjoStatus() {
      switch (this.FormData.Status) {
        case "BS4":
          return "BS5";
        case "BS5":
          return "BS6";
        case "BS6":
          return "BS7";
        case "BS7":
          return "BS8";
        case "BS8":
          return "BS9";
        case "BS9":
          return "BS10";
        default:
          return "BS11";
      }
    },
    confirmUpdateStatus() {
      this.$vs.dialog({
        type: "confirm",
        color: "#27ABBE",
        title: this.$t("ConfirmChange"),
        text: this.$t("YouAreAboutToUpdateBiadjoStatus"),
        cancelText: this.$t("Cancel"),
        accept: this.UpdateBiadjoStatus,
        acceptText: this.$t("Save")
      });
    },
    Back() {
      this.$router.go(-1);
    },
    fetchDistance(origin, dest) {
      return new Promise(async (resolve, reject) => {
        let response;
        let origin1 = origin;
        let destinationA = dest;

        var service = new google.maps.DistanceMatrixService();
        service.getDistanceMatrix(
          {
            origins: await [origin1],
            destinations: await [destinationA],
            travelMode: "DRIVING",
            unitSystem: google.maps.UnitSystem.METRIC,
            avoidHighways: false,
            avoidTolls: false
          },
          (resp, status) => {
            if (status !== google.maps.DistanceMatrixStatus.OK) {
              response = reject(status);
              this.distance = "";
              this.duration = "";
            } else {
              response = resolve(resp);
              this.distance = resp.rows[0].elements[0].distance.text;
              this.duration = resp.rows[0].elements[0].duration.text;
            }
          }
        );
        return response;
      });
    },
    UpdateBiadjoStatus() {
      var BiadjoStatus = {};
      BiadjoStatus.BiadjoID = this.FormData.id;

      switch (this.FormData.Status) {
        case "BS4":
          BiadjoStatus.Status = "BS5";
          break;
        case "BS5":
          BiadjoStatus.Status = "BS6";
          break;
        case "BS6":
          BiadjoStatus.Status = "BS7";
          break;
        case "BS7":
          BiadjoStatus.Status = "BS8";
          break;
        case "BS8":
          BiadjoStatus.Status = "BS9";
          break;
        case "BS9":
          BiadjoStatus.Status = "BS10";
          break;
        default:
          BiadjoStatus.Status = "";
          break;
      }
      if (BiadjoStatus.Status != "") {
        this.$vs.loading();
        this.$store
          .dispatch("BiadjoList/UpdateBiadjoStatus", BiadjoStatus)
          .then(response => {
            this.$vs.loading.close();
            this.GetBiadjo();
            window.showSuccess();
          })
          .catch(() => {
            this.$vs.loading.close();
            window.showError();
          });
      }
    },

    async GetBiadjo() {
      this.$vs.loading();
      var Biadjo = {};
      Biadjo.BiadjoID = this.$route.params.Id;

      this.$store
        .dispatch("BiadjoList/GetBiadjoByid", Biadjo)
        .then(async response => {
          if (response.data.length > 0) {
            window.AllowToAccessCurrentBiadjo(response.data[0].FleetCompanyId);
            this.FormData = await response.data[0];
            if (
              this.FormData.StLongitude != 0 &&
              this.FormData.StLatitude != 0 &&
              this.FormData.EnLongitude != 0 &&
              this.FormData.EnLatitude != 0
            ) {
              let orgin = {
                lat: this.FormData.StLatitude,
                lng: this.FormData.StLongitude
              };
              let dest = {
                lat: this.FormData.EnLatitude,
                lng: this.FormData.EnLongitude
              };
              window
                .checkAndAttachMapScript()
                .then(response => this.fetchDistance(orgin, dest));
            }
            if (
              this.FormData.Status == "BS4" ||
              this.FormData.Status == "BS5" ||
              this.FormData.Status == "BS6" ||
              this.FormData.Status == "BS7" ||
              this.FormData.Status == "BS8" ||
              this.FormData.Status == "BS9"
            ) {
              this.disableAssignDriver = false;
              this.DisableUpdateStatus = false;
            } else {
              this.DisableUpdateStatus = true;
              this.disableAssignDriver = true;
            }

            this.$vs.loading.close();
          } else {
            this.$vs.loading.close();
            this.Biadjo_not_found = true;
            window.showError();
          }
        })
        .catch(() => {
          this.$vs.loading.close();
          this.Biadjo_not_found = true;
          window.showError();
        });
    },

    GetDriverList() {
      //this.$vs.loading();
      this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
      this.CompaneyId = this.userInfo.CompaneyId;
      var Obj = {};
      // Obj.CompanyId = this.userInfo.CompaneyId;
      Obj.CompanyId = this.CompaneyId;
      Obj.VehicleType = this.FormData.VehicleType;
      if (this.FormData.VehicleOption) {
        Obj.VehicleOption = this.FormData.VehicleOption;
      } else {
        Obj.VehicleOption = "";
      }

      this.$store
        .dispatch("BiadjoList/GetDriversListForBiadjoinCompany", Obj)
        .then(response => {
          this.DriversList = response.data;
          //this.$vs.loading.close();
        });
      // .catch(() => {
      //  // this.$vs.loading.close();
      //   window.showError();
      // });
    },

    confirmAssignBiadjoToDriver(driverID) {
      this.driverID = driverID;
      this.$vs.dialog({
        type: "confirm",
        color: "#27ABBE",
        title: this.$t("ConfirmChange"),
        text: this.$t("YouAreAboutToAssignBiadjoToDriver"),
        accept: this.AssignBiadjoToDriver,
        acceptText: this.$t("Save"),
        cancelText: this.$t("Cancel")
      });
    },
    AssignBiadjoToDriver() {
      this.$vs.loading();
      var Obj = {};
      Obj.BiadjoId = this.FormData.id;
      Obj.DriverId = this.driverID;

      this.$store
        .dispatch("BiadjoList/AssignDriverToBiadjo", Obj)
        .then(response => {
          if (response.data == 1) {
            this.GetBiadjo();
            this.$vs.loading.close();
            window.showSuccessfulyAssignedToDriver();
          }
        })
        .catch(() => {
          this.$vs.loading.close();
          window.showError();
        });
    }
  },
  created() {
    if (!moduleBiadjo.isRegistered) {
      this.$store.registerModule("BiadjoList", moduleBiadjo);
      moduleBiadjo.isRegistered = true;
    }
    this.GetBiadjo();
  },

  mounted() {}
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

#page-user-list {
  .user-list-filters {
    height: 10px;

    .vs__actions {
      position: absolute;
      right: 0;
      top: 20%;
      height: 100px;
      transform: translateY(-58%);
    }
  }
}

#instant-search-demo {
  .header {
    .filters-label {
      width: calc(260px + 2.4rem);
    }
  }

  #content-container {
    .vs-sidebar {
      position: relative;
      float: left;
    }
  }

  .search-input-right-aligned-icon {
    padding: 1rem 1.5rem;
  }

  .price-slider {
    max-width: 80%;
  }

  .item-view-primary-action-btn {
    color: #2c2c2c !important;
    background-color: #f6f6f6;
    min-width: 50%;
  }

  .item-view-secondary-action-btn {
    min-width: 50%;
  }
}

.theme-dark {
  #instant-search-demo {
    #content-container {
      .vs-sidebar {
        background-color: #10163a;
      }
    }
  }
}

.autocomplete {
  position: relative;
  width: 100%;
}

.autocomplete-results {
  padding: 0;
  margin: 0;
  border: 1px solid #eeeeee;
  height: 120px;
  overflow: auto;
  width: 100%;
}

.autocomplete-result {
  list-style: none;
  text-align: left;
  padding: 4px 2px;
  cursor: pointer;
}

.autocomplete-result.is-active,
.autocomplete-result:hover {
  background-color: #4aae9b;
  color: white;
}

@media (min-width: 992px) {
  .vs-sidebar-rounded {
    .vs-sidebar {
      border-radius: 0.5rem;
    }

    .vs-sidebar--items {
      border-radius: 0.5rem;
    }
  }
}

@media (max-width: 992px) {
  #content-container {
    .vs-sidebar {
      position: fixed !important;
      float: left !important;
    }
  }
}

.grid-view-item {
  // height: 450px;

  .grid-view-img {
    max-width: 100%;
    max-height: 100%;
    width: auto;
    transition: 0.35s;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 4px 25px 0px rgba(0, 0, 0, 0.25);

    .grid-view-img {
      opacity: 0.9;
    }
  }

  button.page-link {
    display: inline-block;
  }

  button.page-link {
    font-size: 20px;
    color: #29b3ed;
    font-weight: 500;
  }

  .offset {
    width: 500px !important;
    margin: 20px auto;
  }
}
#data-list-list-view {
  .vs-con-table {
    /*
      Below media-queries is fix for responsiveness of action buttons
      Note: If you change action buttons or layout of this page, Please remove below style
    */
    @media (max-width: 689px) {
      .vs-table--search {
        margin-left: 0;
        max-width: unset;
        width: 100%;

        .vs-table--search-input {
          width: 100%;
        }
      }
    }

    @media (max-width: 461px) {
      .items-per-page-handler {
        display: none;
      }
    }

    @media (max-width: 341px) {
      .data-list-btn-container {
        width: 100%;

        .dd-actions,
        .btn-add-new {
          width: 100%;
          margin-right: 0 !important;
        }
      }
    }

    .product-name {
      max-width: 23rem;
    }

    .vs-table--header {
      display: flex;
      flex-wrap: wrap;
      margin-left: 1.5rem;
      margin-right: 1.5rem;

      > span {
        display: flex;
        flex-grow: 1;
      }

      .vs-table--search {
        padding-top: 0;

        .vs-table--search-input {
          padding: 0.9rem 2.5rem;
          font-size: 1rem;

          & + i {
            left: 1rem;
          }

          &:focus + i {
            left: 1rem;
          }
        }
      }
    }

    .vs-table {
      border-collapse: separate;
      border-spacing: 0 1.3rem;
      padding: 0 1rem;

      tr {
        box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.05);

        td {
          padding: 20px;

          &:first-child {
            border-top-left-radius: 0.5rem;
            border-bottom-left-radius: 0.5rem;
          }

          &:last-child {
            border-top-right-radius: 0.5rem;
            border-bottom-right-radius: 0.5rem;
          }
        }

        td.td-check {
          padding: 20px !important;
        }
      }
    }

    .vs-table--thead {
      th {
        padding-top: 0;
        padding-bottom: 0;

        .vs-table-text {
          text-transform: uppercase;
          font-weight: 600;
        }
      }

      th.td-check {
        padding: 0 15px !important;
      }

      tr {
        background: none;
        box-shadow: none;
      }
    }

    .vs-table--pagination {
      justify-content: center;
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
