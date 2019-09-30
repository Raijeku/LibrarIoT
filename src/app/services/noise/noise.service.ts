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
    return this.http
      .get<Noise[]>('assets/data/noise.json');
  }

  getNoiseByDates(start: Date, end: Date): Observable<Noise[]> {
    return this.http
      .get<Noise[]>('assets/data/noise.json');
  }

  getCriticalNoiseByDates(start: Date, end: Date): Observable<Noise[]> {
    return this.http
      .get<Noise[]>('assets/data/noise.json');
  }

}