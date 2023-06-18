/*=========================================================================================
  File Name: moduleDataList.js
  Description: Calendar Module
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

import state from "./moduleFleetCompaniesState.js";
import mutations from "./moduleFleetCompaniesMutations.js";
import actions from "./moduleFleetCompaniesActions.js";
import getters from "./moduleFleetCompaniesGetters.js";

export default {
  isRegistered: false,
  namespaced: true,
  state: state,
  mutations: mutations,
  actions: actions,
  getters: getters
};
