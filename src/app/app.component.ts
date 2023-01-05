import { AnimateTimings } from '@angular/animations';
import { DOCUMENT } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, HostListener, Inject } from '@angular/core';
import { EVENT } from './EVENT';
import { eventList1 } from './eventList1';
import { GetEventsService } from './services/get-events.service';
import { GetTagsService } from './services/get-tags.service';
import { taglist } from './taglist';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CN_EventPage';

  events: any = [];
  recieved: any = [];
  recieved2: any = [];
  tags = [];
  tags1: string[] = [];
  tags2: string[] = [];
  wantToSee = "more";
  totalPg = 1;
  
  apiUrl = "https://api.codingninjas.com/api/v3/events";
  api: string = '';
  offset = 0;

  ///////////////// API handling START/////////////////
  constructor(private _getTag: GetTagsService, private _getEvents: GetEventsService, @Inject(DOCUMENT) private document: Document) { }
  ngOnInit() {
    this._getTag.getTag().subscribe((result) => {
      console.log("herfd");
      this.recieved = result;
      this.tags = this.recieved.data.tags;
      console.log(this.recieved);
      for (let i = 0; i < Math.min(10, this.tags.length); i++) {
        this.tags1.push(this.tags[i]);
      }
      for (let i = 9; i < this.tags.length; i++) {
        this.tags2.push(this.tags[i]);
      }
    });
    this.updateAPI();
  }
  callApi() {
    this._getEvents.getEvents(this.api).subscribe((result) => {
      this.recieved2 = result;
      this.events = this.recieved2.data.events;
      this.totalPg = this.recieved2.data.page_count;
      console.log("ghi");
      console.log(this.events);
      for (let i = 0; i < this.events.length; i++) {
        console.log(this.events[i]['name']);
      }
    })
  }
  updateAPI() {
    this.scrollToTop();
    this.api = this.apiUrl
      + "?event_category=" + this.categoryList[this.categoryID]
      + "&event_sub_category=" + this.subCategoryList[this.subCategoryID]
      + "&tag_list=";
    for (let i = 0; i < this.selectedTags.length; i++) {
      if (i == this.selectedTags.length - 1) {
        this.api += this.selectedTags[i];
      }
      else {
        this.api += this.selectedTags[i] + ",";
      }
    }
    this.api += "&offset=" + this.offset;
    // console.log(this.api);
    this._getEvents.getEvents(this.api).subscribe((result) => {
      this.recieved = result;
      // console.log(result);
    });
    this.callApi();
  }
  ///////////////// API handling END/////////////////
  
  
  ///////////////// For headers & tags START/////////////////
  categoryList: String[] = ["ALL_EVENTS", "WEBINAR", "CODING_EVENT", "BOOTCAMP_EVENT", "WORKSHOP"];
  subCategoryList: String[] = ["Upcoming", "Archived", "All_Time_Favorites"];
  selectedTags: string[] = [];
  xtitle = "Archived";
  subCategoryID = 0;
  categoryID = 0;
  
  toggleSeeMore() {
    if (this.wantToSee == "more") this.wantToSee = "less";
    else this.wantToSee = "more";
  }

  setCategoryID(id: number) {
    if (id == 1) this.xtitle = "Recorded";
    else this.xtitle = "Archieved";

    this.categoryID = id;
    this.subCategoryID = 0;
    this.updateAPI();
  }

  setSubCategoryID(id: number) {
    this.subCategoryID = id;
    this.updateAPI();
  }

  addTag(tag: string) {
    const index = this.selectedTags.indexOf(tag);
    if (index > -1) { // only splice array when item is found
      this.selectedTags.splice(index, 1); // 2nd parameter means remove one item only
    }
    else {
      this.selectedTags.push(tag); // 2nd parameter means remove one item only
    }
    this.updateAPI();
  }
  ///////////////// For headers & tags END/////////////////
  

  ///////////////// For paging START/////////////////
  currPage = 1;
  prevPage() {
    if (this.currPage == 1) return;
    this.currPage--;
    this.offset -= 20;
    this.updateAPI();
  }
  nextPage() {
    if (this.currPage + 1 > this.totalPg) return;
    this.currPage++;
    this.offset += 20;
    this.updateAPI();
  }
  ///////////////// For paging END/////////////////


  ///////////////// For searching START/////////////////
  searchItem: string;
  searchVar = -1;
  search(tag: string) {
    const index = this.tags1.indexOf(tag);
    if (index > -1) {
      this.searchVar = 1;
      this.tags1.slice(index, 1);
    }
    else {
      const index = this.tags2.indexOf(tag);
      if (index > -1) {
        this.searchVar = 2;
        this.tags2.slice(index, 1);
      }
      else this.searchVar = 0;
    }
  }
  clearSearch() {
    if (this.searchVar == 1) {
      this.tags1.push(this.searchItem);
    }
    if (this.searchVar == 2) {
      this.tags1.push(this.searchItem);
    }
    this.searchVar = -1;
    this.searchItem = '';
  }
  ///////////////// For searching END/////////////////


  /////////////////For window Scrolling START/////////////////
  windowScrolled: boolean;
  @HostListener("window:scroll", [])
  onWindowScroll() {
    if (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop > 100) {
      this.windowScrolled = true;
    }
    else if (this.windowScrolled && window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop < 10) {
      this.windowScrolled = false;
    }
  }
  scrollToTop() {
    window.scrollTo(0, 0);
  }
  scroll(el: HTMLElement) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
  /////////////////For window Scrolling END/////////////////
}


