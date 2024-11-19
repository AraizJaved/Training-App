import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ParameterDTO } from '../AdminWing/ParameterDTO';
import * as XLSX from 'xlsx';
import { DHISService } from '../shared/services/DHISService/DHISService';

@Component({
  selector: 'app-dhis',
  templateUrl: './dhis.component.html',
  styleUrls: ['./dhis.component.scss']
})
export class DHISComponent implements OnInit {
  DHISForm: FormGroup;
  private subs = new Subscription();
  DHISDataList = [];
  parameterDTO: ParameterDTO = new ParameterDTO();
  public searchString: string;
  public loading = false;
  fileName = 'DHISDataList.xlsx';
  constructor(private readonly DHISService: DHISService, private fb: FormBuilder) { }

  ngOnInit(): void {

    this.DHISForm = this.fb.group({

      From: ["", Validators.required],
      To: ["", Validators.required],
    });

    this.getDHISFn()
  }

  getDHISFn() {
    this.loading = true;
    debugger
    this.parameterDTO.From = this.DHISForm.controls.To.value;
    this.parameterDTO.To = this.DHISForm.controls.To.value;
    this.subs.add(
      this.DHISService.getDHISData(this.parameterDTO).subscribe(
        (data) => {
          this.loading = false;
          var a = data
          this.DHISDataList = a.data.dataValues;
          console.log("DHIS List", this.DHISDataList)
          return this.DHISDataList;
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
