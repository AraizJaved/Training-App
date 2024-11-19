import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { AngularFireAuth } from "@angular/fire/auth";
import { AuthService } from "../../shared/services/firebase/auth.service";
import { LoginDTO } from "src/app/auth/login/dto/login.dto";
import { ToastrService } from "ngx-toastr";
import { CoreService } from "src/app/Core/core.service";
type UserFields = "email" | "password";
type FormErrors = { [u in UserFields]: string };

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  public newUser = false;
  public user: firebase.User;
  public loginForm: FormGroup;
  UserLoginDTO: LoginDTO = new LoginDTO();

  public formErrors: FormErrors = {
    email: "",
    password: "",
  };

  public errorMessage: any;

  constructor(
    private readonly coreService: CoreService,
    public authService: AuthService,
    private afauth: AngularFireAuth,
    private fb: FormBuilder,
    private router: Router,
    private readonly toastr: ToastrService,
    
  ) {
    this.loginForm = fb.group({
      email: [null, [Validators.required]],
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
  login() {
    debugger
    this.UserLoginDTO.UserName = this.loginForm.controls.email.value;
    this.UserLoginDTO.Password = this.loginForm.controls.password.value;
    this.authService.SignIn(this.UserLoginDTO).subscribe(
      (response) => {

        this.coreService.loginResponse = response;
      },
      (error) => {


        this.toastr.error("Error in login", "Error", { closeButton: true });
      },
      () => {

      }
    );
  }
}
