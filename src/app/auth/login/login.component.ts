import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { UsersService } from '../../shared/services/users.service';
import { AuthService } from '../../shared/services/auth.service';
import { MessageService } from '../../shared/services/message.service';
import { User } from '../../shared/models/user.model';

@Component({
	selector: 'wfm-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, AfterViewInit {
	@ViewChild('loginMessage', { read: ElementRef, static: false }) loginMessage: ElementRef;

	private form: FormGroup;
	private minPassLength = 6;

	constructor(
		private usersService: UsersService,
		private authService: AuthService,
		private messageService: MessageService,
		private router: Router,
		private route: ActivatedRoute
	) {}

	ngOnInit() {
		this.form = new FormGroup({
			email: new FormControl(null, [Validators.required, Validators.email]),
			password: new FormControl(null, [Validators.required, Validators.minLength(this.minPassLength)]),
		});
	}

	ngAfterViewInit() {
		this.route.queryParams.subscribe((params: Params) => {
			if ('nowCanLogin' in params) {
				this.messageService.show(this.loginMessage, 'Теперь вы можете зайти в систему!', 1);
			}
		});
	}

	onSubmit() {
		const formData = this.form.value;

		this.usersService.getUserByEmail(formData.email).subscribe((user: User) => {
			if (user) {
				if (user.password === formData.password) {
					window.localStorage.setItem('user', JSON.stringify(user));
					this.authService.logIn();
					this.router.navigate(['/system', 'bill']);
				} else {
					this.messageService.show(this.loginMessage, 'Пароль не верный');
				}
			} else {
				this.messageService.show(this.loginMessage, 'Такого пользователя не существует');
			}
		});
	}
}
