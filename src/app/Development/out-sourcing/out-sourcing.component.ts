import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DevelopmentService } from 'src/app/shared/services/DevelopmentService/DevelopmentService';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-out-sourcing',
  templateUrl: './out-sourcing.component.html',
  styleUrls: ['./out-sourcing.component.scss']
})
export class OutSourcingComponent implements OnInit {

  private subs = new Subscription();
  outSourcingList = [];
  public searchString: string;
  fileName = 'Out-sourcing.xlsx';
  public loading = false;

  constructor(private readonly developmentService: DevelopmentService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getVpSummary()
  }

  getVpSummary() {
    debugger
    this.loading = true;

    this.subs.add(
      this.developmentService.getProcurementList().subscribe(
        (data) => {
          this.loading = false;
          debugger
          var a = data
          this.outSourcingList = a.data.outsourcingDetail;
          console.log("Procurement List", this.outSourcingList)
          return this.outSourcingList;
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


}
