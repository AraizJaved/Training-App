import { Component, OnInit } from '@angular/core';
import $ from 'jquery';
import moment from 'moment';
import 'fullcalendar';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { AddFileFolderComponent } from 'src/app/SharedFolder/add-file-folder/add-file-folder.component';
import { AddEventComponent } from '../add-event/add-event.component';
import { AddTrainingScheduleComponent } from 'src/app/Schedule/add-training-schedule/add-training-schedule.component'
import { Subscription } from 'rxjs';
import { RegisterService } from 'src/app/shared/services/RegisterService/RegisterService';
import { FilterDTO } from 'src/app/EventCalender/FilterDTO';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ViewEventComponent } from '../view-event/view-event.component';
import { AddMeetingOrganizerComponent } from '../add-meeting-organizer/add-meeting-organizer.component';
import { AddMeetingVenueComponent } from '../add-meeting-venue/add-meeting-venue.component';
import { PaginationInstance } from 'ngx-pagination';
import { AddExistingTrainingComponent } from '../add-existing-training/add-existing-training.component';
import { Router } from '@angular/router';
import { log } from 'fullcalendar';
declare var require
const Swal = require('sweetalert2')
@Component({
  selector: 'app-event-calender-view',
  templateUrl: './event-calender-view.component.html',
  styleUrls: ['./event-calender-view.component.scss']
})
export class EventCalenderViewComponent implements OnInit {

  private subs = new Subscription();

  defaultConfigurations: any;
  isEventManagement: boolean
  isMeetingManagement: boolean
  isMeetingManagementView: boolean
  isMeetingManagementAdd: boolean
  isMeetingManagementDelete: boolean
  canDelete:boolean
  isEdit: boolean = false
  text = '';
  isAdmin: boolean
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
  constructor(
    private modalService: NgbModal,
    private readonly registerService: RegisterService,
    private formBuilder: FormBuilder,
    private readonly router: Router
  ) {

    this.FilterDTO.recordStatus = true;

    let self = this;
    console.log("This: ",self);
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
          self.showTaskDetailModel(self.eventsOrignal.find(x => x.id == event.id),false)
        }
        else {
          self.showTaskDetailModelView(self.eventsOrignal.find(x => x.id == event.id))

        }
      },

      dayClick(date, jsEvent) {

        self.showTaskDetailModel(date.format('MM/DD/YYYY'),false)


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
      self.FilterEvent(self.text);
    })

  }


  ngOnInit(): void {
    debugger

    this.FilterForm = this.formBuilder.group({
      EventType: ["", Validators.required],
    });

    const canBeDeleted = JSON.parse(localStorage.getItem('currentUser')).user
    if(canBeDeleted.canDelete== 1)
      this.canDelete =true;
    else false;
    

    this.isEventManagement = true
    var a = JSON.parse(localStorage.getItem('currentUser')).userrole.filter(x => x.name == 'EventManagement');
    if (a.length == '0') {
      this.isEventManagement = false
    }
    this.isAdmin = true
    var a = JSON.parse(localStorage.getItem('currentUser')).userrole.filter(x => x.name == 'Admin');
    if (a.length == '0') {
      this.isAdmin = false
    }
    this.isMeetingManagementView = true
    var a = JSON.parse(localStorage.getItem('currentUser')).userrole.filter(x => x.name == 'MeetingManagementView');
    if (a.length == '0') {
      this.isMeetingManagementView = false
    }

    this.isMeetingManagementAdd = true
    var a = JSON.parse(localStorage.getItem('currentUser')).userrole.filter(x => x.name == 'MeetingManagementAdd');
    if (a.length == '0') {
      this.isMeetingManagementAdd = false
    }
    this.isMeetingManagementDelete = true
    var a = JSON.parse(localStorage.getItem('currentUser')).userrole.filter(x => x.name == 'MeetingManagementDelete');
    if (a.length == '0') {
      this.isMeetingManagementDelete = false
    }
    $('#full-calendar').fullCalendar(
      this.defaultConfigurations
    );
    $('#deleted-full-calendar').fullCalendar(
      this.defaultConfigurations
    );
    this.FilterEvent(this.text);

    //this.DeletedFilterEvent();
  }
  onPageChange(number: number) {

    this.config.currentPage = number;
  }

  onPageBoundsCorrection(number: number) {

    this.config.currentPage = number;
  }


  showTaskDetailModel(data,isEdit) {
    let ngbModalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false,
      size: 'lg'
    };
    debugger
    const modalRef = this.modalService.open(AddEventComponent, ngbModalOptions)

    modalRef.componentInstance.EventObj = data;
    if (!isEdit) {
      modalRef.componentInstance.eventData = this.eventData;
    }
    modalRef.componentInstance.title = "Add Meeting";

    modalRef.componentInstance.clickevent.subscribe(($e) => {
      this.FilterEvent(this.text);
      this.isEdit = false;
      window.location.reload();
    })
  }
  AddExistingTrainingModel(data) {
    let ngbModalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false,
      size: 'lg'
    };
    debugger
    const modalRef = this.modalService.open(AddExistingTrainingComponent, ngbModalOptions)

    modalRef.componentInstance.EventObj = data;
    modalRef.componentInstance.title = "Add Meeting";

    modalRef.componentInstance.clickevent.subscribe(($e) => {
      this.FilterEvent(this.text);
      window.location.reload();
    })
  }
  ExistingTrainingModel() {

    this.router.navigate(['PreviousTraining'])
  }




  showScheduleModel(data) {
    debugger
    const modalRef = this.modalService.open(AddTrainingScheduleComponent, { size: 'lg' })
    modalRef.componentInstance.EventObj = data;
    modalRef.componentInstance.title = "Add Training";

    modalRef.componentInstance.clickevent.subscribe(($e) => {
      this.FilterEvent(this.text);
      window.location.reload();
    })
  }

  showTaskDetailModelView(data) {
    debugger
    const modalRef = this.modalService.open(ViewEventComponent, { size: 'lg' })
    modalRef.componentInstance.EventObj = data;
    modalRef.componentInstance.title = "View Meeting";

    modalRef.componentInstance.clickevent.subscribe(($e) => {
      this.FilterEvent(this.text);
      window.location.reload();
    })
  }
  showTaskDetailModelList(data) {
    const modalRef = this.modalService.open(AddEventComponent, { size: 'lg' })
    modalRef.componentInstance.EventObj = data;
    modalRef.componentInstance.title = "Add Meeting";

    modalRef.componentInstance.clickevent.subscribe(($e) => {
      this.FilterEvent(this.text);
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
      this.FilterEvent(this.text);
      window.location.reload();
    })

  }
  FilterEvent(x) {
    debugger
    if (x?.target?.value != '') {
      this.text = x?.target?.value
      this.text = this.text == null ? '' : this.text
    }

    debugger;
    
    this.FilterDTO.meetingStatus =this.text;// date.endOf("month").format("d/MM/yyyy");
    this.subs.add(
      this.registerService.getFilteredEvent(this.FilterDTO).subscribe(

        (data) => {
          debugger
          console.log("getfilteredevent ", data);
          


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
    this.FilterEvent(this.text)

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

  public editTraining(trainingData: object) {
    this.showTaskDetailModel(trainingData,true);
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

        this.subs.add(this.registerService.deleteTrainingNewTraining(id).subscribe(
          (data) => {

            swalWithBootstrapButtons.fire(
              'Deleted!',
              data.message,
              'success',
              this.FilterEvent(this.text),

            )
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
    window.open("assets/PDF/Training Management System - Training Manual.pdf");
  }






}
