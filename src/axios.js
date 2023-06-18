import axios from "axios";

const domain = "https://testportal.biadjo.com:5003";

axios.defaults.headers.common["Authorization"] =
  "Bearer " + localStorage.getItem("AccessToken");

export default axios.create({
  baseURL: domain
  // headers: {
  //     Authorization: "Bearer " + localStorage.getItem("AccessToken")
  //   }
});
