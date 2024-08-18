

const API_BASE_URL = 'http://localhost:1337';

const refreshToken = async () => {
    return await fetch(API_BASE_URL+'/user/token/refresh', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('refreshToken')
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        localStorage.setItem('token', data.token);
        localStorage.setItem('refreshToken', data.refreshToken);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}


export { API_BASE_URL,refreshToken };