import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DevelopmentService } from 'src/app/shared/services/DevelopmentService/DevelopmentService';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-cdsldata',
  templateUrl: './cdsldata.component.html',
  styleUrls: ['./cdsldata.component.scss']
})
export class CDSLDataComponent implements OnInit {

  private subs = new Subscription();
  procurementList = [];
  public searchString: string;
  fileName = 'CDSLData.xlsx';

  public loading = false;

  constructor(private readonly developmentService: DevelopmentService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getVpSummary()
  }

  getVpSummary() {
    debugger
    this.loading = true;

    this.subs.add(
      this.developmentService.getCDSLDataList().subscribe(
        (data) => {
          this.loading = false;
          debugger
          var a = data
          this.procurementList = a.data.apiData;
          console.log("Procurement List", this.procurementList)
          return this.procurementList;
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
