import { NuxtAxiosInstance } from '@nuxtjs/axios';
import { AxiosResponse, AxiosError } from 'axios'
import CommonAPI, { generateResponse } from './common';
import { MyResponse } from './index';
export class UserAPI extends CommonAPI  {
    // protected prefix = '/categories'
    constructor() {
        super('/users');
    }
}
const MyUserAPI = new UserAPI()
export default MyUserAPI