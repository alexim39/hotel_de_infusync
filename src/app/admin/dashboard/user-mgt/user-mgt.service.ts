import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { tap, catchError, retry } from 'rxjs/operators';
import { ServerResponse } from './../../../common/server/response.interface';
import { environment } from 'src/environments/environment';
import { formatDate } from "@angular/common";
import { UserInterface } from 'src/app/core/user.service';

export interface ClientsInterface {
  _id?: string;
  names: string;
  email: string;
  phone: string;
  address: string;
  country: string;
  arrivalDate: Date;
  departureDate: Date;
  people: number;
  room: string;
  services: string;
  creator?: UserInterface | any;
  createdDate?: Date;
  status?: string;
  payment?: string;
}

export interface ClientUpdateInterface {
  id: string;
  status: string;
  payment: string;
}

const httpOptions = {
  withCredentials: true,
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class UserMgtService {
  private readonly API_DOMAIN: string = environment.API_DOMAIN;
  showSpinner: BehaviorSubject<boolean> = new BehaviorSubject(undefined);

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occured. Handle accordingly
      // console.error('An error occured:', error.error.message);
      return throwError(`Request failed due to network error, please try again`);
    } else {
      // Backend returned an unsuccessful response code.
      // The repsonse body contains clues as to what went wrong
      // console.error(`Backend error code: ${error.status}, backend message: ${error.error}`);
      return throwError(error);
    }
    // Return an observable with user-facing error msg
    // return throwError(`Something went wrong, please try again.`)
  }

  // Get all client user
  creatClientBooking(bookingObj: ClientsInterface): Observable<ServerResponse> {
    return this.http.post<ServerResponse>(`${this.API_DOMAIN}/api/client`, bookingObj, httpOptions)
    .pipe(
      //retry(2), // retry a failed request up to 2 times
      catchError(this.handleError),
    );
  }

  // Get all client user
  getAllClients(): Observable<ServerResponse> {
    this.showSpinner.next(true);
    return this.http.get<ServerResponse>(`${this.API_DOMAIN}/api/client/all`, httpOptions)
    .pipe(
      retry(2),
      tap(response => this.showSpinner.next(false), error => this.showSpinner.next(false)),
      catchError(this.handleError)
    );
  }

  // Get a client user
  getAClient(clientId: string): Observable<ServerResponse> {
    this.showSpinner.next(true);
    return this.http.get<ServerResponse>(`${this.API_DOMAIN}/api/client/${clientId}`, httpOptions)
    .pipe(
      retry(2),
      tap(response => this.showSpinner.next(false), error => this.showSpinner.next(false)),
      catchError(this.handleError)
    );
  }

  updateClientStaus(statusUpdateObj: ClientUpdateInterface): Observable<ServerResponse> {
    return this.http.put<ServerResponse>(`${this.API_DOMAIN}/api/client`, statusUpdateObj, httpOptions)
      .pipe(
        retry(2), // retry a failed request up to 2 times
        catchError(this.handleError),
      );
  }

  deleteClient(clientId: string): Observable<ServerResponse> {
    return this.http.delete<ServerResponse>(`${this.API_DOMAIN}/api/client/${clientId}`, httpOptions)
      .pipe(
        retry(2), // retry a failed request up to 2 times
        catchError(this.handleError),
      );
  }


  createDate(postdate: string): string {
    const format = 'MMM d, y';
    //const myDate = '2019-06-29';
    const locale = 'en-US';

    //get todays date
    const todaysDate: Date = new Date();
    // Get start date
    const postDate: Date = new Date(postdate);

    // check if post is today
    if (postDate.setHours(0,0,0,0) == todaysDate.setHours(0,0,0,0)) {
      // Date equals today's date
      return 'Today';
    } else {
      // return formated date
      return formatDate(postdate, format, locale);//postdate;
    }

  }

}
