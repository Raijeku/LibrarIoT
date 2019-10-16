import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Noise } from '../../models/noise';


@Injectable({
  providedIn: 'root'
})
export class NoiseService {

  constructor(private http: HttpClient) { }
  getNoise(): Observable<Noise[]> {
    return this.http.get<Noise[]>('../../../assets/data/noise.json');
    /*return this.http
      .get<Noise[]>('http://192.168.43.64:8080/iot/data');*/
  }

  getNoiseByDates(start: Date, end: Date): Observable<Noise[]> {
    return this.http.get<Noise[]>('../../../assets/data/noise.json');
    /*return this.http
      .get<Noise[]>('http://192.168.43.64:8080/iot/dateReport?date1='+start.getFullYear()+'-'+start.getMonth()+'-'+start.getDate()+'T'+start.getHours()+':'+start.getMinutes()+':'+start.getSeconds()+'.0&date2='+end.getFullYear()+'-'+end.getMonth()+'-'+end.getDate()+'T'+end.getHours()+':'+end.getMinutes()+':'+end.getSeconds()+'.0');
    */
  }

  getCriticalNoiseByDates(start: Date, end: Date): Observable<Noise[]> {
    return this.http.get<Noise[]>('../../../assets/data/noise.json');
    /*return this.http
      .get<Noise[]>('http://192.168.43.64:8080/iot/noiseLevel?date1='+start.getFullYear()+'-'+start.getMonth()+'-'+start.getDate()+'T'+start.getHours()+':'+start.getMinutes()+':'+start.getSeconds()+'.0&date2='+end.getFullYear()+'-'+end.getMonth()+'-'+end.getDate()+'T'+end.getHours()+':'+end.getMinutes()+':'+end.getSeconds()+'.0');
    */
  }


}