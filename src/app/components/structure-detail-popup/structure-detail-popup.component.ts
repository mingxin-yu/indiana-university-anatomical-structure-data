import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { AnatomicalStructuresService } from "../../services/anatomical-structures.service";
import { catchError, map } from "rxjs/operators";
import { of } from "rxjs";
import { StructureDetail } from "../../interfaces/structureDetail";

// this component displays the detail information of the current structure
@Component({
  selector: 'structure-detail-popup',
  templateUrl: './structure-detail-popup.component.html',
  styleUrls: ['./structure-detail-popup.component.css']
})
export class StructureDetailPopupComponent implements OnInit {

  // stores the detail informaion of the current structure
  detail!: StructureDetail;
  // isLoading is a flag indicates if the services is loading/finish
  isLoading: boolean = false;
  // loadingSuccess is a flag indicates if the services is succeed/failed
  loadingSuccess: boolean = false;

  constructor(
    private anatomicalStructuresService: AnatomicalStructuresService,
    public dialogRef: MatDialogRef<StructureDetailPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.getStructureDetail();
  }

  // handles the structure detail information and parse them into detail
  getStructureDetail(): void {
    this.isLoading = true;
    this.anatomicalStructuresService.getStructureDetailByID(this.data.id).pipe(
      // success: parse the information to detail and set flags to loading finished and success
      map( result => {
        // build the detail
        this.detail = {
          description: result._embedded.terms[0].annotation.definition,
          iri: result._embedded.terms[0].iri,
          name: this.data.name,
          ontologyLink: result._embedded.terms[0].obo_id
        }
        this.isLoading = false;
        this.loadingSuccess = true;
      }),
      // failed: and set flags to loading finished and failed
      catchError( err => {
        this.isLoading = false;
        this.loadingSuccess = false;
        return of([]);
      })
    ).subscribe();
  }
}
