import { Injectable, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from '../../services/cookie.service'
import { HttpClient } from '@angular/common/http';
import { Config } from 'src/app/Core/helpers/config.helper';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FilterDTO } from "../../../DetailedDashboard/filterDto";

@Injectable({
  providedIn: 'root'
})
export class DashboardService implements OnInit {

  public userData: any;
  public user: firebase.User;
  public showLoader: boolean = false;

  constructor(public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone,
    public toster: ToastrService,
    private http: HttpClient) {

  }


  ngOnInit(): void {
  }

  public getCompaign(): Observable<any> {


    return this.http.get(`${Config.getControllerUrl("Common", `GetCampaings`)}`)
      .pipe(map((data: any) => data))
      .pipe(
        map(
          (data: any) =>
          ({
            result: data.data,

          } as any)
        )
      )
      .pipe((data: any) => data);
  }

  public getDetailsCategoryWise(code, day): Observable<any> {

    //return this.http.get(`${Config.getControllerUrl("Dashboard", `GetFormFilledCategoryWiseCount?Code=${code}`)}`)
    return this.http.get<any>(Config.getControllerUrl('Dashboard', `GetFormFilledCategoryWiseCount/${code}/${day}`))
      .pipe(map((data: any) => data))
      .pipe(
        map(
          (data: any) =>
          ({

            result: data.data,

          } as any)
        )
      )
      .pipe((data: any) => data);

  }

  public getDetailsDesignationWise(code, day): Observable<any> {

    //return this.http.get(`${Config.getControllerUrl("Dashboard", `GetFormFilledDesignationWise?Code=${code}`)}`)
    return this.http.get<any>(Config.getControllerUrl('Dashboard', `GetFormFilledDesignationWise/${code}/${day}`))
      .pipe(map((data: any) => data))
      .pipe(
        map(
          (data: any) =>
          ({

            result: data.data,

          } as any)
        )
      )
      .pipe((data: any) => data);

  }


  public getDesignationOrganizationWise(Id): Observable<any> {

    return this.http.get(`${Config.getControllerUrl("Common", `GetFilterDesignation?Organization=${Id}`)}`)

      .pipe(map((data: any) => data))
      .pipe(
        map(
          (data: any) =>
          ({

            result: data.data,

          } as any)
        )
      )
      .pipe((data: any) => data);

  }

  public getRegisterCompliance(filterDTO: FilterDTO = new FilterDTO()): Observable<any> {

    return this.http
      .post<any>(Config.getControllerUrl('Dashboard', 'RegistrationCompaliance'), filterDTO)
  }

  public getRegistrationOrganizationWise(filterDTO: FilterDTO): Observable<any> {

    return this.http
      .post<any>(Config.getControllerUrl('Dashboard', 'Organizationwiseregistration'), filterDTO)
  }

  public getAdministrativeRegistration(filterDTO: FilterDTO): Observable<any> {

    return this.http
      .post<any>(Config.getControllerUrl('Dashboard', 'AdministrativeComplaince'), filterDTO)
  }

  public getFixedSiteMonitoringTotalFormFilled(filterDTO: FilterDTO): Observable<any> {

    return this.http
      .post<any>(Config.getControllerUrl('Dashboard', 'FixedSiteMonitoringTotalFormFilled'), filterDTO)
  }

  public getFixedSiteMonitoringTotalFormFilledDesigantionWise(filterDTO: FilterDTO): Observable<any> {

    return this.http
      .post<any>(Config.getControllerUrl('Dashboard', 'FixedSiteMonitoringTotalFormFilledDesigantionWise'), filterDTO)
  }

  public getFixedSiteMonitoringFunctionalSIAFixedSite(filterDTO: FilterDTO): Observable<any> {

    return this.http
      .post<any>(Config.getControllerUrl('Dashboard', 'FixedSiteMonitoringFunctionalSIAFixedSite'), filterDTO)
  }

  public getSuperVisorTrainedUnTrainedStaff(filterDTO: FilterDTO): Observable<any> {

    return this.http
      .post<any>(Config.getControllerUrl('Dashboard', 'SuperVisorTrainedUnTrainedStaff'), filterDTO)
  }

  public getUCMOAICHHCluster(filterDTO: FilterDTO): Observable<any> {

    return this.http
      .post<any>(Config.getControllerUrl('Dashboard', 'UCMOAICHHCluster'), filterDTO)
  }

  public getUCMOAICSupervisorCluster(filterDTO: FilterDTO): Observable<any> {

    return this.http
      .post<any>(Config.getControllerUrl('Dashboard', 'UCMOAICSupervisorCluster'), filterDTO)
  }

  public getMobileTeamMonitoringNeapComposition(filterDTO: FilterDTO): Observable<any> {

    return this.http
      .post<any>(Config.getControllerUrl('Dashboard', 'MobileTeamMonitoringNeapComposition'), filterDTO)
  }

  public getMobileTeamMonitoringTrainedUnTrainedStaff(filterDTO: FilterDTO): Observable<any> {

    return this.http
      .post<any>(Config.getControllerUrl('Dashboard', 'MobileTeamMonitoringTrainedUnTrainedStaff'), filterDTO)
  }

  public getMobileTeamMonitoringVaccineCondition(filterDTO: FilterDTO): Observable<any> {

    return this.http
      .post<any>(Config.getControllerUrl('Dashboard', 'MobileTeamMonitoringVaccineCondition'), filterDTO)
  }

  public getTransitTeamMonitoringNeapComposition(filterDTO: FilterDTO): Observable<any> {

    return this.http
      .post<any>(Config.getControllerUrl('Dashboard', 'TransitTeamMonitoringNeapComposition'), filterDTO)
  }

  public getTransitTeamMonitoringLogisticsForEachMember(filterDTO: FilterDTO): Observable<any> {

    return this.http
      .post<any>(Config.getControllerUrl('Dashboard', 'TransitTeamMonitoringLogisticsForEachMember'), filterDTO)
  }

  public getTransitTeamMonitoringVaccineCondition(filterDTO: FilterDTO): Observable<any> {

    return this.http
      .post<any>(Config.getControllerUrl('Dashboard', 'TransitTeamMonitoringVaccineCondition'), filterDTO)
  }

  public getTransitTeamMonitoringLEAsSupport(filterDTO: FilterDTO): Observable<any> {

    return this.http
      .post<any>(Config.getControllerUrl('Dashboard', 'TransitTeamMonitoringLEAsSupport'), filterDTO)
  }

  public getHouseHoldClusterVaccinatedandUnVaccinatedAgeWise(filterDTO: FilterDTO): Observable<any> {

    return this.http
      .post<any>(Config.getControllerUrl('Dashboard', 'HouseHoldClusterVaccinatedandUnVaccinatedAgeWise'), filterDTO)
  }

  public getHouseHoldClusterPopulationType(filterDTO: FilterDTO): Observable<any> {

    return this.http
      .post<any>(Config.getControllerUrl('Dashboard', 'HouseHoldClusterPopulationType'), filterDTO)
  }

  public getHouseHoldClusterZeroDoseEIChildren(filterDTO: FilterDTO): Observable<any> {

    return this.http
      .post<any>(Config.getControllerUrl('Dashboard', 'HouseHoldClusterZeroDoseEIChildren'), filterDTO)
  }

  public getHouseHoldClusterreasonformissed(filterDTO: FilterDTO): Observable<any> {

    return this.http
      .post<any>(Config.getControllerUrl('Dashboard', 'HouseHoldClusterreasonformissed'), filterDTO)
  }

  public getFixedSiteMonitoringNeap(filterDTO: FilterDTO): Observable<any> {

    return this.http
      .post<any>(Config.getControllerUrl('Dashboard', 'FixedSiteMonitoringNeap'), filterDTO)
  }

  public getFSMFixedSiteMonitoringFunctionalSIAFixedSite(filterDTO: FilterDTO): Observable<any> {

    return this.http
      .post<any>(Config.getControllerUrl('Dashboard', 'FixedSiteMonitoringFunctionalSIAFixedSite'), filterDTO)
  }

  public getFSMFixedSiteMonitoringTemperatureCondition(filterDTO: FilterDTO): Observable<any> {

    return this.http
      .post<any>(Config.getControllerUrl('Dashboard', 'FixedSiteMonitoringTemperatureCondition'), filterDTO)
  }

  public getFSMFixedSiteMonitoringVaccineCondition(filterDTO: FilterDTO): Observable<any> {

    return this.http
      .post<any>(Config.getControllerUrl('Dashboard', 'FixedSiteMonitoringVaccineCondition'), filterDTO)
  }

  public getFSMFixedSiteMonitoringEssentialImmunizationduringSIA(filterDTO: FilterDTO): Observable<any> {

    return this.http
      .post<any>(Config.getControllerUrl('Dashboard', 'FixedSiteMonitoringEssentialImmunizationduringSIA'), filterDTO)
  }

  public getFSMFixedSiteMonitoringZeroDoseReferral(filterDTO: FilterDTO): Observable<any> {

    return this.http
      .post<any>(Config.getControllerUrl('Dashboard', 'FixedSiteMonitoringZeroDoseReferral'), filterDTO)
  }

  public getFSMFixedSiteMonitoringAFPCaseDefinition(filterDTO: FilterDTO): Observable<any> {

    return this.http
      .post<any>(Config.getControllerUrl('Dashboard', 'FixedSiteMonitoringAFPCaseDefinition'), filterDTO)
  }

  public getSMSuperVisorNecessaryitems(filterDTO: FilterDTO): Observable<any> {

    return this.http
      .post<any>(Config.getControllerUrl('Dashboard', 'SuperVisorNecessaryitems'), filterDTO)
  }

  public getSMSuperVisorTeamMonitornigchecklist(filterDTO: FilterDTO): Observable<any> {

    return this.http
      .post<any>(Config.getControllerUrl('Dashboard', 'SuperVisorTeamMonitornigchecklist'), filterDTO)
  }

  public getSMSuperVisorHRMPVisits(filterDTO: FilterDTO): Observable<any> {

    return this.http
      .post<any>(Config.getControllerUrl('Dashboard', 'SuperVisorHRMPVisits'), filterDTO)
  }

  public getSMSuperVisorHHClustertaken(filterDTO: FilterDTO): Observable<any> {

    return this.http
      .post<any>(Config.getControllerUrl('Dashboard', 'SuperVisorHHClustertaken'), filterDTO)
  }

  public getMTMMobileTeamMonitoringDataRecording(filterDTO: FilterDTO): Observable<any> {

    return this.http
      .post<any>(Config.getControllerUrl('Dashboard', 'MobileTeamMonitoringDataRecording'), filterDTO)
  }

  public getMTMMobileTeamMonitoringRouteMaps(filterDTO: FilterDTO): Observable<any> {

    return this.http
      .post<any>(Config.getControllerUrl('Dashboard', 'MobileTeamMonitoringRouteMaps'), filterDTO)
  }

  public getMTMMobileTeamMonitoringIPCquestions(filterDTO: FilterDTO): Observable<any> {

    return this.http
      .post<any>(Config.getControllerUrl('Dashboard', 'MobileTeamMonitoringIPCquestions'), filterDTO)
  }

  public getMTMMobileTeamMonitoringZeroDoserecording(filterDTO: FilterDTO): Observable<any> {

    return this.http
      .post<any>(Config.getControllerUrl('Dashboard', 'MobileTeamMonitoringZeroDoserecording'), filterDTO)
  }

  public getTTMTransitTeamMonitoringCNIC(filterDTO: FilterDTO): Observable<any> {

    return this.http
      .post<any>(Config.getControllerUrl('Dashboard', 'TransitTeamMonitoringCNIC'), filterDTO)
  }

  public getHHCHouseHoldClusterGuestChildrenVaccination(filterDTO: FilterDTO): Observable<any> {

    return this.http
      .post<any>(Config.getControllerUrl('Dashboard', 'HouseHoldClusterGuestChildrenVaccination'), filterDTO)
  }

  public getHHCHouseHoldClusterFingermarkingstatus(filterDTO: FilterDTO): Observable<any> {

    return this.http
      .post<any>(Config.getControllerUrl('Dashboard', 'HouseHoldClusterFingermarkingstatus'), filterDTO)
  }

  public getHHCHouseHoldClusterEIVaccinationlessthantwoyears(filterDTO: FilterDTO): Observable<any> {

    return this.http
      .post<any>(Config.getControllerUrl('Dashboard', 'HouseHoldClusterEIVaccinationlessthantwoyears'), filterDTO)
  }

  public getFixedSiteUCMOAICComplaince(filterDTO: FilterDTO): Observable<any> {

    return this.http
      .post<any>(Config.getControllerUrl('Dashboard', 'FixedSiteUCMOAICComplaince'), filterDTO)
  }

  public getFixedSiteOrganizationComplaince(filterDTO: FilterDTO): Observable<any> {

    return this.http
      .post<any>(Config.getControllerUrl('Dashboard', 'FixedSiteOrganizationComplaince'), filterDTO)
  }

  public getSupervisormonitoringUCMOandAICComplaince(filterDTO: FilterDTO): Observable<any> {

    return this.http
      .post<any>(Config.getControllerUrl('Dashboard', 'SupervisormonitoringUCMOandAICComplaince'), filterDTO)
  }

  public getSupervisormonitoringOrganizationComplaince(filterDTO: FilterDTO): Observable<any> {

    return this.http
      .post<any>(Config.getControllerUrl('Dashboard', 'SupervisormonitoringOrganizationComplaince'), filterDTO)
  }

  public getTeammonitoringUCMOandAICComplaince(filterDTO: FilterDTO): Observable<any> {

    return this.http
      .post<any>(Config.getControllerUrl('Dashboard', 'TeammonitoringUCMOandAICComplaince'), filterDTO)
  }

  public getTeammonitoringOrganizationComplaince(filterDTO: FilterDTO): Observable<any> {

    return this.http
      .post<any>(Config.getControllerUrl('Dashboard', 'TeammonitoringOrganizationComplaince'), filterDTO)
  }

  public getMobileTeamMonitoringUCMOandAICCompliance(filterDTO: FilterDTO): Observable<any> {

    return this.http
      .post<any>(Config.getControllerUrl('Dashboard', 'MobileTeamMonitoringUCMOandAICCompliance'), filterDTO)
  }

  public getMobileTeamOrganizationCompliance(filterDTO: FilterDTO): Observable<any> {

    return this.http
      .post<any>(Config.getControllerUrl('Dashboard', 'MobileTeamOrganizationCompliance'), filterDTO)
  }

  public getHouseHoldMonitoringUCMOandAICCompliance(filterDTO: FilterDTO): Observable<any> {

    return this.http
      .post<any>(Config.getControllerUrl('Dashboard', 'HouseHoldMonitoringUCMOandAICCompliance'), filterDTO)
  }

  public getHouseHoldOrganizationCompliance(filterDTO: FilterDTO): Observable<any> {

    return this.http
      .post<any>(Config.getControllerUrl('Dashboard', 'HouseHoldOrganizationCompliance'), filterDTO)
  }

  public getRegistrationComplianceProvincelevel(filterDTO: FilterDTO): Observable<any> {

    return this.http
      .post<any>(Config.getControllerUrl('Dashboard', 'RegistrationComplianceProvincelevel'), filterDTO)
  }

  public getRegistrationComplianceDivisionlevel(filterDTO: FilterDTO): Observable<any> {

    return this.http
      .post<any>(Config.getControllerUrl('Dashboard', 'RegistrationComplianceDivisionlevel'), filterDTO)
  }

  public getRegistrationComplianceDistrictlevel(filterDTO: FilterDTO): Observable<any> {

    return this.http
      .post<any>(Config.getControllerUrl('Dashboard', 'RegistrationComplianceDistrictlevel'), filterDTO)
  }

  public getRegistrationComplianceTehsillevel(filterDTO: FilterDTO): Observable<any> {

    return this.http
      .post<any>(Config.getControllerUrl('Dashboard', 'RegistrationComplianceTehsillevel'), filterDTO)
  }

  public getRegistrationComplianceUClevel(filterDTO: FilterDTO): Observable<any> {

    return this.http
      .post<any>(Config.getControllerUrl('Dashboard', 'RegistrationComplianceUClevel'), filterDTO)
  }

  public getCatchUpHouseHoldClusterPopulationType(filterDTO: FilterDTO): Observable<any> {

    return this.http
      .post<any>(Config.getControllerUrl('Dashboard', 'CatchUpHouseHoldClusterPopulationType'), filterDTO)
  }

  public getCatchupHouseHoldChecked(filterDTO: FilterDTO): Observable<any> {

    return this.http
      .post<any>(Config.getControllerUrl('Dashboard', 'CatchupHouseHoldChecked'), filterDTO)
  }

  public getCatchupHouseHoldFindings(filterDTO: FilterDTO): Observable<any> {

    return this.http
      .post<any>(Config.getControllerUrl('Dashboard', 'CatchupHouseHoldFindings '), filterDTO)
  }
}
