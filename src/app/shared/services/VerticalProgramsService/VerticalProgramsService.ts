import { Injectable, OnInit, NgZone } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from '../../services/cookie.service'
import { HttpClient } from '@angular/common/http';
import { Config } from 'src/app/Core/helpers/config.helper';
import { ParameterDTO } from 'src/app/AdminWing/ParameterDTO';

@Injectable({
    providedIn: 'root'
})

export class VerticalProgramsService implements OnInit {

    constructor(
        public toster: ToastrService,
        private cookieService: CookieService, private http: HttpClient) {

    }

    ngOnInit(): void { }

    getHepatitisCountList() {

        return this.http.get<any>(Config.getControllerUrl('AdminWing', 'GetHepatitasPatientCounts'))

    }

    getDRSDailyPatientCountList() {

        return this.http.get<any>(Config.getControllerUrl('AdminWing', 'GetDRSDailyPatientCount'))

    }

    getDRSDailyLabCountList() {

        return this.http.get<any>(Config.getControllerUrl('AdminWing', 'GetDRSDailyLabCount'))

    }

    getIrmnchPatients(parameterDTO: ParameterDTO) {

        return this.http.post<any>(Config.getControllerUrl('AdminWing', 'GetIRMNCHPatientsDistrictWise'), parameterDTO)

    }

    getLHSReport(parameterDTO: ParameterDTO) {

        return this.http.post<any>(Config.getControllerUrl('AdminWing', 'GetLHSReportingDistWise'), parameterDTO)

    }

    getIrmnchDsr(parameterDTO: ParameterDTO) {

        return this.http.post<any>(Config.getControllerUrl('AdminWing', 'GetIrmnchEmrDsr'), parameterDTO)

    }


    getNcdDailyReportList() {

        return this.http.get<any>(Config.getControllerUrl('AdminWing', 'GetNCDDailyReport'))


    }



}
