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

    <div id="Biadjo-data" v-if="FormData != undefined">
      <vx-card v-bind:title="$t('Biadjo')" class="mb-base">
        <!-- Avatar -->
        <div class="vx-row">
          <!-- <div class="vx-col" id="avatar-col">
            <div class="img-container mb-4">
              <img src="https://www.gravatar.com/avatar/HASH?s=400" class="rounded w-full" />
            </div>
          </div>-->

          <div class="vx-col flex-1" id="account-info-col-1">
            <!-- <div class="vx-row "> -->
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
              <tr>
                <td class="font-semibold">{{ $t("DriverPrice") }}</td>
                <td>
                  {{ FormData.DriverPrice | numFormat("###,##0.00") }}
                  {{ $t(FormData.CountryCode + "_Currency") }}
                </td>
              </tr>

              <tr>
                <td class="font-semibold">{{ $t("VAT") }}</td>
                <td>
                  {{ FormData.VAT | numFormat("###,##0.00") }}
                  {{ $t(FormData.CountryCode + "_Currency") }}
                </td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("Insurance") }}</td>
                <td v-if="FormData.Insurance">{{ $t("trueBool") }}</td>
                <td v-else>{{ $t("falseBool") }}</td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("InsuranceValue") }}</td>
                <td>
                  {{ FormData.InsuranceValue | numFormat("###,##0.00") }}
                  {{ $t(FormData.CountryCode + "_Currency") }}
                </td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("Discount") }}</td>
                <td>
                  {{ FormData.Discount | numFormat("###,##0.00") }}
                  {{ $t("%") }}
                </td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("RoadAndScaleCharges") }}</td>
                <td>
                  {{ FormData.RoadAndScaleCharges | numFormat("###,##0.00") }}
                  {{ $t(FormData.CountryCode + "_Currency") }}
                </td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("TotalPrice") }}</td>
                <td>
                  {{ FormData.Total | numFormat("###,##0.00") }}
                  {{ $t(FormData.CountryCode + "_Currency") }}
                </td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("Rating") }}</td>
                <td style="display: flex !important">
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
                    :rtl="StarRatingRTL"
                  >
                  </star-rating>
                  <span> ( {{ FormData.Rating | numFormat("0.00") }} ) </span>
                </td>
              </tr>

              <tr>
                <td class="font-semibold">{{ $t("FleetCompanyId") }}</td>
                <td>
                  {{ FormData.FleetCompanyId }}
                </td>
                <!-- <td v-else>{{$t("ThereIsNoFleetCompany")}}</td> -->
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

              <tr style="width: 1400px">
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
                <td class="font-semibold">{{ $t("CreationDate") }}</td>
                <td>{{ FormData.Date | formatDate("yyyy/MM/dd HH:mm") }}</td>
              </tr>

              <tr>
                <td class="font-semibold">{{ $t("ClosingDate") }}</td>
                <td>
                  {{ FormData.ClosingDate | formatDate("yyyy/MM/dd HH:mm") }}
                </td>
              </tr>
              <tr style="width: 1400px">
                <td class="font-semibold">{{ $t("Country") }}</td>
                <td>{{ FormData.Country }}</td>
              </tr>
              <tr style="width: 1400px">
                <td class="font-semibold">{{ $t("CountryCode") }}</td>
                <td>{{ FormData.CountryCode }}</td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("ClientCompanyId") }}</td>
                <td>
                  {{ FormData.ClientCompanyId }}
                </td>
                <!-- <td v-else>{{$t("ThereIsNoClientCompany")}}</td> -->
              </tr>
              <tr
                v-show="
                  FormData.Status == 'BS1' ||
                    FormData.Status == 'BS2' ||
                    FormData.Status == 'BS3'
                "
              >
                <td class="font-semibold">{{ $t("VATREQ") }}</td>
                <td>
                  <vs-checkbox
                    @input="AddRemoveVAT"
                    v-model="FormData.VATREQ"
                    >{{ $t(FormData.VATREQ + "Bool") }}</vs-checkbox
                  >
                </td>
              </tr>
              <tr style="width: 1400px">
                <td class="font-semibold">{{ $t("KMBiadjo") }}</td>
                <td v-if="FormData.KMBiadjo">{{ $t("trueBool") }}</td>
                <td v-else>{{ $t("falseBool") }}</td>
              </tr>
            </table>
          </div>
        </div>
        <div class="vx-row">
          <vx-tooltip v-bind:text="$t('ClickRefresh')">
            <vs-button
              radius
              v-hotkey="keymap"
              class="m-2"
              @click="fetchData()"
              color="success"
              type="filled"
              icon-pack="feather"
              icon="icon-refresh-cw"
            ></vs-button>
          </vx-tooltip>

          <router-link
            :to="{
              name: 'BiadjoStatusLogHistory',
              params: { Id: FormData.id }
            }"
          >
            <vs-button class="m-2">{{ $t("StatusLogHistory") }}</vs-button>
          </router-link>

          <router-link
            :to="{
              name: 'DriverProfile',
              params: { Id: FormData.DriverId }
            }"
          >
            <vs-button v-show="FormData.DriverId" class="m-2">{{
              $t("ViewDriverDetails")
            }}</vs-button>
          </router-link>

          <router-link
            :to="{ name: 'ClientProfile', params: { Id: FormData.UserId } }"
          >
            <vs-button class="m-2">{{ $t("ViewUserDetails") }}</vs-button>
          </router-link>

          <router-link
            :to="{
              name: 'BiadjoViewSubmittedOrders',
              params: { Id: FormData.id }
            }"
          >
            <vs-button class="m-2">{{ $t("ViewSubmittedOrders") }}</vs-button>
          </router-link>

          <vs-button
            class="m-2"
            v-show="!disableSubmitOffer"
            @click="popupActiveSendOffer = true"
            >{{ $t("SubmitOffer") }}</vs-button
          >
          <vs-button
            class="m-2"
            v-show="FormData.KMBiadjo"
            @click="OpenAddDriverPriceandAssignDrivertoKMBiadjo"
            >{{ $t("AddDriverPriceandAssignDrivertoKMBiadjo") }}</vs-button
          >
          <vs-button
            class="m-2"
            v-show="$acl.check('Settings')"
            @click="popupActiveAddDiscount = true"
            >{{ $t("AddDiscount") }}</vs-button
          >
          <vs-button
            class="m-2"
            v-show="!disableSubmitOffer"
            @click="SubmitOrderToDriverOrFleet = true"
            >{{ $t("SubmitOrderToDriverOrFleet") }}</vs-button
          >

          <vs-button
            class="m-2"
            @click="GetNearByDrivers"
            v-scroll-to="'#Scroll'"
            >{{ $t("FindNearByDrivers") }}</vs-button
          >

          <vs-button
            class="m-2"
            v-show="disable"
            @click="popupAssignToAnotherDriver = true"
            >{{ $t("AssignToDriver") }}</vs-button
          >
          <vs-popup
            class="holamundo"
            v-bind:title="$t('CloseBiadjo')"
            :active.sync="popupAssignToAnotherDriver"
          >
            <popupAssignToAnotherDriver
              :BiadjoId="FormData.id"
              @ClosePopup="popupAssignToAnotherDriver = false"
              @Refresh="RefreshPage"
            ></popupAssignToAnotherDriver>
          </vs-popup>

          <vs-button
            class="m-2"
            v-show="!disableCloseBiadjo"
            icon-pack="feather"
            icon="icon-close"
            @click="popupActiveClosebiadjo = true"
            >{{ $t("CloseBiadjo") }}</vs-button
          >
          <vs-popup
            class="holamundo"
            v-bind:title="$t('CloseBiadjo')"
            :active.sync="popupActiveClosebiadjo"
          >
            <popupActiveClosebiadjo
              :CloseBiadjo="CloseBiadjo"
              @ClosePopup="popupActiveClosebiadjo = false"
            ></popupActiveClosebiadjo>
          </vs-popup>

          <vs-button
            class="m-2"
            v-show="!disableCancelBiadjo"
            icon-pack="feather"
            icon="icon-close"
            @click="checkForCancelationFees"
            >{{ $t("CancelBiadjo") }}</vs-button
          >
          <vs-popup
            class="holamundo"
            v-bind:title="$t('CancelBiadjo')"
            :active.sync="popupActiveCancelBiadjo"
          >
            <popupActiveCancelBiadjo
              :FormData="FormData.id"
              :BiadjoCancelationFee="CancelBiadjo.BiadjoCancelationFee"
              :BiadjoStatus="FormData.Status"
              :BiadjoCountryCode="FormData.CountryCode"
              @ClosePopup="popupActiveCancelBiadjo = false"
            ></popupActiveCancelBiadjo>
          </vs-popup>

          <!-- <vs-dropdown v-if="FormData.VATREQ"> -->
          <vs-dropdown v-if="FormData.PaymentStatus == 'PS1'">
            <a class="flex items-center" href="#">
              <vs-button> {{ $t("PrintInvoice") }} </vs-button>
            </a>

            <vs-dropdown-menu>
              <vs-dropdown-item @click="PrintReportInAR">
                {{ $t("Arabic") }}
              </vs-dropdown-item>

              <vs-dropdown-item @click="PrintReportInEN">
                {{ $t("English") }}
              </vs-dropdown-item>
            </vs-dropdown-menu>
          </vs-dropdown>

          <router-link
            :to="{
              name: 'FollowBiadjoOnMap',
              params: { Id: FormData.id }
            }"
          >
            <vs-button icon-pack="feather" class="m-2">{{
              $t("FollowOnMap")
            }}</vs-button>
          </router-link>

          <router-link
            :to="{
              name: 'RequestBiadjo',
              params: { data: FormData, CID: FormData.UserId }
            }"
          >
            <vs-button icon-pack="feather" class="m-2">{{
              $t("DuplicateBiadjo")
            }}</vs-button>
          </router-link>

          <router-link
            v-show="
              FormData.Status == 'BS5' ||
                FormData.Status == 'BS6' ||
                FormData.Status == 'BS7' ||
                FormData.Status == 'BS8' ||
                FormData.Status == 'BS9' ||
                FormData.Status == 'BS10'
            "
            :to="{
              name: 'ReportBiadjoAccident',
              params: { Id: FormData.id, CountryCode: FormData.CountryCode }
            }"
          >
            <vs-button icon-pack="feather" class="m-2">{{
              $t("ReportAccident")
            }}</vs-button>
          </router-link>

          <router-link
            v-show="FormData.Status == 'BS15' || FormData.Status == 'BS16'"
            :to="{
              name: 'BiadjoAccidentReport',
              params: { Id: FormData.id }
            }"
          >
            <vs-button icon-pack="feather" class="m-2">{{
              $t("AccidentReport")
            }}</vs-button>
          </router-link>

          <vs-button
            icon-pack="feather"
            @click="popupActiveAddInsurance = true"
            class="m-2"
            >{{ $t("AddInsurance") }}</vs-button
          >

          <router-link
            :to="{
              name: 'AccidentPictures',
              params: { Id: FormData.id }
            }"
            target="_blank"
          >
            <vs-button
              v-show="FormData.Status == 'BS15' || FormData.Status == 'BS16'"
              icon-pack="feather"
              icon="icon-image"
              class="m-2"
              >{{ $t("AccidentPictures") }}</vs-button
            >
          </router-link>

          <vs-button
            v-show="
              FormData.Status == 'BS15' &&
                (userInfo.accounttype == 'AAT0' ||
                  userInfo.accounttype == 'AAT3' ||
                  userInfo.accounttype == 'AAT12' ||
                  userInfo.accounttype == 'AAT13')
            "
            icon-pack="feather"
            @click="confirmCloseAccidentBiadjo"
            class="m-2"
            >{{ $t("CloseAccidentBiadjo") }}</vs-button
          >
          <vs-button
            icon-pack="feather"
            @click="ResendBiadjoRequest"
            class="m-2"
            >{{ $t("ResendBiadjoRequest") }}</vs-button
          >

          <vs-button
            v-show="FormData.Status == 'BS11' || FormData.Status == 'BS14'"
            class="m-2"
            @click="popupAddRoadAndScaleChargesr = true"
            >{{ $t("AddRoadAndScaleCharges") }}</vs-button
          >
          <vs-popup
            class="holamundo"
            v-bind:title="$t('AddRoadAndScaleCharges')"
            :active.sync="popupAddRoadAndScaleChargesr"
          >
            <popupAddRoadAndScaleChargesr
              :BiadjoId="FormData.id"
              :BiadjoCountryCode="FormData.CountryCode"
              @ClosePopup="popupAddRoadAndScaleChargesr = false"
              @Refresh="RefreshPage"
            ></popupAddRoadAndScaleChargesr>
          </vs-popup>

          <vs-button
            class="m-2"
            type="border"
            color="warning"
            icon-pack="feather"
            @click="Back"
            >{{ $t("Back") }}</vs-button
          >
        </div>
      </vx-card>

      <BiadjoDetailsPart
        :FormData="FormData"
        :distance="distance"
        :duration="duration"
      ></BiadjoDetailsPart>
    </div>
    <!-- Find nearby Drivers -->
    <div class="w-full mb-4" id="Scroll">
      <vx-card>
        <div
          id="data-list-list-view"
          class="data-list-container"
          v-if="NearByDrivers != undefined || NearByDrivers != null"
        >
          <vs-table
            ref="table"
            pagination
            :max-items="itemsPerPage"
            search
            :data="NearByDrivers"
          >
            <div
              slot="header"
              class="flex flex-wrap-reverse items-center flex-grow justify-between"
            >
              <div class="flex flex-wrap-reverse items-center"></div>
            </div>

            <template slot="thead">
              <!-- <vs-th>Image</vs-th> -->
              <!-- <vs-th sort-key="id">{{ $t("Id") }}</vs-th> -->
              <vs-th sort-key="firstName">{{ $t("FullName") }}</vs-th>
              <!-- <vs-th sort-key="FleetDriver">{{ $t("FleetDriver") }}</vs-th> -->
              <vs-th sort-key="PhoneNumber">{{ $t("PhoneNumber") }}</vs-th>
              <vs-th sort-key="Distance">{{ $t("Distance") }}</vs-th>
              <vs-th sort-key="Duration">{{ $t("Duration") }}</vs-th>
              <vs-th sort-key="DriverInfo">{{ $t("DriverInfo") }}</vs-th>
              <vs-th v-show="disable" sort-key="AssignToDriver">{{
                $t("AssignToDriver")
              }}</vs-th>
              <vs-th
                v-show="!disableSubmitOffer"
                sort-key="SubmitOrderToDriverOrFleet"
                >{{ $t("SubmitOrderToDriverOrFleet") }}</vs-th
              >
            </template>

            <template slot-scope="{ data }">
              <tbody>
                <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
                  <!-- <vs-td v-clipboard:copy="tr.Id" v-clipboard:success="onCopy">
                    <p class="id">{{ tr.Id }}</p>
                  </vs-td> -->
                  <vs-td v-clipboard:copy="tr.Id" v-clipboard:success="onCopy">
                    <p class="firstName">
                      {{ tr.FirstName }} {{ tr.LastName }}
                    </p>
                  </vs-td>
                  <!-- <vs-td>
                    <p class="FleetDriver">{{ tr.FleetDriver }}</p>
                  </vs-td> -->
                  <vs-td
                    v-clipboard:copy="tr.PhoneNumber"
                    v-clipboard:success="onCopy"
                  >
                    <p class="PhoneNumber">
                      <a
                        :href="`tel:${tr.PhoneNumber}`"
                        class=" mr-4 text-primary"
                      >
                        <span :dir="$vs.rtl ? 'ltr' : 'ltr'"
                          >{{ tr.PhoneNumber }}
                        </span>
                      </a>
                    </p>
                  </vs-td>
                  <vs-td>
                    <p class="Distance">{{ tr.Distance }}</p>
                  </vs-td>
                  <vs-td>
                    <p class="Duration">{{ $t(tr.Duration) }}</p>
                  </vs-td>
                  <vs-td class="whitespace-no-wrap">
                    <vs-button
                      class="text-lg"
                      size="small"
                      :to="{
                        name: 'DriverProfile',
                        params: { Id: tr.Id }
                      }"
                      >{{ $t("ViewDriverDetails") }}</vs-button
                    >
                  </vs-td>

                  <vs-td v-show="disable" class="whitespace-no-wrap">
                    <vs-button
                      class="text-lg"
                      size="small"
                      @click="confirmSave(tr.Id)"
                      >{{ $t("AssignToDriver") }}</vs-button
                    >
                  </vs-td>

                  <vs-td
                    class="whitespace-no-wrap"
                    v-show="!disableSubmitOffer"
                  >
                    <vs-button
                      size="small"
                      class="text-lg"
                      @click="confirmSendOrder(tr.Id)"
                      >{{ $t("SubmitOrderToDriverOrFleet") }}</vs-button
                    >
                  </vs-td>
                </vs-tr>
              </tbody>
            </template>
          </vs-table>
        </div>
      </vx-card>
    </div>

    <vx-card>
      <div class="vx-row">
        <div class="vx-col sm:w-2/3 w-full">
          <div class="vx-col w-full">
            <VxTimeline v-if="IsBiadjoNotes" :data="BiadjoNotes"></VxTimeline>
            <span v-else class="text-warning text-lg">{{
              $t("NoNotesAvailable")
            }}</span>
          </div>
          <div class="vx-row sm:w-2/3 w-full">
            <vs-textarea
              class="w-3/4"
              color="primary"
              label-placeholder="Note"
              v-model="NoteModel.Notice"
            />
            <vs-button
              :disabled="NoteModel.Notice == ''"
              @click="AddBiadjoNote"
              type="flat"
              radius
              class="mt-3"
            >
              <feather-icon icon="SendIcon" svgClasses="h-8 w-8" />
            </vs-button>
          </div>
        </div>

        <vs-divider v-if="windowWidth < 500" />
        <div
          class="vx-col scroll-area scroll sm:w-1/3 w-full"
          id="ScrollToEndBiadjo"
        >
          <Bc-BiadjoLogHistoryComponent
            :data="BiadjoStatusLogHistory"
          ></Bc-BiadjoLogHistoryComponent>
        </div>
      </div>
      <div></div>
    </vx-card>

    <!-- Find nearby Drivers -->
    <!-- popup -->
    <div class="parentx-static">
      <vs-popup
        classContent="popup-example"
        v-bind:title="$t('SubmitOffer')"
        :active.sync="popupActiveSendOffer"
      >
        <popupActiveSendOffer
          :BiadjoId="FormData.id"
          :UserId="FormData.UserId"
          @ClosePopup="popupActiveSendOffer = false"
        ></popupActiveSendOffer>
      </vs-popup>
    </div>

    <div class="parentx-static">
      <vs-popup
        classContent="popup-example"
        v-bind:title="$t('SubmitOffer')"
        :active.sync="popupAddDriverPriceandAssignDrivertoKMBiadjo"
      >
        <popupAddDriverPriceandAssignDrivertoKMBiadjo
          :BiadjoId="FormData.id"
          @ClosePopup="popupAddDriverPriceandAssignDrivertoKMBiadjo = false"
        ></popupAddDriverPriceandAssignDrivertoKMBiadjo>
      </vs-popup>
    </div>

    <div class="parentx-static">
      <vs-popup
        classContent="popup-example"
        v-bind:title="$t('AddDiscount')"
        :active.sync="popupActiveAddDiscount"
      >
        <popupActiveAddDiscount
          @Refresh="RefreshPage"
          :BiadjoId="FormData.id"
          @ClosePopup="popupActiveAddDiscount = false"
        ></popupActiveAddDiscount>
      </vs-popup>
    </div>
    <div class="parentx-static">
      <vs-popup
        classContent="popup-example"
        v-bind:title="$t('SubmitOrder')"
        :active.sync="SubmitOrderToDriverOrFleet"
      >
        <SubmitOrderToDriverOrFleet
          :BiadjoId="FormData.id"
          :UserId="FormData.UserId"
          @ClosePopup="SubmitOrderToDriverOrFleet = false"
        ></SubmitOrderToDriverOrFleet>
      </vs-popup>
    </div>
    <!-- popup -->
    <div class="parentx-static">
      <vs-popup
        classContent="popup-example"
        v-bind:title="$t('SubmitOffer')"
        :active.sync="popupActiveAddInsurance"
      >
        <PopupBiadjoNeedInsurance
          :ModelAddnIsurance="ModelAddnIsurance"
          @ClosePopup="popupActiveAddInsurance = false"
          @AddInsurancePolictToBiadjo="AddInsurancePolictToBiadjo"
        ></PopupBiadjoNeedInsurance>
      </vs-popup>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import moduleBiadjo from "@/store/biadjo/moduleBiadjo.js";
import StarRating from "vue-star-rating";
import VxTimeline from "@/components/timeline/VxTimeline.vue";
import BcBiadjoLogHistoryComponent from "@/views/BComponents/BcBiadjoLogHistoryComponent.vue";
import BiadjoDetailsPart from "@/views/biadjo/BiadjoDetailsPart.vue";
import googleMaps from "@/GoogleMaps/googleMap.js";

export default {
  data() {
    return {
      WyPoints: [],
      itemsPerPage: 10,
      ModelAddnIsurance: {},
      popupActiveAddInsurance: false,
      NoteModel: {
        AdminUserId: "",
        BiadjoID: "",
        Notice: ""
      },
      rowID: "",
      showButtonDriverDetails: false,
      IsBiadjoNotes: false,
      userInfo: {},
      driver_id: "",
      popupActiveSendOffer: false,
      popupAddDriverPriceandAssignDrivertoKMBiadjo: false,
      popupActiveAddDiscount: false,
      SubmitOrderToDriverOrFleet: false,
      distance: null,
      duration: null,
      FormData: {},
      ModelSendOffer: {
        DriverId: "",
        Offer: "",
        UserId: "",
        BiadjoId: "",
        AdminUserId: null
      },
      Biadjo_not_found: false,
      disable: false,
      disableCloseBiadjo: true,
      disableViewOnMap: true,
      disableSubmitOffer: false,
      disableCancelBiadjo: false,
      disableAssignToDriver: true,
      popupActiveClosebiadjo: false,
      popupAddRoadAndScaleChargesr: false,
      popupAssignToAnotherDriver: false,
      popupActiveCancelBiadjo: false,

      Model: {
        CountryCode: "",
        StartLatitude: "",
        StartLongitude: "",
        VehicleType: "",
        VehicleOption: ""
      },
      NearByDrivers: null,
      BiadjoStatusLogHistory: [],
      showPrintInvoice: false,
      BiadjoNotes: [
        {
          time: null,
          desc: null,
          title: null,
          color: "primary",
          icon: "PlusIcon"
        }
      ],
      BiadjoFees: {
        CountryCodeOfBiadjo: "",
        BiadjoStatus: "",
        BiadjoPrice: "",
        BiadjoID: null
      },
      CancelBiadjo: {
        BiadjoID: null,
        BiadjoCancelationFee: null,
        AdminUserId: null
      },
      CloseBiadjo: {
        Rating: null,
        BiadjoID: null,
        AdminUserId: null
      }
    };
  },
  components: {
    popupActiveSendOffer: () =>
      import("@/views/generalPopups/popupActiveSendOffer.vue"),
    popupAddDriverPriceandAssignDrivertoKMBiadjo: () =>
      import(
        "@/views/generalPopups/popupAddDriverPriceandAssignDrivertoKMBiadjo.vue"
      ),
    popupActiveAddDiscount: () =>
      import("@/views/generalPopups/popupActiveAddDiscount.vue"),
    SubmitOrderToDriverOrFleet: () =>
      import("@/views/generalPopups/SubmitOrderToDriverOrFleet.vue"),
    PopupBiadjoNeedInsurance: () =>
      import("@/views/generalPopups/PopupBiadjoNeedInsurance.vue"),
    popupActiveCancelBiadjo: () =>
      import("@/views/generalPopups/popupActiveCancelBiadjo.vue"),
    popupActiveClosebiadjo: () =>
      import("@/views/generalPopups/popupActiveClosebiadjo.vue"),
    popupAddRoadAndScaleChargesr: () =>
      import("@/views/generalPopups/popupAddRoadAndScaleChargesr.vue"),
    popupAssignToAnotherDriver: () =>
      import("@/views/generalPopups/popupAssignToAnotherDriver.vue"),

    BcBiadjoLogHistoryComponent,
    StarRating,
    VxTimeline,
    BiadjoDetailsPart
    //vueCustomScrollbar
  },
  computed: {
    validateModelAddnIsurance() {
      return (
        !this.errors.any() &&
        this.ModelAddnIsurance.InsurancePolicyNo !== "" &&
        this.ModelAddnIsurance.InsurancePolicyNo !== null
      );
    },
    StarRatingRTL() {
      if (this.$vs.rtl) {
        return true;
      } else return false;
    },
    windowWidth() {
      return this.$store.state.windowWidth;
    },
    keymap() {
      return {
        "alt+l": this.fetchData
      };
    }
  },
  methods: {
    OpenAddDriverPriceandAssignDrivertoKMBiadjo() {
      if (this.FormData.Status == "BS4") {
        this.popupAddDriverPriceandAssignDrivertoKMBiadjo = true;
      } else {
        window.showError();
      }
    },
    ResendBiadjoRequest() {
      this.$vs.loading();
      var Biadjo = {};
      Biadjo.BiadjoID = this.FormData.id;
      this.$store
        .dispatch("BiadjoList/ResendBiadjoRequest", Biadjo)
        .then(response => {
          if (response.data == true) {
            // this.fetchData();

            this.$vs.loading.close();
            window.showSuccess();
          } else {
            this.$vs.loading.close();
            window.showError();
          }
        })
        .catch(() => {
          this.$vs.loading.close();
          window.showError();
        });
    },
    confirmSendOrder(Id) {
      debugger;
      this.rowID = Id;
      this.$vs.dialog({
        type: "confirm",
        color: "#27ABBE",
        title: this.$t("Confirm"),
        text: this.$t("YouAreAboutToSendOrder"),
        cancelText: this.$t("Cancel"),
        accept: this.SubmitOrder,
        acceptText: this.$t("Confirm")
      });
    },
    SubmitOrder(Id) {
      this.$vs.loading();
      let ModelSendOffer = {};
      ModelSendOffer.DriverId = this.rowID;
      ModelSendOffer.BiadjoId = this.FormData.id;
      ModelSendOffer.UserId = this.FormData.UserId;
      let userInfo = JSON.parse(localStorage.getItem("userInfo"));
      ModelSendOffer.AdminUserId = userInfo.Id;
      this.$store
        .dispatch("BiadjoList/SubmitOrderToDriverOrFleet", ModelSendOffer)
        .then(response => {
          if (response.status == 200) {
            this.$vs.loading.close();
            window.showAddDriverToBiadjoSuccess();
          }
        })
        .catch(() => {
          this.$vs.loading.close();
          window.showError();
        });
    },
    AddRemoveVAT() {
      var Obj = {};
      Obj.AdminUserId = JSON.parse(localStorage.getItem("userInfo")).Id;
      Obj.BiadjoId = this.FormData.id;
      Obj.VATREQ = this.FormData.VATREQ;
      this.$store
        .dispatch("BiadjoList/AddRemoveVAT", Obj)
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
    RefreshPage() {
      this.popupActiveAddDiscount = false;

      this.fetchData();
    },
    onCopy() {
      window.onCopy();
    },
    checkForCancelationFees() {
      this.BiadjoFees.CountryCodeOfBiadjo = this.FormData.CountryCode;
      this.BiadjoFees.BiadjoStatus = this.FormData.Status;
      this.BiadjoFees.BiadjoPrice = this.FormData.Price;
      this.BiadjoFees.BiadjoID = this.FormData.id;

      this.$store
        .dispatch("BiadjoList/checkForCancelationFees", this.BiadjoFees)
        .then(response => {
          if (response.status == 200) {
            this.CancelBiadjo.BiadjoCancelationFee = response.data;
            this.popupActiveCancelBiadjo = true;
            this.$vs.loading.close();
          } else {
            this.CancelBiadjo.BiadjoCancelationFee = null;
            this.popupActiveCancelBiadjo = true;
            this.$vs.loading.close();
            window.showError();
          }
        })
        .catch(() => {
          this.CancelBiadjo.BiadjoCancelationFee = null;
          this.popupActiveCancelBiadjo = true;
          this.$vs.loading.close();
          window.showError();
        });
    },
    AddInsurancePolictToBiadjo() {
      if (!this.validateModelAddnIsurance) {
        return;
      }
      this.$vs.loading();
      this.ModelAddnIsurance.AdminUserId = JSON.parse(
        localStorage.getItem("userInfo")
      ).Id;
      this.ModelAddnIsurance.BiadjoId = this.FormData.id;

      this.$store
        .dispatch(
          "BiadjoList/AddInsurancePolictToBiadjo",
          this.ModelAddnIsurance
        )
        .then(response => {
          if (response.status == 200) {
            if (response.data == true) {
              this.$vs.loading.close();
              this.popupActiveAddInsurance = false;
              this.ModelAddnIsurance = {};
              window.showSuccess();
              // this.Search(this.BiadjoModel.CountryCode);
            } else {
              this.$vs.loading.close();
              window.showNoRecords();
            }
          }
        })
        .catch(() => {
          this.$vs.loading.close();
          window.showError();
        });
    },
    PrintReportInAR() {
      let ReportLang = "OfficialInvoiceAR";
      let BiadjoID = this.$route.params.Id;
      let CountryCode = this.FormData.CountryCode;

      let routeData = this.$router.resolve({
        name: "Reports",
        query: { I: BiadjoID, L: ReportLang, C: CountryCode }
      });
      window.open(routeData.href, "_blank");
    },
    PrintReportInEN() {
      let ReportLang = "OfficialInvoiceEN";
      let BiadjoID = this.$route.params.Id;
      let CountryCode = this.FormData.CountryCode;

      let routeData = this.$router.resolve({
        name: "Reports",
        query: { I: BiadjoID, L: ReportLang, C: CountryCode }
      });
      window.open(routeData.href, "_blank");
    },
    AddBiadjoNote() {
      this.NoteModel.AdminUserId = this.userInfo.Id;
      this.NoteModel.BiadjoID = this.FormData.id;

      this.$vs.loading();
      this.$store
        .dispatch("BiadjoList/AddNoticeToBiadjo", this.NoteModel)
        .then(response => {
          if (response.data == true) {
            this.NoteModel.Notice = "";
            this.getBiadjoNotes();
            window.showSuccess();
            this.$vs.loading.close();
          } else {
            window;
            this.$vs.loading.close();
            window.showError;
          }
        });
    },
    confirmCloseAccidentBiadjo() {
      this.$vs.dialog({
        type: "confirm",
        color: "#27ABBE",
        title: this.$t("ConfirmClose"),
        text:
          this.$t("YouAreAboutToCloseBiadjo") +
          " " +
          this.$t("CloseAccidentBiadjoNote"),
        cancelText: this.$t("Cancel"),
        accept: this.CloseAccidentBiadjo,
        acceptText: this.$t("Close")
      });
    },
    CloseAccidentBiadjo() {
      this.$vs.loading();
      var Biadjo = {};
      Biadjo.BiadjoID = this.$route.params.Id;
      Biadjo.AdminUserId = JSON.parse(localStorage.getItem("userInfo")).Id;

      this.$store
        .dispatch("BiadjoList/CloseOnAccidentBiadjo", Biadjo)
        .then(response => {
          if (response.status == 200) {
            this.$vs.loading.close();
            window.showSuccess();
            location.reload("/");
          } else {
            this.$vs.loading.close();
            window.showError;
          }
        })
        .catch(error => {
          this.$vs.loading.close();
          window.showError();
        });
    },
    setRating(rating) {
      this.rating = "You have Selected: " + rating + " stars";
    },
    getBiadjoNotes() {
      this.$vs.loading();
      var BiadjoID = {};
      BiadjoID.BiadjoID = this.$route.params.Id;
      this.$store
        .dispatch("BiadjoList/GetBiadjoNotes", BiadjoID)
        .then(response => {
          if (response.data.length > 0) {
            this.BiadjoNotes = response.data;
            this.IsBiadjoNotes = true;
            this.$vs.loading.close();
          } else {
            this.$vs.loading.close();
          }
        });
    },
    getBiadjoStatusLogHistory() {
      this.$vs.loading();
      var Biadjo = {};
      Biadjo.BiadjoID = this.$route.params.Id;

      this.$store
        .dispatch("BiadjoList/GetBiadjoStatusLogHistory", Biadjo)
        .then(response => {
          if (response.data.length > 0) {
            this.BiadjoStatusLogHistory = response.data;
            setTimeout(() => {
              var div = document.getElementById("ScrollToEndBiadjo");
              div.scrollTop = div.scrollHeight - div.clientHeight;
            }, 1000);
            this.$vs.loading.close();
          } else {
            this.$vs.loading.close();
            this.Biadjo_not_found = true;
            window.showNoRecords();
          }
        })
        .catch(() => {
          this.$vs.loading.close();
          window.showError();
        });
    },
    confirmSave(driverID) {
      this.driver_id = driverID;

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

      Biadjo.BiadjoId = this.$route.params.Id;
      Biadjo.DriverId = this.driver_id;
      Biadjo.AdminUserId = JSON.parse(localStorage.getItem("userInfo")).Id;
      this.$store
        .dispatch("BiadjoList/AssignDriverToBiadjo", Biadjo)
        .then(response => {
          if (response.status == 200) {
            window.showAddDriverToBiadjoSuccess();
          }
        })
        .catch(Error => {
          // window.showError();
          this.$vs.notify({
            color: "danger",
            position: "right-bottom",
            title: this.$t("Error"),
            text: this.$t(Error.response.data.Error)
          });
        });
    },

    GetNearByDrivers() {
      this.$vs.loading();
      var Model = {};
      Model.Language = this.$i18n.locale;
      Model.BiadjoId = this.FormData.id;
      Model.CountryCode = this.FormData.CountryCode;
      Model.StartLatitude = this.FormData.StLatitude;
      Model.StartLongitude = this.FormData.StLongitude;
      Model.VehicleType = this.FormData.VehicleType;
      Model.VehicleOption = this.FormData.VehicleOption;
      this.$store
        .dispatch("BiadjoList/GetNearByDrivers", Model)
        .then(response => {
          this.$vs.loading.close();

          this.NearByDrivers = response.data;
          let GetBiadjoStatus = response.data[0].Status;
          if (
            this.GetBiadjoStatus == "BS4" ||
            this.GetBiadjoStatus == "BS5" ||
            this.GetBiadjoStatus == "BS6" ||
            this.GetBiadjoStatus == "BS7" ||
            this.GetBiadjoStatus == "BS8" ||
            this.GetBiadjoStatus == "BS9" ||
            this.GetBiadjoStatus == "BS10"
          ) {
            this.disable = true;
          }
        })
        .catch(() => {
          this.$vs.loading.close();
        });
    },
    Back() {
      this.$router.go(-1);
    },
    async fetchData() {
      this.$vs.loading();
      await googleMaps.checkAndAttachMapScript(false);
      if (!moduleBiadjo.isRegistered) {
        this.$store.registerModule("BiadjoList", moduleBiadjo);
        moduleBiadjo.isRegistered = true;
      }
      debugger;
      var Biadjo = {};
      Biadjo.id = this.$route.params.Id;
      this.getBiadjoStatusLogHistory();
      this.getBiadjoNotes();

      this.userInfo = JSON.parse(localStorage.getItem("userInfo"));

      this.$store
        .dispatch("BiadjoList/GetBiadjoByid", Biadjo)
        .then(async response => {
          if (response.data.length > 0) {
            if (response.data[0].Stops && response.data[0].Stops.length > 0) {
              for (let i = 0; i < response.data[0].Stops.length; i++) {
                const element = response.data[0].Stops[i];
                let LatLngObj = {};
                LatLngObj.Latitude = element.Latitude;
                LatLngObj.Longitude = element.Longitude;
                this.WyPoints.push(LatLngObj);
              }
            }
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
              googleMaps
                .fetchDistance(orgin, dest, this.WyPoints)
                .then(response => {
                  this.distance = response.distance;
                  this.duration = response.duration;
                })
                .catch(() => {
                  this.distance = "Error";
                  this.duration = "Error";
                });
            }

            if (
              this.FormData.Status == "BS4" ||
              this.FormData.Status == "BS5" ||
              this.FormData.Status == "BS6" ||
              this.FormData.Status == "BS7" ||
              this.FormData.Status == "BS8" ||
              this.FormData.Status == "BS9" ||
              this.FormData.Status == "BS10"
            ) {
              this.disable = true;
              this.disableSubmitOffer = true;
            }
            this.$vs.loading.close();
          } else {
            this.$vs.loading.close();
            window.showError();
            this.$router.push("/BiadjoSearch");
          }

          if (
            this.FormData.Status == "BS11"
            // this.FormData.Status == "BS4" ||
            // this.FormData.Status == "BS5" ||
            // this.FormData.Status == "BS6" ||
            // this.FormData.Status == "BS7" ||
            // this.FormData.Status == "BS8" ||
            // this.FormData.Status == "BS9" ||
            // this.FormData.Status == "BS10"
          ) {
            this.disableCloseBiadjo = false;
          }
          if (
            this.FormData.Status == "BS11" ||
            this.FormData.Status == "BS13" ||
            this.FormData.Status == "BS14" ||
            this.FormData.Status == "BS15" ||
            this.FormData.Status == "BS16"
          ) {
            this.disableCancelBiadjo = true;
          }
          if (
            this.FormData.Status == "BS4" ||
            this.FormData.Status == "BS5" ||
            this.FormData.Status == "BS6" ||
            this.FormData.Status == "BS7" ||
            this.FormData.Status == "BS8" ||
            this.FormData.Status == "BS9" ||
            this.FormData.Status == "BS10" ||
            this.FormData.Status == "BS15" ||
            this.FormData.Status == "BS16"
          ) {
            this.disableSubmitOffer = true;
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
