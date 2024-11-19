import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ToastrService } from 'ngx-toastr';

import { RegisterService } from 'src/app/shared/services/RegisterService/RegisterService';
import { RoleService } from 'src/app/shared/services/RoleService/RoleService';
import { ExternalParticepantDto } from 'src/app/Participants/external-particepant-dto';


import * as _ from 'lodash';

import { SheduleService } from 'src/app/shared/services/ScheduleService/shedule.service';
import { Subscription } from 'rxjs';
import { AddQualificationComponent } from 'src/app/Participants/add-qualification/add-qualification.component';
import { state } from '@angular/animations';
import { TraineeDto } from 'src/app/Schedule/trainee-dto';

@Component({
  selector: 'app-replace-external-participant',
  templateUrl: './replace-external-participant.component.html',
  styleUrls: ['./replace-external-participant.component.scss']
})
export class ReplaceExternalParticipantComponent implements OnInit {

  @Input() EventObj: any;
  public parentSubmitted = false;

  ExternalParticepantDto: ExternalParticepantDto = new ExternalParticepantDto();

  ExternalParticipants: any[] = [];
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  ExternalParticipantList: any[] = [];
  ParticepantList: any[] = [];
  loading = false;
  public divisions: Array<{ Name: string, Code: string }> = [];
  public districts: Array<{ Name: string, Code: string }> = [];
  public tehsils: Array<{ Name: string, Code: string }> = [];
  public hfTypes: Array<{ Name: string, Code: string }> = [];
  public Message: string = "";
  public IsError: boolean = false;
  private subs = new Subscription();
  Qualification: any[] = [];
  RegisterForm: FormGroup;
  public Particepants: any;
  TraineeDto: TraineeDto = new TraineeDto();




  constructor(private sheduleService: SheduleService, private formBuilder: FormBuilder, private readonly httpClient: HttpClient, private readonly toastr: ToastrService,
    private readonly router: Router, private readonly registerService: RegisterService, private readonly activatedRoute: ActivatedRoute,
    private readonly roleService: RoleService, public activeModal: NgbActiveModal, private modalService: NgbModal) {
    this.RegisterForm = this.formBuilder.group({
      id: [0, Validators.required]

    });

  }


  ngOnInit(): void {
    this.getParticepants()
    this.getDivision()
    this.getQualification()

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
  AddExternalparticipant() {
    debugger
    this.IsError = false;
    this.Message = '';
    this.parentSubmitted = true;

    // let data = this.RegisterForm.controls.id.value.split('(');
    // let name = data[0].trim();
    // let cnic = data[1].split(')')[0].trim();
    let id = this.ParticepantList.filter(x => x.name == this.RegisterForm.controls.id.value)[0]?.id;
    debugger

    if (this.RegisterForm.controls.id.value == 0) {
      this.Message = "Please Select Participant";
      this.IsError = true;
      return;
    }
    this.getParticepantbyId(id);
    debugger

  }
  getParticepantbyId(Id: any) {

    debugger

    if (this.ExternalParticipants.length > 0) {
      let res = this.ExternalParticipants.find(x => x.Id == Id);
      if (res) {
        return this.toastr.error("Participant aleardy added");
      }
    }

    this.subs.add(
      this.registerService.getParticipantbyId(Id).subscribe(
        (data) => {
          this.ExternalParticepantDto = new ExternalParticepantDto();
          debugger
          this.Particepants = data;
          this.ExternalParticepantDto.Id = data.id
          this.ExternalParticepantDto.ScheduleId = this.EventObj.id
          this.ExternalParticepantDto.Name = data.name;
          this.ExternalParticepantDto.FatherName = data.fatherName;
          debugger
          this.ExternalParticepantDto.CNIC = data.cnic;
          this.ExternalParticepantDto.MobileNo = data.mobileNo;
          this.ExternalParticepantDto.ParticipantType = data.participantType


          this.ExternalParticepantDto.WorkingPlace = data.workingPlace;
          this.ExternalParticipants.push(this.ExternalParticepantDto);
          console.log('///////////////////////////////////////', this.Particepants)
          return data;
        },
        (error) => {
          alert(error);
        }
      )
    );
  }

  getParticepants() {

    debugger
    this.subs.add(
      this.registerService.getParticipant(state).subscribe(
        (data) => {

          debugger
          this.ParticepantList = data.data;
          this.ParticepantList.forEach((ele) => {
            return ele.name = ele.name + ' (' + ele.cnic + ')';
          })

          console.log('///////////////////////////////////////', this.ParticepantList)
          return data;
        },
        (error) => {
          alert(error);
        }
      )
    );
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
    this.sheduleService.getDivisions().subscribe((res: any) => {

      this.divisions = res.data;
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
  OnSubmit() {
    debugger
    if (this.ExternalParticipants.length == 0) {
      return this.toastr.error("Extenal participant is not selected")
    }
    this.TraineeDto.ScheduleId = this.EventObj.scheduleId;
    this.TraineeDto.ExternalParticipants = this.ExternalParticipants;
    this.TraineeDto.ProfileId = this.EventObj.id;
    this.subs.add(
      this.sheduleService.ReplaceExternalParticepantwithScheduleId(this.TraineeDto).subscribe((data) => {
        debugger
        if (!data.isException) {
          this.ExternalParticipantList = data;
          this.passEntry.emit(this.EventObj.scheduleId);
          return this.toastr.success(data.message, "Success");
        } else {
          return this.toastr.error(data.message, "Error");
        }
      },
        (error) => {
          this.passEntry.emit(this.EventObj.scheduleId);
          alert(error.message);
        }
      )
    );
  }
  // onSubmit() {
  //   debugger
  //   this.parentSubmitted = true
  //   this.loading = true;
  //   this.TraineeDto.ScheduleId = this.EventObj.scheduleId;
  //   this.TraineeDto.Trainees = this.ExternalParticipants;
  //   this.TraineeDto.ProfileId = this.EventObj.profileId;    
  //   this.subs.add(
  //     this.sheduleService.AddExternalParticepantwithScheduleId(this.TraineeDto).subscribe((data) => {

  //       debugger
  //       this.loading = false;

  //       var contaxt = this;
  //       if (data === true) {
  //         this.toastr.success("Record Added Sucessfully", "Saved", { closeButton: true });
  //         this.passEntry.emit(this.EventObj.scheduleId);
  //         this.loading = false;
  //         contaxt.activeModal.close();
  //         //  window.location.reload()

  //       }
  //       else {

  //         this.passEntry.emit(this.EventObj.scheduleId);
  //         this.loading = false;
  //         this.toastr.error("Error", "Saved", { closeButton: true });
  //       }
  //       console.log('-----------------------------------', data)
  //       return data;
  //     },
  //       (error) => {
  //         alert(error.message);
  //       }
  //     )
  //   );



  // }




}




