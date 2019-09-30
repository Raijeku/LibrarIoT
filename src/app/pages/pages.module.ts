import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { LoginComponent } from './login/login.component';
import { ReportModule } from './report/report.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';


@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    ReportModule,
    MiscellaneousModule,
  ],
  declarations: [
    PagesComponent,
    LoginComponent,
  ],
})
export class PagesModule {
}
