import { Component, OnInit, Input } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { AdminWingService } from "src/app/shared/services/AdminWingService/AdminWingService";
import { PaginationDTO } from "../PaginationDTO";
import * as XLSX from "xlsx";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-leaves-expired-details",
  templateUrl: "./leaves-expired-details.component.html",
  styleUrls: ["./leaves-expired-details.component.scss"],
})
export class LeavesExpiredDetailsComponent implements OnInit {
  public obj: { id: any } = {
    id: "",
  };

  AwaitingPostingForm: FormGroup;
  private subs = new Subscription();
  leavesExpiredList = [];
  paginationDTO: PaginationDTO = new PaginationDTO();
  public searchString: string;
  fileName = "Leaves Expired Details.xlsx";
  public loading = false;

  constructor(
    private readonly adminWingService: AdminWingService,
    private fb: FormBuilder,
    private readonly activatedRoute: ActivatedRoute
  ) {
    this.obj.id = this.activatedRoute.snapshot.queryParams.id;
  }

  ngOnInit(): void {
    this.AwaitingPostingForm = this.fb.group({
      From: ["", Validators.required],
      To: ["", Validators.required],
    });
    this.getAwaitingPosting();
  }

  getAwaitingPosting() {
    this.loading = true;
    debugger;
    this.paginationDTO.Skip = "0";
    this.paginationDTO.pagesize = "1000000";
    this.paginationDTO.SignedBy = this.obj.id;
    this.subs.add(
      this.adminWingService
        .getLeavesExpiredDetails({ ...this.paginationDTO })
        .subscribe(
          (data) => {
            this.loading = false;
            debugger;
            var a = data;
            this.leavesExpiredList = a.data.list;
            this.redColorBeforeMonthRecord();
            return this.leavesExpiredList;
          },
          (error) => {
            alert(error);
          }
        )
    );
  }
  public redColorBeforeMonthRecord() {
    let d = new Date();
    this.leavesExpiredList.forEach((eol) => {
      let dd = new Date(eol.toDate);
      if (dd.getMonth() < d.getMonth() || dd.getFullYear() < d.getFullYear()) {
        eol.class = "text-danger";
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
