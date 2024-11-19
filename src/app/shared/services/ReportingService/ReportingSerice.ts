import { Injectable, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from '../../services/cookie.service'
import { HttpClient } from '@angular/common/http';
import { Config } from 'src/app/Core/helpers/config.helper';
import { ReportingDTO } from '../../../Reporting/dto/ReportingDto';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ReportingService implements OnInit {

  public userData: any;
  public user: firebase.User;
  public showLoader: boolean = false;

  constructor(public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone,
    public toster: ToastrService,
    private cookieService: CookieService,
    private http: HttpClient) {

  }


  ngOnInit(): void { }

  GetReport(paginatedFilterDTO: ReportingDTO) {

    return this.http.post<any>(Config.getControllerUrl('Dashboard', 'GetReport'), paginatedFilterDTO)

  }

  getExcelReport(paginatedFilterDTO: ReportingDTO): Promise<any> {

    return this.http.post<any>(Config.getControllerUrl('Dashboard', 'GetExcelReport'), paginatedFilterDTO, <any>{
      responseType: 'blob'
    })
      .toPromise()
  }



}
