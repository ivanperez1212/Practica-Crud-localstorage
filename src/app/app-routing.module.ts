import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'login',
    pathMatch: 'full'
  },
  {
  path:'',
  component:LayoutComponent,
  children:[
    {
      path:'dashboard',
      loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule)
    },
    {
      path:'update',
      loadChildren: () => import('./pages/update/update.module').then(m => m.UpdateModule)
    }
  ]
},
{
  path:'login',
  loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
},
{
  path:'register',
  loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterModule)
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
