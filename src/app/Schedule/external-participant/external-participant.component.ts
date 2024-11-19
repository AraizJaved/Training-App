import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { state } from '@angular/animations';

import { ToastrService } from 'ngx-toastr';

import { RegisterService } from 'src/app/shared/services/RegisterService/RegisterService';
import { RoleService } from 'src/app/shared/services/RoleService/RoleService';
import { ExternalParticepantDto } from 'src/app/Participants/external-particepant-dto';


import * as _ from 'lodash';

import { SheduleService } from 'src/app/shared/services/ScheduleService/shedule.service';
import { Subscription } from 'rxjs';
import { AddQualificationComponent } from 'src/app/Participants/add-qualification/add-qualification.component';

@Component({
  selector: 'app-external-participant',
  templateUrl: './external-participant.component.html',
  styleUrls: ['./external-participant.component.scss']
})
export class ExternalParticipantComponent implements OnInit {

  @Input() EventObj: any;
  //  
  ExternalParticepantDto: ExternalParticepantDto = new ExternalParticepantDto();

  ExternalParticipants: any[] = [];
  ExternalParticipantList: any[] = [];
  loading = false;
  public divisions: Array<{ Name: string, Code: string }> = [];
  public districts: Array<{ Name: string, Code: string }> = [];
  public tehsils: Array<{ Name: string, Code: string }> = [];
  public hfTypes: Array<{ Name: string, Code: string }> = [];
  public Message: string = "";
  public IsError: boolean = false;
  private subs = new Subscription();
  Qualification: any[] = [];
  temp = [];
  ScheduleList: any[] = []

  @Output() passParticipantData: EventEmitter<any> = new EventEmitter();
  public name: string;
  public cnic: string;
  public mobileNo: string;
  public cadreList = [];
  public RegisterForm = new FormGroup({
    name: new FormControl(null),
    fatherName: new FormControl(''),
    department: new FormControl(''),
    email: new FormControl(''),
    mobileNo: new FormControl(null),
    trainingTypeName: new FormControl(''),
    workingPlace: new FormControl(''),
    cadre: new FormControl(''),
    profession: new FormControl(''),
    qualification: new FormControl(''),
    division: new FormControl(''),
    district: new FormControl(''),
    tehsil: new FormControl(''),
    cnic: new FormControl(null)
  })

  constructor(private sheduleService: SheduleService, private formBuilder: FormBuilder, private readonly httpClient: HttpClient, private readonly toastr: ToastrService,
    private readonly router: Router, private readonly registerService: RegisterService, private readonly activatedRoute: ActivatedRoute,
    private readonly roleService: RoleService, public activeModal: NgbActiveModal, private modalService: NgbModal) {


    //this.Edit(this.id);

  }

  ngOnInit(): void {

    this.getDivision()
    this.getQualification()
    this.getCadre();
    this.setUpForm()

  }



  public getCadre() {
    debugger
    this.registerService.GetCadre().subscribe((res) => {
      this.cadreList = res.data
    })
  }


  setUpForm() {
    debugger
    // this.RegisterForm.get("id").setValue(this.EventObj.name);
    this.RegisterForm.get("name").setValue(this.EventObj?.name);
    this.RegisterForm.get("fatherName").setValue(this.EventObj?.fatherName);
    this.RegisterForm.get("cnic").setValue(this.EventObj?.cnic);
    this.RegisterForm.get("trainingTypeName").setValue(this.EventObj?.participantType);
    this.RegisterForm.get("workingPlace").setValue(this.EventObj?.workingPlace);
    this.RegisterForm.get("department").setValue(this.EventObj?.department);
    this.RegisterForm.get("email").setValue(this.EventObj?.email);
    this.RegisterForm.get("mobileNo").setValue(this.EventObj?.mobileNo);
    this.RegisterForm.get("cadre").setValue(this.EventObj?.jobTittle);
    this.RegisterForm.get("qualification").setValue(this.EventObj?.qualification);
    this.RegisterForm.get("profession").setValue(this.EventObj?.profession);
    this.RegisterForm.get("division").setValue(this.EventObj?.division);
    this.RegisterForm.get("district").setValue(this.EventObj?.district);
    this.RegisterForm.get("tehsil").setValue(this.EventObj?.tehsil);
    // this.ExternalParticipants.push(this.RegisterForm.value);

    // this.ExternalParticepantDto.Name = (<HTMLInputElement>document.getElementById("Name")).value = this.EventObj.name;
    // this.ExternalParticepantDto.FatherName = (<HTMLInputElement>document.getElementById("FatherName")).value = this.EventObj.fatherName;
    // this.ExternalParticepantDto.CNIC = (<HTMLInputElement>document.getElementById("CNIC")).value = this.EventObj.cnic;
    // this.ExternalParticepantDto.ParticipantType = (<HTMLInputElement>document.getElementById("ParticipantType")).value = this.EventObj.participantType;
    // this.ExternalParticepantDto.WorkingPlace = (<HTMLInputElement>document.getElementById("WorkingPlace")).value = this.EventObj.workingPlace == null ? '' : this.EventObj.workingPlace;
    // this.ExternalParticepantDto.MobileNo = (<HTMLInputElement>document.getElementById("MobileNo")).value = this.EventObj.mobileNo;
    // this.ExternalParticepantDto.Department = (<HTMLInputElement>document.getElementById("Department")).value = this.EventObj.department;
    // this.ExternalParticepantDto.Email = (<HTMLInputElement>document.getElementById("Email")).value = this.EventObj.email;
    // // this.ExternalParticepantDto.JobTittle = (<HTMLInputElement>document.getElementById("cadreTitle")).value = this.EventObj.;
    // this.ExternalParticepantDto.Profession = (<HTMLInputElement>document.getElementById("JobTitle")).value = this.EventObj.jobTittle;
    // this.ExternalParticepantDto.Division = (<HTMLInputElement>document.getElementById("Division")).value = this.EventObj.division;
    // this.ExternalParticepantDto.District = (<HTMLInputElement>document.getElementById("District")).value = this.EventObj.district;
    // this.ExternalParticepantDto.Tehsil = (<HTMLInputElement>document.getElementById("Tehsil")).value = this.EventObj.tehsil;
    // this.ExternalParticepantDto.ScheduleId = this.EventObj?.id
  }


  getQualification() {

    this.subs.add(
      this.registerService.getQualification().subscribe((data) => {
        debugger

        this.Qualification = data.data;
        console.log('-----------------------------------', data)
        return data;
      },
        (error) => {
          alert(error.message);
        }
      )
    );
  }
  AddQualification() {


    const modalRef = this.modalService.open(AddQualificationComponent, { size: 'lg' });

    modalRef.result.then((data) => {

      this.getQualification();
      //this.FilterEvent()

      //this.activeModal.close()
    }, (reason) => {
      // on dismiss
    });
  }

  submit() {

    this.IsError = false;
    this.Message = '';
    this.ExternalParticepantDto = new ExternalParticepantDto();
    this.name = (<HTMLInputElement>document.getElementById("Name")).value;
    this.cnic = (<HTMLInputElement>document.getElementById("CNIC")).value;
    this.mobileNo = (<HTMLInputElement>document.getElementById("MobileNo")).value;

    if (this.RegisterForm.controls.name.value == '' || this.RegisterForm.controls.cnic.value == '' || this.RegisterForm.controls.mobileNo.value == '') {
      return
    }

    if (this.RegisterForm.controls.mobileNo.errors?.pattern) {
      return this.toastr.error('Invalid Mobile No.', 'Error')
    }

    if (this.RegisterForm.controls.email.errors?.pattern) {
      return this.toastr.error('Invalid Email', 'Error')
    }

    if (this.RegisterForm.controls.cnic.errors?.pattern) {
      return this.toastr.error('Invalid cnic', 'Error')
    }



    this.ExternalParticepantDto.Name = (<HTMLInputElement>document.getElementById("Name")).value;
    this.ExternalParticepantDto.FatherName = (<HTMLInputElement>document.getElementById("FatherName")).value;
    this.ExternalParticepantDto.CNIC = (<HTMLInputElement>document.getElementById("CNIC")).value;
    this.ExternalParticepantDto.ParticipantType = (<HTMLInputElement>document.getElementById("ParticipantType")).value;
    this.ExternalParticepantDto.WorkingPlace = (<HTMLInputElement>document.getElementById("WorkingPlace")).value;
    this.ExternalParticepantDto.MobileNo = (<HTMLInputElement>document.getElementById("MobileNo")).value;
    this.ExternalParticepantDto.Department = (<HTMLInputElement>document.getElementById("Department")).value;
    this.ExternalParticepantDto.Email = (<HTMLInputElement>document.getElementById("Email")).value;
    this.ExternalParticepantDto.Qualification = (<HTMLInputElement>document.getElementById("meetingVenue")).value.split(' ')[1];
    this.ExternalParticepantDto.JobTittle = (<HTMLInputElement>document.getElementById("cadreTitle")).value;
    this.ExternalParticepantDto.Profession = (<HTMLInputElement>document.getElementById("JobTitle")).value;
    this.ExternalParticepantDto.Division = (<HTMLInputElement>document.getElementById("Division")).value;
    this.ExternalParticepantDto.District = (<HTMLInputElement>document.getElementById("District")).value;
    this.ExternalParticepantDto.Tehsil = (<HTMLInputElement>document.getElementById("Tehsil")).value;
    this.ExternalParticepantDto.ScheduleId = this.EventObj?.id
    this.ExternalParticipants.push(this.ExternalParticepantDto);

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////


    (<HTMLInputElement>document.getElementById("Name")).value = '';
    (<HTMLInputElement>document.getElementById("FatherName")).value = '';
    (<HTMLInputElement>document.getElementById("CNIC")).value = '';
    (<HTMLInputElement>document.getElementById("ParticipantType")).value = '';
    (<HTMLInputElement>document.getElementById("cadreTitle")).value = '';
    (<HTMLInputElement>document.getElementById("JobTitle")).value = '';
    (<HTMLInputElement>document.getElementById("WorkingPlace")).value = '';

    (<HTMLInputElement>document.getElementById("MobileNo")).value = '';
    (<HTMLInputElement>document.getElementById("Department")).value = '';
    (<HTMLInputElement>document.getElementById("Email")).value = '';
    (<HTMLInputElement>document.getElementById("meetingVenue")).value = '';

    (<HTMLInputElement>document.getElementById("Division")).value = '';
    (<HTMLInputElement>document.getElementById("District")).value = '';
    (<HTMLInputElement>document.getElementById("Tehsil")).value = '';

    this.RegisterForm.reset();
    this.OnSubmit();

  }


  AddExternalparticipant() {
    debugger


    this.IsError = false;
    this.Message = '';
    this.ExternalParticepantDto = new ExternalParticepantDto();

    // if ((<HTMLInputElement>document.getElementById("Name")).value == null || (<HTMLInputElement>document.getElementById("Name")).value == '') {
    //   this.Message = "Please Enter Name ";
    //   this.IsError = true;
    //   return;
    // }
    // else {
    //   this.ExternalParticepantDto.Name = (<HTMLInputElement>document.getElementById("Name")).value;
    // }
    // if ((<HTMLInputElement>document.getElementById("FatherName")).value == null || (<HTMLInputElement>document.getElementById("FatherName")).value == '') {
    //   this.Message = "Please Enter Father Name ";
    //   this.IsError = true;
    //   return;
    // }
    // else {
    //   this.ExternalParticepantDto.FatherName = (<HTMLInputElement>document.getElementById("FatherName")).value;
    // }
    // if ((<HTMLInputElement>document.getElementById("CNIC")).value == null || (<HTMLInputElement>document.getElementById("CNIC")).value == '') {
    //   this.Message = "Please Enter CNIC";
    //   this.IsError = true;
    //   return;
    // }
    // else {
    //   this.ExternalParticepantDto.CNIC = (<HTMLInputElement>document.getElementById("CNIC")).value;
    // }
    // if ((<HTMLInputElement>document.getElementById("ParticipantType")).value == null || (<HTMLInputElement>document.getElementById("ParticipantType")).value == '') {
    //   this.Message = "Please Enter Participant Type";
    //   this.IsError = true;
    //   return;
    // }
    // else {
    //   this.ExternalParticepantDto.ParticipantType = (<HTMLInputElement>document.getElementById("ParticipantType")).value;
    // }
    // if ((<HTMLInputElement>document.getElementById("WorkingPlace")).value == null || (<HTMLInputElement>document.getElementById("WorkingPlace")).value == '') {
    //   this.Message = "Please Enter Working Place";
    //   this.IsError = true;
    //   return;
    // }
    // else {
    //   this.ExternalParticepantDto.WorkingPlace = (<HTMLInputElement>document.getElementById("WorkingPlace")).value;
    // }
    // if ((<HTMLInputElement>document.getElementById("MobileNo")).value == null || (<HTMLInputElement>document.getElementById("MobileNo")).value == '') {
    //   this.Message = "Please Enter MobileNo";
    //   this.IsError = true;
    //   return;
    // }
    // else {
    //   this.ExternalParticepantDto.MobileNo = (<HTMLInputElement>document.getElementById("MobileNo")).value;
    // }
    // if ((<HTMLInputElement>document.getElementById("Department")).value == null || (<HTMLInputElement>document.getElementById("Department")).value == '') {
    //   this.Message = "Please Enter Department";
    //   this.IsError = true;
    //   return;
    // }
    // else {
    //   this.ExternalParticepantDto.Department = (<HTMLInputElement>document.getElementById("Department")).value;
    // }
    // if ((<HTMLInputElement>document.getElementById("Email")).value == null || (<HTMLInputElement>document.getElementById("Email")).value == '') {
    //   this.Message = "Please Enter Email";
    //   this.IsError = true;
    //   return;
    // }
    // else {
    //   this.ExternalParticepantDto.Email = (<HTMLInputElement>document.getElementById("Email")).value;
    // }


    // if ((<HTMLInputElement>document.getElementById("JobTitle")).value == null || (<HTMLInputElement>document.getElementById("JobTitle")).value == '') {
    //   this.Message = "Please Enter Job Title";
    //   this.IsError = true;
    //   return;
    // }
    // else {
    //   this.ExternalParticepantDto.JobTittle = (<HTMLInputElement>document.getElementById("JobTitle")).value;
    // }
    // if ((<HTMLInputElement>document.getElementById("Division")).value == null || (<HTMLInputElement>document.getElementById("Division")).value == '') {
    //   this.Message = "Please Select Division";
    //   this.IsError = true;
    //   return;
    // }
    // else {

    //   this.ExternalParticepantDto.Division = (<HTMLInputElement>document.getElementById("Division")).value;
    // }
    // if ((<HTMLInputElement>document.getElementById("District")).value == null || (<HTMLInputElement>document.getElementById("District")).value == '') {
    //   this.Message = "Please Select District";
    //   this.IsError = true;
    //   return;
    // }
    // else {

    //   this.ExternalParticepantDto.District = (<HTMLInputElement>document.getElementById("District")).value;
    // }
    // if ((<HTMLInputElement>document.getElementById("Tehsil")).value == null || (<HTMLInputElement>document.getElementById("Tehsil")).value == '') {
    //   this.Message = "Please Select Tehsil";
    //   this.IsError = true;
    //   return;
    // }
    // else {

    //   this.ExternalParticepantDto.Tehsil = (<HTMLInputElement>document.getElementById("Tehsil")).value;
    // }
    // this.ExternalParticepantDto.ScheduleId=this.EventObj.id



    //////////////////////////////// When no validation is required //////////////////////////////////////////

    this.name = (<HTMLInputElement>document.getElementById("Name")).value;
    this.cnic = (<HTMLInputElement>document.getElementById("CNIC")).value;
    this.mobileNo = (<HTMLInputElement>document.getElementById("MobileNo")).value;

    if (this.name == '' || this.cnic == '' || this.mobileNo == '') {
      
      this.RegisterForm.get("name").setValue('');
      this.RegisterForm.get("cnic").setValue('');
      this.RegisterForm.get("mobileNo").setValue('');
      return
    }

    if (this.RegisterForm.controls.mobileNo.errors?.pattern) {
      return this.toastr.error('Invalid Mobile No.', 'Error')
    }

    if (this.RegisterForm.controls.email.errors?.pattern) {
      return this.toastr.error('Invalid Email', 'Error')
    }

    if (this.RegisterForm.controls.cnic.errors?.pattern) {
      return this.toastr.error('Invalid cnic', 'Error')
    }



    this.ExternalParticepantDto.Name = (<HTMLInputElement>document.getElementById("Name")).value;
    this.ExternalParticepantDto.FatherName = (<HTMLInputElement>document.getElementById("FatherName")).value;
    this.ExternalParticepantDto.CNIC = (<HTMLInputElement>document.getElementById("CNIC")).value;
    this.ExternalParticepantDto.ParticipantType = (<HTMLInputElement>document.getElementById("ParticipantType")).value;
    this.ExternalParticepantDto.WorkingPlace = (<HTMLInputElement>document.getElementById("WorkingPlace")).value;
    this.ExternalParticepantDto.MobileNo = (<HTMLInputElement>document.getElementById("MobileNo")).value;
    this.ExternalParticepantDto.Department = (<HTMLInputElement>document.getElementById("Department")).value;
    this.ExternalParticepantDto.Email = (<HTMLInputElement>document.getElementById("Email")).value;
    this.ExternalParticepantDto.JobTittle = (<HTMLInputElement>document.getElementById("cadreTitle")).value;
    this.ExternalParticepantDto.Profession = (<HTMLInputElement>document.getElementById("JobTitle")).value;
    this.ExternalParticepantDto.Division = (<HTMLInputElement>document.getElementById("Division")).value;
    this.ExternalParticepantDto.District = (<HTMLInputElement>document.getElementById("District")).value;
    this.ExternalParticepantDto.Tehsil = (<HTMLInputElement>document.getElementById("Tehsil")).value;
    this.ExternalParticepantDto.ScheduleId = this.EventObj?.id
    this.ExternalParticipants.push(this.ExternalParticepantDto);

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////


    (<HTMLInputElement>document.getElementById("Name")).value = '';
    (<HTMLInputElement>document.getElementById("FatherName")).value = '';
    (<HTMLInputElement>document.getElementById("CNIC")).value = '';
    (<HTMLInputElement>document.getElementById("ParticipantType")).value = '';
    (<HTMLInputElement>document.getElementById("cadreTitle")).value = '';
    (<HTMLInputElement>document.getElementById("JobTitle")).value = '';
    (<HTMLInputElement>document.getElementById("WorkingPlace")).value = '';

    (<HTMLInputElement>document.getElementById("MobileNo")).value = '';
    (<HTMLInputElement>document.getElementById("Department")).value = '';
    (<HTMLInputElement>document.getElementById("Email")).value = '';

    (<HTMLInputElement>document.getElementById("Division")).value = '';
    (<HTMLInputElement>document.getElementById("District")).value = '';
    (<HTMLInputElement>document.getElementById("Tehsil")).value = '';





  }


  CloseModal() {
    this.modalService.dismissAll();
  }
  public dropdownValueChanged = (value, filter) => {

    console.log(value.target.value);
    let val = value.target.value.split(' ')[1]
    debugger
    if (!value) {
      return;
    }
    if (filter == 'Div') {

      this.loadDistrict(val);


    }
    if (filter == 'Dis') {
      this.loadTehsils(val);

    }
  }


  public loadDistrict(divCode: string) {
    this.districts = [];
    this.sheduleService.getDistricts(divCode)
      .subscribe((x: any) => {
        debugger
        if (x) {
          this.districts = x.data;
        }
      });
  }
  public getDivision() {
    this.loading = true;
    this.sheduleService.getDivisions().subscribe((res: any) => {

      this.divisions = res.data;
      if (this.EventObj != null) {
        this.setUpForm();
      }
      this.loading = false;
    })
  }



  public loadTehsils(disCode: string) {

    this.tehsils = [];
    this.sheduleService.getTehsils(disCode)
      .subscribe((x: any) => {
        if (x) {
          debugger
          this.tehsils = x.data;
        }
      });

  }

  GetExParticipantList() {

    this.subs.add(
      this.registerService.GetParticipantList(state).subscribe(
        (data) => {

          this.temp = [...data.result];

          this.ScheduleList = data.result;

          this.passParticipantData.emit(this.ScheduleList);
          return data;
        },
        (error) => {
          alert(error);
        }
      )
    );
  }


  OnSubmit() {
    debugger


    this.subs.add(
      this.sheduleService.AddExternalParticepant(this.ExternalParticipants).subscribe((data) => {
        debugger;

        this.ExternalParticipantList = data;
        this.GetExParticipantList();
        this.CloseModal()
        this.toastr.success("Record Added Sucessfully", "Saved", { closeButton: true });
        console.log('-----------------------------------', data)

      },
        (error) => {
          alert(error.message);
        }
      )
    );
  }













}


