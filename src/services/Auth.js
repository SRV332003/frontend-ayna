import { API_BASE_URL } from './client';

const loginApi = async (jsonData) => {

    return await fetch(API_BASE_URL+'/api/auth/local', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        return data;
    })
    .catch((error) => {
        console.error('Error:', error);
        return error.data;
    });

}

const register = async (jsonData) => {

    return await fetch(API_BASE_URL+'/api/auth/local/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        return data;
    })
    .catch((error) => {
        console.error('Error:', error);
        return error.data;
    });

}

const forget_pass = async(jsonData)=>{
    return await fetch(API_BASE_URL+'/user/password-reset/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        return data;
    })
    .catch((error) => {
        console.error('Error:', error);
        return error.data;
    });
}

const forget_pass_confirm = async(jsonData)=>{
    return await fetch(API_BASE_URL+'/user/password-reset/confirm/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        return data;
    })
    .catch((error) => {
        console.error('Error:', error);
        return error.data;
    });
}


export { loginApi, register, forget_pass, forget_pass_confirm };