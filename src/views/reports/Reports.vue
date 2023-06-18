<template>
  <div
    ref="viewer"
    class="h-screen"
    style="position: inherit; left: 0; right: 0; top: 0; bottom: 0"
    data-bind="dxReportViewer: $data"
  ></div>
</template>

<script>
import ko from "knockout";
import "devexpress-reporting/dx-webdocumentviewer";
import axios from "@/axios.js";

export default {
  name: "WebDocumentViewer",
  data() {
    return {
      BiadjoID: null,
      Lang: null,
      CountryCode: null,
      SDate: null,
      NDate: null,
      M: null
    };
  },
  mounted() {
    let reportUrl = null;

    this.Lang = this.$route.query.L || null;

    this.BiadjoID = this.$route.query.I || null;

    this.CountryCode = this.$route.query.C || null;

    this.SDate = this.$route.query.SD || null;

    this.NDate = this.$route.query.ND || null;

    this.M = this.$route.query.M || null;
    let Phone = null;
    if (this.M) {
      Phone = this.M.replace("+", "%2B");
    }

    if (
      this.Lang.includes("UnPaiedDriversDetails") ||
      this.Lang.includes("IncomeReportDetailed") ||
      this.Lang.includes("IncomeReportSummry") ||
      this.Lang.includes("UnOfficialIncomeSummaryReport") ||
      this.Lang.includes("UnPaiedCompaniesDetails") ||
      this.Lang.includes("ACHEGDriversReport") ||
      this.Lang.includes("ACHEGFleetsReportrepx")
    ) {
      reportUrl = ko.observable(
        `${this.Lang}?CountryCode=${this.CountryCode}&StartDate=${this.SDate}&EndDate=${this.NDate}`
      );
    }

    if (this.Lang.includes("ClientExpensesStatement")) {
      // reportUrl = ko.observable(
      //   "ClientExpensesStatement?CountryCode=EG&PhoneNo=%2B201145384740&StartDate=06/01/2020&EndDate=07/31/2020"
      reportUrl = ko.observable(
        `${this.Lang}?CountryCode=${this.CountryCode}&PhoneNo=${Phone}&StartDate=${this.SDate}&EndDate=${this.NDate}`

        // `${this.Lang}?CountryCode=${this.CountryCode}&PhoneNo=${this.M}&StartDate=${this.SDate}&EndDate=${this.NDate}`
      );
    }

    if (this.Lang.includes("OfficialInvoice")) {
      reportUrl = ko.observable(
        `${this.Lang}?CountryCode=${this.CountryCode}&BiadjoId=` + this.BiadjoID
      );
    }
    var viewerOptions = {
      reportUrl: reportUrl,
      requestOptions: {
        host: `${axios.defaults.baseURL}/`,
        // Use this line for the ASP.NET MVC backend
        //invokeAction: "/WebDocumentViewer/Invoke"
        // Use this line for the ASP.NET Core backend
        invokeAction: "DXXRDV"
      }
    };
    ko.applyBindings(viewerOptions, this.$refs.viewer);
  },
  beforeDestroy() {
    ko.cleanNode(this.$refs.viewer);
  }
};
</script>
