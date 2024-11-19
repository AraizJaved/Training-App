import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AdminWingService } from 'src/app/shared/services/AdminWingService/AdminWingService';
import { ParameterDTO } from '../ParameterDTO';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-pendency',
  templateUrl: './pendency.component.html',
  styleUrls: ['./pendency.component.scss']
})
export class PendencyComponent implements OnInit {

  PendancyForm: FormGroup;
  private subs = new Subscription();
  pendencyList = [];
  parameterDTO: ParameterDTO = new ParameterDTO();
  public searchString: string;
  public loading = false;
  fileName = 'Pendency.xlsx';
  constructor(private readonly adminWingService: AdminWingService, private fb: FormBuilder) { }

  ngOnInit(): void {

    this.PendancyForm = this.fb.group({

      From: ["", Validators.required],
      To: ["", Validators.required],
    });

    this.getPendancy()
  }

  getPendancy() {
    this.loading = true;
    debugger
    this.parameterDTO.From = this.PendancyForm.controls.From.value;
    this.parameterDTO.To = this.PendancyForm.controls.To.value;
    this.subs.add(
      this.adminWingService.getPendancy(this.parameterDTO).subscribe(
        (data) => {
          this.loading = false;
          var a = data
          this.pendencyList = a.data.pendancy;
          console.log("Pendency List", this.pendencyList)
          return this.pendencyList;
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
