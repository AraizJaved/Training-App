import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AdminWingService } from 'src/app/shared/services/AdminWingService/AdminWingService';
import { PaginationDTO } from '../PaginationDTO';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-awaiting-posting',
  templateUrl: './awaiting-posting.component.html',
  styleUrls: ['./awaiting-posting.component.scss']
})
export class AwaitingPostingComponent implements OnInit {

  AwaitingPostingForm: FormGroup;
  private subs = new Subscription();
  awaitingPostingList = [];
  paginationDTO: PaginationDTO = new PaginationDTO();
  public searchString: string;
  fileName = 'Awaiting-posting.xlsx';
  public loading = false;
  @Input()
  public officerId

  constructor(private readonly adminWingService: AdminWingService, private fb: FormBuilder) { }

  ngOnInit(): void {

    this.AwaitingPostingForm = this.fb.group({

      From: ["", Validators.required],
      To: ["", Validators.required],
    });
    this.getAwaitingPosting()
  }

  getAwaitingPosting() {
    this.loading = true;
    debugger
    this.paginationDTO.Skip = '0'
    this.paginationDTO.pagesize = '1000000'
    this.subs.add(
      this.adminWingService.getAwaitingPosting({ ...this.paginationDTO, officerId: this.officerId }).subscribe(
        (data) => {
          this.loading = false;

          debugger
          var a = data
          this.awaitingPostingList = a.data.list;
          console.log("Awaiting Pending List", this.awaitingPostingList)
          return this.awaitingPostingList;
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
