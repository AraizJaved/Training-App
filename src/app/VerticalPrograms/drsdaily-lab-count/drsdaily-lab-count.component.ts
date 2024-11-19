import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { VerticalProgramsService } from 'src/app/shared/services/VerticalProgramsService/VerticalProgramsService';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-drsdaily-lab-count',
  templateUrl: './drsdaily-lab-count.component.html',
  styleUrls: ['./drsdaily-lab-count.component.scss']
})
export class DRSDailyLabCountComponent implements OnInit {


  private subs = new Subscription();
  dRSDailyLabCountList = [];
  public searchString: string;
  fileName = 'DRS-daily-lab-count.xlsx';
  public loading = false;
  constructor(private readonly verticalProgramsService: VerticalProgramsService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getDRSDailyLabCountList()
  }

  getDRSDailyLabCountList() {
    debugger
    this.loading = true;

    this.subs.add(
      this.verticalProgramsService.getDRSDailyLabCountList().subscribe(
        (data) => {
          this.loading = false;

          debugger
          var a = data
          this.dRSDailyLabCountList = a.data;
          console.log("dRSDailyLabCountList", this.dRSDailyLabCountList)
          return this.dRSDailyLabCountList;
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
