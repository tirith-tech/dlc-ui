import { NgModule }               from '@angular/core';
import { CommonModule }           from '@angular/common';
import {
  RouterModule,
  Routes,
}                                 from '@angular/router';
import { NgbAccordionModule }     from '@ng-bootstrap/ng-bootstrap';
import { DocumentationComponent } from './documentation.component';

const routes: Routes = [
  {
    path: '',
    component: DocumentationComponent
  }
]


@NgModule({
  declarations: [
    DocumentationComponent
  ],
            imports: [
              CommonModule,
              RouterModule.forChild(routes),
              NgbAccordionModule,
            ],
          })
export class DocumentationModule { }
