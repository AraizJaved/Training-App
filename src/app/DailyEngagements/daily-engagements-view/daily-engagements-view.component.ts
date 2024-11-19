import { Component, OnInit,Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { DailyEngagementFilterDTO } from '../DailyEngagementFilterDTO';
import { RegisterService } from 'src/app/shared/services/RegisterService/RegisterService';
//import { TaskDetailComponent } from '../task-detail/task-detail.component';
import { CreateDailyEngagementsComponent } from '../create-daily-engagements/create-daily-engagements.component';
import { PaginationControlsComponent, PaginationInstance } from 'ngx-pagination';
import { UpdateDailyEngagementsComponent } from '../update-daily-engagements/update-daily-engagements.component';
declare var require
const Swal = require('sweetalert2')

@Component({
  selector: 'app-daily-engagements-view',
  templateUrl: './daily-engagements-view.component.html',
  styleUrls: ['./daily-engagements-view.component.scss']
})
export class DailyEngagementsViewComponent implements OnInit {
  private subs = new Subscription();
  temp = [];
  rows = [];
  overdue = [];
  userList =[];
  FilterForm: FormGroup;
  DailyEngagementFilterDTO : DailyEngagementFilterDTO = new DailyEngagementFilterDTO()
  isAdmin:boolean
  isAddTask:boolean
  isDailyEngagement:boolean
  isDailyEngagementView:boolean
  isDailyEngagementAdd:boolean
  isDailyEngagementDelete:boolean
  isDailyEngagementFilter:boolean
  counts:any
  User: any
  userDesignation:any
  userId:any
  Status:any
  Priority: any[] = [
    { name:"High"},
    { name:"Medium"},
    { name:"Low"} ]
  
    DEFilter: any[] = [
      
      { id:'1',
        name: "Active Daily Engagement" },

      
      { id:'6',
        name: "Archived Daily Engagement" }
    ]
    public config: PaginationInstance = {
   id: 'advanced',
    itemsPerPage: 10,
    currentPage: 1
};    

  constructor(private readonly registerService: RegisterService, private readonly toastr: ToastrService,
    private readonly router: Router, private modalService: NgbModal,private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.FilterForm = this.formBuilder.group({
      userList: ["All", Validators.required],
      Priority: ["All", Validators.required],
      Status: ["All", Validators.required],
      EventType: ["", Validators.required],
    });

    this.isAdmin=true
    var a = JSON.parse(localStorage.getItem('currentUser')).userrole.filter(x=> x.name =='Admin');
    if(a.length =='0' ){
      this.isAdmin=false
    }

    this.isAddTask=true
    var a = JSON.parse(localStorage.getItem('currentUser')).userrole.filter(x=> x.name =='AddTask');
    if(a.length =='0' ){
      this.isAddTask=false
    }
    this.isDailyEngagement=true
    var a = JSON.parse(localStorage.getItem('currentUser')).userrole.filter(x=> x.name =='DailyEngagement');
    if(a.length =='0' ){
      this.isDailyEngagement=false
    }
    this.isDailyEngagementView=true
    var a = JSON.parse(localStorage.getItem('currentUser')).userrole.filter(x=> x.name =='DailyEngagementView');
    if(a.length =='0' ){
      this.isDailyEngagementView=false
    }
    this.isDailyEngagementAdd=true
    var a = JSON.parse(localStorage.getItem('currentUser')).userrole.filter(x=> x.name =='DailyEngagementAdd');
    if(a.length =='0' ){
      this.isDailyEngagementAdd=false
    }
    this.isDailyEngagementDelete=true
    var a = JSON.parse(localStorage.getItem('currentUser')).userrole.filter(x=> x.name =='DailyEngagementDelete');
    if(a.length =='0' ){
      this.isDailyEngagementDelete=false
    }
    this.isDailyEngagementFilter=true
    var a = JSON.parse(localStorage.getItem('currentUser')).userrole.filter(x=> x.name =='DailyEngagementFilter');
    if(a.length =='0' ){
      this.isDailyEngagementFilter=false
    }
    this.User = JSON.parse(localStorage.getItem('currentUser'))
      this.userId=this.User.user.id
      this.userDesignation=this.User.user.designation
      console.log("sdfsdfdsfsdf",this.userDesignation)
    this.TaskCount() 
    this.getStatus()
    this.getUserList()
    //this.TaskList()
    this.FilterTasks()
  }

  IsCCFn(taskCC:any){

var a=taskCC.includes(this.userDesignation) 
return taskCC.includes(this.userDesignation) ? '#96c796':'';
 

  }

  onPageChange(number: number) {
    
    this.config.currentPage = number;
}

onPageBoundsCorrection(number: number) {
  
    this.config.currentPage = number;
}

  AddDailyEngagement(){

   const modalRef =  this.modalService.open(CreateDailyEngagementsComponent, { size: 'lg' });

    modalRef.result.then((data) => {
      debugger
      this.FilterTasks()
      this.TaskCount()
      //this.activeModal.close()
    }, (reason) => {
      // on dismiss
    });
  }
  UpdateDailyEngagement(taskId:any):void {
    debugger;

    const modalRef = this.modalService.open(UpdateDailyEngagementsComponent, { size: 'lg' });
    
    modalRef.componentInstance.taskId = taskId;
    
  }
  
  TaskList(){
    debugger
    this.subs.add(
      this.registerService.getFilteredList(this.DailyEngagementFilterDTO).subscribe(
        (data) => {
          debugger

          this.temp = [...data.result];

          this.rows = data.result;

          return data;
        },
        (error) => {
          alert(error);
        }
      )
    );
  }

  TaskCount(){
    this.subs.add(
      this.registerService.getTaskCount().subscribe(
        (data) => {
          debugger
         // this.temp = [...data.result];
          this.counts = data.result;
          // this.rows = this.rows.filter(x => x.taskStatus == "Pending")
          return data;
        },
        (error) => {
          alert(error);
        }
      )
    );
  }

  getUserList(){

    this.subs.add(

      this.registerService.getUserList().subscribe(
        (data) => {
          debugger
          //this.temp = [...data.result];
          // this.userList.push({
          //   id : "0",
          //   name : 'All Users'
          // });
          data.data.forEach(element => {
            this.userList.push(element)
          });
          this.userList=this.userList.filter(x=> x.name !=='Secretary')
          console.log("userList", this.userList)
          return data;
        },
        (error) => {
          alert(error);
        }
      )
    );
  }

  FilterTasks(){
 

    if(this.FilterForm.controls.EventType.value==""){
      this.DailyEngagementFilterDTO.dailyEngagementStatusId = 1;
      this.DailyEngagementFilterDTO.ShowMyDailyEngagement = false;
      this.DailyEngagementFilterDTO.recordStatus = true;

    }
    else{
      this.DailyEngagementFilterDTO.dailyEngagementStatusId = this.FilterForm.controls.EventType.value;
    
    }
  
    // if(this.FilterForm.controls.userList.value=="" && this.FilterForm.controls.Priority.value=="" 
    // && this.FilterForm.controls.Status.value==""){
    //   this.TaskList()
    //   return
    // }

    this.subs.add(
      this.registerService.getDailyEngagementFilteredList(this.DailyEngagementFilterDTO).subscribe(
        (data) => {
          debugger

          this.temp = [...data.result];

          this.rows = data.result;
        },
        (error) => {
          alert(error);
        }
      )
    );
  }

  


  

  getStatus(){
    debugger
    this.subs.add(

      this.registerService.getStatus().subscribe(
        (data) => {
          debugger
        

          this.Status = data.data;
          
        // if(this.isAdmin !=true){

        //   this.Status=this.Status.result.filter(x=>x.status!="Completed")
          
        //   this.Status=this.Status.filter(x=>x.status!="ReOpen")
          
        // }
        
          console.log("Status", this.Status)
          return data;
        },
        (error) => {
          alert(error);
        }
      )
    );
  }

  getList(id:any){

    debugger 

    this.DailyEngagementFilterDTO.userList =null;
    this.DailyEngagementFilterDTO.Priority = "All";
    if(id=="1"){
      this.DailyEngagementFilterDTO.Status = "All";
    }
    if(id=="2"){
      this.DailyEngagementFilterDTO.Status = "Pending";
    }
    if(id=="3"){
      this.DailyEngagementFilterDTO.Status = "In Progress";
    }

    if(id=="4"){
      this.DailyEngagementFilterDTO.Status = "Overdue";
    }
    if(id=="5"){
      this.DailyEngagementFilterDTO.Status = "Submit For Approval";
    }
    if(id=="6"){
      this.DailyEngagementFilterDTO.Status = "Completed";
    }
    this.subs.add(
      this.registerService.getFilteredList(this.DailyEngagementFilterDTO).subscribe(
        (data) => {
          debugger

          this.temp = [...data.result];
          this.rows = data.result;
          this.FilterForm.controls.Status.setValue(this.DailyEngagementFilterDTO.Status)

        },
        (error) => {
          alert(error);
        }
      )
    );
  }

  onDelete(id:any){
    debugger
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false,
    })

    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: false,
      showCancelButton: true,

    }).then((result) => {

      if (result.value) {

        this.subs.add(this.registerService.deleteDailyEngagemnet(id).subscribe(
          (data) => {

            swalWithBootstrapButtons.fire(
              'Deleted!',
              'Your Record has been deleted.',
              'success',
              this.FilterTasks(),
              this.TaskCount()
            )
          }
        ))

      } else if (
        // Read more about handling dismissals
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Record is Safe :)',
          'error'
        )
      }
    })
  }
  onFilterChange() {

    // debugger
    // if (this.FilterForm.controls.EventType.value == '0') {
    //   this.DailyEngagementFilterDTO.ShowMyDailyEngagement = true;
    //   this.DailyEngagementFilterDTO.recordStatus = null;
      
    
    //   this.FilterTasks()
    // }
    // else if (this.FilterForm.controls.EventType.value == '') {
    //   this.DailyEngagementFilterDTO.ShowMyDailyEngagement = false;
    //   this.DailyEngagementFilterDTO.recordStatus = null;
    
  
    //   this.FilterTasks()
    // }
     if (this.FilterForm.controls.EventType.value == '1') {
      this.DailyEngagementFilterDTO.ShowMyDailyEngagement = false;
      this.DailyEngagementFilterDTO.recordStatus = true;
 

      this.FilterTasks()
    }
 
   
  
    else if (this.FilterForm.controls.EventType.value == '6') {
      this.DailyEngagementFilterDTO.ShowMyDailyEngagement = false;
      this.DailyEngagementFilterDTO.recordStatus = false;
     

      this.FilterTasks()
    }

  }

  
}
