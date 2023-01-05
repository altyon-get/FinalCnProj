import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetTagsService {

  constructor(private http: HttpClient) { }
  url="https://api.codingninjas.com/api/v3/event_tags";

  getTag(){
    return this.http.get(this.url);
  }
}
