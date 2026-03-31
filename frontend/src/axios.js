import axios from "axios";
import { useStore } from "./store/store";
import { jwtDecode } from "jwt-decode";
import { api } from "./store/store";

axios.defaults.withCredentials = true;

axios.interceptors.request.use(config => {
    const token = useStore.getState().accessToken;
    if(token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

axios.interceptors.response.use(
    response => response,
    
    async error => {
        const original = error.config;
        if(original.url === `${api}/users/refresh`) return Promise.reject(error);
        if(error.response?.status === 401 && !original._retry){
            original._retry = true;

            try{
                const res = await axios.post(`${api}/users/refresh`);
                const { accessToken } = res.data;
                const user = jwtDecode(accessToken);

                useStore.getState().setAccessToken(accessToken);
                useStore.getState().setUser(user);

                original.headers.Authorization = `Bearer ${accessToken}`;
                return axios(original);
            }catch{
                useStore.getState().clearUser();
                window.location.href = '/auth';
            }
        }
        return Promise.reject(error);
    }
);

fetch(`${api}/users/refresh`, { method: 'POST', credentials: 'include' })
    .then(res => {
        if(!res.ok) return;
        return res.json();
    })
    .then(data => {
        if(data.accessToken){
            const user = jwtDecode(data.accessToken);
            useStore.getState().setAccessToken(data.accessToken);
            useStore.getState().setUser(user);
        }
    })
    .catch(() => {
        useStore.getState().clearUser();
    });

export default axios;