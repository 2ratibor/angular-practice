import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs-compat/add/operator/map';

import { User } from '../models/user.model';

@Injectable()
export class UsersService {
	constructor(private httpClient: HttpClient) {}

	getUserByEmail(email: string): Observable<User> {
		return this.httpClient
			.get(`http://localhost:3000/users?email=${email}`, { observe: 'response' })
			.map((response: HttpResponse<User[]>) => response.body)
			.map((users: User[]) => users[0]);
	}
}
