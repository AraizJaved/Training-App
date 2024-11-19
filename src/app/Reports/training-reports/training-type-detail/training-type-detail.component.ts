

import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UpdateMeetingComponent } from 'src/app/EventCalender/update-meeting/update-meeting.component';

@Component({
  selector: 'app-training-type-detail',
  templateUrl: './training-type-detail.component.html',
  styleUrls: ['./training-type-detail.component.scss']
})
export class TrainingTypeDetailComponent implements OnInit {


  @Input() EventObj: any;
  loading = false;
  parentSubmitted = false;


  constructor(public activeModal: NgbActiveModal, private modalService: NgbModal) {

  }

  ngOnInit(): void {
    debugger
    console.log("event", this.EventObj);
    

  }

  showTaskDetailModelList(data) {
    const modalRef = this.modalService.open(UpdateMeetingComponent, { size: 'lg' })
    modalRef.componentInstance.EventObj = data;
    modalRef.componentInstance.title = "Update Meeting";

    modalRef.componentInstance.clickevent.subscribe(($e) => {

      window.location.reload();
    })

  }
}