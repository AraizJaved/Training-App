

import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { DailyEngagementFilterDTO } from 'src/app/Schedule/DailyEngagementFilterDTO';
import { RegisterService } from 'src/app/shared/services/RegisterService/RegisterService';

import { PaginationInstance } from 'ngx-pagination';
import { state } from '@angular/animations';
import { AddTrainingScheduleComponent } from 'src/app/Schedule/add-training-schedule/add-training-schedule.component';
import { ViewScheduleDetailsComponent } from 'src/app/Schedule/view-schedule-details/view-schedule-details.component';
import { AddTraineeComponent } from 'src/app/Schedule/add-trainee/add-trainee.component';
import { AddTrainerComponent } from 'src/app/Schedule/add-trainer/add-trainer.component';
import { AddDocumentComponent } from 'src/app/Schedule/add-document/add-document.component';
import { FolderService } from 'src/app/shared/services/FolderService/FolderService';
import { ViewDocumentsComponent } from 'src/app/Schedule/view-documents/view-documents.component';

@Component({
  selector: 'app-non-digitized-training-data',
  templateUrl: './non-digitized-training-data.component.html',
  styleUrls: ['./non-digitized-training-data.component.scss']
})
export class NonDigitizedTrainingDataComponent implements OnInit {

  private subs = new Subscription();
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

  files = []

  selectedFolderId = null
  TrainingId = null


  public config: PaginationInstance = {
    id: 'advanced',
    itemsPerPage: 10,
    currentPage: 1
  };

  constructor(private readonly registerService: RegisterService, private readonly toastr: ToastrService,
    private readonly router: Router, private modalService: NgbModal, private readonly folderService: FolderService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    //this.GetDailyEngagementPublicList();

    this.GetScheduleList();
    this.GetFolders();


  }
  showSchedule(data) {
    debugger
    let ngbModalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false,
      size: 'lg'
    };



    const modalRef = this.modalService.open(ViewDocumentsComponent, ngbModalOptions)
    modalRef.componentInstance.selectedFolderId = this.selectedFolderId;
    if (data.hasOwnProperty('trainingId')) {
      modalRef.componentInstance.TrainingId = data.trainingId;
    } else {
      modalRef.componentInstance.TrainingId = data.id;
    }
    modalRef.componentInstance.title = "View Documents";

    // this.GetScheduleWithParticepants(data.id);


    this.registerService.GetScheduleWithParticepants(data.id).subscribe(
      (res: any) => {
        debugger

        this.ScheduleDto = res.data;

        console.log("ScheduleDetail", this.ScheduleDto)
        debugger


        return data;
      },
      (error) => {
        alert(error);
      }
    )




  }
  showScheduleModel(data) {
    let ngbModalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false,
      size: 'lg'
    };

    const modalRef = this.modalService.open(AddDocumentComponent, ngbModalOptions)
    modalRef.componentInstance.selectedFolderId = this.selectedFolderId;
    modalRef.componentInstance.title = "ADD DOCUMENTS";

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

    this.subs.add(
      this.registerService.GetPreviousScheduleList(state,this.text).subscribe(
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

  GetFolders() {

    this.subs.add(
      this.folderService.GetAllFolders().subscribe(
        (data) => {
          debugger

          this.temp = [...data.result];

          this.rows = data.result;
          this.selectedFolderId = this.rows.filter(x => x.name == 'Araiz')[0].id;
          // this.GetFiles()
          return data;
        },
        (error) => {
          alert(error);
        }
      )
    );
  }

  GetFiles() {
    debugger
    var id;
    if (this.selectedFolderId == null) {
      id = 0;
    }
    else {
      id = this.selectedFolderId
    }
    this.subs.add(
      this.folderService.GetFiles(id, this.TrainingId).subscribe(
        (data) => {
          debugger

          this.temp = [...data.result];

          this.files = data.result;

          return data;
        },
        (error) => {
          alert(error);
        }
      )
    );
  }

}

