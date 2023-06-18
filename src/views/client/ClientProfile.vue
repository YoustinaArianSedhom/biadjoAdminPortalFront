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
      <span>record with ID : {{ $route.params.Id }} not found. </span>
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
          <div class="vx-col flex-1" id="account-info-col-1">
            <table>
              <tr>
                <td class="font-semibold">{{ $t("FullName") }}</td>
                <td>{{ FormData.firstName }} {{ FormData.lastName }}</td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("PhoneNumber") }}</td>
                <td>
                  <span :dir="$vs.rtl ? 'ltr' : 'ltr'">{{
                    FormData.UserName
                  }}</span>
                </td>
              </tr>
              <tr v-clipboard:copy="FormData.Id" v-clipboard:success="onCopy">
                <td class="font-semibold">
                  {{ $t("UserID") }}
                </td>
                <td>
                  {{ FormData.Id }}
                </td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("Email") }}</td>
                <td>{{ FormData.Email }}</td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("CreditLimit") }}</td>
                <td>
                  {{ FormData.CreditLimet | numFormat("###,##0.00") }}
                  {{ $t(FormData.countrycode + "_Currency") }}
                </td>
              </tr>

              <tr>
                <td class="font-semibold">{{ $t("FreeTrips") }}</td>
                <td>{{ FormData.FreeTrips }}</td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("AccountType") }}</td>
                <td>
                  {{ $t(FormData.AccountType) }}
                </td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("AccountStatus") }}</td>
                <td style="width:75vw">
                  <v-select
                    :reduce="Code => Code.Code"
                    class="mt-1 w-full"
                    :options="this.$options.AccountStatusJson"
                    :dir="$vs.rtl ? 'rtl' : 'ltr'"
                    :get-option-label="option => $t(option.Code)"
                    v-model="FormData.AccountStatus"
                    @input="confirmChangeStatus"
                  >
                  </v-select>
                </td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("VATREQ") }}</td>
                <td>
                  <vs-checkbox
                    @input="AddRemoveVAT"
                    v-model="FormData.VATREQ"
                    >{{ $t(FormData.VATREQ + "Bool") }}</vs-checkbox
                  >
                </td>
              </tr>
            </table>
          </div>

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
                <td class="font-semibold">{{ $t("State") }}</td>
                <td>{{ FormData.state }}</td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("City") }}</td>
                <td>{{ FormData.city }}</td>
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
                <td class="font-semibold">{{ $t("UserBalance") }}</td>
                <td>
                  {{ FormData.UserBalance | numFormat("###,##0.00") }}
                  {{ $t(FormData.countrycode + "_Currency") }}
                </td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("CompanyUser") }}</td>
                <td v-if="FormData.CompanyUser">
                  {{ $t("trueBool") }}
                </td>
                <td v-else>
                  {{ $t("falseBool") }}
                </td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("CompanyID") }}</td>
                <td>
                  {{ $t(FormData.CompanyId) }}
                </td>
              </tr>
            </table>
          </div>

          <div class="flex flex-wrap m-4">
            <div class="btn-group mb-2 mt-2 ">
              <vx-tooltip v-bind:text="$t('ClickRefresh')">
                <vs-button
                  radius
                  v-hotkey="keymap"
                  @click="fetchData()"
                  class="mr-4 mt-1"
                  color="success"
                  type="filled"
                  icon-pack="feather"
                  icon="icon-refresh-cw"
                ></vs-button>
              </vx-tooltip>
            </div>

            <div class="btn-group mb-2 mt-2 ">
              <router-link
                :to="{
                  name: 'Client-add/Edit',
                  params: {
                    data: {
                      Id: FormData.Id,
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
            <div
              class="btn-group mb-2 mt-2 "
              v-show="FormData.CompanyUser == true"
            >
              <router-link
                :to="{
                  name: 'ClientCompanyDetails',
                  params: {
                    Id: FormData.CompanyId
                  }
                }"
              >
                <vs-button class="mr-4">
                  {{ $t("ShowCompanyDetails") }}</vs-button
                >
              </router-link>
            </div>
            <div class="btn-group mb-2 mt-2 ">
              <router-link
                :to="{
                  name: 'RequestBiadjo',
                  params: {
                    CID: FormData.Id
                  }
                }"
              >
                <vs-button class="mr-4"> {{ $t("RequestBiadjo") }}</vs-button>
              </router-link>
            </div>

            <div class="btn-group mb-2 mt-2 ">
              <router-link
                :to="{
                  name: 'ScheduledBiadjoOfClient',
                  params: { Id: FormData.Id }
                }"
              >
                <vs-button icon-pack="feather" class="mr-4">
                  {{ $t("ScheduledBiadjo") }}</vs-button
                >
              </router-link>
            </div>
            <div class="btn-group mb-2 mt-2 ">
              <router-link
                :to="{
                  name: 'BiadjoHistoryOfClient',
                  params: { Id: FormData.Id }
                }"
              >
                <vs-button icon-pack="feather" class="mr-4">
                  {{ $t("BiadjoHistory") }}</vs-button
                >
              </router-link>
            </div>
            <div class="btn-group mb-2 mt-2 ">
              <router-link
                :to="{
                  name: 'TransactionsHistoryOfClient',
                  params: { Id: FormData.Id }
                }"
              >
                <vs-button class="mr-4" icon-pack="feather">{{
                  $t("ViewTransactionsHistory")
                }}</vs-button>
              </router-link>
            </div>
            <div class="btn-group mb-2 mt-2 ">
              <router-link
                :to="{
                  name: 'AddClientBalance',
                  params: { Id: FormData.Id, CC: FormData.countrycode }
                }"
              >
                <vs-button
                  icon-pack="feather"
                  class="mr-4"
                  v-show="$acl.check('Accountant')"
                  >{{ $t("AddBalance") }}</vs-button
                >
              </router-link>
            </div>

            <div class="btn-group mb-2 mt-2 ">
              <router-link
                :to="{
                  name: 'DeductClientBalance',
                  params: { Id: FormData.Id, CC: FormData.countrycode }
                }"
              >
                <vs-button
                  icon-pack="feather"
                  class="mr-4"
                  v-show="$acl.check('Accountant')"
                  >{{ $t("DeductBalance") }}</vs-button
                >
              </router-link>
            </div>
            <div class="btn-group mb-2 mt-2 ">
              <router-link
                :to="{
                  name: 'ClientExpensesStatement',
                  params: {
                    M: FormData.PhoneNumber,
                    C: FormData.countrycode
                  }
                }"
              >
                <vs-button icon-pack="feather" class="mr-4">{{
                  $t("ClientExpensesStatement")
                }}</vs-button>
              </router-link>
            </div>
            <div class="btn-group mb-2 mt-2 " v-if="!FormData.CompanyUser">
              <router-link
                :to="{
                  name: 'ChangeUserAccountToCompany',
                  params: {
                    mob: FormData.PhoneNumber
                  }
                }"
              >
                <vs-button icon-pack="feather" class="mr-4">{{
                  $t("ChangeUserAccountToCompany")
                }}</vs-button>
              </router-link>
            </div>
            <div class="btn-group mb-2 mt-2">
              <vs-button
                color="dark"
                @click="FCMconfirmation('logout')"
                v-show="$acl.check('UserManagement') && FormData.FCMToken"
                class="mr-4"
              >
                {{ $t("logout") }}
              </vs-button>
            </div>
            <div class="btn-group mb-2 mt-2">
              <vs-button
                color="dark"
                @click="FCMconfirmation('reset')"
                v-show="$acl.check('UserManagement') && FormData.FCMToken"
                class="mr-4"
              >
                {{ $t("reset") }}
              </vs-button>
            </div>
            <div class="btn-group mb-2 mt-2">
              <vs-button
                color="dark"
                @click="popupCountryJson = true"
                v-show="$acl.check('UserManagement') && FormData.FCMToken"
                class="mr-4"
              >
                {{ $t("changeCountry") }}
              </vs-button>
            </div>

            <div class="btn-group mb-2 mt-2">
              <vs-button
                color="dark"
                @click="popupNavigateToMob = true"
                class="mr-4"
              >
                {{ $t("GoToMob") }}
              </vs-button>
            </div>
            <div class="btn-group mb-2 mt-2">
              <vs-button
                color="dark"
                @click="popupNavigateToWeb = true"
                class="mr-4"
              >
                {{ $t("GoToWeb") }}
              </vs-button>
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

      <vx-card>
        <div class="vx-row ">
          <div class="vx-col w-full">
            <VxTimeline v-if="IsClientNotes" :data="ClientNotes"></VxTimeline>
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
                @click="AddClientNote"
              ></vs-button>
            </div>
          </vs-row>
        </div>
      </vx-card>

      <vs-popup fullscreen :active.sync="popupCountryJson">
        <div class="vx-row">
          <vs-input
            class="w-full m-4"
            placeholder="Country Search"
            v-model="search"
          />
        </div>
        <div class="vx-row w-full">
          <div
            class="vx-col w-1/2 cursor-pointer hover:text-dark hover:bg-primary rounded-full"
            v-for="(item, index) in filteredList"
            :key="index"
          >
            <span @click="FCMconfirmation('changeCountry', item)">
              <img
                class=" w-8 h-8"
                :src="require(`@/assets/flags/${item.asset}`)"
              />
              <span class="align-buttom m-1 text-lg"> {{ item.name }} </span>
            </span>
          </div>
        </div>
      </vs-popup>

      <vs-popup :active.sync="popupNavigateToMob">
        <div class="vx-row">
          <div
            class="vx-col w-full cursor-pointer hover:text-dark hover:bg-primary rounded-full"
            v-for="(item, index) in NavigateToMobList"
            :key="index"
          >
            <div @click="FCMconfirmation('GoTo', item)" class="mb-2">
              <span class="align-buttom m-2 text-lg"> {{ $t(item) }} </span>
            </div>
          </div>
        </div>
      </vs-popup>

      <vs-popup :active.sync="popupNavigateToWeb">
        <div class="vx-row">
          <div
            class="vx-col w-full cursor-pointer hover:text-dark hover:bg-primary rounded-full"
            v-for="(item, index) in NavigateToWebList"
            :key="index"
          >
            <div @click="FCMconfirmation('GoTo', item)" class="mb-2">
              <span class="align-buttom m-2 text-lg"> {{ $t(item) }} </span>
            </div>
          </div>
        </div>
      </vs-popup>
    </div>
  </div>
</template>
<script>
import country_JSON from "@/views/jsonFiles/country.json";
import moduleClient from "@/store/client/moduleClient.js";
import AccountStatus_JSON from "./../driver/json/accountStatusForClientAndUser";
import VxTimeline from "@/components/timeline/VxTimeline.vue";

export default {
  countryJson: country_JSON,
  AccountStatusJson: AccountStatus_JSON,
  data() {
    return {
      Type: null,
      search: "",
      routeName: null,
      popupCountryJson: false,
      popupNavigateToMob: false,
      popupNavigateToWeb: false,
      NavigateToMobList: [
        "ChangeLanguageScreen",
        "ChangePhoneScreen",
        "ContactUsScreen",
        "EditProfileScreen",
        "SupportScreen",
        "WalletHistoryScreen",
        "WalletSavedPaymentScreen"
      ],
      NavigateToWebList: [
        "UserPersonalDetails",
        "Contact-Us",
        "Wallet",
        "TransactionsHistory",
        "AddCompanyUser",
        "SwitchIndividualToCompany",
        "CompanyProfile",
        "CompanyUserProfile",
        "home"
      ],
      CountryModel: {},
      userInfo: {},
      NoteModel: {
        AdminUserId: "",
        ClientID: "",
        Notice: ""
      },
      IsClientNotes: false,
      ClientNotes: [
        {
          time: null,
          desc: null,
          title: null,
          color: "primary",
          icon: "PlusIcon"
        }
      ],
      FormData: {},
      client_not_found: false
    };
  },
  computed: {
    filteredList() {
      return this.$options.countryJson.filter(Element => {
        return Element.name.toLowerCase().includes(this.search.toLowerCase());
      });
    },
    keymap() {
      return {
        "alt+l": this.fetchData
      };
    }
  },
  components: { VxTimeline },
  methods: {
    AddRemoveVAT() {
      var Obj = {};
      Obj.AdminUserId = JSON.parse(localStorage.getItem("userInfo")).Id;
      Obj.UserId = this.FormData.Id;
      Obj.VATREQ = this.FormData.VATREQ;
      this.$store
        .dispatch("ClientList/AddRemoveVAT", Obj)
        .then(response => {
          if (response.status == 200) {
            this.$vs.loading.close();
            window.showSuccess();
          }
        })
        .catch(() => {
          this.$vs.loading.close();
          window.showError();
        });
    },
    FCMconfirmation(Type, Model) {
      switch (Type) {
        case "changeCountry":
          this.CountryModel = Model;
          this.popupCountryJson = false;

          break;
        case "GoTo":
          this.routeName = Model;
          this.popupNavigateToMob = false;
          this.popupNavigateToWeb = false;

          break;

        default:
          break;
      }

      this.Type = Type;
      this.$vs.dialog({
        type: "confirm",
        color: "#27ABBE",
        title: this.$t("Confirm"),
        text:
          this.$t("YouAreAboutTo") +
          " " +
          this.$t(Type) +
          " " +
          this.$t("Client") +
          " (" +
          this.FormData.firstName +
          " " +
          this.FormData.lastName +
          ")",
        cancelText: this.$t("Cancel"),
        accept: this.FCMdReConfirmation,
        acceptText: this.$t("Confirm")
      });
    },
    FCMdReConfirmation() {
      this.$vs.dialog({
        type: "confirm",
        color: "#27ABBE",
        title: this.$t("ReConfirm"),
        text:
          this.$t("YouAreAboutTo") +
          " " +
          this.$t(this.Type) +
          " " +
          this.$t("Client") +
          " (" +
          this.FormData.firstName +
          " " +
          this.FormData.lastName +
          ")",
        cancelText: this.$t("Cancel"),
        accept: this.FCM,
        acceptText: this.$t("Confirm")
      });
    },
    FCM() {
      this.$vs.loading();
      let FcmModel = {
        to: this.FormData.FCMToken,
        notification: {
          title: "Biadjo",
          body: "Biadjo Technical Controlling"
        },
        data: {
          controller: this.Type,
          country: this.CountryModel.name || "",
          countryCode: this.CountryModel.isoCode || "",
          routeName: this.routeName
        }
      };
      this.$store
        .dispatch("auth/FcmController", FcmModel)
        .then(res => {
          if (res.status == 200) {
            this.NoteModel.Notice = `FCM Action was occured (${this.Type})`;
            this.AddClientNote();
            this.$vs.loading.close();
          }
        })
        .catch(() => {
          this.$vs.loading.close();
        });
    },
    onCopy() {
      window.onCopy();
    },
    Back() {
      this.$router.go(-1);
    },

    confirmChangeStatus() {
      this.$vs.dialog({
        type: "confirm",
        color: "#27ABBE",
        title: this.$t("ConfirmChange"),
        text: this.$t("YouAreAboutToChangeThisClientStatus"),
        accept: this.ChangeRecord,
        acceptText: this.$t("Save"),
        cancelText: this.$t("Cancel"),
        cancel: this.CancelAlert
      });
    },
    CancelAlert() {
      this.FormData.AccountStatus = this.OldAccountStatus;
    },
    ChangeRecord() {
      if (this.FormData.AccountStatus == null) {
        this.FormData.AccountStatus = this.OldAccountStatus;
        return;
      }
      var client = {};
      client.Id = this.$route.params.Id;
      client.AccountStatus = this.FormData.AccountStatus;
      client.AdminUserId = this.userInfo.Id;
      this.$store
        .dispatch("ClientList/UpdateClientAccountStatus", client)
        .then(res => {
          if (res.status === 200) {
            this.OldAccountStatus = this.FormData.AccountStatus;
            this.getClientNotes();
            window.showSuccess();
          }
        })
        .catch(() => {
          window.showError();
        });
    },
    getClientNotes() {
      this.$vs.loading();
      this.ClientNotes = [];
      var Client = {};
      Client.ClientID = this.$route.params.Id;
      this.$store
        .dispatch("ClientList/GetClientNotes", Client)
        .then(response => {
          if (response.data.length > 0) {
            this.ClientNotes = response.data;
            this.IsClientNotes = true;

            this.$vs.loading.close();
          } else {
            this.$vs.loading.close();
          }
        });
    },
    AddClientNote() {
      this.NoteModel.AdminUserId = this.userInfo.Id;
      this.NoteModel.ClientID = this.$route.params.Id;
      this.$vs.loading();
      this.$store
        .dispatch("ClientList/AddNoticeToClient", this.NoteModel)
        .then(response => {
          if (response.data == true) {
            this.NoteModel.Notice = "";
            this.getClientNotes();
            window.showSuccessAddNote();

            this.$vs.loading.close();
          } else {
            window;
            this.$vs.loading.close();
            window.showError();
          }
        });
    },
    fetchData() {
      this.$vs.loading();
      if (!moduleClient.isRegistered) {
        this.$store.registerModule("ClientList", moduleClient);
        moduleClient.isRegistered = true;
      }
      this.userInfo = JSON.parse(localStorage.getItem("userInfo"));

      var client = {};
      client.Id = this.$route.params.Id;
      client.PhoneNumber = "";
      this.$store
        .dispatch("ClientList/GetClientById", client)
        .then(res => {
          this.FormData = res.data[0];
          this.OldAccountStatus = res.data[0].AccountStatus;
          this.$vs.loading.close();
        })
        .catch(() => {
          window.showError();
        });
      this.getClientNotes();
    }
  },

  created() {
    this.fetchData();
  }
};
</script>

<style lang="scss">
/* width */
.scroll::-webkit-scrollbar {
  width: 15px;
}

/* Track */
.scroll::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey;
  border-radius: 5px;
}

/* Handle */
.scroll::-webkit-scrollbar-thumb {
  background: #27abbe;
  border-radius: 5px;
}

.scroll-area {
  overflow: auto;
  height: 400px;
}

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
