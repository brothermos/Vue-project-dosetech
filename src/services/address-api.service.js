import axios from "axios";
import { ADDRESS_API_CONFIG, } from "@/configs";

export class AddressApiService {
    constructor() {
        this.http = axios.create({ baseURL: ADDRESS_API_CONFIG });
    }

    async getProvinces() {
        return this.http.get("/thailand/provinces");
    }
}
