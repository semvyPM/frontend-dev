import axios from "axios";
import store from "@/store/index.js";
import router from "@/components/router.js";


const instance = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
        "Content-Type": "application/json"
    }
});

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
    const token = getToken();
    let response = await instance.get('/clients/by-user/' + store.state.user.id, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    });
    return checkStatus(response);
}

export const getClient = async (id) => {
    const token = getToken();
    let response = await instance.get('/clients/' + id, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    });
    return checkStatus(response);
}

export const getCalculations = async (id) => {
    const token = getToken();
    let response = await instance.get('/calculations/by-customer/' + id, {
    headers: {
        Authorization: `Bearer ${token}`
    },
    });
    return checkStatus(response);
}

export const getCalculation = async (idcalculation) => {
    const token = getToken();
    let response = await instance.get('/calculations/' + idcalculation, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    });
    return checkStatus(response);
}

export const createCustomer = async (customer) => {
    const token = getToken();
    const response = await instance.post("/clients/create", customer, {
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
    const response = await instance.post("/calculations/create", calculation, {
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
    let response = await instance.get('/calculations/floors/' + idcalculation, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    });
    return checkStatus(response);
}

export const getBasementData = async (idcalculation) => {
    const token = getToken();
    let response = await instance.get('/calculations/basements/' + idcalculation, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    });
    return checkStatus(response);
}