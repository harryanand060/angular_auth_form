import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ILogin, IResponse, IUserExists } from '../../interfaces/response.interface';
import { catchError } from 'rxjs/operators'


const AUTH_API = 'http://127.0.0.1:8000/api/account';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Accept': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  /**
   * userExist
   */
  public userExist(value: string): Observable<IResponse<IUserExists>> {
    return this.http.get<IResponse<IUserExists>>(`${AUTH_API}/exist/${value}`, httpOptions)
      .pipe(catchError(this.errorHandler))

  }

  /**
   * Login
   */
  public login(userModel: any): Observable<IResponse<ILogin>> {
    return this.http.post<IResponse<ILogin>>(`${AUTH_API}/login`, userModel, httpOptions)
  }

  /**
   * errorHandler
   */
  public errorHandler(error: HttpErrorResponse) {
    let errorMsg = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMsg = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMsg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMsg);
  }

}
