import { Component, OnInit } from '@angular/core';
import { SeriesPoint } from "@progress/kendo-angular-charts";
import { RegisterService } from '../shared/services/RegisterService/RegisterService';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ReportingComponent } from '../Reporting/reporting/reporting.component';
import { TrainingReportsComponent } from '../Reports/training-reports/training-reports.component';
import { Router } from '@angular/router';
import * as XLSX from 'XLSX'
import { ScheduleTrainingListComponent } from '../Schedule/schedule-training-list/schedule-training-list.component';
import { TrainingsComponent } from '../trainings/trainings.component';
import { id } from '@swimlane/ngx-datatable';



@Component({
  selector: 'app-counter-dashboard-report',
  templateUrl: './counter-dashboard-report.component.html',
  styleUrls: ['./counter-dashboard-report.component.scss']
})
export class CounterDashboardReportComponent implements OnInit {

  constructor(public _event: RegisterService,
    private modalService: NgbModal, private _route: Router) { }
  public trainingCount: any;
  public data: any = '';
  fileName = '.xlsx';


  public typeWiseTraining: any = [

  ];

  public startDate: Date = null;
  public endDate: Date = null;
  public trainingData: any;


  public monthlyTrainnig: any = [

    {
      period: "January",
      amount: null,
    },
    {
      period: "February",
      amount: null,
    },
    {
      period: "March",
      amount: null,
    },
    {
      period: "April",
      amount: null,
    },
    {
      period: "May",
      amount: null,
    },
    {
      period: "June",
      amount: null,
    },
    {
      period: "July",
      amount: null,
    },
    {
      period: "August",
      amount: null,
    },
    {
      period: "September",
      amount: null,
    },
    {
      period: "October",
      amount: null,
    },
    {
      period: "November",
      amount: null,
    },
    {
      period: "December",
      amount: null,
    }
  ];
  ngOnInit(): void {
    this.counterCard()
    this.totalTrainingMonthCount()
    this.typeWiseTrainingCount()
  }


  public counterCard() {
    this._event.counterCard().subscribe((res: any) => {
      this.trainingData = res;
      console.log('===============================', res);
    })
  }


  public GetTrainings(Id: number) {
    debugger
    if (Id == 1) {
      const modalRef = this.modalService.open(TrainingsComponent, { size: 'xl' })
      modalRef.componentInstance.EventObj = this.trainingData.totalTrainings;
      modalRef.componentInstance.id = Id;
      modalRef.componentInstance.title = "Total Training(S)";

      // modalRef.componentInstance.clickevent.subscribe(($e) => {
      //   window.location.reload();
      // })
    } else if (Id == 2) {

      debugger
      const modalRef = this.modalService.open(TrainingsComponent, { size: 'xl' })
      modalRef.componentInstance.EventObj = this.trainingData.scheduleTrainings;
      modalRef.componentInstance.id = Id;
      modalRef.componentInstance.title = "SCHEDULED TRAINING(S)";

      modalRef.componentInstance.clickevent.subscribe(($e) => {
        window.location.reload();
      })



    } else if (Id == 3) {

      const modalRef = this.modalService.open(TrainingsComponent, { size: 'xl' })
      modalRef.componentInstance.EventObj = this.trainingData.unScheduleTrainings;
      modalRef.componentInstance.title = "UNSCHEDULED TRAINING(S)";

      modalRef.componentInstance.clickevent.subscribe(($e) => {
        window.location.reload();
      })

    } else if (Id == 4) {


      const modalRef = this.modalService.open(TrainingsComponent, { size: 'xl' })
      modalRef.componentInstance.EventObj = this.trainingData.pendingTrainings;
      modalRef.componentInstance.title = "Pending Training(S)";

      modalRef.componentInstance.clickevent.subscribe(($e) => {
        window.location.reload();
      })

    }
  }


  reportTable(): void {
    debugger
    //this.fileName = this.obj.title + ' List.xlsx'
    this.fileName = 'TrainingList.xlsx'
    /* table id is passed over here */
    let element = document.getElementById('reportTable');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);

  }


  showTaskDetailModelView() {
    debugger
    this.data = (<HTMLInputElement>document.getElementById("Filter")).value
    localStorage.setItem('params', this.data);
    const modalRef = this.modalService.open(TrainingReportsComponent, { size: 'xl' })
    modalRef.componentInstance.EventObj = this.data;
    modalRef.componentInstance.title = "View Meeting";

    modalRef.componentInstance.clickevent.subscribe(($e) => {
      window.location.reload();
    })
  }
  public routeToTraining() {
    debugger
    this._route.navigate(['Training'])
  }

  public routeToReporting() {
    debugger
    this._route.navigate(['Reports'])
  }
  public totalTrainingMonthCount() {
    this._event.totalTrainingMonthCount().subscribe((res: any) => {
      res.data.forEach(ele => {

        debugger
        let index = this.monthlyTrainnig.map(e => e.period).indexOf(ele.monthName);

        this.monthlyTrainnig[index].period = ele.monthName;
        this.monthlyTrainnig[index].amount = ele.total_Training;
        // this.cashFlowData.push({
        //   period: ele.monthName,
        //   amount: ele.total_Training,
        // })
      });
      // this.cashFlowData.reverse();
    })
  }


  public typeWiseTrainingCount() {
    this._event.typeWiseTrainingCount().subscribe((res: any) => {
      // this.typeWiseTraining = res.data;
      console.log('==============================================================', res.data)
      res.data.forEach(ele => {
        this.typeWiseTraining.push({
          period: ele.trainingType,
          amount: ele.totalTrainings,
        })
      })
    });
  }


  public pointColor(point: SeriesPoint): string {
    // debugger
    const summary = point.dataItem.summary;

    // point.series.horizontalWaterfall.line.color = 'rgb(255, 255, 255)'
    if (summary) {
      return summary === "total" ? "#555" : "gray";
    }

    if (point.value > 0) {
      return "white";
    } else {
      return "red";
    }
  }

  openModal() {
    debugger
    let ngbModalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false,
      size: 'lg'
    };

    const modalRef = this.modalService.open(ScheduleTrainingListComponent, ngbModalOptions)

    modalRef.componentInstance.title = "Schedule Timing List";
    modalRef.componentInstance.startDate = this.startDate
    modalRef.componentInstance.endDate = this.endDate

    modalRef.componentInstance.clickevent.subscribe(($e) => {
      //this.FilterEvent();
      window.location.reload();
    })
  }


}
