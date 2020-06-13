import { NuxtAxiosInstance } from "@nuxtjs/axios";
import { AxiosResponse, AxiosError } from "axios";
import _ from "lodash";
import { MyResponse, ICommonAPI } from "./index";
export function isRequestSucceed(res: AxiosResponse) {
	return _.get(res, "status") == 201 || _.get(res, "status") == 200;
}
export default class CommonAPI implements ICommonAPI {
	protected prefix: string;
	constructor(prefix: string) {
		this.prefix = prefix;
	}
	public async findAllAPI(
		axios: NuxtAxiosInstance,
		pageSize?: number,
        page?: number,
        where?: string,
        needTotal?:boolean
	): Promise<MyResponse> {
		let error = false;
		let res = await axios
			.get(`${this.prefix}`, {
				params: {
					pageSize: pageSize,
                    page: page,
                    where: where,
                    needTotal:needTotal
				},
			})
		return generateResponse(res as AxiosResponse);
	}
	public async findOneAPI(
		axios: NuxtAxiosInstance,
		id: string
	): Promise<MyResponse> {
		let error = false;
		let res = await axios
			.get(`${this.prefix}/${id}`)
		return generateResponse(res as AxiosResponse);
	}
}
export function generateResponse(res: AxiosResponse): MyResponse {
    let myResponse = new MyResponse();
    myResponse.success = isRequestSucceed(res)
    myResponse.data = res.data;
    return myResponse;
}