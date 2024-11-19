


import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-view-external-participent',
  templateUrl: './view-external-participent.component.html',
  styleUrls: ['./view-external-participent.component.scss']
})
export class ViewExternalParticipentComponent implements OnInit {

  @Input() EventObj: any;
  loading = false;
  parentSubmitted = false;


  constructor(public activeModal: NgbActiveModal, private modalService: NgbModal, public datepipe: DatePipe) {
    modalService


  }

  ngOnInit(): void {
    debugger
    console.log("event", this.EventObj);

  }



  CloseModal() {
    this.modalService.dismissAll();
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
   

    // doc.addImage('/assets/images/TrainingAppLogo/gov.jpg', 'jpg', 15, 5, 20, 20)
    doc.addImage('/assets/images/TrainingAppLogo/imnchLogo.jpg', 'jpg', 15, 5, 20, 20)
    doc.text('TRAINEE DETAILS', 120, 18);
    doc.addImage('/assets/images/TrainingAppLogo/gov.jpg', 'jpg', 255, 5, 25, 20)
    autoTable(doc, {
      head: [
        [
          {
            content: 'External Participnt Details',
            colSpan: 4,
            styles: { halign: 'center' },
          },
        ],
      ],
      body: [
        [
          'Name: ',
          this.EventObj?.name,
          'FatherName: ',
          this.EventObj?.fatherName == null || this.EventObj?.fatherName == '' ? 'NILL' : this.EventObj?.fatherName
        ],
        [
          'CNIC: ',
          this.EventObj?.cnic == null || this.EventObj?.cnic == '' ? 'NILL' : this.EventObj?.cnic,
          'Department: ',
          this.EventObj?.department == null || this.EventObj?.department == '' ? 'NILL' : this.EventObj?.department,
        ],
        [
          'Job Title: ',
          this.EventObj?.jobTittle == null || this.EventObj?.jobTittle == '' ? 'NILL' : this.EventObj?.jobTittle,
          'Email: ',
          this.EventObj?.email == null || this.EventObj?.email == '' ? 'NILL' : this.EventObj?.email,
        ],
        [
          'Participant Type: ',
          this.EventObj?.participantType == null || this.EventObj?.participantType == '' ? 'NILL' : this.EventObj?.participantType,
          'Profession: ',
          this.EventObj?.profession == null || this.EventObj?.profession == '' ? 'NILL' : this.EventObj?.profession,
        ],
        [
          'Working Place: ',
          this.EventObj?.workingPlace == null || this.EventObj?.workingPlace == '' ? 'NILL' : this.EventObj?.workingPlace,
          'Mobile No: ',
          this.EventObj?.mobileNo == null || this.EventObj?.mobileNo == '' ? 'NILL' : this.EventObj?.mobileNo,
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
    doc.save('External Participant Training Details')
  }



}
