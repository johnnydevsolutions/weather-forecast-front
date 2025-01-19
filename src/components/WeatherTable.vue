<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="forecasts"
      :search="search"
      class="elevation-3 weather-table"
      :items-per-page="10"
    >
      <template #header="{ columns }">
        <tr>
          <th
            v-for="column in columns"
            :key="column.key"
            class="custom-header"
          >
            {{ column.title }}
          </th>
        </tr>
      </template>

      <template #top>
        <v-toolbar flat color="primary" dark>
          <v-toolbar-title class="text-h5">Weather Forecast</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            placeholder="Type a city name..."
            persistent-placeholder
            single-line
            hide-details
            dark
            class="search-field"
          ></v-text-field>
        </v-toolbar>
      </template>

      <template #[`item.date`]="{ item }">
        <div class="date-cell">
          {{ formatDate(item.date) }}
        </div>
      </template>

      <template #[`item.temperature`]="{ item }">
        <div class="temperature-cell">
          <v-tooltip location="top">
            <template v-slot:activator="{ props }">
              <div v-bind="props" class="d-flex align-center">
                {{ item.temperature.toFixed(1) }}°C
                <v-icon class="ml-2" :color="getTemperatureColor(item.temperature)">
                  mdi-thermometer
                </v-icon>
              </div>
            </template>
            {{ getTemperatureDescription(item.temperature) }}
          </v-tooltip>
        </div>
      </template>

      <template #[`item.temperatureFahrenheit`]="{ item }">
        <div class="temperature-cell">
          <v-tooltip location="top">
            <template v-slot:activator="{ props }">
              <div v-bind="props" class="d-flex align-center">
                {{ item.temperatureFahrenheit.toFixed(1) }}°F
                <v-icon class="ml-2" :color="getTemperatureColor(item.temperature)">
                  mdi-thermometer
                </v-icon>
              </div>
            </template>
            {{ getTemperatureDescription(item.temperature) }}
          </v-tooltip>
        </div>
      </template>

      <template #[`item.condition`]="{ item }">
        <div class="condition-cell">
          {{ item.condition }}
          <div v-if="item.condition === 'Mainly clear'" class="icon-stack ">
            <v-icon class="sun-icon adjust-icons" color="amber-darken-2">
              mdi-weather-sunny
            </v-icon>
            <v-icon class="small-cloud-icon adjust-icons" color="grey" size="x-small">
              mdi-cloud-outline
            </v-icon>
          </div>
          <div v-else-if="item.condition === 'Partly cloudy'" class="icon-stack">
            <v-icon class="sun-icon adjust-icons" color="amber-darken-2">
              mdi-weather-sunny
            </v-icon>
            <v-icon class="cloud-icon adjust-icons" color="grey" size="small">
              mdi-cloud
            </v-icon>
          </div>
          <div v-else-if="item.condition === 'Slight rain'" class="icon-stack">
            <v-icon class="rain-cloud" color="grey">
              mdi-cloud
            </v-icon>
            <v-icon class="rain-drop" color="blue-lighten-1" size="x-small">
              mdi-weather-rainy
            </v-icon>
          </div>
          <div v-else-if="item.condition === 'Slight rain showers'" class="icon-stack">
            <v-icon class="rain-cloud" color="grey">
              mdi-cloud
            </v-icon>
            <v-icon class="rain-drops-multiple" color="blue-lighten-1" size="small">
              mdi-dots-triangle
            </v-icon>
          </div>
          <v-icon v-else class="ml-2" :color="getConditionColor(item.condition)">
            {{ getConditionIcon(item.condition) }}
          </v-icon>
        </div>
      </template>

      <template #[`item.city`]="{ item }">
        <div style="margin-right: 15px;">
          {{ item.city }}
        </div>
      </template>

    </v-data-table>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { getWeatherForecasts } from '../services/weatherService';

export default defineComponent({
  name: 'WeatherTable',
  setup() {
    const forecasts = ref([]);
    const headers = [
      { 
        title: 'City', 
        align: 'center', 
        key: 'city', 
        width: '20%',
        headerProps: { style: 'background-color: #F8F8F8;' }
      },
      { 
        title: 'Date', 
        align: 'center', 
        key: 'date', 
        width: '20%',
        headerProps: { style: 'background-color: #F8F8F8;' }
      },
      { 
        title: 'Temperature (°C)', 
        align: 'center', 
        key: 'temperature', 
        width: '20%',
        headerProps: { style: 'background-color: #F8F8F8;' }
      },
      { 
        title: 'Temperature (°F)', 
        align: 'center', 
        key: 'temperatureFahrenheit', 
        width: '20%',
        headerProps: { style: 'background-color: #F8F8F8;' }
      },
      { 
        title: 'Condition', 
        align: 'center', 
        key: 'condition', 
        width: '20%',
        headerProps: { style: 'background-color: #F8F8F8;' }
      },
    ];
    const search = ref('');

    const formatDate = (dateString: string) => {
      const date = new Date(dateString);
      const formattedDate = new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      }).format(date);

      const formattedTime = new Intl.DateTimeFormat('pt-BR', {
        hour: '2-digit',
        minute: '2-digit'
      }).format(date);

      return `${formattedDate} ${formattedTime}`;
    };

    const getConditionIcon = (condition: string): string => {
      const icons = {
        'Overcast': 'mdi-weather-cloudy',
        'Mainly clear': 'mdi-white-balance-sunny',
        'Slight rain': 'mdi-weather-partly-rainy',
        'Partly cloudy': 'mdi-weather-partly-cloudy',
        'Clear sky': 'mdi-weather-sunny',
        'Moderate drizzle': 'mdi-weather-pouring',
        'Light drizzle': 'mdi-weather-partly-rainy',
        'Foggy': 'mdi-weather-fog'
      };
      return icons[condition as keyof typeof icons] || 'mdi-weather-cloudy';
    };

    const getConditionColor = (condition: string): string => {
      const colors = {
        'Overcast': 'grey',
        'Mainly clear': 'amber-darken-2',
        'Slight rain': 'blue-lighten-1',
        'Partly cloudy': 'grey darken-1',
        'Clear sky': 'amber-darken-2',
        'Moderate drizzle': 'blue-grey',
        'Light drizzle': 'blue-grey',
        'Foggy': 'grey'
      };
      return colors[condition as keyof typeof colors] || 'grey';
    };

    const getTemperatureColor = (celsius: number): string => {
      if (celsius <= 0) return 'blue-darken-3';      // Muito frio
      if (celsius <= 15) return 'light-blue';        // Frio
      if (celsius <= 25) return 'green';             // Agradável
      if (celsius <= 30) return 'orange';            // Quente
      return 'red';                                  // Muito quente
    };

    const getTemperatureDescription = (celsius: number): string => {
      if (celsius <= 0) return 'Extremely Cold';
      if (celsius <= 10) return 'Very Cold';
      if (celsius <= 15) return 'Cold';
      if (celsius <= 20) return 'Mild';
      if (celsius <= 25) return 'Pleasant';
      if (celsius <= 30) return 'Warm';
      if (celsius <= 35) return 'Hot';
      return 'Extremely Hot';
    };

    onMounted(async () => {
      try {
        forecasts.value = await getWeatherForecasts();
      } catch (error) {
        console.error('Erro ao carregar previsões:', error);
      }
    });

    return { 
      forecasts, 
      headers, 
      search,
      formatDate,
      getConditionIcon,
      getConditionColor,
      getTemperatureColor,
      getTemperatureDescription,
    };
  },
});
</script>

<style scoped>
.weather-table {
  margin-top: 20px;
  border-radius: 8px;
}


.search-field {
  max-width: 300px;
  margin-right: 16px;
}

:deep(.v-data-table) {
  background: #f5f5f5;
}

:deep(.v-data-table th) {
  text-align: center !important;
  padding: 8px 16px !important;
  border-right: 1px solid #E0E0E0 !important;
  background-color: #F8F8F8 !important;
  font-weight: bold !important;
}

:deep(.v-data-table th:last-child) {
  border-right: none !important;
}

:deep(.v-data-table td) {
  text-align: center;
  padding: 8px 16px;
  border-right: 1px solid #E0E0E0;
}

:deep(.v-data-table td:last-child) {
  border-right: none;
}

:deep(.v-data-table-row:hover) {
  background-color: #eeeeee !important;
}

:deep(.v-data-table > .v-table__wrapper > table) {
  table-layout: fixed;
  width: 100%;
}

.condition-cell {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  margin-left: 16px;
}

:deep(.custom-header) {
  background-color: #F8F8F8 !important;
  text-align: center !important;
  padding: 8px 16px !important;
  border-right: 1px solid #E0E0E0 !important;
  font-weight: bold !important;
}

:deep(.custom-header:last-child) {
  border-right: none !important;
}

:deep(.v-data-table-header) {
  background-color: rgba(25, 118, 210, 0.1) !important;
}

:deep(.v-data-table th) {
  background-color: rgba(25, 118, 210, 0.1) !important;
  border-right: 1px solid #E0E0E0 !important;
  font-weight: 600 !important;
  color: rgba(0, 0, 0, 0.87) !important;
}

:deep(.v-data-table-header th:last-child) {
  border-right: none !important;
}

.temperature-cell {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.icon-stack {
  position: relative;
  display: inline-flex;
  margin-left: 8px;
}

.sun-icon {
  z-index: 1;
}

.small-cloud-icon {
  position: absolute;
  right: -4px;
  bottom: -4px;
  opacity: 0.5;
  transform: scale(0.7);
  z-index: 1;
}

.cloud-icon {
  position: absolute;
  right: -4px;
  bottom: -2px;
  opacity: 0.8;
  z-index: 2;
}

.partly-sun,
.partly-cloud {
  display: none;
}

.partly-cloudy-icon,
.dual-tone {
  display: none;
}

.rain-cloud {
  position: relative;
  z-index: 1;
}

.rain-drop {
  position: absolute;
  left: 50%;
  transform: translateX(-50%) scale(0.6);
  bottom: -8px;
  z-index: 2;
  opacity: 0.7;
}

.rain-drops-multiple {
  position: absolute;
  left: 50%;
  transform: translateX(-50%) rotate(180deg) scale(0.7);
  bottom: -12px;
  z-index: 2;
}

.adjust-icons {
  padding-right: 16px;
}

.date-cell {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Removendo os estilos específicos da cidade que não são mais necessários */
:deep(.v-data-table td[headers*="city"]),
:deep(.v-data-table th[headers*="city"]) {
  padding-left: 24px !important;
}

</style>
