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
import { AddTrainingLevelComponent } from '../add-training-level/add-training-level.component';
import { TrainingSupportedByComponent } from '../training-supported-by/training-supported-by.component';
import { AddTrainingOrgainzerComponent } from '../add-training-orgainzer/add-training-orgainzer.component';
import { SheduleService } from 'src/app/shared/services/ScheduleService/shedule.service';
import { number } from '@amcharts/amcharts4/core';


@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit {

  @Input() EventObj: any;
  @Input() eventData: any;
  public TrainigCategory: any[] = [];
  public TrainingType: any[] = [];
  public isExist: boolean = false


  RegisterForm: FormGroup;
  private subs = new Subscription();
  MeetingDTO: MeetingDTO = new MeetingDTO();
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
  public Designations: [] = [];
  public designationData: any;
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
  AssignTo: any[] = [];
  AssignToSPL: any[] = [];
  externalParticipant: any[] = [];
  externalParticipantsMobileNo: any[] = [];
  progress: number;
  public isEdit: boolean = false;
  MeetingOrganizer: any[] = [];
  TrainingCategory: any[] = [];
  TrainingLevels: any[] = [];
  OrganizedBys: any[] = [];
  SupportedBys: any[] = [];
  MeetingVenue: any[] = [];
  MeetingOrganizerId: any[] = [];
  MeetingVenueId: any[] = [];

  constructor(private formBuilder: FormBuilder, private readonly httpClient: HttpClient, private readonly toastr: ToastrService,
    private readonly router: Router, private readonly registerService: RegisterService, private readonly activatedRoute: ActivatedRoute,
    private readonly roleService: RoleService, public activeModal: NgbActiveModal, private modalService: NgbModal,
    public sheduleService: SheduleService) {

    this.id = this.activatedRoute.snapshot.queryParams.id;


    //this.Edit(this.id);

    this.RegisterForm = this.formBuilder.group({
      id: [number],
      title: ["", Validators.required],
      Cadre: [""],
      trainingType: [""],
      trainingCategory: [""],
      description: [""],
      department: [""],
      assignTo: [""],
      userList: ["All"],
      OrganizedBy: [""],
      SupportedBy: [""],
      TrainingLevel: [""],

      //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


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
      DesignationId: [number]

      ////////////////// Commented for temporary validaion requirments ////////////////////////////////////////////
      // externalParticipant: ["", Validators.required],
      // externalParticipantsMobileNo: ["", Validators.required],
      // startDateTime: ["", Validators.required],
      // endDateTime: [""],
      // eventParticipant: ["", Validators.required],
      // organizer: ["", Validators.required],
      // venue: ["", Validators.required],
      // meetingStatus: ["", Validators.required],
      // assignToSPL: ["", Validators.required],
      // meetingOrganizer: ["", Validators.required],
      // meetingVenue: ["", Validators.required],
      // meetingStatusId: ["", Validators.required],
      // eventcontactparticipant: ["", Validators.required],
      // eventcontactparticipantSPL: ["", Validators.required],
      // meetingAttendVia: ["", Validators.required],
      // DesignationId: [number, Validators.required]
      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    });

  }

  ngOnInit(): void {


    debugger

    this.date = new Date();


    this.getMeetingOrganizer()
    this.getMeetingVenue()
    this.getUserList()
    this.getTrainingCategory()
    this.getTrainingType()

    this.getDepartments()
    this.getTrainingLevel()
    this.getOrganizedBy()
    this.getSupportedBy()
    this.loadDesignation();
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
  setupForm() {

    debugger
    let tempCadre = []
    if (this.EventObj?.cadre != null) {
      let cadre = this.EventObj.cadre.split(',')
      if (cadre[cadre.length - 1] == "") {
        cadre.splice((cadre.length - 1), 1)
      }
      cadre.forEach((ele) => {
        tempCadre.push(ele)
      })
    }

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



    // this.RegisterForm.get('Id').setValue(this.EventObj?.id == null ? '0' : this.EventObj?.id);
    this.RegisterForm.get("title").setValue(this.EventObj.title)
    this.RegisterForm.get('Cadre').setValue(tempCadre == null ? "" : tempCadre)
    this.RegisterForm.get('department').setValue(tempCadre == null ? "" : tempDeprt)
    this.RegisterForm.get("description").setValue(this.EventObj.description)
    this.RegisterForm.get("trainingCategory").setValue(this.EventObj.traingCategore == null ? "" : this.EventObj.traingCategore)
    this.RegisterForm.get("TrainingLevel").setValue(this.EventObj.trainingLevel == null ? "" : this.EventObj.trainingLevel)
    this.RegisterForm.get("trainingType").setValue(this.EventObj.trainingType == null ? "" : this.EventObj.trainingType)
    this.RegisterForm.get("OrganizedBy").setValue(this.EventObj.organizedBy == null ? "" : this.EventObj.organizedBy)
    this.RegisterForm.get("SupportedBy").setValue(this.EventObj.supportedBy == null ? "" : this.EventObj.supportedBy)
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

  // --------------------MultiDrop Down
  onItemSelectCompany(item: any) {



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

    debugger
    if (this.EventObj != null) {
      if (this.EventObj.departments.includes(item.name)) {
        let index = this.RegisterForm.controls.department.value.findIndex(x => x.name == item.name && x.id != null);
        // this.RegisterForm.controls.department.value.splice(index, 1);  
        return this.toastr.error('Department already selected', 'Error')
      }
    }
    this.ContactsMultiFilterDTO.Departments += item.name + ','
    // if (!this.ContactsMultiFilterDTO.ContactDepartmentIds.includes(item.id)) {
    //   this.ContactsMultiFilterDTO.ContactDepartmentIds += item.id + ",";
    // }
    // this.subs.add(
    //   this.registerService.getContactMultiCategoryList(this.ContactsMultiFilterDTO).subscribe(
    //     (data) => {


    //       this.temp = [...data.result];

    //       this.rows = data.result;
    //       this.categoryList = data.result;
    //       console.log(this.rows);
    //       console.log("dcatetmentlist", this.categoryList)
    //     },
    //     (error) => {
    //       alert(error);
    //     }
    //   )
    // );
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


  onSubmit() {


    if (this.eventData != null) {
      let data = this.eventData.find(x => x.title == this.RegisterForm.controls.title.value);
      if (data != null) {
        return this.toastr.error('Training already exists', 'Error');
      }
    }


    debugger
    this.formData = new FormData()





    this.parentSubmitted = true
    this.loading = true;
    if (this.RegisterForm.invalid) {

      if (!this.RegisterForm.controls.title.value) {
        this.loading = false;
        this.toastr.info("Title Field is requird", "Invalid", { closeButton: true });
        return
      }

    }
    debugger
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
    this.ContactsMultiFilterDTO.Departments = ""
    if (this.RegisterForm.controls.department.value != null && this.RegisterForm.controls.department.value != "") {
      this.RegisterForm.controls.department?.value.forEach((ele) => {
        this.ContactsMultiFilterDTO.Departments += ele.name + ','
      })
    }




    this.formData.append('Id', this.EventObj?.id == null ? '0' : this.EventObj?.id);
    this.formData.append('Title', this.RegisterForm.controls.title.value)
    this.formData.append('Cadre', this.RegisterForm.controls.Cadre.value)
    this.formData.append('TrainingType', this.RegisterForm.controls.trainingType.value)
    this.formData.append('TrainingCategory', this.RegisterForm.controls.trainingCategory.value)
    this.formData.append('Description', this.RegisterForm.controls.description.value)
    this.formData.append('Departments', this.ContactsMultiFilterDTO.Departments)
    this.formData.append('OrganizedBy', this.RegisterForm.controls.OrganizedBy.value)
    this.formData.append('SupportedBy', this.RegisterForm.controls.SupportedBy.value)
    this.formData.append('TrainingLevel', this.RegisterForm.controls.TrainingLevel.value)
    this.subs.add(
      this.registerService.AddEvent(this.formData)
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
                if (this.MeetingDTO.id != null) {
                  if (this.MeetingDTO.id > 0) {
                    this.toastr.success("Record Updated Sucessfully", "Updated", { closeButton: true });
                  } else {
                    this.toastr.success("Record Added Sucessfully", "Saved", { closeButton: true });
                  }
                }

              }
            } else if (event.type == HttpEventType.Response) {
              this.progress = null;
            }
          }),
          catchError((err: any) => {
            this.progress = null;
            window.location.reload()

            //alert(err.message);
            console.log(err.message);
            return throwError(err.message);

          })
        )
        .subscribe(
          (data) => {
            console.log("data Response", data)
            this.loading = false;
            // if (data == null) {
            //   this.isExist = true;
            //   return
            // }
            // this.isExist = false
            window.location.reload()


          },
          (error) => {
            this.error = error;
            this.loading = false;

          }
        )
    );
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
          console.log('///////////////------------------', this.TrainigCategory)
          return data;
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
  AddMeetingOrganizer() {

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
