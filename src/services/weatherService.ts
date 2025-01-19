import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5282/api', // Substitua pela URL do backend
});

export const getWeatherForecasts = async () => {
    const response = await api.get('/weatherforecasts');
    return response.data;
};
