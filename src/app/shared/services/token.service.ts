import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt'

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  public jwtHelper: JwtHelperService = new JwtHelperService();

  /**
  * setToken
  */
  public static setToken(token: string): void {
    localStorage.setItem('auth_key', token)
  }

  /**
   * getToken
   */
  public getToken(): string {
    return localStorage.getItem('auth_key')
  }


  /**
   * isAuthenticated
   */
  public isAuthenticated(): boolean {
    const token = this.getToken()
    // Check whether the token is expired and return
    // true or false
    // console.log(this.jwtHelper.getTokenExpirationDate(token))
    return !!this.jwtHelper.isTokenExpired(token);
  }
}
