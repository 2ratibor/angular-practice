import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UsersService } from '../../shared/services/users.service';
import { User } from '../../shared/models/user.model';

@Component({
	selector: 'wfm-registration',
	templateUrl: './registration.component.html',
	styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
	public form: FormGroup;
	private minPassLength = 6;

	constructor(private usersService: UsersService, private router: Router) {}

	ngOnInit() {
		this.form = new FormGroup({
			email: new FormControl(null, [Validators.required, Validators.email], this.checkForEmail.bind(this)),
			password: new FormControl(null, [Validators.required, Validators.minLength(this.minPassLength)]),
			name: new FormControl(null, [Validators.required]),
			agree: new FormControl(false, [Validators.requiredTrue]),
		});
	}

	checkForEmail(control: FormControl): Promise<any> {
		return new Promise((resolve, reject) => {
			this.usersService.getUserByEmail(control.value).subscribe((user: User) => {
				if (user) {
					resolve({
						emailIsUsed: true,
					});
				} else {
					resolve(null);
				}
			});
		});
	}

	onSubmit() {
		const { email, password, name } = this.form.value;
		const user: User = { email, password, name };

		this.usersService.createNewUser(user).subscribe(() => {
			this.router.navigate(['/login'], {
				queryParams: {
					nowCanLogin: true,
				},
			});
		});
	}
}
