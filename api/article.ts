import CommonAPI, { generateResponse } from './common';
import { NuxtAxiosInstance } from '@nuxtjs/axios';
import {AxiosResponse} from 'axios'
import { MyResponse } from '.';
import { ArticleSearchReturn } from '~/types/Search';
export class ArticleAPI extends CommonAPI  {
    // protected prefix = '/categories'
    imgUploadURL: string;
    constructor() {
        super('/articles');
        this.imgUploadURL = `${this.prefix}/img`
    }
    public async getTotalNumberAPI(
		axios: NuxtAxiosInstance,
	): Promise<MyResponse> {
		let error = false;
		let res = await axios
			.get(`${this.prefix}/total`)
		return generateResponse(res as AxiosResponse);
    }
    public async searchAPI(
        axios: NuxtAxiosInstance,
        keyword: string,
		pageSize: number,
		page: number
	): Promise<MyResponse<ArticleSearchReturn>> {
		let error = false;
		let res = await axios
            .get(`${this.prefix}/search`, {
                params: {
                    keyword:keyword,
                    page: page,
                    pageSize:pageSize
                }
            })
		return generateResponse(res as AxiosResponse);
    }
    public async group(
        axios: NuxtAxiosInstance,
        ): Promise<MyResponse> {
            let res = await axios
                .get(`${this.prefix}/group`)
            return generateResponse(res as AxiosResponse);
        }
}
const MyArticleAPI = new ArticleAPI()
export default MyArticleAPI