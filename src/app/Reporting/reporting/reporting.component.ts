import { state } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CoreService } from 'src/app/Core/core.service';
import { FormIndicatorService } from 'src/app/shared/services/FormIndicatorService/FormIndicatorService';
import { RegisterService } from 'src/app/shared/services/RegisterService/RegisterService';
import { ReportingService } from 'src/app/shared/services/ReportingService/ReportingSerice';
import { ReportingDTO } from '../dto/ReportingDto'
import { FileSaverService } from 'ngx-filesaver';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { ToastrService } from 'ngx-toastr';
import { DashboardService } from "../../shared/services/DashboardService/DashboardService";

declare var require
const Swal = require('sweetalert2')

@Component({
  selector: 'app-reporting',
  templateUrl: './reporting.component.html',
  styleUrls: ['./reporting.component.scss']
})

export class ReportingComponent implements OnInit {
  searchForm: FormGroup;
  private subs = new Subscription();
  FormDto: ReportingDTO = new ReportingDTO();
  temp: any[];
  Forms: any[] = [];
  Compaign: any[] = [];
  Indicators: any[] = [];

  Division: any[] = [];
  District: any[] = [];
  Details: any[] = [];
  Tehsil: any[] = [];
  Designations: any[] = [];
  Code = "";

  UC: any[] = [];

  Count: any[] = [];
  rows = [];

  Population: string[] = ['HRMP', 'Non-HRMP']
  UserType: string[] = ['Technical', 'Administrative']
  Designation: string[] = [
    'UCMO', 'AIC']
  Organization: any[] = [
    { name: 'Government', id: '1' }, { name: 'WHO', id: '2' }, { name: 'Unicef/Coment', id: '3' }, { name: 'Other', id: '4' }]

  ReportType: any[] = [
    { name: 'Registration', id: 1 }, { name: 'Monitor Compliance', id: 2 }]
  parentSubmitted = false;
  loading = false;
  loading2 = false;
  error = "";
  public isLoading: boolean
  public isReportType: boolean = false;
  public formSelected: boolean = false;
  public isRegistration: boolean = false;

  Day: any[] = [
    "Day 1", "Day 2", "Day 3", "Catch up"]
  FormCategory: string[] = [
    'Mobile Team Monitoring',
    'House Hold Cluster']

  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;

  ColumnMode = ColumnMode;

  constructor(private fb: FormBuilder, private readonly registerService: RegisterService, private readonly formindicatorservice: FormIndicatorService,
    private readonly coreService: CoreService, private readonly toastr: ToastrService, private readonly reportingService: ReportingService,
    private fileSaverService: FileSaverService, private readonly dashboardService: DashboardService,) {
    this.coreService.loginResponse = JSON.parse(localStorage.getItem('currentUser'))
  }

  ngOnInit(): void {
    this.isLoading = false

    this.searchForm = this.fb.group({

      division: ["", Validators.required],
      district: ["", Validators.required],
      tehsil: ["", Validators.required],
      uc: ["", Validators.required],
      compaign: ["", Validators.required],
      day: ["", Validators.required],
      //FormType: ["", Validators.required],
      form: ["", Validators.required],
      indicators: ["", Validators.required],
      organization: ["", Validators.required],
      designation: ["", Validators.required],
      population: ["", Validators.required],
      reportType: ["", Validators.required],
      userType: ["", Validators.required],

    });

    this.getDivision();
    //this.getForms();
    //this.getCompaign();

    if (this.coreService.loginResponse.user.userLVL == 'Division') {

      this.searchForm.controls.division.setValue(this.coreService.loginResponse.user.divisionCode);

      this.getDistricts(this.coreService.loginResponse.user.divisionCode)

      this.searchForm.controls.division.disable()

    }

    if (this.coreService.loginResponse.user.userLVL == 'District') {

      this.searchForm.controls.division.setValue(this.coreService.loginResponse.user.divisionCode);

      this.getDistricts(this.coreService.loginResponse.user.divisionCode)

      this.searchForm.controls.district.setValue(this.coreService.loginResponse.user.districtCode);

      this.searchForm.controls.district.disable()
      this.searchForm.controls.division.disable()
      this.getTehsils(this.coreService.loginResponse.user.districtCode)

    }
  }

  getForms() {

    this.subs.add(
      this.registerService.getForms().subscribe(
        (data) => {

          this.temp = [...data.result];

          this.Forms = data.result;

          return data;
        },
        (error) => {
          alert(error);
        }
      )
    );
  }

  getIndicators(userType: string, id: number) {
    debugger
    this.subs.add(
      this.registerService.getIndicators(userType, id).subscribe(
        (data) => {

          this.temp = [...data.result];

          this.Indicators = data.result;
          console.log("AAAAAAAAAAAAAA", this.Indicators)
          return data;
        },
        (error) => {
          alert(error);
        }
      )
    );
  }

  getCompaign() {
    this.subs.add(
      this.dashboardService.getCompaign().subscribe(
        (data) => {

          this.temp = [...data.result];

          this.Compaign = data.result;

          console.log("Compaign", this.Compaign)
          return data;
        },
        (error) => {
          alert(error);
        }
      )
    );
  }

  getDivision() {

    this.subs.add(
      this.registerService.getDivision(state).subscribe(
        (data) => {

          this.temp = [...data.result];

          this.Division = data.result;

          return data;
        },
        (error) => {
          alert(error);
        }
      )
    );
  }

  getDistricts(Division: any) {

    this.subs.add(
      this.registerService.getDistrict(Division).subscribe(
        (data) => {


          this.temp = [...data.result];

          this.District = data.result;

          if (this.coreService.loginResponse.user.userLVL == 'District') {

            this.searchForm.controls.division.setValue(this.coreService.loginResponse.user.divisionCode);

            this.searchForm.controls.district.setValue(this.coreService.loginResponse.user.districtCode);

            this.searchForm.controls.district.disable()
            this.searchForm.controls.division.disable()
            this.getTehsils(this.coreService.loginResponse.user.districtCode)

          }
          return data;
        },
        (error) => {
          alert(error);
        }
      )
    );
  }

  getTehsils(District: any) {

    this.subs.add(
      this.registerService.getTehsil(District).subscribe(
        (data) => {


          this.temp = [...data.result];

          this.Tehsil = data.result;


          return data;
        },
        (error) => {
          alert(error);
        }
      )
    );
  }

  getUCs(Tehsil: any) {

    this.subs.add(
      this.registerService.getUCs(Tehsil).subscribe(
        (data) => {

          this.temp = [...data.result];

          this.UC = data.result;

          return data;
        },
        (error) => {
          alert(error);
        }
      )
    );
  }

  export() {

    this.subs.add(
      this.reportingService.GetReport(this.FormDto).subscribe(
        (data) => {

          this.loading = false;


          this.searchForm = this.fb.group({

            division: "",
            district: "",
            tehsil: "",
            uc: "",
            compaign: "",
            day: "",
            FormType: "",

          });
        },
        (error) => {
          this.error = error;
          this.loading = false;
        }
      )
    );

  }

  public async exportToExcel(): Promise<void> {

    this.loading2 = true

    debugger

    if (this.searchForm.controls.reportType.value == 1 || this.searchForm.controls.reportType.value == 2) {

      if (this.searchForm.controls.division.value == '') {
        this.FormDto.Code = null;
        this.FormDto.FilterLVL = 'Province';
      }
      if (this.searchForm.controls.division.value != '' && this.searchForm.controls.district.value == '') {
        this.FormDto.Code = this.searchForm.controls.division.value;
        this.FormDto.FilterLVL = 'Division';
      }
      if (this.searchForm.controls.division.value != '' && this.searchForm.controls.district.value != ''
        && this.searchForm.controls.tehsil.value == '') {

        this.FormDto.Code = this.searchForm.controls.district.value;
        this.FormDto.FilterLVL = 'District';
      }
      if (this.searchForm.controls.division.value != '' && this.searchForm.controls.district.value != ''
        && this.searchForm.controls.tehsil.value != '' && this.searchForm.controls.uc.value == '') {

        this.FormDto.Code = this.searchForm.controls.tehsil.value;
        this.FormDto.FilterLVL = 'Tehsil';
      }
      if (this.searchForm.controls.division.value != '' && this.searchForm.controls.district.value != ''
        && this.searchForm.controls.tehsil.value != '' && this.searchForm.controls.uc.value != '') {

        this.FormDto.Code = this.searchForm.controls.uc.value;
        this.FormDto.FilterLVL = 'UC';
      }
      this.FormDto.DivisionCode = this.searchForm.controls.division.value;
      this.FormDto.DistrictCode = this.searchForm.controls.district.value;
      this.FormDto.TehsilCode = this.searchForm.controls.tehsil.value;
      this.FormDto.UcCode = this.searchForm.controls.uc.value;
    }
    else {

      if (this.searchForm.controls.division.value == '') {
        this.FormDto.Code = "0";
        this.FormDto.FilterLVL = 'Division';
      }
      if (this.searchForm.controls.division.value != '' && this.searchForm.controls.district.value == '') {
        this.FormDto.Code = this.searchForm.controls.division.value;
        this.FormDto.FilterLVL = 'District';
      }
      if (this.searchForm.controls.division.value != '' && this.searchForm.controls.district.value != ''
        && this.searchForm.controls.tehsil.value == '') {

        this.FormDto.Code = this.searchForm.controls.district.value;
        this.FormDto.FilterLVL = 'Tehsil';
      }
      if (this.searchForm.controls.division.value != '' && this.searchForm.controls.district.value != ''
        && this.searchForm.controls.tehsil.value != '' && this.searchForm.controls.uc.value == '') {

        this.FormDto.Code = this.searchForm.controls.tehsil.value;
        this.FormDto.FilterLVL = 'UC';
      }
      if (this.searchForm.controls.division.value != '' && this.searchForm.controls.district.value != ''
        && this.searchForm.controls.tehsil.value != '' && this.searchForm.controls.uc.value != '') {

        this.FormDto.Code = this.searchForm.controls.uc.value;
        this.FormDto.FilterLVL = 'UC';
      }

      this.FormDto.DivisionCode = this.searchForm.controls.division.value;
      this.FormDto.DistrictCode = this.searchForm.controls.district.value;
      this.FormDto.TehsilCode = this.searchForm.controls.tehsil.value;
      this.FormDto.UcCode = this.searchForm.controls.uc.value;
    }


    // this.FormDto.division = this.searchForm.controls.division.value;
    // this.FormDto.district = this.searchForm.controls.district.value;
    // this.FormDto.tehsil = this.searchForm.controls.tehsil.value;
    // this.FormDto.uc = this.searchForm.controls.uc.value;


    if (this.searchForm.controls.reportType.value == '') {
      this.FormDto.ReportType = 0;
    } else {
      this.FormDto.ReportType = this.searchForm.controls.reportType.value;
    }


    if (this.searchForm.controls.compaign.value == '') {
      this.FormDto.CampaignId = (this.Compaign[0].currentCampaignId);
    } else {
      this.FormDto.CampaignId = this.searchForm.controls.compaign.value;
    }

    if (this.searchForm.controls.day.value == '') {
      this.FormDto.Day = null;
    } else {
      if (this.searchForm.controls.day.value == 'Day 1') {
        this.FormDto.Day = '1';
      }
      if (this.searchForm.controls.day.value == 'Day 2') {
        this.FormDto.Day = '2';
      }
      if (this.searchForm.controls.day.value == 'Day 3') {
        this.FormDto.Day = '3';
      }
      if (this.searchForm.controls.day.value == 'Catch Up Day') {
        this.FormDto.Day = 'Catch Up';
      }
    }

    if (this.searchForm.controls.organization.value == '') {
      this.FormDto.Organization = null;
    } else {
      this.FormDto.Organization = this.searchForm.controls.organization.value;
    }

    if (this.searchForm.controls.designation.value == '') {
      this.FormDto.Designation = null;
    } else {
      this.FormDto.Designation = this.searchForm.controls.designation.value;
    }

    if (this.searchForm.controls.population.value == '') {
      this.FormDto.PopulationType = null;
    } else {
      this.FormDto.PopulationType = this.searchForm.controls.population.value;
    }

    if (!this.searchForm.controls.indicators.value) {
      this.FormDto.IndicatorId = 0;
    } else {
      this.FormDto.IndicatorId = this.searchForm.controls.indicators.value;
    }

    if (!this.searchForm.controls.form.value) {
      this.FormDto.FormId = 0;
    } else {
      this.FormDto.FormId = this.searchForm.controls.form.value;
    }


    //this.fileSaverService.save(await this.reportingService.getExcelReport (this.FormDto), (this.FormDto.ReportType+' Report Day '+this.FormDto.day))
    this.fileSaverService.save(await this.reportingService.getExcelReport(this.FormDto))

    this.loading2 = false
  }

  public get columns(): string[] | any {

    if (!this.rows || this.rows.length <= 0) {
      return []
    }
    return Object.keys(this.rows[0]) ?? []
  }

  onChange(Code: string) {

    if (Code.length == 3) {
      this.District = [];
      this.Tehsil = [];
      this.UC = [];
      this.getDistricts(Code);
    }
    if (Code.length == 6) {
      this.Tehsil = [];
      this.UC = [];
      this.getTehsils(Code);
    }
    if (Code.length == 9) {
      this.UC = [];
      this.getUCs(Code);
    }


  }

  onChangeForm(id: any) {
    debugger
    this.formSelected = true;
    this.FormDto.IndicatorId = 0;
    this.searchForm.controls.indicators.setValue("");
    var userType = this.searchForm.controls.userType.value;
    this.getIndicators(userType, id);

  }

  onChangeType() {
    debugger

    this.searchForm.controls.indicators.setValue("");
    this.searchForm.controls.form.setValue("");

  }

  onChangeReportType(id: any) {
    debugger


    if (this.searchForm.controls.reportType.value == 1 || this.searchForm.controls.reportType.value == 2) {

      this.isRegistration = true;
      this.formSelected = false
    }
    else {
      this.isRegistration = false;
      this.formSelected = true
    }
    this.isReportType = true;

    this.searchForm.controls.form.setValue("");
    this.searchForm.controls.indicators.setValue("");
    this.searchForm.controls.division.setValue(""),
      this.searchForm.controls.district.setValue(""),
      this.searchForm.controls.tehsil.setValue(""),
      this.searchForm.controls.uc.setValue(""),
      this.FormDto.FormId = 0
    this.FormDto.IndicatorId = 0
  }

  public getHeaderName(name: string): string {
    const result = name.replace(/([A-Z])/g, " $1");
    const finalResult = result.charAt(0).toUpperCase() + result.slice(1);

    return finalResult
  }

  public getWidth(columnName: string): number | null {
    if (columnName === 'surveyor') {
      return 80
    }

    else if (columnName === 'indicatorName') {
      return 150
    }
    else if (columnName === 'aic') {
      return 70
    }
    else if (columnName === 'creationDate') {
      return 70
    }
    else {
      return 50
    }
    // return columnName === 'indicatorName' ? 250 : 22
  }


  getDesignationOrganizationWise(Id: any) {

    this.subs.add(
      this.dashboardService.getDesignationOrganizationWise(Id).subscribe(
        (data) => {

          this.Designations = data.result;

          //this.coreService.formFilledDetailsDesignationWise = this.Details
          //this.OpenFormFilledDetails()

          return data;
        },
        (error) => {
          alert(error);
        }
      )
    );

  }

  onChangeOrganization(Id: any) {
    debugger

    this.getDesignationOrganizationWise(Id)

  }

  onSubmit() {

    this.loading = true
    this.loading2 = false

    // if(this.searchForm.controls.division.value==''){
    //   this.toastr.info("Please Select Division ", "Invalid", {closeButton: true});
    //   this.loading=false
    //   return
    // }
    debugger

    // if(this.searchForm.controls.reportType.value ==2){



    //   if (this.searchForm.controls.division.value == '') {
    //     this.FormDto.Code = null;
    //     this.FormDto.FilterLVL = 'Division';
    //   }
    //   if (this.searchForm.controls.division.value != '' && this.searchForm.controls.district.value == '') {
    //     this.FormDto.Code = this.searchForm.controls.division.value;
    //     this.FormDto.FilterLVL = 'District';
    //   }
    //   if (this.searchForm.controls.division.value != '' && this.searchForm.controls.district.value != ''
    //     && this.searchForm.controls.tehsil.value == '') {

    //     this.FormDto.Code = this.searchForm.controls.district.value;
    //     this.FormDto.FilterLVL = 'Tehsil';
    //   }
    //   if (this.searchForm.controls.division.value != '' && this.searchForm.controls.district.value != ''
    //     && this.searchForm.controls.tehsil.value != '' && this.searchForm.controls.uc.value == '') {

    //     this.FormDto.Code = this.searchForm.controls.tehsil.value;
    //     this.FormDto.FilterLVL = 'UC';
    //   }
    //   if (this.searchForm.controls.division.value != '' && this.searchForm.controls.district.value != ''
    //     && this.searchForm.controls.tehsil.value != '' && this.searchForm.controls.uc.value != '') {

    //     this.FormDto.Code = this.searchForm.controls.uc.value;
    //     this.FormDto.FilterLVL = 'UC';
    //   }

    //   if(this.searchForm.controls.division.value==''){
    //     this.toastr.info("Please Select Division ", "Invalid", {closeButton: true});
    //     this.loading=false
    //     return
    //   }

    // }

    if (this.searchForm.controls.reportType.value == '') {

      if (this.searchForm.controls.form.value == '') {

        this.toastr.info("Please Select Form ", "Invalid", { closeButton: true });
        this.loading = false
        return
      } else {
        this.FormDto.FormId = this.searchForm.controls.form.value;
      }

      if (this.searchForm.controls.userType.value == '') {

        this.toastr.info("Please Select User Type ", "Invalid", { closeButton: true });
        this.loading = false
        return
      } else {
        this.FormDto.UserType = this.searchForm.controls.userType.value;
      }

      if (this.searchForm.controls.indicators.value == '') {

        if (this.searchForm.controls.form.value == '5' || this.searchForm.controls.form.value == '6') {

          this.FormDto.IndicatorId = 0

        }
        else {
          this.toastr.info("Please Select Indicator", "Invalid", { closeButton: true });
          this.loading = false
          return
        }

      } else {
        this.FormDto.IndicatorId = this.searchForm.controls.indicators.value;
      }

      if (this.searchForm.controls.division.value == '') {
        this.toastr.info("Please Select Division ", "Invalid", { closeButton: true });
        this.loading = false
        return
      }

      if (this.searchForm.controls.division.value == '') {
        this.FormDto.Code = null;
        this.FormDto.FilterLVL = 'Division';
      }

      if (this.searchForm.controls.division.value != '' && this.searchForm.controls.district.value == '') {
        this.FormDto.Code = this.searchForm.controls.division.value;
        this.FormDto.FilterLVL = 'District';
      }
      if (this.searchForm.controls.division.value != '' && this.searchForm.controls.district.value != ''
        && this.searchForm.controls.tehsil.value == '') {

        this.FormDto.Code = this.searchForm.controls.district.value;
        this.FormDto.FilterLVL = 'Tehsil';
      }
      if (this.searchForm.controls.division.value != '' && this.searchForm.controls.district.value != ''
        && this.searchForm.controls.tehsil.value != '' && this.searchForm.controls.uc.value == '') {

        this.FormDto.Code = this.searchForm.controls.tehsil.value;
        this.FormDto.FilterLVL = 'UC';
      }
      if (this.searchForm.controls.division.value != '' && this.searchForm.controls.district.value != ''
        && this.searchForm.controls.tehsil.value != '' && this.searchForm.controls.uc.value != '') {

        this.FormDto.Code = this.searchForm.controls.uc.value;
        this.FormDto.FilterLVL = 'UC';
      }

      this.FormDto.DivisionCode = this.searchForm.controls.division.value;
      this.FormDto.DistrictCode = this.searchForm.controls.district.value;
      this.FormDto.TehsilCode = this.searchForm.controls.tehsil.value;
      this.FormDto.UcCode = this.searchForm.controls.uc.value;


    } else {

      if (this.searchForm.controls.division.value == '') {
        this.FormDto.Code = null;
        this.FormDto.FilterLVL = 'Province';
      }
      if (this.searchForm.controls.division.value != '' && this.searchForm.controls.district.value == '') {
        this.FormDto.Code = this.searchForm.controls.division.value;
        this.FormDto.FilterLVL = 'Division';
      }
      if (this.searchForm.controls.division.value != '' && this.searchForm.controls.district.value != ''
        && this.searchForm.controls.tehsil.value == '') {

        this.FormDto.Code = this.searchForm.controls.district.value;
        this.FormDto.FilterLVL = 'District';
      }
      if (this.searchForm.controls.division.value != '' && this.searchForm.controls.district.value != ''
        && this.searchForm.controls.tehsil.value != '' && this.searchForm.controls.uc.value == '') {

        this.FormDto.Code = this.searchForm.controls.tehsil.value;
        this.FormDto.FilterLVL = 'Tehsil';
      }
      if (this.searchForm.controls.division.value != '' && this.searchForm.controls.district.value != ''
        && this.searchForm.controls.tehsil.value != '' && this.searchForm.controls.uc.value != '') {

        this.FormDto.Code = this.searchForm.controls.uc.value;
        this.FormDto.FilterLVL = 'UC';
      }

      this.FormDto.DivisionCode = this.searchForm.controls.division.value;
      this.FormDto.DistrictCode = this.searchForm.controls.district.value;
      this.FormDto.TehsilCode = this.searchForm.controls.tehsil.value;
      this.FormDto.UcCode = this.searchForm.controls.uc.value;
    }
    debugger
    // if(this.searchForm.controls.reportType.value == 1 || ){


    //       if (this.searchForm.controls.division.value == '') {
    //         this.FormDto.Code = null;
    //         this.FormDto.FilterLVL = 'Province';
    //       }
    //       if (this.searchForm.controls.division.value != '' && this.searchForm.controls.district.value == '') {
    //         this.FormDto.Code = this.searchForm.controls.division.value;
    //         this.FormDto.FilterLVL = 'Division';
    //       }
    //       if (this.searchForm.controls.division.value != '' && this.searchForm.controls.district.value != ''
    //         && this.searchForm.controls.tehsil.value == '') {

    //         this.FormDto.Code = this.searchForm.controls.district.value;
    //         this.FormDto.FilterLVL = 'District';
    //       }
    //       if (this.searchForm.controls.division.value != '' && this.searchForm.controls.district.value != ''
    //         && this.searchForm.controls.tehsil.value != '' && this.searchForm.controls.uc.value == '') {

    //         this.FormDto.Code = this.searchForm.controls.tehsil.value;
    //         this.FormDto.FilterLVL = 'Tehsil';
    //       }
    //       if (this.searchForm.controls.division.value != '' && this.searchForm.controls.district.value != ''
    //         && this.searchForm.controls.tehsil.value != '' && this.searchForm.controls.uc.value != '') {

    //         this.FormDto.Code = this.searchForm.controls.uc.value;
    //         this.FormDto.FilterLVL = 'UC';
    //       }

    // }

    // if (this.searchForm.controls.division.value == '') {
    //   this.FormDto.Code = null;
    //   this.FormDto.FilterLVL = 'Division';
    // }
    // if (this.searchForm.controls.division.value != '' && this.searchForm.controls.district.value == '') {
    //   this.FormDto.Code = this.searchForm.controls.division.value;
    //   this.FormDto.FilterLVL = 'District';
    // }
    // if (this.searchForm.controls.division.value != '' && this.searchForm.controls.district.value != ''
    //   && this.searchForm.controls.tehsil.value == '') {

    //   this.FormDto.Code = this.searchForm.controls.district.value;
    //   this.FormDto.FilterLVL = 'Tehsil';
    // }
    // if (this.searchForm.controls.division.value != '' && this.searchForm.controls.district.value != ''
    //   && this.searchForm.controls.tehsil.value != '' && this.searchForm.controls.uc.value == '') {

    //   this.FormDto.Code = this.searchForm.controls.tehsil.value;
    //   this.FormDto.FilterLVL = 'UC';
    // }
    // if (this.searchForm.controls.division.value != '' && this.searchForm.controls.district.value != ''
    //   && this.searchForm.controls.tehsil.value != '' && this.searchForm.controls.uc.value != '') {

    //   this.FormDto.Code = this.searchForm.controls.uc.value;
    //   this.FormDto.FilterLVL = 'UC';
    // }

    // this.FormDto.division = this.searchForm.controls.division.value;
    // this.FormDto.district = this.searchForm.controls.district.value;
    // this.FormDto.tehsil = this.searchForm.controls.tehsil.value;
    // this.FormDto.uc = this.searchForm.controls.uc.value;

    if (this.searchForm.controls.reportType.value == '') {
      this.FormDto.ReportType = 0;
    } else {
      this.FormDto.ReportType = this.searchForm.controls.reportType.value;
    }


    if (this.searchForm.controls.compaign.value == '') {
      this.FormDto.CampaignId = (this.Compaign[0].currentCampaignId);
      this.searchForm.controls.compaign.setValue(this.Compaign[0].currentCampaignId);

    } else {
      this.FormDto.CampaignId = this.searchForm.controls.compaign.value;
    }

    if (this.searchForm.controls.day.value == '') {
      this.FormDto.Day = null;
    } else {
      if (this.searchForm.controls.day.value == 'Day 1') {
        this.FormDto.Day = '1';
      }
      if (this.searchForm.controls.day.value == 'Day 2') {
        this.FormDto.Day = '2';
      }
      if (this.searchForm.controls.day.value == 'Day 3') {
        this.FormDto.Day = '3';
      }
      if (this.searchForm.controls.day.value == 'Catch Up Day') {
        this.FormDto.Day = 'Catch Up';
      }
    }


    if (this.searchForm.controls.organization.value == '') {
      this.FormDto.Organization = null;
    } else {
      this.FormDto.Organization = this.searchForm.controls.organization.value;
    }

    if (this.searchForm.controls.designation.value == '') {
      this.FormDto.Designation = null;
    } else {
      this.FormDto.Designation = this.searchForm.controls.designation.value;
    }

    if (this.searchForm.controls.population.value == '') {
      this.FormDto.PopulationType = null;
    } else {
      this.FormDto.PopulationType = this.searchForm.controls.population.value;
    }

    if (this.searchForm.controls.indicators.value == '') {

      this.FormDto.IndicatorId = 0;
    } else {

      if (this.FormDto.IndicatorId == 0) {

      }
      else {

        this.FormDto.IndicatorId = this.searchForm.controls.indicators.value;
      }

    }


    debugger

    this.parentSubmitted = true;

    this.isLoading = true
    this.subs.add(
      this.reportingService.GetReport(this.FormDto).subscribe(
        (data) => {

          this.isLoading = false
          this.loading = false
          //this.temp = [...data.result];

          this.rows = data.data.reportdto;

          return data;
        },
        (error) => {
          alert(error);
        }
      )
    );

  }

  onReset() {

    this.isReportType = false;
    this.formSelected = false;
    this.isRegistration = false;

    if (this.coreService.loginResponse.user.userLVL === 'Admin') {

      this.searchForm.controls.division.setValue(""),
        this.searchForm.controls.district.setValue(""),
        this.searchForm.controls.tehsil.setValue(""),
        this.searchForm.controls.uc.setValue(""),
        this.searchForm.controls.reportType.setValue("")
      this.searchForm.controls.form.setValue(""),
        this.searchForm.controls.indicators.setValue(""),
        this.searchForm.controls.organization.setValue(""),
        this.searchForm.controls.designation.setValue(""),
        this.searchForm.controls.population.setValue(""),
        this.searchForm.controls.compaign.setValue(""),
        this.searchForm.controls.day.setValue(""),
        this.searchForm.controls.userType.setValue("")

    }
    if (this.coreService.loginResponse.user.userLVL === 'Division') {


      this.searchForm.controls.district.setValue(""),
        this.searchForm.controls.tehsil.setValue(""),
        this.searchForm.controls.uc.setValue(""),
        this.searchForm.controls.reportType.setValue("")
      this.searchForm.controls.form.setValue(""),
        this.searchForm.controls.indicators.setValue(""),
        this.searchForm.controls.organization.setValue(""),
        this.searchForm.controls.designation.setValue(""),
        this.searchForm.controls.population.setValue(""),
        this.searchForm.controls.compaign.setValue(""),
        this.searchForm.controls.day.setValue(""),
        this.searchForm.controls.userType.setValue("")
    }
    if (this.coreService.loginResponse.user.userLVL === 'District') {

      this.searchForm.controls.tehsil.setValue(""),
        this.searchForm.controls.uc.setValue(""),
        this.searchForm.controls.reportType.setValue("")
      this.searchForm.controls.form.setValue(""),
        this.searchForm.controls.indicators.setValue(""),
        this.searchForm.controls.organization.setValue(""),
        this.searchForm.controls.designation.setValue(""),
        this.searchForm.controls.population.setValue(""),
        this.searchForm.controls.compaign.setValue(""),
        this.searchForm.controls.day.setValue(""),
        this.searchForm.controls.userType.setValue("")
    }
  }

  onChangeSearch(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e) {
    // do something when input is focused
  }

}
