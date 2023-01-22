import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TransactionService } from './transaction.service';
import { Transaction } from './transaction';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  constructor(private router: Router, private transactionService: TransactionService) { }
  public displayTransactionForm: Boolean = false;
  public formdata: any;
  public transaction: Transaction[] = [];
  public walletId: number = 0;
  public page: number = 1;
  public tableSize: number = 10;
  ngOnInit() {
    this.walletId = window.history?.state?.walletId;
    this.formdata = new FormGroup({
      amount: new FormControl(),
      description: new FormControl()
    });
    this.getTransactions();
  }
  showTransationForm() {
    this.displayTransactionForm = true;
  }
  onClickSubmit(data: any) { console.log(data) }
  addTransaction(data: any) {
    console.log("this.walletIdthis.walletId", this.walletId)
    this.transactionService.addTransaction(data, this.walletId).subscribe(wallets => {
      this.transaction.push(wallets); console.log(this.transaction);
      this.displayTransactionForm = false;
      this.getTransactions();
    });
    console.log(data);

  }
  routeToTransactions() {
    this.router.navigate(['/']);
  }
  getTransactions() {
    let pagination = {
      skip: 0,
      limit: -1,
      sortBy: "balance",
      orderBy: "desc"
    }
    this.transactionService.getTransactions(this.walletId, pagination).subscribe((transactions: any) => {
      this.transaction = transactions;
    }
    )
  }
  exportTransactions() {
    let pagination = {
      skip: 0,
      limit: -1,
      sortBy: "balance",
      orderBy: "desc"
    }
    this.transactionService.exportTransactions(this.walletId, pagination).subscribe((transactions: any) => {
      console.log(transactions, "transactions")
      const a = document.createElement("a");
      a.href = "data:text/csv," + transactions;
      let filename = "wallet_" + this.walletId + "_transactions";
      a.setAttribute("download", filename + ".csv");
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
    )
  }
  callthis(input: any) {
    console.log("input", input);
  }
  backToWallet() {
    this.router.navigateByUrl('/');
  }
}
