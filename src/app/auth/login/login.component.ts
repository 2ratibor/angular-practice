import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { UsersService } from '../../shared/services/users.service';
import { AuthService } from '../../shared/services/auth.service';
import { User } from '../../shared/models/user.model';
import { Message } from '../../shared/models/message.model';

@Component({
	selector: 'wfm-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
	private form: FormGroup;
	private minPassLength = 6;
	public message: Message;

	constructor(
		private usersService: UsersService,
		private authService: AuthService,
		private router: Router,
		private route: ActivatedRoute
	) {}

	ngOnInit() {
		this.route.queryParams.subscribe((params: Params) => {
			if ('nowCanLogin' in params) {
				this.showMessage('Теперь вы можете зайти в систему', 'success');
			}
		});

		this.form = new FormGroup({
			email: new FormControl(null, [Validators.required, Validators.email]),
			password: new FormControl(null, [Validators.required, Validators.minLength(this.minPassLength)]),
		});
	}

	private showMessage(text: string, type: string = 'danger') {
		this.message = { text, type };

		window.setTimeout(() => {
			this.message = null;
		}, 5000);
	}

	onSubmit() {
		const formData = this.form.value;

		this.usersService.getUserByEmail(formData.email).subscribe((user: User) => {
			if (user) {
				if (user.password === formData.password) {
					this.message = null;
					window.localStorage.setItem('user', JSON.stringify(user));
					this.authService.logIn();
					this.router.navigate(['/system', 'bill']);
				} else {
					this.showMessage('Пароль не верный');
				}
			} else {
				this.showMessage('Такого пользователя не существует');
			}
		});
	}
}
