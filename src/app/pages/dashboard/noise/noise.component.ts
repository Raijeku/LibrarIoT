import { Component, OnInit, OnDestroy } from '@angular/core';
import { NbThemeService, NbColorHelper } from '@nebular/theme';
import { NoiseService } from '../../../services/noise/noise.service';
import { Noise } from '../../../models/noise';
import { ChartCommonModule } from '@swimlane/ngx-charts';
import { MqttService, IMqttMessage } from 'ngx-mqtt';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ngx-noise',
  templateUrl: './noise.component.html',
  styleUrls: ['./noise.component.scss']
})
export class NoiseComponent implements OnInit, OnDestroy {
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
  private subscription: Subscription;
  public message: string;


  constructor(private theme: NbThemeService, private noiseService: NoiseService/*, private _mqttService: MqttService*/) {
    this.timeInterval=5;
    
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
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
            data: this.selectedNoiseData.map(register=>register.date),
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
      

    /*this.subscription = this._mqttService.observe('my/topic').subscribe((message: IMqttMessage) => {
      this.message = message.payload.toString();
    });*/
        /*
        const colors: any = config.variables;
      const chartjs: any = config.variables.chartjs;
      this.data = {
        labels: this.noiseData.map(register=>register.date),
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


    /*this.noiseService.getNoise().subscribe(noise=>{
      console.log(noise);
    });*/
    


  }

  ngOnInit() {
    this.noiseService.getNoise().subscribe(noise=>{
      console.log(noise);
      this.noiseData=noise;
      this.selectedNoiseData=noise;
      for(let noiseRegister of noise){
        this.sumMinutes=this.sumMinutes+noiseRegister.ruido;
        this.sumHours=this.sumHours+noiseRegister.ruido;
        this.sumDays=this.sumDays+noiseRegister.ruido;
        if(this.counter%(60/this.timeInterval)==0){
          //this.noiseDataMinutes.push(new Noise(this.sumMinutes/(60/this.timeInterval),noiseRegister.date));
          this.sumMinutes=0;
        }
        if(this.counter%(3600/this.timeInterval)==0){
          //this.noiseDataHours.push(new Noise(this.sumHours/(3600/this.timeInterval),noiseRegister.date));
          this.sumHours=0;
        }
        if(this.counter%(86400/this.timeInterval)==0){
          //this.noiseDataDays.push(new Noise(this.sumDays/(86400/this.timeInterval),noiseRegister.date));
          this.sumDays=0;
        }
        this.counter=this.counter+1;
      }

  });
  this.echartsInstance.setOption({
    series: [{
      data: this.selectedNoiseData.map(register=>register.ruido),
    }],
    xAxis: [{
      data: this.selectedNoiseData.map(register=>register.date),
    }]
  });
  }

  onChange(time:any){
    
    if (time=="seconds") {
      this.noiseDataNumbers = this.noiseData.map(register=>register.ruido);
      this.noiseDataDates = this.noiseData.map(register=>register.date);
    } else if (time=="minutes"){
      this.noiseDataNumbers = this.noiseDataMinutes.map(register=>register.ruido);
      this.noiseDataDates = this.noiseData.map(register=>register.date);
    } else if (time=="hours"){
      this.noiseDataNumbers = this.noiseDataHours.map(register=>register.ruido);
      this.noiseDataDates = this.noiseData.map(register=>register.date);
    } else if (time=="days"){
      this.noiseDataNumbers = this.noiseDataDays.map(register=>register.ruido);
      this.noiseDataDates = this.noiseData.map(register=>register.date);
    }
    this.echartsInstance.setOption({
      series: [{
        data: this.noiseDataNumbers,
      }],
      xAxis: [{
        data: this.noiseDataDates,
      }]
    });
    console.log(this.noiseDataNumbers);
  }

  addData(newNoise: Noise, time:any){
    let newLength =this.noiseData.push(newNoise);
    let sumMinutes = 0;
    let sumHours = 0;
    let sumDays = 0;
    if (newLength%(60/this.timeInterval)==0){
      for (let i = newLength-(60/this.timeInterval); i < newLength; i++) {
        sumMinutes+=this.noiseData[i].ruido;
      }
      //this.noiseDataMinutes.push(new Noise(sumMinutes/(60/this.timeInterval),newNoise.date));
    }
    if(newLength%(3600/this.timeInterval)==0){
      for (let i = newLength-(60/this.timeInterval); i < newLength; i++) {
        sumHours+=this.noiseData[i].ruido;
      }
      //this.noiseDataHours.push(new Noise(sumHours/(3600/this.timeInterval),newNoise.date));
    }
    if(newLength%(86400/this.timeInterval)==0){
      for (let i = newLength-(60/this.timeInterval); i < newLength; i++) {
        sumDays+=this.noiseData[i].ruido;
      }
      //this.noiseDataHours.push(new Noise(sumDays/(86400/this.timeInterval),newNoise.date));
    }
    if (time=="seconds") {
      this.noiseDataNumbers = this.noiseData.map(register=>register.ruido);
      this.noiseDataDates = this.noiseData.map(register=>register.date);
    } else if (time=="minutes"){
      this.noiseDataNumbers = this.noiseDataMinutes.map(register=>register.ruido);
      this.noiseDataDates = this.noiseDataMinutes.map(register=>register.date);
    } else if (time=="hours"){
      this.noiseDataNumbers = this.noiseDataHours.map(register=>register.ruido);
      this.noiseDataDates = this.noiseDataHours.map(register=>register.date);
    } else if (time=="days"){
      this.noiseDataNumbers = this.noiseDataDays.map(register=>register.ruido);
      this.noiseDataDates = this.noiseDataDays.map(register=>register.date);
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

  public ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
