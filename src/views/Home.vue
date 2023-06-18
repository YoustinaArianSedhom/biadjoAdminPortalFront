<template>
  <div class="vx-row">
    <Bc-CountryVSelect class="w-full" @SearchByCountryCode="Search">
    </Bc-CountryVSelect>
    <div class="w-full ml-4 mr-4 mb-2" :dir="$vs.rtl ? 'rtl' : 'ltr'">
      <span class="w-full mb-2" v-if="CurrentCountry != ''">
        {{ $t("YourSearchingCountry") }}
        <span class="text-primary text-xl">{{ $t(CurrentCountry) }}</span>
      </span>
    </div>
    <div class="vx-col  w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 mb-base">
      <vx-card class="FixedHeight">
        <BiadojsPerDayForWeek />
      </vx-card>
    </div>

    <div class="vx-col  w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 mb-base">
      <vx-card class="FixedHeight">
        <h4 class=" font-bold">{{ $t("ConflictedBiadjos") }}</h4>
        <ConflictedBiadjos />
      </vx-card>
    </div>

    <div class="vx-col  w-full mb-base">
      <vx-card>
        <BiadojsPerTruckTypeForWeek />
      </vx-card>
    </div>
    <div class="vx-col  w-full mb-base">
      <vx-card>
        <TodayBiadojsForTodayperStatus />
      </vx-card>
    </div>
    <div class="vx-col  w-full mb-base">
      <vx-card>
        <ToDayBiadojsPerTrucktype />
      </vx-card>
    </div>
    <div class="vx-col  w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 mb-base">
      <vx-card class="FixedHeight">
        <h4 class=" font-bold">
          {{ $t("WatingForVerificationDriversCount") }}
        </h4>

        <WatingForVerificationDriversCount />
      </vx-card>
    </div>
    <div class="vx-col  w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 mb-base">
      <vx-card class="FixedHeight">
        <NoDriverFoundBiadojsCount />
      </vx-card>
    </div>
    <div class="vx-col w-full mb-base">
      <vx-card>
        <DriversPerTruckType />
      </vx-card>
    </div>

    <div class="vx-col  w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 mb-base">
      <vx-card class="FixedHeight">
        <ClosedBiadojsPerDayForWeek />
      </vx-card>
    </div>
    <div class="vx-col  w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 mb-base">
      <vx-card class="FixedHeight">
        <UnClosedBiadojsPerDayForWeek />
      </vx-card>
    </div>
    <div class="vx-col  w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 mb-base">
      <vx-card class="FixedHeight">
        <h4 class=" font-bold">{{ $t("UnStartedBiadjosCount") }}</h4>
        <UnStartedBiadjosCount />
      </vx-card>
    </div>

    <div class="vx-col  w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 mb-base">
      <vx-card class="FixedHeight">
        <h4 class=" font-bold">{{ $t("UnInsuredBiadjosCount") }}</h4>
        <UnInsuredBiadjosCount />
      </vx-card>
    </div>
    <div class="vx-col  w-full mb-base">
      <vx-card class="FixedHeight">
        <DriversPerStatus />
      </vx-card>
    </div>
  </div>
</template>
<script>
import BiadojsPerDayForWeek from "@/views/dashboard/BiadojsPerDayForWeek";
import BiadojsPerTruckTypeForWeek from "@/views/dashboard/BiadojsPerTruckTypeForWeek";
import TodayBiadojsForTodayperStatus from "@/views/dashboard/TodayBiadojsForTodayperStatus";
import ToDayBiadojsPerTrucktype from "@/views/dashboard/ToDayBiadojsPerTrucktype";
import DriversPerStatus from "@/views/dashboard/DriversPerStatus";
import DriversPerTruckType from "@/views/dashboard/DriversPerTruckType";
import ConflictedBiadjos from "@/views/dashboard/ConflictedBiadjos";
import ClosedBiadojsPerDayForWeek from "@/views/dashboard/ClosedBiadojsPerDayForWeek";
import NoDriverFoundBiadojsCount from "@/views/dashboard/NoDriverFoundBiadojsCount";

import WatingForVerificationDriversCount from "@/views/dashboard/WatingForVerificationDriversCount";
import UnInsuredBiadjosCount from "@/views/dashboard/UnInsuredBiadjosCount";

import UnStartedBiadjosCount from "@/views/dashboard/UnStartedBiadjosCount";

import UnClosedBiadojsPerDayForWeek from "@/views/dashboard/UnClosedBiadojsPerDayForWeek";
export default {
  data() {
    return {
      clearSetInterval: false,
      CurrentCountryName: null,
      CountryName: null,
      CountryCode: null,
      duration: 5
    };
  },
  methods: {
    Search(value) {
      this.$vs.loading();

      this.CountryCode = value;
      try {
        if (this.CountryCode) {
          this.CurrentCountryName = this.Country.find(
            Country => Country.CountryCode === this.CountryCode
          );
          this.CountryName = this.CurrentCountryName.Country;
          this.$store.dispatch("UpdateSelectedCountryName", this.CountryName);
        } else {
          this.$store.dispatch(
            "UpdateSelectedCountryName",
            JSON.parse(localStorage.getItem("userInfo")).countrycode
          );
        }
      } catch {
        this.$vs.loading.close();
      }

      this.$store
        .dispatch("UpdateSelectedCountryCode", value)
        .then(() => {
          window.ConflictedBiadjosComponent();
          window.BiadojsPerDayforweekComponent();
          window.BiadjoPerTruckForWeekComponent();
          window.ClosedBiadjoPerDayForWeekComponent();
          window.DriversPerStatusComponent();
          window.DriversPerTruckTypeComponent();
          window.NoDriverFoundBiadojsCountComponent();
          window.TodayBiadojsForTodayperStatusComponent();
          window.ToDayBiadojsPerTrucktypeComponent();
          window.UnClosedBiadojsPerDayForWeekComponent();
          window.WatingForVerificationDriversCountComponent();
          window.UnStartedBiadjosCountComponent();

          window.UnInsuredBiadjosCountComponent();

          setTimeout(() => {
            this.$vs.loading.close();
          }, 2000);
        })
        .catch(() => {
          this.$vs.loading.close();
        });
    },
    DashboardReloading() {
      this.clearSetInterval = setInterval(() => {
        window.ConflictedBiadjosComponent();
        window.BiadojsPerDayforweekComponent();
        window.BiadjoPerTruckForWeekComponent();
        window.ClosedBiadjoPerDayForWeekComponent();
        window.DriversPerStatusComponent();
        window.DriversPerTruckTypeComponent();
        window.NoDriverFoundBiadojsCountComponent();
        window.TodayBiadojsForTodayperStatusComponent();
        window.ToDayBiadojsPerTrucktypeComponent();
        window.UnClosedBiadojsPerDayForWeekComponent();
        window.WatingForVerificationDriversCountComponent();
        window.UnStartedBiadjosCountComponent();

        window.UnInsuredBiadjosCountComponent();
      }, this.duration * 1000 * 60);
    },
    StopInterval() {
      clearInterval(this.clearSetInterval);
    }
  },
  computed: {
    Country() {
      return this.$store.state.CountryList.Country;
    },
    CurrentCountry() {
      return this.$store.state.SelectedCountryName;
    }
  },

  components: {
    BcCountryVSelect: () => import("@/views/BComponents/BcCountryVSelect"),
    BiadojsPerDayForWeek,
    BiadojsPerTruckTypeForWeek,
    TodayBiadojsForTodayperStatus,
    ToDayBiadojsPerTrucktype,
    WatingForVerificationDriversCount,
    UnInsuredBiadjosCount,
    UnStartedBiadjosCount,
    DriversPerStatus,
    DriversPerTruckType,
    ClosedBiadojsPerDayForWeek,
    UnClosedBiadojsPerDayForWeek,
    NoDriverFoundBiadojsCount,
    ConflictedBiadjos
  },
  created() {
    this.DashboardReloading();
  },
  beforeDestroy() {
    this.StopInterval();
  }
};
</script>
<style>
.FixedHeight {
  height: 500px !important;
}
.HalfFixedHeight {
  height: 250px !important;
}
.ThirdFixedHeight {
  height: 280px !important;
}
</style>
