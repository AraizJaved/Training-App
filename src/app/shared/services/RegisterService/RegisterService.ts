import { Injectable, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from '../../services/cookie.service'
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Config } from 'src/app/Core/helpers/config.helper';
import { RegisterDTO } from '../../../auth/register/dto/register.dto';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TaskDTO } from 'src/app/Task/TaskDTO';
import { MeetingDTO, } from 'src/app/EventCalender/MeetingDTO';

import { ContactsMultiFilterDTO, } from 'src/app/EventCalender/ContactsMultiFilterDTO';
import { DailyEngagementDTO } from 'src/app/DailyEngagements/DailyEngagementDTO';
import { NotificationModel } from 'src/app/Notification/NotificationModel';
import { FilterDTO } from 'src/app/Task/FilterDTO';
import { ContactFilterDTO } from 'src/app/Contacts/ContactFilterDTO';
import { ContactAllFilterDTO } from 'src/app/Contacts/ContactAllFilterDTO';
import { ChangePassword } from 'src/app/auth/change-password/ChangePassword';
@Injectable({
  providedIn: 'root'
})
export class RegisterService implements OnInit {

  public userData: any;
  public user: firebase.User;
  public showLoader: boolean = false;
  public canDelete : boolean = this.initializeCanDelete()

  constructor(public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone,
    public toster: ToastrService,
    private cookieService: CookieService, private http: HttpClient) {

  }

  private initializeCanDelete (): boolean{
    const canBeDeleted = JSON.parse(localStorage.getItem('currentUser')).user
    if(canBeDeleted.canDelete== 1)
      return this.canDelete =true;
    else return this.canDelete= false;
  }
  

  ngOnInit(): void { }

  AddRegister(addregister: RegisterDTO) {


    return this.http.post<any>(Config.getControllerUrl('Auth', 'Register'), addregister)

  }


  participantByCnic(cnic){
    
    return this.http.get(`${Config.getControllerUrl("Schedule", `ParticipantByCnic?CNIC=${cnic}`)}`)

  }
  ChangeParticipantsStatus(ParticipantStatusDto: any) {


    return this.http.post<any>(Config.getControllerUrl('Schedule', 'ChangeStatus'), ParticipantStatusDto)

  }
  DeleteFromHRParticepant(ParticipantStatusDto: any) {


    return this.http.post<any>(Config.getControllerUrl('Schedule', 'DeleteFromHRParticepant'), ParticipantStatusDto)

  }
  DeleteExternalParticipant(ParticipantStatusDto: any) {


    return this.http.post<any>(Config.getControllerUrl('Schedule', 'DeleteExternalParticipant'), ParticipantStatusDto)

  }
  ChangeAttendanceStatus(ParticipantStatusDto: any) {


    return this.http.post<any>(Config.getControllerUrl('Schedule', 'ChangeAttendanceStatus'), ParticipantStatusDto)

  }
  changeExternalParticipantStatus(ParticipantStatusDto: any) {


    return this.http.post<any>(Config.getControllerUrl('Schedule', 'changeExternalParticipantStatus'), ParticipantStatusDto)

  }
  ChangeParticipantMarks(ParticipantStatusDto: any) {


    return this.http.post<any>(Config.getControllerUrl('Schedule', 'ChangeParticipantMarks'), ParticipantStatusDto)

  }
  SendEmail(ParticipantStatusDto: any) {


    return this.http.post<any>(Config.getControllerUrl('Schedule', 'ChangeAttendanceStatus'), ParticipantStatusDto)

  }

  public getRoles(): Observable<any> {
    return this.http.get(`${Config.getControllerUrl("Auth", `Roles`)}`)

  }

  public DownloadFile(fileName: string): Observable<HttpEvent<Blob>> {
    debugger
    // var a = this.http.get(`${Config.getControllerUrl("Event", `DownloadFile`)}`)    ;
    // return this.http.get(`${Config.getControllerUrl("Event", `DownloadFile?fileName=${fileName}`)}`,{
    //   reportProgress: true,
    //   observe: "events"
    // }
    // )


    return this.http.request(new HttpRequest(
      'GET',
      `${Config.getControllerUrl("Event", `DownloadFile?fileName=${fileName}`)}`,
      null,
      {
        reportProgress: true,
        responseType: 'blob'
      }));
  }
  ChangePassword(ChangePassword: ChangePassword) {


    return this.http.post<any>(Config.getControllerUrl('Auth', 'ChangePassword'), ChangePassword)

  }
  AddTrainee(TraineeDto: any) {
    debugger

    return this.http.post<any>(Config.getControllerUrl('Schedule', 'AddTrainee'), TraineeDto)

  }
  ReplaceTrainee(TraineeDto: any) {
    debugger

    return this.http.post<any>(Config.getControllerUrl('Schedule', 'ReplaceTrainee'), TraineeDto)

  }



  counterCard() {
    debugger

    return this.http.get<any>(Config.getControllerUrl('Schedule', 'CounterCard'))

  }


  AddTrainer(TraineeDto: any) {
    debugger

    return this.http.post<any>(Config.getControllerUrl('Schedule', 'AddTrainer'), TraineeDto)

  }
  ReplaceTrainer(TraineeDto: any) {
    debugger

    return this.http.post<any>(Config.getControllerUrl('Schedule', 'ReplaceTrainer'), TraineeDto)

  }


  AddTask(TaskDTO: any) {

    debugger
    return this.http.post<any>(Config.getControllerUrl('Task', 'AddTask'), TaskDTO, {
      reportProgress: true,
      observe: "events"
    })

  }
  AddContact(ContactDTO: any) {

    debugger
    return this.http.post<any>(Config.getControllerUrl('Contacts', 'AddContact'), ContactDTO)

  }
  Updateontact(ContactDTO: any) {

    debugger
    return this.http.post<any>(Config.getControllerUrl('Contacts', 'UpdateContact'), ContactDTO)

  }
  AddContactType(ContactTypeDTO: any) {

    debugger
    return this.http.post<any>(Config.getControllerUrl('Contacts', 'AddContactType'), ContactTypeDTO)

  }
  AddSchedule(Schedule: any) {

    debugger
    return this.http.post<any>(Config.getControllerUrl('Schedule', 'AddSchedule'), Schedule)

  }
  AddTariningType(TrainingTypeDTO: any) {

    debugger
    return this.http.post<any>(Config.getControllerUrl('Event', 'AddTariningType'), TrainingTypeDTO)

  }

  AddCadre(CadreDTO: any) {

    debugger
    return this.http.post<any>(Config.getControllerUrl('Event', 'AddCadre'), CadreDTO)

  }
  AddTraingCategory(TrainingCategoryDTO: any) {

    debugger
    return this.http.post<any>(Config.getControllerUrl('Event', 'AddTariningCategory'), TrainingCategoryDTO)

  }
  AddQualification(TrainingCategoryDTO: any) {

    debugger
    return this.http.post<any>(Config.getControllerUrl('Event', 'AddQualification'), TrainingCategoryDTO)

  }
  AddTrainingLevel(QualificationDTO: any) {

    debugger
    return this.http.post<any>(Config.getControllerUrl('Event', 'AddTrainingLevel'), QualificationDTO)

  }
  AddDocumentType(DocumentTypeDTO: any) {

    debugger
    return this.http.post<any>(Config.getControllerUrl('Event', 'AddDocumentType'), DocumentTypeDTO)

  }
  AddOrganizedBy(OrganizedByDTO: any) {

    debugger
    return this.http.post<any>(Config.getControllerUrl('Event', 'AddOrganizedBy'), OrganizedByDTO)

  }
  AddSupportedBy(SupportedByDTO: any) {

    debugger
    return this.http.post<any>(Config.getControllerUrl('Event', 'AddSupportedBy'), SupportedByDTO)

  }

  AddMeetingVenue(MeetingVenueDTO: any) {

    debugger
    return this.http.post<any>(Config.getControllerUrl('Event', 'AddVenue'), MeetingVenueDTO)

  }

  AddDailyEngagement(DailyEngagementDTO: any) {

    debugger
    return this.http.post<any>(Config.getControllerUrl('DailyEngagement', 'AddDailyEngagement'), DailyEngagementDTO)

  }
  getTrainee(HmisCodeDesignationDto: any) {

    debugger
    return this.http.post<any>(Config.getControllerUrl('Schedule', 'getTrainee'), HmisCodeDesignationDto)

  }
  public getDailyengagementById(taskId: any): Observable<any> {


    return this.http.get(`${Config.getControllerUrl("DailyEngagement", `GetDailyEngagementById?taskId=${taskId}`)}`)
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
  AddEvent(TrainingDTO: any) {

    debugger
    return this.http.post<any>(Config.getControllerUrl('Event', 'AddEvent'), TrainingDTO)

  }
  AddPreviousTraining(TrainingDTO: any) {

    debugger
    return this.http.post<any>(Config.getControllerUrl('Event', 'AddPreviousTraining'), TrainingDTO)

  }
  AddConference(ConferenceDTO: any) {

    debugger
    return this.http.post<any>(Config.getControllerUrl('Conference', 'AddConference'), ConferenceDTO, {
      reportProgress: true,
      observe: "events"
    })

  }
  UpdateEvent(MeetingDTO: any) {

    debugger
    return this.http.post<any>(Config.getControllerUrl('Event', 'UpdateEvent'), MeetingDTO)

  }
  UpdateConference(ConferenceDTO: any) {

    debugger
    return this.http.post<any>(Config.getControllerUrl('Conference', 'UpdateConference'), ConferenceDTO)

  }
  AddDetails(TaskDTO: any) {

    debugger
    return this.http.post<any>(Config.getControllerUrl('Task', 'AddTaskDetail'), TaskDTO, {
      reportProgress: true,
      observe: "events"
    })

  }
  GetScheduleWithParticepants(Id: any) {

    // return this.http.get(`${Config.getControllerUrl("Task", `GetDetailsTask/${taskid}`)}`)
    return this.http.get(`${Config.getControllerUrl("Schedule", `GetScheduleWithParticepants?Id=${Id}`)}`)


  }
  GetParticepantDetail(ProfileId: any) {

    // return this.http.get(`${Config.getControllerUrl("Task", `GetDetailsTask/${taskid}`)}`)
    return this.http.get(`${Config.getControllerUrl("Reports", `GetParticepantDetail?ProfileId=${ProfileId}`)}`)


  }
  GetExternalParticepantDetail(ProfileId: any) {

    // return this.http.get(`${Config.getControllerUrl("Task", `GetDetailsTask/${taskid}`)}`)
    return this.http.get(`${Config.getControllerUrl("Reports", `GetExternalParticepantDetail?ProfileId=${ProfileId}`)}`)


  }
  GetTrainingTypeDetail(TrainingType: any) {

    // return this.http.get(`${Config.getControllerUrl("Task", `GetDetailsTask/${taskid}`)}`)
    return this.http.get(`${Config.getControllerUrl("Reports", `GetTrainingTypeDetail?TrainingType=${TrainingType}`)}`)


  }
  getTaskDetail(taskid: any) {

    // return this.http.get(`${Config.getControllerUrl("Task", `GetDetailsTask/${taskid}`)}`)
    return this.http.get(`${Config.getControllerUrl("Task", `GetDetailsTask?taskid=${taskid}`)}`)
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

  getStatus(): Observable<any> {

    return this.http.get(`${Config.getControllerUrl("Common", `TaskStatus`)}`)

  }



  // GetTaskListByUserId(userid: any) {

  //   // return this.http.get(`${Config.getControllerUrl("Task", `GetDetailsTask/${taskid}`)}`)
  //   return this.http.get(`${Config.getControllerUrl("Task", `GetTaskListByUserId?userid=${userid}`)}`)
  //   .pipe(map((data: any) => data))
  //   .pipe(
  //     map(
  //       (data: any) =>
  //       ({

  //         result: data.data,

  //       } as any)
  //     )
  //   )
  //   .pipe((data: any) => data);


  // }



  public getData(userid: any): Observable<any> {

    return this.http.get(`${Config.getControllerUrl("Task", `GetTaskListByUserId?userid=${userid}`)}`)
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

  public getFilteredList(filterDto: FilterDTO): Observable<any> {


    return this.http.post(Config.getControllerUrl("Task", "GetTaskListsByFilter"), filterDto)
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
  public getContactFilteredList(ContactFilterDTO: ContactFilterDTO): Observable<any> {


    return this.http.post(Config.getControllerUrl("Contacts", "GetContactListsByFilter"), ContactFilterDTO)
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

  public getContactAllFilteredList(ContactAllFilterDTO: ContactAllFilterDTO): Observable<any> {


    return this.http.post(Config.getControllerUrl("Contacts", "GetContactListsByAllFilter"), ContactAllFilterDTO)
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
  public getContactsFilteredList(ContactFilterDTO: ContactFilterDTO): Observable<any> {


    return this.http.post(Config.getControllerUrl("Common", "GetContactsDesignationList"), ContactFilterDTO)
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

  public getDailyEngagementFilteredList(filterDto: FilterDTO): Observable<any> {


    return this.http.post(Config.getControllerUrl("DailyEngagement", "GetDailyEngagementListsByFilter"), filterDto)
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
  public getFilteredEvent(filterDto: FilterDTO): Observable<any> {


    return this.http.post(Config.getControllerUrl("Event", "GetAllEvents"), filterDto)
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
  public getPreviousTraining(): Observable<any> {


    return this.http.get(Config.getControllerUrl("Event", "GetPreviousTrainings"))
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

  public deleteTask(id: any): Observable<any> {
    return this.http.get(Config.getControllerUrl("Task", `DeleteTask?id=${id}`))
  }



  public deleteTrainingCategory(id: any): Observable<any> {
    return this.http.get(Config.getControllerUrl("Event", `DeleteTrainingCategory?id=${id}`))
  }

  public deleteTrainingLevel(id: any): Observable<any> {
    return this.http.get(Config.getControllerUrl("Event", `DeleteTrainingLevel?id=${id}`))
  }

  public deleteTrainingType(id: any): Observable<any> {
    return this.http.get(Config.getControllerUrl("Event", `DeleteTrainingType?id=${id}`))
  }

  public deleteTrainingOrganizedBy(id: any): Observable<any> {
    return this.http.get(Config.getControllerUrl("Event", `DeleteTrainingOrganizedBy?id=${id}`))
  }

  public deleteTrainingSupportedBy(id: any): Observable<any> {
    return this.http.get(Config.getControllerUrl("Event", `DeleteTrainingSupportedBy?id=${id}`))
  }

  public deleteTrainingVenue(id: any): Observable<any> {
    return this.http.get(Config.getControllerUrl("Event", `DeleteTrainingVenue?id=${id}`))
  }



  public deleteCadre(id: any): Observable<any> {
    return this.http.get(Config.getControllerUrl("Event", `DeleteCadre?id=${id}`))
  }

  public deleteTrainingQualification(id: any): Observable<any> {
    return this.http.get(Config.getControllerUrl("Event", `DeleteTrainingQualification?id=${id}`))
  }

  public deleteTrainingDocumentType(id: any): Observable<any> {
    return this.http.get(Config.getControllerUrl("Event", `DeleteTrainingDocumentType?id=${id}`))
  }






  public deleteMeeting(id: any): Observable<any> {
    return this.http.get(Config.getControllerUrl("Event", `DeleteMeeting?id=${id}`))
  }


  public deleteTraining(id: any): Observable<any> {
    return this.http.get(Config.getControllerUrl("Event", `DeleteTrainingPastTraining/${id}`))
  }


  public deleteTrainingNewTraining(id: any): Observable<any> {
    return this.http.get(Config.getControllerUrl("Event", `DeleteTrainingNewTraining/${id}`))
  }


  public deleteTrainingSchduleTraining(id: any): Observable<any> {
    return this.http.get(Config.getControllerUrl("Event", `DeleteTrainingSchduleTraining/${id}`))
  }

  public deleteTrainingExternalParticipant(id: any): Observable<any> {
    return this.http.get(Config.getControllerUrl("Event", `DeleteTrainingExternalParticipant/${id}`))
  }


  public deleteDailyEngagemnet(id: any): Observable<any> {


    return this.http.get(Config.getControllerUrl("DailyEngagement", `DeleteDailyEngagement?id=${id}`))


  }
  public deleteContact(id: any): Observable<any> {


    return this.http.get(Config.getControllerUrl("Contacts", `DeleteContact?id=${id}`))


  }
  public reSendSMS(id: any): Observable<any> {


    return this.http.get(Config.getControllerUrl("Task", `ReSendSMS?id=${id}`))


  }
  public unReadCommentFn(id: any): Observable<any> {


    return this.http.get(Config.getControllerUrl("Task", `ReadComment?id=${id}`))


  }

  public getTaskCount(): Observable<any> {

    return this.http.get(`${Config.getControllerUrl("Task", "GetTasksCount")}`)
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

  public GetAllTasks(): Observable<any> {


    return this.http.get(`${Config.getControllerUrl("Task", `GetAllTasks`)}`)
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


  public getTaskById(taskId: any): Observable<any> {


    return this.http.get(`${Config.getControllerUrl("Task", `GetTaskById?taskId=${taskId}`)}`)
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

  public getContactById(taskId: any): Observable<any> {


    return this.http.get(`${Config.getControllerUrl("Contacts", `GetContactById?taskId=${taskId}`)}`)
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

  public getNotifications(): Observable<any> {

    return this.http.get<any>(Config.getControllerUrl('Notification', 'GetNotificationsList'))

  }


  public getUserList(): Observable<any> {

    return this.http.get<any>(Config.getControllerUrl('Common', 'AssignedToList'))

  }
  public getParticepentsList(): Observable<any> {

    return this.http.get<any>(Config.getControllerUrl('Common', 'ParticepentList'))

  }

  public getForms(): Observable<any> {


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

  public getIndicators(userType, id): Observable<any> {
    // return this.http.get<any>(Config.getControllerUrl('Dashboard', `GetFormFilledCategoryWiseCount/${code}/${day}`))
    return this.http.get(`${Config.getControllerUrl("Common", `GetIndicatorsListByFormId/${userType}/${id}`)}`)
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

  public getDivision(state: any): Observable<any> {


    return this.http.get(`${Config.getControllerUrl("Common", `GetDivisionList?geoLevel=${0}`)}`)
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
  // old neme getContactDesignation
  public getContactAllDesignationList(state: any): Observable<any> {


    return this.http.get(`${Config.getControllerUrl("Common", `GetContactAllDesignationList`)}`)
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
  public getMeetingOrganizer(state: any): Observable<any> {


    return this.http.get(`${Config.getControllerUrl("Event", `GetMeetingOrganizerList`)}`)
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
  public getTrainingType(): Observable<any> {


    return this.http.get(`${Config.getControllerUrl("Event", `GetTrainingType`)}`)

  }




  public GetCadre(): Observable<any> {


    return this.http.get(`${Config.getControllerUrl("Event", `GetCadre`)}`)

  }


  public getDocumentType(): Observable<any> {


    return this.http.get(`${Config.getControllerUrl("Event", `GetDocumentType`)}`)

  }
  public getQualification(): Observable<any> {


    return this.http.get(`${Config.getControllerUrl("Event", `GetQualification`)}`)

  }
  public getTrainingLevel(): Observable<any> {


    return this.http.get(`${Config.getControllerUrl("Event", `GetTrainingLevel`)}`)

  }


  public totalTrainingMonthCount(): Observable<any> {
    return this.http.get(`${Config.getControllerUrl("Event", `TotalTrainingMonthCount`)}`)
  }

  public typeWiseTrainingCount(): Observable<any> {
    return this.http.get(`${Config.getControllerUrl("Event", `TrainingTypeWiseReport`)}`)
  }
  public getParticipant(state: any): Observable<any> {
    debugger

    return this.http.get(`${Config.getControllerUrl("Schedule", `GetExternalParticipant`)}`)

  }

  public getParticipantbyId(id: any): Observable<any> {
    debugger

    return this.http.get(Config.getControllerUrl("Schedule", `getParticipantbyId?Id=${id}`))


  }











  public getOrganizedBy(state: any): Observable<any> {


    return this.http.get(`${Config.getControllerUrl("Event", `GetOrganizedBy`)}`)

  }
  public GetSupportedBy(state: any): Observable<any> {


    return this.http.get(`${Config.getControllerUrl("Event", `GetSupportedBy`)}`)

  }
  public GetReport(): Observable<any> {

    debugger
    return this.http.get(`${Config.getControllerUrl("Reports", `GetReport`)}`)

  }
  public FilterByTraining(Id: any): Observable<any> {

    debugger
    return this.http.get(`${Config.getControllerUrl("Reports", `FilterByTraining?Id=${Id}`)}`)


  }
  public getTrainings(): Observable<any> {


    return this.http.get(`${Config.getControllerUrl("Event", `GetTrainings`)}`)

  }
  public GetVenues(): Observable<any> {


    return this.http.get(`${Config.getControllerUrl("Event", `GetVenues`)}`)

  }
  public getTrainingCategory(state: any): Observable<any> {


    return this.http.get(`${Config.getControllerUrl("Event", `GetTariningCategory`)}`)
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
  public getMeetingVenue(state: any): Observable<any> {


    return this.http.get(`${Config.getControllerUrl("Event", `GetMeetingVenueList`)}`)
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


  public getMeetingStatus(state: any): Observable<any> {


    return this.http.get(`${Config.getControllerUrl("Event", `GetMeetingStatus`)}`)
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
  public GetDailyEngagementPublicList(state: any): Observable<any> {


    return this.http.get(`${Config.getControllerUrl("DailyEngagement", `GetDailyEngagementPublicList`)}`)
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
  public GetScheduleList(state: any,Sreach:any): Observable<any> {

    debugger
    return this.http.get(`${Config.getControllerUrl("Schedule", `GetSchedule?Sreach=${Sreach}`)}`)
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
  public GetPreviousScheduleList(state: any,Sreach:any): Observable<any> {

    debugger
    return this.http.get(`${Config.getControllerUrl("Schedule", `GetPreviousSchedule?Sreach=${Sreach}`)}`)
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
  public _GetScheduleList(state: any,Sreach:any): Observable<any> {
    debugger
    return this.http.get(`${Config.getControllerUrl("Event", `GetTrainings?Sreach=${Sreach}`)}`)
      .pipe(map((data: any) => data))
      .pipe(
        map(
          (data: any) =>
          ({
            result: data.data,

          } as any)
        )
      ).pipe((data: any) => data);
  }
  public GetScheduleListReport(state: any): Observable<any> {

    debugger
    return this.http.get(`${Config.getControllerUrl("Schedule", `GetScheduleReport`)}`)
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
  public GetScheduleWithStartdate(state: any): Observable<any> {

    debugger
    return this.http.get(`${Config.getControllerUrl("Schedule", `GetScheduleWithStartdate`)}`)
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





  
  public GetPerviusScheduleList(state: any): Observable<any> {

    debugger
    return this.http.get(`${Config.getControllerUrl("Schedule", `GetPeriviousSchedule`)}`)
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
  public GetParticipantList(state: any): Observable<any> {

    debugger
    return this.http.get(`${Config.getControllerUrl("Schedule", `GetExternalParticipant`)}`)
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



  public GetParticipantLists(state: any): Observable<any> {

    debugger
    return this.http.get(`${Config.getControllerUrl("Schedule", `GetExternalParticipants`)}`)
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



  public GetSchedulebyUser(state: any): Observable<any> {

    debugger
    return this.http.get(`${Config.getControllerUrl("Schedule", `GetSchedulebyUser`)}`)
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


  public getDistrict(div): Observable<any> {

    return this.http.get(`${Config.getControllerUrl("Common", `GetDistrictList?geoLevel=${div}`)}`)
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

  public getAllDistrict(): Observable<any> {


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

  public getTehsil(dis): Observable<any> {

    return this.http.get(`${Config.getControllerUrl("Common", `GetTehsilList?geoLevel=${dis}`)}`)
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

  public getUCs(teh): Observable<any> {

    return this.http.get(`${Config.getControllerUrl("Common", `GetUC?geoLevel=${teh}`)}`)
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



  public onCommentDelete(id: any): Observable<any> {
    debugger

    return this.http.get(Config.getControllerUrl("Task", `DeleteTaskComment?Id=${id}`))


  }

  public UpdateTaskExtendedDate(TaskDTO: any): Observable<any> {
    debugger

    return this.http.post(Config.getControllerUrl("Task", `UpdateTaskExtendedDate`), TaskDTO)


  }



  // Start My Work 



  public getCompany(state: any): Observable<any> {
    debugger



    return this.http.get(`${Config.getControllerUrl("Common", `GetContactCompanyList`)}`)
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
  public GetDepartments(state: any): Observable<any> {
    debugger



    return this.http.get(`${Config.getControllerUrl("Common", `GetDepartments`)}`)
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
  ////////////////////////SPL///////////
  public getCompanySPL(state: any): Observable<any> {


    return this.http.get(`${Config.getControllerUrl("Common", `GetContactCompanyListSPL`)}`)
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
  // ------------------------MultiDopDown-------------------

  public getContactMultiDepartmentList(ContactsMultiFilterDTO: ContactsMultiFilterDTO): Observable<any> {


    return this.http.post(Config.getControllerUrl("Common", "GetContactMultiDepartmentList"), ContactsMultiFilterDTO)
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
  ///////////////////////////SPL///////////////////////
  public getContactMultiDepartmentListSPL(ContactsMultiFilterDTO: ContactsMultiFilterDTO): Observable<any> {


    return this.http.post(Config.getControllerUrl("Common", "GetContactMultiDepartmentListSPL"), ContactsMultiFilterDTO)
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

  // ////////////////////SPL////////////////
  public getContactMultiCategoryList(ContactsMultiFilterDTO: ContactsMultiFilterDTO): Observable<any> {


    return this.http.post(Config.getControllerUrl("Common", "GetContactMultiCategoryList"), ContactsMultiFilterDTO)
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
  public getContactMultiCategoryListSPL(ContactsMultiFilterDTO: ContactsMultiFilterDTO): Observable<any> {


    return this.http.post(Config.getControllerUrl("Common", "GetContactMultiCategoryList"), ContactsMultiFilterDTO)
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

  // ------------------------MultiDopDown-------------------
  public getDepartment(company): Observable<any> {

    return this.http.get(`${Config.getControllerUrl("Common", `GetDepartments`)}`)
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


  public getCategory(department): Observable<any> {

    return this.http.get(`${Config.getControllerUrl("Common", `GetContactCategoryList?Id=${department}`)}`)
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

  public getDesignation(category): Observable<any> {

    return this.http.get(`${Config.getControllerUrl("Common", `GetContactDesignationList?Id=${category}`)}`)
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



  downloadPDF(url: string): Observable<Blob> {
    debugger
    const options = { responseType: 'blob' as 'json' };
    return this.http
      .get<Blob>(url, options)
      .pipe(map(res => new Blob([res], { type: 'application/pdf' })));
  }


  // End My Work 

}
