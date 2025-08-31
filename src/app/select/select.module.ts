import { NgModule } from '@angular/core';
import { DynamicSelectComponent } from './select.component';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        DynamicSelectComponent
    ],
    imports: [CommonModule],
    exports: [DynamicSelectComponent]
})
export class SelectModule { }
