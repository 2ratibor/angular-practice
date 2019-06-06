import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

import { CategoriesService } from '../../shared/services/categories.service';
import { Category } from '../../shared/models/category.model';

@Component({
	selector: 'wfm-add-category',
	templateUrl: './add-category.component.html',
	styleUrls: ['./add-category.component.scss'],
})
export class AddCategoryComponent {
	@Output() categoryAdd = new EventEmitter<Category>();

	constructor(private categoriesService: CategoriesService) {}

	onSubmit(form: NgForm) {
		const { name } = form.value;
		let { capacity } = form.value;

		if (capacity < 0) {
			capacity *= -1;
		}

		const newCategory = new Category(name, capacity);

		this.categoriesService.addCategory(newCategory).subscribe((category: Category) => {
			form.reset();
			form.form.patchValue({ capacity: 1 });
			this.categoryAdd.emit(category);
		});
	}
}
