import Vue from "vue";
import Router from "vue-router";
import store from "@/store/store.js";
Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  routes: [
    {
      // =============================================================================
      // MAIN LAYOUT ROUTES
      // =============================================================================
      path: "",
      component: () => import("./layouts/main/Main.vue"),
      children: [
        // =============================================================================
        // Theme Routes
        // =============================================================================
        {
          path: "/",
          name: "home",
          component: () => import("./views/Home.vue"),
          meta: {
            rule: "Anonymous"
          }
        },
        {
          path: "/RequestBiadjo/:CID",
          name: "RequestBiadjo",
          component: () =>
            import("@/views/biadjo/requestBiadjo/RequestBiadjo.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "RequestBiadjo", active: true }
            ],
            pageTitle: "RequestBiadjo",
            rule: "Anonymous"
          }
        },
        // {
        //   path: "/NewUpdates",
        //   name: "NewUpdates",
        //   component: () => import("@/views/pages/NewUpdates.vue"),
        //   meta: {
        //     rule: "Anonymous"
        //   }
        // },
        // Reports Start
        {
          path: "/Reports/:L?/:I?/:C?/:SD?/:ND?/:M?",
          name: "Reports",
          component: () => import("@/views/reports/Reports.vue"),
          meta: {
            rule: "Anonymous"
          }
        },
        {
          path: "/ClientExpensesStatement/:C?/:M?",
          name: "ClientExpensesStatement",
          component: () =>
            import("@/views/reports/subReports/ClientExpensesStatement.vue"),
          meta: {
            rule: "BalanceManagement"
          }
        },
        {
          path: "/UnPaiedDriversDetails",
          name: "UnPaiedDriversDetails",
          component: () =>
            import("@/views/reports/subReports/UnPaiedDriversDetails.vue"),
          meta: {
            rule: "BalanceManagement"
          }
        },
        {
          path: "/UnPaiedCompaniesDetails",
          name: "UnPaiedCompaniesDetails",
          component: () =>
            import("@/views/reports/subReports/UnPaiedCompaniesDetails.vue"),
          meta: {
            rule: "BalanceManagement"
          }
        },
        {
          path: "/IncomeDetailed",
          name: "IncomeDetailed",
          component: () =>
            import("@/views/reports/subReports/IncomeDetailed.vue"),
          meta: {
            rule: "BalanceManagement"
          }
        },
        {
          path: "/IncomeReportSummary",
          name: "IncomeReportSummary",
          component: () =>
            import("@/views/reports/subReports/IncomeReportSummary.vue"),
          meta: {
            rule: "BalanceManagement"
          }
        },
        {
          path: "/UnOfficialIncomeSummaryReport",
          name: "UnOfficialIncomeSummaryReport",
          component: () =>
            import(
              "@/views/reports/subReports/UnOfficialIncomeSummaryReport.vue"
            ),
          meta: {
            rule: "SuperAdmin"
          }
        },
        {
          path: "/ACHEGDriversReport",
          name: "ACHEGDriversReport",
          component: () =>
            import("@/views/reports/subReports/ACHEGDriversReport.vue"),
          meta: {
            rule: "BalanceManagement"
          }
        },
        {
          path: "/ACHEGFleetsReportrepx",
          name: "ACHEGFleetsReportrepx",
          component: () =>
            import("@/views/reports/subReports/ACHEGFleetsReportrepx.vue"),
          meta: {
            rule: "BalanceManagement"
          }
        },
        // Reports End

        {
          path: "/Country",
          name: "Country",
          component: () => import("@/views/countrySetting/Country.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "Setting" },
              { title: "Country", active: true }
            ],
            pageTitle: "Country",
            rule: "Settings"
          }
        },
        {
          path: "/Setting/Country-Edit/:Id?",
          name: "Country-add/Edit",
          component: () => import("@/views/countrySetting/Country-Edit.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "Country", url: "/Country", active: true },
              { title: "CountryEdit", active: true }
            ],
            pageTitle: "CountryEdit",
            rule: "Settings"
          }
        },

        {
          path: "/BiadjoSearch",
          name: "BiadjoSearch",
          component: () => import("@/views/biadjo/BiadjoSearch.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "BiadjoSearch", active: true }
            ],
            pageTitle: "BiadjoSearch",
            rule: "Anonymous"
          }
        },
        {
          path: "/ConflictedBiadjo",
          name: "ConflictedBiadjo",
          component: () => import("@/views/biadjo/ConflictedBiadjo.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "ConflictedBiadjo", active: true }
            ],
            pageTitle: "ConflictedBiadjo",
            rule: "Anonymous"
          }
        },
        {
          path: "/ScheduledBiadjo",
          name: "ScheduledBiadjo",
          component: () => import("@/views/biadjo/ScheduledBiadjo.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "ScheduledBiadjo", active: true }
            ],
            pageTitle: "ScheduledBiadjo",
            rule: "Anonymous"
          }
        },
        {
          path: "/ScheduleDetails/:Id?",
          name: "ScheduleDetails",
          component: () => import("@/views/biadjo/ScheduleDetails.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              {
                title: "Scheduled biadjo",
                url: "/ScheduledBiadjo",
                active: true
              },
              { title: "ScheduleDetails", active: true }
            ],
            pageTitle: "ScheduleDetails",
            rule: "Anonymous"
          }
        },
        {
          path: "/BiadjoDetails/:Id?",
          name: "BiadjoDetails",
          component: () => import("@/views/biadjo/BiadjoDetails.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              {
                title: "BiadjoSearch",
                url: "/BiadjoSearch",
                active: true
              },
              { title: "BiadjoDetails", active: true }
            ],
            pageTitle: "BiadjoDetails",
            rule: "Anonymous"
          }
        },
        {
          path: "/FollowBiadjoOnMap/:Id",
          name: "FollowBiadjoOnMap",
          component: () => import("@/views/biadjo/FollowBiadjoOnMap.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "FollowBiadjoOnMap", active: true }
            ],
            pageTitle: "FollowBiadjoOnMap",
            rule: "Anonymous"
          }
        },
        {
          path: "/BiadjoViewSubmittedOrders/:Id?",
          name: "BiadjoViewSubmittedOrders",
          component: () =>
            import("@/views/biadjo/BiadjoViewSubmittedOrders.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              // { title: 'UpdateBiadjo' },
              { title: "ViewSubmittedOrders", active: true }
            ],
            pageTitle: "ViewSubmittedOrders",
            rule: "Anonymous"
          }
        },
        {
          path: "/OffersForBiadjo/:Id?",
          name: "OffersForBiadjo",
          component: () => import("@/views/biadjo/OffersForBiadjo.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              // { title: 'UpdateBiadjo' },
              { title: "OffersForBiadjo", active: true }
            ],
            pageTitle: "OffersForBiadjo",
            rule: "Anonymous"
          }
        },
        {
          path: "/UpdateBiadjo/:Id?",
          name: "UpdateBiadjo",
          component: () => import("@/views/biadjo/UpdateBiadjo.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              {
                title: "BiadjoSearch",
                url: "/BiadjoSearch",
                active: true
              },
              { title: "BiadjoDetails" },
              { title: "UpdateBiadjo", active: true }
            ],
            pageTitle: "UpdateBiadjo",
            rule: "UpdateBiadjo"
          }
        },
        {
          path: "/ConflictedDetails/:Id?",
          name: "ConflictedDetails",
          component: () => import("@/views/biadjo/ConflictedDetails.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              {
                title: "ConflictedBiadjo",
                url: "/ConflictedBiadjo",
                active: true
              },
              { title: "ConflictedDetails", active: true }
            ],
            pageTitle: "ConflictedDetails",
            rule: "Anonymous"
          }
        },
        {
          path: "/ClientCompanyDetails/:Id?",
          name: "ClientCompanyDetails",
          component: () =>
            import("@/views/client/clientCompanies/ClientCompanyDetails.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              {
                title: "ClientCompanyDetails",
                url: "/ClientCompanyDetails",
                active: true
              },
              { title: "ClientCompanyDetails", active: true }
            ],
            pageTitle: "ClientCompanyDetails",
            rule: "Anonymous"
          }
        },
        {
          path: "/CompanyUsers/:Id?",
          name: "CompanyUsers",
          component: () =>
            import("@/views/client/clientCompanies/CompanyUsers.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              {
                title: "CompanyUsers",
                url: "/CompanyUsers",
                active: true
              },
              { title: "CompanyUsers", active: true }
            ],
            pageTitle: "CompanyUsers",
            rule: "Anonymous"
          }
        },

        {
          path: "/TrucksTypes",
          name: "TrucksTypes",
          component: () => import("@/views/driver/TrucksTypes.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "TrucksTypes", active: true }
            ],
            pageTitle: "TrucksTypes",
            rule: "Anonymous"
          }
        },
        {
          path: "/WaitingForVerificationDrivers",
          name: "WaitingForVerfication",
          component: () =>
            import("@/views/driver/WaitingForVerificationDrivers.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "WaitingForVerficationDrivers", active: true }
            ],
            pageTitle: "WaitingForVerficationDrivers",
            rule: "Anonymous"
          }
        },
        {
          path: "/BiadjosWithoutDrivers",
          name: "Biadjos Without Drivers",
          component: () => import("@/views/driver/BiadjosWithoutDrivers.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "BiadjosWithoutDrivers", active: true }
            ],
            pageTitle: "BiadjosWithoutDrivers",
            rule: "Anonymous"
          }
        },
        {
          path: "/UnclosedBiadjos",
          name: "Unclosed Biadjos",
          component: () => import("@/views/biadjo/UnclosedBiadjos.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "UnclosedBiadjos", active: true }
            ],
            pageTitle: "UnclosedBiadjos",
            rule: "Anonymous"
          }
        },
        {
          path: "/BiadjosNeedInsurance",
          name: "BiadjosNeedInsurance",
          component: () => import("@/views/biadjo/BiadjosNeedInsurance.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "BiadjosNeedInsurance", active: true }
            ],
            pageTitle: "BiadjosNeedInsurance",
            rule: "Anonymous"
          }
        },
        {
          path: "/OffersWaitingForApproval",
          name: "OffersWaitingForApproval",
          component: () =>
            import("@/views/biadjo/OffersWaitingForApproval.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "OffersWaitingForApproval", active: true }
            ],
            pageTitle: "OffersWaitingForApproval",
            rule: "Anonymous"
          }
        },
        {
          path: "/UnStartedBiadjos",
          name: "UnStartedBiadjos",
          component: () => import("@/views/biadjo/UnStartedBiadjos.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "UnStartedBiadjos", active: true }
            ],
            pageTitle: "UnStartedBiadjos",
            rule: "Anonymous"
          }
        },
        {
          path: "/FleetCompaniesList",
          name: "FleetCompaniesList",
          component: () =>
            import("@/views/fleetCompanies/FleetCompaniesList.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "FleetCompaniesList", active: true }
            ],
            pageTitle: "FleetCompaniesList",
            rule: "Anonymous"
          }
        },
        {
          path: "/RegisterFleetCompany",
          name: "RegisterFleetCompany",
          component: () =>
            import("@/views/fleetCompanies/RegisterFleetCompany.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "RegisterFleetCompany", active: true }
            ],
            pageTitle: "RegisterFleetCompany",
            rule: "Anonymous"
          }
        },
        {
          path: "/CompanyUsers/:Id",
          name: "FleetCompanyUsers",
          component: () =>
            import("@/views/fleetCompanies/FleetCompanyUsers.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "FleetCompanyUsers", active: true }
            ],
            pageTitle: "FleetCompanyUsers",
            rule: "Anonymous"
          }
        },
        {
          path: "/FleetCompanyUserProfile/:Id",
          name: "FleetCompanyUserProfile",
          component: () =>
            import("@/views/fleetCompanies/FleetCompanyUserProfile.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "FleetCompanyUserProfile", active: true }
            ],
            pageTitle: "FleetCompanyUserProfile",
            rule: "Anonymous"
          }
        },
        {
          path: "/EditCompanyUser/:Id",
          name: "EditCompanyUser",
          component: () => import("@/views/fleetCompanies/EditCompanyUser.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "EditCompanyUser", active: true }
            ],
            pageTitle: "EditCompanyUser",
            rule: "Anonymous"
          }
        },
        {
          path: "/CompanyDrivers/:Id",
          name: "CompanyDrivers",
          component: () =>
            import("@/views/fleetCompanies/FleetCompanyDrivers.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "CompanyDrivers", active: true }
            ],
            pageTitle: "CompanyDrivers",
            rule: "Anonymous"
          }
        },
        {
          path: "/AddCompanyDriver/:Id",
          name: "AddCompanyDriver",
          component: () =>
            import("@/views/fleetCompanies/AddCompanyDriver.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "AddCompanyDriver", active: true }
            ],
            pageTitle: "AddCompanyDriver",
            rule: "Anonymous"
          }
        },
        {
          path: "/CompanyBiadjosHistory/:Id",
          name: "CompanyBiadjosHistory",
          component: () =>
            import(
              "@/views/fleetCompanies/fleetBiadjos/CompanyBiadjosHistory.vue"
            ),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "CompanyBiadjosHistory", active: true }
            ],
            pageTitle: "CompanyBiadjosHistory",
            rule: "Anonymous"
          }
        },
        {
          path: "/CompanyScheduledBiadjos/:Id",
          name: "CompanyScheduledBiadjos",
          component: () =>
            import(
              "@/views/fleetCompanies/fleetBiadjos/CompanyScheduledBiadjos.vue"
            ),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "CompanyScheduledBiadjos", active: true }
            ],
            pageTitle: "CompanyScheduledBiadjos",
            rule: "Anonymous"
          }
        },
        {
          path: "/CompanySubmitedOrdersAndOffers/:Id?/:CountryCode",
          name: "CompanySubmitedOrdersAndOffers",
          component: () =>
            import(
              "@/views/fleetCompanies/fleetBiadjos/CompanySubmitedOrdersAndOffers.vue"
            ),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "CompanySubmitedOrdersAndOffers", active: true }
            ],
            pageTitle: "CompanySubmitedOrdersAndOffers",
            rule: "Anonymous"
          }
        },
        {
          path: "/CompanyTransactionHistory/:Id",
          name: "CompanyTransactionHistory",
          component: () =>
            import(
              "@/views/fleetCompanies/fleetBiadjos/CompanyTransactionHistory.vue"
            ),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "CompanyTransactionHistory", active: true }
            ],
            pageTitle: "CompanyTransactionHistory",
            rule: "Anonymous"
          }
        },
        {
          path: "/FleetCompanyWalletBalance/:Id/:CC",
          name: "FleetCompanyWalletBalance",
          component: () =>
            import("@/views/fleetCompanies/FleetCompanyWalletBalance.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "FleetCompanyWalletBalance", active: true }
            ],
            pageTitle: "FleetCompanyWalletBalance",
            rule: "Accountant"
          }
        },
        {
          path: "/FleetCompaniesDetails/:Id",
          name: "FleetCompaniesDetails",
          component: () =>
            import("@/views/fleetCompanies/FleetCompaniesDetails.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "FleetCompaniesDetails", active: true }
            ],
            pageTitle: "FleetCompaniesDetails",
            rule: "Anonymous"
          }
        },
        {
          path: "/CompanyBankAccountInformation/:Id",
          name: "CompanyBankAccountInformation",
          component: () =>
            import("@/views/fleetCompanies/CompanyBankAccountInformation.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "CompanyBankAccountInformation", active: true }
            ],
            pageTitle: "CompanyBankAccountInformation",
            rule: "Anonymous"
          }
        },
        {
          path: "/EditCompanyBankAccountInformation/:Id",
          name: "EditCompanyBankAccountInformation",
          component: () =>
            import(
              "@/views/fleetCompanies/EditCompanyBankAccountInformation.vue"
            ),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "EditCompanyBankAccountInformation", active: true }
            ],
            pageTitle: "EditCompanyBankAccountInformation",
            rule: "Anonymous"
          }
        },
        {
          path: "/EditCompany/:Id",
          name: "EditCompany",
          component: () => import("@/views/fleetCompanies/EditCompany.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "EditCompany", active: true }
            ],
            pageTitle: "EditCompany",
            rule: "Anonymous"
          }
        },
        {
          path: "/Driver",
          name: "Driver",
          component: () => import("@/views/driver/Driver.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "Drivers", active: true }
            ],
            pageTitle: "Drivers",
            rule: "Anonymous"
          }
        },

        {
          path: "/DriverUnpaidBiadjos/:Id",
          name: "DriverUnpaidBiadjos",
          component: () => import("@/views/driver/DriverUnpaidBiadjos.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "DriverUnpaidBiadjos", active: true }
            ],
            pageTitle: "DriverUnpaidBiadjos",
            rule: "Accountant"
          }
        },
        {
          path: "/DriverBiadjosHistory/:Id",
          name: "DriverBiadjosHistory",
          component: () => import("@/views/driver/DriverBiadjosHistory.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "DriverBiadjosHistory", active: true }
            ],
            pageTitle: "DriverBiadjosHistory",
            rule: "Anonymous"
          }
        },
        {
          path: "/UnPaidDriverList",
          name: "UnPaid Driver List",
          component: () => import("@/views/driver/UnPaidDriverList.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "UnPaidDriverList", active: true }
            ],
            pageTitle: "UnPaidDriverList",
            rule: "Accountant"
            // rule: "Anonymous"
          }
        },
        {
          path: "/BankAccountInfo/:Id",
          name: "BankAccountInfo",
          component: () => import("@/views/driver/BankAccountInfo.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "BankAccountInformation", active: true }
            ],
            pageTitle: "BankAccountInformation",
            rule: "Anonymous"
          }
        },

        {
          path: "/DriverScheduledBiadjos/:Id",
          name: "DriverScheduledBiadjos",
          component: () => import("@/views/driver/DriverScheduledBiadjos.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "DriverScheduledBiadjos", active: true }
            ],
            pageTitle: "DriverScheduledBiadjos",
            rule: "Anonymous"
          }
        },

        {
          path: "/Setting/Driver-Edit/:Id",
          name: "Driver-add/Edit",
          component: () => import("@/views/driver/Driver-Edit.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "Drivers" },
              {
                title: "DriverProfile"
              },
              { title: "DriverEdit", active: true }
            ],
            pageTitle: "DriverEdit",
            rule: "Anonymous"
          }
        },
        {
          path: "/driverSubmittedOrders/:Id",
          name: "driverSubmittedOrders",
          component: () => import("@/views/driver/DriverSubmittedOrders.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              //{ title: "Settings" },
              { title: "DriverSubmittedOrders", active: true }
            ],
            //pageTitle: "DriverSubmittedOrders",
            rule: "Anonymous"
          }
        },

        {
          path: "/Setting/TransactionsHistoryOfDriver/:Id",
          name: "TransactionsHistoryOfDriver",
          component: () =>
            import("@/views/driver/TransactionsHistoryOfDriver.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "Drivers" },
              {
                title: "DriverProfile"
              },
              { title: "TransactionsHistoryOfDriver", active: true }
            ],
            pageTitle: "TransactionsHistoryOfDriver",
            rule: "Anonymous"
          }
        },
        {
          path: "/Setting/DriverProfile/:Id",
          name: "DriverProfile",
          component: () => import("@/views/driver/DriverProfile.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "Drivers", url: "/Driver", active: true },
              { title: "DriverProfile", active: true }
            ],
            pageTitle: "DriverProfile",
            rule: "Anonymous"
          }
        },
        {
          path: "/Setting/FollowDriverOnMap/:Id",
          name: "FollowDriverOnMap",
          component: () => import("@/views/driver/FollowDriverOnMap.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "Drivers", url: "/Driver", active: true },
              { title: "DriverProfile", active: true },
              { title: "DriverLocation", active: true }
            ],
            pageTitle: "DriverLocation",
            rule: "Anonymous"
          }
        },
        {
          path: "/Setting/DriverProfile/Documents/:DriverId",
          name: "Documents",
          component: () => import("@/views/driver/Documents.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "Drivers" },
              { title: "DriverDocuments", active: true }
            ],
            pageTitle: "DriverDocuments",
            rule: "Anonymous"
          }
        },

        {
          path: "/Notifications",
          name: "Notifications",
          component: () =>
            import(
              "@/layouts/components/navbar/components/NotificationsList.vue"
            ),
          meta: {
            rule: "Anonymous"
          }
        },
        {
          path: "/Client",
          name: "Client",
          component: () => import("@/views/client/Client.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "Clients", active: true }
            ],
            pageTitle: "Clients",
            rule: "Anonymous",
            authRequired: true
          }
        },

        {
          path: "/ClientsCompanyList",
          name: "ClientsCompanyList",
          component: () =>
            import("@/views/client/clientCompanies/ClientsCompanyList.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              {
                title: "ClientsCompanyList",
                url: "/ClientsCompanyList",
                active: true
              },
              { title: "ClientsCompanyList", active: true }
            ],
            pageTitle: "ClientsCompanyList",
            rule: "Anonymous",
            authRequired: true
          }
        },
        {
          path: "/RegisterClientCompany",
          name: "RegisterClientCompany",
          component: () =>
            import("@/views/client/clientCompanies/RegisterClientCompany.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "RegisterClientCompany", active: true }
            ],
            pageTitle: "RegisterClientCompany",
            rule: "Anonymous",
            authRequired: true
          }
        },
        {
          path: "/Setting/Client-Edit/:Id",
          name: "Client-add/Edit",
          component: () => import("@/views/client/Client-Edit.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "Clients", url: "/Client", active: true },
              { title: "ClientEdit", active: true }
            ],
            pageTitle: "ClientEdit",
            rule: "Anonymous"
          }
        },
        {
          path: "/Setting/TransactionsHistoryOfClient/:Id",
          name: "TransactionsHistoryOfClient",
          component: () =>
            import("@/views/client/TransactionsHistoryOfClient.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "Clients", url: "/Client", active: true },
              { title: "TransactionsHistoryOfClient", active: true }
            ],
            pageTitle: "TransactionsHistoryOfClient",
            rule: "Anonymous"
          }
        },
        {
          path: "/Setting/ClientProfile/:Id",
          name: "ClientProfile",
          component: () => import("@/views/client/ClientProfile.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "Clients", url: "/Client", active: true },
              { title: "ClientProfile", active: true }
            ],
            pageTitle: "ClientProfile",
            rule: "Anonymous"
          }
        },
        {
          path: "/Setting/ScheduledBiadjoOfClient/:Id",
          name: "ScheduledBiadjoOfClient",
          component: () => import("@/views/client/ScheduledBiadjoOfClient.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "Clients", url: "/Client", active: true },
              { title: "ClientProfile", active: true },
              { title: "ScheduledBiadjoOfClient", active: true }
            ],
            pageTitle: "ScheduledBiadjoOfClient",
            rule: "Anonymous"
          }
        },
        {
          path: "/Setting/ChangeUserAccountToCompany/:mob",
          name: "ChangeUserAccountToCompany",
          component: () =>
            import("@/views/client/ChangeUserAccountToCompany.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "Clients", url: "/Client", active: true },
              { title: "ClientProfile", active: true },
              { title: "ChangeUserAccountToCompany", active: true }
            ],
            pageTitle: "ChangeUserAccountToCompany",
            rule: "Anonymous"
          }
        },
        {
          path: "/Setting/BiadjoHistoryOfClient/:Id",
          name: "BiadjoHistoryOfClient",
          component: () => import("@/views/client/BiadjoHistoryOfClient.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "Clients", url: "/Client", active: true },
              { title: "ClientProfile", active: true },
              { title: "BiadjoHistoryOfClient", active: true }
            ],
            pageTitle: "BiadjoHistoryOfClient",
            rule: "Anonymous"
          }
        },

        {
          path: "/user/register/register",
          name: "user-register",
          component: () => import("@/views/user/register/Register.vue"),
          meta: {
            rule: "UserManagement"
          }
        },
        {
          path: "/user/Search",
          name: "user-Search",
          component: () => import("@/views/user/Search.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "UserSearch", active: true }
            ],
            rule: "UserManagement",
            pageTitle: "Search"
          }
        },
        {
          path: "/user/UserDetails/:Id",
          name: "UserDetails",
          component: () => import("@/views/user/UserDetails.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "UserSearch" },
              { title: "UserDetails", active: true }
            ],
            rule: "UserManagement",
            pageTitle: "UserDetails"
          }
        },
        {
          path: "/user/UserPersonalDetails/:Id",
          name: "UserPersonalDetails",
          component: () => import("@/views/user/UserPersonalDetails.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },

              { title: "UserPersonalDetails", active: true }
            ],
            rule: "Anonymous",
            pageTitle: "UserPersonalDetails"
          }
        },
        {
          path: "/user/User-Edit/:Id",
          name: "User-Edit",
          component: () => import("@/views/user/User-Edit.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "User-Search" },
              { title: "User-Details" },
              { title: "User-Edit", active: true }
            ],
            rule: "UserManagement",
            pageTitle: "User-Edit"
          }
        },
        {
          path: "/pages/forgot-password",
          name: "page-forgot-password",
          component: () => import("@/views/pages/ForgotPassword.vue"),
          meta: {
            rule: "Anonymous"
          }
        },

        {
          path: "/AddDriverBalance/:DriverId/:CC",
          name: "AddDriverBalance",
          component: () => import("@/views/driver/AddDriverBalance.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "AddDriverBalance", active: true }
            ],
            pageTitle: "AddDriverBalance",
            rule: "Accountant"
          }
        },
        {
          path: "/RegisterDriver",
          name: "RegisterDriver",
          component: () => import("@/views/driver/RegisterDriver.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "RegisterDriver", active: true }
            ],
            pageTitle: "RegisterDriver",
            rule: "Anonymous"
          }
        },
        {
          path: "/RegisterUser",
          name: "RegisterUser",
          component: () => import("@/views/client/RegisterUser.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "RegisterUser", active: true }
            ],
            pageTitle: "RegisterUser",
            rule: "Anonymous"
          }
        },
        {
          path: "/AddClientBalance/:Id/:CC",
          name: "AddClientBalance",
          component: () => import("@/views/client/AddClientBalance.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "AddClientBalance", active: true }
            ],
            pageTitle: "AddClientBalance",
            rule: "Accountant"
          }
        },
        {
          path: "/DeductDriverBalance/:DriverId/:CC",
          name: "DeductDriverBalance",
          component: () => import("@/views/driver/DeductDriverBalance.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "DeductDriverBalance", active: true }
            ],
            pageTitle: "DeductDriverBalance",
            rule: "Accountant"
          }
        },
        {
          path: "/DeductClientBalance/:Id/:CC",
          name: "DeductClientBalance",
          component: () => import("@/views/client/DeductClientBalance.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "DeductClientBalance", active: true }
            ],
            pageTitle: "DeductClientBalance",
            rule: "Accountant"
          }
        },
        {
          path: "/BiadjoAccidentReport",
          name: "BiadjoAccidentReport",
          component: () => import("@/views/biadjo/BiadjoAccidentReport.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "BiadjoAccidentReport", active: true }
            ],
            pageTitle: "BiadjoAccidentReport",
            rule: "Anonymous"
          }
        },
        {
          path: "/ReportBiadjoAccident",
          name: "ReportBiadjoAccident",
          component: () => import("@/views/biadjo/ReportBiadjoAccident.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "ReportBiadjoAccident", active: true }
            ],
            pageTitle: "ReportBiadjoAccident",
            rule: "Anonymous"
          }
        },
        {
          path: "/AccidentPictures/:Id",
          name: "AccidentPictures",
          component: () => import("@/views/biadjo/AccidentPictures.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "AccidentPictures", active: true }
            ],
            pageTitle: "AccidentPictures",
            rule: "Anonymous"
          }
        },
        {
          path: "BiadjoDetails/:Id/BiadjoStatusLogHistory",
          name: "BiadjoStatusLogHistory",
          component: () => import("@/views/biadjo/BiadjoStatusLogHistory.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "BiadjoStatusLogHistory", active: true }
            ],
            pageTitle: "BiadjoStatusLogHistory",
            rule: "Anonymous"
          }
        }
      ]
    },
    // =============================================================================
    // FULL PAGE LAYOUTS
    // =============================================================================
    {
      path: "",
      component: () => import("@/layouts/full-page/FullPage.vue"),
      children: [
        // =============================================================================
        // PAGES
        // =============================================================================
        {
          path: "/user/ResetPasswordByAdmin",
          name: "ResetPasswordByAdmin",
          component: () => import("@/views/user/ResetPasswordByAdmin.vue"),
          meta: {
            rule: "admin"
          }
        },
        {
          path: "/user/ResetPasswordByUser",
          name: "ResetPasswordByUser",
          component: () => import("@/views/user/ResetPasswordByUser.vue"),
          meta: {
            rule: "Anonymous"
          }
        },
        {
          path: "/user/forgetpassword/forgetpassword",
          name: "userForgetPassword",
          component: () =>
            import("@/views/user/forgetPassword/forgetPassword.vue"),
          meta: {
            rule: "Anonymous"
          }
        },
        {
          path: "/pages/lock-screen",
          name: "page-lock-screen",
          component: () => import("@/views/pages/LockScreen.vue"),
          meta: {
            rule: "Anonymous"
          }
        },
        {
          path: "/pages/Error404",
          name: "Error404",
          component: () => import("@/views/pages/Error404.vue"),
          meta: {
            rule: "Anonymous"
          }
        },
        // {
        //   path: "/pages/error-404",
        //   name: "page-error-404",
        //   component: () => import("@/views/pages/Error404.vue"),
        //   meta: {
        //     rule: "Anonymous"
        //   }
        // },
        {
          path: "/pages/error-500",
          name: "page-error-500",
          component: () => import("@/views/pages/Error500.vue"),
          meta: {
            rule: "User"
          }
        },
        {
          path: "/pages/not-authorized",
          name: "page-not-authorized",
          component: () => import("@/views/pages/NotAuthorized.vue"),
          meta: {
            rule: "Anonymous"
          }
        },
        {
          path: "/pages/maintenance",
          name: "page-maintenance",
          component: () => import("@/views/pages/Maintenance.vue"),
          meta: {
            rule: "User"
          }
        },
        {
          path: "/user/IdleSessionLogout",
          name: "Session-Expired",
          component: () => import("@/views/user/IdleSessionLogout.vue"),
          meta: {
            rule: "Anonymous",
            pageTitle: "IdleSessionLogout"
          }
        },
        {
          path: "/user/login/login",
          name: "user-login",
          component: () => import("@/views/user/login/Login.vue"),
          meta: {
            rule: "Anonymous",
            pageTitle: "Login"
          }
        }
      ]
    },
    // Redirect to 404 page, if no match found
    {
      path: "",
      redirect: "/pages/Error404"
    }
  ]
});

router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById("loading-bg");
  if (appLoading) {
    appLoading.style.display = "none";
  }
});
router.beforeEach((to, from, next) => {
  const publicPages = [
    "/user/login/login",
    "/user/forgetpassword/forgetpassword"
  ];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem("userInfo");

  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    store.commit("REMOVE_USER_STORE", null, { root: true });
    next("/user/login/login");
  } else {
    next();
  }
});

// });

export default router;
