import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetEventsService {

  constructor(private http: HttpClient) { }
  

  getEvents(url:string){
    return this.http.get(url);
  }
}
