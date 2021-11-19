import { Component, OnInit } from '@angular/core';
import { Row } from "../../interfaces/row";
import { Structure } from "../../interfaces/structure";
import { AnatomicalStructuresService } from "../../services/anatomical-structures.service";
import { MatDialog } from "@angular/material/dialog";
import { catchError, map } from "rxjs/operators";
import { of } from "rxjs";
import { StructureDetailPopupComponent } from "../structure-detail-popup/structure-detail-popup.component";

// Set the dialog width
const DIALOG_WIDTH: string = '1000px';

// this component displays all of the Anatomical Structures Data
@Component({
  selector: 'anatomical-structures',
  templateUrl: './anatomical-structures.component.html',
  styleUrls: ['./anatomical-structures.component.css']
})
export class AnatomicalStructuresComponent implements OnInit {

  // dataSet contains all of data from the backend
  dataSet: Row[] = [];
  // Unique Anatomical Structures stores all the unique anatomical structure
  uniqueAnatomicalStructures: Structure[] = [];
  // checkDuplicate is a helper array that helps to check the duplicate name within the structure
  checkDuplicate: string[] = [];
  // isLoading is a flag indicates if the services is loading/finish
  isLoading: boolean = false;
  // loadingSuccess is a flag indicates if the services is succeed/failed
  loadingSuccess: boolean = false;

  constructor(
    private anatomicStructuresService: AnatomicalStructuresService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getAnatomicalStructures();
  }

  // Get the Anatomical Structures from the backend and parse them in to uniqueAnatomicalStructures
  getAnatomicalStructures(): void {
    this.isLoading = true;
    this.anatomicStructuresService.getAnatomicalStructures().pipe(
      // success: parse the information to dataset and set flags to loading finished and success
      map(result => {
        this.dataSet = result.data;
        this.generateUniqueAnatomicalStructures();
        this.isLoading = false;
        this.loadingSuccess = true;
      }),
      // failed: and set flags to loading finished and failed
      catchError( err => {
        this.isLoading = false;
        this.loadingSuccess = true;
        return of([]);
      })
    ).subscribe();
  }

  // Helps to parse the data to uniqueAnatomicalStructures
  generateUniqueAnatomicalStructures(): void {
    for (const singleData of this.dataSet) {
      for (const structure of singleData.anatomical_structures) {
        // add only if there is no duplicated structure
        if (structure.name != undefined && !this.checkDuplicate.includes(structure.name)) {
          this.uniqueAnatomicalStructures.push(structure);
          this.checkDuplicate.push(structure.name);
        }
      }
    }
  }

  // Opens the dialog contains the information for structure detail
  openStructureDetail(structure: Structure): void {
    const dialogRef = this.dialog.open(StructureDetailPopupComponent, {
      width: DIALOG_WIDTH,
      data: { name: structure.name,
        id: structure.id }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('the structure detail was closed');
    })
  }
}
