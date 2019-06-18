import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import * as moment from 'moment';

import { Category } from '../../shared/models/category.model';
import { WFMEvent } from '../../shared/models/event.model';
import { EventsService } from '../../shared/services/events.service';
import { BillService } from '../../shared/services/bill.service';
import { MessageService } from '../../../shared/services/message.service';
import { Bill } from '../../shared/models/bill.model';

@Component({
	selector: 'wfm-add-event',
	templateUrl: './add-event.component.html',
	styleUrls: ['./add-event.component.scss'],
})
export class AddEventComponent implements OnInit, OnDestroy {
	@Input() categories: Category[] = [];

	@ViewChild('addEventMessage', { read: ElementRef, static: false }) addEventMessage: ElementRef;

	private sub1: Subscription;
	private sub2: Subscription;

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

	constructor(
		private eventsService: EventsService,
		private billService: BillService,
		private messageService: MessageService
	) {}

	ngOnInit() {}

	onSubmit(form: NgForm) {
		let { amount } = form.value;
		const { type, category, description } = form.value;

		if (amount < 0) {
			amount *= -1;
		}

		const date = moment().format('DD.MM.YYYY HH:mm:ss');

		const wfmEvent = new WFMEvent(type, amount, +category, date, description);

		this.sub1 = this.billService.getBill().subscribe((bill: Bill) => {
			let value = 0;

			if (type === 'outcome') {
				if (amount > bill.value) {
					this.messageService.show(
						this.addEventMessage,
						`На счету недостаточно средств. Вам не хватает ${amount - bill.value}`
					);
					return;
				} else {
					value = bill.value - amount;
				}
			} else {
				value = bill.value + amount;
			}

			this.sub2 = this.billService
				.updateBill({ value, currency: bill.currency })
				.mergeMap((returnedBill: Bill) => {
					return this.eventsService.addEvent(wfmEvent).map((returnedEvent: WFMEvent) => {
						return [returnedBill, returnedEvent];
					});
				})
				.subscribe((data: any) => {
					console.log('DATA: ', data);

					form.setValue({
						amount: 0,
						description: ' ',
						category: 1,
						type: 'outcome',
						bounty: false,
						gift: true,
					});
				});
		});
	}

	ngOnDestroy() {
		if (this.sub1) {
			this.sub1.unsubscribe();
		}

		if (this.sub2) {
			this.sub2.unsubscribe();
		}
	}
}
