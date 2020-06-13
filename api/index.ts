import { NuxtAxiosInstance } from '@nuxtjs/axios'
export class MyResponse<T = any> { 
    success: boolean = true
    data: T
    constructor() { 
        this.success = true
    }
}
export interface ICommonAPI { 
    findAllAPI(axios: NuxtAxiosInstance, pageSize: number, page: number): Promise<MyResponse>
    findOneAPI(axios:NuxtAxiosInstance,id:string): Promise<MyResponse>
}
