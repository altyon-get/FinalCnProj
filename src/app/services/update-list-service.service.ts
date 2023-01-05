import { I18nPluralPipe } from '@angular/common';
import { Injectable, Input } from '@angular/core';
import { Observable, of } from 'rxjs';
import { EVENT } from '../EVENT';
import { eventList1 } from '../eventList1';

@Injectable({
  providedIn: 'root'
})
export class UpdateListServiceService {
  newarr: EVENT[]=[];
  constructor() { }
  updateList(id:number) {
    console.log(id);
    this.newarr=[];
    for(let i=0;i<eventList1.length;i++){
      if(eventList1[i].id==id){
        this.newarr.push(eventList1[i]);
      }
    }
  }
  getEvents(): Observable<EVENT[]>{
    const newarr=of(this.newarr);
    return newarr;
  }

}
