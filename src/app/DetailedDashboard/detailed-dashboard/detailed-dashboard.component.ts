import { state } from '@angular/animations';
import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Inject, Input, NgZone, OnDestroy, OnInit, Output, PLATFORM_ID, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { FormIndicatorService } from 'src/app/shared/services/FormIndicatorService/FormIndicatorService';
import { RegisterService } from 'src/app/shared/services/RegisterService/RegisterService';
import { DashboardService } from 'src/app/shared/services/DashboardService/DashboardService';
import { ModalDialogService } from 'ngx-modal-dialog';
import { RegistrationComplianceComponent } from '../registration-compliance/registration-compliance/registration-compliance.component';
import { Router } from '@angular/router';
import { CoreService } from 'src/app/Core/core.service';
import { FilterDTO } from '../filterDto';

@Component({
  selector: 'app-detailed-dashboard',
  templateUrl: './detailed-dashboard.component.html',
  styleUrls: ['./detailed-dashboard.component.scss']
})
export class DetailedDashboardComponent implements OnInit, OnDestroy {

  searchFormHome: FormGroup;

  filterDto: Subject<FilterDTO> = new Subject<FilterDTO>()
  private subs = new Subscription();

  temp: any[];
  ev: any

  public isLoading: boolean

  @Output() district: EventEmitter<string> = new EventEmitter<string>()

  // public polarAreaChartLabels : string[] = ['Download Sales', 'In-Store Sales', 'Mail Sales', 'Telesales', 'Corporate Sales'];
  // public polarAreaChartData: number[]=[300, 500, 100, 40, 120];
  parentSubmitted = false;
  Day: number[] = [
    1, 2, 3, 4, 5]
  Designation: string[] = [
    'UCMO', 'AIC']
  Organization: any[] = [
    { name: 'Government', id: '1' }, { name: 'WHO', id: '2' }, { name: 'Unicef/Coment', id: '3' }, { name: 'Other', id: '4' }]

  Compaign: any[] = []
  currentCompaign: any;

  IndicatorCategory: string[] = [
    'Administrative',
    'Technical']

  constructor(private readonly coreService: CoreService,
    @Inject(PLATFORM_ID) private platformId, private zone: NgZone) {
    this.coreService.loginResponse = JSON.parse(localStorage.getItem('currentUser'))
    this.filterDto.next(new FilterDTO())
  }

  ngOnInit(): void {

  }


  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }


  public onTabChange(ev): void {
    this.filterDto = new Subject<FilterDTO>()
    const localFilterDto: FilterDTO = new FilterDTO()

    setTimeout(() => {
      this.filterDto.next(localFilterDto)
    })

  }


  onSubmitFromHome() {



  }



}
