import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dynamic-select',
  templateUrl: './select.component.html'
})

export class DynamicSelectComponent {
  @Input() values: string[] = [];
  @Output() valueChanged = new EventEmitter<string>();

  onSelectChange(event: any): void {
    this.valueChanged.emit(event.target.value);
  }
}
