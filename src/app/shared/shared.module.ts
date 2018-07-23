import {NgModule} from "@angular/core";
import {DropdownDirective} from "../directive/dropdown-directive.component";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
    DropdownDirective
  ],
  exports: [
    CommonModule,
    DropdownDirective
  ]
})
export class SharedModule {

}
