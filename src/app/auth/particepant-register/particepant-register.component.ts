

import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { AngularFireAuth } from "@angular/fire/auth";
import { AuthService } from "../../shared/services/firebase/auth.service";
import { LoginDTO } from "src/app/auth/login/dto/login.dto";
import { RegisterDto } from "src/app/auth/login/dto/register-dto";
import { ToastrService } from "ngx-toastr";
import { CoreService } from "src/app/Core/core.service";

type UserFields = "cnic" | "password";
type FormErrors = { [u in UserFields]: string };

@Component({
  selector: 'app-particepant-register',
  templateUrl: './particepant-register.component.html',
  styleUrls: ['./particepant-register.component.scss']
})
export class ParticepantRegisterComponent implements OnInit {
  public newUser = false;
  public user: firebase.User;
  public registerForm: FormGroup;
  ParticepantsDTO: RegisterDto = new RegisterDto();

  public formErrors: FormErrors = {
    cnic: "",
    password: "",
  };

  public errorMessage: any;

  constructor(
    private readonly coreService: CoreService,
    public authService: AuthService,
    private afauth: AngularFireAuth,
    private fb: FormBuilder,
    private router: Router,
    private readonly toastr: ToastrService
  ) {
    this.registerForm = fb.group({
      cnic: [null, [Validators.required]],
      password: [null, Validators.required],
    });
  }

  ngOnInit() { }

  // Login With Google
  loginGoogle() {
    this.authService.GoogleAuth();
  }

  // Login With Twitter
  loginTwitter(): void {
    this.authService.signInTwitter();
  }

  // Login With Facebook
  loginFacebook() {
    this.authService.signInFacebok();
  }

  Register() {

    this.router.navigate(['/register'],)
  }

  // Simple Login
  Registers() {
    debugger
    this.ParticepantsDTO.CNIC = this.registerForm.controls.cnic.value;
    this.ParticepantsDTO.Password = this.registerForm.controls.password.value;
    this.authService.ParticepantRegister(this.ParticepantsDTO).subscribe(
      (response) => {

        this.toastr.success("Register successfully ", "success", { closeButton: true });
      },
      (error) => {


        this.toastr.error("Error in login", "Error", { closeButton: true });
      },
      () => {

      }
    );
  }
}
