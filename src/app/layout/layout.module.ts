import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { NadvarComponent } from './nadvar/nadvar.component';
import { LayoutComponent } from './layout.component';


@NgModule({
  declarations: [
    NadvarComponent,
    LayoutComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule
  ]
})
export class LayoutModule { }
