import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription, throwError } from 'rxjs';
import { ContactTypeDTO } from '../ContactTypeDTO';
import { RegisterService } from 'src/app/shared/services/RegisterService/RegisterService';
import { RoleService } from 'src/app/shared/services/RoleService/RoleService';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { catchError, map } from 'rxjs/operators';
import moment from 'moment';
import { state } from '@angular/animations';

@Component({
  selector: 'app-add-contact-type',
  templateUrl: './add-contact-type.component.html',
  styleUrls: ['./add-contact-type.component.scss']
})
export class AddContactTypeComponent implements OnInit {

  RegisterForm: FormGroup;
  private subs = new Subscription();
  ContactTypeDTO: ContactTypeDTO = new ContactTypeDTO();
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
  minDate = moment(new Date()).format('YYYY-MM-DD');
  formData: FormData;
  lSUser:any;
  lSDesgination:any;
  Company :any[] =[];
  Department : any[]=[];
  Category : any[]=[];
 
    
  
    ContactDesignation:any[]=[];
 
    Code = "";
    progress: number;
  public isEdit: boolean = false;

  constructor(private formBuilder: FormBuilder, private readonly httpClient: HttpClient, private readonly toastr: ToastrService,
    private readonly router: Router, private readonly registerService: RegisterService, private readonly activatedRoute: ActivatedRoute,
    private readonly roleService: RoleService,public activeModal: NgbActiveModal,) { }

  ngOnInit(): void {

    this.id = this.activatedRoute.snapshot.queryParams.id;
    //this.Edit(this.id);
    
    this.RegisterForm = this.formBuilder.group({
    
    
      designation: ["", Validators.required],
      company:["", Validators.required],
      category :["",Validators.required],
      department: ["", Validators.required],
      

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
    this.getCompany();
  }

  onSubmit() {
    this.formData = new FormData()
    debugger
    this.parentSubmitted = true
    // before this.loading = true; 
    this.loading = false;
    if (this.RegisterForm.invalid) {

      if (
        !this.RegisterForm.controls.company.value ||
        !this.RegisterForm.controls.department.value ||
        !this.RegisterForm.controls.category.value ||
        !this.RegisterForm.controls.designation.value 
        
        ) {

        this.toastr.info("Please Fill all Fields", "Invalid", { closeButton: true });
        return
      }

    }


    this.formData.append('Id', '0')
   
  
  debugger
  this.formData.append('categoryId', this.RegisterForm.controls.category.value)
  this.formData.append('departmentId', this.RegisterForm.controls.department.value)
  this.formData.append('companyId', this.RegisterForm.controls.company.value)
    this.formData.append('designation', this.RegisterForm.controls.designation.value)
  
    
   
    
    debugger


    this.subs.add(
      this.registerService.AddContactType(this.formData) 
     .subscribe(
        (data) => {
          console.log("data Response",data)
          this.loading = false;
           if(data.isException == false) { 

            this.toastr.success("Record Added Sucessfully", "Saved", { closeButton: true });
            this.activeModal.close()
          } else {
            if (this.ContactTypeDTO.id > 0) {
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
          //  window.location.reload()
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

      getCompany() {
        debugger
                this.subs.add(
                  this.registerService.getCompany(state).subscribe(
                    (data) => {
            
                      this.temp = [...data.result];
            
                      this.Company = data.result;
            
                      return data;
                    },
                    (error) => {
                      alert(error);
                    }
                  )
                );
              }
              getDepartment(company: any) {
                       debugger;
   
                this.subs.add(
                  this.registerService.getDepartment(company).subscribe(
                    (data) => {
            
            
                      this.temp = [...data.result];
            
                      this.Department = data.result;
            
            
                      return data;
                    },
                    (error) => {
                      alert(error);
                    }
                  )
                );
              }
        
              
              getCategory(department: any) {
                debugger
                            this.subs.add(
                              this.registerService.getCategory(department).subscribe(
                                (data) => {
                        
                        
                                  this.temp = [...data.result];
                        
                                  this.Category = data.result;
                        
                        
                                  return data;
                                },
                                (error) => {
                                  alert(error);
                                }
                              )
                            );
                          }
                    



}

