/*=========================================================================================
  File Name: sidebarItems.js
  Description: Sidebar Items list. Add / Remove menu items from here.
  Strucutre:
          url     => router path
          name    => name to display in sidebar
          slug    => router path name
          icon    => Feather Icon component/icon name
          tag     => text to display on badge
          tagColor  => class to apply on badge element
          i18n    => Internationalization
          submenu   => submenu of current item (current item will become dropdown )
                NOTE: Submenu don't have any icon(you can add icon if u want to display)
          isDisabled  => disable sidebar item/group
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/
// const UserRole = JSON.parse(localStorage.getItem("userInfo")).accounttype;
export default [
  {
    url: "/",
    name: "Home",
    slug: "home",
    icon: "HomeIcon",
    show: JSON.parse(localStorage.getItem("userInfo")).accounttype,
    i18n: "Home"
  },
  {
    url: null,
    name: "Biadjo",
    // tag: "4",
    tagColor: "primary",
    show: JSON.parse(localStorage.getItem("userInfo")).accounttype,
    icon: "ActivityIcon",
    i18n: "Biadjo",
    submenu: [
      {
        url: "/BiadjoSearch",
        name: "BiadjoSearch",
        slug: "BiadjoSearch",
        icon: "ClipboardIcon",
        i18n: "Search"
      },
      {
        url: "/ConflictedBiadjo",
        name: "ConflictedBiadjo",
        slug: "ConflictedBiadjo",
        icon: "ClipboardIcon",
        i18n: "ConflictedBiadjo"
      },
      {
        url: "/ScheduledBiadjo",
        name: "ScheduledBiadjo",
        slug: "ScheduledBiadjo",
        icon: "ClipboardIcon",
        i18n: "ScheduledBiadjo"
      },
      {
        url: "/BiadjosWithoutDrivers",
        name: "No Driver Found Biadjo",
        slug: "BiadjosWithoutDrivers",
        i18n: "NoDriverFound"
      },
      {
        url: "/UnclosedBiadjos",
        name: "Unclosed Biadjos",
        slug: "UnclosedBiadjos",
        i18n: "UnclosedBiadjos"
      },
      {
        url: "/BiadjosNeedInsurance",
        name: "BiadjosNeedInsurance",
        slug: "BiadjosNeedInsurance",
        i18n: "BiadjosNeedInsurance"
      },
      {
        url: "/UnStartedBiadjos",
        name: "UnStarted Biadjos",
        slug: "UnStartedBiadjos",
        i18n: "UnStartedBiadjos"
      },
      {
        url: "/OffersWaitingForApproval",
        name: "OffersWaitingForApproval",
        slug: "OffersWaitingForApproval",
        i18n: "OffersWaitingForApproval"
      }
    ]
  },
  {
    url: null,
    name: "Drivers",
    slug: "Drivers",
    icon: "TruckIcon",
    show: JSON.parse(localStorage.getItem("userInfo")).accounttype,
    i18n: "Drivers",
    submenu: [
      {
        url: "/Driver",
        name: "Search",
        slug: "Driver",
        i18n: "Search"
      },
      {
        url: "/WaitingForVerificationDrivers",
        name: "WaitingForVerfication",
        slug: "WaitingForVerficationDrivers",
        i18n: "WaitingForVerficationDrivers"
      },
      {
        url: "/UnPaidDriverList",
        name: "UnPaidDriverList",
        slug: "UnPaidDriverList",
        i18n: "UnPaidDriverList"
      },
      {
        url: "/RegisterDriver",
        name: "RegisterDriver",
        slug: "RegisterDriver",
        i18n: "RegisterDriver"
      },
      {
        url: "/TrucksTypes",
        name: "TrucksTypes",
        slug: "TrucksTypes",
        i18n: "TrucksTypes"
      }
    ]
  },
  {
    url: null,
    name: "Clients",
    slug: "Clients",
    icon: "UsersIcon",
    show: JSON.parse(localStorage.getItem("userInfo")).accounttype,
    i18n: "Clients",
    submenu: [
      {
        url: "/Client",
        name: "Client",
        slug: "Client",
        show: JSON.parse(localStorage.getItem("userInfo")).accounttype,
        icon: "UsersIcon",
        i18n: "Clients"
      },
      {
        url: "/RegisterUser",
        name: "RegisterUser",
        slug: "RegisterUser",
        show: JSON.parse(localStorage.getItem("userInfo")).accounttype,
        icon: "UsersIcon",
        i18n: "RegisterUser"
      }
    ]
  },
  {
    url: null,
    name: "clientCompanies",
    slug: "clientCompanies",
    icon: "UsersIcon",
    show: JSON.parse(localStorage.getItem("userInfo")).accounttype,
    i18n: "clientCompanies",
    submenu: [
      {
        url: "/ClientsCompanyList",
        name: "ClientsCompanyList",
        slug: "ClientsCompanyList",
        i18n: "ClientsCompanyList"
      },
      {
        url: "/RegisterClientCompany",
        name: "RegisterClientCompany",
        slug: "RegisterClientCompany",
        i18n: "RegisterClientCompany"
      }
    ]
  },

  {
    url: null,
    name: "fleetCompanies",
    slug: "fleetCompanies",
    icon: "AtSignIcon",
    show: JSON.parse(localStorage.getItem("userInfo")).accounttype,
    i18n: "FleetCompanies",
    submenu: [
      {
        url: "/FleetCompaniesList",
        name: "FleetCompaniesList",
        slug: "FleetCompaniesList",
        i18n: "FleetCompaniesList"
      },
      {
        url: "/RegisterFleetCompany",
        name: "RegisterFleetCompany",
        slug: "RegisterFleetCompany",
        i18n: "RegisterFleetCompany"
      }
    ]
  },
  {
    url: null,
    name: "Setting",
    show:
      JSON.parse(localStorage.getItem("userInfo")).accounttype == "AAT0" ||
      JSON.parse(localStorage.getItem("userInfo")).accounttype == "AAT3" ||
      JSON.parse(localStorage.getItem("userInfo")).accounttype == "AAT12" ||
      JSON.parse(localStorage.getItem("userInfo")).accounttype == "AAT13",
    // tag: "4",
    tagColor: "primary",
    icon: "SettingsIcon",
    i18n: "Setting",
    submenu: [
      {
        url: "/Country",
        name: "Country",
        slug: "Country",
        icon: "ClipboardIcon",
        i18n: "Country"
      }
    ]
  },
  {
    url: null,
    name: "User Account",
    // tag: "4",
    tagColor: "primary",
    show:
      JSON.parse(localStorage.getItem("userInfo")).accounttype == "AAT0" ||
      JSON.parse(localStorage.getItem("userInfo")).accounttype == "AAT1" ||
      JSON.parse(localStorage.getItem("userInfo")).accounttype == "AAT2" ||
      JSON.parse(localStorage.getItem("userInfo")).accounttype == "AAT3",
    icon: "UserIcon",
    i18n: "UserAccount",
    submenu: [
      {
        url: "/user/Search",
        name: "Search",
        slug: "Search",
        icon: "MenuIcon",
        i18n: "Search"
      },
      {
        url: "/user/register/Register",
        name: "Create User",
        slug: "Register",
        icon: "UsersIcon",
        i18n: "Register"
      }
    ]
  },

  {
    url: "/Reports",
    name: "Reports",
    slug: "Reports",
    show:
      JSON.parse(localStorage.getItem("userInfo")).accounttype == "AAT0" ||
      JSON.parse(localStorage.getItem("userInfo")).accounttype == "AAT3" ||
      JSON.parse(localStorage.getItem("userInfo")).accounttype == "AAT8" ||
      JSON.parse(localStorage.getItem("userInfo")).accounttype == "AAT13",
    icon: "FileTextIcon",
    i18n: "Reports",
    submenu: [
      {
        url: "/UnPaiedDriversDetails",
        name: "UnPaiedDriversDetails",
        slug: "UnPaiedDriversDetails",
        icon: "DollarSignIcon",
        i18n: "UnPaiedDriversDetails"
      },
      {
        url: "/UnPaiedCompaniesDetails",
        name: "UnPaiedCompaniesDetails",
        slug: "UnPaiedCompaniesDetails",
        icon: "DollarSignIcon",
        i18n: "UnPaiedCompaniesDetails"
      },
      {
        url: "/IncomeDetailed",
        name: "IncomeDetailed",
        slug: "IncomeDetailed",
        icon: "DollarSignIcon",
        i18n: "IncomeDetailed"
      },
      {
        url: "/IncomeReportSummary",
        name: "IncomeReportSummary",
        slug: "IncomeReportSummary",
        icon: "DollarSignIcon",
        i18n: "IncomeReportSummary"
      },
      {
        url: "/UnOfficialIncomeSummaryReport",
        name: "UnOfficialIncomeSummaryReport",
        slug: "UnOfficialIncomeSummaryReport",
        icon: "DollarSignIcon",
        i18n: "UnOfficialIncomeSummaryReport"
      },
      {
        url: "/ACHEGDriversReport",
        name: "ACHEGDriversReport",
        slug: "ACHEGDriversReport",
        icon: "DollarSignIcon",
        i18n: "ACHEGDriversReport"
      },
      {
        url: "/ACHEGFleetsReportrepx",
        name: "ACHEGFleetsReportrepx",
        slug: "ACHEGFleetsReportrepx",
        icon: "DollarSignIcon",
        i18n: "ACHEGFleetsReportrepx"
      }
    ]
  }
  // {
  //   url: "/NewUpdates",
  //   name: "NewUpdates",
  //   slug: "NewUpdates",
  //   tag: "new",
  //   tagColor: "success",
  //   show: JSON.parse(localStorage.getItem("userInfo")).accounttype,
  //   icon: "SlackIcon",
  //   i18n: "NewUpdates"
  // }
];
