import { Injectable, OnInit, NgZone } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from '../../services/cookie.service'
import { HttpClient } from '@angular/common/http';
import { Config } from 'src/app/Core/helpers/config.helper';
import { ParameterDTO } from 'src/app/AdminWing/ParameterDTO';
import { PaginationDTO } from 'src/app/AdminWing/PaginationDTO';

@Injectable({
    providedIn: 'root'
})

export class DHISService implements OnInit {

    constructor(
        public toster: ToastrService,
        private cookieService: CookieService, private http: HttpClient) {

    }

    ngOnInit(): void { }

    getDHISData(parameterDTO: ParameterDTO) {

        return this.http.post<any>(Config.getControllerUrl('DHIS', 'GetDHISData'), parameterDTO)

    }
}