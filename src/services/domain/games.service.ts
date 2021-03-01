import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { API_CONFIG } from "../../config/api.config";
import { GamesDTO } from "../../models/games.dto";

@Injectable()
export class GamesService {

    constructor(public http: HttpClient){
    }

    findAll() : Observable<GamesDTO[]> {
        return this.http.get<GamesDTO[]>(`${API_CONFIG.baseUrl}/games`);
    }
}