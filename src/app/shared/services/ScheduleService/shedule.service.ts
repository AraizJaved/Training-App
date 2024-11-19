import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { config } from 'process';
import { Config } from 'src/app/Core/helpers/config.helper';

@Injectable({
  providedIn: 'root'
})
export class SheduleService {

  constructor(private http: HttpClient) { }


  public getDivisions() {
    return this.http.get(Config.getControllerUrl('Schedule', 'GetDivisions'));
  }
  
  public getDistricts(divCode: string) {
     
    return this.http.get(`${Config.getControllerUrl('Schedule', 'GetDistricts')}/${divCode}`);
  }
  public getTehsils(disCode: string) {
    return this.http.get(`${Config.getControllerUrl('Schedule', 'GetTehsils')}/${disCode}`);
  }

  public getHFTypes() {
     
    return this.http.get(`${Config.getControllerUrl('Schedule', 'GetTypes')}`);
  }
  public getDesignations() {
     
    return this.http.get(`${Config.getControllerUrl('Schedule', 'GetDesignation')}`);
  }

  public getHfList(disCode: string,bhuCode:string,bhuName:string) {
    let a = `${Config.getControllerUrl('Schedule', 'GetServiceListFacility')}/${disCode}/${bhuCode}/${bhuName}`
    if(bhuName===""){
      bhuName='null';
    }
    return this.http.get(`${Config.getControllerUrl('Schedule', 'GetServiceListFacility')}/${disCode}/${bhuCode}/${bhuName}`);
  }
  
  public getHfTypes() {
    return this.http.get(`${Config.getControllerUrl('Schedule', 'GetHfTypes')}`);
  }
  
  public getBhuList() {
    return this.http.get(`${Config.getControllerUrl('Schedule', 'GetBhuList')}`);
  }
  
  public GetSchedule() {
    return this.http.get(`${Config.getControllerUrl('Schedule', 'GetSchedule')}`);
  }

  AddExternalParticepant(ExternalParticepantDto: any) 
  {

    debugger
    return this.http.post<any>(Config.getControllerUrl('Schedule', 'AddExternalParticipant'), ExternalParticepantDto)

  }
  AddExternalParticepantwithScheduleId(ExternalParticepantDto: any) 
  {

    debugger
    return this.http.post<any>(Config.getControllerUrl('Schedule', 'AddExternalParticepantwithScheduleId'), ExternalParticepantDto)

  }
  ReplaceExternalParticepantwithScheduleId(TraineeDto: any) 
  {

    debugger
    return this.http.post<any>(Config.getControllerUrl('Schedule', 'ReplaceExternalParticepantwithScheduleId'), TraineeDto)

  }

}
