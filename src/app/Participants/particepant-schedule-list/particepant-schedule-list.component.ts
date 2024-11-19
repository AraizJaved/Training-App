import { Component, OnInit,Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

import { RegisterService } from 'src/app/shared/services/RegisterService/RegisterService';
//import { TaskDetailComponent } from '../task-detail/task-detail.component';

import { PaginationControlsComponent, PaginationInstance } from 'ngx-pagination';
import { state } from '@angular/animations';
import { AddTrainingScheduleComponent } from 'src/app/Schedule/add-training-schedule/add-training-schedule.component';
import { ViewEventComponent } from 'src/app/EventCalender/view-event/view-event.component';
import { ViewScheduleDetailsComponent } from 'src/app/Schedule/view-schedule-details/view-schedule-details.component';
import { AddTraineeComponent } from 'src/app/Schedule//add-trainee/add-trainee.component';
import { AddTrainerComponent } from 'src/app/Schedule/add-trainer/add-trainer.component';
import {ParticipantStatusDto} from '../participants-list/participant-status-dto'
declare var require
const Swal = require('sweetalert2')
@Component({
  selector: 'app-particepant-schedule-list',
  templateUrl: './particepant-schedule-list.component.html',
  styleUrls: ['./particepant-schedule-list.component.scss']
})
export class ParticepantScheduleListComponent implements OnInit {
  private subs = new Subscription();
  text:'';
  response: boolean
  searchText: string;
  temp = [];
  rows = [];
  overdue = [];
  userList =[];
  FilterForm: FormGroup;
  participantStatusDto: ParticipantStatusDto = new ParticipantStatusDto();

  isAdmin:boolean
  isAddTask:boolean
  counts:any
  User: any
  ScheduleDto :any;
  userDesignation:any
  userId:any
  Status:any
  Priority: any[] = [
    { name:"High"},
    { name:"Medium"},
    { name:"Low"} ]
    ScheduleList :any[]=[]
  

    public config: PaginationInstance = {
   id: 'advanced',
    itemsPerPage: 10,
    currentPage: 1
};    

  constructor(private readonly registerService: RegisterService, private readonly toastr: ToastrService,
    private readonly router: Router, private modalService: NgbModal,private formBuilder: FormBuilder) { }

  ngOnInit(): void {
 
    //this.GetDailyEngagementPublicList();

    //this.GetScheduleList();
    this.GetSchedulebyUser()


  
  }
  showSchedule(data){
     debugger
    const modalRef = this.modalService.open(ViewScheduleDetailsComponent, { size: 'lg' });
    // this.GetScheduleWithParticepants(data.id);


      this.registerService.GetScheduleWithParticepants(data.id).subscribe(
        (res :any) => {
           debugger

          this.ScheduleDto = res.data;
          modalRef.componentInstance.EventObj = this.ScheduleDto;
          console.log("ScheduleDetail", this.ScheduleDto)
          debugger
          modalRef.componentInstance.title = "View Training";
      
          modalRef.componentInstance.clickevent.subscribe(($e) => {
            //this.FilterEvent();
            window.location.reload();
          })



         
          return data;
        },
        (error) => {
          alert(error);
        }
      )


   

  }
  showScheduleModel(data){
     
    const modalRef = this.modalService.open(AddTrainingScheduleComponent, { size: 'lg' })
    modalRef.componentInstance.EventObj = data;
    modalRef.componentInstance.title = "Add Trainee";

    modalRef.componentInstance.clickevent.subscribe(($e) => {
      //this.FilterEvent();
      window.location.reload();
    })
  }
  GetScheduleWithParticepants(id: any) {
     
    this.subs.add(

      this.registerService.GetScheduleWithParticepants(id).subscribe(
        (data :any) => {
           

          this.ScheduleDto = data.data;




          console.log("ScheduleDetail", this.ScheduleDto)
          return data;
        },
        (error) => {
          alert(error);
        }
      )
    );

  }

  showAddTrainee(data){
     
    const modalRef = this.modalService.open(AddTraineeComponent, { size: 'lg' })
    modalRef.componentInstance.EventObj = data;
    modalRef.componentInstance.title = "Add Trainer";

    modalRef.componentInstance.clickevent.subscribe(($e) => {
      //this.FilterEvent();
      window.location.reload();
    })
  }
  showAddTrainer(data){
     
    const modalRef = this.modalService.open(AddTrainerComponent, { size: 'lg' })
    modalRef.componentInstance.EventObj = data;
    modalRef.componentInstance.title = "Add Training";

    modalRef.componentInstance.clickevent.subscribe(($e) => {
      //this.FilterEvent();
      window.location.reload();
    })
  }


  




  onPageChange(number: number) {
    
    this.config.currentPage = number;
}

onPageBoundsCorrection(number: number) {
  
    this.config.currentPage = number;
}
 
GetScheduleList() {
   
          this.subs.add(
            this.registerService.GetScheduleList(state,this.text).subscribe(
              (data) => {
      
                this.temp = [...data.result];
      
                this.ScheduleList = data.result;
      console
                return data;
              },
              (error) => {
                alert(error);
              }
            )
          );
        }
        GetSchedulebyUser() {
   
          this.subs.add(
            this.registerService.GetSchedulebyUser(state).subscribe(
              (data) => {
      
                this.temp = [...data.result];
      
                this.ScheduleList = data.result;
      console
                return data;
              },
              (error) => {
                alert(error);
              }
            )
          );
        }
        ChangeStatus(data,status:any) {
          debugger
             this.participantStatusDto.ScheduleId=data.id;
          this.participantStatusDto.ProfileId=data.profileId;
          this.participantStatusDto.Status=status;
       
       
          debugger
          this.subs.add(
            this.registerService.ChangeParticipantsStatus(this.participantStatusDto).subscribe((data) => {
      
      debugger
              this.response = data;
              if(this.response)
              {
                this.toastr.success("Record Added Sucessfully", "Saved", { closeButton: true });
                this.GetSchedulebyUser();
      
              }
              else
              {
                this.toastr.error("Oops Error", "Saved", { closeButton: true });
                
              }
          
              return data;
            },
              (error) => {
                alert(error.message);
              }
            )
          );
        }
      
  GetDailyEngagementPublicList() {
     
            this.subs.add(
              this.registerService.GetDailyEngagementPublicList(state).subscribe(
                (data) => {
        
                  this.temp = [...data.result];
        
                  this.rows = data.result;
        console
                  return data;
                },
                (error) => {
                  alert(error);
                }
              )
            );
          }

  
}

