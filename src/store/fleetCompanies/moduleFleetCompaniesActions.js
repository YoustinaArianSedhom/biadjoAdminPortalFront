/*=========================================================================================
  File Name: moduleCalendarActions.js
  Description: Calendar Module Actions
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/
import axios from "@/axios.js";
export default {
  fetchCompanyBankAccountInfo(context, Company) {
    return new Promise((resolve, reject) => {
      axios
        .post("/Fleet/GetCompanyBankAccountInfo", Company)
        .then(response => {
          if (response.status == 200) {
            resolve(response);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  updateCompanyBankAccountInformation(context, BankInfo) {
    return new Promise((resolve, reject) => {
      axios
        .post("/Fleet/UpdateCompanyBankAccountInformation", BankInfo)
        .then(response => {
          if (response.status == 200) {
            resolve(response);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  RegisterFleetCompany(context, item) {
    return new Promise((resolve, reject) => {
      axios
        .post("/Fleet/RegisterCompany", item)
        .then(response => {
          if (response.status == 200) {
            resolve(response);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  FleetCompaniesList(context, item) {
    return new Promise((resolve, reject) => {
      axios
        .post("/Fleet/FleetCompaniesList", item)
        .then(response => {
          if (response.status == 200) {
            resolve(response);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  GetComapneyDetails(context, driver) {
    return new Promise((resolve, reject) => {
      axios
        .post("/Fleet/GetComapneyDetails", driver)
        .then(response => {
          if (response.status == 200) {
            resolve(response);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  EditCompanyDetails(context, driver) {
    return new Promise((resolve, reject) => {
      axios
        .post("/Fleet/EditCompanyDetails", driver)
        .then(response => {
          if (response.status == 200) {
            resolve(response);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  GetCompanyUsers(context, driver) {
    return new Promise((resolve, reject) => {
      axios
        .post("/Fleet/FleetCompanyUsersList", driver)
        .then(response => {
          if (response.status == 200) {
            resolve(response);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  applyBankInfoToAllDrivers(commit, Company) {
    return new Promise((resolve, reject) => {
      axios
        .post("/Fleet/ApplyBankInfoToAllDrivers", Company)
        .then(response => {
          if (response.status == 200) {
            resolve(response);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  GetCompanyDrivers(context, driver) {
    return new Promise((resolve, reject) => {
      axios
        .post("/Fleet/FleetCompanyDriversList", driver)
        .then(response => {
          if (response.status == 200) {
            resolve(response);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  AddDriverToCompany(context, driver) {
    return new Promise((resolve, reject) => {
      axios
        .post("/Fleet/AddDriverToCompany", driver)
        .then(response => {
          if (response.status == 200) {
            resolve(response);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  BiadjoHistoryForCompany(context, company) {
    return new Promise((resolve, reject) => {
      axios
        .post("/Fleet/BiadjoHistoryForCompany", company)
        .then(response => {
          if (response.status == 200) {
            resolve(response);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  ScheduledBiadjosForCompany(context, company) {
    return new Promise((resolve, reject) => {
      axios
        .post("/Fleet/ScheduledBiadjosForCompany", company)
        .then(response => {
          if (response.status == 200) {
            resolve(response);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  SubmitedOrdersAndOffersForCompany(context, company) {
    return new Promise((resolve, reject) => {
      axios
        .post("/Fleet/ViewSubmitedOrdersAndOffersForCompany", company)
        .then(response => {
          if (response.status == 200) {
            resolve(response);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  TransactionsHistoryCompany(context, company) {
    return new Promise((resolve, reject) => {
      axios
        .post("/Fleet/TransactionsHistoryCompany", company)
        .then(response => {
          if (response.status == 200) {
            resolve(response);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  CompanyWalletBalance(context, company) {
    return new Promise((resolve, reject) => {
      axios
        .post("/Fleet/CompanyWalletBalance", company)
        .then(response => {
          if (response.status == 200) {
            resolve(response);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  RemoveDriverFromCompany(context, driver) {
    return new Promise((resolve, reject) => {
      axios
        .post("/Fleet/RemoveDriverFromCompany", driver)
        .then(response => {
          if (response.status == 200) {
            resolve(response);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  GetUserDetails(context, user) {
    return new Promise((resolve, reject) => {
      axios
        .post("/Fleet/GetUserDetails", user)
        .then(response => {
          if (response.status == 200) {
            resolve(response);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  EditUserDetails(context, user) {
    return new Promise((resolve, reject) => {
      axios
        .post("/Fleet/EditUserDetails", user)
        .then(response => {
          if (response.status == 200) {
            resolve(response);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  EditCompanyDriversPermissions(context, model) {
    return new Promise((resolve, reject) => {
      axios
        .post("/Fleet/EditCompanyDriversPermissions", model)
        .then(response => {
          if (response.status == 200) {
            resolve(response);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  GetNoticeForFleet(context, Biadjo) {
    return new Promise((resolve, reject) => {
      axios
        .post("/Fleet/GetNoticeForFleet", Biadjo)
        .then(response => {
          if (response.status == 200) {
            resolve(response);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  AddNoticeToFleet(context, Note) {
    return new Promise((resolve, reject) => {
      axios
        .post("/Fleet/AddNoticeToFleet", Note)
        .then(response => {
          if (response.status == 200) {
            resolve(response);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  }
};
