import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WalletComponent } from './wallet/wallet.component';
import { TransactionsComponent } from './transactions/transactions.component';

const routes: Routes = [
  { path: '', component: WalletComponent },
  { path: 'transactions', component: TransactionsComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
