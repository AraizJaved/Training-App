import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { PaginatedFilterModel } from '../../model/Common/paginated-filter.model'
import { Config } from '../../../Core/helpers/config.helper'

@Injectable({
  providedIn: 'root',
})
export class DataGridService {
  filterObject: PaginatedFilterModel = new PaginatedFilterModel()
  dataList: any[] = []

  constructor(
    private readonly httpClient: HttpClient,
  ) {
  }

  // getFormsByLocation(districtCode: string, formId: string): Promise<any> {
  //   return this.httpClient
  //     .post<any>(Config.getControllerUrl('Map', `GetFormsLocation?DistrictCode=${districtCode}&FormType=${formId}`), this.filterObject,
  //     ).toPromise()
  // }
}