import { Injectable } from '@angular/core'
import { CommonPaginationModel } from 'src/app/shared/model/Common/common-pagination.model';
import { HttpClient } from '@angular/common/http'
import { Config } from './helpers/config.helper'
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root',
})
export class DataGridService {
  filterObject: CommonPaginationModel = new CommonPaginationModel()
  dataList: any[] = []

  constructor(
    private readonly httpClient: HttpClient,
  ) {
  }

  public getPaginationModel(): CommonPaginationModel {
    const commonPaginationModel: CommonPaginationModel = new CommonPaginationModel();
    commonPaginationModel.page = 1;
    commonPaginationModel.pageSize = 30;
    // if (state != null) {
    //   // if (state.action.requestType === 'searching') {
    //   //   userPaginationModel.search = state.action.searchString
    //   // }
    //   // if (state.action.requestType === 'sorting') {
    //   //   if (state.action.direction === 'Ascending') {
    //   //     userPaginationModel.sortBy = 'asc'
    //   //   } else {
    //   //     userPaginationModel.sortBy = 'desc'
    //   //   }
    //   //   userPaginationModel.sortIndex = 0
    //   // }
    // }
    return commonPaginationModel;
  }

  getByFilter(): Promise<any> {
    const commonPaginationModel: CommonPaginationModel = this.getPaginationModel();
    return this.httpClient
      .post(
        `${Config.getControllerUrl("DrugFormulary", `GetDrugFormulary`)}`,
        commonPaginationModel
      )
      .pipe(map((response: any) => response))
      .pipe(
        map(
          (response: any) =>
            ({
              result: response.data,
              count: response.recordsTotal,
            } as any)
        )
      )
      .pipe((data: any) => data).toPromise();
  }

  getTransferPatients(): Promise<any> {
    return this.httpClient
      .post<any>(Config.getControllerUrl('Patient', 'GetTransferPatients'), this.filterObject)
      .toPromise()
  }
}
