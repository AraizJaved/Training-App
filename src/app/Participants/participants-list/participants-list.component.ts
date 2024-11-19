import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup, RequiredValidator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal, NgbTabsetConfig } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { RegisterService } from 'src/app/shared/services/RegisterService/RegisterService';
import { PaginationControlsComponent, PaginationInstance } from 'ngx-pagination';
import { state } from '@angular/animations';
import { AddTrainingScheduleComponent } from 'src/app/Schedule/add-training-schedule/add-training-schedule.component';
import { ViewScheduleDetailsComponent } from 'src/app/Schedule/view-schedule-details/view-schedule-details.component';
import { AddTraineeComponent } from 'src/app/Schedule/add-trainee/add-trainee.component';
import { AddTrainerComponent } from 'src/app/Schedule/add-trainer/add-trainer.component';
import { ParticipantStatusDto } from '../participants-list/participant-status-dto'
import { TotalMarksComponent } from 'src/app/Reports/total-marks/total-marks.component';
declare var require
@Component({
  selector: 'app-participants-list',
  templateUrl: './participants-list.component.html',
  styleUrls: ['./participants-list.component.scss'],
  styles: [
    `
      .greenClass { background-color: green }
      .redClass { background-color: red }
    `
  ],
  providers: [NgbTabsetConfig]
})
export class ParticipantsListComponent implements OnInit {
  private subs = new Subscription();
  @Input() EventObj: any;
  text='';
  searchText: string;
  temp = [];
  rows = [];
  overdue = [];
  userList = [];
  trainingId: number = 0
  public Trainings: any[] = [];
  participantStatusDto: ParticipantStatusDto = new ParticipantStatusDto();
  isAdmin: boolean
  isAddTask: boolean
  public showBody: boolean
  response: boolean
  counts: any
  User: any
  ScheduleDto: any;
  ParticipantStatusDto: any;
  userDesignation: any
  userId: any
  Status: any
  Priority: any[] = [
    { name: "High" },
    { name: "Medium" },
    { name: "Low" }]
  ScheduleList: any[] = []
  public isLoading: boolean = false;
  public isShowModal: boolean = false;
  public tid = "row";

  public config: PaginationInstance = {
    id: 'advanced',
    itemsPerPage: 10,
    currentPage: 1
  };

  public totalMarks = 0;
  public dropDownId: number = 0;
  public count: number = 0;


  public trainingCategories = [
    { title: "Completed" },
    { title: "Partially Completed" },
    // { title: "Not Completed" }
  ]

  constructor(private readonly registerService: RegisterService, private readonly toastr: ToastrService,
    private readonly router: Router, private modalService: NgbModal, private formBuilder: FormBuilder,
    private _config: NgbTabsetConfig) { }

  ngOnInit(): void {

    //this.GetDailyEngagementPublicList();


    this.isLoading = true;

    this.GetScheduleList()

    this.showBody = false;
    this._config.justify = 'center';
    this._config.type = 'pills';
  }

  getTrainings() {

    this.subs.add(
      this.registerService.getTrainings().subscribe((data) => {


        this.Trainings = data.data;
        console.log('-----------------------------------', data)
        return data;
      },
        (error) => {
          alert(error.message);
        }
      )
    );
  }
  ChangeStatus(data) {

    this.participantStatusDto.ScheduleId = data.scheduleId;
    this.participantStatusDto.ProfileId = data.profileId;
    this.participantStatusDto.Status = "Pending";



    this.subs.add(
      this.registerService.ChangeParticipantsStatus(this.participantStatusDto).subscribe((data) => {


        this.response = data;
        if (this.response) {
          this.toastr.success("Record Added Sucessfully", "Saved", { closeButton: true });
          this.GetScheduleWithParticepants(this.participantStatusDto.ScheduleId);

        }
        else {
          this.toastr.error("Oops Error", "Saved", { closeButton: true });

        }

        return data;
      },
        (error) => {
          alert(error.message);
        }
      )
    );
  }

  showSchedule(data) {

    const modalRef = this.modalService.open(ViewScheduleDetailsComponent, { size: 'lg' });
    // this.GetScheduleWithParticepants(data.id);


    this.registerService.GetScheduleWithParticepants(data.id).subscribe(
      (res: any) => {


        this.ScheduleDto = res.data;
        modalRef.componentInstance.EventObj = this.ScheduleDto;
        console.log("ScheduleDetail", this.ScheduleDto)

        modalRef.componentInstance.title = "View Training";

        modalRef.componentInstance.clickevent.subscribe(($e) => {
          //this.FilterEvent();
          window.location.reload();
        })




        return data;
      },
      (error) => {
        alert(error);
      }
    )




  }
  public dropdownValueChanged = (value) => {

    debugger
    this.isLoading = true;
    // console.log(value.target.value);
    let val = this.ScheduleList.filter(x => x.id === value)[0].id
    // let val = value.target.value.split(' ')[1];
    this.dropDownId = val;

    if (!value) {
      return;
    }
    if (this.dropDownId == 0) {
      this.showBody = false;
      return;
    }
    this.GetScheduleWithParticepants(this.dropDownId);
    this.showBody = true;

    this.isShowModal = true



  }
  GetScheduleWithParticepants(id: any) {

    debugger
    this.subs.add(

      this.registerService.GetScheduleWithParticepants(id).subscribe(
        (data: any) => {


          this.ScheduleDto = data.data;

          this.ScheduleDto?.traineeList.forEach((ele) => {
            if (ele.totalMarks != null) {
              this.totalMarks = ele.totalMarks
              return;
            }
          })


          console.log("ScheduleDetail", this.ScheduleDto)
          return data;
        },
        (error) => {
          alert(error);
        }
      )
    );

  }








  showScheduleModel(data) {

    const modalRef = this.modalService.open(AddTrainingScheduleComponent, { size: 'lg' })
    modalRef.componentInstance.EventObj = data;
    modalRef.componentInstance.title = "Add Trainee";

    modalRef.componentInstance.clickevent.subscribe(($e) => {
      //this.FilterEvent();
      window.location.reload();
    })
  }


  showAddTrainee(data) {

    const modalRef = this.modalService.open(AddTraineeComponent, { size: 'lg' })
    modalRef.componentInstance.EventObj = data;
    modalRef.componentInstance.title = "Add Trainer";

    modalRef.componentInstance.clickevent.subscribe(($e) => {
      //this.FilterEvent();
      window.location.reload();
    })
  }
  showAddTrainer(data) {

    const modalRef = this.modalService.open(AddTrainerComponent, { size: 'lg' })
    modalRef.componentInstance.EventObj = data;
    modalRef.componentInstance.title = "Add Training";

    modalRef.componentInstance.clickevent.subscribe(($e) => {
      //this.FilterEvent();
      window.location.reload();
    })
  }







  onPageChange(number: number) {

    this.config.currentPage = number;
  }

  onPageBoundsCorrection(number: number) {

    this.config.currentPage = number;
  }

  GetScheduleList() {

    debugger
    this.subs.add(
      this.registerService.GetScheduleList(state,this.text).subscribe(
        (data) => {

          this.temp = [...data.result];

          this.ScheduleList = data.result;
          console
          return data;
        },
        (error) => {
          alert(error);
        }
      )
    );
  }


  GetDailyEngagementPublicList() {

    this.subs.add(
      this.registerService.GetDailyEngagementPublicList(state).subscribe(
        (data) => {

          this.temp = [...data.result];

          this.rows = data.result;
          console
          return data;
        },
        (error) => {
          alert(error);
        }
      )
    );
  }


  hideEditButton(i, data) {

    debugger

    if (data.attendanceStatus != "Absent" && data.attendanceStatus != "No Status") {
      let id = i + data.name;
      let id1 = i + '-' + '1';
      let id2 = i + '-' + '2';
      let inp1 = (<HTMLInputElement>document.getElementById(id1))?.value;
      let inp2 = (<HTMLInputElement>document.getElementById(id2))?.value;
      // if (i == 0) {
      //   this.isLoading = true;
      // } else if(i!=0 && i<=this.ScheduleDto?.traineeList.length - 1){
      //   this.isLoading = false;
      // }


      if (inp1 != null && inp2 != null) {
        if ((inp1 != '' && inp2 != '') && this.isLoading) {
          (<HTMLInputElement>document.getElementById(id1)).disabled = true;
          (<HTMLInputElement>document.getElementById(id2)).disabled = true;
        }
      }

      if (data?.obtainMarksAfterTraining == null && data?.obtainMarksBeforeTrainig == null) {
        if ((<HTMLInputElement>document.getElementById(id))?.style.display === '') {
          (<HTMLInputElement>document.getElementById(id)).style.display = 'none';

        }

      } else {
        if ((<HTMLInputElement>document.getElementById(i))?.style.display === '') {
          (<HTMLInputElement>document.getElementById(i)).style.display = 'none';
        }
      }
      if (i == this.ScheduleDto?.traineeList.length - 1) {
        this.isLoading = false;
      }
    }
  }

  setTrainingStatus(i, data) {
    debugger
    if (this.isLoading) {
      if (data.attendanceStatus == 'No Status') {
        return;
      }
      let e = (document.getElementById(i + '-training')) as HTMLSelectElement;
      if (e != null) {
        let sel = e.selectedIndex;
        let opt = e.options[sel];
        let trainingCategory = opt.text;

        if (trainingCategory == '-- Select Training Status--') {
          return
        }

        // let obj = {
        //   profileId: data.profileId,
        //   scheduleId: data.scheduleId,
        //   ParticipantTrainingStatus: trainingCategory,
        //   AttendanceStatus: data.status
        // }
        e = (document.getElementById(i + '-training')) as HTMLSelectElement;
        e.style.display = 'none'
        e = (document.getElementById(i + '-Status')) as HTMLSelectElement;
        e.style.display = 'block'
        e.style.fontWeight = 'bold'
        e.innerHTML = trainingCategory
        // this.registerService.ChangeParticipantMarks(obj).subscribe((res) => {
        //   this.toastr.success("Record Saved Sucessfully", "Saved");
        // })
      }
    }

  }


  saveData(index, data: any) {


    debugger
    if (data.attendanceStatus == "Absent" || data.attendanceStatus == "No Status") {
      return this.toastr.info("You can only save when trainee status is Present", 'info')
    } else {
      let id = index + '-' + '1';
      let id2 = index + '-' + '2';
      let id3 = index + data.name;


      let inp1 = (<HTMLInputElement>document.getElementById(id)).value;
      let inp2 = (<HTMLInputElement>document.getElementById(id2)).value;
      if (inp1 == '' || inp2 == '') {
        return this.toastr.error("Enter Obatain Marks", "Error");
      } else if (this.totalMarks == 0) {
        return this.toastr.error("Enter Total Marks", "Error");
      } else if (parseInt(inp1) > this.totalMarks) {
        return this.toastr.error("Enter valid pre training score", "Error");
      } else if (parseInt(inp2) > this.totalMarks) {
        return this.toastr.error("Enter valid post training score", "Error");
      }
      else {

        // parseInt(document.getElementById('034601238888591').innerHTML.trim().split('%')[0])
        let p1 = ((parseInt(inp1) / this.totalMarks) * 100).toFixed(2).toString() + '%';
        let p2 = ((parseInt(inp2) / this.totalMarks) * 100).toFixed(2).toString() + '%';
        (<HTMLInputElement>document.getElementById(index + data.cnic)).innerHTML = p1;
        (<HTMLInputElement>document.getElementById(index + data.cnic + 1)).innerHTML = p2;



        let obj = {
          profileId: data.profileId,
          scheduleId: data.scheduleId,
          ObtainMarksBeforeTrainig: inp1,
          ObtainMarksAfterTraining: inp2,
          TotalMarks: this.totalMarks
        }

        this.ScheduleDto.traineeList[index].obtainMarksBeforeTrainig = inp1;
        this.ScheduleDto.traineeList[index].obtainMarksAfterTraining = inp2;

        this.registerService.ChangeParticipantMarks(obj).subscribe((res) => {

          (<HTMLInputElement>document.getElementById(index)).style.display = 'none';
          (<HTMLInputElement>document.getElementById(id3)).style.display = 'block';
          (<HTMLInputElement>document.getElementById(id)).disabled = true;
          (<HTMLInputElement>document.getElementById(id2)).disabled = true;
        })
      }
    }
  }

  saveTraining(i, data) {
    debugger

    if (data.attendanceStatus == 'No Status') {
      return this.toastr.info('You can only save when status is Present', 'Info')
    }
    let e = (document.getElementById(i + '-training')) as HTMLSelectElement;
    let sel = e.selectedIndex;
    let opt = e.options[sel];
    let trainingCategory = opt.text;

    if (trainingCategory == '-- Select Training Status--') {
      return this.toastr.error('Select training category', 'Error')
    }

    let obj = {
      profileId: data.profileId,
      scheduleId: data.scheduleId,
      ObtainMarksBeforeTrainig: null,
      ObtainMarksAfterTraining: null,
      ParticipantTrainingStatus: trainingCategory,
    }

    this.registerService.ChangeParticipantMarks(obj).subscribe((res) => {
      e = (document.getElementById(i + '-training')) as HTMLSelectElement;
      e.style.display = 'none'
      e = (document.getElementById(i + '-Status')) as HTMLSelectElement;
      e.style.display = 'block'
      e.style.fontWeight = 'bold'
      e.innerHTML = trainingCategory
      this.toastr.success("Record Saved Sucessfully", "Saved");
      this.GetScheduleWithParticepants(this.dropDownId);
    })
  }


  onSelectChange(event) {
    debugger
    this.isLoading = true
    this.count++;
    if (this.count % 2 != 0) {
      this.GetScheduleWithParticepants(this.dropDownId);
    }
  }

  editData(index, data: any) {


    debugger

    let id = index + '-' + '1';
    let id2 = index + '-' + '2';
    let id3 = index + data.name;


    let inp1 = (<HTMLInputElement>document.getElementById(id)).value;
    let inp2 = (<HTMLInputElement>document.getElementById(id2)).value;


    if (inp1 != '' || inp2 != '') {
      (<HTMLInputElement>document.getElementById(id)).disabled = false;
      (<HTMLInputElement>document.getElementById(id2)).disabled = false;
    }


    if (inp1 == '' || inp2 == '') {
      return this.toastr.error("Enter Obatain Marks", "Error");
    } else {

      let obj = {
        profileId: data.profileId,
        scheduleId: data.scheduleId,
        ObtainMarksBeforeTrainig: inp1,
        ObtainMarksAfterTraining: inp2,
        TotalMarks: this.totalMarks
      }
      this.ScheduleDto.traineeList[index].obtainMarksBeforeTrainig = inp1;
      this.ScheduleDto.traineeList[index].obtainMarksAfterTraining = inp2;
      this.registerService.ChangeParticipantMarks(obj).subscribe((res) => {

        (<HTMLInputElement>document.getElementById(id3)).style.display = 'none';
        (<HTMLInputElement>document.getElementById(index)).style.display = 'block';
        (<HTMLInputElement>document.getElementById(id)).disabled = false;
        (<HTMLInputElement>document.getElementById(id2)).disabled = false;
      })
    }
    // (<HTMLInputElement>document.getElementById(id3)).style.display = 'none';
    // (<HTMLInputElement>document.getElementById(index)).style.display = 'block';
    // (<HTMLInputElement>document.getElementById(id)).disabled = false;
    // (<HTMLInputElement>document.getElementById(id2)).disabled = false;
  }
  showTotalmarks() {

    const modalRef = this.modalService.open(TotalMarksComponent, { size: 'lg' })
    let flag: boolean = false
    modalRef.componentInstance.passEntry.subscribe((receivedEntry) => {
      debugger
      this.ScheduleDto?.traineeList.forEach(element => {
        let totalMarks = parseInt(receivedEntry);
        if (element.obtainMarksAfterTraining > totalMarks || element.obtainMarksBeforeTrainig > totalMarks) {
          flag = true
        }
      });
      console.log(receivedEntry);
      if (!flag) {
        this.totalMarks = receivedEntry;
      } else {
        return this.toastr.error("Invalid total marks", "Error");
      }

    })
    // this.totalMarks = parseInt(localStorage.getItem('TM'));
  }


  public openFile() {
    window.open("assets/PDF/PARTICIPANT MANAGEMENT - TRAINING SCORE.pdf");
  }


}
