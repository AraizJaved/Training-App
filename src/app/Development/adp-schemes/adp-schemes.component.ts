import { any } from '@amcharts/amcharts4/.internal/core/utils/Array';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DevelopmentService } from 'src/app/shared/services/DevelopmentService/DevelopmentService';
import * as XLSX from 'xlsx';
import adpData from './adpscheme.json';

@Component({
  selector: 'app-adp-schemes',
  templateUrl: './adp-schemes.component.html',
  styleUrls: ['./adp-schemes.component.scss']
})
export class AdpSchemesComponent implements OnInit {
  public DataADPScheme: any
  ngOnInit(): void {

    this.DataADPScheme = (<any>adpData);
    this.DataADPScheme = this.DataADPScheme.RptMPRProjectList;
    console.log("ADP Scheme File", this.DataADPScheme.RptMPRProjectList)


  }


}








  // EmplOnLeaveForm: FormGroup;
  // private subs = new Subscription();
  // adpDetailsList = [];
  // adpCounts: any = [];
  // public searchString: string;
  // public schemeType: any = 0;
  // public activeButton = any;

  // fileName = 'Adp-schemes.xlsx';
  // public loading = false;

  // constructor(private readonly developmentService: DevelopmentService, private fb: FormBuilder) { }

  // ngOnInit(): void {

  //   this.EmplOnLeaveForm = this.fb.group({

  //     From: ["", Validators.required],
  //     To: ["", Validators.required],
  //   });
  //   this.getAdpCounts()
  //   this.getAdpDetails(this.schemeType)
  // }

  // getAdpCounts() {
  //   this.loading = true;

  //   debugger
  //   this.subs.add(
  //     this.developmentService.getAdpCounts().subscribe(
  //       (data) => {
  //         this.loading = false;

  //         debugger
  //         var a = data
  //         this.adpCounts = a.data[0];
  //         console.log("adpCounts", this.adpCounts)

  //       },
  //       (error) => {
  //         alert(error);
  //       }
  //     )
  //   );

  // }

  // setActive(buttonName) {
  //   debugger
  //   this.activeButton = buttonName;
  //   if (buttonName == 'btn1') {
  //     this.schemeType = 1;
  //     this.getAdpDetails(this.schemeType)
  //   }
  //   else if (buttonName == 'btn2') {
  //     this.schemeType = 2;
  //     this.getAdpDetails(this.schemeType)

  //   }
  //   else if (buttonName == 'btn3') {
  //     this.schemeType = 3;
  //     this.getAdpDetails(this.schemeType)

  //   }
  //   else if (buttonName == 'btn4') {
  //     this.schemeType = 0;
  //     this.getAdpDetails(this.schemeType)

  //   }

  // }


  // getAdpDetails(schemeType) {
  //   debugger
  //   this.loading = true;

  //   this.subs.add(
  //     this.developmentService.getAdpDetails(schemeType).subscribe(
  //       (data) => {
  //         this.loading = false;

  //         debugger
  //         var a = data
  //         this.adpDetailsList = a.data;
  //         console.log("adpDetailsList", this.adpDetailsList)

  //       },
  //       (error) => {
  //         alert(error);
  //       }
  //     )
  //   );

  //}


//   exportexcel(): void {
//     /* table id is passed over here */
//     let element = document.getElementById('reportTable');
//     const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

//     /* generate workbook and add the worksheet */
//     const wb: XLSX.WorkBook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

//     /* save to file */
//     XLSX.writeFile(wb, this.fileName);

//   }
// }
