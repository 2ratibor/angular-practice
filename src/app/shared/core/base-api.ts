import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class BaseApi {
	private baseUrl = 'http://localhost:3000/';

	constructor(public httpClient: HttpClient) {}

	private getUrl(url: string = ''): string {
		return this.baseUrl + url;
	}

	public get<T>(url: string = ''): Observable<T> {
		return this.httpClient
			.get(this.getUrl(url), { observe: 'response' })
			.map((response: HttpResponse<T>) => response.body);
	}

	public post<T>(url: string = '', data: any = {}): Observable<T> {
		return this.httpClient
			.post(this.getUrl(url), data, { observe: 'response' })
			.map((response: HttpResponse<T>) => response.body);
	}

	public put<T>(url: string = '', data: any = {}): Observable<T> {
		return this.httpClient
			.put(this.getUrl(url), data, { observe: 'response' })
			.map((response: HttpResponse<T>) => response.body);
	}
}
