import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AdminWingService } from 'src/app/shared/services/AdminWingService/AdminWingService';
import { ParameterDTO } from '../ParameterDTO';
import * as XLSX from 'XLSX'
import { GroupResult, groupBy } from '../../../../node_modules/@progress/kendo-data-query';
import { AdminWingChartsComponent } from '../admin-wing-charts/admin-wing-charts.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-admin-dept-vacancy-status',
  templateUrl: './admin-dept-vacancy-status.component.html',
  styleUrls: ['./admin-dept-vacancy-status.component.scss']
})
export class AdminDeptVacancyStatusComponent implements OnInit {

  public obj: { id: number, title: string } = {
    id: 0,
    title: ''
  }

  public detailBar=[]
  public detailSeries=[]

  private subs = new Subscription();
  vpList = [];
  parameterDTO: ParameterDTO = new ParameterDTO();
  public searchString: string;
  public loading = false;
  fileName = '.xlsx';


  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly adminWingService: AdminWingService, private fb: FormBuilder,
    private router: Router,private modalService: NgbModal
  ) {
    this.obj.id = this.activatedRoute.snapshot.queryParams.id
    this.obj.title = this.activatedRoute.snapshot.queryParams.title
  }

  ngOnInit(): void {
    this.getVP()
  }


  getVP() {
    this.loading = true;
    debugger
    this.subs.add(
      this.adminWingService.getVPByHF(this.obj.id).subscribe(
        (data) => {
          debugger
          console.log({ data })
          this.loading = false;
          this.vpList = data.data ?? [];
          // console.log("VP List", this.vpList);
   
          //  this.detailBar =[
          //   {"service":"First","type":"Sanctioned","value": this.vpList.reduce((accumulator, current) => accumulator + Number(current['totalSanctioned']), 0) ,"color":"#4F81BD"}
            
          //   ,{"service":"Second","type":"Working","value":this.vpList.reduce((accumulator, current) => accumulator + Number(current['totalWorking']), 0),"color":"#C0504D"}
          //   ,{"service":"Third","type":"Vacant","value":this.vpList.reduce((accumulator, current) => accumulator + Number(current['vacant']), 0),"color":"#4F81BD"}
            
          //   ];
        
          //  this.detailSeries = groupBy(this.detailBar, [{ field: 'type'}]);
          return this.vpList;
        },
        (error) => {
          alert(error);
        }
      )
    );

  }

  

  exportexcel(): void {
    this.fileName = this.obj.title + ' List.xlsx'
    /* table id is passed over here */
    let element = document.getElementById('reportTable');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);

  }

ViewChart(){

  const modalRef =  this.modalService.open(AdminWingChartsComponent, { size: 'lg' });

  modalRef.componentInstance.vpList =  this.vpList;
  
}

}
