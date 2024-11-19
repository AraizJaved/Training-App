

import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { DailyEngagementFilterDTO } from 'src/app/Schedule/DailyEngagementFilterDTO';
import { RegisterService } from 'src/app/shared/services/RegisterService/RegisterService';
//import { TaskDetailComponent } from '../task-detail/task-detail.component';

import { PaginationControlsComponent, PaginationInstance } from 'ngx-pagination';
import { state } from '@angular/animations';
import { AddTrainingScheduleComponent } from 'src/app/Schedule/add-training-schedule/add-training-schedule.component';
import { ViewEventComponent } from 'src/app/EventCalender/view-event/view-event.component';
import { ViewScheduleDetailsComponent } from 'src/app/Schedule/view-schedule-details/view-schedule-details.component';
import { AddTraineeComponent } from 'src/app/Schedule/add-trainee/add-trainee.component';
import { AddTrainerComponent } from 'src/app/Schedule/add-trainer/add-trainer.component';
import { ExternalParticipantComponent } from 'src/app/Schedule/external-participant/external-participant.component';
import { ViewExternalParticipentComponent } from '../view-external-participent/view-external-participent.component';
declare var require
const Swal = require('sweetalert2')
@Component({
  selector: 'app-exparticipants',
  templateUrl: './exparticipants.component.html',
  styleUrls: ['./exparticipants.component.scss']
})
export class ExparticipantsComponent implements OnInit {
  private subs = new Subscription();

  searchText: string;
  temp = [];
  rows = [];
  overdue = [];
  userList = [];
  FilterForm: FormGroup;
  DailyEngagementFilterDTO: DailyEngagementFilterDTO = new DailyEngagementFilterDTO()
  isAdmin: boolean
  isAddTask: boolean
  counts: any
  User: any
  ScheduleDto: any;
  userDesignation: any
  userId: any
  Status: any
  Priority: any[] = [
    { name: "High" },
    { name: "Medium" },
    { name: "Low" }]
  ScheduleList: any[] = []


  public config: PaginationInstance = {
    id: 'advanced',
    itemsPerPage: 10,
    currentPage: 1
  };

  constructor(private readonly registerService: RegisterService, private readonly toastr: ToastrService,
    private readonly router: Router, private modalService: NgbModal, private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    //this.GetDailyEngagementPublicList();

    // this.GetExParticipantList();
    this.GetExParticipantLists();



  }
  showAddExternalModel(s = null) {
    debugger
    if (s != null) {
      let ngbModalOptions: NgbModalOptions = {
        backdrop: 'static',
        keyboard: false,
        size: 'lg'
      };
      const modalRef = this.modalService.open(ExternalParticipantComponent, ngbModalOptions)
      modalRef.componentInstance.EventObj = s;

      modalRef.componentInstance.passParticipantData.subscribe(($e) => {
        this.GetExParticipantList();
        // window.location.reload();
      })
    } else {
      let ngbModalOptions: NgbModalOptions = {
        backdrop: 'static',
        keyboard: false,
        size: 'lg'
      };
      debugger
      const modalRef = this.modalService.open(ExternalParticipantComponent, ngbModalOptions)


      modalRef.componentInstance.title = "Add Meeting";

      modalRef.componentInstance.passParticipantData.subscribe(($e) => {
        this.GetExParticipantList();
        // window.location.reload();
      })
    }

  }

  editTraining(s) {
    this.showAddExternalModel(s)
  }

  showSchedule(data) {
    debugger
    let ngbModalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false,
      size: 'lg'
    };

    const modalRef = this.modalService.open(ViewScheduleDetailsComponent, ngbModalOptions)


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
  showParticipent(data) {

    debugger
    let ngbModalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false,
      size: 'lg'
    };

    const modalRef = this.modalService.open(ViewExternalParticipentComponent, ngbModalOptions)


    // this.GetScheduleWithParticepants(data.id);


    debugger


    modalRef.componentInstance.EventObj = data;
    console.log("ScheduleDetail", this.ScheduleDto)
    debugger
    modalRef.componentInstance.title = "View Training";

    modalRef.componentInstance.clickevent.subscribe(($e) => {
      //this.FilterEvent();
      window.location.reload();
    })








  }
  showScheduleModel(data) {
    let ngbModalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false,
      size: 'lg'
    };

    const modalRef = this.modalService.open(AddTrainingScheduleComponent, ngbModalOptions)

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
        (data: any) => {


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

  showAddTrainee(data) {
    let ngbModalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false,
      size: 'lg'
    };

    const modalRef = this.modalService.open(AddTraineeComponent, ngbModalOptions);


    modalRef.componentInstance.EventObj = data;
    modalRef.componentInstance.title = "Add Trainer";

    modalRef.componentInstance.clickevent.subscribe(($e) => {
      //this.FilterEvent();
      window.location.reload();
    })
  }
  showAddTrainer(data) {
    let ngbModalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false,
      size: 'lg'
    };

    const modalRef = this.modalService.open(AddTrainerComponent, { size: 'lg' });


    modalRef.componentInstance.EventObj = data;
    modalRef.componentInstance.title = "Add Training";

    modalRef.componentInstance.clickevent.subscribe((data: any) => {
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

  GetExParticipantList() {

    this.subs.add(
      this.registerService.GetParticipantList(state).subscribe(
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
  GetExParticipantLists() {

    this.subs.add(
      this.registerService.GetParticipantLists(state).subscribe(
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

  public openFile() {
    window.open("assets/PDF/PARTICIPANT MANAGEMENT - EXTERNAL PARTICIPANTS.pdf");
  }



  onDelete(id: any) {
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

        this.subs.add(this.registerService.deleteTrainingExternalParticipant(id).subscribe(
          (data) => {

            swalWithBootstrapButtons.fire(
              'Deleted!',
              data.message,
              'success',
              this.GetExParticipantList(),

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
}
