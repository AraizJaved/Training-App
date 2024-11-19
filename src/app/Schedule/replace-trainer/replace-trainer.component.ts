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
import { MeetingDTO } from 'src/app/EventCalender/MeetingDTO';
import { TraineeDto } from 'src/app/Schedule/trainee-dto';
import { ContactsMultiFilterDTO } from 'src/app/EventCalender/ContactsMultiFilterDTO';
import { ParticipantStatusDto } from 'src/app/Participants/participants-list/participant-status-dto'

import { catchError, map } from 'rxjs/operators';
import * as _ from 'lodash';
import moment from 'moment';
import { state } from '@angular/animations';
import { AddMeetingOrganizerComponent } from 'src/app/EventCalender/add-meeting-organizer/add-meeting-organizer.component';
import { AddMeetingVenueComponent } from 'src/app/EventCalender/add-meeting-venue/add-meeting-venue.component';
import { ContactFilterDTO } from 'src/app/Contacts/ContactFilterDTO';
import { SheduleService } from 'src/app/shared/services/ScheduleService/shedule.service';
import { Change } from '@progress/kendo-angular-charts/dist/es2015/common/configuration.service';

@Component({
  selector: 'app-replace-trainer',
  templateUrl: './replace-trainer.component.html',
  styleUrls: ['./replace-trainer.component.scss']
})
export class ReplaceTrainerComponent implements OnInit {

  @Input() EventObj: any;
  public cnic: boolean = true;
  public filter: boolean = false;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  public TrainigCategory: any[] = [];
  public TrainingType: any[] = [];
  public Trainings: any[] = [];
  public traineeList: any[] = [];
  public Venues: any[] = [];
  public Designations: any[] = [];
  public DesignationId: any = null
  public HmisCodeDesignation = { DesignationId: 0, HfmisList: [] };
  participantStatusDto: ParticipantStatusDto = new ParticipantStatusDto();
  response: boolean;



  RegisterForm: FormGroup;
  private subs = new Subscription();
  MeetingDTO: MeetingDTO = new MeetingDTO();
  TraineeDto: TraineeDto = new TraineeDto();
  ContactsMultiFilterDTO: ContactsMultiFilterDTO = new ContactsMultiFilterDTO();
  ContactsMultiFilterDTOSPL: ContactsMultiFilterDTO = new ContactsMultiFilterDTO();
  error = "";
  loading = false;

  public id: number = 0;
  parentSubmitted = false;
  temp: any[];
  rows = [];
  spl = [];
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
  contact = [];
  contactSPL = [];
  userList = [];
  HfmisList = [];
  selectedTraineeList: any[] = [];
  departmentList = [];
  departmentListSPL = [];
  categoryList = [];
  categoryListSPL = [];
  ContactFilterDTO: ContactFilterDTO = new ContactFilterDTO()
  ContactFilterDTOSPL: ContactFilterDTO = new ContactFilterDTO()

  ScheduleList: any[] = []
  @Output() Response: EventEmitter<any> = new EventEmitter();

  dropdownSettingsDesignation: IDropdownSettings = {
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
  dropdownSettingsHf: IDropdownSettings = {
    singleSelection: false,
    idField: 'hfmisCode',
    textField: 'fullName',
    selectAllText: 'Select All',
    enableCheckAll: false,
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 5,
    allowSearchFilter: true
  };
  dropdownSettingTrainee: IDropdownSettings = {
    singleSelection: false,
    idField: 'profileId',
    textField: 'fullName',
    selectAllText: 'Select All',
    enableCheckAll: false,
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 5,
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
  public isEdit: boolean = false;
  TrainingCategory: any[] = [];
  MeetingVenue: any[] = [];
  MeetingOrganizerId: any[] = [];
  MeetingVenueId: any[] = [];
  public divisions: Array<{ Name: string, Code: string }> = [];
  public districts: Array<{ Name: string, Code: string }> = [];
  public tehsils: Array<{ Name: string, Code: string }> = [];
  public hfTypes: Array<{ Name: string, Code: string }> = [];
  // public healthFacilities:any[] = [];
  public healthFacilities: any[] = [];
  public BasicHealthUnit: Array<{ Name: string, Code: string }> = [];
  public BasicHealthUnitType = { Name: "", Code: "" };
  public HFType: any[] = [];
  public isDisable: boolean = false;
  public tempHF: string = ""

  public progress: any = null

  constructor(private sheduleService: SheduleService, private formBuilder: FormBuilder, private readonly httpClient: HttpClient, private readonly toastr: ToastrService,
    private readonly router: Router, private readonly registerService: RegisterService, private readonly activatedRoute: ActivatedRoute,
    private readonly roleService: RoleService, public activeModal: NgbActiveModal, private modalService: NgbModal) {

    this.id = this.activatedRoute.snapshot.queryParams.id;
    //this.Edit(this.id);

    this.RegisterForm = this.formBuilder.group({
      id: [0, Validators.required],
      title: ["", Validators.required],
      Cadre: ["", Validators.required],
      trainingType: ["", Validators.required],
      trainingCategory: ["", Validators.required],
      description: ["", Validators.required],
      department: ["", Validators.required],
      assignTo: ["", Validators.required],
      userList: ["All", Validators.required],
      divisionData: ["", Validators.required],
      districtsData: ["", Validators.required],
      tehsilData: ["", Validators.required],
      HfTypesData: ["", Validators.required],
      healthFacilitiesData: ["", Validators.required],
      BasicHealthUnitType: ["", Validators.required],
      DesignationId: [0, Validators.required],
      Designation: [],
      personCnic: ["", Validators.required],
      cnicSearch: [true],
      filterSearch: [false],

      //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

      externalParticipant: ["", Validators.required],
      externalParticipantsMobileNo: ["", Validators.required],
      startDateTime: ["", Validators.required],
      endDateTime: [""],
      eventParticipant: ["", Validators.required],
      organizer: ["", Validators.required],
      venue: ["", Validators.required],
      meetingStatus: ["", Validators.required],
      assignToSPL: ["", Validators.required],
      meetingOrganizer: ["", Validators.required],
      meetingVenue: ["", Validators.required],
      meetingStatusId: ["", Validators.required],
      eventcontactparticipant: ["", Validators.required],
      eventcontactparticipantSPL: ["", Validators.required],
      meetingAttendVia: ["", Validators.required],

    });

  }

  ngOnInit(): void {



    this.date = new Date();

    if (this.EventObj) {

      this.setupForm();
    }
    // this.getMeetingOrganizer()


    // this.getTrainingCategory()
    // this.getTrainingType()
    // this.getDepartments()
    this.getTrainings()

    this.getDivision();
    this.loadDesignation();

  }

  public getDivision() {
    this.sheduleService.getDivisions().subscribe((res: any) => {

      this.divisions = res.data;
    })
  }
  public loadDesignation() {
    this.Designations = [];
    this.loading = true;
    this.sheduleService.getDesignations()
      .subscribe((res: any) => {
        debugger;

        this.Designations = res.data;
        this.loading = false;

      });
  }


  public check() {
    if (this.cnic) {
      this.cnic = false;
      this.filter = true;
    } else if (this.filter) {
      this.cnic = true;
      this.filter = false;
    }
  }

  public searchByCnic() {
    if (this.RegisterForm.controls.personCnic.value.length != 13) {
      return this.toastr.error('Invalid Cnin', 'Error')
    }

    this.traineeList = []
    this.registerService.participantByCnic(this.RegisterForm.controls.personCnic.value).subscribe((res: any) => {
      debugger
      if (res == false) {
        return this.toastr.info('External Participants (Personnel not registered in HRMIS)')
      }
      this.traineeList = [res];
      return this.toastr.success('Found', 'success')
    })
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

  public loadHFTypes() {
    this.HFType = [];
    this.sheduleService.getHFTypes()
      .subscribe((x: any) => {
        if (x) {
          this.HFType = x;
        }
      });
  }

  private getHfTypes = () => {
    this.sheduleService.getHfTypes().subscribe((res: any) => {
      this.hfTypes = res.data;
      console.log(this.hfTypes);
    }
    );
  }
  public getHfList(disCode: string, bhuCode: string, bhuName: string) {

    this.sheduleService.getHfList(disCode, bhuCode, bhuName).subscribe(
      (res: any) => {
        if (res) {
          debugger
          this.healthFacilities = res.data;
          console.log('/////////////////////////', this.healthFacilities);
        }
      },
      err => {
      }
    );
  }

  public getBhuList() {
    debugger
    this.sheduleService.getBhuList().subscribe(
      (res: any) => {
        if (res) {

          this.BasicHealthUnit = res.data;
          console.log(this.BasicHealthUnit);
        }
      },
      err => {
      }
    );
  }


  public dropdownValueChanged = (value, filter) => {

    console.log(value.target.value);
    let val = value.target.value.split(' ')[1]
    debugger
    if (!value) {
      return;
    }
    if (filter == 'Div') {

      this.loadDistrict(val);


    }
    if (filter == 'Dis') {
      this.loadTehsils(val);

    }
    if (filter == 'Teh') {
      this.getHfTypes();
    }
    if (filter === "bhu") {

      if (this.RegisterForm.controls.HfTypesData.value === '014') {
        this.getBhuList();

      } else {
        this.getHfList(this.RegisterForm.controls.districtsData.value, this.RegisterForm.controls.HfTypesData.value, this.BasicHealthUnitType?.Name);

      }
    }

    if (filter === 'hft') {
      debugger
      let tempBHU = '';
      if (this.RegisterForm.controls.BasicHealthUnitType.value == 'BHU 24/7') {
        tempBHU = 'BHU 24';
      }
      debugger
      tempBHU = this.RegisterForm.controls.BasicHealthUnitType.value;
      this.getHfList(this.RegisterForm.controls.districtsData.value, this.RegisterForm.controls.HfTypesData.value,
        tempBHU);
    }
  };



















  setupForm() {

    this.RegisterForm.get("id").setValue(this.EventObj.id)
    this.RegisterForm.get("title").setValue(this.EventObj.title)
    this.RegisterForm.get("description").setValue(this.EventObj.description)
    //this.RegisterForm.get("startDateTime").setValue(this.EventObj.startDateTime)
    // this.RegisterForm.get("endDateTime").setValue(this.EventObj.endDateTime)
    //this.RegisterForm.get("eventParticipant").setValue(this.EventObj.eventParticipant)
    //this.RegisterForm.get("externalParticipant").setValue(this.EventObj.externalParticipant)
    // this.RegisterForm.get("organizer").setValue(this.EventObj.organizer)
    // this.RegisterForm.get("meetingStatus").setValue(this.EventObj.meetingStatus)
    //  this.RegisterForm.get("meetingAttendVia").setValue(this.EventObj.meetingAttendVia)
    // this.RegisterForm.get("venue").setValue(this.EventObj.venue)
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

    ;
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





  ///////////////////////////SPL//////////////////////////
  // --------------------MultiDrop Down

  onItemSelectTrainee(item: any) {
    debugger
    console.log('Traine Id', item);

    this.selectedTraineeList.push({ profileId: item.profileId });

  }
  ondeSelectTrainee(item: any) {
    debugger
    console.log('Traine Id', this.selectedTraineeList);



    this.selectedTraineeList = this.selectedTraineeList.filter(d => d.profileId !== item.profileId);
    console.log('Traine list', this.selectedTraineeList);



  }

  onItemSelect(item: any) {
    debugger
    console.log(item);
    this.HfmisList.push(item.hfmisCode);


    this.DesignationId = this.RegisterForm.controls.Designation.value[0].designationId;
    this.HmisCodeDesignation.DesignationId = this.DesignationId;
    this.HmisCodeDesignation.HfmisList = this.HfmisList;
    this.getTrainer(this.HmisCodeDesignation)




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



  onSubmit() {
    debugger

    this.parentSubmitted = true
    this.loading = true;

    let formValues = this.RegisterForm.controls;
    if ((formValues.districtsData.value == ''
      || formValues.tehsilData.value == ''
      || formValues.HfTypesData.value == ''
      || formValues.Designation.value[0].designationId == 0
      || this.HfmisList.length == 0
      || this.selectedTraineeList.length == 0) && this.cnic == false)
      return this.toastr.error("All Fields are reuqired", 'Error');


    this.TraineeDto.ScheduleId = this.EventObj.scheduleId;
    this.TraineeDto.ProfileId = this.EventObj.profileId;
    if (!this.TraineeDto?.ScheduleId) {
      this.TraineeDto.ScheduleId = this.EventObj.scheduleId;
    }
    
    this.TraineeDto.Trainees = this.selectedTraineeList
    this.subs.add(
      this.registerService.ReplaceTrainer(this.TraineeDto).subscribe((data) => {

        debugger
        this.loading = false;
        var contaxt = this;
        if (data === true) {
          this.toastr.success("Record Added Sucessfully", "Saved", { closeButton: true });
          this.passEntry.emit(this.EventObj.scheduleId);
          contaxt.activeModal.close();
          //  window.location.reload()

        }
        else {
          this.passEntry.emit(this.EventObj.scheduleId);

          this.toastr.error("Trainer not available for replace", "Error", { closeButton: true });
        }
        console.log('-----------------------------------', data)

        return data;
      },
        (error) => {
          alert(error.message);
        }
      )
    );





    // this.subs.add(
    //   this.registerService.AddTrainee(this.TraineeDto)
    //     .pipe(
    //       map((event: any) => {
    //         if (event.type == HttpEventType.UploadProgress) {
    //           this.progress = Math.round((100 / event.total) * event.loaded);
    //           debugger
    //           if (this.progress == 100) {
    //             var contaxt = this;
    //             setTimeout(fun, 2000);
    //             function fun() {

    //               contaxt.activeModal.close();
    //               window.location.reload()
    //             }
    //            this.toastr.success("Record Added Sucessfully", "Saved", { closeButton: true });


    //           }
    //         } else if (event.type == HttpEventType.Response) {
    //           this.progress = null;
    //         }
    //       }),
    //       catchError((err: any) => {
    //         this.progress = null;

    //         //alert(err.message);
    //         console.log(err.message);
    //         return throwError(err.message);

    //       })
    //     )
    //     .subscribe(
    //       (data) => {
    //         console.log("data Response", data)
    //         this.loading = false;


    //       },
    //       (error) => {
    //         this.error = error;
    //         this.loading = false;
    //       }
    //     )
    // );
  }
  getDesugnation() {

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
  CloseModal() {
    this.modalService.dismissAll();
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
  getTrainee(hfmisCodeList: any) {

    this.subs.add(
      this.registerService.getTrainee(hfmisCodeList).subscribe((data) => {
        debugger;

        this.traineeList = data;
        console.log('////////////////////--------------', data)

      },
        (error) => {
          alert(error.message);
        }
      )
    );
  }
  getTrainer(hfmisCodeDesigantionList: any) {

    this.subs.add(
      this.registerService.getTrainee(hfmisCodeDesigantionList).subscribe((data) => {
        debugger;

        this.traineeList = data;
        console.log('-----------------------------------', data)

      },
        (error) => {
          alert(error.message);
        }
      )
    );
  }
  public ChangeStatus(data) {
    debugger
    this.participantStatusDto.ScheduleId = data.scheduleId;
    this.participantStatusDto.ProfileId = data.profileId;
    this.participantStatusDto.Status = data.status;


    debugger
    this.subs.add(
      this.registerService.ChangeAttendanceStatus(this.participantStatusDto).subscribe((data) => {

        debugger
        this.response = data;
        if (this.response) {
          this.toastr.success("Record Added Sucessfully", "Saved", { closeButton: true });
          this.GetScheduleWithParticepants(this.participantStatusDto.ScheduleId)

        }
        else {
          this.toastr.error("Oops Error", "Saved", { closeButton: true });

        }

        return data;
      },
        (error) => {
          alert(error.message);
        }
      )
    );
  }
  GetScheduleWithParticepants(id: any) {
    debugger

    this.subs.add(

      this.registerService.GetScheduleWithParticepants(id).subscribe(
        (data: any) => {
          debugger

          window.location.reload();
        },
        (error) => {
          alert(error);
        }
      )
    );

  }














}


