<template>
  <div>
    <vx-card
      :title="$t('Country')"
      class="user-list-filters mb-8"
      collapse-action
    >
      <div class="vx-row">
        <div class="vx-col md:w-1/4 sm:w-1/2 w-full">
          <label class="text-sm opacity-75">{{ $t("Country") }}</label>
          <v-select
            label="Country"
            class="mt-1 w-full"
            name="Country"
            v-model="Model.CountryCode"
            :reduce="CountryCode => CountryCode.CountryCode"
            :options="Country"
            v-validate="'required'"
            :dir="$vs.rtl ? 'rtl' : 'ltr'"
          />
          <span class="text-danger text-sm" v-show="errors.has('Country')">
            {{ errors.first("Country") }}
          </span>
        </div>
      </div>
      <div class="vx-row mr-2 ml-2">
        <vs-button
          class="mr-3 mb-2"
          @click="Search"
          :disabled="Model.CountryCode == '' || Model.CountryCode == null"
          v-scroll-to="'#Scroll'"
        >
          {{ $t("Search") }}</vs-button
        >
      </div>
    </vx-card>
  </div>
</template>
<script>
import moduleCountry from "@/store/countrySetting/moduleCountry.js";
export default {
  data() {
    return {
      Model: {
        CountryCode: ""
      }
    };
  },
  computed: {
    Country() {
      return this.$store.state.CountryList.Country;
    }
  },

  methods: {
    Search() {
      this.$emit("SearchByCountryCode", this.Model.CountryCode);
    }
  },
  created() {
    if (!moduleCountry.isRegistered) {
      this.$store.registerModule("CountryList", moduleCountry);
      moduleCountry.isRegistered = true;
    }
    this.$store.dispatch("CountryList/fetchAllCountriesList").then(() => {
      this.Country.forEach(element => {
        if (
          element.CountryCode ==
          JSON.parse(localStorage.getItem("userInfo")).countrycode
        ) {
          this.Model.CountryCode = JSON.parse(
            localStorage.getItem("userInfo")
          ).countrycode;
        }
      });
    });
  }
};
</script>
