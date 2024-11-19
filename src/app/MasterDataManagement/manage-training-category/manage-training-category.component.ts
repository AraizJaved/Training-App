

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
import { AddMeetingOrganizerComponent } from 'src/app/EventCalender/add-meeting-organizer/add-meeting-organizer.component';

@Component({
  selector: 'app-manage-training-category',
  templateUrl: './manage-training-category.component.html',
  styleUrls: ['./manage-training-category.component.scss']
})
export class ManageTrainingCategoryComponent implements OnInit {

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
  TrainingCategoryList: any[] = []

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

    this.GetTrainingCategory();  
}
 
onPageChange(number: number) {

    this.config.currentPage = number;
  }

  onPageBoundsCorrection(number: number) {

    this.config.currentPage = number;
  }

  GetTrainingCategory() {

    this.subs.add(
      this.registerService.getTrainingCategory(state).subscribe(
        (data) => {
          debugger

          this.temp = [...data.result];

          this.TrainingCategoryList = data.result;
          console
          return data;
        },
        (error) => {
          alert(error);
        }
      )
    );
  }
  AddTrainingCategory() {


    sessionStorage.setItem('Category', 'Trainig Category');
    const modalRef = this.modalService.open(AddMeetingOrganizerComponent, { size: 'lg' });

    modalRef.result.then((data) => {


      this.GetTrainingCategory();
      //this.FilterEvent()

      //this.activeModal.close()
    }, (reason) => {
      // on dismiss
    });
  }

  
  onDelete(Id:any){
    this.registerService.deleteTrainingCategory(Id).subscribe((res)=>{
      if(!res.isException){
        this.GetTrainingCategory();
        this.toastr.success(res.messages, "Delete");

      }
    })
  }

 

}
