import { Injectable, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from '../../services/cookie.service'
import { HttpClient, HttpParams } from '@angular/common/http';
import { Config } from 'src/app/Core/helpers/config.helper';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs';
import { PaginatedFilterDTO } from 'src/app/components/map/google-map/paginatedFilter.Dto';
import { map } from 'rxjs/operators';
import { state } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})

export class MapService implements OnInit {

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

  public getData(day:any): Observable<any> {


    //return this.http.get(`${Config.getControllerUrl("Map", `GetFormsLocation`)}`)
    return this.http.get(`${Config.getControllerUrl("Map", `GetFormsLocation?Dayofwork=${day}`)}`)
      .pipe(map((response: any) => response))
      .pipe(
        map(
          (response: any) =>
          ({
            result: response.data,
          } as any)
        )
      )
      .pipe((data: any) => data);
  }

  public paginatedFilterDto(state): PaginatedFilterDTO {
    const paginatedFilterDto: PaginatedFilterDTO = new PaginatedFilterDTO();
    paginatedFilterDto.PageNumber = 1;
    paginatedFilterDto.Size = 10;
    if (state != null) {
    }
    return paginatedFilterDto;
  }

  // public FilterMap(DistrictCode:String,FormType:string,FormCategory:string): Observable<any> {

  //   const paginatedFilterDto: PaginatedFilterDTO = this.paginatedFilterDto(
  //     state
  //   );
  //
  //   return this.http.post(`${Config.getControllerUrl("Map", `GetFormsLocation?DistrictCode=${DistrictCode}&FormType=${FormType}&Category=${FormCategory}`)}`, paginatedFilterDto)
  //     .pipe(map((response: any) => response))
  //     .pipe(
  //       map(
  //         (response: any) =>
  //         ({
  //           result: response.data,
  //         } as any)
  //       )
  //     )
  //     .pipe((data: any) => data);

  // }
  public GetIndicatorDetail(id:number): Observable<any> {

    return this.http.get(`${Config.getControllerUrl("FormsIndicator", `GetFormsIndicatorById/${id}`)}`)
      .pipe(map((response: any) => response))
      .pipe(
        map(
          (response: any) =>
          ({
            result: response.data,
          } as any)
        )
      )
      .pipe((data: any) => data);
  }
}
