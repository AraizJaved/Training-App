import { Component, Input, OnInit } from '@angular/core';
import { groupBy } from '@progress/kendo-data-query';

@Component({
  selector: 'app-admin-wing-charts',
  templateUrl: './admin-wing-charts.component.html',
  styleUrls: ['./admin-wing-charts.component.scss']
})
export class AdminWingChartsComponent implements OnInit {
  public detailBar=[]
  public detailSeries=[]
  @Input() vpList;
  constructor() { }

  ngOnInit(): void {


    this.detailBar =[
      {"service":"First","type":"Total Sanctioned","value": this.vpList.reduce((accumulator, current) => accumulator + Number(current['totalSanctioned']), 0) ,"color":"#4F81BD"}
      
      ,{"service":"Second","type":"Total Filled","value":this.vpList.reduce((accumulator, current) => accumulator + Number(current['totalWorking']), 0),"color":"#C0504D"}
      ,{"service":"Third","type":"Total Vacant","value":this.vpList.reduce((accumulator, current) => accumulator + Number(current['vacant']), 0),"color":"#4F81BD"}
      
      ];
  
     this.detailSeries = groupBy(this.detailBar, [{ field: 'type'}]);

    
  }

}
