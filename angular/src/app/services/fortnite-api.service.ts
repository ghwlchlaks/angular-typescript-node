import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { IReturnStats } from '../home/types/t_userStats';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FortniteApiService {

  constructor(private http: Http) { }

  getData(name: string, platform: string): Observable<IReturnStats> {
    console.log(environment.server_name);
    return this.http.get( environment.server_name + `/api/fortnite/status?userId=${name}&platform=${platform}`)
    .map((data: Response) => data.json());
  }
}
