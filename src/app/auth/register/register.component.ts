import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription } from "rxjs";
import { RegisterDTO } from '../register/dto/register.dto';
import { RegisterService } from 'src/app/shared/services/RegisterService/RegisterService';
import { RoleService } from 'src/app/shared/services/RoleService/RoleService';
import { state } from '@angular/animations';
import { HttpClient } from '@angular/common/http';

declare var require
const Swal = require('sweetalert2')

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {

  RegisterForm: FormGroup;
  private subs = new Subscription();
  RegisterDTO: RegisterDTO = new RegisterDTO();
  error = "";
  loading = false;
  public id: number = 0;
  parentSubmitted = false;
  temp: any[];
  rows = [];
  forms: any;
  public isEdit: boolean = false;
  roles: any[] = [];
  public dropdownSettingsOrg:any;

  constructor(private formBuilder: FormBuilder, private readonly httpClient: HttpClient, private readonly toastr: ToastrService,
    private readonly router: Router, private readonly registerService: RegisterService, private readonly activatedRoute: ActivatedRoute,
    private readonly roleService: RoleService) { }

  ngOnInit(): void {

    this.id = this.activatedRoute.snapshot.queryParams.id;
    this.GetRoles()
    //this.Edit(this.id);

    this.RegisterForm = this.formBuilder.group({
      fullName: ["", Validators.required],
      userName: ["", Validators.required],
      email: ["", Validators.required],
      designation: ["", Validators.required],
      phoneNumber: ["", Validators.required],
      password: ["", Validators.required],
      confirmPassword: ["", Validators.required],
      role: ["", Validators.required],
      canDelete: ["", Validators.required]
    });


  }
  GetRoles() {

    this.subs.add(
      this.registerService.getRoles().subscribe(
        (data) => {

          debugger
          this.roles = data.userroles;
          console.log('///////////////------------------', this.roles)
          return data;
        },
        (error) => {
          alert(error);
        }
      )
    );
  }

  onSubmit() {


    this.parentSubmitted = true
    if (this.RegisterForm.invalid) {

      if (!this.RegisterForm.controls.fullName.value || !this.RegisterForm.controls.designation.value
        || !this.RegisterForm.controls.phoneNumber.value
        || !this.RegisterForm.controls.userName.value || !this.RegisterForm.controls.password.value || !this.RegisterForm.controls.confirmPassword.value) {
        this.toastr.info("Please Fill all Fields", "Invalid", { closeButton: true });
        return
      }

    }
    this.RegisterDTO.id = this.id;
    this.RegisterDTO.userName = this.RegisterForm.controls.userName.value;
    this.RegisterDTO.phoneNumber = this.RegisterForm.controls.phoneNumber.value;

    if (this.RegisterForm.controls.email.errors) {
      this.toastr.info("Please Provide Valid Email", "Invalid", { closeButton: true });
    } else {
      this.RegisterDTO.email = this.RegisterForm.controls.email.value;
    }
    if (this.RegisterForm.controls.password.value == this.RegisterForm.controls.confirmPassword.value) {
      this.RegisterDTO.password = this.RegisterForm.controls.password.value;
    } else {
      this.toastr.error("Password Does Not Matched", "Invalid", { closeButton: true });
      return
    }

    this.RegisterDTO.fullName = this.RegisterForm.controls.fullName.value;
    this.RegisterDTO.designation = this.RegisterForm.controls.designation.value;
    this.RegisterDTO.canDelete = this.RegisterForm.controls.canDelete.value;
    debugger
    this.RegisterDTO.role = this.RegisterForm.controls.role.value;


    this.subs.add(
      this.registerService.AddRegister(this.RegisterDTO).subscribe(
        (data) => {

          debugger
          this.loading = false;

          if (data.status == 'Warning') {

            this.toastr.error(data.message, "Warning", { closeButton: true });
          } else if (data.status == 'Error') {

            this.toastr.error(data.message, "Error", { closeButton: true });
          } else {
            if (this.RegisterDTO.id > 0) {
              this.toastr.success("Record Updated Sucessfully", "Updated", { closeButton: true });
            } else {
              this.toastr.success("Record Added Sucessfully", "Saved", { closeButton: true });
            }
            this.RegisterForm = this.formBuilder.group({

              userName: "",
              email: "",
              password: "",
              confirmPassword: "",
              phoneNumber: "",
              fullName: "",
              designation: "",
              role:""

            });
            this.router.navigate(['/userList']);
          }
        },
        (error) => {
          this.error = error;
          this.loading = false;
        }
      )
    );
  }
}


