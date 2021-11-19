import { Component, OnInit } from '@angular/core';
import { AnatomicalStructuresService } from "./services/anatomical-structures.service";
import { catchError, map } from "rxjs/operators";
import { of } from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    private anatomicStructuresService: AnatomicalStructuresService
  ) {}

  ngOnInit() {
    this.getAnatomicalStructures();
  }

  getAnatomicalStructures(): void {
    this.anatomicStructuresService.getAnatomicalStructures().subscribe(
      data => {
        console.log(data);
      }
    )
  }

}
