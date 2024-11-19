import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DevelopmentService } from 'src/app/shared/services/DevelopmentService/DevelopmentService';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-hepatitis-procurement',
  templateUrl: './hepatitis-procurement.component.html',
  styleUrls: ['./hepatitis-procurement.component.scss']
})
export class HepatitisProcurementComponent implements OnInit {

  private subs = new Subscription();
  procurementList = [];
  public searchString: string;
  fileName = 'Procurement.xlsx';

  public loading = false;

  constructor(private readonly developmentService: DevelopmentService, private fb: FormBuilder
    , private readonly router: Router) { }

  ngOnInit(): void {
    this.getVpSummary()
  }

  getDeatil(id: any, no: any) {

    this.router.navigate(['procurementDetail'], {
      queryParams: {
        userid: id,
        number: no,
        perfomatytpe: 2
      }
    })
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
          this.procurementList = a.data.procurementDetail;

          this.procurementList = this.procurementList.filter(x => x.userDetail == 'Hepatitis Control Program')

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
