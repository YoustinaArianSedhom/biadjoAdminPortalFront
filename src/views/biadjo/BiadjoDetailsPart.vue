<template>
  <div>
    <vx-card class="mb-base">
      <div class="vx-row">
        <div class="vx-col flex-1" id="account-info-col-1">
          <table>
            <tr>
              <td class="font-semibold">{{ $t("CargoType") }}</td>
              <td>{{ FormData.CargoType }}</td>
            </tr>
            <tr>
              <td class="font-semibold">{{ $t("NumberOfWorkers") }}</td>
              <td>
                {{ FormData.NumberOfWorkers }}
              </td>
            </tr>
            <tr style="width: 1400px;">
              <td class="font-semibold">{{ $t("CargoDescription") }}</td>
              <td>{{ FormData.CargoDescription }}</td>
            </tr>
            <tr>
              <td class="font-semibold">{{ $t("CargoValue") }}</td>
              <td>{{ FormData.CargoValue | numFormat("###,##0.00") }}</td>
            </tr>
            <tr>
              <td class="font-semibold">{{ $t("CargoWeight") }}</td>
              <td>
                {{ FormData.CargoWeight | numFormat("###,##0.00") }}
                {{ $t(FormData.CargoWeightUnit) }}
              </td>
            </tr>
            <tr>
              <td class="font-semibold">{{ $t("Width") }}</td>
              <td>{{ FormData.Width }}</td>
            </tr>
          </table>
        </div>

        <div class="vx-col flex-1" id="account-info-col-2">
          <table>
            <tr>
              <td class="font-semibold">{{ $t("VehicleType") }}</td>
              <td>{{ $t(FormData.VehicleType) }}</td>
            </tr>
            <tr>
              <td class="font-semibold">{{ $t("VehicleOption") }}</td>
              <td>{{ FormData.VehicleOption }}</td>
            </tr>
            <tr>
              <td class="font-semibold">{{ $t("NumberOfStops") }}</td>
              <td>{{ FormData.NumberOfTrips }}</td>
            </tr>
            <tr>
              <td class="font-semibold">{{ $t("Height") }}</td>
              <td>{{ FormData.Height }}</td>
            </tr>
            <tr>
              <td class="font-semibold">{{ $t("Length") }}</td>
              <td>{{ FormData.Length }}</td>
            </tr>
          </table>
        </div>
      </div>
    </vx-card>

    <vx-card class="mb-base">
      <div class="vx-row">
        <div class="vx-col flex-1" id="account-info-col-1">
          <table>
            <tr>
              <td class="font-semibold">{{ $t("TripDistance") }}</td>
              <td>{{ distance }}</td>
            </tr>
            <tr>
              <td class="font-semibold">{{ $t("StartLocation") }}</td>
              <td>
                <vx-tooltip text="Check Location On Google Maps" position="top">
                  <a
                    target="_blank"
                    v-bind:href="
                      `${StartLink}${FormData.StLatitude},${FormData.StLongitude}${EndLink}`
                    "
                    >{{ FormData.StLatitude }},{{ FormData.StLongitude }}</a
                  >
                </vx-tooltip>
              </td>
            </tr>
            <tr>
              <td class="font-semibold">{{ $t("StartPlaceId") }}</td>
              <td>{{ FormData.StPlaceId }}</td>
            </tr>
            <tr>
              <td class="font-semibold">{{ $t("StartCity") }}</td>
              <td>{{ FormData.StartCity }}</td>
            </tr>
            <tr>
              <td class="font-semibold">{{ $t("StartCountry") }}</td>
              <td>{{ FormData.StartCountry }}</td>
            </tr>
            <tr>
              <td class="font-semibold">{{ $t("StartCountryCode") }}</td>
              <td>{{ FormData.StartCountryCode }}</td>
            </tr>
            <tr>
              <td class="font-semibold">{{ $t("StartState") }}</td>
              <td>{{ FormData.StartState }}</td>
            </tr>
            <tr>
              <td class="font-semibold">{{ $t("StartAddress") }}</td>
              <td>{{ FormData.StPlaceDesicription }}</td>
            </tr>
          </table>
        </div>

        <div class="vx-col flex-1" id="account-info-col-2">
          <table>
            <tr>
              <td class="font-semibold">{{ $t("TripDuration") }}</td>
              <td>{{ duration }}</td>
            </tr>
            <tr>
              <td class="font-semibold">{{ $t("EndLocation") }}</td>
              <td>
                <vx-tooltip text="Check Location On Google Maps" position="top">
                  <a
                    target="_blank"
                    v-bind:href="
                      `${StartLink}${FormData.EnLatitude},${FormData.EnLongitude}${EndLink}`
                    "
                    >{{ FormData.EnLatitude }},{{ FormData.EnLongitude }}</a
                  >
                </vx-tooltip>
              </td>
            </tr>
            <tr>
              <td class="font-semibold">{{ $t("EndPlaceId") }}</td>
              <td>{{ FormData.EnPlaceId }}</td>
            </tr>
            <tr>
              <td class="font-semibold">{{ $t("EndCountry") }}</td>
              <td>{{ FormData.EndCountry }}</td>
            </tr>
            <tr>
              <td class="font-semibold">{{ $t("EndCountryCode") }}</td>
              <td>{{ FormData.EndCountryCode }}</td>
            </tr>
            <tr>
              <td class="font-semibold">{{ $t("EndCity") }}</td>
              <td>{{ FormData.EndCity }}</td>
            </tr>
            <tr>
              <td class="font-semibold">{{ $t("EndState") }}</td>
              <td>{{ FormData.EndState }}</td>
            </tr>
            <tr>
              <td class="font-semibold">{{ $t("EndAddress") }}</td>
              <td>{{ FormData.EnPlaceDesicription }}</td>
            </tr>
          </table>
        </div>
      </div>
    </vx-card>
    <vx-card v-if="FormData.Stops && FormData.Stops.length > 0">
      <div>
        <div v-for="(item, index) in FormData.Stops" :key="index" class="mb-4">
          <tr class="mb-4">
            <td>
              <span class="align-top mr-4 ml-4 text-danger"
                >{{ $t("TripNo") }} {{ index + 1 }}
              </span>
            </td>

            <td class="font-semibold mr-2 ml-2 break-normal">
              {{ item.PlaceDescription }}
            </td>
          </tr>
        </div>
      </div>
    </vx-card>
  </div>
</template>
<script>
import VxCard from "../../components/vx-card/VxCard.vue";
export default {
  components: { VxCard },
  data() {
    return {
      StartLink: "https://maps.google.com/maps?q=@",
      EndLink: "&17z"
    };
  },
  name: "BiadjoDetailsPart",
  props: {
    FormData: {
      type: Object
    },
    distance: {
      type: [Number, String]
    },
    duration: {
      type: [Number, String]
    }
  }
};
</script>
