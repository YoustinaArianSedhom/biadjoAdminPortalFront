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
  search(context, item) {
    if (item.VehicleOption == undefined) {
      item.VehicleOption = "";
    }
    return new Promise((resolve, reject) => {
      axios
        .post("/Drivers/Search", item)
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
  NoDriverFound(context, item) {
    return new Promise((resolve, reject) => {
      axios
        .post("/Biadjos/Search", item)
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
  SubmitOfferToOrder(context, item) {
    return new Promise((resolve, reject) => {
      axios
        .post("/Biadjos/SubmitOfferToOrder", item)
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
  RegisterDriver(context, item) {
    return new Promise((resolve, reject) => {
      axios
        .post("/Drivers/RegisterDriver", item)
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
  WaitingForVerificationDrivers(context, Model) {
    return new Promise((resolve, reject) => {
      axios
        .post("/Drivers/WaitingForVerificationDrivers", Model)
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
  PayDriver(context, Model) {
    return new Promise((resolve, reject) => {
      axios
        .post("/Drivers/PayDriver", Model)
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
  getDriverUnpaidBiadjos(context, Model) {
    return new Promise((resolve, reject) => {
      axios
        .post("/Drivers/GetDriverUnpaiddBiadjo", Model)
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
  getDriverBiadjosHistory(context, Model) {
    return new Promise((resolve, reject) => {
      axios
        .post("/Drivers/BiadjoHistory", Model)
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
  getScheduledBiadjos(context, Model) {
    return new Promise((resolve, reject) => {
      axios
        .post("/Drivers/GetScheduledBiadjo", Model)
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

  update(context, item) {
    return new Promise((resolve, reject) => {
      axios
        .post("/Drivers/Update", item)
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
  GetTransactionsDrivers(context, driver) {
    return new Promise((resolve, reject) => {
      axios
        .post("/Drivers/TransactionsDrivers", driver)
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
  GetDriverPercentage(context, WalletCountryCode) {
    return new Promise((resolve, reject) => {
      axios
        .post("/Drivers/DriverPercentage", WalletCountryCode)
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
  GetUnpaidDriverlist(context, driver) {
    return new Promise((resolve, reject) => {
      axios
        .post("/Drivers/GetUnpaidDriverlist", driver)
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

  ViewSubmitedOrders(context, DriverId) {
    return new Promise((resolve, reject) => {
      axios
        .post("/Drivers/ViewSubmitedOrdersAndOffers", DriverId)
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
  UpdateDriverAccountStatus(context, user) {
    return new Promise((resolve, reject) => {
      axios
        .post("/Drivers/UpdateDriverAccountStatus", user)
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
  bankAccountInfoData(context, DriverId) {
    return new Promise((resolve, reject) => {
      let user = {};
      user.DriverId = DriverId;
      axios
        .post("/Drivers/BankAccountInfo", user)
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
  updateBankAccountInfoData(context, item) {
    return new Promise((resolve, reject) => {
      axios
        .post("/Drivers/UpdateBankAccountInformation", item)
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
  GetDriverById(context, driver) {
    if (driver.PhoneNumber == undefined) {
      driver.PhoneNumber = "";
    }

    return new Promise((resolve, reject) => {
      axios
        .post("/Drivers/GetDriverDetails", driver)
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

  GetDocumentById(context, driver) {
    return new Promise((resolve, reject) => {
      axios
        .post("/Drivers/DocumentsByURL", driver)
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
  updateDocumentStatusByID(context, Documents) {
    return new Promise((resolve, reject) => {
      axios
        .post("/Drivers/UpdateDocumentStatus", Documents)
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
  getDriverLocation(context, Driver) {
    return new Promise((resolve, reject) => {
      axios
        .post("/Biadjos/GetDriverLocation", Driver)
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
  AddBalanceDriver(context, balance) {
    return new Promise((resolve, reject) => {
      axios
        .post("/Drivers/AddBalanceDriver", balance)
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
  DeductBalanceDriver(context, balance) {
    return new Promise((resolve, reject) => {
      axios
        .post("/Drivers/DeductBalanceUser", balance)
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
  GetDriverNotes(context, Driver) {
    return new Promise((resolve, reject) => {
      axios
        .post("/Drivers/GetNoticeForDriver", Driver)
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
  AddNoticeToDriver(context, Note) {
    return new Promise((resolve, reject) => {
      axios
        .post("/Drivers/AddNoticeToDriver", Note)
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
