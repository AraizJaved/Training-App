import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AdminWingService } from 'src/app/shared/services/AdminWingService/AdminWingService';
import { ParameterDTO } from '../ParameterDTO';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-crrsummary',
  templateUrl: './crrsummary.component.html',
  styleUrls: ['./crrsummary.component.scss']
})
export class CRRSummaryComponent implements OnInit {

  CRRSummaryForm: FormGroup;
  private subs = new Subscription();
  crrSummaryList = [];
  parameterDTO: ParameterDTO = new ParameterDTO();
  public searchString: string;
  public loading = false;
  fileName = 'CRR-Summary.xlsx';
  constructor(private readonly adminWingService: AdminWingService, private fb: FormBuilder) { }

  ngOnInit(): void {

    this.CRRSummaryForm = this.fb.group({

      From: ["", Validators.required],
      To: ["", Validators.required],
    });
    this.getCrrSummary()
  }

  getCrrSummary() {
    this.loading = true;

    debugger
    this.parameterDTO.From = this.CRRSummaryForm.controls.From.value;
    this.parameterDTO.To = this.CRRSummaryForm.controls.To.value;
    this.subs.add(
      this.adminWingService.getCrrSummary(this.parameterDTO).subscribe(
        (data) => {
          this.loading = false;

          debugger
          var a = data
          this.crrSummaryList = a.data;
          console.log("CRR List", this.crrSummaryList)
          return this.crrSummaryList;
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
