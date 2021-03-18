import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { API_CONFIG } from "../../config/api.config";
import { ClientDTO } from "../../models/client.dto";
import { StorageService } from "../storage.service";

@Injectable()
export class ClientService {

    constructor(public http: HttpClient, public storage: StorageService){
    }

    findByEmail(email: string) : Observable<ClientDTO> {
        return this.http.get<ClientDTO>(`${API_CONFIG.baseUrl}/clients/email?value=${email}`);
    }

    findEmail(email: string) : Observable<Boolean> {
        return this.http.get<Boolean>(`${API_CONFIG.baseUrl}/clients/validate/email?value=${email}`);
    }

    getImageFromBucket(id : string) : Observable<any> {
        return this.http.get(`${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`, {responseType : 'blob'});
    }

    insert(obj : ClientDTO){
        return this.http.post(
            `${API_CONFIG.baseUrl}/clients`,
            obj,
            {
                observe: 'response',
                responseType: 'text'
            }
        );
    }

    update(obj : ClientDTO){
        let url = API_CONFIG.baseUrl + '/clients/' + obj.id;
        return this.http.put(url, obj).toPromise();
    }

    inactivate(obj : ClientDTO){
        let url = API_CONFIG.baseUrl + '/clients/inactivate/' + obj.id;
        return this.http.put(url, obj).toPromise();
    }
}