import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';

import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  private pets = [];
  //private pet = {};

  private addPetForm: FormGroup;
  private name = new FormControl("", Validators.required);
  private age = new FormControl("", Validators.required);
  private weight = new FormControl("", Validators.required);

  constructor(private http: Http,
              private appService: AppService,
              private formBuilder: FormBuilder) { }


  ngOnInit() {
    this.addPetForm = this.formBuilder.group({
      name: this.name,
      age: this.age,
      weight: this.weight
    });
  }

  addPet() {
    this.appService.addPet(this.addPetForm.value).subscribe(
      res => {
        var newPet = res.json();
        this.pets.push(newPet);
        this.addPetForm.reset();
      },
      error => console.log(error)
    );
  }
  
}
