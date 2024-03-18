import axios from "axios";
import store from "@/store/index.js";
import router from "@/router.js";


const instance = axios.create({
    baseURL: "http://kalck.ru/",
    // baseURL: "http://localhost:8080/",
    headers: {
        "Content-Type": "application/json"
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


const checkStatus = (response) => {
    if (response.status === 403) {
        console.log("token");
        // signOut();
    }
    else {
        console.log("Ошибка выполнения запроса!");
        return null;
    }
}

export const getUser = async () => {
    const token = getToken();
    return await instance.get('/api/users/get', {
        headers: {
            Authorization: `Bearer ${token}`
        },
    }).then(response => {
        console.log(response.data);
        return response.data;
    }).catch(reportError => {
        return checkStatus(reportError.response);
    });
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
    return await instance.get('/api/clients/by-user/' + store.state.user.id, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    }).then(response => {
        console.log(response.data);
        return response.data;
    }).catch(reportError => {
        return checkStatus(reportError.response);
    });

}

export const getClient = async (id) => {
    const token = getToken();
    return await instance.get('/api/clients/' + id, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    }).then(response => {
        console.log(response.data);
        return response.data;
    }).catch(reportError => {
        return checkStatus(reportError.response);
    });
}

export const getCalculations = async (id) => {
    const token = getToken();
    return  await instance.get('/api/calculations/by-customer/' + id, {
    headers: {
        Authorization: `Bearer ${token}`
    },
    }).then(response => {
        console.log(response.data);
        return response.data;
    }).catch(reportError => {
        return checkStatus(reportError.response);
    });
}

export const getCalculation = async (idcalculation) => {
    const token = getToken();
    return  await instance.get('/api/calculations/' + idcalculation, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    }).then(response => {
        console.log(response.data);
        return response.data;
    }).catch(reportError => {
        return checkStatus(reportError.response);
    });
}

export const createCustomer = async (customer) => {
    const token = getToken();
    return await instance.post("/api/clients/create", customer, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    }).then(response => {
        router.push({path: "/client/" + response.data.id});
    }).catch(reportError => {
        return checkStatus(reportError.response);
    });

}

export const updateCustomer = async (customer) => {
    const token = getToken();
    return await instance.put("/api/clients/update", customer, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    }).then(response => {
        return response.data;
    }).catch(reportError => {
        return checkStatus(reportError.response);
    });

}

export const changeStatus = async (calculation) => {
    const token = getToken();
    return await instance.put('/api/calculations/status', calculation, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    }).then(response => {
        return response.data;
    }).catch(reportError => {
        return checkStatus(reportError.response);
    });
}

export const createCalculation = async (calculation) => {
    const token = getToken();
    return await instance.post("/api/calculations/create", calculation, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    }).then(response => {
        console.log(response.data);
        return response.data;
    }).catch(reportError => {
        return checkStatus(reportError.response);
    });
}

export const createElementFrame = async (element) => {
    const token = getToken();
    return await instance.post("/api/calculations/frame/create", element, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    }).then(response => {
        console.log(response.data);
        return response.data;
    }).catch(reportError => {
        return checkStatus(reportError.response);
    });
}

export const postCalculationData = async (floorData) => {
    const token = getToken();
    return await instance.post("/api/calculations/floordata/create", floorData, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    }).then(response => {
        console.log(response.data);
        return response.data;
    }).catch(reportError => {
        return checkStatus(reportError.response);
    });
}

export const getFloors = async (idcalculation) => {
    const token = getToken();
    return  await instance.get('/api/calculations/floors/' + idcalculation, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    }).then(response => {
        console.log(response.data);
        return response.data;
    }).catch(reportError => {
        return checkStatus(reportError.response);
    });
}

export const getBasement = async (idcalculation) => {
    const token = getToken();
    return  await instance.get('/api/calculations/basements/' + idcalculation, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    }).then(response => {
        console.log(response.data);
        return response.data;
    }).catch(reportError => {
        return checkStatus(reportError.response);
    });
}

export const getBasementData = async (idcalculation) => {
    const token = getToken();
    return  await instance.get('/api/calculations/basements/' + idcalculation, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    }).then(response => {
        console.log(response.data);
        return response.data;
    }).catch(reportError => {
        return checkStatus(reportError.response);
    });
}

export const getPrice = async () => {
    const token = getToken();
    return  await instance.get('/api/priceLists/all', {
        headers: {
            Authorization: `Bearer ${token}`
        },
    }).then(response => {
        console.log(response.data);
        return response.data;
    }).catch(reportError => {
        return checkStatus(reportError.response);
    });
}

export const copyCalculation = async (id) => {
    const token = getToken();
    return  await instance.get('/api/calculations/copy/' + id, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    }).then(response => {
        console.log(response.data);
        return response.data;
    }).catch(reportError => {
        return checkStatus(reportError.response);
    });
}

export const deleteCalculation = async (id) => {
    const token = getToken();
    return  await instance.delete('/api/calculations/delete/' + id, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    }).then(response => {
        console.log(response.data);
    }).catch(reportError => {
        return reportError.response.status;
    });
}
