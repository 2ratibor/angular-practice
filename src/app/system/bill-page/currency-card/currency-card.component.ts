import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'wfm-currency-card',
	templateUrl: './currency-card.component.html',
	styleUrls: ['./currency-card.component.scss'],
})
export class CurrencyCardComponent {
	@Input() currency: any;
	public currencies: string[] = ['USD', 'RUB'];
}
