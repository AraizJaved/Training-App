

import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { DailyEngagementFilterDTO } from 'src/app/Schedule/DailyEngagementFilterDTO';
import { RegisterService } from 'src/app/shared/services/RegisterService/RegisterService';
//import { TaskDetailComponent } from '../task-detail/task-detail.component';
import * as XLSX from 'XLSX'
import { PaginationControlsComponent, PaginationInstance } from 'ngx-pagination';
import { state } from '@angular/animations';
import { AddTrainingScheduleComponent } from 'src/app/Schedule/add-training-schedule/add-training-schedule.component';
import { ViewEventComponent } from 'src/app/EventCalender/view-event/view-event.component';
import { ViewScheduleDetailsComponent } from 'src/app/Schedule/view-schedule-details/view-schedule-details.component';
import { AddTraineeComponent } from 'src/app/Schedule/add-trainee/add-trainee.component';
import { AddTrainerComponent } from 'src/app/Schedule/add-trainer/add-trainer.component';
import { TrainingTypeDetailComponent } from './training-type-detail/training-type-detail.component';
import { TraineeDetailsComponent } from '../trainee-details/trainee-details.component';
import { TrainerDetailsComponent } from '../trainer-details/trainer-details.component';
import { SheduleService } from 'src/app/shared/services/ScheduleService/shedule.service';
import { ExcelExportService } from 'src/app/shared/services/excel-export.service';
import { ScheduleTrainingListComponent } from 'src/app/Schedule/schedule-training-list/schedule-training-list.component';
import { DatePipe } from '@angular/common';
declare var require
const Swal = require('sweetalert2')
@Component({
  selector: 'app-training-reports',
  templateUrl: './training-reports.component.html',
  styleUrls: ['./training-reports.component.scss']
})
export class TrainingReportsComponent implements OnInit {
  public Trainings: any[] = [];
  public startDate: Date = null;
  public endDate: Date = null;
  private subs = new Subscription();
  fileName = '.xlsx';
  searchText: string;
  temp = [];
  rows = [];
  overdue = [];
  userList = [];
  FilterForm: FormGroup;
  DailyEngagementFilterDTO: DailyEngagementFilterDTO = new DailyEngagementFilterDTO()
  isAdmin: boolean
  isAddTask: boolean
  counts: any
  User: any
  ScheduleDto: any;
  ParticepantDetail: any;
  TrainingDetailDto: any;
  TrainerDetail: any;
  ReportDto: any;
  userDesignation: any
  _divion: any
  userId: any
  Status: any
  Filterloc: any
  public trainingBody: boolean
  public ScheduleBody: boolean
  public trainingTypeBody: boolean
  public traineeBody: boolean
  public ExternalBody: boolean
  public trainerBody: boolean
  public VenueBody: boolean
  public DepartmentBody: boolean
  public TrainingLevelBody: boolean
  public CadreBody: boolean
  public CategoryBody: boolean
  public FilterTrainingTittleBody: boolean
  public FilterVenuBody: boolean
  public Filterbody: boolean
  public isShow: boolean = true
  public tempDto: any = [];
  public Designations: [] = [];
  public DesignationId: any;
  TrainingLevels: any[] = [];
  tempTrainig: any[] = [];
  public TrainingType: any[] = [];
  public TrainingLevel: any;
  public Venues: any[] = [];
  public TrainigCategory: any[] = [];
  public FilterTrainingTittle: any[] = [];
  public FilterVenue: any[] = [];
  public FilterList: any[] = [];
  public traineeWiseReportList: any[] = [];
  public trainerWiseReportList: any[] = [];
  public ExternalList: any[] = [];
  public divisions: Array<{ name: string, code: string }> = [];
  public districts: Array<{ name: string, code: string }> = [];
  public tehsils: Array<{ name: string, code: string }> = [];
  public hfTypes: Array<{ Name: string, Code: string }> = [];
  OrganizedBys: any[] = [];
  SupportedBys: any[] = [];
  public data: any
  Priority: any[] = [
    { name: "High" },
    { name: "Medium" },
    { name: "Low" }]
  ScheduleList: any[] = []
  loading = false;

  public config: PaginationInstance = {
    id: 'advanced',
    itemsPerPage: 10,
    currentPage: 1
  };

  public isTrainee: boolean = false;
  public isTrainer: boolean = false;

  constructor(private readonly registerService: RegisterService, private readonly toastr: ToastrService,
    private readonly router: Router, private modalService: NgbModal, private formBuilder: FormBuilder,
    public sheduleService: SheduleService, private _excelExport: ExcelExportService,
    private datePipe: DatePipe) { }

  ngOnInit(): void {

    debugger

    this.getTrainingType()

    //this.GetDailyEngagementPublicList();

    this.GetScheduleList();
    this.showTrainingWiseReport();


    this.loadDesignation();


    this.getTrainingLevel()
    this.GetVenues();
    // this.showTrainingBody();
    this.getTrainings();
    this.getDivision();
    this.getTrainingCategory()
    this.getOrganizedBy();
    this.getSupportedBy();
    this.showScheduleBody();

    let data = localStorage.getItem('params');

    if (data == '1') {
      this.isShow = false;
      this.showTrainingBody()
    } else if (data == '2') {
      this.isShow = false;
      this.showTrainingTypeBody()
    } else if (data == '3') {
      this.isShow = false;
      this.showTraineeBody()
    }
    else if (data == '4') {
      this.isShow = false;
      this.showTrainerBody()
    }
    else if (data == '5') {
      this.isShow = false;
      this.showCadreBody()
    }
    else if (data == '6') {
      this.isShow = false;
      this.showTrainingLevelBody()
    }
    else if (data == '8') {
      this.isShow = false;
      this.showDepartmentBody()
    }
    else if (data == '7') {
      this.isShow = false;
      this.showCategoryBody()
    }
    else if (data == '9') {
      this.isShow = false;
      this.showVenueBody()
    }
    else if (data == '10') {
      this.isShow = false;
      this.showScheduleBody()
    }


  }





  getOrganizedBy() {

    this.subs.add(
      this.registerService.getOrganizedBy(state).subscribe(
        (data) => {


          this.temp = [...data.data];

          this.OrganizedBys = data.data;

          console.log('///////////////////////////////////////', this.OrganizedBys)
          return data;
        },
        (error) => {
          alert(error);
        }
      )
    );
  }
  getSupportedBy() {

    this.subs.add(
      this.registerService.GetSupportedBy(state).subscribe(
        (data) => {

          this.temp = [...data.data];

          this.SupportedBys = data.data;

          return data.data;
        },
        (error) => {
          alert(error);
        }
      )
    );
  }
  public dropdownValueChanged = (value, filter) => {
    debugger

    debugger
    console.log(value.target.value);
    let val = value.target.value
    this.isTrainer = false;
    this.isTrainee = false;
    if (!value) {
      return;
    }
    if (filter == 'Div') {
      debugger
      this.Filterloc = this.divisions.filter(x => x.name == val)[0];
      this.FilterList = this.ScheduleList.filter(x => x.division == this.Filterloc.name);
      this.loadDistrict(this.Filterloc.code);
      // this._divion= (<HTMLInputElement>document.getElementById("div")).value;


    }
    if (filter == 'Dis') {
      this.Filterloc = this.districts.filter(x => x.name == val)[0];
      this.FilterList = this.ScheduleList.filter(x => x.district == this.Filterloc.name);
      this.loadTehsils(this.Filterloc.code);

    }
    if (filter == 'Teh') {
      this.Filterloc = this.tehsils.filter(x => x.name == val)[0];
      this.FilterList = this.ScheduleList.filter(x => x.tehsil == this.Filterloc.name);

    }
  }

  public CategoryChanged(value) {

    debugger

    this.isTrainer = false;
    this.isTrainee = false;
    this.FilterList = this.ScheduleList.filter(x => x.traingCategore == value);
    this.showFilterbody();
  }
  public ParticipantChanged(value) {
    debugger
    if (value.target.value == 'Trainee') {
      this.isShow = false;
      this.isTrainee = true;
      this.isTrainer = false;
      this.ExternalBody = false;
      this.showTraineeBody()
    }
    if (value.target.value == 'Trainer') {
      this.isShow = false;
      this.isTrainer = true;
      this.isTrainee = false;
      this.ExternalBody = false;
      this.showTrainerBody()
    }
    if (value.target.value == 'ExternalParticipants') {
      this.isShow = false;
      this.isTrainer = false;
      this.isTrainee = false;
      this.ExternalBody = true;

      this.showExternalBody()
    }
  }
  public LevelChanged(value) {

    debugger
    this.isTrainer = false;
    this.isTrainee = false;
    this.FilterList = this.ScheduleList.filter(x => x.trainingLevel == value);
    this.showFilterbody();
  }
  public OrganizedbyChanged(value) {

    debugger
    this.isTrainer = false;
    this.isTrainee = false;
    this.FilterList = this.ScheduleList.filter(x => x.organizedBy == value);
    this.showFilterbody();
  }
  public SupportedByChanged(value) {

    debugger
    this.isTrainer = false;
    this.isTrainee = false;
    this.FilterList = this.ScheduleList.filter(x => x.supportedBy == value);
    this.showFilterbody();
  }
  public TypeChanged(value) {

    debugger
    this.isTrainer = false;
    this.isTrainee = false;
    this.FilterList = this.ScheduleList.filter(x => x.trainingType == value);
    this.showFilterbody();
  }

  public loadDistrict(divCode: string) {
    this.districts = [];
    this.sheduleService.getDistricts(divCode)
      .subscribe((x: any) => {
        debugger
        if (x) {
          this.districts = x.data;
        }
      });
  }
  public getDivision() {
    this.sheduleService.getDivisions().subscribe((res: any) => {

      this.divisions = res.data;
    })
  }



  public loadTehsils(disCode: string) {

    this.tehsils = [];
    this.sheduleService.getTehsils(disCode)
      .subscribe((x: any) => {
        if (x) {
          debugger
          this.tehsils = x.data;
        }
      });
  }


  public loadDesignation() {
    this.loading = true;
    this.Designations = [];
    this.isTrainer = false;
    this.isTrainee = false;
    this.sheduleService.getDesignations().subscribe((res: any) => {

      this.Designations = res.data;
      if (this.FilterList.length > 0) {
        this.loading = false;
      }
    });
  }
  getTrainings() {

    this.subs.add(
      this.registerService.getTrainings().subscribe((data) => {


        this.Trainings = data.data;
        console.log('-----------------------------------', data)

        return data;
      },
        (error) => {
          alert(error.message);
        }
      )
    );
  }


  public OnChangeTraining = (value) => {

    debugger
    var id: number = this.ScheduleList.filter(x => x.title == value)[0].id;
    debugger

    if (!value) {

      return;
    }
    if (id == 0) {

      return;
    }



  }
  public ValueChanged = (value) => {

    debugger
    this.FilterList = this.ScheduleList.filter(x => x.trainingId == value);

    this.showFilterbody();

  }
  public CadreChanged = (value) => {

    debugger


    this.FilterList = this.ScheduleList.filter(x => x.cadre == value);
    this.showFilterbody();




  }
  public VenueValueChanged = (value) => {

    debugger

    // console.log(value.target.value);
    // let val = value.target.value.split(' ')[1];
    //var id: number = this.ScheduleList.filter(x => x.title == value)[0].id;

    this.isTrainer = false;
    this.isTrainee = false;
    this.FilterList = this.ScheduleList.filter(x => x.venueId == value);
    this.showFilterbody();
  }

  getTrainingLevel() {

    this.subs.add(
      this.registerService.getTrainingLevel().subscribe((data) => {


        this.TrainingLevels = data.data;
        this.tempTrainig = JSON.parse(JSON.stringify(data.data))
        console.log('-----------------------------------', data)

        return data;
      },
        (error) => {
          alert(error.message);
        }
      )
    );
  }
  openModal() {
    debugger
    this.GetScheduleListss();
  }
  GetScheduleListss() {

    debugger
    this.subs.add(
      this.registerService.GetScheduleWithStartdate(state).subscribe(
        (data) => {
          debugger
          this.temp = [...data.result];;

          this.ScheduleList = JSON.parse(JSON.stringify(this.FilterList))


          debugger
          this.FilterList = this.ScheduleList.filter(x => {
            debugger 
            x.startDate = this.datePipe.transform(x.startDate, 'yyyy-MM-dd')
            x.endDate = this.datePipe.transform(x.endDate, 'yyyy-MM-dd')
            if (x.startDate >= this.startDate && x.startDate <= this.endDate) {
              return x;
            }
          }
          );



          // var  stratDate =new Date(this.startDate.setDate(this.startDate.getDate()-1));
          // var  endDate =new Date(this.startDate.setDate(this.endDate.getDate()+1));

          //   this.FilterList = this.ScheduleList.filter(x => new Date(x.startDate) >stratDate  && new Date(x.startDate) < endDate);


          this.showScheduleBody();

          return data;

        },
        (error) => {
          alert(error)
        }
      )
    );
  }
  getTrainingCategory() {


    this.subs.add(
      this.registerService.getTrainingCategory(state).subscribe(
        (data) => {
          debugger
          this.temp = [...data.result];

          this.TrainigCategory = data.result;
          console.log('/////////////// ////////////////////////', this.TrainigCategory)

          return data;
        },
        (error) => {
          alert(error);
        }
      )
    );
  }


  GetVenues() {


    this.subs.add(
      this.registerService.GetVenues().subscribe((data) => {


        this.Venues = data.data;
        console.log('-----------------------------------', data)

        return data;
      },
        (error) => {
          alert(error.message);
        }
      )
    );
  }




  getTrainingType() {


    this.subs.add(
      this.registerService.getTrainingType().subscribe((data) => {


        this.TrainingType = data.data;
        console.log('Training type data: ', data)
        return data;
      },
        (error) => {
          alert(error.message);
        }
      )
    );
  }


  showTraineeDetails(data) {

    debugger
    if (data.hasOwnProperty('profileId')) {
      this.subs.add(

        this.registerService.GetParticepantDetail(data.profileId).subscribe(
          (data: any) => {

            const modalRef = this.modalService.open(TraineeDetailsComponent, { size: 'lg' })

            this.ParticepantDetail = data.data;
            modalRef.componentInstance.EventObj = this.ParticepantDetail;
            modalRef.componentInstance.title = "Add Trainer";

            modalRef.componentInstance.clickevent.subscribe(($e) => {
              //this.FilterEvent();
              window.location.reload();
            })




            console.log("ScheduleDetail", this.ScheduleDto)
            return data;
          },
          (error) => {
            alert(error);
          }
        )
      );
    } else {
      this.subs.add(

        this.registerService.GetExternalParticepantDetail(data.id).subscribe(
          (data: any) => {

            const modalRef = this.modalService.open(TraineeDetailsComponent, { size: 'lg' })

            this.ParticepantDetail = data.data;
            modalRef.componentInstance.EventObj = this.ParticepantDetail;
            modalRef.componentInstance.title = "Add Trainer";

            modalRef.componentInstance.clickevent.subscribe(($e) => {
              //this.FilterEvent();
              window.location.reload();
            })




            console.log("ScheduleDetail", this.ScheduleDto)
            return data;
          },
          (error) => {
            alert(error);
          }
        )
      );
    }



  }
  showTrainerDetails(data) {

    debugger
    const modalRef = this.modalService.open(TrainerDetailsComponent, { size: 'lg' })
    this.subs.add(

      this.registerService.GetParticepantDetail(data.profileId).subscribe(
        (data: any) => {


          this.TrainerDetail = data.data;
          modalRef.componentInstance.EventObj = this.TrainerDetail;
          modalRef.componentInstance.title = "Add Trainer";

          modalRef.componentInstance.clickevent.subscribe(($e) => {
            //this.FilterEvent();
            window.location.reload();
          })




          console.log("ScheduleDetail", this.ScheduleDto)
          return data;
        },
        (error) => {
          alert(error);
        }
      )
    );

  }
  showDetail(data) {

    const modalRef = this.modalService.open(TrainingTypeDetailComponent, { size: 'lg' });
    // this.GetScheduleWithParticepants(data.id);


    this.registerService.GetTrainingTypeDetail(data.trainingType).subscribe(
      (res: any) => {


        debugger
        this.TrainingDetailDto = res.data;
        modalRef.componentInstance.EventObj = this.TrainingDetailDto;


        modalRef.componentInstance.title = "View Training";

        modalRef.componentInstance.clickevent.subscribe(($e) => {
          //this.FilterEvent();
          window.location.reload();
        })




        return data;
      },
      (error) => {
        alert(error);
      }
    )
  }

  showTrainingWiseReport() {
    this.loading = true;
    debugger
    this.subs.add(
      this.registerService.GetReport().subscribe((data) => {
        console.log("showTrainingWiseReport, ", data)

        debugger
        this.FilterList = data.data.trainingWiseReportList;
        this.traineeWiseReportList = data.data.traineeWiseReportList;
        this.trainerWiseReportList = data.data.trainerWiseReportList;
        this.ExternalList = data.data.externalParticipantWiseReport;


        this.tempTrainig = this.tempDto = JSON.parse(JSON.stringify(data.data));
        this.showTrainingBody();
        if (this.Designations.length > 0) {
          this.loading = false;
        }
        
        return data;
      },
        (error) => {
          alert(error.message);
        }
      )
    );
  }
  FilterByTraining() {
    debugger

  }


  exportToExcel(exportData: any, fileName: string) {
    debugger

    let tempArr: any = []
    let _tempArr: any = []
    if (this.isTrainee) {
      tempArr = JSON.parse(JSON.stringify(this.traineeWiseReportList));
      tempArr = tempArr.forEach((ele) => {
        delete ele.id
        delete ele.profileId
        _tempArr.push(ele);
      })
      this._excelExport.exportAsExcel({
        table: null,
        fileName: fileName,
        sheetName: 'Sheet 1',
        data: _tempArr,
      })
      tempArr = []
    }
    else if (this.isTrainer) {
      tempArr = JSON.parse(JSON.stringify(this.trainerWiseReportList));
      tempArr = tempArr.forEach((ele) => {
        delete ele.id
        delete ele.profileId
        _tempArr.push(ele);
      })
      this._excelExport.exportAsExcel({
        table: null,
        fileName: fileName,
        sheetName: 'Sheet 1',
        data: _tempArr,
      })
      tempArr = []
    }
    else {
      tempArr = JSON.parse(JSON.stringify(exportData));
      tempArr.forEach((ele) => {
        delete ele.id
        delete ele.trainingId
        _tempArr.push(ele);
      })
      this._excelExport.exportAsExcel({
        table: null,
        fileName: fileName,
        sheetName: 'Sheet 1',
        data: _tempArr,
      })
      tempArr = []
    }
  }


  showCategoryBody() {
    this.trainingBody = false;
    this.trainingTypeBody = false;
    this.traineeBody = false;
    this.trainerBody = false;
    this.VenueBody = false;
    this.DepartmentBody = false;
    this.TrainingLevelBody = false;
    this.CadreBody = false;
    this.CategoryBody = true;
    this.ScheduleBody = false;
    this.FilterTrainingTittleBody = false;
    this.FilterVenuBody = false;
    this.ExternalBody = false;

  }
  showTrainingLevelBody() {
    this.trainingBody = false;
    this.trainingTypeBody = false;
    this.traineeBody = false;
    this.trainerBody = false;
    this.VenueBody = false;
    this.DepartmentBody = false;
    this.TrainingLevelBody = true;
    this.CadreBody = false;
    this.CategoryBody = false;
    this.ScheduleBody = false;
    this.FilterTrainingTittleBody = false;
    this.FilterVenuBody = false;
    this.ExternalBody = false;

  }
  showDepartmentBody() {
    this.trainingBody = false;
    this.trainingTypeBody = false;
    this.traineeBody = false;
    this.trainerBody = false;
    this.VenueBody = false;
    this.DepartmentBody = true;
    this.TrainingLevelBody = false;
    this.CadreBody = false;
    this.CategoryBody = false;
    this.ScheduleBody = false;
    this.FilterTrainingTittleBody = false;
    this.FilterVenuBody = false;
    this.ExternalBody = false;

  }
  showVenueBody() {
    this.trainingBody = false;
    this.trainingTypeBody = false;
    this.traineeBody = false;
    this.trainerBody = false;
    this.VenueBody = true;
    this.DepartmentBody = false;
    this.TrainingLevelBody = false;
    this.CadreBody = false;
    this.CategoryBody = false;
    this.ScheduleBody = false;
    this.FilterTrainingTittleBody = false;
    this.FilterVenuBody = false;
    this.ExternalBody = false;

  }
  showScheduleBody() {
    this.trainingBody = false;
    this.trainingTypeBody = false;
    this.traineeBody = false;
    this.trainerBody = false;
    this.VenueBody = false;
    this.DepartmentBody = false;
    this.TrainingLevelBody = false;
    this.CadreBody = false;
    this.CategoryBody = false;
    this.ScheduleBody = true;
    this.FilterTrainingTittleBody = false;
    this.FilterVenuBody = false;
    this.ExternalBody = false;
  }

  showTrainingBody() {
    this.trainingBody = true;
    this.trainingTypeBody = false;
    this.traineeBody = false;
    this.trainerBody = false;
    this.VenueBody = false;
    this.DepartmentBody = false;
    this.TrainingLevelBody = false;
    this.CadreBody = false;
    this.CategoryBody = false;
    this.ScheduleBody = false;
    this.FilterTrainingTittleBody = false;
    this.FilterVenuBody = false;
    this.ExternalBody = false;

  }
  showCadreBody() {
    this.trainingBody = false;
    this.trainingTypeBody = false;
    this.traineeBody = false;
    this.trainerBody = false;
    this.VenueBody = false;
    this.DepartmentBody = false;
    this.TrainingLevelBody = false;
    this.CadreBody = true;
    this.CategoryBody = false;
    this.ScheduleBody = false;
    this.FilterTrainingTittleBody = false;
    this.FilterVenuBody = false;
    this.ExternalBody = false;

  }
  showTrainingTypeBody() {
    this.trainingBody = false;
    this.trainingTypeBody = true;
    this.traineeBody = false;
    this.trainerBody = false;
    this.VenueBody = false;
    this.DepartmentBody = false;
    this.TrainingLevelBody = false;
    this.CadreBody = false;
    this.CategoryBody = false;
    this.ScheduleBody = false;
    this.FilterTrainingTittleBody = false;
    this.FilterVenuBody = false;
    this.ExternalBody = false;

  }
  showTraineeBody() {
    this.Filterbody = false;
    this.trainingBody = false;
    this.trainingTypeBody = false;
    this.traineeBody = true;
    this.trainerBody = false;
    this.VenueBody = false;
    this.DepartmentBody = false;
    this.TrainingLevelBody = false;
    this.CadreBody = false;
    this.CategoryBody = false;
    this.ScheduleBody = false;
    this.FilterTrainingTittleBody = false;
    this.FilterVenuBody = false;
    this.ExternalBody = false;
  }
  showTrainerBody() {
    debugger
    this.Filterbody = false;
    this.trainingBody = false;
    this.trainingTypeBody = false;
    this.traineeBody = false;
    this.trainerBody = true;
    this.VenueBody = false;
    this.DepartmentBody = false;
    this.TrainingLevelBody = false;
    this.CadreBody = false;
    this.CategoryBody = false;
    this.ScheduleBody = false;
    this.FilterTrainingTittleBody = false;
    this.FilterVenuBody = false;
    this.ExternalBody = false;

  }
  showExternalBody() {
    debugger
    this.Filterbody = false;
    this.trainingBody = false;
    this.trainingTypeBody = false;
    this.traineeBody = false;
    this.trainerBody = false;
    this.VenueBody = false;
    this.DepartmentBody = false;
    this.TrainingLevelBody = false;
    this.CadreBody = false;
    this.CategoryBody = false;
    this.ScheduleBody = false;
    this.FilterTrainingTittleBody = false;
    this.FilterVenuBody = false;
    this.ExternalBody = true;

  }
  showFilterTrainingTittle() {
    this.trainingBody = false;
    this.trainingTypeBody = false;
    this.traineeBody = false;
    this.trainerBody = false;
    this.VenueBody = false;
    this.DepartmentBody = false;
    this.TrainingLevelBody = false;
    this.CadreBody = false;
    this.CategoryBody = false;
    this.ScheduleBody = false;
    this.FilterTrainingTittleBody = true;
    this.FilterVenuBody = false;
    this.ExternalBody = false;

  }
  showFilterbody() {
    this.trainingBody = false;
    this.trainingTypeBody = false;
    this.traineeBody = false;
    this.trainerBody = false;
    this.VenueBody = false;
    this.DepartmentBody = false;
    this.TrainingLevelBody = false;
    this.CadreBody = false;
    this.CategoryBody = false;
    this.ScheduleBody = false;
    this.FilterTrainingTittleBody = false;
    this.Filterbody = true;
    this.ExternalBody = false;

  }

  showSchedule(data) {

    const modalRef = this.modalService.open(ViewScheduleDetailsComponent, { size: 'lg' });
    // this.GetScheduleWithParticepants(data.id);


    this.registerService.GetScheduleWithParticepants(data.id).subscribe(
      (res: any) => {


        this.ScheduleDto = res.data;
        modalRef.componentInstance.EventObj = this.ScheduleDto;
        console.log("ScheduleDetail", this.ScheduleDto)

        modalRef.componentInstance.title = "View Training";


        modalRef.componentInstance.clickevent.subscribe(($e) => {
          //this.FilterEvent();
          window.location.reload();
        })




        return data;
      },
      (error) => {
        alert(error);
      }
    )




  }
  Reset() {
    window.location.reload();
  }
  showScheduleModel(data) {

    const modalRef = this.modalService.open(AddTrainingScheduleComponent, { size: 'lg' })
    modalRef.componentInstance.EventObj = data;
    modalRef.componentInstance.title = "Add Trainee";


    modalRef.componentInstance.clickevent.subscribe(($e) => {
      //this.FilterEvent();
      window.location.reload();
    })
  }
  GetScheduleWithParticepants(id: any) {

    this.subs.add(

      this.registerService.GetScheduleWithParticepants(id).subscribe(
        (data: any) => {


          this.ScheduleDto = data.data;
          console.log("ScheduleDetail", this.ScheduleDto)

          return data;
        },
        (error) => {
          alert(error);
        }
      )
    );

  }

  showAddTrainee(data) {


    const modalRef = this.modalService.open(AddTraineeComponent, { size: 'lg' })
    modalRef.componentInstance.EventObj = data;
    modalRef.componentInstance.title = "Add Trainer";

    modalRef.componentInstance.clickevent.subscribe(($e) => {
      //this.FilterEvent();
      window.location.reload();

    })
  }
  showAddTrainer(data) {

    const modalRef = this.modalService.open(AddTrainerComponent, { size: 'lg' })
    modalRef.componentInstance.EventObj = data;
    modalRef.componentInstance.title = "Add Training";

    modalRef.componentInstance.clickevent.subscribe(($e) => {
      //this.FilterEvent();
      window.location.reload();
    })
  }







  onPageChange(number: number) {

    this.config.currentPage = number;
  }

  onPageBoundsCorrection(number: number) {

    this.config.currentPage = number;
  }

  GetScheduleList() {


    // this.loading = true;
    this.subs.add(
      this.registerService.GetScheduleListReport(state).subscribe(
        (data) => {
          this.temp = [...data.result];

          this.ScheduleList = data.result;

          console.log("Schedule List: ",this.ScheduleList)
          // this.loading = false;

          return data;
        },
        (error) => {
          alert(error);
        }
      )
    );
  }

  GetDailyEngagementPublicList() {

    this.subs.add(
      this.registerService.GetDailyEngagementPublicList(state).subscribe(
        (data) => {

          this.temp = [...data.result];

          this.rows = data.result;
          console
          return data;
        },
        (error) => {
          alert(error);
        }
      )
    );
  }

  filterData(value: string, id: number) {
    debugger
    // value = this.TrainingType.filter(x => x.trainingTypeName == value)[0].id;
    console.log(value);
    value = value.split(' ')[1]
    if (id == 1) {
      this.tempDto.cadreWiseReportList = this.ReportDto.cadreWiseReportList.filter(x => x.trainingLevel === value)
    }
    else if (id == 2) {
      this.tempDto.trainingCategoryWiseReport = this.ReportDto.trainingCategoryWiseReport.filter(x => x.trainingLevel === value)
    } else if (id == 3) {
      this.tempDto.trainingLevelWiseReportList = this.ReportDto.trainingLevelWiseReportList.filter(x => x.trainingLevel === value)
    } else if (id == 4) {
      this.tempDto.trainingTypeWiseReportList = this.ReportDto.trainingTypeWiseReportList.filter(x => x.trainingType == value)
    } else if (id == 5) {
      this.tempDto.venueWiseReportList = this.ReportDto.venueWiseReportList.filter(x => x.venue === value);
    }
  }


}
