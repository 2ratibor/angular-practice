import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Category } from '../../shared/models/category.model';
import { CategoriesService } from '../../shared/services/categories.service';
import { MessageService } from '../../../shared/services/message.service';

@Component({
	selector: 'wfm-edit-category',
	templateUrl: './edit-category.component.html',
	styleUrls: ['./edit-category.component.scss'],
})
export class EditCategoryComponent implements OnInit {
	@Input() categories: Category[] = [];
	@Output() categoryEdit = new EventEmitter<Category>();
	@ViewChild('editCategoryMessage', { read: ElementRef, static: false }) editCategoryMessage: ElementRef;

	public currentCategoryId = 1;
	public currentCategory: Category;

	constructor(private categoriesService: CategoriesService, private messageService: MessageService) {}

	ngOnInit() {
		this.onCategoryChange();
	}

	onCategoryChange() {
		this.currentCategory = this.categories.find((c: Category) => c.id === +this.currentCategoryId);
	}

	onSubmit(form: NgForm) {
		const { name } = form.value;
		let { capacity } = form.value;

		if (capacity < 0) {
			capacity *= -1;
		}

		const modifiedCategory = new Category(name, capacity, +this.currentCategoryId);

		this.categoriesService.updateCategory(modifiedCategory).subscribe((category: Category) => {
			this.categoryEdit.emit(category);
			this.messageService.show(this.editCategoryMessage, 'Категория успешно отредактированна', 1);
		});
	}
}
