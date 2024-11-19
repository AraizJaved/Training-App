import { Injectable, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from '../../services/cookie.service'
import { HttpClient } from '@angular/common/http';
import { Config } from 'src/app/Core/helpers/config.helper';
import { FormIndicatorDTO } from 'src/app/FormsIndicator/FormIndicatorDTO';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs';
import { CommonPaginationModel } from '../../model/Common/common-pagination.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FormIndicatorService implements OnInit {

  public userData: any;
  public user: firebase.User;
  public showLoader: boolean = false;
  public subject = new Subject<number>();
  constructor(public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone,
    public toster: ToastrService,
    private cookieService: CookieService,
    private http: HttpClient) {
  }

  ngOnInit(): void { }
  getSubject() {
    this.subject.asObservable();
  }


  AddFormsIndicator(formindicatorDTO: FormIndicatorDTO) {

    return this.http.post<any>(Config.getControllerUrl('FormsIndicatorSettings', 'AddFormsIndicator'), formindicatorDTO)

  }

  GetFormsIndicatorById(id:number) {

    return this.http.get<any>(Config.getControllerUrl('FormsIndicatorSettings', `GetFormsIndicatorById/${id}`))

  }

  GetFormsTypeById(id:number , value:string) {

    return this.http.get<any>(Config.getControllerUrl('FormsIndicatorSettings', `SearchIndicatorsByFormId/${id}/${value}`))

  }

  public getData(state): Observable<any> {


    return this.http.get(`${Config.getControllerUrl("FormsIndicatorSettings", `GetFormsIndicatorList`)}`)
      .pipe(map((response: any) => response))
      .pipe(
        map(
          (response: any) =>
          ({
            result: response.formsIndicatorList,
            count: response.count,
          } as any)
        )
      )
      .pipe((data: any) => data);

  }

  public getForms(state): Observable<any> {

    return this.http.get(`${Config.getControllerUrl("Common", `MonitoringFormsList`)}`)
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

  public getMapForms(day:any): Observable<any> {
    return this.http.get(`${Config.getControllerUrl("Map", `GetFormsLocation?Dayofwork=${day}`)}`)
  }

  public getFixedSitePinDrops(filterDto: any): Observable<any> {
    return this.http.post(Config.getControllerUrl('Dashboard', 'FixedSitePinDrops'), filterDto)
  }

  public getHouseHoldClusterMissedAreaPolygons(filterDto: any): Observable<any> {
    return this.http.post(Config.getControllerUrl('Dashboard', 'HouseholdClusterMissedArea'), filterDto)
  }

  public getAllHouseHoldClusterPolygons(filterDto: any): Observable<any> {
    return this.http.post(Config.getControllerUrl('Dashboard', 'HouseholdClustersMarkers'), filterDto)
  }

  public getHouseHoldClusterPoorlyCoveredPolygons(filterDto: any): Observable<any> {
    return this.http.post(Config.getControllerUrl('Dashboard', 'HouseholdClusterPoorlyCoveredArea'), filterDto)
  }

  public getTransitPinDrops(filterDto: any): Observable<any> {
    return this.http.post(Config.getControllerUrl('Dashboard', 'TransitPinDrops'), filterDto)
  }

  public getReasonForMissedPinDrops(filterDto: any): Observable<any> {
    return this.http.post(Config.getControllerUrl('Dashboard', 'ReasonForMissedMarkers'), filterDto)
  }

  DeleteFormsIndicator(id:number) {

    return this.http.delete<any>(Config.getControllerUrl('FormsIndicatorSettings', `DeleteFormsIndicatorById/${id}`))
  }

  DeleteFormsIndicatorOptions(id:number) {

    return this.http.delete<any>(Config.getControllerUrl('FormsIndicatorSettings', `DeleteFormsIndicatorOptionsById/${id}`))
  }

  public getDistrict(): Observable<any> {

    return this.http.get(`${Config.getControllerUrl("Common", `GetDistrictList`)}`)
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
}
