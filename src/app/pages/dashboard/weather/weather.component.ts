import { Component, OnDestroy } from '@angular/core';
import { Observable, of, Subject, timer } from 'rxjs';
import { takeUntil, switchMap, catchError } from 'rxjs/operators';
import { WeatherService } from '../../../services/weather/weather.service';

@Component({
  selector: 'ngx-weather',
  styleUrls: ['./weather.component.scss'],
  templateUrl: './weather.component.html',
})

export class WeatherComponent implements OnDestroy{

  /*private killTrigger: Subject<void> = new Subject();
  private fetchData : Observable<any> = this.weatherService.getWeather();
  

  private refreshInterval: Observable<any> = timer(0, 600000)
  .pipe(
    // This kills the request if the user closes the component 
    takeUntil(this.killTrigger),
    // switchMap cancels the last request, if no response have been received since last tick
    switchMap(() => this.fetchData),
    // catchError handles http throws 
    catchError(error => of('Error'))
  );

    public weatherData: Observable<any> = this.refreshInterval;*/

  weatherData: any;
  dailyWeatherData: any;

  constructor(private weatherService: WeatherService) { 
    /*this.weatherData.subscribe(val =>this.weatherData=val)*/
    const counter = timer(0,600000);
    counter.subscribe(value => {
      weatherService.getWeather().subscribe(weather => {
        this.weatherData=weather;
      });
      weatherService.getDailyWeather(4).subscribe(dailyWeather => {
        this.dailyWeatherData=dailyWeather;
      })
      
    })
  }

  ngOnDestroy(){
    //this.killTrigger.next();
  }
}
