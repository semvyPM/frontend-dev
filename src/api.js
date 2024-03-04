import axios from "axios";
import store from "@/store/index.js";
import router from "@/components/router.js";
import {renderSlot} from "vue";



const instance = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
        "Content-Type": "application/json"
    }
});

const getToken = () => {
    store.dispatch('loadToken');
    const token = store.state.token;
    return token;
};

export const signOut = () => {
    store.commit('clearToken');
    store.commit('clearUser');
    window.location.href = "/";
}

export const getClients = async () => {
    const token = getToken();
    const response = await instance.get('/clients/by-user/' + store.state.user.id, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    });
    console.log("ok or huyok: " + response.status);
    return response.data;
}

export const getClient = async (id) => {
    const token = getToken();
    let response = await instance.get('/clients/' + id, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    });
    console.log("ok or huyok: " + response.status);
    return response.data;
}

export const getCalculations = async (id) => {
    const token = getToken();
    try {
        let response = await instance.get('/calculations/by-customer/' + id, {
        headers: {
            Authorization: `Bearer ${token}`
        },
        });
        console.log("ok or huyok: " + response.status);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const getCalculation = async (idcalculation) => {
    const token = getToken();
    try {
        let response = await instance.get('/calculations/' + idcalculation, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });
        console.log("ok or huyok: " + response.status);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const createCustomer = async (customer) => {
    const token = getToken();
    try {
        const response = await instance.post("/clients/create", customer, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });

        if (response.data) {
            router.push({path: "/client/" + response.data.id});
        } else {
            console.log(response.data.message);
        }
    } catch (error) {
        this.error = error.response.data.message;
        console.log(error)
    }
}

export const getFloors = async (idcalculation) => {
    const token = getToken();
    try {
        let response = await instance.get('/calculations/floors/' + idcalculation, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });
        console.log("ok or huyok: " + response.status);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const getBasementData = async (idcalculation) => {
    const token = getToken();
    try {
        let response = await instance.get('/calculations/basements/' + idcalculation, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });
        console.log("ok or huyok: " + response.status);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}