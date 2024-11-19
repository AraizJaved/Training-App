import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { AdminWingService } from "src/app/shared/services/AdminWingService/AdminWingService";
import { PaginationDTO } from "../PaginationDTO";
import * as XLSX from "xlsx";

@Component({
  selector: "app-employees-on-leave",
  templateUrl: "./employees-on-leave.component.html",
  styleUrls: ["./employees-on-leave.component.scss"],
})
export class EmployeesOnLeaveComponent implements OnInit {
  public loading = false;
  EmplOnLeaveForm: FormGroup;
  private subs = new Subscription();
  empOnLeaveList = [];
  paginationDTO: PaginationDTO = new PaginationDTO();
  public searchString: string;
  fileName = "Employees-on-leave.xlsx";
  count:number=0;
  @Input()
  public officerId: string;

  constructor(
    private readonly adminWingService: AdminWingService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.EmplOnLeaveForm = this.fb.group({
      From: ["", Validators.required],
      To: ["", Validators.required],
    });
    this.getEmployeesOnLeave();
  }

  getEmployeesOnLeave() {
    debugger;
    this.loading = true;
    this.paginationDTO.Skip = "0";
    this.paginationDTO.pagesize = "1000000";
    this.subs.add(
      this.adminWingService
        .getEmployees({ ...this.paginationDTO, signedBy: this.officerId })
        .subscribe(
          (data) => {
            this.loading = false;
            debugger;
            var a = data;
            this.empOnLeaveList = a.data.list;
            this.redColorCurrentMonthRecord();
            return this.empOnLeaveList;
          },
          (error) => {
            alert(error);
          }
        )
    );
  }
  public redColorCurrentMonthRecord() {
    let d = new Date();
    this.empOnLeaveList.forEach((eol) => {
      
      let dd = new Date(eol.toDate);
      if (d.getMonth() == dd.getMonth() && d.getFullYear()==dd.getFullYear()) {
        eol.class = "text-danger";
        this.count++;
      }
    
    });
  }

  exportexcel(): void {
    /* table id is passed over here */
    let element = document.getElementById("reportTable");
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }
}
