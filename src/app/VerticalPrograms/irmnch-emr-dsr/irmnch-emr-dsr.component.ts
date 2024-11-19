import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { VerticalProgramsService } from 'src/app/shared/services/VerticalProgramsService/VerticalProgramsService';
import { ParameterDTO } from 'src/app/AdminWing/ParameterDTO';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-irmnch-emr-dsr',
  templateUrl: './irmnch-emr-dsr.component.html',
  styleUrls: ['./irmnch-emr-dsr.component.scss']
})
export class IrmnchEmrDsrComponent implements OnInit {


  IRMNCHForm: FormGroup;
  private subs = new Subscription();
  irmnchEmrDsrList = [];
  parameterDTO: ParameterDTO = new ParameterDTO();
  public searchString: string;
  public loading = false;
  fileName = 'Emr-Dsr-district-wise.xlsx';

  constructor(private readonly verticalProgramsService: VerticalProgramsService, private fb: FormBuilder) { }

  ngOnInit(): void {

    this.IRMNCHForm = this.fb.group({

      From: ["", Validators.required],
      To: ["", Validators.required],
    });

    this.getIrmnchDsr()
  }
  sum(prop) {
    return this.irmnchEmrDsrList.reduce(function (a, b) {
      return a + b[prop];
    }, 0);
  };
  getIrmnchDsr() {
    this.loading = true;

    debugger
    this.parameterDTO.From = this.IRMNCHForm.controls.From.value;
    this.parameterDTO.To = this.IRMNCHForm.controls.To.value;
    this.subs.add(
      this.verticalProgramsService.getIrmnchDsr(this.parameterDTO).subscribe(
        (data) => {
          this.loading = false;

          debugger
          var a = data
          this.irmnchEmrDsrList = a.data;
          console.log("irmnchEmrDsrList", this.irmnchEmrDsrList)
          return this.irmnchEmrDsrList;
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
