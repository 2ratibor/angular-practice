import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '../models/user.model';
import { BaseApi } from '../core/base-api';

@Injectable()
export class UsersService extends BaseApi {
	constructor(public httpClient: HttpClient) {
		super(httpClient);
	}

	getUserByEmail(email: string): Observable<User> {
		return this.get<User[]>(`users?email=${email}`).map((users: User[]) => users[0]);
	}

	createNewUser(user: User): Observable<User> {
		return this.post<User>('users', user);
	}
}
