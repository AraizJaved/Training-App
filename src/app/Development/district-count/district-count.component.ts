import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DevelopmentService } from 'src/app/shared/services/DevelopmentService/DevelopmentService';
import { NavService } from 'src/app/shared/services/nav.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-district-count',
  templateUrl: './district-count.component.html',
  styleUrls: ['./district-count.component.scss']
})
export class DistrictCountComponent implements OnInit {

  private subs = new Subscription();
  districtCountList = [];
  public searchString: string;
  fileName = 'District-count.xlsx';
  public loading = false;
  constructor(private readonly developmentService: DevelopmentService, private fb: FormBuilder, private readonly router: Router, public navServices: NavService,) { }

  ngOnInit(): void {
    this.getVpSummary()
  }

  getDeatil(id: any, no: any) {

    this.router.navigate(['procurementDetail'], {
      queryParams: {
        userid: id,
        number: no,
        perfomatytpe: 1
      }
    })
  }

  getVpSummary() {
    debugger
    this.loading = true;

    this.subs.add(
      this.developmentService.getDistrictCountListList().subscribe(
        (data) => {
          this.loading = false;

          debugger
          var a = data
          this.districtCountList = a.data;

          // this.districtCountList = this.districtCountList.filter(x => x.name !== 'Lodhran' && x.in_Process == '0')
          console.log("DistrictCountList List", this.districtCountList)
          return this.districtCountList;
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
