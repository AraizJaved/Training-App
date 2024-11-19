import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { RegisterService } from 'src/app/shared/services/RegisterService/RegisterService';
import { Subscription } from 'rxjs';
import { ChangePassword } from '../change-password/ChangePassword';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

@Input() oldPassword;
@Input() userID;
@Input() FromHeader;
ChangePasswordForm: FormGroup;
changePasswordSubmitted:boolean=false;
private subs = new Subscription();
public user:any;
ChangePassword: ChangePassword = new ChangePassword();
  constructor(private formBuilder: FormBuilder, private readonly toastr: ToastrService,private readonly registerService: RegisterService,
    public activeModal: NgbActiveModal, ) {

    
   }

  ngOnInit(): void {
    this.ChangePasswordForm = this.formBuilder.group({
      oldPassword: ["", Validators.required],
      newPassword: ["", Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')],
      confirmNewPassword: [null, Validators.required]
    });
    debugger
    this.user = JSON.parse(localStorage.getItem("currentUser"))
    this.ChangePasswordForm.controls.oldPassword.setValue(this.oldPassword)
    console.log(this.oldPassword);
  }


  onSubmitChangePassword(){

    debugger
    this.changePasswordSubmitted=true;
    
        if(this.ChangePasswordForm.controls.newPassword.value =="" || this.ChangePasswordForm.controls.confirmNewPassword.value ==""){
    
          this.toastr.error("Please Provide Password...", "Required", { closeButton: true });
          return
        }
        
        if(this.ChangePasswordForm.controls.newPassword.value != this.ChangePasswordForm.controls.confirmNewPassword.value){
    
          this.toastr.error(" Confirm Password Not Match...", " Provide same as new password ", { closeButton: true });
          return
        }
        this.ChangePassword.userid=this.userID;
        
        if(this.FromHeader==true){
          if(this.ChangePasswordForm.controls.oldPassword.value =="" ){
    
            this.toastr.error("Please Provide Old Password...", "Required", { closeButton: true });
            return
          }
          if(this.ChangePasswordForm.controls.oldPassword.value != this.user.user.np){
    
            this.toastr.error(" Your Old Password is not correct..", "Warning ", { closeButton: true });
            return
          }
          
          this.ChangePassword.CurrentPassword= this.ChangePasswordForm.controls.oldPassword.value;
        }
        else{
          this.ChangePassword.CurrentPassword=this.oldPassword;
    
        }
        
        this.ChangePassword.Newpassword= this.ChangePasswordForm.controls.newPassword.value;
        this.subs.add(
          this.registerService.ChangePassword(this.ChangePassword).subscribe(
            (data) => {
              if (data.status == 'Succeed') {

                this.toastr.success("Password Updated Succesfully...", "Success", { closeButton: true });
              }
              if (data.status == 'Failed') {

                this.toastr.error("Password Mismatch...", "Error", { closeButton: true });
                return
              }
             
            this.activeModal.close()
              
            },
            (error) => {
           
            }
          )
        );
    
        
    
  }

  

}
