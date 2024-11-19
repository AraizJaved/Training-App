import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { AddEventComponent } from '../add-event/add-event.component';
import { UpdateMeetingComponent } from '../update-meeting/update-meeting.component';

@Component({
  selector: 'app-view-event',
  templateUrl: './view-event.component.html',
  styleUrls: ['./view-event.component.scss']
})
export class ViewEventComponent implements OnInit {

  @Input() EventObj: any;
  loading = false;
  parentSubmitted = false;


  constructor(public activeModal: NgbActiveModal, private modalService: NgbModal) {
    modalService


  }

  ngOnInit(): void {
    debugger
    console.log("event", this.EventObj);

  }

  showTaskDetailModelList(data) {
    let ngbModalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false,
      size: 'lg'
    };

    const modalRef = this.modalService.open(UpdateMeetingComponent, ngbModalOptions)
    modalRef.componentInstance.EventObj = data;
    modalRef.componentInstance.title = "Update Meeting";

    modalRef.componentInstance.clickevent.subscribe(($e) => {

      window.location.reload();
    })

  }
  CloseModal() {
    this.modalService.dismissAll();
  }



}
