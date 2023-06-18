import axios from "@/axios.js";

export default {
  search(context, item) {
    return new Promise((resolve, reject) => {
      axios
        .post("/Clients/Search", item)
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
  GetClientById(context, client) {
    return new Promise((resolve, reject) => {
      axios
        .post("/Clients/GetUserDetails", client)
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
  GetClientCompanyDetails(context, client) {
    return new Promise((resolve, reject) => {
      axios
        .post("/Clients/GetClientCompanyDetails", client)
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
  GetClientCompanyList(context, client) {
    return new Promise((resolve, reject) => {
      axios
        .post("/Clients/GetClientCompanyList", client)
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
  GetClientCompanyUserList(context, client) {
    return new Promise((resolve, reject) => {
      axios
        .post("/Clients/GetClientCompanyUserList", client)
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
  RegisterClientCompany(context, client) {
    return new Promise((resolve, reject) => {
      axios
        .post("/Clients/RegisterCompany", client)
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
  RegisterUser(context, client) {
    return new Promise((resolve, reject) => {
      axios
        .post("/Clients/RegisterUser", client)
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
  ChangeUserAccountToCompany(context, client) {
    return new Promise((resolve, reject) => {
      axios
        .post("/Clients/ChangeUserAccountToCompany", client)
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
  GetScheduledBiadjo(context, client) {
    return new Promise((resolve, reject) => {
      axios
        .post("/Clients/GetScheduledBiadjo", client)
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
  BiadjoHistory(context, client) {
    if (client.Id == undefined) {
      client.Id = " ";
    }

    return new Promise((resolve, reject) => {
      axios
        .post("/Clients/BiadjoHistory", client)
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
  GetTransactionsUsers(context, client) {
    return new Promise((resolve, reject) => {
      axios
        .post("/Clients/TransactionsUsers", client)
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
  UpdateClientAccountStatus(context, client) {
    return new Promise((resolve, reject) => {
      axios
        .post("/Clients/UpdateClientAccountStatus", client)
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
  AddBalanceUser(context, balance) {
    return new Promise((resolve, reject) => {
      axios
        .post("/Clients/AddBalanceUser", balance)
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
  DeductBalanceUser(context, balance) {
    return new Promise((resolve, reject) => {
      axios
        .post("/Clients/DeductBalanceUser", balance)
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
  UpdateClientById(context, client) {
    return new Promise((resolve, reject) => {
      axios
        .post("/Clients/Update", client)
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
  GetClientNotes(context, Client) {
    return new Promise((resolve, reject) => {
      axios
        .post("/Clients/GetNoticeForClient", Client)
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
  AddNoticeToClient(context, Note) {
    return new Promise((resolve, reject) => {
      axios
        .post("/Clients/AddNoticeToBiadjo", Note)
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
  CreateBiadjo(context, Obj) {
    return new Promise((resolve, reject) => {
      axios
        .post("/Clients/CreateBiadjo", Obj)
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
        .post("/Clients/AddRemoveVAT", Biadjo)
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
