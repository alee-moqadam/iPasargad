import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/client/src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ExchangeService {

  private apiUrl: string = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  saveExChangeRequest(filter) {
    return this.httpClient.post(
      `${this.apiUrl}/exchange/saveexchangerequest`, filter
    );
  }

}
