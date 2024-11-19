import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { ContentLayoutComponent } from './shared/components/layout/content-layout/content-layout.component';
import { FullLayoutComponent } from './shared/components/layout/full-layout/full-layout.component';
import { content } from "./shared/routes/content-routes";
import { full } from './shared/routes/full.routes';
import { AdminGuard } from './shared/guard/admin.guard';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardChartsComponent } from "./DetailedDashboard/dashboard-charts/dashboard-charts.component";
import { PublicEngagementListComponent } from './DailyEngagements/public-engagement-list/public-engagement-list.component';
import { ParticepantRegisterComponent } from './auth/particepant-register/particepant-register.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'CounterDashboard',
    pathMatch: 'full'
  },

  {
    path: 'dashboard-charts',
    component: DashboardChartsComponent
  },
  {
    path: 'PublicEngagementsList',
    component: PublicEngagementListComponent
  },
  {
    path: 'auth/login',
    component: LoginComponent
  },
  {
    path: 'ParticepantRegister',
    component: ParticepantRegisterComponent
  },
  {
    path: '',
    component: ContentLayoutComponent,
    canActivate: [AdminGuard],
    children: content
  },
  {
    path: '',
    component: FullLayoutComponent,
    canActivate: [AdminGuard],
    children: full
  },
  {
    path: 'charts',
    loadChildren: () => import('./DetailedDashboard/charts/custom-charts.module').then(c => c.CustomChartsModule)
  },
  
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // preloadingStrategy: PreloadAllModules,
    anchorScrolling: 'enabled',
    scrollPositionRestoration: 'enabled',
    relativeLinkResolution: 'legacy'
  })],
  exports: [RouterModule,]
})
export class AppRoutingModule { }
