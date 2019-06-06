import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as moment from 'moment';

import { Category } from '../../shared/models/category.model';
import { WFMEvent } from '../../shared/models/event.model';

@Component({
	selector: 'wfm-add-event',
	templateUrl: './add-event.component.html',
	styleUrls: ['./add-event.component.scss'],
})
export class AddEventComponent implements OnInit {
	@Input() categories: Category[] = [];

	public types = [
		{
			type: 'income',
			label: 'Доход',
		},
		{
			type: 'outcome',
			label: 'Расход',
		},
	];

	public checkboxes = [
		{
			name: 'bounty',
			label: 'Премия',
		},
		{
			name: 'gift',
			label: 'Подарок',
		},
	];

	constructor() {}

	ngOnInit() {}

	onSubmit(form: NgForm) {
		let { amount } = form.value;
		const { type, category, description } = form.value;

		if (amount < 0) {
			amount *= -1;
		}

		const date = moment().format('DD.MM.YYYY HH:mm:ss');

		const wfmEvent = new WFMEvent(type, amount, +category, date, description);
	}
}
