import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Wallet } from './Wallet';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class WalletService {
  public wallet = {
    "add": "http://localhost:3025/setup",
    "get": "http://localhost:3025/wallet",
    "getAllWallets": "http://localhost:3025/allWallet"
  }

  // error handling
  public handleError(error: any) {
    return of(error);
  }
  
  constructor(
    private http: HttpClient) {
  }

  /** GET wallets */
  getWalletes(wallet: Wallet[]): Observable<Wallet[]> {
    return this.http.get<Wallet[]>(this.wallet.get+`/${wallet[0].id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  /** POST: add a new wallet to the database */
  addWallet(wallet: Wallet): Observable<Wallet> {
    return this.http.post<Wallet>(this.wallet.add, wallet, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  /** GET all wallets */
  getAllWallets(): Observable<Wallet[]> {
    return this.http.get<Wallet[]>(this.wallet.getAllWallets)
      .pipe(
        catchError(this.handleError)
      );
  }
}