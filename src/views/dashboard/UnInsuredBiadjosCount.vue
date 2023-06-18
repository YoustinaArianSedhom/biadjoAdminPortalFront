<template>
  <div class="vx-col w-full md:w-3/3 mb-base">
    <template slot="actions">
      <feather-icon
        icon="SettingsIcon"
        svgClasses="w-6 h-6 text-grey"
      ></feather-icon>
    </template>
    <div slot="no-body" class="h3-6 pb-0">
      <div class="flex">
        <div class="m-6">
          <p class="mb-3 font-semibold">
            {{ $t("UnInsuredBiadjosCount") }}
          </p>
          <p class="text-4xl text-warning">
            <sup class="text-base mr-1">#</sup>{{ UnInsuredBiadjosCount }}
          </p>
        </div>
        <!-- <div class="m-6">
          <p class="mb-3 font-semibold">{{ $t("outStandingBalance") }}</p>
          <p class="text-4xl text-danger">
            <sup class="text-base mr-1">$</sup>{{ UnInsuredBiadjosCount[1].Value }}
            <span class="text-xl" style="color:black">
              {{ $t(CountryCode + "_Currency") }}
            </span>
          </p>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import moduleDashboard from "@/store/dashboard/moduleDashboard.js";
export default {
  data() {
    return {
      clearSetInterval: false,
      UnInsuredBiadjosCount: 0,
      CountryCode: null
    };
  },
  methods: {
    UnInsuredBiadjosCountComponent() {
      var Obj = {};
      Obj.CountryCode = this.$store.state.SelectedCountryCode;
      if (this.$store.state.SelectedCountryCode) {
        this.$store
          .dispatch("Dashboard/UnInsuredBiadjosCount", Obj)
          .then(response => {
            this.UnInsuredBiadjosCount = response.data;
          });
      }
    },
    DashboardReloading() {
      this.clearSetInterval = setInterval(() => {
        this.UnInsuredBiadjosCountComponent();
      }, this.duration * 1000 * 60);
    },
    StopInterval() {
      clearInterval(this.clearSetInterval);
    }
  },
  created() {
    if (!moduleDashboard.isRegistered) {
      this.$store.registerModule("Dashboard", moduleDashboard);
      moduleDashboard.isRegistered = true;
    }
    this.UnInsuredBiadjosCountComponent();
    window.UnInsuredBiadjosCountComponent = this.UnInsuredBiadjosCountComponent;
  },
  beforeDestroy() {
    this.StopInterval();
  }
};
</script>
