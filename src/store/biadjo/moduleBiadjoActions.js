import axios from "@/axios.js";

export default {
  fetchBiadjosList(context, item) {
    return new Promise((resolve, reject) => {
      axios
        .post("/Biadjos/GetBiadjos", item)
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
  search(context, item) {
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
  SubmitOrderToDriverOrFleet(context, item) {
    return new Promise((resolve, reject) => {
      axios
        .post("/Biadjos/SubmitOrderToDriverOrFleet", item)
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
  GetBiadjosNeedInsurance(context, item) {
    return new Promise((resolve, reject) => {
      axios
        .post("/Biadjos/GetBiadjosNeedInsurance", item)
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
  AddDiscount(context, item) {
    return new Promise((resolve, reject) => {
      axios
        .post("/Biadjos/AddDiscount", item)
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
  PayBiadjoWallet(context, item) {
    return new Promise((resolve, reject) => {
      axios
        .post("/Biadjos/PayBiadjoWallet", item)
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
  GetOffersForBiadjo(context, item) {
    return new Promise((resolve, reject) => {
      axios
        .post("/Biadjos/GetOffersForBiadjo", item)
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
  AcceptOrRejectOffer(context, item) {
    return new Promise((resolve, reject) => {
      axios
        .post("/Biadjos/AcceptOrRejectOffer", item)
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
  OffersWaitingForApproval(context, item) {
    return new Promise((resolve, reject) => {
      axios
        .post("/Biadjos/OffersWaitingForApproval", item)
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
  UnStartedBiadjos(context, item) {
    return new Promise((resolve, reject) => {
      axios
        .post("/Biadjos/UnStartedBiadjos", item)
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
  AddInsurancePolictToBiadjo(context, item) {
    return new Promise((resolve, reject) => {
      axios
        .post("/Biadjos/AddInsurancePolictToBiadjo", item)
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
  GetScheduledBiadjo(context, Biadjo) {
    return new Promise((resolve, reject) => {
      axios
        .post("/Biadjos/GetScheduledBiadjo", Biadjo)
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
  GetConflictedBiadjo(context, Biadjo) {
    return new Promise((resolve, reject) => {
      axios
        .post("/ConflictBiadjo/GetConflictedBiadjo", Biadjo)
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
  GetConflictedBiadjoByid(context, Biadjo) {
    return new Promise((resolve, reject) => {
      axios
        .post("/ConflictBiadjo/GetConflictedBiadjoDetails", Biadjo)
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
  GetBiadjoByid(context, Biadjo) {
    return new Promise((resolve, reject) => {
      axios
        .post("/Biadjos/GetBiadjoDetails", Biadjo)
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
  ViewSubmitedOrdersAndOffers(context, Biadjo) {
    return new Promise((resolve, reject) => {
      axios
        .post("/Biadjos/ViewSubmitedOrdersAndOffers", Biadjo)
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
  AssignUserToConflictBiadjo(context, Biadjo) {
    return new Promise((resolve, reject) => {
      axios
        .post("/ConflictBiadjo/AssignUserToConflictBiadjo", Biadjo)
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
  SubmitOfferToBiadjo(context, Biadjo) {
    return new Promise((resolve, reject) => {
      axios
        .post("/Biadjos/SubmitOfferToBiadjo", Biadjo)
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

  UpdateOfferPrice(context, Biadjo) {
    return new Promise((resolve, reject) => {
      axios
        .post("/Biadjos/UpdateOfferPrice", Biadjo)
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
  AssignDriverToBiadjo(context, Biadjo) {
    return new Promise((resolve, reject) => {
      axios
        .post("/ConflictBiadjo/AssignDriverToBiadjo", Biadjo)
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
  CloseConflictBiadjo(context, Biadjo) {
    return new Promise((resolve, reject) => {
      axios
        .post("/ConflictBiadjo/CloseConflictBiadjo", Biadjo)
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
  UpdateBiadjo(context, Biadjo) {
    return new Promise((resolve, reject) => {
      axios
        .post("/Biadjos/UpdateBiadjo", Biadjo)
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
  GetNearByDrivers(context, Biadjo) {
    return new Promise((resolve, reject) => {
      axios
        .post("/Biadjos/FindNearByDriver", Biadjo)
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
  closeBiadjo(context, Biadjo) {
    return new Promise((resolve, reject) => {
      axios
        .post("/Biadjos/CloseBiadjo", Biadjo)
        .then(response => {
          if (response.status == 200 && response.data.Result == true) {
            resolve(response);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  checkForCancelationFees(context, Biadjo) {
    return new Promise((resolve, reject) => {
      axios
        .post("/Biadjos/BiadjoCancelationFee", Biadjo)
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
  cancelBiadjo(context, Biadjo) {
    return new Promise((resolve, reject) => {
      axios
        .post("/Biadjos/CancelBiadjo", Biadjo)
        .then(response => {
          if (response.status == 200 && response.data.Result == true) {
            resolve(response);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  GetAccidentReportBiadjo(context, Biadjo) {
    return new Promise((resolve, reject) => {
      axios
        .post("/Biadjos/GetAccidentReportBiadjo", Biadjo)
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
  CloseOnAccidentBiadjo(context, Biadjo) {
    return new Promise((resolve, reject) => {
      axios
        .post("/Biadjos/CloseOnAccidentBiadjo", Biadjo)
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
  ReportAccidentBiadjo(context, Biadjo) {
    return new Promise((resolve, reject) => {
      axios
        .post("/Biadjos/ReportAccidentBiadjo", Biadjo)
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
  GetAccidentPicturesBiadjo(context, Biadjo) {
    return new Promise((resolve, reject) => {
      axios
        .post("/Biadjos/GetAccidentPicturesBiadjo", Biadjo)
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
  GetBiadjoNotes(context, Biadjo) {
    return new Promise((resolve, reject) => {
      axios
        .post("/Biadjos/GetNoticeForBiadjo", Biadjo)
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
  AddNoticeToBiadjo(context, Note) {
    return new Promise((resolve, reject) => {
      axios
        .post("/Biadjos/AddNoticeToBiadjo", Note)
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
  GetBiadjoStatusLogHistory(context, Biadjo) {
    return new Promise((resolve, reject) => {
      axios
        .post("/Biadjos/GetBiadjoStatusLogHistory", Biadjo)
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
  AddRemoveVAT(context, Biadjo) {
    return new Promise((resolve, reject) => {
      axios
        .post("/Biadjos/AddRemoveVAT", Biadjo)
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
  DeleteStop(context, Biadjo) {
    return new Promise((resolve, reject) => {
      axios
        .post("/Biadjos/DeleteStop", Biadjo)
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
  AddRoadAndScaleCharges(context, Biadjo) {
    return new Promise((resolve, reject) => {
      axios
        .post("/Biadjos/AddRoadAndScaleCharges", Biadjo)
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
  AddDriverPriceandAssignDrivertoKMBiadjo(context, Model) {
    return new Promise((resolve, reject) => {
      axios
        .post("/Biadjos/AddDriverPriceandAssignDrivertoKMBiadjo", Model)
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
  ResendBiadjoRequest(context, Biadjo) {
    return new Promise((resolve, reject) => {
      axios
        .post("/Biadjos/ResendBiadjoRequest", Biadjo)
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
