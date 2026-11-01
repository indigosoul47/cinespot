import axios from 'axios';

axios.defaults.baseURL = 'http://ec2-18-218-49-253.us-east-2.compute.amazonaws.com';
// axios.defaults.withCredentials = true;

let refresh = false;

axios.interceptors.response.use(response => response, async error => {
    if(error.response.status === 401 && !refresh){
        refresh = true;
        const resp = await axios.post('/api/users/refresh', {});

        if(resp.status === 200){
            return axios(error.config);
        }else{
            localStorage.setItem('LOGOUT', true);
        }
    }

    refresh = false;
    return error;
});