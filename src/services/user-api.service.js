import axios from "axios";
import { USER_API_CONFIG, USER_API_TOKEN } from "@/configs";

export class UserApiService {
    constructor() {
        this.http = axios.create({
            baseURL: USER_API_CONFIG,
            headers: { "API-KEY": USER_API_TOKEN },
        });

        // ส่ง request
        this.http.interceptors.request.use(
            (config) => {
                const token = localStorage.getItem("token");
                const headers = {
                    Authorization: `Bearer ${token}`,
                    "API-KEY": USER_API_TOKEN,
                };

                config.headers = headers;

                return config;
            },
            (error) => Promise.reject(error)
        );
        // this.http.interceptors.response
    }
    async login(data) {
        return this.http.post("/login", data);
    }

    async register(data) {
        return this.http.post("/register", data);
    }

    async getAddresses({ keyword, page, limit } = {}) {
        return this.http.get("/useraddress/list", {
            params: { keyword, page, limit },
        });
    }
    async getUserProfile() {
        return this.http.get("/user/profile");
    }
    // async updateUserProfile(form){
    //     return this.http.put("/user",form)
    // }
    async createAddresses(payload) {
        return this.http.post("/useraddress", payload);
    }
    async updateAddress(payload){
        return this.http.put("/useraddress",payload)
    }
    async deleteAddress(id) {
        return this.http.delete(`/useraddress/${id}`, id);
    }
}
