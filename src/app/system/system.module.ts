import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SystemRoutingModule } from './system-routing.module';
import { SharedModule } from '../shared/shared.module';
import { BillService } from './shared/services/bill.service';
import { SystemComponent } from './system.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { DropdownDirective } from './shared/directives/dropdown.directive';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { BillPageComponent } from './bill-page/bill-page.component';
import { BillCardComponent } from './bill-page/bill-card/bill-card.component';
import { CurrencyCardComponent } from './bill-page/currency-card/currency-card.component';
import { MomentPipe } from './shared/pipes/moment.pipe';
import { HistoryPageComponent } from './history-page/history-page.component';
import { PlanningPageComponent } from './planning-page/planning-page.component';
import { RecordsPageComponent } from './records-page/records-page.component';
import { AddEventComponent } from './records-page/add-event/add-event.component';
import { AddCategoryComponent } from './records-page/add-category/add-category.component';
import { EditCategoryComponent } from './records-page/edit-category/edit-category.component';
import { CategoriesService } from './shared/services/categories.service';
import { EventsService } from './shared/services/events.service';

@NgModule({
	imports: [CommonModule, SystemRoutingModule, SharedModule],
	declarations: [
		SystemComponent,
		HeaderComponent,
		DropdownDirective,
		SidebarComponent,
		BillPageComponent,
		BillCardComponent,
		CurrencyCardComponent,
		MomentPipe,
		HistoryPageComponent,
		PlanningPageComponent,
		RecordsPageComponent,
		AddEventComponent,
		AddCategoryComponent,
		EditCategoryComponent,
	],
	providers: [BillService, CategoriesService, EventsService],
})
export class SystemModule {}
