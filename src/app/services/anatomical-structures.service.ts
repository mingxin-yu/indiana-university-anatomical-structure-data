import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AnatomicalStructuresService {

  constructor(
    private http: HttpClient
  ) { }

  public getAnatomicalStructures(): Observable<any> {
    const url = 'https://asctb-api.herokuapp.com/v2/18lJe-9fq5fHWr-9HuFTzhWnmfygeuXs2bbsXO8vh1FU/0';
    return this.http.get<any>(url).pipe(
      catchError( err => {
        throw new Error('Get anatomical structures function not implemented');
      })
    )
  }

  public getSomethingByID(): Observable<any> {
    const url = 'https://www.ebi.ac.uk/ols/api/ontologies/uberon/terms?iri=http://purl.obolibrary.org/obo/UBERON_0002302';
    return this.http.get<any>(url).pipe(
      catchError( err => {
        throw new Error('Get anatomical structures function not implemented');
      })
    )
  }


}
