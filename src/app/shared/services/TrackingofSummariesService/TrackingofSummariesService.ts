import { Injectable, OnInit, NgZone } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from '../../services/cookie.service'
import { HttpClient } from '@angular/common/http';
import { Config } from 'src/app/Core/helpers/config.helper';
import { ParameterDTO } from 'src/app/AdminWing/ParameterDTO';
import { PaginationDTO } from 'src/app/AdminWing/PaginationDTO';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class TrackingofSummariesService  {

    constructor(
        public toster: ToastrService,
        private cookieService: CookieService, private http: HttpClient) {

    }

   

    // getTOSANData(parameterDTO: ParameterDTO) {

    //     return this.http.post<any>(Config.getControllerUrl('DHIS', 'GetDHISData'), parameterDTO)

    // }
    //  public getTOSANData(patientId: number): Observable<any> {
    //      return this.http
    //        .get<any>(`http://172.16.19.243:99/api/Public/GetApplicationLogs/${patientId}`);
    //    }
      public getTOSANDataList(): Observable<any> {
          debugger
        return this.http
          .post<any>('http://172.16.19.243:99/api/Public/GetSummaries',{title:'angular post request example'});
      }

      
}