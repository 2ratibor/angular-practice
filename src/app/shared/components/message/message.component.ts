import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';

import { Message } from '../../models/message.model';
import { MessageService } from '../../services/message.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'wfm-message',
	templateUrl: './message.component.html',
	styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements OnInit, OnDestroy {
	private subscr: Subscription;
	public message: Message;
	private timerHandler = null;

	constructor(private el: ElementRef, private messageService: MessageService) {}

	ngOnInit() {
		this.subscr = this.messageService.message$.subscribe((params: { target: ElementRef; message: Message }) => {
			// this.message = null;

			if (params.target.nativeElement === this.el.nativeElement) {
				// Нужен для запуска проверки изменений в компоненте
				window.setTimeout(() => {
					this.message = params.message;
				}, 0);

				window.clearTimeout(this.timerHandler);

				this.timerHandler = window.setTimeout(() => {
					this.message = null;
				}, 5000);
			}
		});
	}

	ngOnDestroy() {
		this.subscr.unsubscribe();
	}
}
