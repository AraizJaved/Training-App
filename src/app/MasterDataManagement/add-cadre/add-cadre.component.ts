
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

import { FolderService } from 'src/app/shared/services/FolderService/FolderService';

import { AddMeetingOrganizerComponent } from 'src/app/EventCalender/add-meeting-organizer/add-meeting-organizer.component';
import { AddTrainingLevelComponent } from 'src/app/EventCalender/add-training-level/add-training-level.component';
import { AddQualificationComponent } from 'src/app/Participants/add-qualification/add-qualification.component';
import { AddDocumentTypeComponent } from 'src/app/Schedule/add-document/add-document-type/add-document-type.component';
import { AddTrainingCadreComponent } from 'src/app/EventCalender/add-training-cadre/add-training-cadre.component';

@Component({
  selector: 'app-add-cadre',
  templateUrl: './add-cadre.component.html',
  styleUrls: ['./add-cadre.component.scss']
})
export class AddCadreComponent implements OnInit {

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
  QualificationList: any[] = []
  Cadres: any[] = []

  files = []

  selectedFolderId = null


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

    this.getCadre();
  }

  onPageChange(number: number) {

    this.config.currentPage = number;
  }

  onPageBoundsCorrection(number: number) {

    this.config.currentPage = number;
  }


  getCadre() {
    debugger

    this.subs.add(
      this.registerService.GetCadre().subscribe((data) => {


        this.Cadres = data.data;
        console.log('-----------------------------------', data)
        return data;
      },
        (error) => {
          alert(error.message);
        }
      )
    );
  }





  AddDocumentType() {


    const modalRef = this.modalService.open(AddTrainingCadreComponent, { size: 'lg' });

    modalRef.result.then((data) => {

      this.getCadre();
      //this.FilterEvent()

      //this.activeModal.close()
    }, (reason) => {
      // on dismiss
    });
  }





  onDelete(Id: any) {
    this.registerService.deleteCadre(Id).subscribe((res) => {
      if (!res.isException) {
        this.getCadre();
        this.toastr.success(res.messages, "Delete");

      }
    })
  }



}

