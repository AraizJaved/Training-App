import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { RegisterService } from 'src/app/shared/services/RegisterService/RegisterService';
import * as XLSX from 'XLSX'
@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  private subs = new Subscription();
  temp = [];
  rows = [];
  User: any
  StatusType: any = null;
  fileName = 'Tasks.xlsx';
  public searchString: string;
  TaskList :FormGroup
  userList =[]
  userId:any
  isAdmin:boolean
  FormType: any[] = [
    { name: "AssignTo" },
    { name: "Assigned" }]

  loading: boolean;
  ColumnMode = ColumnMode;
  constructor(private readonly registerService: RegisterService, private readonly toastr: ToastrService,
    private readonly router: Router,private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
    debugger

    this. getUserList()
    this.TaskList = this.formBuilder.group({
      userList: ["0",[ Validators.required]]
    });
    this.userId='0'
    this.isAdmin=true
    var a = JSON.parse(localStorage.getItem('currentUser')).userrole.filter(x=> x.name =='Admin');
    if(a.length =='0' ){
      this.isAdmin=false
    }
  }

  // Details(id: any) {
  //   debugger
  //   this.router.navigate(['/taskDetail'], {
  //     queryParams: {
  //       id: id,
  //     }
  //   })
  // }

  

  getUserList(){

    this.subs.add(

      this.registerService.getUserList().subscribe(
        (data) => {
          debugger
          //this.temp = [...data.result];
          this.userList.push({
            id : "0",
            name : 'All Users'
          });
          data.data.forEach(element => {
            this.userList.push(element)
          });
          this.userList=this.userList.filter(x=> x.name !=='Imran Skindar')
          console.log("userList", this.userList)
          return data;
        },
        (error) => {
          alert(error);
        }
      )
    );
  }

  UserTypeChange(id : any ) {
    debugger

    var nameofuser = id;
    var values = nameofuser.split(" ");
    this.userId = values[1] ? nameofuser.substr(nameofuser.indexOf(' ') + 1) : '';
    
  }
  

  public onSelect(e): void {

  }
  onActivate(event) {
    ;
    if (event.type == "click") {

    }
  }

}
