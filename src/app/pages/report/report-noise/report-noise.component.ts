import { Component, OnInit, Input } from '@angular/core';
import { NbThemeService, NbColorHelper } from '@nebular/theme';
import { NoiseService } from '../../../services/noise/noise.service';
import { Noise } from '../../../models/noise';
import { ChartCommonModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'ngx-report-noise',
  templateUrl: './report-noise.component.html',
  styleUrls: ['./report-noise.component.scss']
})
export class ReportNoiseComponent implements OnInit {
  data: any;
  counter: number = 0;
  sumMinutes: number;
  sumHours: number;
  sumDays: number;
  noiseData: Noise[] = [];
  noiseDataMinutes: Noise[] = [];
  noiseDataHours: Noise[] = [];
  noiseDataDays: Noise[] = [];
  selectedNoiseData: Noise[] = [];
  noiseDataNumbers: number[] = [];
  noiseDataDates: string[] = [];
  timeInterval: number;
  options: any;  
  themeSubscription: any;
  echartsInstance;
  type = 'seconds';
  types = ['seconds', 'minutes', 'hours', 'days'];

  @Input() startDate: Date;
  @Input() endDate: Date;


  constructor(private theme: NbThemeService, private noiseService: NoiseService) {
    this.timeInterval=5;
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      this.noiseService.getNoiseByDates(this.startDate, this.endDate).subscribe(noise=>{
        this.noiseData=noise;
        this.selectedNoiseData=noise;
        for(let noiseRegister of noise){
          this.sumMinutes=this.sumMinutes+noiseRegister.ruido;
          this.sumHours=this.sumHours+noiseRegister.ruido;
          this.sumDays=this.sumDays+noiseRegister.ruido;
          if(this.counter%(60/this.timeInterval)==0){
            //this.noiseDataMinutes.push(new Noise(this.sumMinutes/(60/this.timeInterval),noiseRegister.fecha));
            this.sumMinutes=0;
          }
          if(this.counter%(3600/this.timeInterval)==0){
            //this.noiseDataHours.push(new Noise(this.sumHours/(3600/this.timeInterval),noiseRegister.fecha));
            this.sumHours=0;
          }
          if(this.counter%(86400/this.timeInterval)==0){
            //this.noiseDataDays.push(new Noise(this.sumDays/(86400/this.timeInterval),noiseRegister.fecha));
            this.sumDays=0;
          }
          this.counter=this.counter+1;
        }
        const colors: any = config.variables;
      const echarts: any = config.variables.echarts;

      this.options = {
        backgroundColor: echarts.bg,
        color: [colors.danger, colors.primary, colors.info],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c}',
        },
        legend: {
          left: 'left',
          data: ['Area 1', 'Line 2', 'Line 3'],
          textStyle: {
            color: echarts.textColor,
          },
        },
        xAxis: [
          {
            type: 'category',
            data: this.selectedNoiseData.map(register=>register.fecha),
            axisTick: {
              alignWithLabel: true,
            },
            axisLine: {
              lineStyle: {
                color: echarts.axisLineColor,
              },
            },
            axisLabel: {
              textStyle: {
                color: echarts.textColor,
              },
            },
          },
        ],
        yAxis: [
          {
            axisLine: {
              lineStyle: {
                color: echarts.axisLineColor,
              },
            },
            splitLine: {
              lineStyle: {
                color: echarts.splitLineColor,
              },
            },
            axisLabel: {
              textStyle: {
                color: echarts.textColor,
              },
            },
          },
        ],
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        series: [
          {
            name: 'Area 1',
            type: 'line',
            data: this.selectedNoiseData.map(register=>register.ruido),
          },
        ],
      };
    });
        /*
        const colors: any = config.variables;
      const chartjs: any = config.variables.chartjs;
      this.data = {
        labels: this.noiseData.map(register=>register.fecha),
        datasets: [{
          data: this.noiseData.map(register=>register.ruido),
          label: 'Series A',
          backgroundColor: NbColorHelper.hexToRgbA(colors.primary, 0.3),
          borderColor: colors.primary,
        }, {
          data: [this.selectedNoiseData[0].ruido, this.selectedNoiseData[1].ruido, this.selectedNoiseData[2].ruido, this.selectedNoiseData[3].ruido, 86, 27, 90],
          label: 'Series B',
          backgroundColor: NbColorHelper.hexToRgbA(colors.danger, 0.3),
          borderColor: colors.danger,
        }, {
          data: [18, 48, 77, 9, 100, 27, 40],
          label: 'Series C',
          backgroundColor: NbColorHelper.hexToRgbA(colors.info, 0.3),
          borderColor: colors.info,
        },
        ],
      };

      this.options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              gridLines: {
                display: true,
                color: chartjs.axisLineColor,
              },
              ticks: {
                fontColor: chartjs.textColor,
              },
            },
          ],
          yAxes: [
            {
              gridLines: {
                display: true,
                color: chartjs.axisLineColor,
              },
              ticks: {
                fontColor: chartjs.textColor,
              },
            },
          ],
        },
        legend: {
          labels: {
            fontColor: chartjs.textColor,
          },
        },
      };

      });*/
      
    });



    


  }

  ngOnInit() {

  }

  onChange(time:any){
    
    if (time=="seconds") {
      this.noiseDataNumbers = this.noiseData.map(register=>register.ruido);
      this.noiseDataDates = this.noiseData.map(register=>register.fecha);
    } else if (time=="minutes"){
      this.noiseDataNumbers = this.noiseDataMinutes.map(register=>register.ruido);
      this.noiseDataDates = this.noiseData.map(register=>register.fecha);
    } else if (time=="hours"){
      this.noiseDataNumbers = this.noiseDataHours.map(register=>register.ruido);
      this.noiseDataDates = this.noiseData.map(register=>register.fecha);
    } else if (time=="days"){
      this.noiseDataNumbers = this.noiseDataDays.map(register=>register.ruido);
      this.noiseDataDates = this.noiseData.map(register=>register.fecha);
    }
    this.echartsInstance.setOption({
      series: [{
        data: this.noiseDataNumbers,
      }],
      xAxis: [{
        data: this.noiseDataDates,
      }]
    });
  }

  onChartInit(ec) {
    this.echartsInstance = ec;
  }

}
