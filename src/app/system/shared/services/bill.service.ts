import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Bill } from '../models/bill.model';
import { BaseApi } from '../../../shared/core/base-api';

@Injectable()
export class BillService extends BaseApi {
	constructor(public httpClient: HttpClient) {
		super(httpClient);
	}

	getBill(): Observable<Bill> {
		return this.get<Bill>('bill');
	}

	// Мы могли бы запрашивать определенный тип валют (base), но для этого нужен платный аккаунт
	getCurrency(base: string = 'RUB'): Observable<any> {
		return this.httpClient.get(
			'http://data.fixer.io/api/latest?access_key=d37eb88614c7606b8405d3708f09df3a&symbols=USD,RUB'
		);
	}
}
