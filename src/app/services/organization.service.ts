
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { Organization } from '../model/organization';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {


  constructor(private http: HttpClient) { }

  getOrganizationsList(): Observable<Organization[]> {
    return this.http.get<Organization[]>('/assets/organizationList.json');
  }

}