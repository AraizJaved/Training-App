import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { DailyEngagementFilterDTO } from '../DailyEngagementFilterDTO';
import { RegisterService } from 'src/app/shared/services/RegisterService/RegisterService';

import { PaginationControlsComponent, PaginationInstance } from 'ngx-pagination';
import { ExcelExportService } from '../../shared/services/excel-export.service'
import { state } from '@angular/animations';
import { AddTrainingScheduleComponent } from 'src/app/Schedule/add-training-schedule/add-training-schedule.component';
import { ViewScheduleDetailsComponent } from '../view-schedule-details/view-schedule-details.component';
import { AddTraineeComponent } from '../add-trainee/add-trainee.component';
import { AddTrainerComponent } from '../add-trainer/add-trainer.component';
import { AddExistingTrainingComponent } from 'src/app/EventCalender/add-existing-training/add-existing-training.component';
import { ExternalParticepantDropDownComponent } from 'src/app/Participants/external-particepant-drop-down/external-particepant-drop-down.component';


@Component({
  selector: 'app-schedule-training-list',
  templateUrl: './schedule-training-list.component.html',
  styleUrls: ['./schedule-training-list.component.scss']
})
export class ScheduleTrainingListComponent implements OnInit {

  private subs = new Subscription();

  @Input() startDate: any;
  @Input() endDate: any;
  text='';

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
    private readonly router: Router, private modalService: NgbModal, private formBuilder: FormBuilder,
    private _excelExport: ExcelExportService
  ) { }

  ngOnInit(): void {

    //this.GetDailyEngagementPublicList();

    this.GetScheduleList();
    console.log('===========================', typeof this.startDate)
    console.log('===========================', typeof this.endDate)


  }



  exportToExcel() {
    this._excelExport.exportAsExcel({
      table: null,
      fileName: 'Training Report',
      sheetName: 'Sheet 1',
      data: this.ScheduleList,
    })
  }

  showSchedule(data) {

    let ngbModalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false,
      size: 'lg'
    };

    const modalRef = this.modalService.open(ViewScheduleDetailsComponent, ngbModalOptions)


    // this.GetScheduleWithParticepants(data.id);


    this.registerService.GetScheduleWithParticepants(data.id).subscribe(
      (res: any) => {


        this.ScheduleDto = res.data;
        modalRef.componentInstance.EventObj = this.ScheduleDto;
        console.log("ScheduleDetail", this.ScheduleDto)

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
  showAddExternalModel(data) {
    let ngbModalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false,
      size: 'lg'
    };

    const modalRef = this.modalService.open(ExternalParticepantDropDownComponent, ngbModalOptions)

    modalRef.componentInstance.EventObj = data;
    modalRef.componentInstance.title = "Add Meeting";

    modalRef.componentInstance.clickevent.subscribe(($e) => {

      window.location.reload();
    })
  }
  AddExistingTrainingModel(data) {
    let ngbModalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false,
      size: 'lg'
    };

    const modalRef = this.modalService.open(AddExistingTrainingComponent, ngbModalOptions)

    modalRef.componentInstance.EventObj = data;
    modalRef.componentInstance.title = "Add Meeting";

    modalRef.componentInstance.clickevent.subscribe(($e) => {

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

    const modalRef = this.modalService.open(AddTrainerComponent, ngbModalOptions);


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

    debugger
    this.subs.add(
      this.registerService.GetScheduleList(state,this.text).subscribe(
        (data) => {

          this.temp = [...data.result];

          this.ScheduleList = data.result;
          this.ScheduleList = this.ScheduleList.filter(x => new Date(x.startDate) >= new Date(this.startDate) && new Date(x.endDate) <= new Date(this.endDate));
          return data;
        },
        (error) => {
          alert(error)
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


  CloseModal() {
    this.modalService.dismissAll();
  }



}
