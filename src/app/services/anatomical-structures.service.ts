import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { catchError } from "rxjs/operators";

// This is the Anatomical Structure service that handles all the service call
@Injectable({
  providedIn: 'root'
})
export class AnatomicalStructuresService {

  constructor( private http: HttpClient ) { }

  // get all of the information from the data
  public getAnatomicalStructures(): Observable<any> {
    const url = 'https://asctb-api.herokuapp.com/v2/18lJe-9fq5fHWr-9HuFTzhWnmfygeuXs2bbsXO8vh1FU/0';
    return this.http.get<any>(url).pipe(
      catchError( err => {
        throw new Error('Get anatomical structures function not implemented');
      })
    )
  }

  // get the structure details by id
  public getStructureDetailByID(ID: string): Observable<any> {
    const url = 'https://www.ebi.ac.uk/ols/api/ontologies/uberon/terms?iri=http://purl.obolibrary.org/obo/'
      + ID.replace(":", "_");
    return this.http.get<any>(url).pipe(
      catchError( err => {
        throw new Error('Get structure detail function not implemented');
      })
    )
  }
}
