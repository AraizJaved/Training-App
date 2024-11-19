import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { ParameterDTO } from 'src/app/AdminWing/ParameterDTO';
import { AdminWingService } from 'src/app/shared/services/AdminWingService/AdminWingService';
import { RegisterService } from 'src/app/shared/services/RegisterService/RegisterService';

@Component({
  selector: 'app-summary-detail',
  templateUrl: './summary-detail.component.html',
  styleUrls: ['./summary-detail.component.scss']
})
export class SummaryDetailComponent implements OnInit {

  @Input() SummeryId : any;
  @Input() Summery : any;
  TOSANForm: FormGroup;
  attachments = [];
  private subs = new Subscription();
  track = [];
  parameterDTO: ParameterDTO = new ParameterDTO();
  public searchString: string;
  public loading = false;
  fileName = 'TOSANDataList.xlsx';
  constructor(private readonly registerService: RegisterService, 
    private readonly  adminWingService : AdminWingService,
    
    private fb: FormBuilder,private modalService: NgbModal) { }

  ngOnInit(): void {

    this.TOSANForm = this.fb.group({

      From: ["", Validators.required],
      To: ["", Validators.required],
    });

    this.getTOSANDetaiil();
    this.getTOSANAttachment();
  }

  openFile(s){
    debugger;
    window.open('https://hrmis.pshealthpunjab.gov.pk/'+s , '_blank')
  }
  getTOSANDetaiil() {
    this.loading = true;
    debugger
   
    this.subs.add(
      this.adminWingService.GetNotesAndSummeriesDetail(this.SummeryId).subscribe(
        (data) => {
          this.loading = false;
          var a = data
          debugger;
          this.track = a.data;
          console.log("TOSAN List", this.track)
          
        },
        (error) => {
          alert(error);
        }
      )
    );

  }
  getTOSANAttachment() {
   
    debugger
   
    this.subs.add(
      this.adminWingService.GetNotesAndSummeriesAttachment(this.SummeryId).subscribe(
        (data) => {
         
          var a = data
          debugger;
          this.attachments = a.applicationAttachments;
          console.log("TOSAN List", this.track)
          
        },
        (error) => {
          alert(error);
        }
      )
    );

  }

    
}


 
 