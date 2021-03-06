import CommonAPI, { generateResponse } from './common';
import { NuxtAxiosInstance } from '@nuxtjs/axios';
import {AxiosResponse} from 'axios'
import { MyResponse } from '.';
import { ArticleSearchReturn } from '~/types/Search';
import { NoteSearchReturn } from '../types/Search';
export class NoteAPI extends CommonAPI  {
    constructor() {
        super('/notes');
    }
    public async searchNoteAPI(
        axios: NuxtAxiosInstance,
        keyword: string,
		pageSize: number,
		page: number
	): Promise<MyResponse<NoteSearchReturn>> {
		let res = await axios
            .get(`${this.prefix}/searchNote`, {
                params: {
                    keyword:keyword,
                    page: page,
                    pageSize:pageSize
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
    public async group(
        axios: NuxtAxiosInstance,
        ): Promise<MyResponse> {
            let res = await axios
                .get(`${this.prefix}/group`)
            return generateResponse(res as AxiosResponse);
        }
}
const MyNoteAPI = new NoteAPI()
export default MyNoteAPI