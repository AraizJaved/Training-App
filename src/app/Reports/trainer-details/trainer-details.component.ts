import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { AddEventComponent } from 'src/app/EventCalender//add-event/add-event.component';
import { UpdateMeetingComponent } from 'src/app/EventCalender/update-meeting/update-meeting.component';

@Component({
  selector: 'app-trainer-details',
  templateUrl: './trainer-details.component.html',
  styleUrls: ['./trainer-details.component.scss']
})
export class TrainerDetailsComponent implements OnInit {


  @Input() EventObj : any;
  loading = false;
  parentSubmitted = false;
 

  constructor(public activeModal: NgbActiveModal,private modalService: NgbModal) {

      
    
     }

  ngOnInit(): void {
debugger
  console.log("event",this.EventObj);

  }

  showTaskDetailModelList(data){
    const modalRef = this.modalService.open(UpdateMeetingComponent, { size: 'lg' })
    modalRef.componentInstance.EventObj = data;
    modalRef.componentInstance.title = "Update Meeting";

    modalRef.componentInstance.clickevent.subscribe(($e) => {

      window.location.reload();
    })

  }


  
  exportTableToExcel(tableID, filename = '') {
    debugger
    var downloadLink;
    var dataType = 'application/vnd.ms-excel';
    var tableSelect: any = document.getElementById(tableID);

    var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');
    filename = filename ? filename + '.xls' : 'excel_data.xls';
    downloadLink = document.createElement("a");

    document.body.appendChild(downloadLink);
    const nav = (window.navigator as any);
    if (nav.msSaveOrOpenBlob) {
    } else {
      downloadLink.href = 'data:' + dataType + ', ' + tableHTML;

      downloadLink.download = filename;
      downloadLink.click();
    }
  }
  


}


































