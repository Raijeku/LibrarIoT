import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private roomSource = new BehaviorSubject(0);
  currentRoom = this.roomSource.asObservable();

  constructor() { } 

  changeRoom(room: number) {
    this.roomSource.next(room);
  }
}
