import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { BaseApi } from '../../../shared/core/base-api';
import { WFMEvent } from '../models/event.model';

@Injectable()
export class EventsService extends BaseApi {
	constructor(public httpClient: HttpClient) {
		super(httpClient);
	}

	addEvent(event: WFMEvent): Observable<WFMEvent> {
		return this.post<WFMEvent>('events', event);
	}
}
