import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const api = axios.create({
    baseURL: "http://consult.apiconferemed.com.br:3303/api",
  });

  api.interceptors.request.use(async (config) => {
    const accessToken = await AsyncStorage.getItem('@token');
  
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
  
    return config;
  });



export default api;