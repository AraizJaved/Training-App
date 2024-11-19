import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { VerticalProgramsService } from 'src/app/shared/services/VerticalProgramsService/VerticalProgramsService';
import { ParameterDTO } from 'src/app/AdminWing/ParameterDTO';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-irmnchdist-wise-patients-summary',
  templateUrl: './irmnchdist-wise-patients-summary.component.html',
  styleUrls: ['./irmnchdist-wise-patients-summary.component.scss']
})
export class IRMNCHDistWisePatientsSummaryComponent implements OnInit {

  IRMNCHForm: FormGroup;
  private subs = new Subscription();
  irmnchPatientsList = [];
  parameterDTO: ParameterDTO = new ParameterDTO();
  public searchString: string;
  public loading = false;
  fileName = 'IRMNCH-district-wise-patients.xlsx';

  constructor(private readonly verticalProgramsService: VerticalProgramsService, private fb: FormBuilder) { }

  ngOnInit(): void {

    this.IRMNCHForm = this.fb.group({

      From: ["", Validators.required],
      To: ["", Validators.required],
    });

    this.getIrmnchPatients()
  }

  getIrmnchPatients() {
    this.loading = true;

    debugger
    this.parameterDTO.From = this.IRMNCHForm.controls.From.value;
    this.parameterDTO.To = this.IRMNCHForm.controls.To.value;
    this.subs.add(
      this.verticalProgramsService.getIrmnchPatients(this.parameterDTO).subscribe(
        (data) => {
          debugger
          this.loading = false;
          var a = data
          this.irmnchPatientsList = a.data;
          console.log("IrmnchPatientsList", this.irmnchPatientsList)
          return this.irmnchPatientsList;
        },
        (error) => {
          alert(error);
        }
      )
    );

  }
  sum(prop) {
    return this.irmnchPatientsList.reduce(function (a, b) {
      return a + b[prop];
    }, 0);
  };
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
