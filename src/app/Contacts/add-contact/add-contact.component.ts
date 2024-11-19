import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription, throwError } from 'rxjs';
import { ContactDTO } from '../ContactDTO';
import { RegisterService } from 'src/app/shared/services/RegisterService/RegisterService';
import { RoleService } from 'src/app/shared/services/RoleService/RoleService';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { catchError, map } from 'rxjs/operators';
import moment from 'moment';
import { state } from '@angular/animations';
import { AddContactTypeComponent } from '../add-contact-type/add-contact-type.component';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss']
})
export class AddContactComponent implements OnInit {

  RegisterForm: FormGroup;
  private subs = new Subscription();
  ContactDTO: ContactDTO = new ContactDTO();
  error = "";
  loading = false;
  AssignTo: any[] = [];
  TaskCC: any[] = [];
  Company: any[] = [];
  Department: any[] = [];
  Category: any[] = [];
  Designation: any[] = [];
  public id: number = 0;
  parentSubmitted = false;
  isSpecializedDE: boolean;
  isAdmin: boolean
  temp: any[];
  rows = [];

  files: string[] = []
  forms: any;
  date: Date;
  minDate = moment(new Date()).format('YYYY-MM-DD');
  formData: FormData;
  lSUser: any;
  lSDesgination: any;
  Priority: any[] = [
    { name: "High" },
    { name: "Medium" },
    { name: "Low" }];
  ResourceOFContact: any[] = [
    { name: "Facebook" },
    { name: "Google" },
    { name: "Refferer" }];
  Gender: any[] = [
    { name: "Male" },
    { name: "Female" },
  ];
  dropdownSettings: IDropdownSettings = {
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
  ContactDesignation: any[] = [];

  Code = "";
  progress: number;
  public isEdit: boolean = false;

  constructor(private formBuilder: FormBuilder, private readonly httpClient: HttpClient, private readonly toastr: ToastrService,
    private readonly router: Router, private readonly registerService: RegisterService, private readonly activatedRoute: ActivatedRoute,
    private readonly roleService: RoleService, public activeModal: NgbActiveModal, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getCompany();

    this.id = this.activatedRoute.snapshot.queryParams.id;
    //this.Edit(this.id);

    this.RegisterForm = this.formBuilder.group({

      name: ["", Validators.required],
      designation: ["", Validators.required],
      department: ["", Validators.required],
      email: [""],
      mobileNo: ["", Validators.required],
      company: ["", Validators.required],
      category: ["", Validators.required],


      district: ["", Validators.required],
      division: ["", Validators.required],
      tehsil: ["", Validators.required],


    });


    this.date = new Date();
    //this.RegisterForm.controls.dueDate.setValue(date.getDate() - 1);

    this.subs.add(

      this.registerService.getUserList().subscribe(
        (data) => {

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
    this.getDivision();
    this.getContactDesignation();
    this.isAdmin = true
    var a = JSON.parse(localStorage.getItem('currentUser')).userrole.filter(x => x.name == 'Admin');
    if (a.length == '0') {
      this.isAdmin = false
    } else {
      this.isAdmin = true
      this.isSpecializedDE = false
    }

    var b = JSON.parse(localStorage.getItem('currentUser')).userrole.filter(x => x.name == 'SpecializedDE');
    if (b.length == '0') {
      this.isSpecializedDE = false
    } else {
      this.isSpecializedDE = true
      this.isAdmin = false
    }
  }
  onFileSelect(event) {

    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.ContactDTO.attachment = file;
    }
  }



  onFileChange(event) {

    for (var i = 0; i < event.target.files.length; i++) {
      this.files.push(event.target.files[i]);
    }
  }

  onSubmit() {

    this.formData = new FormData()

    this.parentSubmitted = true
    // before this.loading = true; 
    this.loading = false;
    if (this.RegisterForm.invalid) {

      if (
        !this.RegisterForm.controls.company.value ||
        !this.RegisterForm.controls.department.value ||
        !this.RegisterForm.controls.category.value ||
        !this.RegisterForm.controls.designation.value ||
        !this.RegisterForm.controls.name.value ||
        !this.RegisterForm.controls.mobileNo.value ||
        this.RegisterForm.controls.mobileNo.errors ||
        !this.RegisterForm.controls.division.value ||
        !this.RegisterForm.controls.district.value ||
        !this.RegisterForm.controls.tehsil.value 
       ) {

        this.toastr.info("Please Fill all Fields", "Invalid", { closeButton: true });
        return
      }

    }


    this.formData.append('Id', '0')
    for (var i = 0; i < this.files.length; i++) {
      this.formData.append("profilePicAttchment", this.files[i]);
    }

debugger

    this.formData.append('name', this.RegisterForm.controls.name.value)
    //this.formData.append('designation', this.RegisterForm.controls.designation.value)
    //this.formData.append('category', this.RegisterForm.controls.category.value)

    //this.formData.append('department', this.RegisterForm.controls.department.value)
    this.formData.append('email', this.RegisterForm.controls.email.value)
    this.formData.append('mobileNo', this.RegisterForm.controls.mobileNo.value)
    this.formData.append('district', this.RegisterForm.controls.district.value)
    this.formData.append('division', this.RegisterForm.controls.division.value)
    this.formData.append('tehsil', this.RegisterForm.controls.tehsil.value)
    this.formData.append('company', this.RegisterForm.controls.company.value)
    this.formData.append('designationId', this.RegisterForm.controls.designation.value)
    this.formData.append('categoryId', this.RegisterForm.controls.category.value)
    this.formData.append('departmentId', this.RegisterForm.controls.department.value)
    this.formData.append('companyId', this.RegisterForm.controls.company.value)




    this.subs.add(

      this.registerService.AddContact(this.formData)
        .subscribe(
          (data) => {
            console.log("data Response", data)
            this.loading = false;
            if (data.isException == false) {

              this.toastr.success("Record Added Sucessfully", "Saved", { closeButton: true });
              this.activeModal.close()
            } else {
              if (this.ContactDTO.id > 0) {
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


  onClose() {
    this.activeModal.close()
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
  getContactDesignation() {

    this.subs.add(
      this.registerService.getContactAllDesignationList(state).subscribe(
        (data) => {

          this.temp = [...data.result];

          this.ContactDesignation = data.result;
          console
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
  AddContactType() {

    const modalRef = this.modalService.open(AddContactTypeComponent, { size: 'lg' });

    modalRef.result.then((data) => {

      this.getContactDesignation();
      //this.activeModal.close()
    }, (reason) => {
      // on dismiss
    });
  }



  //  Start My Work
  getCompany() {

    this.subs.add(
      this.registerService.getCompany(state).subscribe(
        (data) => {

          this.temp = [...data.result];
          let d = data.result;
          // console.log(d);
          // if (this.isSpecializedDE == true) {
          //   d = d.filter(x => x.id == 5);
          // }
          console.log(d);
          this.Company = d;


          return data;
        },
        (error) => {
          alert(error);
        }
      )
    );
  }
  getDepartment(company: any) {


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





  getDesignation(category: any) {

    this.subs.add(
      this.registerService.getDesignation(category).subscribe(
        (data) => {


          this.temp = [...data.result];

          this.Designation = data.result;


          return data;
        },
        (error) => {
          alert(error);
        }
      )
    );
  }





  // End My Work


}

