import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { FilterDTO } from '../FilterDTO';
import { RegisterService } from 'src/app/shared/services/RegisterService/RegisterService';
import { TaskDetailComponent } from '../task-detail/task-detail.component';
import { CreateTaskComponent } from '../create-task/create-task.component';
import { PaginationControlsComponent, PaginationInstance } from 'ngx-pagination';
import { SchedulerEvent } from '@progress/kendo-angular-scheduler';
import { SheduleService } from 'src/app/shared/services/ScheduleService/shedule.service';
declare var require
const Swal = require('sweetalert2')

@Component({
  selector: 'app-task-dashboard',
  template: `
        <kendo-scheduler [kendoSchedulerBinding]="events" [selectedDate]="selectedDate" scrollTime="08:00" style="height: 730px;">
            <kendo-scheduler-day-view> </kendo-scheduler-day-view>

            <kendo-scheduler-week-view> </kendo-scheduler-week-view>

            <kendo-scheduler-month-view> </kendo-scheduler-month-view>

            <kendo-scheduler-timeline-view> </kendo-scheduler-timeline-view>

            <kendo-scheduler-agenda-view> </kendo-scheduler-agenda-view>
        </kendo-scheduler>
    `
})
export class TaskDashboardComponent implements OnInit {

  constructor(private readonly _sheduleService: SheduleService) { }

  public baseData: any[] = []
  public events: SchedulerEvent[] = [];
  public selectedDate: Date = null;
  ngOnInit(): void {

    const currentYear = new Date().getFullYear();
    const parseAdjust = (eventDate: string): Date => {
      const date = new Date(eventDate);
      date.setFullYear(currentYear);
      return date;
    };
    this.selectedDate = new Date(currentYear, 0, 1);
    
    const randomInt = (min, max): number => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    this._sheduleService.GetSchedule().subscribe((res: any) => {
      console.log('=====================================', res);
      res.data.forEach((dataItem: { startDate: any; endDate: any; id: any; title: any; venue: any; }) => {
        debugger
        if (dataItem.startDate != null && dataItem.endDate != null) {
          console.log(dataItem.startDate,dataItem.endDate)
          this.events.push(<SchedulerEvent>{
            id: dataItem?.id,
            ownerID:2,  
            start: parseAdjust(dataItem.startDate),
            end: parseAdjust(dataItem.endDate),
            title: dataItem.title,
            description: dataItem.venue,
          })
        }
      })
    })

  }
}
