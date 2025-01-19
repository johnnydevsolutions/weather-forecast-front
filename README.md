# Weather Forecast Application

A modern, responsive weather forecast application built with Vue 3 and Vuetify 3. This application displays weather forecasts in a clean, interactive table format with dynamic icons and temperature indicators.

## Features

- 📊 Interactive data table with weather information
- 🔍 Real-time search functionality by city name
- 🌡️ Temperature display in both Celsius and Fahrenheit
- 🎨 Dynamic weather condition icons with custom styling
- 🎯 Temperature comfort level indicators
- 📱 Responsive design for all screen sizes

## Weather Conditions

The application supports various weather conditions with custom icons:
- Mainly clear (Sun with small cloud)
- Partly cloudy (Sun with larger cloud)
- Slight rain (Cloud with rain drop)
- Slight rain showers (Cloud with multiple drops)
- Overcast
- Clear sky
- Moderate drizzle
- Light drizzle
- Foggy

## Temperature Indicators

Temperature is displayed with dynamic colors based on comfort levels:
- ≤ 0°C: Dark Blue (Extremely Cold)
- ≤ 10°C: Light Blue (Very Cold)
- ≤ 15°C: Light Blue (Cold)
- ≤ 20°C: Green (Mild)
- ≤ 25°C: Green (Pleasant)
- ≤ 30°C: Orange (Warm)
- ≤ 35°C: Red (Hot)
- > 35°C: Red (Extremely Hot)

## Technical Stack

- Vue 3
- Vuetify 3
- TypeScript
- Material Design Icons

## Project Setup

```bash
# Install dependencies
npm install

# Compile and hot-reload for development
npm run serve

# Compile and minify for production
npm run build

# Lint and fix files
npm run lint
```