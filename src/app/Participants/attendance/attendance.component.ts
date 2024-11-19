import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

import { RegisterService } from 'src/app/shared/services/RegisterService/RegisterService';
//import { TaskDetailComponent } from '../task-detail/task-detail.component';

import { PaginationControlsComponent, PaginationInstance } from 'ngx-pagination';
import { state } from '@angular/animations';
import { AddTrainingScheduleComponent } from 'src/app/Schedule/add-training-schedule/add-training-schedule.component';
import { ViewEventComponent } from 'src/app/EventCalender/view-event/view-event.component';
import { ViewScheduleDetailsComponent } from 'src/app/Schedule/view-schedule-details/view-schedule-details.component';
import { AddTraineeComponent } from 'src/app/Schedule/add-trainee/add-trainee.component';
import { AddTrainerComponent } from 'src/app/Schedule/add-trainer/add-trainer.component';
import { ParticipantStatusDto } from '../participants-list/participant-status-dto'
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ReplaceTrainerComponent } from 'src/app/Schedule/replace-trainer/replace-trainer.component';
import { ReplaceTraineeComponent } from 'src/app/Schedule/replace-trainee/replace-trainee.component';
import { ReplaceExternalParticipantComponent } from '../replace-external-participant/replace-external-participant.component';
declare var require
const Swal = require('sweetalert2')
@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit {
  private subs = new Subscription();
  @Input() EventObj: any;
  searchText: string;
  temp = [];
  rows = [];
  overdue = [];
  userList = [];
  FilterForm: FormGroup;
  public Trainings: any[] = [];
  participantStatusDto: ParticipantStatusDto = new ParticipantStatusDto();
  isAdmin: boolean
  isAddTask: boolean
  public showBody: boolean
  response: boolean
  counts: any
  User: any
  ScheduleDto: any;
  ParticipantStatusDto: any;
  userDesignation: any
  userId: any
  Status: any
  Priority: any[] = [
    { name: "High" },
    { name: "Medium" },
    { name: "Low" }]
  ScheduleList: any[] = []
  externalParticipantsList: any[] = []
  text='';


  public config: PaginationInstance = {
    id: 'advanced',
    itemsPerPage: 10,
    currentPage: 1
  };
  public data: any;

  constructor(private readonly registerService: RegisterService, private readonly toastr: ToastrService,
    private readonly router: Router, private modalService: NgbModal, private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    //this.GetDailyEngagementPublicList();


    this.GetScheduleList()
      this.showBody = false;



  }



  getExternalParticipants() {
    this.registerService.getParticipant(state).subscribe((res) => {
      debugger
      if(!res.isException){
        this.showBody = true;
        this.externalParticipantsList = res.data
      } else {
        this.toastr.error(res.messages,"Error");
      }
    })
  }

  getTrainings() {
    debugger
    this.subs.add(
      this.registerService.getTrainings().subscribe((data) => {


        this.Trainings = data.data;
        console.log('-----------------------------------', data)
        return data;
      },
        (error) => {
          alert(error.message);
        }
      )
    );
  }
  public ChangeStatus(data, status: any) {
    debugger
    this.participantStatusDto.ScheduleId = data.scheduleId;
    this.participantStatusDto.ProfileId = data.profileId;
    this.participantStatusDto.Status = status;


    debugger
    this.subs.add(
      this.registerService.ChangeAttendanceStatus(this.participantStatusDto).subscribe((data) => {

        debugger
        this.response = data;
        if (this.response) {
          this.toastr.success("Record Added Sucessfully", "Saved", { closeButton: true });
          this.GetScheduleWithParticepants(this.participantStatusDto.ScheduleId)

        }
        else {
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
  public changeExternalParticipantStatus(data, status: any) {
    debugger
    this.participantStatusDto.ScheduleId = data.scheduleId;
    this.participantStatusDto.ProfileId = data.id;
    this.participantStatusDto.Status = status;


    debugger
    this.subs.add(
      this.registerService.changeExternalParticipantStatus(this.participantStatusDto).subscribe((data) => {

        debugger
        this.response = data;
        if (this.response) {
          this.toastr.success("Record Added Sucessfully", "Saved", { closeButton: true });
          this.GetScheduleWithParticepants(this.participantStatusDto.ScheduleId)

        }
        else {
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


  showSchedule(data) {
    debugger
    const modalRef = this.modalService.open(ViewScheduleDetailsComponent, { size: 'lg' });
    // this.GetScheduleWithParticepants(data.id);


    this.registerService.GetScheduleWithParticepants(data.id).subscribe(
      (res: any) => {
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
  public dropdownValueChanged = (value) => {

    debugger

    // console.log(value.target.value);
    // let val = value.target.value.split(' ')[1];
    // var id: number = this.ScheduleList.filter(x => x.title == value)[0].id;
    var id: number = this.ScheduleList.filter(x => x.id == value)[0].id;
    debugger
    if (!value) {
      return;
    }
    if (id == 0) {
      this.showBody = false;
      return;
    }
    this.GetScheduleWithParticepants(id);
    // this.getExternalParticipants();
    this.showBody = true;


  }
  GetScheduleWithParticepants(id: any) {
    debugger

    this.subs.add(

      this.registerService.GetScheduleWithParticepants(id).subscribe(
        (data: any) => {
          debugger

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








  showScheduleModel(data) {

    const modalRef = this.modalService.open(AddTrainingScheduleComponent, { size: 'lg' })
    modalRef.componentInstance.EventObj = data;
    modalRef.componentInstance.title = "Add Trainee";

    modalRef.componentInstance.clickevent.subscribe(($e) => {
      //this.FilterEvent();
      window.location.reload();
    })
  }


  showReplaceTrainee(data) {
    debugger

    const modalRef = this.modalService.open(ReplaceTraineeComponent, { size: 'lg' })
    modalRef.componentInstance.EventObj = data;
    modalRef.componentInstance.title = "Add Trainer";
    modalRef.componentInstance.passEntry.subscribe((receivedEntry) => {
   this.GetScheduleWithParticepants(receivedEntry)

    })
   
    modalRef.componentInstance.clickevent.subscribe(($e) => {
      //this.FilterEvent();
      
      window.location.reload();
    })
  }
  showReplaceTrainer(data) {
   
    debugger
    const modalRef = this.modalService.open(ReplaceTrainerComponent, { size: 'lg' })
    modalRef.componentInstance.EventObj = data;
    modalRef.componentInstance.title = "Add Training";
    modalRef.componentInstance.passEntry.subscribe((receivedTrainer) => {
      debugger
      this.GetScheduleWithParticepants(receivedTrainer)
   
       })

    modalRef.componentInstance.Response.subscribe((res) => {
      this.ChangeStatus(res, res.status)

    })
  }
  showAddExternalModel(data) {
    let ngbModalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false,
      size: 'lg'
    };
    debugger
    const modalRef = this.modalService.open(ReplaceExternalParticipantComponent, ngbModalOptions)

    modalRef.componentInstance.EventObj = data;
    modalRef.componentInstance.title = "Add Meeting";
    modalRef.componentInstance.passEntry.subscribe((receivedTrainer) => {
      debugger
      var contaxt = this;
      this.GetScheduleWithParticepants(receivedTrainer)
      this.CloseModal()
       })

  
  }
  CloseModal() {
    this.modalService.dismissAll();
  }






  onPageChange(number: number) {

    this.config.currentPage = number;
  }

  onPageBoundsCorrection(number: number) {

    this.config.currentPage = number;
  }

  GetScheduleList() {
    debugger
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

