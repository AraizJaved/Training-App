import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import * as XLSX from 'xlsx';
import { ActivatedRoute } from '@angular/router';
import { DevelopmentService } from 'src/app/shared/services/DevelopmentService/DevelopmentService';

@Component({
  selector: 'app-procurement-detail',
  templateUrl: './procurement-detail.component.html',
  styleUrls: ['./procurement-detail.component.scss']
})
export class ProcurementDetailComponent implements OnInit {

  private subs = new Subscription();
  procurementDetails = [];
  public searchString: string;

  procurementDetailDTO: ProcurementDetailDTO = new ProcurementDetailDTO();

  fileName = 'Leaves Expired Details.xlsx';
  public loading = false;
  public userid: any
  public number: any
  public perfomatytpe: any
  constructor(private readonly activatedRoute: ActivatedRoute, private readonly developmentService: DevelopmentService,) {

    this.userid = this.activatedRoute.snapshot.queryParams.userid
    this.number = this.activatedRoute.snapshot.queryParams.number
    this.perfomatytpe = this.activatedRoute.snapshot.queryParams.perfomatytpe

  }


  ngOnInit(): void {
    debugger
    console.log("Dis", this.userid)
    console.log("Number", this.number)

    this.procurementDetailDTO.userid = this.userid;
    this.procurementDetailDTO.type = this.number;
    this.procurementDetailDTO.perfomatytpe = this.perfomatytpe;
    this.getProcurementDetails();
  }

  getProcurementDetails() {
    this.loading = true;
    debugger
    this.subs.add(
      this.developmentService.getProcurementDetails(this.procurementDetailDTO).subscribe(
        (data) => {
          this.loading = false;
          debugger
          var a = data
          this.procurementDetails = a.data;
          console.log("procurementDetails", this.procurementDetails)
          return this.procurementDetails;
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

export class ProcurementDetailDTO {
  userid: string
  type: number
  perfomatytpe: number
}
