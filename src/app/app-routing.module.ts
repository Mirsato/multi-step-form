import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NextStepComponent } from './next-step/next-step.component';
import { FirstStepComponent } from './first-step/first-step.component';
import { LastStepComponent } from './last-step/last-step.component';
import { ResultComponent } from './result/result.component';

const routes: Routes = [
  { path: '', component: FirstStepComponent },   
  { path: 'step2', component: NextStepComponent },
  { path: 'last', component: LastStepComponent },
  { path: 'result', component: ResultComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
