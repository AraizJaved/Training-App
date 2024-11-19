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

export class AdminWingService implements OnInit {

    constructor(
        public toster: ToastrService,
        private cookieService: CookieService, private http: HttpClient) {

    }

    ngOnInit(): void { }

    getPendancy(parameterDTO: ParameterDTO) {

        return this.http.post<any>(Config.getControllerUrl('AdminWing', 'GetPendency'), parameterDTO)

    }

    getVP(id: number) {
        return this.http
            .post<any>(Config.getControllerUrl('AdminWing', `GetVP/${id}`), null)
    }

    getVPByHF(id: number) {
        return this.http
            .post<any>(Config.getControllerUrl('AdminWing', `GetVPByHF/${id}`), null)
    }
    getEmployeesOnLeaveSum() {
        return this.http
            .get<any>(Config.getControllerUrl('AdminWing', 'GetEmpOnLeaveSum'))
    }

    getAwaitingPostingSum() {
        return this.http
            .get<any>(Config.getControllerUrl('AdminWing', 'AwaitingPostingSum'))
    }

    getLeavesExpired() {
        return this.http
            .get<any>(Config.getControllerUrl('AdminWing', 'GetEmpLeaveExpSum'))
    }

    getEmployees(paginationDTO: any) {

        return this.http.post<any>(Config.getControllerUrl('AdminWing', 'GetEmployeesOnLeave'), paginationDTO)

    }

    getAwaitingPosting(paginationDTO: any) {

        return this.http.post<any>(Config.getControllerUrl('AdminWing', 'GetAwaitingPostingApps'), paginationDTO)

    }
    getLeavesExpiredDetails(paginationDTO: any) {

        return this.http.post<any>(Config.getControllerUrl('AdminWing', 'GetEmployeesLeaveExpired'), paginationDTO)

    }


    getCrrSummary(parameterDTO: ParameterDTO) {

        return this.http.post<any>(Config.getControllerUrl('AdminWing', 'GetCrrSummary'), parameterDTO)

    }

    vpSummaryList() {

        return this.http.get<any>(Config.getControllerUrl('AdminWing', 'VPReport'))

    }

    GetNotesAndSummeries() {
        return this.http
            .get<any>(Config.getControllerUrl('AdminWing', 'GetSummries'))
    }
    GetNotesAndSummeriesDetail(id : any) {
        return this.http
            .get<any>(Config.getControllerUrl('AdminWing', `GetSummriesDetail/${id}`))
    }
    GetNotesAndSummeriesAttachment(id : any) {
        return this.http
            .get<any>(Config.getControllerUrl('AdminWing', `GetSummriesAttachment/${id}`))
    }
}
