import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ParameterDTO } from '../AdminWing/ParameterDTO';
import * as XLSX from 'xlsx';
import { TrackingofSummariesService } from '../shared/services/TrackingofSummariesService/TrackingofSummariesService';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RegisterService } from '../shared/services/RegisterService/RegisterService';
import { AdminWingService } from '../shared/services/AdminWingService/AdminWingService';
import { SummaryDetailComponent } from './summary-detail/summary-detail.component';
@Component({
  selector: 'app-trackingof-summaries-and-notes',
  templateUrl: './trackingof-summaries-and-notes.component.html',
  styleUrls: ['./trackingof-summaries-and-notes.component.scss']
})
export class TrackingofSummariesAndNotesComponent implements OnInit {
  TOSANForm: FormGroup;
  private subs = new Subscription();
  TOSANDataList = [];
  parameterDTO: ParameterDTO = new ParameterDTO();
  public searchString: string;
  public loading = false;
  fileName = 'TOSANDataList.xlsx';
  constructor(private readonly registerService: RegisterService, 
    private readonly  adminWingService : AdminWingService,
    private readonly TrackingofSummariesService: TrackingofSummariesService,private fb: FormBuilder,private modalService: NgbModal) { }

  ngOnInit(): void {

    this.TOSANForm = this.fb.group({

      From: ["", Validators.required],
      To: ["", Validators.required],
    });

    this.getTOSANFn()
  }

  getTOSANFn() {
    this.loading = true;
    debugger
   
    this.subs.add(
      this.adminWingService.GetNotesAndSummeries().subscribe(
        (data) => {
          this.loading = false;
          var a = data
          debugger;
          this.TOSANDataList = a.data;
          console.log("TOSAN List", this.TOSANDataList)
          
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
  GetSummeryDetail(id: any , obj :any): void {
     

    const modalRef = this.modalService.open(SummaryDetailComponent, { size: 'lg' });
    modalRef.componentInstance.SummeryId = id;
    modalRef.componentInstance.Summery = obj;
    modalRef.componentInstance.title = "Summary Track";
    
  }
}


 
 