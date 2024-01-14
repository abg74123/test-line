import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginLineComponent } from './login-line.component';

const routes: Routes = [
  {path:'',component:LoginLineComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginLineRoutingModule { }
