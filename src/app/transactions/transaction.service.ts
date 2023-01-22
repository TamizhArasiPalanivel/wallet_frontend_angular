import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Transaction } from './transaction';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})

export class TransactionService {
  public tranURLs = {
    "add": "http://localhost:3025/transact",
    "get": 'http://localhost:3025/transactions',
    "export": 'http://localhost:3025/transactions/export'
  }

  // error handling
  public handleError(error: any) {
    return of(error);
  }
  
  constructor(
    private http: HttpClient) {
  }

  /** GET wallets */
  getTransactions(walletId: number, pagination: any): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(
      this.tranURLs.get + `?walletId=${walletId}&skip=${pagination.skip}&limit=${pagination.limit}&sortBy=${pagination.sortBy}&orderBy=${pagination.orderBy}`
    )
      .pipe(
        catchError(this.handleError)
      );
  }

  /** POST: add a new wallet to the database */
  addTransaction(transaction: Transaction, walletId: number): Observable<Transaction> {
    return this.http.post<Transaction>(this.tranURLs.add + `/${walletId}`, transaction, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  /** Export transaction */
  exportTransactions(walletId: number, pagination: any): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(
      this.tranURLs.export + `?walletId=${walletId}&skip=${pagination.skip}&limit=${pagination.limit}&sortBy=${pagination.sortBy}&orderBy=${pagination.orderBy}`
      , { observe: 'body', responseType: 'text' as 'json' })
      .pipe(
        catchError(this.handleError)
      );
  }
}