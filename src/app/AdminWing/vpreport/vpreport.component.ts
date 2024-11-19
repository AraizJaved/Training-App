import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { AdminWingService } from 'src/app/shared/services/AdminWingService/AdminWingService';
import * as XLSX from 'xlsx';
import { AdminWingChartsComponent } from '../admin-wing-charts/admin-wing-charts.component';

@Component({
  selector: 'app-vpreport',
  templateUrl: './vpreport.component.html',
  styleUrls: ['./vpreport.component.scss']
})
export class VPReportComponent implements OnInit {


  private subs = new Subscription();
  vpSummaryList = [];
  public searchString: string;
  fileName = 'VP-Report.xlsx';
  public loading = false;
  constructor(private readonly adminWingService: AdminWingService, private fb: FormBuilder,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getVpSummary()
  }

  getVpSummary() {
    debugger
    this.loading = true;

    this.subs.add(
      this.adminWingService.vpSummaryList().subscribe(
        (data) => {
          this.loading = false;

          debugger
          var a = data
          this.vpSummaryList = a.data;
          console.log("VP List", this.vpSummaryList)
          return this.vpSummaryList;
        },
        (error) => {
          alert(error);
        }
      )
    );

  }


  exportexcel(): void {
    /* table id is passed over here */
    let element = document.getElementById('reportTable');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);

  }

  ViewChart(){

    const modalRef =  this.modalService.open(AdminWingChartsComponent, { size: 'lg' });
  
    modalRef.componentInstance.vpList =  this.vpSummaryList;
    
  }
}
