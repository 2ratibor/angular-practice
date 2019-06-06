import { Subject } from 'rxjs';

import { Message } from '../models/message.model';
import { ElementRef } from '@angular/core';

const MESSAGE_TYPES = {
	1: 'success',
	2: 'warning',
	3: 'danger',
};

export class MessageService {
	public message = new Subject<{ target: ElementRef; message: Message }>();
	public message$ = this.message.asObservable();

	show(target: ElementRef, text: string, messageCode: number = 3) {
		const msg: Message = {
			text: text,
			type: MESSAGE_TYPES[messageCode],
		};

		this.message.next({
			target: target,
			message: msg,
		});
	}
}
