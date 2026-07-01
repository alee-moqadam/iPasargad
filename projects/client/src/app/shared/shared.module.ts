import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CounterDirective } from './directives/counter.directive';
import { MustMatchDirective } from './directives/must-match.directive';
import { LoadingButtonComponent } from './components/loading-button/loading-button.component';



@NgModule({
  declarations: [CounterDirective, MustMatchDirective, LoadingButtonComponent],
  imports: [
    CommonModule
  ],
  exports:[
    CounterDirective,
    MustMatchDirective,
    LoadingButtonComponent
  ]
})
export class SharedModule { }
