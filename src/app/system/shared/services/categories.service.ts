import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BaseApi } from '../../../shared/core/base-api';
import { Category } from '../models/category.model';
import { Observable } from 'rxjs';

@Injectable()
export class CategoriesService extends BaseApi {
	constructor(public httpClient: HttpClient) {
		super(httpClient);
	}

	addCategory(category: Category): Observable<Category> {
		return this.post<Category>('categories', category);
	}

	getCategories(): Observable<Category[]> {
		return this.get<Category[]>('categories');
	}

	updateCategory(category: Category): Observable<Category> {
		return this.put<Category>(`categories/${category.id}`, category);
	}
}
