import { Injectable, OnInit, NgZone } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from '../../services/cookie.service'
import { HttpClient } from '@angular/common/http';
import { Config } from 'src/app/Core/helpers/config.helper';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommonPaginationModel } from 'src/app/shared/model/Common/common-pagination.model';
import { state } from '@angular/animations';
import { UserRoleAssignModel } from 'src/app/auth/user-role-assign/dto/role.assign.dto';
import {AssignDistrict} from 'src/app/auth/assign-district/assign-district-dto'
@Injectable({
  providedIn: 'root'
})

export class RoleService implements OnInit {

  constructor(
    public toster: ToastrService,
    private cookieService: CookieService,private http: HttpClient) {

  }

  ngOnInit(): void { }

  AddRole(Role: string) {

    return this.http.post<any>(Config.getControllerUrl('Auth', `CreateRole?role=${Role}`),null)

  }

  public AddDistrict(assignDistrict: AssignDistrict): Observable<any> {

    return this.http.post<any>(Config.getControllerUrl('Auth', 'AssignUserdistrict'), assignDistrict)
  }

  public getData(state): Observable<any> {


    return this.http.get(`${Config.getControllerUrl("Auth", `Roles`)}`)
      .pipe(map((data: any) => data))
      .pipe(
        map(
          (data: any) =>
          ({
            result: data.userroles,

          } as any)
        )
      )
      .pipe((data: any) => data);
  }

  DeleteRole(role:string) {

    return this.http.delete<any>(Config.getControllerUrl('Auth', `DeleteRole?role=${role}`))
  }

  public getPaginationModel(state): CommonPaginationModel {
    const commonPaginationModel: CommonPaginationModel = new CommonPaginationModel();
    commonPaginationModel.page = 1;
    commonPaginationModel.pageSize = 100;
    if (state != null) {
    }
    return commonPaginationModel;
  }

  public getUsers(any): Observable<any> {
    const commonPaginationModel: CommonPaginationModel = this.getPaginationModel(
      state
    );
    return this.http .post(`${Config.getControllerUrl("Auth", `GetUsers`)}`,commonPaginationModel)
      .pipe(map((data: any) => data))
      .pipe(
        map(
          (data: any) =>
            ({
              result: data.data,
              count: data.recordsTotal,
            } as any)
        )
      )
      .pipe((data: any) => data);
  }

  GetUserRoleById(id:any) {

  
    return this.http.get<any>(Config.getControllerUrl('Auth', `GetUserRoles?userId=${id}`))

  }

  DeleteDistrict(deleteDistrict: any) {

    return this.http.post<any>(Config.getControllerUrl('Auth', 'DeleteDistrict'), deleteDistrict)
  }

  GetUserDistrictById(id:any) {

  
    return this.http.get<any>(Config.getControllerUrl('Auth', `GetUserassigneddistrictList?userId=${id}`))

  }

  getUserinfo(id:any) {

 
    return this.http.get<any>(Config.getControllerUrl('Auth', `GetUserInfo?userId=${id}`))

  }

  public assignUserRoles(userRoleAssign: UserRoleAssignModel): Observable<any> {

    return this.http.post<any>(Config.getControllerUrl('Auth', 'AssignUserRoles'), userRoleAssign)
  }


  DeleteUser(userId:string) {


    return this.http.delete<any>(Config.getControllerUrl('Auth', `DeleteUserById?id=${userId}`))
  }


}
