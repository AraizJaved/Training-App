import { Injectable, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { LoginResponseDTO } from '../../model/auth.model'
import { ToastrService } from 'ngx-toastr';
import { CookieService } from '../../services/cookie.service'
import { HttpClient } from '@angular/common/http';
import { Config } from 'src/app/Core/helpers/config.helper';
import { LoginDTO } from 'src/app/auth/login/dto/login.dto';
import { map } from 'rxjs/operators';
import { NavService } from 'src/app/shared/services/nav.service'


export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  emailVerified: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {
  public userRoles: any;
  public userData: any;
  public user: firebase.User;
  private _sessionId: string;
  public showLoader: boolean = false;
  dtoUser: LoginResponseDTO

  constructor(public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone,
    public toster: ToastrService,
    private cookieService: CookieService, private http: HttpClient,
    public navServices: NavService,) {

    // this.afAuth.authState.subscribe(user => {
    //   if (user) {
    //     this.userData = user;
    //     this._sessionId = this.userData;
    //     cookieService.setCookie('currentUser', JSON.stringify(this.userData), 1);
    //     localStorage.setItem('currentUser', JSON.stringify(this.userData));
    //     JSON.parse(localStorage.getItem('currentUser'));
    //     this.router.navigateByUrl('/map/google');
    //   } else {
    //     localStorage.setItem('currentUser', null);
    //     JSON.parse(localStorage.getItem('currentUser'));
    //   }
    // });
  }

  public currentUser(): LoginResponseDTO {
    // if (!this.dtoUser) {
    // this.dtoUser = JSON.parse(this.cookieService.getCookie('currentUser'))
    // this.dtoUser = JSON.parse(localStorage.getItem('currentUser'))
    // }
    // return this.dtoUser

    return JSON.parse(localStorage.getItem('currentUser'))
  }

  ngOnInit(): void { }

  //sign in function
  SignIn(UserLoginDTO: LoginDTO) {

    debugger
    //this.router.navigate(['/dashboard/default']);
    return this.http.post<any>(Config.getControllerUrl('Auth', 'login'), UserLoginDTO)
      .pipe(map(user => {
debugger
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          this.user = user
          this.cookieService.setCookie('currentUser', JSON.stringify(user), 1)
          localStorage.setItem('currentUser', JSON.stringify(user))
          this.userRoles = this.navServices.userRoles;
if(this.userRoles.includes('Participant'))
{
  this.router.navigate(['/ParticepantSchedule']);
}
else
{
  this.router.navigate(['/CounterDashboard']);
}
          // this.SetUserData(user);
         
          // store user details and jwt in cookie
          // this.cookieService.setCookie('currentUser', JSON.stringify(user), 1)
        }
        return user
      }))
  }
  ParticepantRegister(ParticepentsRegisterDTO: any) {

    debugger
    //this.router.navigate(['/dashboard/default']);
    return this.http.post<any>(Config.getControllerUrl('Auth', 'RegisterParticepants'), ParticepentsRegisterDTO)
      .pipe(map(user => {

        // login successful if there's a jwt token in the response
        if (user) {
        

          // this.SetUserData(user);
          this.router.navigate(['/auth/login'])
          // store user details and jwt in cookie
          // this.cookieService.setCookie('currentUser', JSON.stringify(user), 1)
        }
        return user
      }))
  }

  //main verification function
  SendVerificationMail() {
    // return this.afAuth.auth.currentUser.sendEmailVerification()
    //   .then(() => {
    //     this.router.navigate(['/CounterDashboard']);
    //   })
  }

  //Sign in with Facebook
  signInFacebok() {
    return this.AuthLogin(new auth.FacebookAuthProvider());
  }

  //Sign in with Twitter
  signInTwitter() {
    return this.AuthLogin(new auth.TwitterAuthProvider());
  }

  //Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }

  ForgotPassword(passwordResetEmail) {
    // return this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail)
    //   .then(() => {
    //     window.alert('Password reset email sent, check your inbox.');
    //   }).catch((error) => {
    //     window.alert(error);
    //   });
  }

  logout(): void {
    localStorage.clear()
    this.cookieService.deleteCookie('currentUser');
    this.router.navigate(['/auth/login'])
  }

  //Authentication for Login
  AuthLogin(provider) {
    // return this.afAuth.auth.signInWithPopup(provider)
    //   .then((result) => {
    //     this.ngZone.run(() => {
    //       this.router.navigate(['/CounterDashboard']);
    //     });
    //     // this.SetUserData(result.user);
    //   }).catch((error) => {
    //     window.alert(error);
    //   });
  }

  //Set user
  // SetUserData(user) {
  //   const userData: User = {
  //     email: user.email,
  //     displayName: user.displayName,
  //     uid: user.uid,
  //     photoURL: user.photoURL || 'assets/dashboeard/boy-2.png',
  //     emailVerified: user.emailVerified
  //   };
  //   userRef.delete().then(function () {})
  //         .catch(function (error) {});
  //   return userRef.set(userData, {
  //     merge: true
  //   });
  // }

  // Sign out
  SignOut() {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    // return this.afAuth.auth.signOut().then(() => {
      this.showLoader = false;
      localStorage.clear();
      this.cookieService.deleteCookie('user');
      this.router.navigate(['/auth/login']);
    // });
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user != null && user.emailVerified != false) ? true : false;
  }

}
