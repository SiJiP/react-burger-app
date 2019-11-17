import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-app-f681b.firebaseio.com/'
})

export default instance;