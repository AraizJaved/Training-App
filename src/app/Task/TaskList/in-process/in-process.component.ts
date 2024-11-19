import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { RegisterService } from 'src/app/shared/services/RegisterService/RegisterService';
import { TaskDetailComponent } from '../../task-detail/task-detail.component';

@Component({
  selector: 'app-in-process',
  templateUrl: './in-process.component.html',
  styleUrls: ['./in-process.component.scss']
})
export class InProcessComponent implements OnInit,OnChanges {

  private subs = new Subscription();
  temp = [];
  rows = [];
  User: any
  @Input() userID;
  userId:any
  constructor(private readonly registerService: RegisterService, private readonly toastr: ToastrService,
    private readonly router: Router, private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  GetDetail(taskId: any, currentStatus: any): void {

    const modalRef = this.modalService.open(TaskDetailComponent, { size: 'lg' });

    modalRef.componentInstance.taskId = taskId;
    modalRef.componentInstance.currentStatus = currentStatus;
  }

  ngOnChanges(): void {
    this.getData()
}

  getData() {
    debugger
    //this.StatusType = (<HTMLSelectElement>document.getElementById('FormType')).value;

    if(JSON.parse(localStorage.getItem('currentUser')).userrole.filter(x=> x.name =='Admin') ){
      this.userId=this.userID;
      if(this.userID !=='0'){
        this.TaskList()
      }
    }

    if(!this.userID){
      this.User = JSON.parse(localStorage.getItem('currentUser'))
      this.userId=this.User.user.id
      this.TaskList()
    }

  if(this.userID=='0'){
    this.GetAllTasks()
  }

}

TaskList(){
  this.subs.add(
    this.registerService.getData(this.userId).subscribe(
      (data) => {
        debugger

        this.temp = [...data.result];

        this.rows = data.result;
        this.rows = this.rows.filter(x => x.taskStatus == "InProcess")
        return data;
      },
      (error) => {
        alert(error);
      }
    )
  );
}

GetAllTasks(){
  this.subs.add(
    this.registerService.GetAllTasks().subscribe(
      (data) => {
        debugger

        this.temp = [...data.result];

        this.rows = data.result;
        this.rows = this.rows.filter(x => x.taskStatus == "InProcess")
        return data;
      },
      (error) => {
        alert(error);
      }
    )
  );
}
}
