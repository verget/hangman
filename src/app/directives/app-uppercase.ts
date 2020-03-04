import {
  Directive,
  ElementRef,
  HostListener,
  Output,
  EventEmitter
} from '@angular/core'
import { NgControl } from '@angular/forms'

@Directive({
  selector: '[appUpperCase]'
})
export class AppUppercase {
  constructor(
    private el: ElementRef,
    private control: NgControl
  ) {}

  @HostListener('input', ['$event']) onInputChange($event) {
    const value = this.el.nativeElement.value.toUpperCase()
    this.control.control.setValue(value)
  }
}
