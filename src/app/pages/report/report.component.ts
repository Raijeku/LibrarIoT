import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { SmartTableData } from '../../@core/data/smart-table';


import { NoiseComponent } from '../dashboard/noise/noise.component';
import { NoiseService } from '../../services/noise/noise.service';
import { Noise } from '../../models/noise';
import { Observable } from 'rxjs';
import { NbDateService } from '@nebular/theme';

/*import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    ReportComponent,
    NoiseComponent
  ],
  imports: [
    CommonModule
  ]
})*/

@Component({
  selector: 'ngx-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  min: Date;
  max: Date;

  end: Date;
  start: Date;
  
  counter: number = 0;
  model;

  constructor(private noiseService: NoiseService, protected dateService: NbDateService<Date>) { 
    this.min = this.dateService.addDay(this.dateService.today(), -5);
    this.max = this.dateService.addDay(this.dateService.today(), 5);
    this.noiseService.getNoise().subscribe(data => {
      this.source.load(data);
    })
    
  }

  ngOnInit() {
  }

  settings = {
    actions: false, 
    columns: {
      fecha: {
        title: 'Fecha',
        type: 'string',
      },
      nRuido: {
        title: 'Nivel de Ruido',
        type: 'number',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();


  show(dates){
    this.counter++;
    if(this.counter%2==0){
      this.start=dates.start;
      this.end=dates.end;
      /*this.noiseService.getNoiseByDates(this.start, this.end).subscribe(data => {
        this.source.load(data);
      });*/
      this.noiseService.getCriticalNoiseByDates(this.start, this.end).subscribe(data => {
        this.source.load(data);
      });
    }
  }

}
