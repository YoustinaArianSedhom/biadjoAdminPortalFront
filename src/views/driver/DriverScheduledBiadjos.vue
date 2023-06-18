<!-- =========================================================================================
  File Name: driverView.vue
  Description: driver View page
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/driver/pixinvent
========================================================================================== -->

<template>
  <div id="page-driver-view">
    <vs-alert color="danger" title="No Data Found" :active.sync="ID_Not_Found">
      <span
        >Sorry... No Data Found For Driver with ID :
        <a> {{ $route.params.Id }} </a>.</span
      >
      <span>
        <span>Check For Another Driver </span>
        <router-link :to="{ name: 'Driver' }" class="text-inherit underline"
          >All drivers</router-link
        >
      </span>
    </vs-alert>
    <div class="w-full" id="Scroll">
      <vx-card>
        <div id="data-list-list-view" class="data-list-container">
          <vs-table
            ref="table"
            pagination
            :max-items="itemsPerPage"
            search
            :data="Model"
          >
            <div
              slot="header"
              class="flex flex-wrap-reverse items-center flex-grow justify-between"
            >
              <vs-button
                class="mr-4 mb-4"
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
              <vs-th sort-key="Biadjo Number">{{ $t("BiadjoNumber") }}</vs-th>
              <vs-th sort-key="Price">{{ $t("Price") }}</vs-th>
              <vs-th sort-key="Schedual">{{ $t("Schedual") }}</vs-th>
              <vs-th sort-key="Payment Status">{{ $t("PaymentStatus") }}</vs-th>
              <vs-th sort-key="Status">{{ $t("Status") }}</vs-th>
              <vs-th sort-key="Driver Payment Status">
                {{ $t("DriverPaymentStatus") }}
              </vs-th>
              <vs-th sort-key="Rating">{{ $t("Rating") }}</vs-th>
              <vs-th>{{ $t("Actions") }}</vs-th>
            </template>

            <template slot-scope="{ data }">
              <tbody>
                <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
                  <!-- <vs-td class="img-container">
              <img :src=" baseURL + tr.ImagePathUrl" class="product-img"  v-if="tr.ImagePathUrl != null"/>
              <img :src=" defaultUrl" class="product-img"  v-else/>
                  </vs-td>-->

                  <vs-td>
                    <p class="id font-medium truncate">{{ tr.id }}</p>
                  </vs-td>

                  <vs-td>
                    <p class="Price">
                      {{ tr.Price | numFormat("###,##0.00") }}
                      {{ $t(tr.CountryCode + "_Currency") }}
                    </p>
                  </vs-td>

                  <vs-td>
                    <p class="Schedual">
                      {{ tr.Schedual | formatDate("yyyy/MM/dd HH:mm") }}
                    </p>
                  </vs-td>

                  <vs-td>
                    <vs-chip
                      :color="getOrderStatusColor(tr.PaymentStatus)"
                      class="PaymentStatus"
                      >{{ $t(tr.PaymentStatus) }}</vs-chip
                    >
                  </vs-td>

                  <vs-td>
                    <p class="Status">{{ $t(tr.Status) }}</p>
                  </vs-td>
                  <vs-td>
                    <p class="DriverPaymentStatus">
                      {{ $t(tr.DriverPaymentStatus) }}
                    </p>
                  </vs-td>
                  <vs-td>
                    <p class="Status">{{ tr.Rating | numFormat("0.00") }}</p>
                  </vs-td>
                  <vs-td>
                    <router-link
                      :to="{ name: 'BiadjoDetails', params: { Id: tr.id } }"
                      svgClasses="w-5 h-5 hover:text-primary stroke-current"
                    >
                      <feather-icon
                        icon="ArchiveIcon"
                        svgClasses="w-5 h-5 hover:text-primary stroke-current"
                        style="padding: 2px;"
                      />
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
import moduleDriver from "@/store/driver/moduleDriver.js";
import { en, ar } from "vuejs-datepicker/src/locale";

export default {
  data() {
    return {
      format: "dd/MM/yyyy",
      ar: ar,
      en: en,
      itemsPerPage: 10,
      Model: [],
      ID_Not_Found: false
    };
  },
  computed: {
    DatepickerLang() {
      var SelectedLanguage = {};

      if (this.$i18n.locale == "ar") {
        SelectedLanguage = this.ar;
      } else {
        SelectedLanguage = this.en;
      }
      return SelectedLanguage;
    }
  },
  methods: {
    Back() {
      this.$router.go(-1);
    },
    getOrderStatusColor(status) {
      if (status == "PS3") {
        return "#F8BD30";
      }
      if (status == "PS1") {
        return "#F8BD30";
      }
      if (status == "PS2") {
        return "#039BE5";
      }

      // return "primary";
    }
  },

  created() {
    this.$vs.loading();
    if (!moduleDriver.isRegistered) {
      this.$store.registerModule("DriverList", moduleDriver);
      moduleDriver.isRegistered = true;
    }
    var driver = {};
    driver.DriveId = this.$route.params.Id;
    //  driver.CountryCode= this.$route.params.data.CountryCode ;
    //  driver.PhoneNumber=this.$route.params.data.PhoneNumber ;
    this.$store
      .dispatch("DriverList/getScheduledBiadjos", driver)
      .then(response => {
        if (response.data.length > 0) {
          this.Model = response.data;
          this.$vs.loading.close();
        } else {
          this.$vs.loading.close();
          window.showNoRecords();
        }
      })
      .catch(() => {
        this.$vs.loading.close();
        this.ID_Not_Found = true;
      });
  }
};
</script>
