import { Injectable, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from '../../services/cookie.service'
import { HttpClient } from '@angular/common/http';
import { RegisterDTO } from '../../../auth/register/dto/register.dto';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Config } from 'src/app/Core/helpers/config.helper';
import { FileDTO } from 'src/app/SharedFolder/FileDTO';
@Injectable({
  providedIn: 'root'
})
export class FolderService implements OnInit {

  public userData: any;
  public user: firebase.User;
  public showLoader: boolean = false;

  constructor(public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone,
    public toster: ToastrService,
    private cookieService: CookieService, private http: HttpClient) {

  }


  ngOnInit(): void { }

  AddRegister(addregister: RegisterDTO) {


    return this.http.post<any>(Config.getControllerUrl('Auth', 'Register'), addregister)

  }

  
  AddFolder(FolderDTO: any) {

    debugger
    return this.http.post<any>(Config.getControllerUrl('SharedFolder', 'AddFolder'), FolderDTO)

  }
  
  _AddFile(FileDTO: any) {

    debugger
    return this.http.post<any>(Config.getControllerUrl('Event', 'AddFile'), FileDTO)

  }

  AddFile(FileDTO: any) {

    debugger
    return this.http.post<any>(Config.getControllerUrl('SharedFolder', 'AddFile'), FileDTO,{
      reportProgress: true,
      observe: "events"
    })

  }

  AddDetails(TaskDTO: any) {

    debugger
    return this.http.post<any>(Config.getControllerUrl('Task', 'AddTaskDetail'), TaskDTO)

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

  getStatus() : Observable<any> {

    return this.http.get(`${Config.getControllerUrl("Common", `TaskStatus`)}`)
      
  }

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

 

  public deleteTask(id:any): Observable<any> {


    return this.http.get(Config.getControllerUrl("Task", `DeleteTask?id=${id}`))
 

  }


  
  public deleteFile(id:any): Observable<any> {


    return this.http.get(Config.getControllerUrl("SharedFolder", `DeleteFile?id=${id}`))
 

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

  public GetAllFolders(): Observable<any> {


    return this.http.get(`${Config.getControllerUrl("SharedFolder", `GetAllFolders`)}`)
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

  public GetFiles(id:any,TrainingId:any): Observable<any> {

    debugger
    return this.http.get(`${Config.getControllerUrl("SharedFolder", `GetFiles/${id}/${TrainingId}`)}`)
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

  public GetChildFolders(id:any): Observable<any> {


    return this.http.get(`${Config.getControllerUrl("SharedFolder", `GetChildFolders?id=${id}`)}`)
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

  public getNotifications(): Observable<any> {

    return this.http.get<any>(Config.getControllerUrl('Notification', 'GetNotificationsList'))

  }


  public getUserList(): Observable<any> {

    return this.http.get<any>(Config.getControllerUrl('Common', 'AssignedToList'))

  }
  public deletefolder(id:any): Observable<any> {


    return this.http.get(Config.getControllerUrl("SharedFolder", `Deletefolder?id=${id}`))
 

  }
}


