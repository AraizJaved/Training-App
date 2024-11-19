import { NgModule } from "@angular/core";
import { CustomChartsRoutingModule } from "./custom-charts-routing.module";
import { RegistrationComplianceChartComponent } from './registration-compliance-chart/registration-compliance-chart.component';
import { OrganizationRegistrationChartComponent } from './organization-registration-chart/organization-registration-chart.component';
import { AdministrativeComplianceChartComponent } from './administrative-compliance-chart/administrative-compliance-chart.component';
import { FixedSiteMonitoringTotalFormFilledComponent } from './fixed-site-monitoring-total-form-filled/fixed-site-monitoring-total-form-filled.component';
import { FixedSiteMonitoringFunctionalSiaComponent } from './fixed-site-monitoring-functional-sia/fixed-site-monitoring-functional-sia.component';
import { SupervisorTrainedAndUntrainedStaffComponent } from './supervisor-trained-and-untrained-staff/supervisor-trained-and-untrained-staff.component';
import { UCMOAICHHClusterComponent } from './ucmo-aic-hh-cluster/ucmo-aic-hh-cluster.component';
import { UCMOAICSupervisorClusterComponent } from './ucmo-aic-supervisor-cluster/ucmoaicsupervisor-cluster.component';
import { MobileTeamMonitoringNeapCompositionComponent } from './mobile-team-monitoring-neap-composition/mobile-team-monitoring-neap-composition.component';
import { MobileTeamMonitoringTrainedUnTrainedStaffComponent } from './mobile-team-monitoring-trained-un-trained-staff/mobile-team-monitoring-trained-un-trained-staff.component';
import { MobileTeamMonitoringVaccineConditionComponent } from './mobile-team-monitoring-vaccine-condition/mobile-team-monitoring-vaccine-condition.component';
import { TransitTeamMonitoringNeapCompositionComponent } from './transit-team-monitoring-neap-composition/transit-team-monitoring-neap-composition.component';
import { TransitTeamMonitoringLogisticsForEachMemberComponent } from './transit-team-monitoring-logistics-for-each-member/transit-team-monitoring-logistics-for-each-member.component';
import { TransitTeamMonitoringVaccineConditionComponent } from './transit-team-monitoring-vaccine-condition/transit-team-monitoring-vaccine-condition.component';
import { TransitTeamMonitoringLEAsSupportComponent } from './transit-team-monitoring-leas-support/transit-team-monitoring-leas-support.component';
import { HouseHoldClusterVaccinatedandUnVaccinatedAgeWiseComponent } from './house-hold-cluster-vaccinatedand-un-vaccinated-age-wise/house-hold-cluster-vaccinatedand-un-vaccinated-age-wise.component';
import { HouseHoldClusterPopulationTypeComponent } from './house-hold-cluster-population-type/house-hold-cluster-population-type.component';
import { HouseHoldClusterZeroDoseEIChildrenComponent } from './house-hold-cluster-zero-dose-ei-children/house-hold-cluster-zero-dose-ei-children.component';
import { HouseHoldClusterReasonForMissedComponent } from './house-hold-cluster-reason-for-missed/house-hold-cluster-reason-for-missed.component';
import { CommonModule } from "@angular/common";
import { FsmFixedSiteMonitoringNeapComponent } from './fsm-fixed-site-monitoring-neap/fsm-fixed-site-monitoring-neap.component';
import { FsmFixedSiteMonitoringFunctionalSiaComponent } from './fsm-fixed-site-monitoring-functional-sia/fsm-fixed-site-monitoring-functional-sia.component';
import { FsmFixedSiteMonitoringTemperatureConditionComponent } from './fsm-fixed-site-monitoring-temperature-condition/fsm-fixed-site-monitoring-temperature-condition.component';
import { FsmFixedSiteMonitoringVaccineConditionComponent } from './fsm-fixed-site-monitoring-vaccine-condition/fsm-fixed-site-monitoring-vaccine-condition.component';
import { FsmFixedSiteMonitoringEssentialImmunizationduringSIAComponent } from './fsm-fixed-site-monitoring-essential-immunizationduring-sia/fsm-fixed-site-monitoring-essential-immunizationduring-sia.component';
import { FsmFixedSiteMonitoringZeroDoseReferralComponent } from './fsm-fixed-site-monitoring-zero-dose-referral/fsm-fixed-site-monitoring-zero-dose-referral.component';
import { FsmFixedSiteMonitoringAFPCaseDefinitionComponent } from './fsm-fixed-site-monitoring-afpcase-definition/fsm-fixed-site-monitoring-afpcase-definition.component';
import { SmSuperVisorNecessaryitemsComponent } from './sm-super-visor-necessaryitems/sm-super-visor-necessaryitems.component';
import { SmSuperVisorTeamMonitornigChecklistComponent } from './sm-super-visor-team-monitornig-checklist/sm-super-visor-team-monitornig-checklist.component';
import { SmSuperVisorHRMPVisitsComponent } from './sm-super-visor-hrmp-visits/sm-super-visor-hrmp-visits.component';
import { SmSuperVisorHHClusterTakenComponent } from './sm-super-visor-hhcluster-taken/sm-super-visor-hhcluster-taken.component';
import { MtmMobileTeamMonitoringDataRecordingComponent } from './mtm-mobile-team-monitoring-data-recording/mtm-mobile-team-monitoring-data-recording.component';
import { MtmMobileTeamMonitoringIPCQuestionsComponent } from './mtm-mobile-team-monitoring-ipc-questions/mtm-mobile-team-monitoring-ipc-questions.component';
import { MtmMobileTeamMonitoringZeroDoseRecordingComponent } from './mtm-mobile-team-monitoring-zero-dose-recording/mtm-mobile-team-monitoring-zero-dose-recording.component';
import { MtmMobileTeamMonitoringRouteMapsComponent } from './mtm-mobile-team-monitoring-route-maps/mtm-mobile-team-monitoring-route-maps.component';
import { TtmTransitTeamMonitoringCNICComponent } from './ttm-transit-team-monitoring-cnic/ttm-transit-team-monitoring-cnic.component';
import { HhcHouseHoldClusterGuestChildrenVaccinationComponent } from './hhc-house-hold-cluster-guest-children-vaccination/hhc-house-hold-cluster-guest-children-vaccination.component';
import { HhcHouseHoldClusterFingermarkingStatusComponent } from './hhc-house-hold-cluster-fingermarking-status/hhc-house-hold-cluster-fingermarking-status.component';
import { HhcHouseHoldClusterEIVaccinationlessthantwoyearsComponent } from './hhc-house-hold-cluster-ei-vaccinationlessthantwoyears/hhc-house-hold-cluster-ei-vaccinationlessthantwoyears.component';
import { CompFixedSiteUCMOAICComplainceComponent } from './comp-fixed-site-ucmoaic-complaince/comp-fixed-site-ucmoaic-complaince.component';
import { CompFixedSiteOrganizationComplainceComponent } from './comp-fixed-site-organization-complaince/comp-fixed-site-organization-complaince.component';
import { CompSupervisorMonitoringUCMOandAICComplainceComponent } from './comp-supervisor-monitoring-ucmoand-aic-complaince/comp-supervisor-monitoring-ucmoand-aic-complaince.component';
import { CompSupervisorMonitoringOrganizationComplainceComponent } from './comp-supervisor-monitoring-organization-complaince/comp-supervisor-monitoring-organization-complaince.component';
import { CompTeammonitoringUCMOandAICComplainceComponent } from './comp-teammonitoring-ucmoand-aic-complaince/comp-teammonitoring-ucmoand-aic-complaince.component';
import { CompTeammonitoringOrganizationComplainceComponent } from './comp-teammonitoring-organization-complaince/comp-teammonitoring-organization-complaince.component';
import { CompMobileTeamMonitoringUCMOandAICComplianceComponent } from './comp-mobile-team-monitoring-ucmoand-aic-compliance/comp-mobile-team-monitoring-ucmoand-aic-compliance.component';
import { CompMobileTeamOrganizationComplianceComponent } from './comp-mobile-team-organization-compliance/comp-mobile-team-organization-compliance.component';
import { CompHouseHoldClusterUCMOandAICComplianceComponent } from './comp-house-hold-cluster-ucmoand-aic-compliance/comp-house-hold-cluster-ucmoand-aic-compliance.component';
import { CompHouseHoldOrganizationComplianceComponent } from './comp-house-hold-organization-compliance/comp-house-hold-organization-compliance.component';
import { CompRegistrationComplianceProvinceLevelComponent } from './comp-registration-compliance-province-level/comp-registration-compliance-province-level.component';
import { CompRegistrationComplianceDivisionLevelComponent } from './comp-registration-compliance-division-level/comp-registration-compliance-division-level.component';
import { CompRegistrationComplianceDistrictLevelComponent } from './comp-registration-compliance-district-level/comp-registration-compliance-district-level.component';
import { CompRegistrationComplianceTehsilLevelComponent } from './comp-registration-compliance-tehsil-level/comp-registration-compliance-tehsil-level.component';
import { CompRegistrationComplianceUCLevelComponent } from './comp-registration-compliance-uc-level/comp-registration-compliance-uc-level.component';
import { CatchUpHouseHoldClusterPopulationTypeComponent } from './catch-up-house-hold-cluster-population-type/catch-up-house-hold-cluster-population-type.component';
import { CatchupHouseHoldCheckedComponent } from './catchup-house-hold-checked/catchup-house-hold-checked.component';
import { CatchupHouseHoldFindingsComponent } from './catchup-house-hold-findings/catchup-house-hold-findings.component';


@NgModule({
  imports: [
    CustomChartsRoutingModule,
    CommonModule
  ],
  declarations: [RegistrationComplianceChartComponent, OrganizationRegistrationChartComponent, AdministrativeComplianceChartComponent, FixedSiteMonitoringTotalFormFilledComponent, FixedSiteMonitoringFunctionalSiaComponent, SupervisorTrainedAndUntrainedStaffComponent, UCMOAICHHClusterComponent, UCMOAICSupervisorClusterComponent, MobileTeamMonitoringNeapCompositionComponent, MobileTeamMonitoringTrainedUnTrainedStaffComponent, MobileTeamMonitoringVaccineConditionComponent, TransitTeamMonitoringNeapCompositionComponent, TransitTeamMonitoringLogisticsForEachMemberComponent, TransitTeamMonitoringVaccineConditionComponent, TransitTeamMonitoringLEAsSupportComponent, HouseHoldClusterVaccinatedandUnVaccinatedAgeWiseComponent, HouseHoldClusterPopulationTypeComponent, HouseHoldClusterZeroDoseEIChildrenComponent, HouseHoldClusterReasonForMissedComponent, FsmFixedSiteMonitoringNeapComponent, FsmFixedSiteMonitoringFunctionalSiaComponent, FsmFixedSiteMonitoringTemperatureConditionComponent, FsmFixedSiteMonitoringVaccineConditionComponent, FsmFixedSiteMonitoringEssentialImmunizationduringSIAComponent, FsmFixedSiteMonitoringZeroDoseReferralComponent, FsmFixedSiteMonitoringAFPCaseDefinitionComponent, SmSuperVisorNecessaryitemsComponent, SmSuperVisorTeamMonitornigChecklistComponent, SmSuperVisorHRMPVisitsComponent, SmSuperVisorHHClusterTakenComponent, MtmMobileTeamMonitoringDataRecordingComponent, MtmMobileTeamMonitoringIPCQuestionsComponent, MtmMobileTeamMonitoringZeroDoseRecordingComponent, MtmMobileTeamMonitoringRouteMapsComponent, TtmTransitTeamMonitoringCNICComponent, HhcHouseHoldClusterGuestChildrenVaccinationComponent, HhcHouseHoldClusterFingermarkingStatusComponent, HhcHouseHoldClusterEIVaccinationlessthantwoyearsComponent, CompFixedSiteUCMOAICComplainceComponent, CompFixedSiteOrganizationComplainceComponent, CompSupervisorMonitoringUCMOandAICComplainceComponent, CompSupervisorMonitoringOrganizationComplainceComponent, CompTeammonitoringUCMOandAICComplainceComponent, CompTeammonitoringOrganizationComplainceComponent, CompMobileTeamMonitoringUCMOandAICComplianceComponent, CompMobileTeamOrganizationComplianceComponent, CompHouseHoldClusterUCMOandAICComplianceComponent, CompHouseHoldOrganizationComplianceComponent, CompRegistrationComplianceProvinceLevelComponent, CompRegistrationComplianceDivisionLevelComponent, CompRegistrationComplianceDistrictLevelComponent, CompRegistrationComplianceTehsilLevelComponent, CompRegistrationComplianceUCLevelComponent, CatchUpHouseHoldClusterPopulationTypeComponent, CatchupHouseHoldCheckedComponent, CatchupHouseHoldFindingsComponent],
  exports: [
    RegistrationComplianceChartComponent,
    OrganizationRegistrationChartComponent,
    AdministrativeComplianceChartComponent,
    FixedSiteMonitoringTotalFormFilledComponent,
    FixedSiteMonitoringFunctionalSiaComponent,
    SupervisorTrainedAndUntrainedStaffComponent,
    UCMOAICHHClusterComponent,
    UCMOAICSupervisorClusterComponent,
    MobileTeamMonitoringNeapCompositionComponent,
    MobileTeamMonitoringTrainedUnTrainedStaffComponent,
    MobileTeamMonitoringVaccineConditionComponent,
    TransitTeamMonitoringNeapCompositionComponent,
    TransitTeamMonitoringLogisticsForEachMemberComponent,
    TransitTeamMonitoringVaccineConditionComponent,
    TransitTeamMonitoringLEAsSupportComponent,
    HouseHoldClusterVaccinatedandUnVaccinatedAgeWiseComponent,
    HouseHoldClusterPopulationTypeComponent,
    HouseHoldClusterZeroDoseEIChildrenComponent,
    HouseHoldClusterReasonForMissedComponent,
    FsmFixedSiteMonitoringNeapComponent,
    FsmFixedSiteMonitoringFunctionalSiaComponent,
    FsmFixedSiteMonitoringTemperatureConditionComponent,
    FsmFixedSiteMonitoringVaccineConditionComponent,
    FsmFixedSiteMonitoringEssentialImmunizationduringSIAComponent,
    FsmFixedSiteMonitoringZeroDoseReferralComponent,
    FsmFixedSiteMonitoringAFPCaseDefinitionComponent,
    SmSuperVisorNecessaryitemsComponent,
    SmSuperVisorTeamMonitornigChecklistComponent,
    SmSuperVisorHRMPVisitsComponent,
    SmSuperVisorHHClusterTakenComponent,
    MtmMobileTeamMonitoringDataRecordingComponent,
    MtmMobileTeamMonitoringRouteMapsComponent,
    MtmMobileTeamMonitoringIPCQuestionsComponent,
    MtmMobileTeamMonitoringZeroDoseRecordingComponent,
    TtmTransitTeamMonitoringCNICComponent,
    HhcHouseHoldClusterGuestChildrenVaccinationComponent,
    HhcHouseHoldClusterFingermarkingStatusComponent,
    HhcHouseHoldClusterEIVaccinationlessthantwoyearsComponent,
    CompFixedSiteUCMOAICComplainceComponent,
    CompFixedSiteOrganizationComplainceComponent,
    CompSupervisorMonitoringUCMOandAICComplainceComponent,
    CompSupervisorMonitoringOrganizationComplainceComponent,
    CompTeammonitoringUCMOandAICComplainceComponent,
    CompTeammonitoringOrganizationComplainceComponent,
    CompMobileTeamMonitoringUCMOandAICComplianceComponent,
    CompMobileTeamOrganizationComplianceComponent,
    CompHouseHoldClusterUCMOandAICComplianceComponent,
    CompHouseHoldOrganizationComplianceComponent,
    CompRegistrationComplianceProvinceLevelComponent,
    CompRegistrationComplianceDivisionLevelComponent,
    CompRegistrationComplianceDistrictLevelComponent,
    CompRegistrationComplianceTehsilLevelComponent,
    CompRegistrationComplianceUCLevelComponent,
    CatchUpHouseHoldClusterPopulationTypeComponent,
    CatchupHouseHoldCheckedComponent,
    CatchupHouseHoldFindingsComponent
  ]
})

export class CustomChartsModule {

}
