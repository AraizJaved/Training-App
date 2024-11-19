

import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { AddEventComponent } from 'src/app/EventCalender//add-event/add-event.component';
import { UpdateMeetingComponent } from 'src/app/EventCalender/update-meeting/update-meeting.component';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'
import { DatePipe } from '@angular/common'
import { ExcelExportService } from 'src/app/shared/services/excel-export.service';
import * as XLSX from 'xlsx';
import { RegisterService } from 'src/app/shared/services/RegisterService/RegisterService';
import { ParticipantStatusDto } from 'src/app/Participants/participants-list/participant-status-dto';

declare var require
const Swal = require('sweetalert2')



@Component({
  selector: 'app-view-schedule-details',
  templateUrl: './view-schedule-details.component.html',
  styleUrls: ['./view-schedule-details.component.scss']
})
export class ViewScheduleDetailsComponent implements OnInit {


  @Input() EventObj: any;
  loading = false;
  parentSubmitted = false;
  private subs = new Subscription();
  participantStatusDto: ParticipantStatusDto = new ParticipantStatusDto();


  constructor(public activeModal: NgbActiveModal, private modalService: NgbModal, public datepipe: DatePipe,
    private _excelExport: ExcelExportService, private readonly registerService: RegisterService) {
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
  CloseModal() {
    this.modalService.dismissAll();
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



  exportExcel(type, fn, dl) {
    debugger
    var elt = document.getElementById('tbl_exporttable_to_xls');
    var wb = XLSX.utils.table_to_book(elt);
    return dl ?
      XLSX.write(wb, { bookType: type, bookSST: true, type: 'base64' }) :
      XLSX.writeFile(wb, fn || ('MySheetName.' + (type || 'xlsx')));
  }
  onDelete(data: any, id: number) {
    this.participantStatusDto.ScheduleId = data.scheduleId;
    this.participantStatusDto.ProfileId = data.profileId;

    debugger
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {

        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false,
    })

    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: false,
      showCancelButton: true,

    }).then((result) => {



      if (result.value) {

        this.subs.add(this.registerService.DeleteFromHRParticepant(this.participantStatusDto).subscribe(
          (res) => {

            if (id == 1) {
              this.EventObj.trainerList = this.EventObj?.trainerList.filter(x => x.profileId != data.profileId)

            } else if (id == 2) {

              this.EventObj.traineeList = this.EventObj?.traineeList.filter(x => x.profileId != data.profileId)
            }

            swalWithBootstrapButtons.fire(
              'Deleted!',
              res.message,
              'success',


            )

          }
        ))

      } else if (
        // Read more about handling dismissals
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Record is Safe :)',
          'error'
        )
      }
    })
  }
  onDeleteExternal(data: any, id: number) {
    this.participantStatusDto.ScheduleId = data.scheduleId;
    this.participantStatusDto.ProfileId = data.id;
    debugger
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {

        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false,
    })

    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: false,
      showCancelButton: true,

    }).then((result) => {



      if (result.value) {

        this.subs.add(this.registerService.DeleteExternalParticipant(this.participantStatusDto).subscribe(
          (res) => {

            if (id == 1) {
              this.EventObj.externalParticipants = this.EventObj?.externalParticipants.filter(x => x.profileId != data.profileId)

            } else if (id == 2) {

              this.EventObj.externalParticipants = this.EventObj?.externalParticipants.filter(x => x.profileId != data.profileId)
            }
            swalWithBootstrapButtons.fire(
              'Deleted!',
              res.message,
              'success',


            )
          }
        ))

      } else if (
        // Read more about handling dismissals
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Record is Safe :)',
          'error'
        )
      }
    })
  }



  // exportExcel(type, fn, dl) {
  //   debugger

  //   let tempArr: any = []
  //   let _tempArr: any = []
  //   // if (this.isTrainee) {
  //     // tempArr = JSON.parse(JSON.stringify(this.traineeWiseReportList));
  //     // tempArr = tempArr.forEach((ele) => {
  //     //   delete ele.id
  //     //   delete ele.profileId
  //     //   _tempArr.push(ele);
  //     // })
  //     // this._excelExport.exportAsExcel({
  //     //   table: null,
  //     //   fileName: fileName,
  //     //   sheetName: 'Sheet 1',
  //     //   data: exportData.externalParticipants,
  //     // })
  //     // tempArr = []





  //     var elt = document.getElementById('tbl_exporttable_to_xls');
  //     var wb = XLSX.utils.table_to_book(elt);
  //     return dl ?
  //       XLSX.write(wb, { bookType: type, bookSST: true, type: 'base64' }):
  //       XLSX.writeFile(wb, fn || ('MySheetName.' + (type || 'xlsx')));


  //   // }
  // }



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
    let externalTraineee = []
    let _externalTrainee = []
    let trainee = []
    let _trainee = []
    let trainer = []
    let _trainer = []
    this.EventObj?.externalParticipants.forEach((ele, index) => {
      if (ele.participantType == 'Trainer') {
        external.push(index + 1)
        external.push(ele.name)
        external.push(ele.fatherName)
        external.push(ele.cnic)
        external.push(ele.participantType)
        external.push(ele.mobileNo)
        external.push(ele.workingPlace)
        _external.push(external);
        external = []
      }
    });
    this.EventObj?.externalParticipants.forEach((ele, index) => {
      if (ele.participantType == 'Trainee') {
        externalTraineee.push(index + 1)
        externalTraineee.push(ele.name)
        externalTraineee.push(ele.fatherName)
        externalTraineee.push(ele.cnic)
        externalTraineee.push(ele.participantType)
        externalTraineee.push(ele.mobileNo)
        externalTraineee.push(ele.workingPlace)
        _externalTrainee.push(externalTraineee);
        externalTraineee = []
      }
    });
    this.EventObj?.trainerList.forEach((ele, index) => {
      trainee.push(index + 1)
      trainee.push(ele.name)
      trainee.push(ele.fatherName)
      trainee.push(ele.cnic)
      trainee.push(ele.participantType)
      trainee.push(ele.mobileNo)
      trainee.push(ele.workingPlace)
      trainee.push(ele.designationName)
      _trainee.push(trainee);
      trainee = []
    });
    this.EventObj?.traineeList.forEach((ele, index) => {
      trainer.push(index + 1)
      trainer.push(ele.name)
      trainer.push(ele.cnic)
      trainer.push(ele.workingPlace)
      trainer.push(ele.workedPlaceAtTraining)
      trainer.push(ele.designationName)
      _trainer.push(trainer);
      trainer = []
    });
    // doc.addImage('/assets/images/TrainingAppLogo/gov.jpg', 'jpg', 15, 5, 20, 20)
    doc.addImage('/assets/images/TrainingAppLogo/imnchLogo.jpg', 'jpg', 15, 5, 20, 20)
    doc.text('TRAINING DETAILS', 120, 18);
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
          'Title: ',
          this.EventObj?.title,

          'Training Category: ',
          this.EventObj?.traingCategore  == null || this.EventObj?.traingCategore == '' ? 'NILL' : this.EventObj?.traingCategore,
        ],
        [
          'Training Type: ',
          this.EventObj?.trainingType == null || this.EventObj?.trainingType == '' ? 'NILL' : this.EventObj?.trainingType,
          'Training Level: ',
          this.EventObj?.trainingLevel == null || this.EventObj?.trainingLevel == '' ? 'NILL' : this.EventObj?.trainingLevel,
        ],
        [
          'Start Date: ',
          this.datepipe.transform(
            this.EventObj?.startDate,
            'dd-MM-yyy'
          ),
          'End Date: ',
          this.datepipe.transform(
            this.EventObj?.endDate,
            'dd-MM-yyy'
          )
        ],
        [
          'Month: ',
          this.EventObj?.month == null || this.EventObj?.month == '' ? 'NILL' : this.EventObj.month,
          'Year: ',
          this.EventObj?.year == null || this.EventObj.year == '' ? 'NILL' : this.EventObj?.year,
        ],

        [
          'Organized By: ',
          this.EventObj?.organizedBy == null || this.EventObj?.organizedBy == '' ? 'NILL' : this.EventObj?.organizedBy,
          'Supported By: ',
          this.EventObj?.supportedBy == null || this.EventObj?.supportedBy == '' ? 'NULL' : this.EventObj?.supportedBy
        ],

        [
          'Venue',
          venue == null || venue == '' ? 'NILL' : venue,
          'Total Participants: ',
          this.EventObj?.totalParticipants == null || this.EventObj?.totalParticipants == 0 ? 'NILL' : this.EventObj?.totalParticipants

        ],
        [
          'Division',
          this.EventObj?.division == null || this.EventObj?.division == '' ? 'NILL' : this.EventObj?.division,
          'District: ',
          this.EventObj?.district == null || this.EventObj?.district == '' ? 'NILL' : this.EventObj?.district,
        ],
        [

          'Tehsil: ',
          this.EventObj?.tehsil == null || this.EventObj?.tehsil == '' ? 'NILL' : this.EventObj?.tehsil,
          'Departments: ',
          this.EventObj?.departments == null || this.EventObj?.departments == '' ? 'NILL' : this.EventObj?.departments,

        ],
        [
          'Cadre: ',
          this.EventObj?.cadre == null || this.EventObj?.cadre == '' ? 'NILL' : this.EventObj?.cadre,
          'Description: ',
          this.EventObj?.description == null || this.EventObj?.description == '' ? 'NILL' : this.EventObj?.description,
        ],
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

    doc['autoTable'](["TRAINER - External Participants (Personnel not registered in HRMIS)"], "", options);

    if (this.EventObj?.externalParticipants.length > 0) {
      doc['autoTable'](['Sr No',
        'Name',
        'Father Name',
        'CNIC',
        'Participant Type',
        'Mobile No',
        'Working Place'], _external, {
        showHead: "firstPage"
      });
    } else {

      doc['autoTable'](['Sr No',
        'Name',
        'Father Name',
        'CNIC',
        'Participant Type',
        'Mobile No',
        'Working Place'], [["No record found"]], {
        showHead: "firstPage"
      });
    }

    doc['autoTable'](["TRAINER - External Participants (Personnel not registered in HRMIS)"], "", options);
    if (this.EventObj?.externalParticipants.length > 0) {
      doc['autoTable'](['Sr No',
        'Name',
        'Father Name',
        'CNIC',
        'Participant Type',
        'Mobile No',
        'Working Place'], _externalTrainee, {
        showHead: "firstPage"
      });
    } else {

      doc['autoTable'](['Sr No',
        'Name',
        'Father Name',
        'CNIC',
        'Participant Type',
        'Mobile No',
        'Working Place'], [["No record found"]], {
        showHead: "firstPage"
      });
    }

    doc['autoTable'](["TRAINER - Participants (Personnel registered in HRMIS)"], "", options);

    if (this.EventObj?.trainerList.length > 0) {
      doc['autoTable'](['Sr No',
        'Name',
        'Father Name',
        'CNIC',
        'Participant Type',
        'Mobile No',
        'Working Place',
        'Designation Name'], _trainee, {
        showHead: "firstPage"
      });

    } else {
      doc['autoTable'](['Sr No',
        'Name',
        'Father Name',
        'CNIC',
        'Participant Type',
        'Mobile No',
        'Working Place',
        'Designation Name'], [["No record found"]], {
        showHead: "firstPage"
      });
    }

    // doc.text('TRAINEE', 120, 18);
    doc['autoTable'](["TRAINEE - Participants (Personnel registered in HRMIS)"], "", options);

    if (this.EventObj?.traineeList.length > 0) {
      doc['autoTable'](['Sr No',
        'Name',
        'CNIC',
        'Working Place',
        'Work Place At Training',
        'Designation Name'], _trainer, {
        showHead: "firstPage"
      });
    } else {
      doc['autoTable'](['Sr No',
        'Name',
        'CNIC',
        'Working Place',
        'Work Place At Training',
        'Designation Name'], [["No record found"]], {
        showHead: "firstPage"
      });
    }


    doc.save('Training Details')
  }


}

