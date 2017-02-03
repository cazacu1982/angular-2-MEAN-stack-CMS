import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map'

import  'underscore';

import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  //title = 'app works!';

  constructor( private http: Http, private appService: AppService) { }

  // array of all items to be paged

  private  allItems: any[];
  // pager object

  pager: any = {};

  //pagedItems

  pagedItems: any[];

  ngOnInit() {

      this.http.get('http://localhost:3000/pets')
     // this.http.get('http://jsonplaceholder.typicode.com/comments/')
      .map((response: Response) => response.json())
      .subscribe(data => {
        //set items to json res
        this.allItems = data;

        //initialize to page 1
        this.setPage(1);
      });

  }

  setPage (page: number) {
    if (page < 1 || page > this.pager.totalPages ) {
      return;
    }
    // get pager object from service
    this.pager = this.appService.getPager(this.allItems.length, page);

    // get current page of items
    this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);

  }


}
