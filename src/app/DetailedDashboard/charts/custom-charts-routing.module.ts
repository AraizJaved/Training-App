import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {RegistrationComplianceChartComponent} from "./registration-compliance-chart/registration-compliance-chart.component";

const routes: Routes = [
  {
    path: 'registration-compliance',
    component: RegistrationComplianceChartComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomChartsRoutingModule {

}
