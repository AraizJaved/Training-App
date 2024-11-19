
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { from, Subscription, throwError } from 'rxjs';
import { MeetingOrganizerDTO } from 'src/app/EventCalender/MeetingOrganizerDTO';
import { RegisterService } from 'src/app/shared/services/RegisterService/RegisterService';
import { RoleService } from 'src/app/shared/services/RoleService/RoleService';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { catchError, map } from 'rxjs/operators';
import moment from 'moment';
import { state } from '@angular/animations';

@Component({
  selector: 'app-add-qualification',
  templateUrl: './add-qualification.component.html',
  styleUrls: ['./add-qualification.component.scss']
})
export class AddQualificationComponent implements OnInit {

  public RegisterForm: FormGroup;
  private subs = new Subscription();
  public MeetingOrganizerDTO: MeetingOrganizerDTO = new MeetingOrganizerDTO();
  public error = "";
  public loading = false;
  public AssignTo: any[] = [];
  public TaskCC: any[] = [];
  public id: number = 0;
  public parentSubmitted = false;
  public temp: any[];
  public rows = [];
  public files: string[] = []
  public forms: any;
  public date: Date;
  public minDate = moment(new Date()).format('YYYY-MM-DD');
  public formData: FormData = new FormData();
  lSUser: any;
  lSDesgination: any;



  ContactDesignation: any[] = [];

  Code = "";
  progress: number;
  public isEdit: boolean = false;

  constructor(private formBuilder: FormBuilder, private readonly httpClient: HttpClient, private readonly toastr: ToastrService,
    private readonly router: Router, private readonly registerService: RegisterService, private readonly activatedRoute: ActivatedRoute,
    private readonly roleService: RoleService, public activeModal: NgbActiveModal,) { }

  ngOnInit(): void {

    this.id = this.activatedRoute.snapshot.queryParams.id;
    //this.Edit(this.id);
 

    this.RegisterForm = this.formBuilder.group({


      qualification: ["", Validators.required],



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
          this.AssignTo = this.AssignTo.filter(x => x.name !== 'Imran Skindar')
          this.TaskCC = this.AssignTo.filter(x => x.name !== 'Imran Skindar')
          console.log("AssignTo", this.AssignTo)
          return data;
        },
        (error) => {
          alert(error);
        }
      )
    );
    this.lSUser = JSON.parse(localStorage.getItem('currentUser'))
    this.lSDesgination = this.lSUser.user.id
    console.log("dsffffffffff", this.lSDesgination)

  }

  onSubmit() {
    let formData = new FormData();
    debugger
    this.parentSubmitted = true
    // before this.loading = true; 
    this.loading = false;
    if (this.RegisterForm.invalid) {

      if (!this.RegisterForm.controls.qualification.value) {

        this.toastr.info("Please Fill all Fields", "Invalid", { closeButton: true });
        return
      }

    } 

      let obj = {
        Id: 0,
        Qualification: this.RegisterForm.controls.qualification.value
      }
      this.subs.add(
        this.registerService.AddQualification(obj)
          .subscribe(
            (data) => {
              debugger
              console.log("/////////////////////////////////////////////", data)
              // this.loading = false;
              if (data.isException == false) {
  
                this.toastr.success("Record Added Sucessfully", "Saved", { closeButton: true });
                this.activeModal.close()
              } else {
                if (this.MeetingOrganizerDTO.id > 0) {
                  this.toastr.success("Record Updated Sucessfully", "Updated", { closeButton: true });
                } else {
                  this.toastr.success("Record Added Sucessfully", "Saved", { closeButton: true });
                }
  
              }
  
  
            },
            (error) => {
              this.error = error;
              this.loading = false;
            }
          )
      );
    } 
  

  onClose() {
    this.activeModal.close()
  }



}

