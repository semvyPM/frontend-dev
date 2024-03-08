import axios from "axios";
import store from "@/store/index.js";
import router from "@/router.js";


const instance = axios.create({
    baseURL: "http://kalck.ru/",
    // baseURL: "http://localhost:8080/",
    headers: {
        "Content-Type": "application/json"
        // 'Access-Control-Allow-Origin': '*',
        // 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
        // 'Access-Control-Allow-Headers': '*'
    }
});

axios.defaults.headers.common['Access-Control-Allow-Origin'] = 'http://kalck.ru/';
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = 'http://localhost:8080/';
axios.defaults.headers.common['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE';
axios.defaults.headers.common['Access-Control-Allow-Headers'] = '*';
axios.defaults.withCredentials = true;


export const signIn = async (login, pass) => {
    console.log(login, pass);
    let response = await instance.post('/auth/sign-in', {
        username: login,
        password: pass
    });
    store.commit('setToken', response.data.token);
    store.dispatch('loadToken');
    const userData = await getUser();
    if (userData) {
        store.commit('setUser', userData);
        router.push({name: "clientsPage"});
    }
    else {
        console.log(userData.message);
        console.log("clear token");
        store.commit('clearToken');
    }
}

export const getUser = async () => {
    const token = getToken();
    const response = await instance.get('/api/users/get', {
        headers: {
            Authorization: `Bearer ${token}`
        },
    });

    return checkStatus(response);
}

const checkStatus = (response) => {
    if (response.status === 403) {
        console.log("токен истек");
        signOut();
    }
    else if (response.status === 200) {
        return response.data;
    }
    else {
        console.log("Ошибка выполнения запроса!");
        return null;
    }
}

const getToken = () => {
    store.dispatch('loadToken');
    return store.state.token;
};

export const signOut = () => {
    store.commit('clearToken');
    store.commit('clearUser');
    window.location.href = "/";
}

export const getClients = async () => {
    console.log("get clients");
    const token = getToken();
    let response = await instance.get('/api/clients/by-user/' + store.state.user.id, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    });
    console.log(response.status);
    return checkStatus(response);
}

export const getClient = async (id) => {
    const token = getToken();
    let response = await instance.get('/api/clients/' + id, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    });
    return checkStatus(response);
}

export const getCalculations = async (id) => {
    const token = getToken();
    let response = await instance.get('/api/calculations/by-customer/' + id, {
    headers: {
        Authorization: `Bearer ${token}`
    },
    });
    return checkStatus(response);
}

export const getCalculation = async (idcalculation) => {
    const token = getToken();
    let response = await instance.get('/api/calculations/' + idcalculation, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    });
    return checkStatus(response);
}

export const createCustomer = async (customer) => {
    const token = getToken();
    const response = await instance.post("/api/clients/create", customer, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    });
    if (response.status === 403) {
        signOut();
    }
    else {
        if (response.data) {
            router.push({path: "/client/" + response.data.id});
        } else {
            console.log(response.data.message);
            return null;
        }
    }
}

export const createCalculation = async (calculation) => {
    const token = getToken();
    const response = await instance.post("/api/calculations/create", calculation, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    });
    if (response.status === 403) {
        signOut();
    }
    else {
        if (response.data) {
            return response.data.id;
        } else {
            console.log(response.data.message);
            return null;
        }
    }
}

export const getFloors = async (idcalculation) => {
    const token = getToken();
    let response = await instance.get('/api/calculations/floors/' + idcalculation, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    });
    return checkStatus(response);
}

export const getBasementData = async (idcalculation) => {
    const token = getToken();
    let response = await instance.get('/api/calculations/basements/' + idcalculation, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    });
    return checkStatus(response);
}