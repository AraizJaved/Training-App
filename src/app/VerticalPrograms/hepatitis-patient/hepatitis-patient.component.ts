import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { VerticalProgramsService } from 'src/app/shared/services/VerticalProgramsService/VerticalProgramsService';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-hepatitis-patient',
  templateUrl: './hepatitis-patient.component.html',
  styleUrls: ['./hepatitis-patient.component.scss']
})
export class HepatitisPatientComponent implements OnInit {

  @Input()
  isDgKhan: boolean;

  private subs = new Subscription();
  hepatitisCountList = [];
  public searchString: string;
  fileName = 'Hepatitis-patient.xlsx';
  public loading = false;
  constructor(private readonly verticalProgramsService: VerticalProgramsService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getVpSummary()

    console.log("isDgKhan", this.isDgKhan)
  }

  getVpSummary() {
    debugger
    this.loading = true;

    this.subs.add(
      this.verticalProgramsService.getHepatitisCountList().subscribe(
        (data) => {
          this.loading = false;

          debugger
          var a = data
          this.hepatitisCountList = a.data.hepatitisData;
          console.log("hepatitisCountList", this.hepatitisCountList)

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
