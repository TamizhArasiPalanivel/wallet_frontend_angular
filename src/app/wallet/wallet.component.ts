import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { WalletService } from './wallet.service';
import { Wallet } from './Wallet';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  providers: [WalletService],
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit {
  constructor(private router: Router, private walletService: WalletService) { }
  public displayWalletForm: Boolean = false;
  public buttonLabel = "Add New Wallet";
  public formdata: any;
  public wallets: Wallet[] = [];
  public page: number = 1;
  public tableSize: number = 5;
  ngOnInit() {
    this.formdata = new FormGroup({
      name: new FormControl(),
      balance: new FormControl()
    });
    this.getAllWallets();
  }
  showWalletForm() {
    this.displayWalletForm = !this.displayWalletForm;
    console.log(this.displayWalletForm)
  }
  createWallet(data: any) {
    this.walletService.addWallet(data).subscribe(wallets => {
      // this.wallets.push(wallets); 
      console.log(this.wallets)
      // localStorage.setItem("walletId",wallets.id )
      this.getAllWallets();
      this.displayWalletForm = false;
    });
    console.log(data);

  }
  routeToTransactions(wallet: Wallet) {
    console.log("routeToTransactionsrouteToTransactions", wallet.id)
    this.router.navigateByUrl('/transactions', { state: { walletId: wallet.id } });
  }
  getWallets(wallet: Wallet[]) {
    this.walletService.getWalletes(wallet).subscribe((wallets: any) => {
      this.wallets.push(wallets);
      console.log("result", Array.isArray(wallets))
    }
    )
  }
  getAllWallets() {
    this.walletService.getAllWallets().subscribe((wallets: any) => { this.wallets = wallets; }
    )
  }
  usePagination(input: any) {
    console.log("input", input);
  }
}
