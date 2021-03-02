import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";
import { UserData } from "../app/providers/user-data";
import { API_CONFIG } from "../config/api.config";
import { CredentialsDTO } from "../models/credentials.dto";
import { LocalUser } from "../models/local_user";


@Injectable()
export class AuthService {

    jwtHelper: JwtHelperService = new JwtHelperService();

    constructor(
        public http: HttpClient,
        public userData: UserData){}

    authenticate(creds : CredentialsDTO){
        return this.http.post(
            `${API_CONFIG.baseUrl}/login`,
            creds,
            {
                observe: 'response',
                responseType: 'text'
            });
    }

    successfulLogin(authorizationValue : string){
        let token = authorizationValue.substring(7);
        let user : LocalUser = {
            token: token,
            email: this.jwtHelper.decodeToken(token).sub
        };
        this.userData.setLocalUser(user);
    }

    logout() {
        this.userData.setLocalUser(null);
    }
}