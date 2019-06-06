import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageComponent } from './components/message/message.component';
import { MessageService } from './services/message.service';

@NgModule({
	imports: [CommonModule, FormsModule, ReactiveFormsModule],
	exports: [FormsModule, ReactiveFormsModule, MessageComponent],
	declarations: [MessageComponent],
	providers: [MessageService],
})
export class SharedModule {}
