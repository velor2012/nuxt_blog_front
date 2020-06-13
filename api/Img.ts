import CommonAPI, { generateResponse } from './common';
import { NuxtAxiosInstance } from '@nuxtjs/axios';
import { MyResponse } from '.';
import { AxiosResponse } from 'axios'
import { extendImgType } from '~/types/uploadImg';
export class ImgAPI {
    protected prefix: string;
    public uploadUrl:string
    constructor() {
        this.prefix = '/imgs';
        this.uploadUrl = this.prefix
    }
    public async getAll(
        axios: NuxtAxiosInstance,
        type: extendImgType,
        pageSize?: number,
		page?: number
	): Promise<MyResponse> {
		let error = false;
		let res = await axios
            .get(`${this.prefix}`, {
                params: {
                    where: {
                        type:type
                    },
                    pageSize: pageSize,
					page: page,
                }
            })
		return generateResponse(res as AxiosResponse);
    }

    public async getTotalNumberAPI(
		axios: NuxtAxiosInstance,
	): Promise<MyResponse> {
		let error = false;
		let res = await axios
			.get(`${this.prefix}/total`)
		return generateResponse(res as AxiosResponse);
    }
}
const MyImgAPI = new ImgAPI()
export default MyImgAPI