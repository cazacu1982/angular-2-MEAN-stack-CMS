import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AppService {

  constructor(public http: Http) { }

  private headers = new Headers({ 'content-type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });

  addPet(pet): Observable<any> {
    return this.http.post("http://localhost:3000/pet", JSON.stringify(pet), this.options);
  }
 
}
