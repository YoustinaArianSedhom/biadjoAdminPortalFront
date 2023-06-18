import axios from "@/axios.js";
import router from "@/router";
import jwt from "../../http/requests/auth/jwt/index.js";
import store from "@/store/store.js";
import FileEncryptionHandler from "@/http/requests/auth/jwt/FileEncryptionHandler.js";

export default {
  getDriverLocation(context, Driver) {
    return new Promise((resolve, reject) => {
      axios
        .post("/Biadjos/GetDriverLocation", Driver)
        .then(response => {
          if (response.status == 200) {
            resolve(response);
          }
        })
        .catch(function(error) {
          reject(error);
        });
    });
  },
  UpdateFCMToken(context, item) {
    return new Promise((resolve, reject) => {
      axios
        .post("/AdminAccount/UpdateUserFCMToken", item)
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
  // JWT
  loginJWT({ commit }, payload) {
    return new Promise((resolve, reject) => {
      jwt
        .login(payload.userDetails.Email, payload.userDetails.Password)
        .then(response => {
          // If there's user data in response
          if (response.status == 200) {
            //window.location="/"
            // Set AccessToken

            localStorage.setItem(
              "TokenExpiration",
              response.data.TokenExpiration
            );
            localStorage.setItem("AccessToken", response.data.AccessToken);
            localStorage.setItem("RefreshToken", response.data.RefreshToken);
            // Set bearer token in axios
            commit("SET_BEARER", response.data.AccessToken);

            // Update user details
            commit("UPDATE_USER_INFO", response.data, { root: true });

            //router.push(router.currentRoute.query.to || '/')
            resolve(response);
            store.state.SessionExpired = false;
          } else {
            reject({ message: "Wrong Email or Password" });
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  ForgotPasswordJWT({ commit }, item) {
    return new Promise((resolve, reject) => {
      axios
        .post("/AdminAccount/ResetPasswordByWeb", item)
        .then(response => {
          if (response.status == 200) {
            response.data;
            commit(
              "SET_IS_FORGETPASSWORD_EMAILSENT_SSUCCESSFUL",
              response.data.result
            );
            resolve(response);
          }
          // Redirect User
          //router.push(router.currentRoute.query.to || '/')
        })
        .catch(error => {
          commit("SET_IS_FORGETPASSWORD_EMAILSENT_SSUCCESSFUL", "false");

          reject(error);
        });
    });
  },
  registerUserJWT(context, user) {
    return new Promise((resolve, reject) => {
      axios
        .post("/AdminAccount/RegisterUser", user)
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
  fetchUserDetails({ commit }, payload) {
    return new Promise((resolve, reject) => {
      var JsonValue = {};
      JsonValue.Email = payload;
      JsonValue.Id = "";
      axios
        .post("/AdminAccount/GetUserDetails", JsonValue, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("AccessToken")}`
          }
        })
        .then(response => {
          if (response.status == 200) {
            if (response.data.ProfilePic) {
              let Base64ProfilePic = FileEncryptionHandler.decrypt(
                JSON.parse(response.data.ProfilePic)
              );
              response.data.ProfilePic = Base64ProfilePic;
            } else {
              response.data.ProfilePic = null;
            }

            commit("UPDATE_USER_INFO", response.data, { root: true });
            resolve(response);
          }
        })
        .catch(function(error) {
          reject(error);
        });
    });
  },
  fetchUserDetailsList(context, user) {
    return new Promise(resolve => {
      axios
        .post("/AdminAccount/GetUserDetails", user)
        .then(response => {
          if (response.status == 200) {
            resolve(response);
          }
        })
        .catch(function() {});
    });
  },
  fetchCurrentUserDetailsList({ commit }, user) {
    return new Promise(resolve => {
      axios
        .post("/AdminAccount/GetUserDetails", user)
        .then(response => {
          if (response.status == 200) {
            if (response.data.ProfilePic) {
              let Base64ProfilePic = FileEncryptionHandler.decrypt(
                JSON.parse(response.data.ProfilePic)
              );
              response.data.ProfilePic = Base64ProfilePic;
            } else {
              response.data.ProfilePic = null;
            }

            commit("UPDATE_USER_INFO", response.data, { root: true });
            resolve(response);
          }
        })
        .catch(function() {});
    });
  },
  updateUserStatus(context, user) {
    return new Promise((resolve, reject) => {
      axios
        .post("/AdminAccount/UpdateUserStatus", user)
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
  updateUserAccountType(context, user) {
    return new Promise((resolve, reject) => {
      axios
        .post("/AdminAccount/UpdateUserAccountType", user)
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
  UpdateUserById(context, user) {
    return new Promise((resolve, reject) => {
      axios
        .post("/AdminAccount/UpdateUser", user)
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
  UploadProfilePic(context, image) {
    const formData = new FormData();
    // var jsonObject = image.params.Id;
    formData.append("jsonObject", image.params.Id);
    formData.append("file", image.params.file, image.params.file.name);
    return new Promise((resolve, reject) => {
      axios
        .post("/AdminAccount/UploadProfilePic", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
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
  search(context, user) {
    return new Promise((resolve, reject) => {
      axios
        .post("/AdminAccount/GetUsers", user)
        .then(response => {
          // If there's user data in response
          if (response.status == 200) {
            resolve(response);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  fetchAccessToken() {
    return new Promise(resolve => {
      jwt
        .RefreshToken()
        .then(response => {
          resolve(response);
        })
        .catch(function() {
          router.push("/pages/login");
        });
    });
  },
  logout({ commit }) {
    localStorage.removeItem("AccessToken");
    localStorage.removeItem("RefreshToken");
    localStorage.removeItem("TokenExpiration");
    localStorage.removeItem("userInfo");
    commit("REMOVE_USER_STORE", null, { root: true });
    commit("CLEAR_USER_INFO", null, { root: true });
    commit("REMOVE_BEARER");
    router.push("/user/login/login");
  },

  resetPasswordByAdmin(context, user) {
    return new Promise((resolve, reject) => {
      axios
        .post("/AdminAccount/ResetPasswordByAdmin", user)
        .then(response => {
          if (response.data == 1) {
            resolve(response);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  resetPasswordByUser(context, user) {
    return new Promise((resolve, reject) => {
      axios
        .post("/AdminAccount/ResetPasswordByUser", user)
        .then(response => {
          if (response.data == 1) {
            resolve(response);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  refreshCurrentUser({ commit }) {
    return new Promise((resolve, reject) => {
      var JsonValue = {};
      let userInfo = JSON.parse(localStorage.getItem("userInfo"));
      JsonValue.Email = userInfo.Email;
      JsonValue.Id = "";
      axios
        .post("/AdminAccount/GetUserDetails", JsonValue)
        .then(response => {
          if (response.status == 200) {
            if (response.data.ProfilePic) {
              let Base64ProfilePic = FileEncryptionHandler.decrypt(
                JSON.parse(response.data.ProfilePic)
              );
              response.data.ProfilePic = Base64ProfilePic;
            } else {
              response.data.ProfilePic = null;
            }

            commit("UPDATE_USER_INFO", response.data, { root: true });

            resolve(response);
          }
        })
        .catch(function(error) {
          reject(error);
        });
    });
  },
  FcmController(context, Model) {
    return new Promise((resolve, reject) => {
      axios
        .post("https://fcm.googleapis.com/fcm/send", Model, {
          headers: {
            Authorization:
              "key=AAAA9nd_3BU:APA91bEjjw3DaFIigT1MF2o7fjj_ssF7GWL8GIFPamu22-zZ3l8kCuPT9rNa9o0j4gpManQfmwjkFi3TZftYjmRrdOX8hj3jOfrJVYjtU771jmHOPKlgVJ_uRKEvjPiRQBjaGJmq7VVG"
          }
        })
        .then(response => {
          // // If there's user data in response
          // if (response.status == 200) {
          resolve(response);
          // }
        })
        .catch(error => {
          reject(error);
        });
    });
  }
};
