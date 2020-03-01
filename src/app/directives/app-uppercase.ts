import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appUppercase]',
  host: {
    '(input)': 'ref.nativeElement.value=$event.target.value.toUpperCase()',
  }
})
export class AppUppercase {
  constructor(
    private ref: ElementRef
  ) {}
}