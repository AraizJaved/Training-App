import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output , Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
 
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ToastrService } from 'ngx-toastr';
import { Subscription,throwError } from 'rxjs';
import { RegisterService } from 'src/app/shared/services/RegisterService/RegisterService';
import { RoleService } from 'src/app/shared/services/RoleService/RoleService';
import { MeetingDTO } from '../MeetingDTO';
import { catchError, map } from 'rxjs/operators';
import * as _ from 'lodash' ;
import moment from 'moment';
import { state } from '@angular/animations';
import { AddMeetingOrganizerComponent } from '../add-meeting-organizer/add-meeting-organizer.component';
import { AddMeetingVenueComponent } from '../add-meeting-venue/add-meeting-venue.component';
import { ContactFilterDTO } from 'src/app/Contacts/ContactFilterDTO';
import { ContactsMultiFilterDTO } from '../ContactsMultiFilterDTO';

@Component({
  selector: 'app-update-meeting',
  templateUrl: './update-meeting.component.html',
  styleUrls: ['./update-meeting.component.scss']
})
export class UpdateMeetingComponent implements OnInit {

  @Input() EventObj : any;

  RegisterForm: FormGroup;
  private subs = new Subscription();
  MeetingDTO: MeetingDTO = new MeetingDTO();
  ContactsMultiFilterDTO:ContactsMultiFilterDTO = new ContactsMultiFilterDTO();
  ContactsMultiFilterDTOSPL:ContactsMultiFilterDTO = new ContactsMultiFilterDTO();
  error = "";
  loading = false;
  
  public id: number = 0;
  parentSubmitted = false;
  temp: any[];
  rows = [];
  files :string[]=[]
  forms: any;
  date: Date;
  minDate = moment(new Date()).format('YYYY-MM-DDThh:mm');
  formData: FormData;
  Priority: any[] = [
    { name:"High"},
    { name:"Medium"},
    { name:"Low"} ]
    model : any;
    cities = [
      {name: 'New York', code: 'NY'},
      {name: 'Rome', code: 'RM'},
      {name: 'London', code: 'LDN'},
      {name: 'Istanbul', code: 'IST'},
      {name: 'Paris', code: 'PRS'}
  ];

  contact=[];
  contactSPL=[];
  userList =[];
  departmentList =[];
  departmentListSPL =[];
  categoryList =[];
  categoryListSPL =[];
  ContactFilterDTO : ContactFilterDTO = new ContactFilterDTO()
  ContactFilterDTOSPL : ContactFilterDTO = new ContactFilterDTO()
  // dropdownSettings:IDropdownSettings = {
  //   singleSelection: false,
  //   idField: 'participantId',
  //   textField: 'participantName',
  //   selectAllText: 'Select All',
  //   unSelectAllText: 'UnSelect All',
  //   itemsShowLimit: 5,
  //   allowSearchFilter: true
  // };
  dropdownSettingsCompany:IDropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'name',
   // selectAllText: 'Select All',
   enableCheckAll:false,
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 5,
    allowSearchFilter: true
  };
  dropdownSettingsDepartment:IDropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'departmentName',
     // selectAllText: 'Select All',
     enableCheckAll:false,
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 5,
    allowSearchFilter: true
  };
  dropdownSettingsCategory:IDropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'categoryName',
   // selectAllText: 'Select All',
   enableCheckAll:false,
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 5,
    allowSearchFilter: true
  };
  dropdownSettings:IDropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'designation',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 5,
    allowSearchFilter: true
  };
  dropdownSettingsContact:IDropdownSettings = {
    singleSelection: false,
    idField: 'participantId',
    textField: 'participantName',
    // idField: 'id',
    // textField: 'fullName',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 5,
    allowSearchFilter: true
  };
  dropdownSettingsSPLCompany:IDropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'name',
    // selectAllText: 'Select All',
    enableCheckAll:false,
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 5,
    allowSearchFilter: true
  };
  dropdownSettingsSPLDepartment:IDropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'departmentName',
  // selectAllText: 'Select All',
  enableCheckAll:false,
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 5,
    allowSearchFilter: true
  };
  dropdownSettingsSPLCategory:IDropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'categoryName',
     // selectAllText: 'Select All',
     enableCheckAll:false,
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 5,
    allowSearchFilter: true
  };

  dropdownSettingsSPLContact:IDropdownSettings = {
    singleSelection: false,
    idField: 'participantId',
    textField: 'participantName',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 5,
    allowSearchFilter: true
  };
  dropdownSettingsOrg:IDropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'organizer',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 5,
    allowSearchFilter: true
  };
  dropdownSettingsVenue:IDropdownSettings = {
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
  MeetingOrganizer:any[]=[];
  MeetingVenue:any[]=[];
  MeetingStatus:any[]=[];
  MeetingOrganizerId:any[]=[];
  MeetingVenueId:any[]=[];
  constructor(private formBuilder: FormBuilder, private readonly httpClient: HttpClient, private readonly toastr: ToastrService,
    private readonly router: Router, private readonly registerService: RegisterService, private readonly activatedRoute: ActivatedRoute,
    private readonly roleService: RoleService,public activeModal: NgbActiveModal,private modalService: NgbModal) {

      this.id = this.activatedRoute.snapshot.queryParams.id;
      //this.Edit(this.id);
      
      this.RegisterForm = this.formBuilder.group({
        id: [0, Validators.required],
        title: ["", Validators.required],
        description: ["", Validators.required],
        externalParticipant: ["", Validators.required],
        externalParticipantsMobileNo: ["", Validators.required],
        startDateTime: ["", Validators.required],
        // endDateTime: [""],
        eventParticipant: ["", Validators.required],
        organizer: ["", Validators.required],
        venue: ["", Validators.required], 
        meetingStatus: ["", Validators.required], 
        assignTo: ["", Validators.required],
        assignToSPL: ["", Validators.required],
        meetingOrganizer: ["", Validators.required],
        meetingVenue: ["", Validators.required], 
        meetingStatusId: ["", Validators.required],
        eventcontactparticipant: ["", Validators.required],
        eventcontactparticipantSPL: ["", Validators.required],
        userList: ["All", Validators.required],
        meetingAttendVia: ["", Validators.required],
      });
  
     }

  ngOnInit(): void {

   
    debugger
    this.date = new Date();
    //this.RegisterForm.controls.dueDate.setValue(date.getDate() - 1);

    // this.subs.add(

    //   this.registerService.getParticepentsList().subscribe(
    //     (data) => {
    //       debugger
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
    this.subs.add(

      this.registerService.getCompany(state).subscribe(
        (data) => {
          debugger
          //this.temp = [...data.result];
          this.AssignTo = data.result;
          // this.AssignTo=this.AssignTo.filter(x=> x.name !=='Imran Skindar')
          this.AssignTo=this.AssignTo.filter(x=> x.id !='5')
          console.log("AssignTo", this.AssignTo)
          return data;
        },
        (error) => {
          alert(error);
        }
      )
    );

    this.subs.add(

      this.registerService.getCompanySPL(state).subscribe(
        (data) => {
          debugger
          //this.temp = [...data.result];
          this.AssignToSPL = data.result;
          this.AssignToSPL=this.AssignToSPL.filter(x=> x.id !='1')
          console.log("AssignTo", this.AssignToSPL)
          return data;
        },
        (error) => {
          alert(error);
        }
      )
    );

    this.getMeetingOrganizer()
  this.getMeetingStatus()
  this.getUserList()
  }
  setupForm(){
debugger
    this.RegisterForm.get("id").setValue(this.EventObj.id)
    this.RegisterForm.get("title").setValue(this.EventObj.title)
    this.RegisterForm.get("description").setValue(this.EventObj.description)
    this.RegisterForm.get("startDateTime").setValue(this.EventObj.start.format('YYYY-MM-DDThh:mm'))
   
    this.RegisterForm.get("meetingOrganizer").setValue(this.MeetingOrganizer.find(x=> x.organizer ==this.EventObj.meetingOrganizerIdName)?.id)
    this.RegisterForm.get("meetingVenue").setValue(this.MeetingVenue.find(x=> x.venue ==this.EventObj.meetingVenueIdName)?.id)
    //this.RegisterForm.get("meetingVenueId").setValue(this.EventObj.meetingVenueIdName)
    // this.RegisterForm.get("meetingStatusId").setValue(this.EventObj.meetingStatusIdName)
    this.RegisterForm.get("eventParticipantData").setValue(this.AssignTo.find(x=> x.venue ==this.EventObj.eventParticipant)?.id)
    // this.RegisterForm.get("endDateTime").setValue(this.EventObj.endDateTime)
    this.RegisterForm.get("eventParticipant").setValue(this.EventObj.eventParticipant)
    this.RegisterForm.get("externalParticipant").setValue(this.EventObj.externalParticipant)
    this.RegisterForm.get("externalParticipantsMobileNo").setValue(this.EventObj.externalParticipantsMobileNo)
    this.RegisterForm.get("meetingAttendVia").setValue(this.EventObj.meetingAttendVia)
    this.RegisterForm.get("organizer").setValue(this.EventObj.organizer)
    this.RegisterForm.get("meetingStatus").setValue(this.EventObj.meetingStatus)
    this.RegisterForm.get("venue").setValue(this.EventObj.venue)
    console.log("asdsadsad",this.EventObj )
  }

  getUserList(){

    this.subs.add(

      this.registerService.getUserList().subscribe(
        (data) => {
          debugger
          //this.temp = [...data.result];
          // this.userList.push({
          //   id : "0",
          //   name : 'All Users'
          // });
          data.data.forEach(element => {
            this.userList.push(element)
          });
          this.userList=this.userList.filter(x=> x.name !=='Secretary')
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

    debugger
    // if(this.RegisterForm.controls.userList.value=="All"){
    //   this.ContactFilterDTO.userList=null;
    // }
    // else{
    //   this.ContactFilterDTO.userList = this.RegisterForm.controls.userList.value;
    // }
    debugger;
    if(!this.ContactsMultiFilterDTO.contactCompanyIds.includes(item.id)){
      this.ContactsMultiFilterDTO.contactCompanyIds += item.id + ",";
    }
this.subs.add(
      this.registerService.getContactMultiDepartmentList(this.ContactsMultiFilterDTO).subscribe(
        (data) => {
          debugger
          
          this.temp = [...data.result];

          this.rows = data.result;
          this.departmentList=data.result;
          console.log(this.rows);
          console.log("departmentlist",this.departmentList)
        },
        (error) => {
          alert(error);
        }
      )
    );
  }
  onSelectAllCompany(items: any) {
    console.log(items);
  }

  onItemDeSelectCompany(item: any) {
   // alert("item")
    debugger
    console.log(item);

    debugger;
    if(this.ContactsMultiFilterDTO.contactCompanyIds.includes(item.id)){
      this.ContactsMultiFilterDTO.contactCompanyIds = this.ContactsMultiFilterDTO.contactCompanyIds.replace(item.id ,'');
    }
    
    this.subs.add(
      this.registerService.getContactMultiDepartmentList(this.ContactsMultiFilterDTO).subscribe(
        (data) => {
          debugger
          
          this.temp = [...data.result];

          this.rows = data.result;
          this.departmentList=data.result;
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
  debugger
  console.log(item);

  debugger
 
  debugger;
  if(!this.ContactsMultiFilterDTOSPL.contactCompanyIds.includes(item.id)){
    this.ContactsMultiFilterDTOSPL.contactCompanyIds += item.id + ",";
  }
this.subs.add(
    this.registerService.getContactMultiDepartmentListSPL(this.ContactsMultiFilterDTOSPL).subscribe(
      (data) => {
        debugger
        
        this.temp = [...data.result];

        this.rows = data.result;
        this.departmentListSPL=data.result;
        console.log(this.rows);
        console.log("departmentlist",this.departmentListSPL)
      },
      (error) => {
        alert(error);
      }
    )
  );
}
onSelectAllCompanySPL(items: any) {
  console.log(items);
  if(!this.ContactsMultiFilterDTOSPL.contactCompanyIds.includes(items.id)){
    this.ContactsMultiFilterDTOSPL.contactCompanyIds += items.id + ",";
  }
this.subs.add(
    this.registerService.getContactMultiDepartmentListSPL(this.ContactsMultiFilterDTOSPL).subscribe(
      (data) => {
        debugger
        
        this.temp = [...data.result];

        this.rows = data.result;
        this.departmentListSPL=data.result;
        console.log(this.rows);
        console.log("departmentlist",this.departmentListSPL)
      },
      (error) => {
        alert(error);
      }
    )
  );
}

onItemDeSelectCompanySPL(item: any) {
 // alert("item")
  debugger
  console.log(item);

  debugger;
  if(this.ContactsMultiFilterDTOSPL.contactCompanyIds.includes(item.id)){
    this.ContactsMultiFilterDTOSPL.contactCompanyIds = this.ContactsMultiFilterDTOSPL.contactCompanyIds.replace(item.id ,'');
  }
  
  this.subs.add(
    this.registerService.getContactMultiDepartmentListSPL(this.ContactsMultiFilterDTOSPL).subscribe(
      (data) => {
        debugger
        
        this.temp = [...data.result];

        this.rows = data.result;
        this.departmentListSPL=data.result;
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
    
    debugger;
    if(!this.ContactsMultiFilterDTO.ContactDepartmentIds.includes(item.id)){
      this.ContactsMultiFilterDTO.ContactDepartmentIds += item.id + ",";
    }
this.subs.add(
      this.registerService.getContactMultiCategoryList(this.ContactsMultiFilterDTO).subscribe(
        (data) => {
          debugger
          
          this.temp = [...data.result];

          this.rows = data.result;
          this.categoryList=data.result;
          console.log(this.rows);
          console.log("dcatetmentlist",this.categoryList)
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
    debugger
    console.log(item);

    debugger;
    if(this.ContactsMultiFilterDTO.ContactDepartmentIds.includes(item.id)){
      this.ContactsMultiFilterDTO.ContactDepartmentIds = this.ContactsMultiFilterDTO.ContactDepartmentIds.replace(item.id ,'');
    }
    
    this.subs.add(
      this.registerService.getContactMultiCategoryList(this.ContactsMultiFilterDTO).subscribe(
        (data) => {
          debugger
          
          this.temp = [...data.result];

          this.rows = data.result;
          this.categoryList=data.result;
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
    
    debugger;
    if(!this.ContactsMultiFilterDTOSPL.ContactDepartmentIds.includes(item.id)){
      this.ContactsMultiFilterDTOSPL.ContactDepartmentIds += item.id + ",";
    }
this.subs.add(
      this.registerService.getContactMultiCategoryListSPL(this.ContactsMultiFilterDTOSPL).subscribe(
        (data) => {
          debugger
          
          this.temp = [...data.result];

          this.rows = data.result;
          this.categoryListSPL=data.result;
          console.log(this.rows);
          console.log("dcatetmentlist",this.categoryListSPL)
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
    debugger
    console.log(item);

    debugger;
    if(this.ContactsMultiFilterDTOSPL.ContactDepartmentIds.includes(item.id)){
      this.ContactsMultiFilterDTOSPL.ContactDepartmentIds = this.ContactsMultiFilterDTOSPL.ContactDepartmentIds.replace(item.id ,'');
    }
    
    this.subs.add(
      this.registerService.getContactMultiCategoryListSPL(this.ContactsMultiFilterDTOSPL).subscribe(
        (data) => {
          debugger
          
          this.temp = [...data.result];

          this.rows = data.result;
          this.categoryListSPL=data.result;
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
    debugger
    console.log(item);

    debugger
    if(this.RegisterForm.controls.userList.value=="All"){
      this.ContactFilterDTO.userList=null;
    }
    else{
      this.ContactFilterDTO.userList = this.RegisterForm.controls.userList.value;
    }
    debugger;
    if(!this.ContactFilterDTO.contactDesignation.includes(item.id)){
      this.ContactFilterDTO.contactDesignation += item.id + ",";
    }
this.subs.add(
      this.registerService.getContactsFilteredList(this.ContactFilterDTO).subscribe(
        (data) => {
          debugger
          
          this.temp = [...data.result];

          this.rows = data.result;
          this.contact=data.result;
          console.log(this.rows);
        },
        (error) => {
          alert(error);
        }
      )
    );
  }
  // onItemSelect(item: any) {
  //   console.log(item);
  // }
  onSelectAll(items: any) {
    console.log(items);
  }
  onItemSelectForContact(item:any)
  {
    debugger
  }
  onItemDeSelect(item: any) {
    // alert("item")
     debugger
     console.log(item);
 
     debugger
     if(this.RegisterForm.controls.userList.value=="All"){
       this.ContactFilterDTO.userList=null;
     }
     else{
       this.ContactFilterDTO.userList = this.RegisterForm.controls.userList.value;
     }
     debugger;
     if(this.ContactFilterDTO.contactDesignation.includes(item.id)){
       this.ContactFilterDTO.contactDesignation = this.ContactFilterDTO.contactDesignation.replace(item.id ,'');
     }
     
     this.subs.add(
       this.registerService.getContactsFilteredList(this.ContactFilterDTO).subscribe(
         (data) => {
           debugger
           
           this.temp = [...data.result];
 
           this.rows = data.result;
           this.contact=data.result;
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
    debugger
    console.log(item);

    debugger
    if(this.RegisterForm.controls.userList.value=="All"){
      this.ContactFilterDTOSPL.userList=null;
    }
    else{
      this.ContactFilterDTOSPL.userList = this.RegisterForm.controls.userList.value;
    }
    debugger;
    if(!this.ContactFilterDTOSPL.contactDesignation.includes(item.id)){
      this.ContactFilterDTOSPL.contactDesignation += item.id + ",";
    }
this.subs.add(
      this.registerService.getContactsFilteredList(this.ContactFilterDTOSPL).subscribe(
        (data) => {
          debugger
          
          this.temp = [...data.result];

          this.rows = data.result;
          this.contactSPL=data.result;
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
  onItemSelectForContactSPL(item:any)
          {
            debugger
          }
  onItemDeSelectSPL(item: any) {
   // alert("item")
    debugger
    console.log(item);

    debugger
    if(this.RegisterForm.controls.userList.value=="All"){
      this.ContactFilterDTOSPL.userList=null;
    }
    else{
      this.ContactFilterDTOSPL.userList = this.RegisterForm.controls.userList.value;
    }
    debugger;
    if(this.ContactFilterDTOSPL.contactDesignation.includes(item.id)){
      this.ContactFilterDTOSPL.contactDesignation = this.ContactFilterDTOSPL.contactDesignation.replace(item.id ,'');
    }
    
    this.subs.add(
      this.registerService.getContactsFilteredList(this.ContactFilterDTOSPL).subscribe(
        (data) => {
          debugger
          
          this.temp = [...data.result];

          this.rows = data.result;
          this.contactSPL=data.result;
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

  onFileChange(event)  {
    debugger
    for  (var i =  0; i <  event.target.files.length; i++)  {  
        this.files.push(event.target.files[i]);
    }
  }


  onSubmit() {
    this.formData = new FormData()
    debugger
    this.parentSubmitted = true
    this.loading = true;
    if (this.RegisterForm.invalid) {

      if (!this.RegisterForm.controls.title.value || !this.RegisterForm.controls.description.value
     ||   !this.RegisterForm.controls.startDateTime.value
        
  ) {

        this.toastr.info("Please Fill all Fields", "Invalid", { closeButton: true });
        return
      }

    }
   

    // const formData = new FormData()

    // Object.keys(this.MeetingDTO)
    //   .forEach(k => {
    //     formData.append(k, this.MeetingDTO[k])
    //   })
    this.formData.append('id', this.RegisterForm.controls.id.value)

    for  (var i =  0; i <  this.files.length; i++)  {  
      this.formData.append("meetingAttachments",  this.files[i]);
      
  }
  // let assigness=[]
  //   this.RegisterForm.controls.assignTo.value.forEach(element => {
  //     assigness.push({
  //       participantId : element.participantId,
  //       participantName : element.participantName,
  //     })
  //   });
  let assigness=[]
  if(this.RegisterForm.controls.eventcontactparticipant.value!=""){
    this.RegisterForm.controls.eventcontactparticipant.value.forEach(element => {
      assigness.push({
        participantId : element.participantId,
        participantName : element.participantName
        // participantId : element.id,
        // participantName : element.fullName
        //eventcontactparticipant : element.name,
      })
    });
  }
    let assignessSPL=[]
    if(this.RegisterForm.controls.eventcontactparticipantSPL.value!=""){
    this.RegisterForm.controls.eventcontactparticipantSPL.value.forEach(element => {
      assigness.push({
        participantId : element.participantId,
        participantName : element.participantName
        //eventcontactparticipant : element.name,
      })
    });
  }
  debugger
    this.formData.append('description', this.RegisterForm.controls.description.value)
    this.formData.append('title', this.RegisterForm.controls.title.value)
    this.formData.append('startDateTime', this.RegisterForm.controls.startDateTime.value)
    // this.formData.append('endDateTime', this.RegisterForm.controls.endDateTime.value)
    this.formData.append('eventParticipantData',JSON.stringify(assigness))
    this.formData.append('eventcontactparticipant', this.RegisterForm.controls.eventcontactparticipant.value)
    //this.formData.append('eventParticipant', this.RegisterForm.controls.eventParticipant.value)
    this.formData.append('externalParticipant', this.RegisterForm.controls.externalParticipant.value)
    this.formData.append('externalParticipantsMobileNo', this.RegisterForm.controls.externalParticipantsMobileNo.value)
    this.formData.append('meetingOrganizerId', this.RegisterForm.controls.meetingOrganizer.value)
    this.formData.append('meetingStatusId', this.RegisterForm.controls.meetingStatus.value)
    this.formData.append('meetingAttendVia', this.RegisterForm.controls.meetingAttendVia.value)
    if(this.RegisterForm.controls.meetingStatus.value==""){
      this.formData.append('meetingStatus', 'Active')
      this.formData.append('meetingStatusId', '1')
    }
    else{
      this.formData.append('meetingStatus', this.RegisterForm.controls.meetingStatus.value)
    }
   
    this.formData.append('meetingVenueId', this.RegisterForm.controls.meetingVenue.value)
    
   
    debugger


    this.subs.add(
      this.registerService.UpdateEvent(this.formData)
      .pipe(
        map((event: any) => {
          if (event.type == HttpEventType.UploadProgress) {
            this.progress = Math.round((100 / event.total) * event.loaded);
            if(this.progress==100){
              var contaxt = this;
              setTimeout(() => {
                debugger
                contaxt.activeModal.close();
                window.location.reload()

              }, 2000);     
              // function fun(){
              //   debugger
              //   contaxt.activeModal.close();
              //   window.location.reload()
              // }       
              if (this.MeetingDTO.id > 0) {
                this.toastr.success("Record Updated Sucessfully", "Updated", { closeButton: true });
              } else {
                this.toastr.success("Record Added Sucessfully", "Saved", { closeButton: true });
              }

            }
          } else if (event.type == HttpEventType.Response) {
            this.progress = null;
          }
        }),
        catchError((err: any) => {
          this.progress = null;
          debugger
          //alert(err.message);
          console.log(err.message);
          return throwError(err.message);
         
        })
      )
      .subscribe(
        (data) => {
          console.log("data Response",data)
          this.loading = false;
          window.location.reload()
        
        },
        (error) => {
          this.error = error;
          this.loading = false;
        }
      )
    );
  }

  getMeetingOrganizer() {
    debugger
            this.subs.add(
              this.registerService.getMeetingOrganizer(state).subscribe(
                (data) => {
        
                  this.temp = [...data.result];
                
                  this.MeetingOrganizer = data.result;
        
                  this.getMeetingVenue()
                  
                },
                (error) => {
                  alert(error);
                }
              )
            );
          }


          AddMeetingOrganizer(){

            const modalRef =  this.modalService.open(AddMeetingOrganizerComponent, { size: 'lg' });
         
             modalRef.result.then((data) => {
               debugger
               this.getMeetingOrganizer();
               //this.FilterEvent()
              
               //this.activeModal.close()
             }, (reason) => {
               // on dismiss
             });
           }
      
      
           AddMeetingVenue(){
      
            const modalRef =  this.modalService.open(AddMeetingVenueComponent, { size: 'lg' });
         
             modalRef.result.then((data) => {
               debugger
               //this.FilterEvent()
              this.getMeetingVenue();
               //this.activeModal.close()
             }, (reason) => {
               // on dismiss
             });
           }



           getMeetingVenue() {
            debugger
                    this.subs.add(
                      this.registerService.getMeetingVenue(state).subscribe(
                        (data) => {
                
                          this.temp = [...data.result];
                        
                          this.MeetingVenue = data.result;
                          if(this.EventObj){
              
                            this.setupForm();
                          }
                         
                        },
                        (error) => {
                          alert(error);
                        }
                      )
                    );
                  }

                  getMeetingStatus() {
                    debugger
                            this.subs.add(
                              this.registerService.getMeetingStatus(state).subscribe(
                                (data) => {
                        
                                  this.temp = [...data.result];
                                
                                  this.MeetingStatus = data.result.filter(a=>a.status!='Active' && a.status!='InActive' && a.status!='Archived' );
                                  
                                 
                                },
                                (error) => {
                                  alert(error);
                                }
                              )
                            );
                          }
}
