import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavService } from '../../../../src/app/shared/services/nav.service';

@Component({
  selector: 'app-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.scss']
})
export class MainDashboardComponent implements OnInit {
  public userRoles: any;
  constructor(
    private readonly router: Router, public navServices: NavService,
  ) { }

  ngOnInit(): void {

    this.userRoles = this.navServices.userRoles;

  }

  public onAdminWing(): void {
    console.log('onAdminWing')
    const adminWingData: { title: string, image: string, width: number, height?: number }[] = [
      // {
      //   title: 'PUC Pendency Status',
      //   image: 'assets/images/main-dashboard/puc_pendency_status.png',
      //   width: 180,
      //   height: 130
      // },
      {
        title: 'Vacancy Status of (P&SHD)',
        image: 'assets/images/main-dashboard/vacancy_status.png',
        width: 100,
        height: 130
      },
      {
        title: 'Vacancy Status of Admn Wing',
        image: 'assets/images/main-dashboard/vacancy_status.png',
        width: 100,
        height: 130
      },
      {
        title: 'Vacancy Position of Administrative Post',
        image: 'assets/images/main-dashboard/Group 83.png',
        width: 100,
        height: 110
      },
      // {
      //   title: 'Provincial Vacancy Position',
      //   image: 'assets/images/main-dashboard/provisional_vacancy_position.png',
      //   width: 100,
      //   height: 120
      // },
      {
        title: 'Employees On Leave',
        image: 'assets/images/main-dashboard/employee_on_leave.png',
        width: 60,
        height: 130
      },
      {
        title: 'Awaiting Posting',
        image: 'assets/images/main-dashboard/awaiting_posting.png',
        width: 180,
        height: 130
      },
      // {
      //   title: 'Leaves Expired',
      //   image: 'assets/images/main-dashboard/employee_leave_expired.png',
      //   width: 100,
      //   height: 130
      // }
    ]
    this.router.navigate(['sub-level'], {
      state: { adminWingData },
      queryParams: {
        from: 'Admn Wing'
      }
    })
  }

  public onDGKhan(): void {
    console.log('onDGKhan')
    const adminWingData: { title: string, image: string, width: number, height?: number }[] = [
      {
        title: 'PUC Pendency Status',
        image: 'assets/images/main-dashboard/puc_pendency_status.png',
        width: 180,
        height: 130
      },
      {
        title: 'Vacancy Position of Administrative Post',
        image: 'assets/images/main-dashboard/Group 83.png',
        width: 100,
        height: 110
      },
      {
        title: 'Employees On Leave',
        image: 'assets/images/main-dashboard/employee_on_leave.png',
        width: 60,
        height: 130
      },
      {
        title: 'Awaiting Posting',
        image: 'assets/images/main-dashboard/awaiting_posting.png',
        width: 180,
        height: 130
      },
      {
        title: 'Leaves Expired',
        image: 'assets/images/main-dashboard/employee_leave_expired.png',
        width: 100,
        height: 130
      },
      {
        title: ' Vertical Programs',
        image: 'assets/images/dashboard-main-cards-transparent/vertical_program.png',
        width: 130,
        height: 120
      },
      {
        title: 'Procurement',
        image: 'assets/images/main-dashboard/procurement.png',
        width: 120,
        height: 120
      },
      {
        title: 'Recruitment',
        image: 'assets/images/main-dashboard/Group.png',
        width: 120,
        height: 120
      },
    ]
    this.router.navigate(['sub-level'], {
      state: { adminWingData },
      queryParams: {
        from: 'DG Khan'
      }
    })
  }


  public onDrugControl(): void {
    console.log('onDrugControl');

    const adminWingData: { title: string, image: string, width: number, height?: number }[] = [

      {
        title: 'Vacancy Status Drug Control',
        image: 'assets/images/main-dashboard/vacancy_status.png',
        width: 100,
        height: 130
      },
      {
        title: 'CDSL',
        image: 'assets/images/main-dashboard/health_counsil.png',
        width: 130,
        height: 130
      },

      {
        title: 'DTL',
        image: 'assets/images/main-dashboard/aids_lab_daily.png',
        width: 100,
        height: 130
      },

      {
        title: 'Medicine Trace & Track',
        image: 'assets/images/main-dashboard/daily_situation_report.png',
        width: 130,
        height: 120
      },
      {
        title: 'MSS',
        image: 'assets/images/main-dashboard/district_officer_health_MIS.png',
        width: 120,
        height: 130
      },
      {
        title: ' Procurement',
        image: 'assets/images/main-dashboard/procurement.png',
        width: 120,
        height: 120
      },
      {
        title: 'Recruitment',
        image: 'assets/images/main-dashboard/Group.png',
        width: 130,
        height: 120
      },


    ]

    this.router.navigate(['sub-level'], {
      state: { adminWingData },
      queryParams: {
        from: 'Drug Control'
      }
    })
  }

  public onDevelopmentWing(): void {
    const verticalProgramsData: { title: string, image: string, width: number, height: number }[] = [
      {
        title: 'Vacancy Status Development',
        image: 'assets/images/main-dashboard/vacancy_status.png',
        width: 120,
        height: 130
      },
      {
        title: 'Procurements',
        image: 'assets/images/main-dashboard/vertical_program.png',
        width: 120,
        height: 130
      },
      {
        title: 'ADP Scheme',
        image: 'assets/images/main-dashboard/ADP_scheme.png',
        width: 120,
        height: 130
      },
      {
        title: 'Health Council',
        image: 'assets/images/main-dashboard/health_counsil.png',
        width: 120,
        height: 130
      },


    ]
    this.router.navigate(['sub-level'], {
      state: { adminWingData: verticalProgramsData },
      queryParams: {
        from: 'Development Wing'
      }
    })
  }

  public onVerticalPrograms(): void {
    const verticalProgramsData: { title: string, image: string, width: number, height: number }[] = [

      {
        title: 'Hepatitis Control Program',
        image: 'assets/images/dashboard-main-cards-transparent/hepatitis.png',
        width: 100,
        height: 130
      },
      {
        title: 'Punjab AIDS Control Program',
        image: 'assets/images/dashboard-main-cards-transparent/aids.png',
        width: 100,
        height: 130
      },
      {
        title: 'Prevention and Control of Non Communicable Diseases',
        image: 'assets/images/dashboard-main-cards-transparent/NCD.png',
        width: 100,
        height: 110
      },
      {
        title: 'IRMNCH',
        image: 'assets/images/dashboard-main-cards-transparent/IRMNCH.png',
        width: 100,
        height: 130
      },
      // {
      //   title: 'EPI',
      //   image: 'assets/images/main-dashboard/patients.png',
      //   width: 130,
      //   height: 130
      // },
      {
        title: 'TB Control Program',
        image: 'assets/images/dashboard-main-cards-transparent/tb.png',
        width: 100,
        height: 130
      },
    ]
    this.router.navigate(['sub-level'], {
      state: { adminWingData: verticalProgramsData },
      queryParams: {
        from: 'Vertical Programs'
      }
    })
  }

  onTask(){
    this.router.navigate(['taskDashboard'])
  }

  SharedFolder(){
    this.router.navigate(['sharedFolder'])
  }

  Summaries(){
    this.router.navigate(['summaries'])
    
  }
  MyCalender(){
    this.router.navigate(['calender'])
    
  }
  OnMeetingClick(){
    this.router.navigate(['Training'])
    
  }
  OnContactClick(){
    this.router.navigate(['ContactList'])
    
  }
  OnDailyEngagementClick(){
    this.router.navigate(['DailyEngagementsList'])
    
  }
  OnScheduleClick(){
    this.router.navigate(['Schedule'])
    
  }
  OnAttendanceClick(){
    this.router.navigate(['Attendance'])
    
  }
  
  OnParticipantClick(){
    this.router.navigate(['participant'])
    
  }
  OnReportsClick(){
    this.router.navigate(['Reports'])
    
  }
  onDHIS(){
    this.router.navigate(['DHIS'])
  }
  onTOSAN(){
    this.router.navigate(['TrackingofSummariesAndNotes'])
  }
  Reporting(){
    const adminWingData: { title: string, image: string, width: number, height?: number }[] = [
      {
        title: 'PUC Pendency Status',
        image: 'assets/images/main-dashboard/puc_pendency_status.png',
        width: 180,
        height: 130
      },
      {
        title: 'Provincial Vacancy Position',
        image: 'assets/images/main-dashboard/provisional_vacancy_position.png',
        width: 100,
        height: 120
      }
    
    ]
    this.router.navigate(['sub-level'], {
      state: { adminWingData },
      queryParams: {
        from: 'Admn Wing'
      }
    })
  }
  OnConferenceClick(){
    this.router.navigate(['ViewConference'])
  }
}
