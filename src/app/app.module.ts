import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from "./shared/shared.module";
import { AppRoutingModule } from './app-routing.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { ToastrModule } from 'ngx-toastr';
import { AuthService } from './shared/services/firebase/auth.service';
import { AdminGuard } from './shared/guard/admin.guard';
import { SecureInnerPagesGuard } from './shared/guard/SecureInnerPagesGuard.guard';
import { CookieService } from 'ngx-cookie-service';
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { JwtInterceptor } from './core/helpers/jwt.interceptor'
import { ErrorInterceptor } from './Core/helpers/error.interceptor'
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { RoleComponent } from './auth/role/role.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ContextmenuComponent } from './auth/contextmenu/contextmenu.component';
import { UserRoleAssignComponent } from './auth/user-role-assign/user-role-assign.component';
import { DataGridService } from './Core/data-grid.service'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormsIndicatorComponent } from './FormsIndicator/forms-indicator/forms-indicator.component';
import { FormIndicatorService } from './shared/services/FormIndicatorService/FormIndicatorService';
import { FormsIndicatorListComponent } from './FormsIndicator/forms-indicator-list/forms-indicator-list.component';
import { RegisterComponent } from './auth/register/register.component';
import { RegisterService } from './shared/services/RegisterService/RegisterService';
import { AdminWingService } from './shared/services/AdminWingService/AdminWingService';
import { DevelopmentService } from './shared/services/DevelopmentService/DevelopmentService';
import { VerticalProgramsService } from './shared/services/VerticalProgramsService/VerticalProgramsService';
import { RoleService } from './shared/services/RoleService/RoleService';
import { UserListComponent } from './auth/userList/user-list/user-list.component';
import { CommonModule, DatePipe } from '@angular/common';
import { AgmCoreModule } from '@agm/core';
// import { MapRoutingModule } from './map-routing.module';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { MapService } from './shared/services/MapService/MapService';
import { DashboardService } from './shared/services/DashboardService/DashboardService';
import { AssignDistrictComponent } from './auth/assign-district/assign-district/assign-district.component';
import { IndicatordetailsComponent } from './FormsIndicator/IndicatorDetails/indicatordetails/indicatordetails.component';
import { DetailedDashboardComponent } from './DetailedDashboard/detailed-dashboard/detailed-dashboard.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgbModalModule, NgbModalRef, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartistModule } from 'ng-chartist';
import { ChartsModule } from '@progress/kendo-angular-charts';
import { CountToModule } from 'angular-count-to';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { ModalDialogModule } from 'ngx-modal-dialog';
import { CoreService } from './Core/core.service'
import { ReportingService } from 'src/app/shared/services/ReportingService/ReportingSerice'
import { FileSaverModule } from 'ngx-filesaver';
import { RegistrationComplianceComponent } from './DetailedDashboard/registration-compliance/registration-compliance/registration-compliance.component';
import { ReportingComponent } from './Reporting/reporting/reporting.component';
import { HighchartsChartComponent, HighchartsChartModule } from 'highcharts-angular';
import { DashboardChartsComponent } from "./DetailedDashboard/dashboard-charts/dashboard-charts.component";
import { PendencyComponent } from './AdminWing/pendency/pendency.component';
import { EmployeesOnLeaveComponent } from './AdminWing/employees-on-leave/employees-on-leave.component';
import { AwaitingPostingComponent } from './AdminWing/awaiting-posting/awaiting-posting.component';
import { CRRSummaryComponent } from './AdminWing/crrsummary/crrsummary.component';
import { VPReportComponent } from './AdminWing/vpreport/vpreport.component';
import { FilterPipe } from './Pipe';
import { DevelopmentDashboardComponent } from './Development/development-dashboard/development-dashboard.component';
import { ProcurementComponent } from './Development/procurement/procurement.component';
import { OutSourcingComponent } from './Development/out-sourcing/out-sourcing.component';
import { DistrictCountComponent } from './Development/district-count/district-count.component';
import { VerticalProgramsComponent } from './VerticalPrograms/vertical-programs/vertical-programs.component';
import { HepatitisPatientComponent } from './VerticalPrograms/hepatitis-patient/hepatitis-patient.component';
import { AdpSchemesComponent } from './Development/adp-schemes/adp-schemes.component';
import { DRSDailyPatientCountComponent } from './VerticalPrograms/drsdaily-patient-count/drsdaily-patient-count.component';
import { DRSDailyLabCountComponent } from './VerticalPrograms/drsdaily-lab-count/drsdaily-lab-count.component';
import { IRMNCHDistWisePatientsSummaryComponent } from './VerticalPrograms/irmnchdist-wise-patients-summary/irmnchdist-wise-patients-summary.component';
import { NCDDailyReportComponent } from './VerticalPrograms/ncddaily-report/ncddaily-report.component';
import { NCDDeskReportComponent } from './VerticalPrograms/ncddesk-report/ncddesk-report.component'
//import { CustomChartsModule } from "./DetailedDashboard/charts/custom-charts.module";
//import { MapModule } from "./components/map/map.module";
// AoT requires an exported function for factories
import { NgxLoadingModule } from 'ngx-loading';
import { IRMNCHComponent } from './VerticalPrograms/irmnch/irmnch.component';
import { LHSReportingDistWiseComponent } from './VerticalPrograms/lhsreporting-dist-wise/lhsreporting-dist-wise.component';
import { IrmnchEmrDsrComponent } from './VerticalPrograms/irmnch-emr-dsr/irmnch-emr-dsr.component';
import { AidsComponent } from './VerticalPrograms/aids/aids.component';
import { NCDComponent } from './VerticalPrograms/ncd/ncd.component';
import { MainDashboardComponent } from './MainDashboard/main-dashboard/main-dashboard.component';
import { MainCardComponent } from './Core/components/main-card/main-card.component'
import { MainCardChildComponent } from './components/main-card-child/main-card-child.component'
import { VacancyStatusAdminPostComponent } from './components/vacancy-status-admin-post/vacancy-status-admin-post.component'
import { PUCPendencyStatusComponent } from './AdminWing/puc-pendency-status/puc-pendency-status.component'
import { AdminWingVacancyStatusComponent } from './AdminWing/admin-wing-vacancy-status/admin-wing-vacancy-status.component'
import { AdminWingVacantReportComponent } from './AdminWing/admin-wing-vacant-report/admin-wing-vacant-report.component'
import { AdminWingEmployeesLeaveComponent } from './AdminWing/admin-wing-employees-leave/admin-wing-employees-leave.component'
import { AdminWingEmployeesLeaveDetailsComponent } from './AdminWing/admin-wing-employees-leave-details/admin-wing-employees-leave-details.component'
import { AdminWingAwaitingPostingComponent } from './AdminWing/admin-wing-awaiting-posting/admin-wing-awaiting-posting.component'
import { AdminWingAwaitingPostingDetailsComponent } from './AdminWing/admin-wing-awaiting-posting-details/admin-wing-awaiting-posting-details.component'
import { VerticalProgramGenericComponent } from './VerticalPrograms/vertical-program-generic/vertical-program-generic.component'
import { DevelopmentWingGenericComponent } from './Development/development-wing-generic/development-wing-generic.component';
import { CreateTaskComponent } from './Task/create-task/create-task.component';
import { TaskListComponent } from './Task/task-list/task-list.component';
import { LeavesExpiredComponent } from './AdminWing/leaves-expired/leaves-expired.component'
import { BackButtonComponent } from './Core/components/back-button/back-button.component';
import { HealthCouncilComponent } from './Development/health-council/health-council.component';
import { AdminDeptVacancyStatusComponent } from './AdminWing/admin-dept-vacancy-status/admin-dept-vacancy-status.component';
import { LeavesExpiredDetailsComponent } from './AdminWing/leaves-expired-details/leaves-expired-details.component';
import { DrugControlCountsComponent } from './DrugControl/drug-control-counts/drug-control-counts.component';
import { HepatitisProcurementComponent } from './VerticalPrograms/hepatitis-procurement/hepatitis-procurement.component';
import { MedicineTraceandTrackComponent } from './DrugControl/medicine-traceand-track/medicine-traceand-track.component';
import { VacancyStatusDevelopmentComponent } from './Development/vacancy-status-development/vacancy-status-development.component';
import { VacancyStatusDrugControlComponent } from './DrugControl/vacancy-status-drug-control/vacancy-status-drug-control.component';
import { AidsProcurementComponent } from './VerticalPrograms/aids-procurement/aids-procurement.component';
import { NcdProcurementComponent } from './VerticalPrograms/ncd-procurement/ncd-procurement.component';
import { IrmnchProcurementComponent } from './VerticalPrograms/irmnch-procurement/irmnch-procurement.component';
import { TbProcurementComponent } from './VerticalPrograms/tb-procurement/tb-procurement.component';
import { CDSLDataComponent } from './DrugControl/cdsldata/cdsldata.component';
import { ProcurementDetailComponent } from './Development/procurement-detail/procurement-detail.component';
import { DrugControlProcurementComponent } from './DrugControl/drug-control-procurement/drug-control-procurement.component';
import { TaskDetailComponent } from './Task/task-detail/task-detail.component';
import { BacklogComponent } from './Task/TaskList/backlog/backlog.component';
import { ToDoComponent } from './Task/TaskList/to-do/to-do.component';
import { InProcessComponent } from './Task/TaskList/in-process/in-process.component';
import { CompletedComponent } from './Task/TaskList/completed/completed.component';
import { SignalRService } from 'src/app/shared/services/SignalR/signalR.service';
import { FolderService } from 'src/app/shared/services/FolderService/FolderService';
import { NotificationComponent } from './Notification/notification/notification.component';
import { TaskDashboardComponent } from './Task/task-dashboard/task-dashboard.component';
import { SharedFolderDashboardComponent } from './SharedFolder/shared-folder-dashboard/shared-folder-dashboard.component';
import { AddFileFolderComponent } from './SharedFolder/add-file-folder/add-file-folder.component';
import { SummariesComponent } from './Summaries/summaries/summaries.component';
import { EventCalenderViewComponent } from './EventCalender/event-calender-view/event-calender-view.component';
import { AddEventComponent } from './EventCalender/add-event/add-event.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ChangePasswordComponent } from './auth/change-password/change-password.component';
import { ViewEventComponent } from './EventCalender/view-event/view-event.component';
import { DHISComponent } from './dhis/dhis.component';
import { DHISService } from './shared/services/DHISService/DHISService';
import { TrackingofSummariesService } from './shared/services/TrackingofSummariesService/TrackingofSummariesService';
import { TrackingofSummariesAndNotesComponent } from './trackingof-summaries-and-notes/trackingof-summaries-and-notes.component';
import { SummaryDetailComponent } from './trackingof-summaries-and-notes/summary-detail/summary-detail.component';
import { AdminWingChartsComponent } from './AdminWing/admin-wing-charts/admin-wing-charts.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { ContactListViewComponent } from './Contacts/contact-list-view/contact-list-view.component';
import { AddContactComponent } from './Contacts/add-contact/add-contact.component';
import { DailyEngagementsViewComponent } from './DailyEngagements/daily-engagements-view/daily-engagements-view.component';
import { CreateDailyEngagementsComponent } from './DailyEngagements/create-daily-engagements/create-daily-engagements.component';
import { PublicEngagementListComponent } from './DailyEngagements/public-engagement-list/public-engagement-list.component';
import { AddContactTypeComponent } from './Contacts/add-contact-type/add-contact-type.component';
import { AddMeetingOrganizerComponent } from './EventCalender/add-meeting-organizer/add-meeting-organizer.component';
import { AddMeetingVenueComponent } from './EventCalender/add-meeting-venue/add-meeting-venue.component';
import { UpdateMeetingComponent } from './EventCalender/update-meeting/update-meeting.component';
import { UpdateContactComponent } from './Contacts/update-contact/update-contact.component';
import { UpdateDailyEngagementsComponent } from './DailyEngagements/update-daily-engagements/update-daily-engagements.component';
import { AddTrainingScheduleComponent } from './Schedule/add-training-schedule/add-training-schedule.component';
import { ScheduleListComponent } from './Schedule/schedule-list/schedule-list.component';
import { ViewScheduleDetailsComponent } from './Schedule/view-schedule-details/view-schedule-details.component';
import { AddTraineeComponent } from './Schedule/add-trainee/add-trainee.component';
import {SchedulerModule} from '@progress/kendo-angular-scheduler';
import { AddTrainerComponent } from './Schedule/add-trainer/add-trainer.component';
import { SearchFilterPipe } from "src/app/Schedule/schedule-list/search-filter.pipe";
import { ParticipantsListComponent } from './Participants/participants-list/participants-list.component';
import { TrainingReportsComponent } from './Reports/training-reports/training-reports.component';
import { TrainingTypeDetailComponent } from './Reports/training-reports/training-type-detail/training-type-detail.component';
import { TraineeDetailsComponent } from './Reports/trainee-details/trainee-details.component';
import { TrainerDetailsComponent } from './Reports/trainer-details/trainer-details.component';
import { ParticepantRegisterComponent } from './auth/particepant-register/particepant-register.component';
import { ParticepantScheduleListComponent } from './Participants/particepant-schedule-list/particepant-schedule-list.component';
import { AttendanceComponent } from './Participants/attendance/attendance.component';
import { AddExistingTrainingComponent } from './EventCalender/add-existing-training/add-existing-training.component';
import { PreviousTrainingComponent } from './EventCalender/previous-training/previous-training.component';
import { ExternalParticipantComponent } from './Schedule/external-participant/external-participant.component';
import { CounterDashboardReportComponent } from './counter-dashboard-report/counter-dashboard-report.component';
import { AddTrainingOrgainzerComponent } from './EventCalender/add-training-orgainzer/add-training-orgainzer.component';
import { TrainingSupportedByComponent } from './EventCalender/training-supported-by/training-supported-by.component';
import { AddTrainingLevelComponent } from './EventCalender/add-training-level/add-training-level.component';
import { AddQualificationComponent } from './Participants/add-qualification/add-qualification.component';
import { DocumentManagementSystemComponent } from './document-management-system/document-management-system.component';
import { AddDocumentComponent } from './Schedule/add-document/add-document.component';
import { ViewDocumentsComponent } from './Schedule/view-documents/view-documents.component';
import { TotalMarksComponent } from './Reports/total-marks/total-marks.component';
import { AddDocumentTypeComponent } from './Schedule/add-document/add-document-type/add-document-type.component';
import { ExparticipantsComponent } from './Participants/exparticipants/exparticipants.component';
import { ViewExternalParticipentComponent } from './Participants/view-external-participent/view-external-participent.component';
import { NonDigitizedTrainingDataComponent } from './document-management-system/non-digitized-training-data/non-digitized-training-data.component';
import { SendEmailComponent } from './Participants/send-email/send-email.component';
import { ManageTrainingCategoryComponent } from 'src/app/MasterDataManagement/manage-training-category/manage-training-category.component';
import { ManageTrainingTypeComponent } from 'src/app/MasterDataManagement/manage-training-type/manage-training-type.component';
import { ManageTraininglevelComponent } from 'src/app/MasterDataManagement/manage-traininglevel/manage-traininglevel.component';
import { ManageOrganizedByComponent } from 'src/app/MasterDataManagement/manage-organized-by/manage-organized-by.component';
import { ManageSupportedByComponent } from 'src/app/MasterDataManagement/manage-supported-by/manage-supported-by.component';
import { VenueComponent } from 'src/app/MasterDataManagement/venue/venue.component';
import { QualificationComponent } from 'src/app/MasterDataManagement/qualification/qualification.component';
import { ExternalParticepantDropDownComponent } from './Participants/external-particepant-drop-down/external-particepant-drop-down.component';
import { SearchDropdown } from './search-dropdown/search-dropdown.component';
import { ScheduleTrainingListComponent } from './Schedule/schedule-training-list/schedule-training-list.component';
import { ManageDocumentTypeComponent } from './MasterDataManagement/manage-document-type/manage-document-type.component';
import { ScheduleCompleteDetailsComponent } from './Schedule/schedule-complete-details/schedule-complete-details.component';
import { TrainingDocumentsComponent } from './training-documents/training-documents.component';
import { TrainingsComponent } from './trainings/trainings.component';
import { AddCadreComponent } from './MasterDataManagement/add-cadre/add-cadre.component';
import { AddTrainingCadreComponent } from './EventCalender/add-training-cadre/add-training-cadre.component';
import { ReplaceTraineeComponent } from './Schedule/replace-trainee/replace-trainee.component';
import { ReplaceTrainerComponent } from './Schedule/replace-trainer/replace-trainer.component';
import { ReplaceExternalParticipantComponent } from './Participants/replace-external-participant/replace-external-participant.component';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RoleComponent,
    FilterPipe,
    ContextmenuComponent,
    UserRoleAssignComponent,
    FormsIndicatorComponent,
    FormsIndicatorListComponent,
    IndicatordetailsComponent,
    RegisterComponent,
    UserListComponent,
    AssignDistrictComponent,
    DetailedDashboardComponent,
    RegistrationComplianceComponent,
    ReportingComponent,
    DashboardChartsComponent,
    PendencyComponent,
    EmployeesOnLeaveComponent,
    AwaitingPostingComponent,
    CRRSummaryComponent,
    VPReportComponent,
    DevelopmentDashboardComponent,
    ProcurementComponent,
    OutSourcingComponent,
    DistrictCountComponent,
    VerticalProgramsComponent,
    HepatitisPatientComponent,
    AdpSchemesComponent,
    DRSDailyPatientCountComponent,
    DRSDailyLabCountComponent,
    IRMNCHDistWisePatientsSummaryComponent,
    NCDDailyReportComponent,
    NCDDeskReportComponent,
    IRMNCHComponent,
    LHSReportingDistWiseComponent,
    IrmnchEmrDsrComponent,
    AidsComponent,
    NCDComponent,
    MainDashboardComponent,
    MainCardComponent,
    MainCardChildComponent,
    VacancyStatusAdminPostComponent,
    PUCPendencyStatusComponent,
    AdminWingVacancyStatusComponent,
    AdminWingVacantReportComponent,
    AdminWingEmployeesLeaveComponent,
    AdminWingEmployeesLeaveDetailsComponent,
    AdminWingAwaitingPostingComponent,
    AdminWingAwaitingPostingDetailsComponent,
    VerticalProgramGenericComponent,
    DevelopmentWingGenericComponent,
    CreateTaskComponent,
    TaskListComponent,
    LeavesExpiredComponent,
    BackButtonComponent,
    HealthCouncilComponent,
    AdminDeptVacancyStatusComponent,
    LeavesExpiredDetailsComponent,
    DrugControlCountsComponent,
    HepatitisProcurementComponent,
    MedicineTraceandTrackComponent,
    VacancyStatusDevelopmentComponent,
    VacancyStatusDrugControlComponent,
    AidsProcurementComponent,
    NcdProcurementComponent,
    IrmnchProcurementComponent,
    TbProcurementComponent,
    CDSLDataComponent,
    ProcurementDetailComponent,
    DrugControlProcurementComponent,
    TaskDetailComponent,
    BacklogComponent,
    ToDoComponent,
    InProcessComponent,
    CompletedComponent,
    TaskDashboardComponent,
    SharedFolderDashboardComponent,
    AddFileFolderComponent,
    SummariesComponent,
    EventCalenderViewComponent,
    AddEventComponent,
    ChangePasswordComponent,
    ViewEventComponent,
    DHISComponent,
    TrackingofSummariesAndNotesComponent,
    SummaryDetailComponent,
    AdminWingChartsComponent,
    ContactListViewComponent,
    AddContactComponent,
    DailyEngagementsViewComponent,
    CreateDailyEngagementsComponent,
    PublicEngagementListComponent,
    AddContactTypeComponent,
    AddMeetingOrganizerComponent,

    AddMeetingVenueComponent,

    UpdateMeetingComponent,

    UpdateContactComponent,

    UpdateDailyEngagementsComponent,

    AddTrainingScheduleComponent,

    ScheduleListComponent,

    ViewScheduleDetailsComponent,

    AddTraineeComponent,

    AddTrainerComponent,
    SearchFilterPipe,
    ParticipantsListComponent,
    TrainingReportsComponent,
    TrainingTypeDetailComponent,
    TraineeDetailsComponent,
    TrainerDetailsComponent,
    ParticepantRegisterComponent,
    ParticepantScheduleListComponent,
    AttendanceComponent,
    AddExistingTrainingComponent,
    PreviousTrainingComponent,
    ExternalParticipantComponent,
    CounterDashboardReportComponent,
    AddTrainingOrgainzerComponent,
    TrainingSupportedByComponent,
    AddTrainingLevelComponent,
    AddQualificationComponent,
    DocumentManagementSystemComponent,
    AddDocumentComponent,
    ViewDocumentsComponent,
    TotalMarksComponent,
    AddDocumentTypeComponent,
    ExparticipantsComponent,
    ViewExternalParticipentComponent,
    NonDigitizedTrainingDataComponent,
    SendEmailComponent,
    ManageTrainingCategoryComponent,
    ManageTrainingTypeComponent,
    ManageTraininglevelComponent,
    ManageOrganizedByComponent,
    ManageSupportedByComponent,
    VenueComponent,
    QualificationComponent,
    ExternalParticepantDropDownComponent,
    SearchDropdown,
    ScheduleTrainingListComponent,
    ManageDocumentTypeComponent,
    ScheduleCompleteDetailsComponent,
    TrainingDocumentsComponent,
    TrainingsComponent,
    AddCadreComponent,
    AddTrainingCadreComponent,
    ReplaceTraineeComponent,
    ReplaceTrainerComponent,
    ReplaceExternalParticipantComponent,
    // HighchartsChartComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FileSaverModule,
    HighchartsChartModule,
    CommonModule,
    HttpClientModule,
    ChartsModule,
    NgxPaginationModule,
    //MapRoutingModule,
    FormsModule,
    NgxDatatableModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBb4srgfxcxa5pDvA1ysuWsZ6cOJBOx4z0'
    }),
    NgxLoadingModule.forRoot({}),
    LeafletModule.forRoot(),
    HttpClientModule,
    SharedModule,

    AppRoutingModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
    }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    NgxDatatableModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    CarouselModule,
    NgbModule,
    ChartistModule,
    CountToModule,
    NgxChartsModule,
    Ng2GoogleChartsModule,
    SharedModule,
    NgxDatatableModule,
    ModalDialogModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot(),
    SchedulerModule
    
  ],

  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    AuthService,
    AdminGuard, SecureInnerPagesGuard, CookieService, DataGridService,FolderService,
    FormIndicatorService, RegisterService, RoleService, MapService, DashboardService,
    CoreService, ReportingService, AdminWingService, DevelopmentService, VerticalProgramsService,SignalRService,DHISService,TrackingofSummariesService,
    DatePipe
  ],
  // providers: [AuthService, AdminGuard, SecureInnerPagesGuard, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
