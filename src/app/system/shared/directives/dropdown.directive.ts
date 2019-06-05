import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
	selector: '[wfmDropdown]',
})
export class DropdownDirective {
	constructor(private el: ElementRef) {}

	@HostListener('document:click', ['$event'])
	onDropdownClick(event) {
		let target = event.target;

		// Close when clicking outside the dropdown
		if (!this.el.nativeElement.contains(target)) {
			this.el.nativeElement.classList.remove('open');
			return;
		}

		// Toggle when clicking inside the dropdown (on a dropdown link)
		while (target !== this.el.nativeElement.parentNode) {
			if (target.hasAttribute('data-drop-link')) {
				event.preventDefault();
				this.el.nativeElement.classList.toggle('open');
				break;
			}
			target = target.parentNode;
		}
	}
}
