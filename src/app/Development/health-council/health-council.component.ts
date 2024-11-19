import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DevelopmentService } from 'src/app/shared/services/DevelopmentService/DevelopmentService';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-health-council',
  templateUrl: './health-council.component.html',
  styleUrls: ['./health-council.component.scss']
})
export class HealthCouncilComponent implements OnInit {

  private subs = new Subscription();
  healthCouncil = [];
  public searchString: string;
  fileName = 'Health Council Data.xlsx';
  public loading = false;
  constructor(private readonly developmentService: DevelopmentService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getVpSummary()
  }

  getVpSummary() {
    debugger
    this.loading = true;

    this.subs.add(
      this.developmentService.getHealthCouncilList().subscribe(
        (data) => {
          this.loading = false;

          debugger
          var a = data
          this.healthCouncil = a.data;
          console.log("healthCouncil List", this.healthCouncil)
          return this.healthCouncil;
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
