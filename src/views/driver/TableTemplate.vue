<template>
  <div id="page-user-view">
    <vs-alert
      color="danger"
      v-bind:title="$t('DriverNotFound')"
      :active.sync="ID_not_found"
    >
      <span>record with ID : {{ $route.params.Id }} not found. </span>
      <span>
        <span>Check </span
        ><router-link :to="{ name: 'Driver' }" class="text-inherit underline"
          >All Drivers</router-link
        >
      </span>
    </vs-alert>

    <div id="user-data" v-if="FormData">
      <vx-card v-bind:title="$t('DriverInfo')" class="mb-base">
        <div class="vx-row">
          <!-- Avatar Col -->
          <!-- Information - Col 1 -->
          <div class="vx-col flex-1" id="account-info-col-1"></div>
          <!-- /Information - Col 1 -->

          <!-- Information - Col 2 -->
          <div class="vx-col flex-1" id="account-info-col-2"></div>
          <!-- Buttons - Col 2 -->
          <div class="flex flex-wrap m-4"></div>
        </div>
      </vx-card>

      <vx-card v-bind:title="$t('VehicleInfo')" class="mb-base">
        <!-- Avatar -->
        <div class="vx-row">
          <!-- Avatar Col -->
          <!-- Information - Col 1 -->
          <div class="vx-col flex-1" id="account-info-col-1"></div>
          <!-- /Information - Col 1 -->

          <!-- Information - Col 2 -->
          <div class="vx-col flex-1" id="account-info-col-2"></div>
        </div>
      </vx-card>

      <vx-card v-bind:title="$t('BankAccountInfo')" class="mb-base">
        <!-- Avatar -->
        <div class="vx-row">
          <!-- Avatar Col -->
          <!-- Information - Col 1 -->
          <div class="vx-col flex-1" id="account-info-col-1"></div>
          <!-- /Information - Col 1 -->

          <!-- Information - Col 2 -->
          <div class="vx-col flex-1" id="account-info-col-2"></div>
        </div>
      </vx-card>
    </div>
  </div>
</template>
