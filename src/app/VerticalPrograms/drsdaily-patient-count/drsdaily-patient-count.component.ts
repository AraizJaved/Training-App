import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { VerticalProgramsService } from 'src/app/shared/services/VerticalProgramsService/VerticalProgramsService';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-drsdaily-patient-count',
  templateUrl: './drsdaily-patient-count.component.html',
  styleUrls: ['./drsdaily-patient-count.component.scss']
})
export class DRSDailyPatientCountComponent implements OnInit {


  private subs = new Subscription();
  dRSDailyPatientCountList = [];
  public searchString: string;

  fileName = 'DRS-daily-patient-count.xlsx';
  public loading = false;

  constructor(private readonly verticalProgramsService: VerticalProgramsService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getDRSDailyPatientCountList()
  }

  getDRSDailyPatientCountList() {
    debugger
    this.loading = true;


    this.subs.add(
      this.verticalProgramsService.getDRSDailyPatientCountList().subscribe(
        (data) => {
          this.loading = false;

          debugger
          var a = data
          this.dRSDailyPatientCountList = a.data;
          console.log("dRSDailyPatientCountList", this.dRSDailyPatientCountList)
          return this.dRSDailyPatientCountList;
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
