import { Routes } from '@angular/router';
import { RoleComponent } from 'src/app/auth/role/role.component';
import { UserRoleAssignComponent } from 'src/app/auth/user-role-assign/user-role-assign.component';
import { FormsIndicatorComponent } from 'src/app/FormsIndicator/forms-indicator/forms-indicator.component';
import { FormsIndicatorListComponent } from 'src/app/FormsIndicator/forms-indicator-list/forms-indicator-list.component';
import { RegisterComponent } from 'src/app/auth/register/register.component';
import { UserListComponent } from 'src/app/auth/userList/user-list/user-list.component';
import { AssignDistrictComponent } from 'src/app/auth/assign-district/assign-district/assign-district.component';
import { IndicatordetailsComponent } from 'src/app/FormsIndicator/IndicatorDetails/indicatordetails/indicatordetails.component';
import { DetailedDashboardComponent } from 'src/app/DetailedDashboard/detailed-dashboard/detailed-dashboard.component';
import { RegistrationComplianceComponent } from 'src/app/DetailedDashboard/registration-compliance/registration-compliance/registration-compliance.component';
import { ReportingComponent } from 'src/app/Reporting/reporting/reporting.component';
import { DevelopmentDashboardComponent } from 'src/app/Development/development-dashboard/development-dashboard.component';
import { VerticalProgramsComponent } from 'src/app/VerticalPrograms/vertical-programs/vertical-programs.component';
import { MainDashboardComponent } from 'src/app/MainDashboard/main-dashboard/main-dashboard.component';
import { MainCardChildComponent } from 'src/app/components/main-card-child/main-card-child.component';
import { VacancyStatusAdminPostComponent } from 'src/app/components/vacancy-status-admin-post/vacancy-status-admin-post.component';
import { PUCPendencyStatusComponent } from 'src/app/AdminWing/puc-pendency-status/puc-pendency-status.component';
import { AdminWingVacancyStatusComponent } from 'src/app/AdminWing/admin-wing-vacancy-status/admin-wing-vacancy-status.component';
import { AdminWingVacantReportComponent } from 'src/app/AdminWing/admin-wing-vacant-report/admin-wing-vacant-report.component';
import { AdminWingEmployeesLeaveComponent } from 'src/app/AdminWing/admin-wing-employees-leave/admin-wing-employees-leave.component';
import { AdminWingEmployeesLeaveDetailsComponent } from 'src/app/AdminWing/admin-wing-employees-leave-details/admin-wing-employees-leave-details.component';
import { AdminWingAwaitingPostingComponent } from 'src/app/AdminWing/admin-wing-awaiting-posting/admin-wing-awaiting-posting.component';
import { AdminWingAwaitingPostingDetailsComponent } from 'src/app/AdminWing/admin-wing-awaiting-posting-details/admin-wing-awaiting-posting-details.component';
import { VerticalProgramGenericComponent } from 'src/app/VerticalPrograms/vertical-program-generic/vertical-program-generic.component';
import { DevelopmentWingGenericComponent } from 'src/app/Development/development-wing-generic/development-wing-generic.component';
import { CreateTaskComponent } from 'src/app/Task/create-task/create-task.component';
import { TaskListComponent } from 'src/app/Task/task-list/task-list.component';
import { LeavesExpiredComponent } from 'src/app/AdminWing/leaves-expired/leaves-expired.component';
import { HealthCouncilComponent } from 'src/app/Development/health-council/health-council.component';
import { AdminDeptVacancyStatusComponent } from 'src/app/AdminWing/admin-dept-vacancy-status/admin-dept-vacancy-status.component';
import { LeavesExpiredDetailsComponent } from 'src/app/AdminWing/leaves-expired-details/leaves-expired-details.component';
import { DrugControlCountsComponent } from 'src/app/DrugControl/drug-control-counts/drug-control-counts.component';
import { AdpSchemesComponent } from '../../Development/adp-schemes/adp-schemes.component';
import { MedicineTraceandTrackComponent } from 'src/app/DrugControl/medicine-traceand-track/medicine-traceand-track.component';
import { VacancyStatusDevelopmentComponent } from 'src/app/Development/vacancy-status-development/vacancy-status-development.component';
import { VacancyStatusDrugControlComponent } from 'src/app/DrugControl/vacancy-status-drug-control/vacancy-status-drug-control.component';
import { HepatitisProcurementComponent } from 'src/app/VerticalPrograms/hepatitis-procurement/hepatitis-procurement.component';
import { AidsProcurementComponent } from 'src/app/VerticalPrograms/aids-procurement/aids-procurement.component';
import { NcdProcurementComponent } from 'src/app/VerticalPrograms/ncd-procurement/ncd-procurement.component';
import { IrmnchProcurementComponent } from 'src/app/VerticalPrograms/irmnch-procurement/irmnch-procurement.component';
import { TbProcurementComponent } from 'src/app/VerticalPrograms/tb-procurement/tb-procurement.component';
import { CDSLDataComponent } from 'src/app/DrugControl/cdsldata/cdsldata.component';
import { ProcurementDetailComponent } from 'src/app/Development/procurement-detail/procurement-detail.component';
import { DrugControlProcurementComponent } from 'src/app/DrugControl/drug-control-procurement/drug-control-procurement.component';
import { TaskDetailComponent } from 'src/app/Task/task-detail/task-detail.component';
import { BacklogComponent } from 'src/app/Task/TaskList/backlog/backlog.component';
import { ToDoComponent } from 'src/app/Task/TaskList/to-do/to-do.component';
import { InProcessComponent } from 'src/app/Task/TaskList/in-process/in-process.component';
import { CompletedComponent } from 'src/app/Task/TaskList/completed/completed.component';
import { TaskDashboardComponent } from 'src/app/Task/task-dashboard/task-dashboard.component';
import { SharedFolderDashboardComponent } from 'src/app/SharedFolder/shared-folder-dashboard/shared-folder-dashboard.component';
import { AddFileFolderComponent } from 'src/app/SharedFolder/add-file-folder/add-file-folder.component';
import { SummariesComponent } from 'src/app/Summaries/summaries/summaries.component';
import { EventCalenderViewComponent } from 'src/app/EventCalender/event-calender-view/event-calender-view.component';
import { AddEventComponent } from 'src/app/EventCalender/add-event/add-event.component';
import { ChangePasswordComponent } from 'src/app/auth/change-password/change-password.component';
import { ViewEventComponent } from 'src/app/EventCalender/view-event/view-event.component';
import { DHISComponent } from 'src/app/dhis/dhis.component';
import { TrackingofSummariesAndNotesComponent } from 'src/app/trackingof-summaries-and-notes/trackingof-summaries-and-notes.component';
import { AdminWingChartsComponent } from 'src/app/AdminWing/admin-wing-charts/admin-wing-charts.component';
import { ContactListViewComponent } from 'src/app/Contacts/contact-list-view/contact-list-view.component';
import { AddContactComponent } from 'src/app/Contacts/add-contact/add-contact.component';
import { DailyEngagementsViewComponent } from 'src/app/DailyEngagements/daily-engagements-view/daily-engagements-view.component';
import { CreateDailyEngagementsComponent } from 'src/app/DailyEngagements/create-daily-engagements/create-daily-engagements.component';
import { PublicEngagementListComponent } from 'src/app/DailyEngagements/public-engagement-list/public-engagement-list.component';
import { AddContactTypeComponent } from 'src/app/Contacts/add-contact-type/add-contact-type.component';
import { AddMeetingOrganizerComponent } from 'src/app/EventCalender/add-meeting-organizer/add-meeting-organizer.component';
import { AddMeetingVenueComponent } from 'src/app/EventCalender/add-meeting-venue/add-meeting-venue.component';
import { UpdateMeetingComponent } from 'src/app/EventCalender/update-meeting/update-meeting.component';
import { UpdateContactComponent } from 'src/app/Contacts/update-contact/update-contact.component';

import { UpdateDailyEngagementsComponent } from 'src/app/DailyEngagements/update-daily-engagements/update-daily-engagements.component';
import { ScheduleListComponent } from 'src/app/Schedule/schedule-list/schedule-list.component';
import { ParticipantsListComponent } from 'src/app/Participants/participants-list/participants-list.component';
import { TrainingReportsComponent } from 'src/app/Reports/training-reports/training-reports.component';
import { ParticepantRegisterComponent } from 'src/app/auth/particepant-register/particepant-register.component';
import { ParticepantScheduleListComponent } from 'src/app/Participants/particepant-schedule-list/particepant-schedule-list.component';
import { AttendanceComponent } from 'src/app/Participants/attendance/attendance.component';
import { PreviousTrainingComponent } from 'src/app/EventCalender/previous-training/previous-training.component';
import { CounterDashboardReportComponent } from 'src/app/counter-dashboard-report/counter-dashboard-report.component';
import { DocumentManagementSystemComponent } from 'src/app/document-management-system/document-management-system.component';
import { ExparticipantsComponent } from 'src/app/Participants/exparticipants/exparticipants.component';
import { NonDigitizedTrainingDataComponent } from 'src/app/document-management-system/non-digitized-training-data/non-digitized-training-data.component';
import { SendEmailComponent } from 'src/app/Participants/send-email/send-email.component';
import { ManageTrainingCategoryComponent } from 'src/app/MasterDataManagement/manage-training-category/manage-training-category.component';
import { ManageTrainingTypeComponent } from 'src/app/MasterDataManagement/manage-training-type/manage-training-type.component';
import { ManageTraininglevelComponent } from 'src/app/MasterDataManagement/manage-traininglevel/manage-traininglevel.component';
import { ManageOrganizedByComponent } from 'src/app/MasterDataManagement/manage-organized-by/manage-organized-by.component';
import { ManageSupportedByComponent } from 'src/app/MasterDataManagement/manage-supported-by/manage-supported-by.component';
import { VenueComponent } from 'src/app/MasterDataManagement/venue/venue.component';
import { QualificationComponent } from 'src/app/MasterDataManagement/qualification/qualification.component';
import { ManageDocumentTypeComponent } from 'src/app/MasterDataManagement/manage-document-type/manage-document-type.component';
import { ScheduleCompleteDetailsComponent } from 'src/app/Schedule/schedule-complete-details/schedule-complete-details.component';
import { TrainingDocumentsComponent } from 'src/app/training-documents/training-documents.component';
import { AddCadreComponent } from 'src/app/MasterDataManagement/add-cadre/add-cadre.component';
export const content: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('../../components/dashboard/dashboard.module').then(m => m.DashboardModule),
    data: {
      breadcrumb: "Dashboard"
    }
  },
  {
    path: '',
    redirectTo: 'CounterDashboard',
    pathMatch: 'full'
  },
  {
    path: 'vacancy-status-adminstrative-post-list',
    component: VacancyStatusAdminPostComponent
  },
  
  {
    path: 'notification',
    component: Notification
  },
  {
  path: 'changePassword',
  component: ChangePasswordComponent

  },
  {
    path: 'addFileFolder',
    component: AddFileFolderComponent
  },
  {
    path: 'roles',
    component: RoleComponent
  },
  {
    path: 'sharedFolder',
    component: SharedFolderDashboardComponent
  },
  {
    path: 'Training',
    component: EventCalenderViewComponent
  },
  {
    path: 'CounterDashboard',
    component: CounterDashboardReportComponent
  },
  {
    path: 'ContactList',
    component: ContactListViewComponent
  },
  {
    path: 'Reports',
    component: TrainingReportsComponent
  },
  {
    path: 'AddContact',
    component: AddContactComponent
  },
  {
    path: 'UpdateContact',
    component: UpdateContactComponent
  },
  {
    path: 'AddContactType',
    component: AddContactTypeComponent
  },
  {
    path: 'AddMeetingOrganizer',
    component: AddMeetingOrganizerComponent
  },
  {
    path: 'ParticepantSchedule',
    component: ParticepantScheduleListComponent
  },
  {
    path: 'AddMeetingVenue',
    component: AddMeetingVenueComponent
  },
  {
    path: 'Attendance',
    component: AttendanceComponent
  },
  
  
  
  {
    path: 'Schedule',
    component: ScheduleListComponent
  },
  {
    path: 'participant',
    component: ParticipantsListComponent
  },
  {
    path: 'PublicEngagementsList',
    component: PublicEngagementListComponent
  },
  {
    path: 'AddDailyEngagements',
    component: CreateDailyEngagementsComponent
  },
  {
    path: 'UpdateDailyEngagements',
    component: UpdateDailyEngagementsComponent
  },
  {
    path: 'taskDashboard',
    component: TaskDashboardComponent
  },
  {
    path: 'adpSchemes',
    component: AdpSchemesComponent
  },
  {
    path: 'task',
    component: CreateTaskComponent
  },
  {
    path: 'event',
    component: AddEventComponent
  },
  {
    path: 'UpdateMeeting',
    component: UpdateMeetingComponent
  },
  {
    path: 'View Event',
    component: ViewEventComponent
  },
  {
    path: 'vacancyStatusdevelopment',
    component: VacancyStatusDevelopmentComponent
  },
  {
    path: 'medicineTraceandTrack',
    component: MedicineTraceandTrackComponent
  },
  {
    path: 'taskList',
    component: TaskListComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'drugControlCounts',
    component: DrugControlCountsComponent
  },
  {
    path: 'sub-level',
    component: MainCardChildComponent,
  },
  {
    path: 'puc-pendency-status',
    component: PUCPendencyStatusComponent
  },
  {
    path: 'drugControlProcurement',
    component: DrugControlProcurementComponent
  },
  {
    path: 'admin-wing-vacancy-status',
    component: AdminWingVacancyStatusComponent
  },
  {
    path: 'taskDetail',
    component: TaskDetailComponent
  },
  {
    path: 'backlog',
    component: BacklogComponent
  },
  {
    path: 'toDo',
    component: ToDoComponent
  },
  {
    path: 'inProcess',
    component: InProcessComponent
  },
  {
    path: 'completed',
    component: CompletedComponent
  },
  {
    path: 'admin-dept-vacancy-status',
    component: AdminDeptVacancyStatusComponent
  },
  {
    path: 'hepatitisProcurement',
    component: HepatitisProcurementComponent
  },
  {
    path: 'aidsProcurement',
    component: AidsProcurementComponent
  },
  {
    path: 'ncdProcurement',
    component: NcdProcurementComponent
  },
  {
    path: 'PreviousTraining',
    component: PreviousTrainingComponent
  },
  {
    path: 'cdslData',
    component: CDSLDataComponent
  },
  {
    path: 'irmnchProcurement',
    component: IrmnchProcurementComponent
  },
  {
    path: 'tbProcurement',
    component: TbProcurementComponent
  },
  {
    path: 'vacancyStatusDrugControl',
    component: VacancyStatusDrugControlComponent
  },
  {
    path: 'leaves-expired',
    component: LeavesExpiredComponent
  },
  {
    path: 'admin-wing-vacant-report',
    component: AdminWingVacantReportComponent
  },
  {
    path: 'leaves-expired-details',
    component: LeavesExpiredDetailsComponent
  },

  {
    path: 'admin-wing-employees-leave',
    component: AdminWingEmployeesLeaveComponent,
  },
  {
    path: 'admin-wing-employees-leave-details',
    component: AdminWingEmployeesLeaveDetailsComponent
  },
  {
    path: 'admin-wing-awaiting-posting',
    component: AdminWingAwaitingPostingComponent
  },
  {
    path: 'admin-wing-awaiting-posting-details',
    component: AdminWingAwaitingPostingDetailsComponent
  },
  {
    path: 'vertical-program-generic',
    component: VerticalProgramGenericComponent
  },
  {
    path: 'development-wing-generic',
    component: DevelopmentWingGenericComponent
  },
  {
    path: 'procurementDetail',
    component: ProcurementDetailComponent
  },
  {
    path: '  health-council',
    component: HealthCouncilComponent
  },

  {
    path: 'mainDashboard',
    component: MainDashboardComponent
  },
  {
    path: 'reporting',
    component: ReportingComponent
  },
  {
    path: 'indicatorDetails',
    component: IndicatordetailsComponent
  },
  {
    path: 'VerticalPrograms',
    component: VerticalProgramsComponent
  },

  {
    path: 'registrationCompliance',
    component: RegistrationComplianceComponent
  },
  {
    path: 'userList',
    component: UserListComponent
  },
  {
    path: 'summaries',
    component: SummariesComponent
  },
  {
    path: 'detailDashboard',
    component: DetailedDashboardComponent
  },
  {
    path: 'DHIS',
    component: DHISComponent
  },
  {
    path: 'TrackingofSummariesAndNotes',
    component: TrackingofSummariesAndNotesComponent
  },
  {
    path: 'Development',
    component: DevelopmentDashboardComponent
  },
  {
    path: 'userRoleAssign',
    component: UserRoleAssignComponent

  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'assignDistrict',
    component: AssignDistrictComponent
  },
  {
    path: 'adminWingChart',
    component: AdminWingChartsComponent
  },
  // {
  //   path: 'user-role-assign',
  //   component: UserRoleAssignComponent
  // },

  {

    path: 'formsindicatorlist',
    component: FormsIndicatorListComponent
  },
  {
    path: 'formsindicator',
    component: FormsIndicatorComponent
  },

  {
    path: 'DocumentManagementSystem',
    component: DocumentManagementSystemComponent
  },
  {
    path: 'ManageTrainingCategory',
    component: ManageTrainingCategoryComponent
  },
  {
    path: 'ManageTrainingType',
    component: ManageTrainingTypeComponent
  },
  {
    path: 'ManageTrainingLevel',
    component: ManageTraininglevelComponent
  },
  {
    path: 'ManageOrganizedBy',
    component: ManageOrganizedByComponent
  },
  {
    path: 'CompleteScheduleDetails',
    component: ScheduleCompleteDetailsComponent
  },
  {
    path: 'ManageSupportedBy',
    component: ManageSupportedByComponent
  },
  {
    path: 'ManageVenue',
    component: VenueComponent
  },
  {
    path: 'ManageDocumentType',
    component: ManageDocumentTypeComponent
  },
  {
    path: 'ManageQualification',
    component: QualificationComponent
  },
  {
    path: 'AddDesignation',
    component: AddCadreComponent
  },
  {
    path: 'SendEmail',
    component: SendEmailComponent
  },
  {
    path: 'NonDigitizedTrainingData',
    component: NonDigitizedTrainingDataComponent
  },
  {
    path: 'Exparticipants',
    component: ExparticipantsComponent
  },
  
  {
    path: 'TrainingDocuments',
    component: TrainingDocumentsComponent,
  },

  {
    path: 'advance',
    loadChildren: () => import('../../components/advance/advance.module').then(m => m.AdvanceModule),
    data: {
      breadcrumb: "Advance"
    }
  },
  {
    path: 'map',
    loadChildren: () => import('../../components/map/map.module').then(m => m.MapModule),
    data: {
      breadcrumb: "Map"
    }
  },

];