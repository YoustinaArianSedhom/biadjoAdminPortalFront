/*=========================================================================================
  File Name: moduleCourseClassActions.js
  Description: CourseClass Module Actions
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/
import axios from "@/axios.js";
export default {
  IncomePerDayforWeek(context, item) {
    return new Promise((resolve, reject) => {
      axios
        .post("/FleetDashboard/IncomePerDayforWeek", item)
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
  IncomeForYear(context, item) {
    return new Promise((resolve, reject) => {
      axios
        .post("/FleetDashboard/IncomeForYear", item)
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

  BiadojsPerDayforweek(context, item) {
    return new Promise((resolve, reject) => {
      axios
        .post("/DashBoard/BiadojsPerDayforweek", item)
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
  BiadojsPerTrucktypeforweek(context, item) {
    return new Promise((resolve, reject) => {
      axios
        .post("/DashBoard/BiadojsPerTrucktypeforweek", item)
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
  ToDayBiadojsPerTrucktype(context, item) {
    return new Promise((resolve, reject) => {
      axios
        .post("/DashBoard/ToDayBiadojsPerTrucktype", item)
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
  TodayBiadojsForTodayperStatus(context, item) {
    return new Promise((resolve, reject) => {
      axios
        .post("/DashBoard/TodayBiadojsForTodayperStatus", item)
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

  DriversPerTruckType(context, item) {
    return new Promise((resolve, reject) => {
      axios
        .post("/DashBoard/DriversPerTruckType", item)
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
  ClosedBiadojsPerDayForWeek(context, item) {
    return new Promise((resolve, reject) => {
      axios
        .post("/DashBoard/ClosedBiadojsPerDayForWeek", item)
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
  UnClosedBiadojsPerDayForWeek(context, item) {
    return new Promise((resolve, reject) => {
      axios
        .post("/DashBoard/UnClosedBiadojsPerDayForWeek", item)
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
  NoDriverFoundBiadojsCount(context, item) {
    return new Promise((resolve, reject) => {
      axios
        .post("/DashBoard/NoDriverFoundBiadojsCount", item)
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
  UnStartedBiadjosCount(context, item) {
    return new Promise((resolve, reject) => {
      axios
        .post("/DashBoard/UnStartedBiadjosCount", item)
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
  UnInsuredBiadjosCount(context, item) {
    return new Promise((resolve, reject) => {
      axios
        .post("/DashBoard/UnInsuredBiadjosCount", item)
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
  Watingforverificationdriverscount(context, item) {
    return new Promise((resolve, reject) => {
      axios
        .post("/DashBoard/Watingforverificationdriverscount", item)
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

  DriversPerStatus(context, item) {
    return new Promise((resolve, reject) => {
      axios
        .post("/DashBoard/DriversPerStatus", item)
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
  ConflictedBiadjos(context, item) {
    return new Promise((resolve, reject) => {
      axios
        .post("/DashBoard/ConflictedBiadjos", item)
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
