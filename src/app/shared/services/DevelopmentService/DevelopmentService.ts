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

export class DevelopmentService implements OnInit {

    constructor(
        public toster: ToastrService,
        private cookieService: CookieService, private http: HttpClient) {

    }

    ngOnInit(): void { }

    getProcurementList() {

        return this.http.get<any>(Config.getControllerUrl('AdminWing', 'GetProcurementCountByType'))

    }

    getDistrictCountListList() {

        return this.http.get<any>(Config.getControllerUrl('AdminWing', 'GetDistrictWiseProcurementCount'))

    }

    getHealthCouncilList() {

        return this.http.get<any>(Config.getControllerUrl('AdminWing', 'GetHCReport'))

    }

    getSummaries() {

        return this.http.get<any>(Config.getControllerUrl('ResourceCenter', 'GetSummaries'))

    }

    getFSSummaries() {

        return this.http.get<any>(Config.getControllerUrl('ResourceCenter', 'GetFlagshipSummaries'))

    }

    getCMSummaries() {

        return this.http.get<any>(Config.getControllerUrl('ResourceCenter', 'GetSummariesofchiefminister'))

    }

    getProcurementDetails(procurementDetailDTO: any) {

        return this.http.post<any>(Config.getControllerUrl('AdminWing', 'GetProcurementDetails'), procurementDetailDTO)

    }


    getCDSLDataList() {

        return this.http.post<any>(Config.getControllerUrl('AdminWing', 'GetDSRReport'), '')

    }
    getDataList

    getAdpCounts() {

        return this.http.get<any>(Config.getControllerUrl('AdminWing', 'GetAdpSchemesCount'))

    }

    getAdpDetails(Scheme_Type: any) {
        debugger
        return this.http.get<any>(Config.getControllerUrl('AdminWing', `GetAdpSchemes/${Scheme_Type}`))

    }


}
