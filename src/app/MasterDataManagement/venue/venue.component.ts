
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
import { AddMeetingVenueComponent } from 'src/app/EventCalender/add-meeting-venue/add-meeting-venue.component';

@Component({
  selector: 'app-venue',
  templateUrl: './venue.component.html',
  styleUrls: ['./venue.component.scss']
})
export class VenueComponent implements OnInit {

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
  VenueList: any[] = []

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

    this.GetVenue();
  }

  onPageChange(number: number) {

    this.config.currentPage = number;
  }

  onPageBoundsCorrection(number: number) {

    this.config.currentPage = number;
  }

  GetVenue() {

    this.subs.add(
      this.registerService.GetVenues().subscribe(
        (data) => {
          debugger

          this.temp = [...data.data];

          this.VenueList = data.data;
          this.VenueList = this.VenueList.filter(x => x.venue != 'Virtual');
          console
          return data;
        },
        (error) => {
          alert(error);
        }
      )
    );
  }
  AddVenue() {
    sessionStorage.setItem('Category', 'Trainig Category');
    const modalRef = this.modalService.open(AddTrainingLevelComponent, { size: 'lg' });

    modalRef.result.then((data) => {


      this.GetVenue();
      //this.FilterEvent()

      //this.activeModal.close()
    }, (reason) => {
      // on dismiss
    });
  }
  AddMeetingVenue() {

    const modalRef = this.modalService.open(AddMeetingVenueComponent, { size: 'lg' });

    modalRef.result.then((data) => {

      //this.FilterEvent()
      this.GetVenue();
      //this.activeModal.close()
    }, (reason) => {
      // on dismiss
    });
  }



  onDelete(Id: any) {
    this.registerService.deleteTrainingVenue(Id).subscribe((res) => {
      if (!res.isException) {
        this.GetVenue();
        this.toastr.success(res.messages, "Delete");

      }
    })
  }



}
