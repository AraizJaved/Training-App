
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ToastrService } from 'ngx-toastr';
import { Subscription, throwError } from 'rxjs';
import { RegisterService } from 'src/app/shared/services/RegisterService/RegisterService';
import { RoleService } from 'src/app/shared/services/RoleService/RoleService';
import { MeetingDTO } from '../MeetingDTO';
import { ContactsMultiFilterDTO } from '../ContactsMultiFilterDTO';

import { catchError, map } from 'rxjs/operators';
import * as _ from 'lodash';
import moment from 'moment';
import { state } from '@angular/animations';
import { AddMeetingOrganizerComponent } from '../add-meeting-organizer/add-meeting-organizer.component';
import { AddMeetingVenueComponent } from '../add-meeting-venue/add-meeting-venue.component';
import { ContactFilterDTO } from 'src/app/Contacts/ContactFilterDTO';
import { SheduleService } from 'src/app/shared/services/ScheduleService/shedule.service';
import { AddTrainingOrgainzerComponent } from '../add-training-orgainzer/add-training-orgainzer.component';
import { TrainingSupportedByComponent } from '../training-supported-by/training-supported-by.component';
import { AddTrainingLevelComponent } from '../add-training-level/add-training-level.component';
import { any } from '@amcharts/amcharts4/.internal/core/utils/Array';
import { number, object } from '@amcharts/amcharts4/core';
import { DateAxis } from '@amcharts/amcharts4/charts';


@Component({
  selector: 'app-add-existing-training',
  templateUrl: './add-existing-training.component.html',
  styleUrls: ['./add-existing-training.component.scss']
})
export class AddExistingTrainingComponent implements OnInit {

  @Input() EventObj: any;
  @Input() _ScheduleList: any;
  public TrainigCategory: any[] = [];
  public OrganizedBy: any[] = [];
  public SupportedBy: any[] = [];
  public TrainingType: any[] = [];
  public Venues: any[] = [];
  public divisions: Array<{ name: string, code: string }> = [];
  public districts: Array<{ name: string, code: string }> = [];
  public tehsils: Array<{ name: string, code: string }> = [];
  public hfTypes: Array<{ name: string, code: string }> = [];
  public digitized: boolean = false
  public notAvailable: boolean = false
  public isvirtualChecked: boolean = false
  public isVuneNotAvailable: boolean = false
  public hideVenue: boolean = false
  RegisterForm: FormGroup;
  private subs = new Subscription();
  MeetingDTO: MeetingDTO = new MeetingDTO();
  text:'';


  @Output() passData: EventEmitter<any> = new EventEmitter();
  ContactsMultiFilterDTO: ContactsMultiFilterDTO = new ContactsMultiFilterDTO();
  ContactsMultiFilterDTOSPL: ContactsMultiFilterDTO = new ContactsMultiFilterDTO();
  error = "";
  loading = false;
  ScheduleList: any[] = []

  public id: number = 0;
  parentSubmitted = false;
  temp: any[];
  rows = [];
  spl = [];
  IsVirtual: boolean;
  IsCanidate: boolean = false;
  IsVenue: boolean;
  IsMonth: boolean;
  IsYear: boolean;
  files: string[] = []
  forms: any;
  date: Date;
  minDate = moment(new Date()).format('YYYY-MM-DDThh:mm');
  formData: FormData;
  Priority: any[] = [
    { name: "High" },
    { name: "Medium" },
    { name: "Low" }]
  model: any;
  cities = [
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' }
  ];
  // dropdownSettings:IDropdownSettings = {
  //   singleSelection: false,
  //   idField: 'participantId',
  //   textField: 'participantName',
  //   selectAllText: 'Select All',
  //   unSelectAllText: 'UnSelect All',
  //   itemsShowLimit: 5,
  //   allowSearchFilter: true
  // };  
  contact = [];
  contactSPL = [];
  userList = [];
  departmentList = [];
  departmentListSPL = [];
  categoryList = [];
  categoryListSPL = [];
  ContactFilterDTO: ContactFilterDTO = new ContactFilterDTO()
  ContactFilterDTOSPL: ContactFilterDTO = new ContactFilterDTO()

  public Designations: [] = [];
  dropdownSettingsCompany: IDropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'name',
    // selectAllText: 'Select All',
    enableCheckAll: false,
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 5,
    allowSearchFilter: true
  };
  dropdownSettingsDepartment: IDropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'departmentName',
    // selectAllText: 'Select All',
    enableCheckAll: false,
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 5,
    allowSearchFilter: true
  };
  dropdownSettingsDesignation: IDropdownSettings = {
    singleSelection: false,
    idField: 'designationId',
    textField: 'designationName',
    // selectAllText: 'Select All',
    enableCheckAll: false,
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 500,
    allowSearchFilter: true
  };
  dropdownSettingsCategory: IDropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'categoryName',
    // selectAllText: 'Select All',
    enableCheckAll: false,
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 5,
    allowSearchFilter: true
  };
  dropdownSettings: IDropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'designation',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 5,
    allowSearchFilter: true
  };
  meetingVenue: IDropdownSettings = {
    singleSelection: true,
    idField: 'id',
    textField: 'designation',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 5,
    allowSearchFilter: true
  };
  dropdownSettingsContact: IDropdownSettings = {
    singleSelection: false,
    idField: 'participantId',
    textField: 'participantName',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 5,
    allowSearchFilter: true
  };
  dropdownSettingsSPLCompany: IDropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'name',
    // selectAllText: 'Select All',
    enableCheckAll: false,
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 5,
    allowSearchFilter: true
  };
  dropdownSettingsSPLDepartment: IDropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'departmentName',
    // selectAllText: 'Select All',
    enableCheckAll: false,
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 5,
    allowSearchFilter: true
  };
  dropdownSettingsSPLCategory: IDropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'categoryName',
    // selectAllText: 'Select All',
    enableCheckAll: false,
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 5,
    allowSearchFilter: true
  };

  dropdownSettingsSPLContact: IDropdownSettings = {
    singleSelection: false,
    idField: 'participantId',
    textField: 'participantName',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 5,
    allowSearchFilter: true
  };
  dropdownSettingsOrg: IDropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'organizer',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 5,
    allowSearchFilter: true
  };
  dropdownSettingsVenue: IDropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'venue',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 5,
    allowSearchFilter: true
  };
  AssignTo: any[] = [];
  AssignToSPL: any[] = [];
  externalParticipant: any[] = [];
  externalParticipantsMobileNo: any[] = [];
  progress: number;
  public isEdit: boolean = false;
  MeetingOrganizer: any[] = [];
  TrainingCategory: any[] = [];
  MeetingVenue: any[] = [];
  MeetingOrganizerId: any[] = [];
  MeetingVenueId: any[] = [];
  TrainingLevels: any[] = [];
  OrganizedBys: any[] = [];
  SupportedBys: any[] = [];
  public dateTime = new Date();
  constructor(private sheduleService: SheduleService, private formBuilder: FormBuilder, private readonly httpClient: HttpClient, private readonly toastr: ToastrService,
    private readonly router: Router, private readonly registerService: RegisterService, private readonly activatedRoute: ActivatedRoute,
    private readonly roleService: RoleService, public activeModal: NgbActiveModal, private modalService: NgbModal) {

    this.id = this.activatedRoute.snapshot.queryParams.id;
    //this.Edit(this.id);

    this.RegisterForm = this.formBuilder.group({
      title: [""],
      Cadre: [],
      trainingType: [""],
      trainingCategory: [""],
      description: [""],
      department: [""],
      assignTo: [""],
      userList: ["All"],
      externalParticipant: [""],
      externalParticipantsMobileNo: [""],
      startDateTime: [""],
      endDateTime: [""],
      eventParticipant: [""],
      organizer: [""],
      venue: [""],
      meetingStatus: [""],
      assignToSPL: [""],
      meetingOrganizer: [""],
      meetingVenue: [""],
      meetingStatusId: [""],
      eventcontactparticipant: [""],
      eventcontactparticipantSPL: [""],
      meetingAttendVia: [""],
      VenuId: [0],
      Division: [any],
      District: [""],
      Tehsil: ["",],
      OrganizedBy: [""],
      SupportedBy: [""],
      TrainingLevel: [""],
      DesignationId: [""],
      IsVirtual: [false],
      IsCanidate: [false],
      IsMonth: [false],
      IsYear: [false],
      IsVenue: [false],
      IsNonDigitized: [false],
      notAvailable: [false],
      InfoNotAvailable: [false],
      totalParticipant: [0],
      Month: [""],
      Year: [0],
    });

  }

  ngOnInit(): void {



    this.date = new Date();
    this.IsVirtual = false;
    this.IsCanidate = false;
    this.IsMonth = false;
    this.IsYear = false;
    this.IsVenue = false;
    this.loadDesignation();
    //this.RegisterForm.controls.dueDate.setValue(date.getDate() - 1);

    // this.subs.add(

    //   this.registerService.getParticepentsList().subscribe(
    //     (data) => {
    //        
    //       //this.temp = [...data.result];
    //       this.AssignTo = data.data;
    //       this.AssignTo=this.AssignTo.filter(x=> x.name !=='Imran Skindar')
    //       console.log("AssignTo", this.AssignTo)
    //       return data;
    //     },
    //     (error) => {
    //       alert(error);
    //     }
    //   )
    // );





    this.getMeetingOrganizer()
    this.getMeetingVenue()
    this.getUserList()
    this.getTrainingCategory()
    this.getTrainingType()
    this.getDepartments()
    this.GetVenues()
    this.getDivision()
    this.getOrganizedBy()
    this.getSupportedBy()
    this.getTrainingLevel()




    // if (this.EventObj) {
    //   setTimeout(() => {
    //     this.setupForm();
    //   }, 500);
    // }

  }
  changed(evt, id) {
    debugger
    if (evt.target.checked) {
      this.IsVirtual = true
      this.notAvailable = true
    }
    else {
      this.IsVirtual = false
      this.notAvailable = false
    }

  }
  changedCandidate(evt) {
    debugger
    if (evt.target.checked) {
      this.IsCanidate = true
      this.digitized = true
      this.IsVirtual = true
    }
    else {
      this.IsCanidate = false
      this.digitized = false
      this.IsVirtual = false
    }

  }
  changedOther(evt, id) {
    debugger
    if (evt.target.checked) {
      this.isVuneNotAvailable = true
      this.hideVenue = true;
    }
    else {
      this.isVuneNotAvailable = false
      this.hideVenue = false;
    }

  }
  changedCandidateOther(evt) {
    debugger
    if (evt.target.checked) {

      this.isvirtualChecked = true
      this.hideVenue = true;
    }
    else {

      this.isvirtualChecked = false
      this.hideVenue = false
    }

  }
  changedMonth(evt) {
    debugger
    if (evt.target.checked) {
      this.IsMonth = true
    }
    else {
      this.IsMonth = false
    }

  }
  changedYear(evt) {
    debugger
    if (evt.target.checked) {
      this.IsYear = true
    }
    else {
      this.IsYear = false
    }

  }
  changedVenue(evt) {
    debugger
    if (evt.target.checked) {
      this.IsVenue = true

    }
    else {
      this.IsVenue = false
    }

  }
  public dropdownValueChanged = (value, filter) => {

    debugger
    console.log(value.target.value);
    let val = value.target.value.split(' ')[1]
    debugger
    if (!value) {
      return;
    }
    if (filter == 'Div') {

      val = this.divisions.filter(x => x.name == val)[0].code;
      this.loadDistrict(val);


    }
    if (filter == 'Dis') {
      val = this.districts.filter(x => x.name == val)[0].code;
      this.loadTehsils(val);

    }
  }

  GetScheduleList() {
    

    this.subs.add(
      this.registerService.GetPreviousScheduleList(state,this.text).subscribe(
        (data) => {



          this.ScheduleList = data.result;

          this.passData.emit(this.ScheduleList);
          console
          return data;
        },
        (error) => {
          alert(error);
        }
      )
    );
  }

  public loadDistrict(divCode: string) {
    this.districts = [];
    this.sheduleService.getDistricts(divCode)
      .subscribe((x: any) => {
        debugger
        if (x) {
          this.districts = x.data;
        }


        if (this.EventObj.district != "" && this.EventObj.district != null) {
          let teh = this.districts.filter(x => x.name == this.EventObj.district)[0].code;
          this.loadTehsils(teh)
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
    debugger
    this.loading = true;
    this.Designations = [];
    this.sheduleService.getDesignations()
      .subscribe((res: any) => {
        this.Designations = res.data;
        this.loading = false;
        if (this.EventObj) {
          this.setupForm();
        }
        console.log('-------------------------------', this.Designations);
      });
  }

  GetVenues() {

    this.subs.add(
      this.registerService.GetVenues().subscribe((data) => {

        debugger
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
  setupForm() {

    debugger


    if (this.EventObj?.totalParticipants != null && this.EventObj?.totalParticipants > 0) {
      const checkbox = document.getElementById(
        'NonAvailable',
      ) as HTMLInputElement | null;

      if (checkbox != null) {
        checkbox.checked = true;
      }


      this.IsCanidate = true
      this.digitized = true
      this.IsVirtual = true



      let cadre = this.EventObj.cadre.split(',')
      if (cadre[cadre.length - 1] == "") {
        cadre.splice((cadre.length - 1), 1)
      }
      let tempCadre = []
      cadre.forEach((ele) => {
        tempCadre.push({
          designationName: ele
        })
      })
      this.RegisterForm.get("title").setValue(this.EventObj.title)
      this.RegisterForm.get('totalParticipant').setValue(this.EventObj.totalParticipants)
      this.RegisterForm.get('Cadre').setValue(tempCadre)
      this.RegisterForm.get('Month').setValue(this.EventObj.month)
      this.RegisterForm.get('Year').setValue(this.EventObj.year)
      this.RegisterForm.get('IsMonth').setValue(true)
      this.RegisterForm.get('IsYear').setValue(true)
      this.IsMonth = true
      this.IsYear = true

      //3520014235601
      // this.RegisterForm.controls['Id'].setValue(this.EventObj.id)
      // this.RegisterForm.controls["Title"].setValue('this.EventObj.title')
      // this.RegisterForm.controls['TotalParticipants'].setValue(this.EventObj.totalParticipants)
      // this.RegisterForm.controls['Cadre'].setValue(this.EventObj.cadre)


    } else if (this.EventObj.title != "" && (this.EventObj?.cadre != "" && this.EventObj?.cadre != null)) {
      let cadre = this.EventObj.cadre.split(',')
      if (cadre[cadre.length - 1] == "") {
        cadre.splice((cadre.length - 1), 1)
      }
      let tempCadre = []
      cadre.forEach((ele) => {
        tempCadre.push({
          designationName: ele
        })
      })
      let tempDeprt = []
      if (this.EventObj?.departments != null) {
        let deprt = this.EventObj.departments.split(',')
        if (deprt[deprt.length - 1] == "") {
          deprt.splice((deprt.length - 1), 1)
        }
        deprt.forEach((ele) => {
          tempDeprt.push({ name: ele })
        })
      }


      let dis = this.divisions.filter(x => x.name == this.EventObj.division)[0]?.code;
      if (dis != null) {

        this.loadDistrict(dis)
      }
      // let div  = this.divisions.filter(x=>x.name == this.EventObj.district)[0].Code;
      // let teh  = this.divisions.filter(x=>x.name == this.EventObj.tehsil)[0].Code;

      let filter = this.divisions.filter(x => x.name == this.EventObj.division)
      this.RegisterForm.get("title").setValue(this.EventObj.title)
      this.RegisterForm.get("description").setValue(this.EventObj.description)
      this.RegisterForm.get("startDateTime").setValue(this.EventObj.startDate == null ? "" : this.EventObj.startDate)
      this.RegisterForm.get("endDateTime").setValue(this.EventObj.endDate == null ? "" : this.EventObj.endDate)
      this.RegisterForm.get("trainingCategory").setValue(this.EventObj.traingCategore == null ? "" : this.EventObj.traingCategore)
      this.RegisterForm.get("TrainingLevel").setValue(this.EventObj.trainingLevel == null ? "" : this.EventObj.trainingLevel)
      this.RegisterForm.get("trainingType").setValue(this.EventObj.trainingType == null ? "" : this.EventObj.trainingType)
      this.RegisterForm.get("OrganizedBy").setValue(this.EventObj.organizedBy == null ? "" : this.EventObj.organizedBy)
      this.RegisterForm.get("SupportedBy").setValue(this.EventObj.supportedBy == null ? "" : this.EventObj.supportedBy)
      this.RegisterForm.get('Cadre').setValue(tempCadre == null ? "" : tempCadre)
      this.RegisterForm.get('department').setValue(tempDeprt == null ? "" : tempDeprt)
      this.RegisterForm.get('Division').patchValue(this.EventObj.division == null ? "" : this.EventObj.division)
      this.RegisterForm.get('District').patchValue(this.EventObj.district == null ? "" : this.EventObj.district)
      this.RegisterForm.get('Tehsil').patchValue(this.EventObj.tehsil == null ? "" : this.EventObj.tehsil)
      this.RegisterForm.get('IsVirtual').setValue(this.EventObj.virtual == null ? "" : this.EventObj.virtual)
      this.RegisterForm.get('VenuId').setValue(this.EventObj.venue == null ? "" : this.EventObj.venue)
      if (this.EventObj.virtual) {
        this.isvirtualChecked = false
        this.isVuneNotAvailable = true
      }
      this.RegisterForm.get('IsVenue').setValue(this.EventObj.venueNotAvailable)
      if (this.EventObj.venueNotAvailable) {
        this.isVuneNotAvailable = false
        this.isvirtualChecked = true
      }
      // this.RegisterForm.get('District').setValue(this.EventObj.district)
      // this.RegisterForm.get('Tehsil').setValue(this.EventObj.tehsil)

    }
    else {
      const checkbox = document.getElementById(
        'nonDigitized',
      ) as HTMLInputElement | null;

      if (checkbox != null) {
        // checkbox.checked = true;
        this.RegisterForm.get("title").setValue(this.EventObj.title)
        this.RegisterForm.get("IsNonDigitized").setValue(true)
        this.IsVirtual = true
        this.notAvailable = true
      }
    }
  }
  // onItemSelect(item: any) {
  //   console.log(item);
  // }
  getUserList() {

    this.subs.add(

      this.registerService.getUserList().subscribe(
        (data) => {

          //this.temp = [...data.result];
          // this.userList.push({
          //   id : "0",
          //   name : 'All Users'
          // });
          data.data.forEach(element => {
            this.userList.push(element)
          });
          this.userList = this.userList.filter(x => x.name !== 'Secretary')
          console.log("userList", this.userList)
          return data;
        },
        (error) => {
          alert(error);
        }
      )
    );
  }


  // --------------------MultiDrop Down
  onItemSelectCompany(item: any) {

    debugger

    console.log(item);


    // if(this.RegisterForm.controls.userList.value=="All"){
    //   this.ContactFilterDTO.userList=null;
    // }
    // else{
    //   this.ContactFilterDTO.userList = this.RegisterForm.controls.userList.value;
    // }
    ;
    if (!this.ContactsMultiFilterDTO.Departments.includes(item.name)) {
      this.ContactsMultiFilterDTO.Departments += item.name + ",";
    }
    this.subs.add(
      this.registerService.getContactMultiDepartmentList(this.ContactsMultiFilterDTO).subscribe(
        (data) => {


          this.temp = [...data.result];

          this.rows = data.result;
          this.departmentList = data.result;
          console.log(this.rows);
          console.log("departmentlist", this.departmentList)
        },
        (error) => {
          alert(error);
        }
      )
    );
  }
  onSelectAllCompany(items: any) {
    console.log(items);
    if (!this.ContactsMultiFilterDTO.Departments.includes(items.name)) {
      this.ContactsMultiFilterDTO.Departments += items.name + ",";
    }
    this.subs.add(
      this.registerService.getContactMultiDepartmentList(this.ContactsMultiFilterDTO).subscribe(
        (data) => {


          this.temp = [...data.result];

          this.rows = data.result;
          this.departmentList = data.result;
          console.log(this.rows);
          console.log("departmentlist", this.departmentList)
        },
        (error) => {
          alert(error);
        }
      )
    );
  }

  onItemDeSelectCompany(item: any) {
    // alert("item")

    console.log(item);

    ;
    if (this.ContactsMultiFilterDTO.contactCompanyIds.includes(item.id)) {
      this.ContactsMultiFilterDTO.contactCompanyIds = this.ContactsMultiFilterDTO.contactCompanyIds.replace(item.id, '');
    }

    this.subs.add(
      this.registerService.getContactMultiDepartmentList(this.ContactsMultiFilterDTO).subscribe(
        (data) => {


          this.temp = [...data.result];

          this.rows = data.result;
          this.departmentList = data.result;
          console.log(this.rows);
        },
        (error) => {
          alert(error);
        }
      )
    );
  }



  onItemSelectCadre(item: any) {
    debugger
    // this.RegisterForm.controls.Cadre
    if (this.EventObj != null) {
      if (this.EventObj.cadre.includes(item.designationName)) {
        // let index = this.RegisterForm.controls.Cadre.value.findIndex(x => x.name == item.designationName && x.designationId != null);
        return this.toastr.error('Cadre/Designation already selected', 'Error')
      }
    }
    this.ContactsMultiFilterDTO.ContactDesignation += item.name + ','

  }

  ////////////////////SPL//////////////////////////
  onItemSelectCompanySPL(item: any) {

    console.log(item);



    ;
    if (!this.ContactsMultiFilterDTOSPL.contactCompanyIds.includes(item.id)) {
      this.ContactsMultiFilterDTOSPL.contactCompanyIds += item.id + ",";
    }
    this.subs.add(
      this.registerService.getContactMultiDepartmentListSPL(this.ContactsMultiFilterDTOSPL).subscribe(
        (data) => {


          this.temp = [...data.result];

          this.rows = data.result;
          this.departmentListSPL = data.result;
          console.log(this.rows);
          console.log("departmentlist", this.departmentListSPL)
        },
        (error) => {
          alert(error);
        }
      )
    );
  }
  onSelectAllCompanySPL(items: any) {
    console.log(items);
    if (!this.ContactsMultiFilterDTOSPL.contactCompanyIds.includes(items.id)) {
      this.ContactsMultiFilterDTOSPL.contactCompanyIds += items.id + ",";
    }
    this.subs.add(
      this.registerService.getContactMultiDepartmentListSPL(this.ContactsMultiFilterDTOSPL).subscribe(
        (data) => {


          this.temp = [...data.result];

          this.rows = data.result;
          this.departmentListSPL = data.result;
          console.log(this.rows);
          console.log("departmentlist", this.departmentListSPL)
        },
        (error) => {
          alert(error);
        }
      )
    );
  }

  onItemDeSelectCompanySPL(item: any) {
    // alert("item")

    console.log(item);

    ;
    if (this.ContactsMultiFilterDTOSPL.contactCompanyIds.includes(item.id)) {
      this.ContactsMultiFilterDTOSPL.contactCompanyIds = this.ContactsMultiFilterDTOSPL.contactCompanyIds.replace(item.id, '');
    }

    this.subs.add(
      this.registerService.getContactMultiDepartmentListSPL(this.ContactsMultiFilterDTOSPL).subscribe(
        (data) => {


          this.temp = [...data.result];

          this.rows = data.result;
          this.departmentListSPL = data.result;
          console.log(this.rows);
        },
        (error) => {
          alert(error);
        }
      )
    );
  }

  // //////////////////////SPL-/////////////////////

  onItemSelectDepartment(item: any) {

    if (this.EventObj != null) {
      if (this.EventObj.departments.includes(item.name)) {
        let index = this.RegisterForm.controls.department.value.findIndex(x => x.name == item.name && x.id != null);
        // this.RegisterForm.controls.department.value.splice(index, 1);  
        return this.toastr.error('Department already selected', 'Error')
      }
    }
    this.ContactsMultiFilterDTO.Departments += item.name + ','


    if (!this.ContactsMultiFilterDTO.ContactDepartmentIds.includes(item.id)) {
      this.ContactsMultiFilterDTO.ContactDepartmentIds += item.id + ",";
    }
    this.subs.add(
      this.registerService.getContactMultiCategoryList(this.ContactsMultiFilterDTO).subscribe(
        (data) => {


          this.temp = [...data.result];

          this.rows = data.result;
          this.categoryList = data.result;
          console.log(this.rows);
          console.log("dcatetmentlist", this.categoryList)
        },
        (error) => {
          alert(error);
        }
      )
    );
  }
  onSelectAllDepartment(items: any) {
    console.log(items);
  }

  onItemDeSelectDepartment(item: any) {
    // alert("item")

    console.log(item);

    ;
    if (this.ContactsMultiFilterDTO.ContactDepartmentIds.includes(item.id)) {
      this.ContactsMultiFilterDTO.ContactDepartmentIds = this.ContactsMultiFilterDTO.ContactDepartmentIds.replace(item.id, '');
    }

    this.subs.add(
      this.registerService.getContactMultiCategoryList(this.ContactsMultiFilterDTO).subscribe(
        (data) => {


          this.temp = [...data.result];

          this.rows = data.result;
          this.categoryList = data.result;
          console.log(this.rows);
        },
        (error) => {
          alert(error);
        }
      )
    );
  }

  ///////////////////////////SPL///////////////////////////
  onItemSelectDepartmentSPL(item: any) {

    ;
    if (!this.ContactsMultiFilterDTOSPL.ContactDepartmentIds.includes(item.id)) {
      this.ContactsMultiFilterDTOSPL.ContactDepartmentIds += item.id + ",";
    }
    this.subs.add(
      this.registerService.getContactMultiCategoryListSPL(this.ContactsMultiFilterDTOSPL).subscribe(
        (data) => {


          this.temp = [...data.result];

          this.rows = data.result;
          this.categoryListSPL = data.result;
          console.log(this.rows);
          console.log("dcatetmentlist", this.categoryListSPL)
        },
        (error) => {
          alert(error);
        }
      )
    );
  }
  onSelectAllDepartmentSPL(items: any) {
    console.log(items);
  }

  onItemDeSelectDepartmentSPL(item: any) {
    // alert("item")

    console.log(item);

    ;
    if (this.ContactsMultiFilterDTOSPL.ContactDepartmentIds.includes(item.id)) {
      this.ContactsMultiFilterDTOSPL.ContactDepartmentIds = this.ContactsMultiFilterDTOSPL.ContactDepartmentIds.replace(item.id, '');
    }

    this.subs.add(
      this.registerService.getContactMultiCategoryListSPL(this.ContactsMultiFilterDTOSPL).subscribe(
        (data) => {


          this.temp = [...data.result];

          this.rows = data.result;
          this.categoryListSPL = data.result;
          console.log(this.rows);
        },
        (error) => {
          alert(error);
        }
      )
    );
  }



  ///////////////////////////SPL//////////////////////////
  // --------------------MultiDrop Down
  onItemSelect(item: any) {

    console.log(item);


    if (this.RegisterForm.controls.userList.value == "All") {
      this.ContactFilterDTO.userList = null;
    }
    else {
      this.ContactFilterDTO.userList = this.RegisterForm.controls.userList.value;
    }
    ;
    if (!this.ContactFilterDTO.contactDesignation.includes(item.id)) {
      this.ContactFilterDTO.contactDesignation += item.id + ",";
    }
    this.subs.add(
      this.registerService.getContactsFilteredList(this.ContactFilterDTO).subscribe(
        (data) => {


          this.temp = [...data.result];

          this.rows = data.result;
          this.contact = data.result;
          console.log(this.rows);
        },
        (error) => {
          alert(error);
        }
      )
    );
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  onItemSelectForContact(item: any) {

  }
  onItemDeSelect(item: any) {
    // alert("item")

    console.log(item);


    if (this.RegisterForm.controls.userList.value == "All") {
      this.ContactFilterDTO.userList = null;
    }
    else {
      this.ContactFilterDTO.userList = this.RegisterForm.controls.userList.value;
    }
    ;
    if (this.ContactFilterDTO.contactDesignation.includes(item.id)) {
      this.ContactFilterDTO.contactDesignation = this.ContactFilterDTO.contactDesignation.replace(item.id, '');
    }

    this.subs.add(
      this.registerService.getContactsFilteredList(this.ContactFilterDTO).subscribe(
        (data) => {


          this.temp = [...data.result];

          this.rows = data.result;
          this.contact = data.result;
          console.log(this.rows);
        },
        (error) => {
          alert(error);
        }
      )
    );
  }

  // ///////SPPPPPPPPPPPPPPPPPPllllllll-----------------------

  onItemSelectSPL(item: any) {

    console.log(item);


    if (this.RegisterForm.controls.userList.value == "All") {
      this.ContactFilterDTOSPL.userList = null;
    }
    else {
      this.ContactFilterDTOSPL.userList = this.RegisterForm.controls.userList.value;
    }
    ;
    if (!this.ContactFilterDTOSPL.contactDesignation.includes(item.id)) {
      this.ContactFilterDTOSPL.contactDesignation += item.id + ",";
    }
    this.subs.add(
      this.registerService.getContactsFilteredList(this.ContactFilterDTOSPL).subscribe(
        (data) => {


          this.temp = [...data.result];

          this.rows = data.result;
          this.contactSPL = data.result;
          console.log(this.rows);
        },
        (error) => {
          alert(error);
        }
      )
    );
  }
  onSelectAllSPL(items: any) {
    console.log(items);
  }
  onItemSelectForContactSPL(item: any) {

  }
  onItemDeSelectSPL(item: any) {
    // alert("item")

    console.log(item);


    if (this.RegisterForm.controls.userList.value == "All") {
      this.ContactFilterDTOSPL.userList = null;
    }
    else {
      this.ContactFilterDTOSPL.userList = this.RegisterForm.controls.userList.value;
    }
    ;
    if (this.ContactFilterDTOSPL.contactDesignation.includes(item.id)) {
      this.ContactFilterDTOSPL.contactDesignation = this.ContactFilterDTOSPL.contactDesignation.replace(item.id, '');
    }

    this.subs.add(
      this.registerService.getContactsFilteredList(this.ContactFilterDTOSPL).subscribe(
        (data) => {


          this.temp = [...data.result];

          this.rows = data.result;
          this.contactSPL = data.result;
          console.log(this.rows);
        },
        (error) => {
          alert(error);
        }
      )
    );
  }
  // -------------------SPL-------------------
  onFileSelect(event) {

    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.model.attachment = file;
    }
  }

  onFileChange(event) {

    for (var i = 0; i < event.target.files.length; i++) {
      this.files.push(event.target.files[i]);
    }
  }

  transform(value: string): Date {
    let reggie = /(\d{4})-(\d{2})-(\d{2})/;
    let dateArray = reggie.exec(value);
    let dateObject = new Date(
      (+dateArray[1]),
      ((+dateArray[2])) - 1, // Careful, month starts at 0!
      (+dateArray[3])
    );
    return dateObject;
  }


  onSubmit() {
    debugger
    this.formData = new FormData()


    if (this._ScheduleList != null) {
      let data = this._ScheduleList.find(x => x.title == this.RegisterForm.controls.title.value);
      if (data != null) {
        return this.toastr.error("Title already exists");
      }
    }


    if (this.RegisterForm.controls.startDateTime.value != "" && this.RegisterForm.controls.endDateTime.value == "")
      return this.toastr.error("Enter End Date")
    else if (this.RegisterForm.controls.startDateTime.value == "" && this.RegisterForm.controls.endDateTime.value != "") {
      return this.toastr.error("Enter Start Date")
    }
    else if (new Date(this.RegisterForm.controls.startDateTime.value) > new Date(this.RegisterForm.controls.endDateTime.value)) {
      this.loading = false
      return this.toastr.error("End Date must be greater than Start Date")
    }


    if (this.RegisterForm.controls.department.value != null && this.RegisterForm.controls.department.value != "") {
      var valueArr = this.RegisterForm.controls.department.value.map(function (item) { return item.name });
      var isDuplicate = valueArr.some(function (item, idx) {
        return valueArr.indexOf(item) != idx
      });

      if (isDuplicate) {
        this.loading = false
        return this.toastr.error('Duplicate Department selected', 'Error');
      }
    }

    if (this.RegisterForm.controls.Cadre.value != null && this.RegisterForm.controls.Cadre.value != "") {
      var valueArr = this.RegisterForm.controls.Cadre.value.map(function (item) { return item.designationName });
      var _isDuplicate = valueArr.some(function (item, idx) {
        return valueArr.indexOf(item) != idx
      });

      if (_isDuplicate) {
        this.loading = false
        return this.toastr.error('Duplicate Cadre/Designation selected', 'Error');
      }
    }


    this.parentSubmitted = true
    this.loading = true;
    if (this.RegisterForm.controls.title.value === '') {
      this.loading = false
      return this.toastr.info("Please fill title field");
    }
    if (this.IsCanidate) {
      let designations = ""
      if (this.RegisterForm.controls.Cadre.value != null) {
        this.RegisterForm.controls.Cadre?.value.forEach((ele) => {
          designations += ele.designationName + ','
        })
      }
      if (this.RegisterForm.controls.totalParticipant.value == 0
        || designations == ''
        || this.RegisterForm.controls.Month.value == ''
        || this.RegisterForm.controls.Year.value == '') {
        this.loading = false;
        return this.toastr.error("Fill all fields", "Error")
      }
      this.formData.append('Id', this.EventObj?.id == null ? 0 : this.EventObj?.id);
      this.formData.append('TrainingId', this.EventObj?.trainingId == null ? 0 : this.EventObj?.trainingId);
      this.formData.append('Title', this.RegisterForm.controls.title.value)
      this.formData.append('IsDigitized', 'false')
      this.formData.append('TotalParticipants', this.RegisterForm.controls.totalParticipant.value)
      this.formData.append('Cadre', designations);
      this.formData.append('Month', this.RegisterForm.controls.Month.value)
      this.formData.append('Year', this.RegisterForm.controls.Year.value)
      this.subs.add(
        this.registerService.AddPreviousTraining(this.formData)
          .pipe(
            map((event: any) => {
              if (event.type == HttpEventType.UploadProgress) {
                this.progress = Math.round((100 / event.total) * event.loaded);
                if (this.progress == 100) {
                  var contaxt = this;
                  // setTimeout(fun, 2000);
                  // function fun() {
                  //   contaxt.activeModal.close();
                  //   window.location.reload()
                  // }
                  if (this.MeetingDTO.id > 0) {
                    this.toastr.success("Record Updated Sucessfully", "Updated", { closeButton: true });
                    // fun()
                    this.loading = false
                    return
                  } else {
                    this.toastr.error("Error Occured", "Error");
                    this.loading = false
                    return
                  }

                }
              } else if (event.type == HttpEventType.Response) {
                this.progress = null;
                this.loading = false
              }
            }),
            catchError((err: any) => {
              this.progress = null;

              //alert(err.message);
              console.log(err.message);
              return throwError(err.message);

            })
          )
          .subscribe(
            (data) => {
              console.log("data Response", data)
              this.CloseModal();
              this.GetScheduleList();
              this.loading = false;
              if (this.EventObj != null) {
                this.toastr.success("Record Updated Sucessfully", "Updated", { closeButton: true });
              } else {
                this.toastr.success("Record Saved Sucessfully", "Saved", { closeButton: true });
              }
            },
            (error) => {
              this.error = error;
              this.loading = false;
            }
          )
      );
    }
    else {



      let venueId: any = 0
      if (!this.RegisterForm.controls.IsVirtual.value) {
        venueId = this.Venues.filter(x => x.venue === this.RegisterForm.controls.VenuId.value)[0]?.id
      }
      let designations = ""
      this.ContactsMultiFilterDTO.Departments = ""
      if (!this.RegisterForm.controls.IsNonDigitized.value || !this.notAvailable) {
        if (this.RegisterForm.controls.Cadre.value != null) {
          this.RegisterForm.controls.Cadre?.value.forEach((ele) => {
            designations += ele.designationName + ','
          })
        }
        if (this.RegisterForm.controls.department.value != null && this.RegisterForm.controls.department.value != "") {
          this.RegisterForm.controls.department?.value.forEach((ele) => {
            this.ContactsMultiFilterDTO.Departments += ele.name + ','
          })
        }
      }

      if (designations == '' && !this.IsVirtual) {
        this.loading = false;
        return this.toastr.info("Please Select Cadre/Designation");
      }


      let divisionId = "";
      let districtId = "";
      let tehsilId = "";
      if (!this.RegisterForm.controls.IsNonDigitized.value || !this.notAvailable) {

        divisionId = this.divisions.filter(x => x.name == this.RegisterForm.controls.Division.value)[0]?.code
        if (divisionId != null) {
          districtId = this.districts.filter(x => x.name == this.RegisterForm.controls.District.value)[0]?.code
          if (districtId != null) {
            tehsilId = this.tehsils.filter(x => x.name == this.RegisterForm.controls.Tehsil.value)[0]?.code;
            if (tehsilId == null) {
              tehsilId = ''
            }
          } else {
            districtId = ''
          }
        } else {
          divisionId = ''
        }
      }


      if ((this.IsVirtual && this.notAvailable) || (this.IsCanidate && this.digitized && this.IsVirtual)) {
        this.RegisterForm.get('trainingType').setValue('')
        this.RegisterForm.get('trainingCategory').setValue('')
        this.RegisterForm.get('description').setValue('')
        this.RegisterForm.get('startDateTime').setValue('')
        this.RegisterForm.get('endDateTime').setValue('')
        this.RegisterForm.get('OrganizedBy').setValue('')
        this.RegisterForm.get('SupportedBy').setValue('')
        this.RegisterForm.get('TrainingLevel').setValue('')
        this.RegisterForm.get('TrainingLevel').setValue('')
        this.RegisterForm.get('TrainingLevel').setValue('')
        this.RegisterForm.get('IsVenue').setValue(false)
        this.RegisterForm.get('IsVirtual').setValue(false)
      }


      // let datq = this.transform(this.RegisterForm.controls.startDateTime.value);
      this.formData.append('Id', this.EventObj?.id == null ? 0 : this.EventObj?.id);
      this.formData.append('TrainingId', this.EventObj?.trainingId == null ? 0 : this.EventObj?.trainingId);
      this.formData.append('Title', this.RegisterForm.controls.title.value)
      this.formData.append('Cadre', designations)
      this.formData.append('TrainingType', this.RegisterForm.controls.trainingType.value)
      this.formData.append('TrainingCategory', this.RegisterForm.controls.trainingCategory.value)
      this.formData.append('Description', this.RegisterForm.controls.description.value)
      this.formData.append('Departments', this.ContactsMultiFilterDTO.Departments)
      this.formData.append('StartDateTime', this.RegisterForm.controls.startDateTime.value)
      this.formData.append('EndDateTime', this.RegisterForm.controls.endDateTime.value)
      this.formData.append('VenueId', venueId == null ? 0 : venueId)
      this.formData.append('Division', divisionId)
      this.formData.append('District', districtId)
      this.formData.append('Tehsil', tehsilId)
      this.formData.append('OrganizedBy', this.RegisterForm.controls.OrganizedBy.value)
      this.formData.append('SupportedBy', this.RegisterForm.controls.SupportedBy.value)
      this.formData.append('TrainingLevel', this.RegisterForm.controls.TrainingLevel.value)
      this.formData.append('IsVirtual', this.RegisterForm.controls.IsVirtual.value)
      // this.formData.append('IsCanidate', this.RegisterForm.controls.IsCanidate.value)
      this.formData.append('IsVenue', this.RegisterForm.controls.IsVenue.value)
      // this.formData.append('IsMonth', this.RegisterForm.controls.IsMonth.value)
      // this.formData.append('IsYear', this.RegisterForm.controls.IsYear.value)
      // this.formData.append('Month', this.RegisterForm.controls.Month.value)
      // this.formData.append('Year', this.RegisterForm.controls.Year.value)
      this.formData.append('Virtual', this.RegisterForm.controls.IsVirtual.value)
      this.formData.append('VenueNotAvailable', this.RegisterForm.controls.IsVenue.value)
      this.formData.append('IsDigitized', this.RegisterForm.controls.IsNonDigitized.value)
      // this.formData.append('TotalParticipants', this.RegisterForm.controls.totalParticipant.value)
      this.subs.add(
        this.registerService.AddPreviousTraining(this.formData)
          .pipe(
            map((event: any) => {
              if (event.type == HttpEventType.UploadProgress) {
                this.progress = Math.round((100 / event.total) * event.loaded);
                if (this.progress == 100) {
                  var contaxt = this;
                  setTimeout(() => {
                    debugger
                    contaxt.activeModal.close();
                    window.location.reload()
                  }, 2000);
                  // function fun() {

                  //   contaxt.activeModal.close();
                  //   window.location.reload()
                  // }
                  if (this.MeetingDTO.id > 0) {
                    this.toastr.success("Record Updated Sucessfully", "Updated", { closeButton: true });
                    // fun()
                    return
                  } else {
                    this.toastr.error("Error Occured", "Error");
                    return
                  }

                }
              } else if (event.type == HttpEventType.Response) {
                this.progress = null;
              }
            }),
            catchError((err: any) => {
              this.progress = null;

              //alert(err.message);
              console.log(err.message);
              return throwError(err.message);

            })
          )
          .subscribe(
            (data) => {
              console.log("data Response", data)
              this.CloseModal()
              this.GetScheduleList();
              window.location.reload()
              this.loading = false;
              if (this.EventObj != null) {
                this.toastr.success("Record Updated Sucessfully", "Updated", { closeButton: true });
              } else {
                this.toastr.success("Record Saved Sucessfully", "Saved", { closeButton: true });
              }

            },
            (error) => {
              this.error = error;
              this.loading = false;
            }
          )
      );
    }

    debugger



  }
  CloseModal() {
    this.modalService.dismissAll();
  }

  getMeetingOrganizer() {

    this.subs.add(
      this.registerService.getMeetingOrganizer(state).subscribe(
        (data) => {

          this.temp = [...data.result];

          this.MeetingOrganizer = data.result;
          console
          return data;
        },
        (error) => {
          alert(error);
        }
      )
    );
  }
  getTrainingCategory() {

    this.subs.add(
      this.registerService.getTrainingCategory(state).subscribe(
        (data) => {

          this.temp = [...data.result];

          this.TrainigCategory = data.result;
          console.log('///////////////////////////////////////', this.TrainigCategory)
          return data;
        },
        (error) => {
          alert(error);
        }
      )
    );
  }
  getOrganizedBy() {

    this.subs.add(
      this.registerService.getOrganizedBy(state).subscribe(
        (data) => {
          debugger

          this.temp = [...data.data];

          this.OrganizedBys = data.data;

          console.log('///////////////////////////////////////', this.OrganizedBy)
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
  getDepartments() {


    this.subs.add(
      this.registerService.getDepartment(state).subscribe(
        (data) => {

          this.temp = [...data.result];

          this.AssignTo = data.result;
          console.log('///////////////////////////////////////', this.TrainigCategory)
          return data;
        },
        (error) => {
          alert(error);
        }
      )
    );
  }
  getTrainingType() {

    this.subs.add(
      this.registerService.getTrainingType().subscribe((data) => {


        this.TrainingType = data.data;
        console.log('-----------------------------------', data)
        return data;
      },
        (error) => {
          alert(error.message);
        }
      )
    );
  }


  AddTrainingType() {

    sessionStorage.setItem('Category', 'Trainig Type');
    const modalRef = this.modalService.open(AddMeetingOrganizerComponent, { size: 'lg' });

    modalRef.result.then((data) => {

      this.getTrainingType();
      //this.FilterEvent()

      //this.activeModal.close()
    }, (reason) => {
      // on dismiss
    });
  }
  AddTrainingCategory() {


    sessionStorage.setItem('Category', 'Trainig Category');
    const modalRef = this.modalService.open(AddMeetingOrganizerComponent, { size: 'lg' });

    modalRef.result.then((data) => {


      this.getTrainingCategory();
      //this.FilterEvent()

      //this.activeModal.close()
    }, (reason) => {
      // on dismiss
    });
  }
  AddOrganizedBy() {



    const modalRef = this.modalService.open(AddTrainingOrgainzerComponent, { size: 'lg' });

    modalRef.result.then((data) => {


      this.getOrganizedBy();
      //this.FilterEvent()

      //this.activeModal.close()
    }, (reason) => {
      // on dismiss
    });
  }
  AddSupportedBy() {



    const modalRef = this.modalService.open(TrainingSupportedByComponent, { size: 'lg' });

    modalRef.result.then((data) => {


      this.getSupportedBy();
      //this.FilterEvent()

      //this.activeModal.close()
    }, (reason) => {
      // on dismiss
    });
  }
  getTrainingLevel() {
    this.subs.add(
      this.registerService.getTrainingLevel().subscribe((data) => {


        this.TrainingLevels = data.data;
        console.log('-----------------------------------', data)
        return data;
      },
        (error) => {
          alert(error.message);
        }
      )
    );
  }
  AddTrainingLevel() {
    sessionStorage.setItem('Category', 'Trainig Category');
    const modalRef = this.modalService.open(AddTrainingLevelComponent, { size: 'lg' });

    modalRef.result.then((data) => {


      this.getTrainingCategory();
      //this.FilterEvent()

      //this.activeModal.close()
    }, (reason) => {
      // on dismiss
    });
  }

  AddMeetingVenue() {

    const modalRef = this.modalService.open(AddMeetingVenueComponent, { size: 'lg' });

    modalRef.result.then((data) => {

      //this.FilterEvent()
      this.getMeetingVenue();
      //this.activeModal.close()
    }, (reason) => {
      // on dismiss
    });
  }
  getMeetingVenue() {

    this.subs.add(
      this.registerService.getMeetingVenue(state).subscribe(
        (data) => {

          this.temp = [...data.result];

          this.MeetingVenue = data.result;
          console
          return data;
        },
        (error) => {
          alert(error);
        }
      )
    );
  }


}

