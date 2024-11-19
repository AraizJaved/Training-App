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



@Component({
  selector: 'app-manage-training-type',
  templateUrl: './manage-training-type.component.html',
  styleUrls: ['./manage-training-type.component.scss']
})
export class ManageTrainingTypeComponent implements OnInit {

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
    TrainingTypeList: any[] = []

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

    this.GetTrainingType();  
}
 
onPageChange(number: number) {

    this.config.currentPage = number;
  }

  onPageBoundsCorrection(number: number) {

    this.config.currentPage = number;
  }

  GetTrainingType() {

    this.subs.add(
      this.registerService.getTrainingType().subscribe(
        (data) => {
          debugger

          this.temp = [...data.data];

          this.TrainingTypeList = data.data;
          console
          return data;
        },
        (error) => {
          alert(error);
        }
      )
    );
  }
  AddTrainingType() {

    sessionStorage.setItem('Category', 'Trainig Type');
    const modalRef = this.modalService.open(AddMeetingOrganizerComponent, { size: 'lg' });

    modalRef.result.then((data) => {

      this.GetTrainingType();
      //this.FilterEvent()

      //this.activeModal.close()
    }, (reason) => {
      // on dismiss
    });
  }


  
  onDelete(Id:any){
    this.registerService.deleteTrainingType(Id).subscribe((res)=>{
      if(!res.isException){
        this.GetTrainingType();
        this.toastr.success(res.messages, "Delete");

      }
    })
  }
 

 

}
