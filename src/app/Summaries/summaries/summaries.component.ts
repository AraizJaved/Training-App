import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DevelopmentService } from 'src/app/shared/services/DevelopmentService/DevelopmentService';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-summaries',
  templateUrl: './summaries.component.html',
  styleUrls: ['./summaries.component.scss']
})
export class SummariesComponent implements OnInit {

  private subs = new Subscription();
  Summaries: FormGroup;
  healthCouncil = [];
  public searchString: string;
  fileName = 'Summaries.xlsx';
  SummariesDDL: any[] = [
    { name:"Summaries"},
    { name:"Flagship Summaries"},
    { name:"Summaries for CM"} ]
  public loading = false;
  constructor(private readonly developmentService: DevelopmentService, private fb: FormBuilder) { }

  ngOnInit(): void {
   
    this.Summaries = this.fb.group({
      assignTo: ["", Validators.required],
    
    });

  this.getFSSummaries()
    
  }
 
  SummariesType(){

    if(this.Summaries.controls.assignTo.value=='Summaries'){
      this.getSummaries()
  }
  else if(this.Summaries.controls.assignTo.value=='Flagship Summaries'){
    this.getFSSummaries()
  }
  else if(this.Summaries.controls.assignTo.value=='Sumaaries for CM'){
    this.getCMSummaries()
  }

  }
   
  getSummaries() {
    debugger
    this.loading = true;

    this.subs.add(
      this.developmentService.getSummaries().subscribe(
        (data) => {
          this.loading = false;

          debugger
          var a = data
          this.healthCouncil = a.data;
          console.log("healthCouncil List", this.healthCouncil)
          return this.healthCouncil;
        },
        (error) => {
          alert(error);
        }
      )
    );

  }

  getFSSummaries() {
    debugger
    this.loading = true;

    this.subs.add(
      this.developmentService.getFSSummaries().subscribe(
        (data) => {
          this.loading = false;

          debugger
          var a = data
          this.healthCouncil = a.data;
          console.log("healthCouncil List", this.healthCouncil)
          return this.healthCouncil;
        },
        (error) => {
          alert(error);
        }
      )
    );

  }

  getCMSummaries() {
    debugger
    this.loading = true;

    this.subs.add(
      this.developmentService.getCMSummaries().subscribe(
        (data) => {
          this.loading = false;

          debugger
          var a = data
          this.healthCouncil = a.data;
          console.log("healthCouncil List", this.healthCouncil)
          return this.healthCouncil;
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
