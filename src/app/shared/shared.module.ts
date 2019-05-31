import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersService } from './services/users.service';

@NgModule({
	imports: [FormsModule, ReactiveFormsModule],
	exports: [FormsModule, ReactiveFormsModule],
})
export class SharedModule {}
