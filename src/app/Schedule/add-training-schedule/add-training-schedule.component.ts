
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
import { ContactsMultiFilterDTO } from 'src/app/EventCalender/ContactsMultiFilterDTO';

import { catchError, map } from 'rxjs/operators';
import * as _ from 'lodash';
import moment from 'moment';
import { state } from '@angular/animations';
import { AddMeetingOrganizerComponent } from 'src/app/EventCalender/add-meeting-organizer/add-meeting-organizer.component';
import { AddMeetingVenueComponent } from 'src/app/EventCalender/add-meeting-venue/add-meeting-venue.component';
import { ContactFilterDTO } from 'src/app/Contacts/ContactFilterDTO';
import { SheduleService } from 'src/app/shared/services/ScheduleService/shedule.service';
import { TrainingSupportedByComponent } from 'src/app/EventCalender/training-supported-by/training-supported-by.component';
import { AddTrainingOrgainzerComponent } from 'src/app/EventCalender/add-training-orgainzer/add-training-orgainzer.component';
import { number } from '@amcharts/amcharts4/core';

@Component({
  selector: 'app-add-training-schedule',
  templateUrl: './add-training-schedule.component.html',
  styleUrls: ['./add-training-schedule.component.scss']
})
export class AddTrainingScheduleComponent implements OnInit {

  @Input() EventObj: any;
  public TrainigCategory: any[] = [];
  public TrainingType: any[] = [];
  public Trainings: any[] = [];
  public Venues: any[] = [];
  public Designations: any[] = [];
  public OrganizedBy: any[] = [];
  public SupportedBy: any[] = [];
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
  IsVirtual: boolean;
  spl = [];
  files: string[] = []
  forms: any;
  date: Date;
  public divisions: Array<{ Name: string, Code: string }> = [];
  public districts: Array<{ Name: string, Code: string }> = [];
  public tehsils: Array<{ Name: string, Code: string }> = [];
  public hfTypes: Array<{ Name: string, Code: string }> = [];
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
  departmentList = [];
  departmentListSPL = [];
  categoryList = [];
  categoryListSPL = [];
  ContactFilterDTO: ContactFilterDTO = new ContactFilterDTO()
  ContactFilterDTOSPL: ContactFilterDTO = new ContactFilterDTO()





  MeetingOrganizer: any[] = [];
  TrainingCategory: any[] = [];
  MeetingVenue: any[] = [];
  MeetingOrganizerId: any[] = [];
  MeetingVenueId: any[] = [];

  // public healthFacilities:any[] = [];

  public isDisable: boolean = false;


  constructor(private sheduleService: SheduleService, private formBuilder: FormBuilder, private readonly httpClient: HttpClient, private readonly toastr: ToastrService,
    private readonly router: Router, private readonly registerService: RegisterService, private readonly activatedRoute: ActivatedRoute,
    private readonly roleService: RoleService, public activeModal: NgbActiveModal, private modalService: NgbModal) {

    this.id = this.activatedRoute.snapshot.queryParams.id;
    //this.Edit(this.id);

    this.RegisterForm = this.formBuilder.group({
      trainingId: ["", Validators.required],
      venuId: [number, Validators.required],
      startDateTime: ["", Validators.required],
      endDateTime: ["", Validators.required],
      Division: ["", Validators.required],
      District: ["", Validators.required],
      Tehsil: ["", Validators.required],
      IsVirtual: [false]
    });

  }

  ngOnInit(): void {


    this.IsVirtual = false;
    this.date = new Date();

    if (this.EventObj) {

      this.setupForm();
    }
    // this.getMeetingOrganizer()
    this.getMeetingVenue()
    this.getUserList()
    // this.getTrainingCategory()
    // this.getTrainingType()
    // this.getDepartments()
    this.getTrainings()
    this.GetVenues()
    this.getDivision()



  }
  changed(evt) {
    debugger
    if (evt.target.checked) {
      this.IsVirtual = true
    }
    else {
      this.IsVirtual = false
    }

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


















  setupForm() {

    debugger
    this.RegisterForm.get("trainingId").setValue(this.EventObj.trainingId)
    this.RegisterForm.get("venuId").setValue(this.EventObj.venuId)
    this.RegisterForm.get("startDateTime").setValue(this.EventObj.startDateTime)
    this.RegisterForm.get("endDateTime").setValue(this.EventObj.endDateTime)
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
    debugger
    this.formData = new FormData()


    this.parentSubmitted = true
    this.loading = true;


    if (new Date(this.RegisterForm.controls.startDateTime.value) > new Date(this.RegisterForm.controls.endDateTime.value)) {
      this.loading = false
      return this.toastr.error("End Date must be greater than Start Date")
    }
    // if (this.RegisterForm.invalid) {

    //   if (
    //     !this.RegisterForm.controls.trainingId.value ||

    //     !this.RegisterForm.controls.venuId.value


    //   ) {

    //     this.toastr.info("Please Fill all Fields", "Invalid", { closeButton: true });
    //     return
    //   }

    // }


    // const formData = new FormData()

    // Object.keys(this.MeetingDTO)
    //   .forEach(k => {
    //     formData.append(k, this.MeetingDTO[k])
    //   })
    // this.formData.append('id', '0')

    // for (var i = 0; i < this.files.length; i++) {
    //   this.formData.append("meetingAttachments", this.files[i]);

    // }
    // let assigness=[]
    //   this.RegisterForm.controls.assignTo.value.forEach(element => {
    //     assigness.push({
    //       participantId : element.participantId,
    //       participantName : element.participantName,
    //     })
    //   });

    // let assigness = []
    // if (this.RegisterForm.controls.eventcontactparticipant.value != "") {
    //   this.RegisterForm.controls.eventcontactparticipant.value.forEach(element => {
    //     assigness.push({
    //       participantId: element.participantId,
    //       participantName: element.participantName
    //       // participantId : element.id,
    //       // participantName : element.fullName
    //       //eventcontactparticipant : element.name,
    //     })
    //   });
    // }
    // let assignessSPL = []
    // if (this.RegisterForm.controls.eventcontactparticipantSPL.value != "") {
    //   this.RegisterForm.controls.eventcontactparticipantSPL.value.forEach(element => {
    //     assigness.push({
    //       participantId: element.participantId,
    //       participantName: element.participantName
    //       //eventcontactparticipant : element.name,
    //     })
    //   });
    // }
    debugger
    let TrainingId = this.Trainings.filter(x => x.id === this.RegisterForm.controls.trainingId.value)[0]?.id
    let venueId = this.Venues.filter(x => x.id === this.RegisterForm.controls.venuId.value)[0]?.id
    this.formData.append('Id', '0');
    this.formData.append('StartDateTime', this.RegisterForm.controls.startDateTime.value)
    this.formData.append('EndDateTime', this.RegisterForm.controls.endDateTime.value)
    this.formData.append('VenueId', venueId == null ? 0 : venueId)
    this.formData.append('TrainingId', TrainingId)
    this.formData.append('Division', this.RegisterForm.controls.Division.value)
    this.formData.append('District', this.RegisterForm.controls.District.value)
    this.formData.append('Tehsil', this.RegisterForm.controls.Tehsil.value)
    this.formData.append('IsVirtual', this.RegisterForm.controls.IsVirtual.value)



    this.subs.add(
      this.registerService.AddSchedule(this.formData)
        .subscribe(
          (data) => {
            console.log("data Response", data)
            this.loading = false;
            if (data.isException == false) {

              this.toastr.success("Record Added Sucessfully", "Saved", { closeButton: true });
              window.location.reload()
              this.getTrainings();
              this.activeModal.close()
            } else {
              this.toastr.error("Record are not  Added", "Error", { closeButton: true });
            }
            this.RegisterForm = this.formBuilder.group({

              title: "",
              description: "",
              assignTo: "",
              dueDate: "",

            });
            //this.router.navigate(['/taskDashboard']);
            //  window.location.reload()
            // this.activeModal.close()
          }

        )
    );
  }
  getDesugnation() {

    this.subs.add(
      this.registerService.getTrainings().subscribe((data) => {
        debugger

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








  AddMeetingVenue() {

    const modalRef = this.modalService.open(AddMeetingVenueComponent, { size: 'lg' });

    modalRef.result.then((data) => {

      //this.FilterEvent()
      this.GetVenues();
      //this.activeModal.close()
    }, (reason) => {
      // on dismiss
    });
  }





  getMeetingVenue() {

    this.subs.add(
      this.registerService.getMeetingVenue(state).subscribe(
        (data) => {
          debugger
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
