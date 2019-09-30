import { NgModule } from '@angular/core';
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbTabsetModule,
  NbUserModule,
  NbRadioModule,
  NbSelectModule,
  NbListModule,
  NbIconModule,
  NbDatepickerModule,
  NbInputModule,
} from '@nebular/theme';
import { CommonModule } from '@angular/common';
import { ReportComponent } from './report.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ReportNoiseComponent } from './report-noise/report-noise.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ReportComponent,
    ReportNoiseComponent,
  ],
  imports: [
    CommonModule,
    NbCardModule,
    NbUserModule,
    NbButtonModule,
    NbTabsetModule,
    NbActionsModule,
    NbRadioModule,
    NbSelectModule,
    NbListModule,
    NbIconModule,
    NbButtonModule,
    Ng2SmartTableModule,
    NgxEchartsModule,
    NbDatepickerModule,
    NbInputModule,
    FormsModule,
  ]
})
export class ReportModule { }
