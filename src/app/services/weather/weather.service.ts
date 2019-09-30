import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  getWeather(): Observable<any> {
    return this.http
      .get<any>('https://api.weatherbit.io/v2.0/current?city=Medellin&key=a1833014fa8c40ea87c22fd16da54acb');
  }

  getDailyWeather(days:any): Observable<any> {
    return this.http
      .get<any>('https://api.weatherbit.io/v2.0/forecast/daily?city=Medellin&days='+days+'&key=a1833014fa8c40ea87c22fd16da54acb');
  }
}
