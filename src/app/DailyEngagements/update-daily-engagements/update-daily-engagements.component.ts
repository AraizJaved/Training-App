import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription, throwError } from 'rxjs';
import { DailyEngagementFilterDTO } from '../DailyEngagementFilterDTO';
import { DailyEngagementDTO } from '../DailyEngagementDTO';
import { RegisterService } from 'src/app/shared/services/RegisterService/RegisterService';
import { RoleService } from 'src/app/shared/services/RoleService/RoleService';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { catchError, map } from 'rxjs/operators';
import moment from 'moment';
import { state } from '@angular/animations';
import { AddMeetingVenueComponent } from 'src/app/EventCalender/add-meeting-venue/add-meeting-venue.component';

@Component({
  selector: 'app-update-daily-engagements',
  templateUrl: './update-daily-engagements.component.html',
  styleUrls: ['./update-daily-engagements.component.scss']
})
export class UpdateDailyEngagementsComponent implements OnInit {
  @Input() taskId;
  RegisterForm: FormGroup;
  private subs = new Subscription();
  DailyEngagementDTO: DailyEngagementDTO = new DailyEngagementDTO();
  error = "";
  loading = false;
  AssignTo: any[] = [];
  TaskCC: any[] = [];
  public id: number = 0;
  parentSubmitted = false;
  temp: any[];
  rows = [];
  files :string[]=[]
  forms: any;
  date: Date;
  minDate = moment(new Date()).format('YYYY-MM-DDThh:mm');
  formData: FormData;
  lSUser:any;
  lSDesgination:any;
  task = [];
  Priority: any[] = [
    { name:"High"},
    { name:"Medium"},
    { name:"Low"} ];
    ResourceOFContact: any[] = [
      { name:"Facebook"},
      { name:"Google"},
      { name:"Refferer"} ];
      Gender: any[] = [
        { name:"Male"},
        { name:"Female"},
         ];
    dropdownSettings:IDropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 5,
      allowSearchFilter: true
    };
    Division: any[] = [];
    District: any[] = [];
    
    Tehsil: any[] = [];
    MeetingVenue:any[]=[];
  
    MeetingVenueId:any[]=[];
    Code = "";
    progress: number;
  public isEdit: boolean = false;

  constructor(private formBuilder: FormBuilder, private readonly httpClient: HttpClient, private readonly toastr: ToastrService,
    private readonly router: Router, private readonly registerService: RegisterService, private readonly activatedRoute: ActivatedRoute,
    private readonly roleService: RoleService,public activeModal: NgbActiveModal,private modalService: NgbModal) { }

  ngOnInit(): void {

    this.id = this.activatedRoute.snapshot.queryParams.id;
    //this.Edit(this.id);
    
    this.RegisterForm = this.formBuilder.group({
      id: [0, Validators.required],
      task: ["", Validators.required],
      // whereToGo: ["", Validators.required],
      whenToGo: ["", Validators.required],
      meetingVenue: ["", Validators.required], 
      

    });

    debugger
    this.date = new Date();
    //this.RegisterForm.controls.dueDate.setValue(date.getDate() - 1);

    this.subs.add(

      this.registerService.getUserList().subscribe(
        (data) => {
          debugger
          //this.temp = [...data.result];
          this.AssignTo = data.data;
          this.AssignTo=this.AssignTo.filter(x=> x.name !=='Imran Skindar')
          this.TaskCC= this.AssignTo.filter(x=> x.name !=='Imran Skindar')
          console.log("AssignTo", this.AssignTo)
          return data;
        },
        (error) => {
          alert(error);
        }
      )
    );
    this.lSUser = JSON.parse(localStorage.getItem('currentUser'))
    this.lSDesgination=this.lSUser.user.id
    console.log("dsffffffffff", this.lSDesgination)
    this.getDivision();
    this.getMeetingVenue()
    this.getDailyengagement(this.taskId);
  }

  

  
  onFileChange(event)  {
    debugger
    for  (var i =  0; i <  event.target.files.length; i++)  {  
        this.files.push(event.target.files[i]);
    }
  }
  getDailyengagement(id: any) {
    debugger
    this.subs.add(

      this.registerService.getDailyengagementById(id).subscribe(
        (data) => {
          

          this.task = data.result;
          console.log("task", this.task)
          this.setupForm()
          return this.task;
        },
        (error) => {
          alert(error);
        }
      )
    );
  }
  setupForm(){
    
    debugger
    this.RegisterForm.get("id").setValue(this.task[0].id);
    this.RegisterForm.get("task").setValue(this.task[0].task);
   
     this.RegisterForm.get("whenToGo").setValue(this.task[0].whenToGo);
     this.RegisterForm.get("meetingVenue").setValue(this.task[0].venueId);

  
    console.log("setupform",this.task[0])
 
 }
  onSubmit() {
    this.formData = new FormData()
    debugger
    this.parentSubmitted = true
    // before this.loading = true; 
    this.loading = false;
    if (this.RegisterForm.invalid) {

      if (!this.RegisterForm.controls.title.value ) {

        this.toastr.info("Please Fill all Fields", "Invalid", { closeButton: true });
        return
      }

    }


    this.formData.append('id', this.RegisterForm.controls.id.value)
   
  
  debugger

    this.formData.append('task', this.RegisterForm.controls.task.value)
    // this.formData.append('whereToGo', this.RegisterForm.controls.whereToGo.value)
    this.formData.append('whenToGo', this.RegisterForm.controls.whenToGo.value)
    this.formData.append('venueId', this.RegisterForm.controls.meetingVenue.value)
    
   
    
    debugger


    this.subs.add(
      this.registerService.AddDailyEngagement(this.formData) 
     .subscribe(
        (data) => {
          debugger
          console.log("data Response",data)
          this.loading = false;
           if (data.isException == false) { 

         
            if (this.DailyEngagementDTO.id > 0) {
              this.toastr.success("Record Updated Sucessfully", "Updated", { closeButton: true });
            } else {
              this.toastr.success("Record Updated Sucessfully", "Updated", { closeButton: true });
          
            }
            this.activeModal.close()
          
          } else {
            if (this.DailyEngagementDTO.id > 0) {
              this.toastr.success("Record Updated Sucessfully", "Updated", { closeButton: true });
            } else {
              this.toastr.success("Record Added Sucessfully", "Saved", { closeButton: true });
            }
            this.RegisterForm = this.formBuilder.group({

              title: "",
              description: "",
              assignTo: "",
              dueDate: "",
              
            });
            //this.router.navigate(['/taskDashboard']);
           window.location.reload()
          // this.activeModal.close()
          }

        
        },
        (error) => {
          this.error = error;
          this.loading = false;
        }
      )
    );
  }


  onClose(){
    this.activeModal.close()
      }

      getDivision() {
debugger
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
    debugger
        this.subs.add(
          this.registerService.getDistrict(Division).subscribe(
            (data) => {
    
    
              this.temp = [...data.result];
    
              this.District = data.result;
    
            
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
      onChange(Code: string) {

        if (Code.length == 3) {
          this.District = [];
          this.Tehsil = [];
        
          this.getDistricts(Code);
        }
        if (Code.length == 6) {
          this.Tehsil = [];
         
          this.getTehsils(Code);
        }
      
    
    
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


