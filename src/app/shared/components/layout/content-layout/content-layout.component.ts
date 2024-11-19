import { Component, OnInit, AfterViewInit, HostListener } from '@angular/core';
import { trigger, transition, useAnimation } from '@angular/animations';
import { bounce, zoomOut, zoomIn, fadeIn, bounceIn } from 'ng-animate';
import { Menu, NavService } from '../../../services/nav.service';
import { CustomizerService } from '../../../services/customizer.service';
import * as feather from 'feather-icons';

@Component({
  selector: 'app-content-layout',
  templateUrl: './content-layout.component.html',
  styleUrls: ['./content-layout.component.scss'],
  animations: [
    trigger('animateRoute', [transition('* => *', useAnimation(fadeIn, {
      // Set the duration to 5seconds and delay to 2 seconds
      //params: { timing: 3}
    }))])
  ]
})
export class ContentLayoutComponent implements OnInit, AfterViewInit {


  public right_side_bar: boolean;

  constructor(public navServices: NavService,
    public customizer: CustomizerService) { }


  ngAfterViewInit() {
    setTimeout(() => {
      feather.replace();
    });
  }

  @HostListener('document:click', ['$event'])
  clickedOutside(event) {
    // click outside Area perform following action
    document.getElementById('outer-container').onclick = function (e) {
      e.stopPropagation()
      if (e.target != document.getElementById('search-outer')) {
        document.getElementsByTagName("body")[0].classList.remove("offcanvas");
      }
      if (e.target != document.getElementById('outer-container')) {
        // document.getElementById("canvas-bookmark").classList.remove("offcanvas-bookmark");
      }
      // if (e.target != document.getElementById('inner-customizer')) {
      //   document.getElementsByClassName("customizer-links")[0].classList.remove("open")
      //   document.getElementsByClassName("customizer-contain")[0].classList.remove("open")
      // }
    }
  }

  public getRouterOutletState(outlet) {
    return outlet.isActivated ? outlet.activatedRoute : '';
  }

  public rightSidebar($event) {
    this.right_side_bar = $event
  }

  ngOnInit() {

    debugger

    const user = JSON.parse(localStorage.getItem('currentUser'));
    let data = [
      {
        title: 'Dashboard', icon: 'home', type: 'sub', badgeType: 'primary', active: false, children: [
          // { path: '/map/google', title: 'Map View', type: 'link' },
          { path: 'CounterDashboard', title: 'Dashboard', type: 'link' },

        ]
      },
      {
        title: 'User Management', icon: 'settings', type: 'sub', badgeType: 'primary', active: false, children: [
          { path: '/register', title: 'Create User', type: 'link' },
          // { path: '/roles', title: 'Create Role', type: 'link' },
          { path: '/userList', title: 'Users List', type: 'link' },

        ]
      },
      {
        title: 'Master Data Management', icon: 'settings', type: 'sub', badgeType: 'primary', active: false, children: [
          { path: '/ManageTrainingCategory', title: 'Training category', type: 'link' },
          { path: '/ManageTrainingLevel', title: 'Training level', type: 'link' },
          { path: '/ManageTrainingType', title: 'Training type', type: 'link' },
          { path: '/ManageOrganizedBy', title: 'Organized by', type: 'link' },
          { path: '/ManageSupportedBy', title: 'Supported by', type: 'link' },
          { path: '/ManageVenue', title: 'Venue', type: 'link' },
          { path: '/ManageQualification', title: 'Qualification', type: 'link' },
          { path: '/ManageDocumentType', title: 'Manage Document Type', type: 'link' },
          { path: '/AddDesignation', title: 'Cadre/Designation', type: 'link' },

        ]
      },
      {
        title: 'Training Management', icon: 'list', type: 'link', badgeType: 'primary', active: false, path: 'Training'


      },
      {
        title: 'Schedule Management', icon: 'clock', type: 'link', badgeType: 'primary', active: false, path: 'Schedule'
      },
      {
        title: 'Participants Management', icon: 'settings', type: 'sub', badgeType: 'primary', active: false, children: [
          { path: '/SendEmail', title: 'Send Invitation', type: 'link' },
          { path: '/participant', title: 'Participant Training Score', type: 'link' },
          { path: '/Exparticipants', title: 'External/Other Participants', type: 'link' },
        ]
      },


      {
        title: 'Attendance Management', icon: 'list', type: 'link', badgeType: 'primary', active: false, path: 'Attendance'
      },
      {
        title: 'Reports Management', icon: 'book', type: 'link', badgeType: 'primary', active: false, path: 'Reports'
      },

      {
        title: 'Training Material', icon: 'book', type: 'link', badgeType: 'primary', active: false, path: 'DocumentManagementSystem'
      },
      {
        title: 'Calendar', icon: 'list', type: 'link', badgeType: 'primary', active: false, path: 'taskDashboard'


      },

      {
        title: 'User Manual - TMS', icon: 'list', type: 'link', badgeType: 'primary', active: false, path: 'TrainingDocuments'


      },



    ]
    // this.navServices.items.next(this.navServices.MENUITEMS)

    if (user.name === 'Admin') {
      this.navServices.items.next(data)

      return
    } else {
      let tempMENUITEMS: Menu[] = [];
      user.userrole.forEach(ele => {
        // let data = this.navServices.MENUITEMS.find(x => x.title == ele.name)
        let _data = data.find(x => x.title == ele.name)
        tempMENUITEMS.push(_data);
      });
      tempMENUITEMS = tempMENUITEMS.filter(x => x != null)
      tempMENUITEMS.push({ title: 'Training Documents', icon: 'list', type: 'link', badgeType: 'primary', active: false, path: 'TrainingDocuments' })
      this.navServices.items.next(tempMENUITEMS)
      return
    }

    // this.navServices.MENUITEMS = []


    // if (this.navServices.userRoles.findIndex(u => u === 'UserManagement') !== -1) {
    //   this.navServices.MENUITEMS.push(
    //     {
    //       title: 'User Management', icon: 'settings', type: 'sub', badgeType: 'primary', active: false, children: [
    //         { path: '/register', title: 'Create User', type: 'link' },
    //         { path: '/roles', title: 'Create Role', type: 'link' },
    //         { path: '/userList', title: 'Users List', type: 'link' },

    //       ]
    //     },
    //   )
    // }

    // this.navServices.items.next(this.navServices.MENUITEMS)
  }

}
