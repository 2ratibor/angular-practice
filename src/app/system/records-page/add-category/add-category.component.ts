import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { CategoriesService } from '../../shared/services/categories.service';
import { Category } from '../../shared/models/category.model';

@Component({
	selector: 'wfm-add-category',
	templateUrl: './add-category.component.html',
	styleUrls: ['./add-category.component.scss'],
})
export class AddCategoryComponent implements OnDestroy {
	@Output() categoryAdd = new EventEmitter<Category>();

	private sub1: Subscription;

	constructor(private categoriesService: CategoriesService) {}

	onSubmit(form: NgForm) {
		const { name } = form.value;
		let { capacity } = form.value;

		if (capacity < 0) {
			capacity *= -1;
		}

		const newCategory = new Category(name, capacity);

		this.sub1 = this.categoriesService.addCategory(newCategory).subscribe((category: Category) => {
			form.reset();
			form.form.patchValue({ capacity: 1 });
			this.categoryAdd.emit(category);
		});
	}

	ngOnDestroy() {
		if (this.sub1) {
			this.sub1.unsubscribe();
		}
	}
}
