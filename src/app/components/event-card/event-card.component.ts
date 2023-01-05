import { Component, Input } from '@angular/core';
import { EVENT } from 'src/app/EVENT';
import { GetEventsService } from 'src/app/services/get-events.service';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.css']
})
export class EventCardComponent {
  @Input() event:any;
  tags : Array<string> = [];

  eventName!:string;
  eventPoster!:string;
  eventStartTime!:any;
  eventRegTime!:any;
  eventEntryFee!:any;
  eventVenue!:any;
  eventStatus!:any;
  eventDescription!:string;
  cardTags!: Array<string>;
  extraTag = 0;
  registerLink!:string;
  eventUsers!:Array<any>;
  otherUsers!: string;

  ngOnInit(){
    this.eventName=this.event['name']; 
    this.eventPoster=this.event['cover_picture'];
    this.eventStartTime=this.event['event_start_time'] * 1000;
    this.eventRegTime=this.event['registration_end_time'] * 1000;
    this.eventEntryFee="Entry Fee";
    this.eventVenue=this.event['venue'];
    this.eventDescription=this.event['short_desc'];
    this.cardTags = this.event['card_tags'];
    this.registerLink='https://www.codingninjas.com/events/' + this.event['slug']; 
    this.eventStatus=this.event['registration_status'];
    this.eventUsers = this.event['registered_users']['top_users'];
    this.otherUsers =this.event['registered_users']['other_users_count'];

    for(let i=0;i<this.cardTags.length;i++){
      if(i<=2){
        this.tags.push(this.cardTags[i]);
      }else{
        this.extraTag++;
      }
    }
  }
}
