import Axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

export class Http {
    instance: AxiosInstance

    constructor(baseURL: string) {
        this.instance = Axios.create({
            baseURL
        })
    }
    // read
    get<R = unknown>(url: string, query?: Record<string, string>, config?: AxiosRequestConfig){
        return this.instance.request<R>({
            ...config,
            url,
            params: query,
            method: 'get'
        })
    }
    // create
    post<R = unknown>(url: string, data?: Record<string, any>, config?: AxiosRequestConfig){
        return this.instance.request<R>({
            ...config,
            url,
            data,
            method: 'post'
        })
    }
}

export const http = new Http('/api/v1');