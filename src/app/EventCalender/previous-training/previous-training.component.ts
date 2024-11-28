import { Component, OnInit } from '@angular/core';
import $ from 'jquery';
import moment from 'moment';
import 'fullcalendar';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { AddFileFolderComponent } from 'src/app/SharedFolder/add-file-folder/add-file-folder.component';
import { AddEventComponent } from '../add-event/add-event.component';
import { AddTrainingScheduleComponent } from 'src/app/Schedule/add-training-schedule/add-training-schedule.component'
import { Observable, Subscription } from 'rxjs';
import { RegisterService } from 'src/app/shared/services/RegisterService/RegisterService';
import { FilterDTO } from 'src/app/EventCalender/FilterDTO';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ViewEventComponent } from '../view-event/view-event.component';
import { AddMeetingOrganizerComponent } from '../add-meeting-organizer/add-meeting-organizer.component';
import { AddMeetingVenueComponent } from '../add-meeting-venue/add-meeting-venue.component';
import { PaginationInstance } from 'ngx-pagination';
import { AddExistingTrainingComponent } from '../add-existing-training/add-existing-training.component';
import { state } from '@angular/animations';
import { AddTraineeComponent } from 'src/app/Schedule/add-trainee/add-trainee.component';
import { AddTrainerComponent } from 'src/app/Schedule/add-trainer/add-trainer.component';
import { ViewScheduleDetailsComponent } from 'src/app/Schedule/view-schedule-details/view-schedule-details.component';
import { ExternalParticipantComponent } from 'src/app/Schedule/external-participant/external-participant.component';
import { Router } from '@angular/router';
import { ExternalParticepantDropDownComponent } from 'src/app/Participants/external-particepant-drop-down/external-particepant-drop-down.component';

declare var require
const Swal = require('sweetalert2')
@Component({
  selector: 'app-previous-training',
  templateUrl: './previous-training.component.html',
  styleUrls: ['./previous-training.component.scss']
})
export class PreviousTrainingComponent implements OnInit {

  private subs = new Subscription();
  searchText: string;
  text = '';
  defaultConfigurations: any;
  isEventManagement: boolean
  isMeetingManagement: boolean
  isMeetingManagementView: boolean
  isMeetingManagementAdd: boolean
  isMeetingManagementDelete: boolean
  ScheduleList: any[] = []
  ScheduleDto: any;
  isAdmin: boolean
  public loading: boolean = false;
  Events: any[] = [
    { name: "My Meetings" },
    // { name:"All Meetings"},
    { name: "Active Meetings" },
    { name: "InActive Meetings" },
    { name: "Cancelled Meetings" },
    { name: "Postponed Meetings" },
    { name: "Rescheduled Meetings" },
    { name: "Archived Meetings" }
  ]

  FilterDTO: FilterDTO = new FilterDTO()
  FilterForm: FormGroup;
  eventData = [];
  public config: PaginationInstance = {
    id: 'advanced',
    itemsPerPage: 10,
    currentPage: 1
  };
  eventsOrignal = [];
  canBeDeleted: boolean;
  constructor(
    private readonly router: Router,
    private modalService: NgbModal,
    private readonly registerService: RegisterService,
    private formBuilder: FormBuilder
  ) {

    this.FilterDTO.recordStatus = true;

    let self = this;
    console.log(self);
    this.defaultConfigurations = {
      editable: true,
      eventLimit: true,
      titleFormat: 'MMM D YYYY',
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
      },
      buttonText: {
        today: 'Today',
        month: 'Month',
        week: 'Week',
        day: 'Day'
      },
      views: {
        agenda: {
          eventLimit: 2
        }
      },
      allDaySlot: false,
      slotDuration: moment.duration('00:15:00'),
      slotLabelInterval: moment.duration('01:00:00'),
      firstDay: 1,
      selectable: true,
      selectHelper: true,
      showNonCurrentDates: false,
      //events: this.eventData,

      eventClick(event) {
        console.log(event);
        debugger
        if ((JSON.parse(localStorage.getItem('currentUser')).userrole.filter(x => x.name == 'EventManagement')).length != 0) {
          self.showTaskDetailModel(self.eventsOrignal.find(x => x.id == event.id))
        }
        else {
          self.showTaskDetailModelView(self.eventsOrignal.find(x => x.id == event.id))

        }
      },

      dayClick(date, jsEvent) {

        self.showTaskDetailModel(date.format('MM/DD/YYYY'))


      },

      eventSources: [{
        events: (start, end, timezone, callback) => {
          $('.fc-today ').removeClass('fc-widget-content');
          console.log('Event Click : ' + start.toDate());
          var events = [];
          events = self.eventData;
          //  console.log(events);
          callback(events)
        }
      }],
      eventMouseover: function (calEvent, jsEvent, view) {
        var tooltip = `
                        <div class="tooltipevent"
                        style="
                        padding:5px;
                        color:#fff;
                        width:300px;
                        height:auto;
                        
                        border-radius: 5px;
                        position:absolute;z-index:10001;">
                        <table class="table table-info table-bordered">
                            <tr class="text-center">
                               
                                <td colspan=2> ${calEvent.title}</td>
                            </tr>
                           
                       
                            <tr>
                               <td><i class="fa fa-info"></i> organizer  :</td>
                               <td colspan=1>  ${calEvent.organizer}</td>
                           </tr>
                           <tr>
                           <td><i class="fa fa-map-marker
                           
                           +"></i> venue  :</td>
                           <td colspan=1>  ${calEvent.venue}</td>
                       </tr>
                       <tr>
                       <td><i class="fa fa-info"></i> Description  :</td>
                       <td colspan=1>  ${calEvent.description}</td>
                   </tr>
                           <tr>
                               <td><i class="fa fa-clock-o"></i> Start time :</td>
                               <td colspan=1> ${moment(calEvent.start).format("YYYY-MM-DD HH:mm")}</td>
                           </tr>
                     
                       <tr>
                       <td><i class="fa fa-users"></i> Participant :</td>
                       <td colspan=1> ${calEvent.eventParticipant}</td>
                     

                   </tr>
                   <tr>
                   <td><i class="fa fa-users"></i> External Participant :</td>
                   <td colspan=1> ${calEvent.externalParticipant}</td>
                 

               </tr>
                                             
                    </table> 
                         </div> 
                        `;
        var $tooltip = $(tooltip).appendTo('body');
        $(this).mouseover(function (e) {
          $(this).css('z-index', 10000);
          $tooltip.fadeIn('500');
          $tooltip.fadeTo(10, 1.9);
        }).mousemove(function (e) {
          $tooltip.css('top', e.pageY + 10);
          $tooltip.css('left', e.pageX + 20);
        });
      },
      eventRender: function (calEvent, element) {
        debugger
        if (calEvent.recordStatus == true) {
          debugger
          element.css('background-color', 'green',);

        }
        if (calEvent.recordStatus == false) {
          debugger
          element.css('background-color', 'yellow');
          element.css('color', 'black');

        }

        if (calEvent.meetingStatus == "Postponed") {
          debugger
          element.css('background-color', 'silver');
          element.css('color', 'black');

        }
        if (calEvent.meetingStatus == "Cancelled") {
          debugger
          element.css('background-color', 'black');
          element.css('color', 'white');

        }
        if (calEvent.meetingStatus == "Rescheduled") {
          debugger
          element.css('background-color', 'yellow');
          element.css('color', 'black');

        }

        debugger
      },
      eventMouseout: function (calEvent, jsEvent) {
        $(this).css('z-index', 8);
        $('.tooltipevent').remove();
      },
    };

    $('.fc-next-button ,  .fc-prev-button , .fc-today-button').click(function () {
      var date = $('#full-calendar').fullCalendar('getDate');
      self.eventData = [];
      self.FilterEvent();
    })

  }


  ngOnInit(): void {


    this.canBeDeleted = this.registerService.canDelete
    this.GetScheduleList(this.text);

    //this.DeletedFilterEvent();
  }
  onPageChange(number: number) {

    this.config.currentPage = number;
  }

  onPageBoundsCorrection(number: number) {

    this.config.currentPage = number;
  }
  GetScheduleList(x) {
    if (x?.target?.value != '') {
      this.text = x?.target?.value
      this.text = this.text == null ? '' : this.text
    }


    this.subs.add(
      this.registerService.GetPreviousScheduleList(state,this.text).subscribe(
        (data) => {
          this.ScheduleList = data.result;
          this.text='';
          return data;
        },
        (error) => {
          alert(error);
        }
      )
    );
  }
  showSchedule(data) {
    debugger
    let ngbModalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false,
      size: 'lg'
    };



    // this.GetScheduleWithParticepants(data.id);


    this.registerService.GetScheduleWithParticepants(data.id).subscribe(
      (res: any) => {
        debugger

        this.ScheduleDto = res.data;
        const modalRef = this.modalService.open(ViewScheduleDetailsComponent, ngbModalOptions)
        modalRef.componentInstance.EventObj = this.ScheduleDto;
        console.log("ScheduleDetail", this.ScheduleDto)
        debugger
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

  GetScheduleWithParticepants(id: any) {

    this.subs.add(

      this.registerService.GetScheduleWithParticepants(id).subscribe(
        (data: any) => {


          this.ScheduleDto = data.data;




          console.log("ScheduleDetail", this.ScheduleDto)
          return data;
        },
        (error) => {
          alert(error);
        }
      )
    );

  }

  showAddTrainee(data) {
    let ngbModalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false,
      size: 'lg'
    };

    const modalRef = this.modalService.open(AddTraineeComponent, ngbModalOptions);


    modalRef.componentInstance.EventObj = data;
    modalRef.componentInstance.title = "Add Trainer";

    modalRef.componentInstance.clickevent.subscribe(($e) => {
      //this.FilterEvent();
      window.location.reload();
    })
  }
  showAddTrainer(data) {
    let ngbModalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false,
      size: 'lg'
    };

    const modalRef = this.modalService.open(AddTrainerComponent, ngbModalOptions);


    modalRef.componentInstance.EventObj = data;
    modalRef.componentInstance.title = "Add Training";

    modalRef.componentInstance.clickevent.subscribe(($e) => {
      //this.FilterEvent();
      window.location.reload();
    })
  }
  showTaskDetailModel(data) {
    let ngbModalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false,
      size: 'lg'
    };
    debugger
    const modalRef = this.modalService.open(AddEventComponent, ngbModalOptions)

    modalRef.componentInstance.EventObj = data;
    modalRef.componentInstance.title = "Add Meeting";

    modalRef.componentInstance.clickevent.subscribe(($e) => {
      this.FilterEvent();
      window.location.reload();
    })
  }
  //   showAddExternalModel(data){
  //     let ngbModalOptions: NgbModalOptions = {
  //       backdrop : 'static',
  //       keyboard : false,
  //       size: 'lg'
  // };
  //     debugger
  //     const modalRef = this.modalService.open(ExternalParticipantComponent, ngbModalOptions)

  //     modalRef.componentInstance.EventObj = data;
  //     modalRef.componentInstance.title = "Add Meeting";

  //     modalRef.componentInstance.clickevent.subscribe(($e) => {
  //       this.FilterEvent();
  //       window.location.reload();
  //     })
  //   }
  showAddExternalModel(data) {
    let ngbModalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false,
      size: 'lg'
    };
    debugger
    const modalRef = this.modalService.open(ExternalParticepantDropDownComponent, ngbModalOptions)

    modalRef.componentInstance.EventObj = data;
    modalRef.componentInstance.title = "Add Meeting";

    modalRef.componentInstance.clickevent.subscribe(($e) => {

      window.location.reload();
    })
  }
  AddExistingTrainingModel(data, isEdit) {
    let ngbModalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false,
      size: 'lg'
    };
    debugger


    if (data?.id == null) {
      const modalRef = this.modalService.open(AddExistingTrainingComponent, ngbModalOptions)
      modalRef.componentInstance.title = "View Training";
      if (!isEdit) {
        modalRef.componentInstance._ScheduleList = this.ScheduleList;
      }

      modalRef.componentInstance.passData.subscribe((data) => {
        this.FilterEvent();
        this.ScheduleList = data
        window.location.reload();
      })
    }
    else {

      this.registerService.GetScheduleWithParticepants(data?.id).subscribe(
        (res: any) => {
          debugger

          const modalRef = this.modalService.open(AddExistingTrainingComponent, ngbModalOptions)
          this.ScheduleDto = res.data;
          modalRef.componentInstance.EventObj = this.ScheduleDto;
          // modalRef.componentInstance._ScheduleList = this.ScheduleList;
          if (!isEdit) {
            modalRef.componentInstance._ScheduleList = this.ScheduleList;
          }    
          console.log("ScheduleDetail", this.ScheduleDto)
          debugger
          modalRef.componentInstance.title = "View Training";

          modalRef.componentInstance.passData.subscribe((data) => {
            this.FilterEvent();
            this.ScheduleList = data
            window.location.reload();
          })



          return data;
        },
        (error) => {
          alert(error);
        }
      )
    }

    // modalRef.componentInstance.EventObj = data;
    // modalRef.componentInstance.title = "Add Meeting";


  }

  
  showScheduleModel(data) {
    debugger
    const modalRef = this.modalService.open(AddTrainingScheduleComponent, { size: 'lg' })
    modalRef.componentInstance.EventObj = data;
    modalRef.componentInstance.title = "Add Training";

    modalRef.componentInstance.clickevent.subscribe(($e) => {
      this.FilterEvent();
      window.location.reload();
    })
  }
  NonDigitizedTrainingData() {

    this.router.navigate(['NonDigitizedTrainingData'])
  }

  showTaskDetailModelView(data) {
    debugger
    const modalRef = this.modalService.open(ViewEventComponent, { size: 'lg' })
    modalRef.componentInstance.EventObj = data;
    modalRef.componentInstance.title = "View Meeting";

    modalRef.componentInstance.clickevent.subscribe(($e) => {
      this.FilterEvent();
      window.location.reload();
    })
  }
  showTaskDetailModelList(data) {
    const modalRef = this.modalService.open(AddEventComponent, { size: 'lg' })
    modalRef.componentInstance.EventObj = data;
    modalRef.componentInstance.title = "Add Meeting";

    modalRef.componentInstance.clickevent.subscribe(($e) => {
      this.FilterEvent();
      window.location.reload();
    })

  }
  showTaskDetailModelListView(data) {

    let ngbModalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false,
      size: 'lg'
    };
    debugger
    const modalRef = this.modalService.open(ViewEventComponent, ngbModalOptions)
    modalRef.componentInstance.EventObj = data;
    debugger
    modalRef.componentInstance.title = "View Training";

    modalRef.componentInstance.clickevent.subscribe(($e) => {
      this.FilterEvent();
      window.location.reload();
    })

  }
  FilterEvent() {

    debugger;
    //var date = $("#full-calendar").fullCalendar('getDate');
    // var startDate = $('#full-calendar').fullCalendar('getView').intervalStart.format('MM/DD/YYYY');
    //var endDate = $('#full-calendar').fullCalendar('getView').intervalEnd.format('MM/DD/YYYY');

    //this.FilterDTO.startDate =startDate;// date.startOf("month").format("d/MM/yyyy");
    //this.FilterDTO.endDate =endDate;// date.endOf("month").format("d/MM/yyyy");
    this.subs.add(
      this.registerService.getPreviousTraining().subscribe(

        (data) => {
          debugger


          this.eventData = data.result;


        },
        (error) => {
          alert(error);
        }
      )
    );
  }



  DeletedFilterEvent(value) {

    this.FilterDTO.recordStatus = value;
    this.FilterEvent()

  }


  AddMeetingOrganizer() {

    const modalRef = this.modalService.open(AddMeetingOrganizerComponent, { size: 'lg' });

    modalRef.result.then((data) => {
      debugger
      //this.FilterEvent()

      //this.activeModal.close()
    }, (reason) => {
      // on dismiss
    });
  }


  AddMeetingVenue() {

    const modalRef = this.modalService.open(AddMeetingVenueComponent, { size: 'lg' });

    modalRef.result.then((data) => {
      debugger
      //this.FilterEvent()

      //this.activeModal.close()
    }, (reason) => {
      // on dismiss
    });
  }


  onDelete(id: any) {
    debugger
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {

        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false,
    })

    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: false,
      showCancelButton: true,

    }).then((result) => {

      if (result.value) {

        this.subs.add(this.registerService.deleteTraining(id).subscribe(
          (data) => {
            debugger



            if (!data.isException) {
              swalWithBootstrapButtons.fire(
                'Deleted!',
                data.message,
                'success',

              )


              this.GetScheduleList(this.text)
            } else {
              swalWithBootstrapButtons.fire(
                'Not Deleted!',
                data.message,
                'error',

              )
            }

          }
        ))

      } else if (
        // Read more about handling dismissals
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Record is Safe :)',
          'error'
        )
      }
    })
  }



  public openFile() {
    window.open("assets/PDF/Training Management Section - PAST AND NEW.pdf");
  }





  public editTraining(data: object) {
    this.AddExistingTrainingModel(data,true);
  }



  // showPDF(){
  //   debugger
  //   // window.open('src/assets/images/avtar/11.jpg', '_blank'); 
  //   this.registerService.downloadPDF('src\\assets\\images\\avtar\\11.jpg').subscribe((res:any)=>{
  //     debugger
  //     const fileURL = URL.createObjectURL(res);
  //     window.open(fileURL, '_blank');
  //   })
  // }
}

