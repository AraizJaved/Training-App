import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root'
})
export class CoreService {
    
    public districtName: string
    public formName: string
    public selectedCode: string
    public formFilledDetails : any
    public loginResponse:any=[]
    public totalCount:any
    public formFilledDetailsDesignationWise :any

}

