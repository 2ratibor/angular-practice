import { Component, Input, OnInit } from '@angular/core';
import { Bill } from '../../shared/models/bill.model';

@Component({
	selector: 'wfm-bill-card',
	templateUrl: './bill-card.component.html',
	styleUrls: ['./bill-card.component.scss'],
})
export class BillCardComponent implements OnInit {
	@Input() bill: Bill;
	@Input() currency: any;

	public dollar: number;
	public ruble: number;

	constructor() {}

	ngOnInit() {
		const { rates } = this.currency;
		this.dollar = rates['USD'] * this.bill.value;
		this.ruble = rates['RUB'] * this.bill.value;
	}
}
