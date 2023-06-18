import Vue from "vue";
import { AclInstaller, AclCreate, AclRule } from "vue-acl";
import router from "./../router";
Vue.use(AclInstaller);

let initialRole = "Anonymous";
let userInfo = JSON.parse(localStorage.getItem("userInfo"));
if (userInfo && userInfo.accounttype) {
  initialRole = userInfo.accounttype;
}
export default new AclCreate({
  initial: initialRole,
  notfound: "/pages/not-authorized",
  router,
  acceptLocalRules: true,
  globalRules: {
    // AT0: new AclRule("AT0").generate(),
    // AT1: new AclRule("AT1").generate(),
    // AT2: new AclRule("AT2").generate(),
    // AT3: new AclRule("AT3").generate(),
    // AT4: new AclRule("AT4").generate(),
    // AT5: new AclRule("AT5").generate(),
    // AT6: new AclRule("AT6").generate(),
    // AT7: new AclRule("AT7").generate(),
    // AT8: new AclRule("AT8").generate(),
    // AT9: new AclRule("AT9").generate(),
    // AT10: new AclRule("AT10").generate(),
    // AT11: new AclRule("AT11").generate(),
    // AT12: new AclRule("AT12").generate(),
    // AT13: new AclRule("AT13").generate(),
    // AT14: new AclRule("AT14").generate(),
    SuperAdmin: new AclRule("SuperAdmin")
      .or("AAT0")
      .or("AAT8")
      .generate(),
    Settings: new AclRule("Settings")
      .or("AAT0")
      .or("AAT3")
      .or("AAT12")
      .or("AAT13")
      .generate(),
    UpdateBiadjo: new AclRule("UpdateBiadjo")
      .or("AAT0")
      .or("AAT3")
      .or("AAT12")
      .or("AAT11")
      .or("AAT13")
      .generate(),
    UserManagement: new AclRule("UserManagement")
      .or("AAT0")
      .or("AAT1")
      .or("AAT2")
      .or("AAT3")
      .generate(),
    Accountant: new AclRule("Accountant")
      .or("AAT0")
      .or("AAT3")
      .or("AAT8")
      .or("AAT13")
      .generate(),
    BalanceManagement: new AclRule("BalanceManagement")
      .or("AAT0")
      .or("AAT3")
      .or("AAT5")
      .or("AAT6")
      .or("AAT8")
      .or("AAT11")
      .or("AAT12")
      .or("AAT13")
      .generate(),
    Anonymous: new AclRule("Anonymous")
      .or("AAT0")
      .or("AAT1")
      .or("AAT2")
      .or("AAT3")
      .or("AAT4")
      .or("AAT5")
      .or("AAT6")
      .or("AAT7")
      .or("AAT8")
      .or("AAT9")
      .or("AAT10")
      .or("AAT11")
      .or("AAT12")
      .or("AAT13")
      .or("AAT14")
      .generate()
  }
});
