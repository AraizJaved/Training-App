import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { AddEventComponent } from 'src/app/EventCalender//add-event/add-event.component';
import { UpdateMeetingComponent } from 'src/app/EventCalender/update-meeting/update-meeting.component';
import * as XLSX from 'xlsx';

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'
import { DatePipe } from '@angular/common'
@Component({
  selector: 'app-trainee-details',
  templateUrl: './trainee-details.component.html',
  styleUrls: ['./trainee-details.component.scss']
})
export class TraineeDetailsComponent implements OnInit {


  @Input() EventObj: any;
  loading = false;
  parentSubmitted = false;


  constructor(public activeModal: NgbActiveModal, private modalService: NgbModal, public datepipe: DatePipe) {



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





  public exportPDF(data) {
    debugger
    var venue = "";
    if (data?.virtual) {
      venue = "Virtual"
    } else if (data.venueNotAvailable) {
      venue = "Venue Information Not Available"
    } else {
      venue = this.EventObj?.venue
    }
    const doc = new jsPDF('l', 'mm', 'a4');
    let external = []
    let _external = []
    this.EventObj?.trainingList.forEach((ele, index) => {
      external.push(index + 1)
      external.push(ele.title)
      external.push(ele.trainingType)
      external.push(this.datepipe.transform(
        ele.startDate,
        'dd-MM-yyy'
      ))
      external.push(this.datepipe.transform(
        ele.endDate,
        'dd-MM-yyy'
      ))
      _external.push(external);
      external = []
    });

    // doc.addImage('/assets/images/TrainingAppLogo/gov.jpg', 'jpg', 15, 5, 20, 20)
    doc.addImage('/assets/images/TrainingAppLogo/imnchLogo.jpg', 'jpg', 15, 5, 20, 20)
    doc.text('TRAINEE DETAILS', 120, 18);
    doc.addImage('/assets/images/TrainingAppLogo/gov.jpg', 'jpg', 255, 5, 25, 20)
    autoTable(doc, {
      head: [
        [
          {
            content: 'Training Details',
            colSpan: 4,
            styles: { halign: 'center' },
          },
        ],
      ],
      body: [
        [
          'Name: ',
          this.EventObj?.employeeName,
          'CNIC: ',
          this.EventObj?.cnic == null || this.EventObj?.cnic == '' ? 'NILL' : this.EventObj?.cnic,
        ],
        [
          'Working Healthfacility: ',
          this.EventObj?.workingHealthFacility == null || this.EventObj?.workingHealthFacility == '' ? 'NILL' : this.EventObj?.workingHealthFacility,
          'Designation: ',
          this.EventObj?.designation_Name == null || this.EventObj?.designation_Name == '' ? 'NILL' : this.EventObj?.designation_Name,
        ]
      ],
      startY: 30,
      columnStyles: {
        0: { fontStyle: 'bold', cellWidth: 50 },
        1: { cellWidth: 80 },
        2: { fontStyle: 'bold', cellWidth: 50 },
        3: { cellWidth: 88 },

      }
    })

    var options = {
      headStyles: {
        valign: 'middle',
        halign: 'center'
      }
    };

    doc['autoTable'](["PARTICIPANT TRAININGS"], "", options);

    if (this.EventObj?.trainingList.length > 0) {
      doc['autoTable'](['Sr No',
        'Training Title',
        'Training Type',
        'Start Date',
        'End Date'], _external, {
        showHead: "firstPage"
      });
    } else {

      doc['autoTable'](['Sr No',
        'Title',
        'Training Type',
        'Start Date',
        'End Date'], [["No record found"]], {
        showHead: "firstPage"
      });
    }

    doc.save('Trainee Schedule Details')
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

















