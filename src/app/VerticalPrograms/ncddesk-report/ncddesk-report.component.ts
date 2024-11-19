import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { VerticalProgramsService } from 'src/app/shared/services/VerticalProgramsService/VerticalProgramsService';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-ncddesk-report',
  templateUrl: './ncddesk-report.component.html',
  styleUrls: ['./ncddesk-report.component.scss']
})
export class NCDDeskReportComponent implements OnInit {

  private subs = new Subscription();
  ncdDailyReportList = [];
  public searchString: string;
  fileName = 'NCD-daily-desk-report.xlsx';
  public loading = false;
  constructor(private readonly verticalProgramsService: VerticalProgramsService, private fb: FormBuilder) { }

  ngOnInit(): void {

    this.getNcdDailyReportList()
  }

  getNcdDailyReportList() {
    debugger
    this.loading = true;

    this.subs.add(
      this.verticalProgramsService.getNcdDailyReportList().subscribe(
        (data) => {
          this.loading = false;

          debugger
          var a = data
          this.ncdDailyReportList = a.data.info.ncdDesk;
          console.log("ncdDailyReportList", this.ncdDailyReportList)
          return this.ncdDailyReportList;
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
