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
      v-bind:title="$t('clientNotFound')"
      :active.sync="client_not_found"
    >
      <span>client record with id: {{ $route.params.Id }} not found. </span>
      <span>
        <span>Check </span
        ><router-link
          :to="{ name: 'ClientProfile' }"
          class="text-inherit underline"
          >All Clients</router-link
        >
      </span>
    </vs-alert>

    <div id="user-data" v-if="FormData">
      <vx-card v-bind:title="$t('ClientInformation')" class="mb-base">
        <div class="vx-row">
          <!-- Avatar Col -->
          <!-- Information - Col 1 -->
          <div class="vx-col flex-1" id="account-info-col-1">
            <table>
              <tr>
                <td class="font-semibold">{{ $t("FirstName") }}:</td>
                <!-- <td>{{ FormData.firstName }}</td> -->
                <td>
                  <vs-input
                    class="w-full"
                    v-model="FormData.firstName"
                    v-validate="'required'"
                    name="firstName"
                  />
                  <span
                    class="text-danger text-sm"
                    v-show="errors.has('firstName')"
                    >{{ errors.first("firstName") }}</span
                  >
                </td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("LastName") }} :</td>
                <!-- <td>{{ FormData.lastName }}</td> -->
                <td>
                  <vs-input
                    class="w-full"
                    v-model="FormData.lastName"
                    v-validate="'required'"
                    name="lastName"
                  />
                  <span
                    class="text-danger text-sm"
                    v-show="errors.has('lastName')"
                    >{{ errors.first("lastName") }}</span
                  >
                </td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("Email") }} :</td>
                <td>
                  <vs-input
                    class="w-full"
                    v-model="FormData.Email"
                    v-validate="'required|email'"
                    name="Email"
                  />
                  <span
                    class="text-danger text-sm"
                    v-show="errors.has('Email')"
                    >{{ errors.first("Email") }}</span
                  >
                </td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("AccountStatus") }}:</td>
                <!-- <td>{{ FormData.AccountStatus }}</td> -->
                <td style="width:75vw">
                  <v-select
                    style="padding:0px !important"
                    :reduce="Code => Code.Code"
                    class=" w-full"
                    :options="this.$options.AccountStatusJson"
                    :dir="$vs.rtl ? 'rtl' : 'ltr'"
                    :get-option-label="option => $t(option.Code)"
                    v-model="FormData.AccountStatus"
                    :ignoreAccent="true"
                  ></v-select>
                </td>
              </tr>
            </table>
          </div>

          <div class="vx-col flex-1" id="account-info-col-2">
            <table>
              <tr v-show="$acl.check('Accountant')">
                <td class="font-semibold">{{ $t("CreditLimit") }} :</td>
                <td style="width:75vw">
                  <vs-input
                    class="w-full"
                    v-model="FormData.CreditLimet"
                    name="CreditLimit"
                    type="number"
                    @keypress="isNumber($event)"
                  />
                  <!-- <span
                    class="text-danger text-sm"
                    v-show="errors.has('CreditLimit')"
                    >{{ errors.first("CreditLimit") }}</span
                  > -->
                </td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("FreeTrips") }} :</td>
                <td>
                  <vs-input
                    class="w-full"
                    v-model="FormData.FreeTrips"
                    name="FreeTrips"
                    v-validate="'required|numeric'"
                    @keypress="isNumber($event)"
                    type="number"
                  />
                  <span
                    class="text-danger text-sm"
                    v-show="errors.has('FreeTrips')"
                    >{{ errors.first("FreeTrips") }}</span
                  >
                </td>
              </tr>
              <tr>
                <td>
                  <label class="font-semibold">{{ $t("State") }}</label>
                </td>
                <td>
                  <v-select
                    :get-option-label="option => $t(option[StateWithLocale])"
                    class="mt-1 w-full p-0"
                    v-validate="'required'"
                    name="State"
                    v-model="FormData.state"
                    @input="GetCityList(FormData.state)"
                    :reduce="admin1Name_en => admin1Name_en.admin1Name_en"
                    :options="StateList"
                    :dir="$vs.rtl ? 'rtl' : 'ltr'"
                  />

                  <span
                    class="text-danger text-sm"
                    v-show="errors.has('State')"
                    >{{ errors.first("State") }}</span
                  >
                </td>
              </tr>
              <tr>
                <td>
                  <label class="font-semibold">{{ $t("City") }}</label>
                </td>
                <td>
                  <v-select
                    :get-option-label="option => $t(option[CityWithLocale])"
                    class="mt-1 w-full p-0"
                    v-validate="'required'"
                    name="City"
                    v-model="FormData.city"
                    :reduce="admin2Name_en => admin2Name_en.admin2Name_en"
                    :options="CityList"
                    :dir="$vs.rtl ? 'rtl' : 'ltr'"
                  />

                  <span
                    class="text-danger text-sm"
                    v-show="errors.has('City')"
                    >{{ errors.first("City") }}</span
                  >
                </td>
              </tr>
            </table>
          </div>
          <div class="vx-col w-full flex" id="account-manage-buttons">
            <div class="btn-group mb-2 mt-2 ">
              <vs-button
                class="mr-4"
                @click="confirmSave"
                :disabled="!validateForm"
              >
                {{ $t("SaveChanges") }}
              </vs-button>
            </div>
            <div class="btn-group mb-2 mt-2 ">
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
    </div>
  </div>
</template>

<script>
import moduleClient from "@/store/client/moduleClient.js";
import AccountStatus_JSON from "./../driver/json/accountStatusForClientAndUser";
import vSelect from "vue-select";
import moduleCountry from "@/store/countrySetting/moduleCountry.js";

export default {
  AccountStatusJson: AccountStatus_JSON,
  components: {
    vSelect
  },
  // props: {
  //   data: {
  //     type: Object,
  //     required: true,
  //   },
  // },
  data() {
    return {
      FormData: {},
      CityList: [],
      StateList: [],
      client_not_found: false
    };
  },
  computed: {
    StateWithLocale() {
      let State = "admin1Name_en";
      if (this.$i18n.locale == "ar") {
        State = "admin1Name_ar";
      }
      return State;
    },
    CityWithLocale() {
      let City = "admin2Name_en";
      if (this.$i18n.locale == "ar") {
        City = "admin2Name_ar";
      }
      return City;
    },
    validateForm() {
      return (
        !this.errors.any() &&
        this.FormData.firstName != "" &&
        this.FormData.lastName != "" &&
        this.FormData.Email != "" &&
        this.FormData.AccountStatus != null &&
        this.FormData.city != null &&
        this.FormData.city != "" &&
        this.FormData.state != null &&
        this.FormData.FreeTrips != null
      );
    }
  },
  methods: {
    GetCityList(StateName) {
      var Model = {};
      Model.StateName = StateName;
      this.$store
        .dispatch("CountryList/GetCityList", Model)
        .then(res => {
          debugger;
          this.CityList = res.data;
        })
        .catch(() => {});
    },
    isNumber: function(evt) {
      evt = evt || window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        evt.preventDefault();
      } else {
        return true;
      }
    },
    Back() {
      this.$router.go(-1);
    },
    capitalize(str) {
      return str.slice(0, 1).toUpperCase() + str.slice(1, str.length);
    },
    save_changes() {
      if (!this.validateForm) {
        window.showFillData();
        return;
      }
      this.$vs.loading();
      let AdminUserId = JSON.parse(localStorage.getItem("userInfo")).Id;
      this.FormData.Id = this.$route.params.Id;
      let UpdateBiadjoObj = {};
      UpdateBiadjoObj.AdminUserId = AdminUserId;
      UpdateBiadjoObj.ClientAccount = JSON.stringify(this.FormData);
      this.$store
        .dispatch("ClientList/UpdateClientById", UpdateBiadjoObj)
        .then(res => {
          if (res.status == 200) {
            this.$vs.loading.close();
            window.showSuccess();
          }
        })
        .catch(() => {
          this.$vs.loading.close();
          window.showError();
        });
    },

    confirmSave() {
      if (!this.validateForm) {
        window.showFillData();
        return;
      }
      this.$vs.dialog({
        type: "confirm",
        color: "#27ABBE",
        title: this.$t("ConfirmChange"),
        text: this.$t("YouAreAboutToChangeThisClientData"),
        accept: this.save_changes,
        acceptText: this.$t("Save"),
        cancelText: this.$t("Cancel")
      });
    }
  },
  created() {
    this.$vs.loading();

    if (!moduleCountry.isRegistered) {
      this.$store.registerModule("CountryList", moduleCountry);
      moduleCountry.isRegistered = true;
    }

    var Model = {};
    Model.CountryCode = "EG";
    this.$store
      .dispatch("CountryList/GetStateList", Model)
      .then(res => {
        debugger;
        this.StateList = res.data;
      })
      .catch(() => {});

    if (!moduleClient.isRegistered) {
      this.$store.registerModule("ClientList", moduleClient);
      moduleClient.isRegistered = true;
    }
    var client = {};
    client.Id = this.$route.params.Id;
    client.PhoneNumber = "";
    this.$store
      .dispatch("ClientList/GetClientById", client)
      .then(res => {
        this.FormData = res.data[0];
        if (this.FormData.state) {
          this.GetCityList(this.FormData.state);
        }
        this.$vs.loading.close();
        window.notAllowedToAccessCurrentPage(this.FormData.AccountStatus);
      })
      .catch(() => {
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

@media screen and (min-width: 1201px) and (max-width: 1211px),
  only screen and (min-width: 636px) and (max-width: 991px) {
  #account-info-col-1 {
    width: calc(100% - 12rem) !important;
  }
}
</style>
