import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';

const AuthRoutes: Routes = [
	{
		path: '',
		component: AuthComponent,
		children: [
			{ path: 'login', component: LoginComponent },
			{ path: 'registration', component: RegistrationComponent },
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(AuthRoutes)],
	exports: [RouterModule],
})
export class AuthRoutingModule {}
