<template>
  <div id="page-client-view">
    <div id="company-data">
      <vx-card
        v-bind:title="$t('AddBalance')"
        class="mb-base"
        id="account-info"
      >
        <vs-row vs-type="flex" vs-justify="center">
          <vs-col
            class="m-4"
            vs-type="flex"
            vs-justify="center"
            vs-align="center"
            vs-w="12"
          >
            <div class="flex flex-wrap m-4">
              <div class="btn-group mb-2 mt-2 ml-4">
                <div>
                  <label class="text-sm opacity-75">{{ $t("Amount") }}</label>

                  <vx-input-group>
                    <vs-input
                      type="number"
                      min="1"
                      v-validate="'required'"
                      name="Amount"
                      v-model="Model.Amount"
                    />

                    <template slot="append">
                      <div class="append-text btn-addon">
                        <vs-button
                          color="success"
                          type="filled"
                          :disabled="true"
                        >
                          {{ $t(countrycode + "_Currency") }}
                        </vs-button>
                      </div>
                    </template>
                  </vx-input-group>
                  <span class="text-danger text-sm">{{
                    errors.first("Amount")
                  }}</span>
                </div>
              </div>

              <div class="btn-group mb-2 mt-2  ml-4">
                <label class="text-sm opacity-75">{{
                  $t("PaymentMethod")
                }}</label>
                <v-select
                  style="width:220px"
                  :reduce="Code => Code.Code"
                  class=" "
                  :options="this.$options.PaymentMethod"
                  :dir="$vs.rtl ? 'rtl' : 'ltr'"
                  :get-option-label="option => $t(option.Code)"
                  v-model="Model.PaymentMethod"
                  @input="setMethodNo"
                ></v-select>
              </div>

              <div class="btn-group mb-2 mt-2 ml-4">
                <div>
                  <label class="text-sm opacity-75">{{
                    $t(NumberLable)
                  }}</label>
                  <vs-input
                    style="width:220px"
                    v-validate="'required'"
                    name="Transaction Number"
                    v-model="Model.TransactionNo"
                  />
                  <span class="text-danger text-sm">{{
                    errors.first("Transaction Number")
                  }}</span>
                </div>
              </div>
            </div>
          </vs-col>
        </vs-row>

        <div class="flex flex-wrap justify-center ">
          <vs-button
            type="border"
            color="warning"
            class="mr-4"
            icon-pack="feather"
            @click="Back"
            >{{ $t("Back") }}</vs-button
          >
          <vs-button
            @click="addBalane"
            class="mr-4"
            :disabled="!validateForm"
            >{{ $t("AddBalance") }}</vs-button
          >
        </div>

        <div class="addBalane-result">
          <vs-popup
            classContent="popup-example"
            v-bind:title="$t('TransactionInfo')"
            :active.sync="successTransaction"
          >
            <successTransaction
              :Response="Response"
              @ClosePopup="successTransaction = false"
            ></successTransaction>
          </vs-popup>
        </div>
      </vx-card>
    </div>
  </div>
</template>

<script>
//import moduleUser from "@/store/user/moduleUser.js";

import PaymentMethod from "./json/PaymentMethod.json";
import moduleDriver from "@/store/driver/moduleDriver.js";

export default {
  PaymentMethod: PaymentMethod,

  data() {
    return {
      userInfo: {},
      countrycode: null,
      NumberLable: "TransactionNo",
      Response: {},
      successTransaction: false,
      Model: {
        Id: "",
        PhoneNumber: "",
        Amount: "",
        PaymentMethod: "",
        TransactionNo: "",
        AdminUserId: ""
      }
    };
  },
  components: {
    successTransaction: () =>
      import("@/views/generalPopups/successTransaction.vue")
  },
  computed: {
    validateForm() {
      return (
        !this.errors.any() &&
        this.Model.Id != "" &&
        this.Model.Id != undefined &&
        this.Model.Amount != "" &&
        this.Model.TransactionNo != "" &&
        this.Model.PaymentMethod != "" &&
        this.Model.PaymentMethod != null
      );
    }
  },
  methods: {
    setMethodNo() {
      switch (this.Model.PaymentMethod) {
        case "P2":
          this.NumberLable = "ReceiptNumber";
          break;
        case "P3":
          this.NumberLable = "TransactionReferenceForCreditDebitCard";
          break;
        case "P4":
          this.NumberLable = "ChequeNumber";
          break;
        case "P5":
          this.NumberLable = "BankTransferReference";
          break;
        default:
          this.NumberLable = "TransactionNo";
          break;
      }
    },
    addBalane() {
      if (!this.validateForm) {
        window.showFillData();
        return;
      }
      this.$vs.loading();
      this.Model.AdminUserId = JSON.parse(localStorage.getItem("userInfo")).Id;

      this.$store
        .dispatch("DriverList/AddBalanceDriver", this.Model)
        .then(response => {
          this.Response = response.data;
          this.successTransaction = true;
          this.Model.Amount = "";
          this.Model.TransactionNo = "";
          this.Model.PaymentMethod = null;
          this.$vs.loading.close();
          window.showSuccess();
        })
        .catch(Error => {
          if (Error.status == 400) {
            this.$vs.notify({
              title: this.$t("Error"),
              text: Error.data.Error,
              iconPack: "feather",
              icon: "icon-alert-circle",
              color: "danger"
            });
          }
          this.$vs.loading.close();
        });
    },
    Back() {
      this.$router.go(-1);
    }
  },
  created() {
    if (!moduleDriver.isRegistered) {
      this.$store.registerModule("DriverList", moduleDriver);
      moduleDriver.isRegistered = true;
    }

    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.Model.Id = this.$route.params.DriverId;
    this.countrycode = this.$route.params.CC;
    this.Model.AdminUserId = this.userInfo.Id;
  }
};
</script>
