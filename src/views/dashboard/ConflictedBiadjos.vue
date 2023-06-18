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
          <p class="mb-3 font-semibold">{{ $t("ConflictedBiadjos") }}</p>
          <p class="text-4xl text-warning">
            <sup class="text-base mr-1">#</sup>{{ ConflictedBiadjos }}
          </p>
        </div>
        <!-- <div class="m-6">
          <p class="mb-3 font-semibold">{{ $t("outStandingBalance") }}</p>
          <p class="text-4xl text-danger">
            <sup class="text-base mr-1">$</sup>{{ ConflictedBiadjos[1].Value }}
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
      ConflictedBiadjos: 0,
      CountryCode: null
    };
  },

  methods: {
    ConflictedBiadjosComponent() {
      var Obj = {};
      this.ConflictedBiadjos = 0;
      Obj.CountryCode = this.$store.state.SelectedCountryCode;
      if (this.$store.state.SelectedCountryCode) {
        this.$store
          .dispatch("Dashboard/ConflictedBiadjos", Obj)
          .then(response => {
            this.ConflictedBiadjos = response.data;
          });
      }
    },
    DashboardReloading() {
      this.clearSetInterval = setInterval(() => {
        this.ConflictedBiadjosComponent();
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
    this.ConflictedBiadjosComponent();
    window.ConflictedBiadjosComponent = this.ConflictedBiadjosComponent;
  },
  beforeDestroy() {
    this.StopInterval();
  }
};
</script>
