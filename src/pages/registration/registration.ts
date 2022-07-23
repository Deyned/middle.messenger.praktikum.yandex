import Block from '../../common/classes/block';
import validateForm, { ValidationRule } from '../../common/utils/validator';

export default class RegistrationPage extends Block {
	public getStateFromProps() {
		this.state = {
			values: {
				first_name: '',
				second_name: '',
				login: '',
				email: '',
				password: '',
				phone: ''
			},
			errors: {
				first_name: '',
				second_name: '',
				login: '',
				email: '',
				password: '',
				phone: ''
			},
			registration: () => {
				const registrData = {
					login: (this.refs.login.querySelector('input') as HTMLInputElement).value,
					password: (this.refs.password.querySelector('input') as HTMLInputElement).value,
					email: (this.refs.email.querySelector('input') as HTMLInputElement).value,
					phone: (this.refs.phone.querySelector('input') as HTMLInputElement).value,
					first_name: (this.refs.first_name.querySelector('input') as HTMLInputElement).value,
					second_name: (this.refs.second_name.querySelector('input') as HTMLInputElement).value,
				}

				const nextState = {
					values: {...registrData},
					errors: {
						login: validateForm(ValidationRule.Login, registrData.login),
						password: validateForm(ValidationRule.Password, registrData.password),
						email: validateForm(ValidationRule.Email, registrData.email),
						phone: validateForm(ValidationRule.Phone, registrData.phone),
						first_name: validateForm(ValidationRule.Name, registrData.first_name),
						second_name: validateForm(ValidationRule.Name, registrData.second_name),
					}
				}

				this.setState(nextState);

				const hasError = Object.values(nextState.errors).some(val => val !== '');
				if (!hasError) {
					console.log(registrData);
				}
			},
			onBlur: (event: any) => {
				if (event?.target?.id) {
					const nextState = {
						values: {...this.state.values},
						errors: {...this.state.errors}
					}

					let errorText = ''

					switch(event.target.id) {
					case 'first_name':
					case 'second_name':
						errorText = validateForm(ValidationRule.Name, event?.target?.value || '');
						break;
					case 'phone':
						errorText = validateForm(ValidationRule.Phone, event?.target?.value || '');
						break;
					case 'login':
						errorText = validateForm(ValidationRule.Login, event?.target?.value || '');
						break;
					case 'password':
						errorText = validateForm(ValidationRule.Password, event?.target?.value || '');
						break;
					case 'email':
						errorText = validateForm(ValidationRule.Email, event?.target?.value || '');
						break;
					}

					nextState.errors[event.target.id] = errorText;
					nextState.values[event.target.id] = event.target.value;

					this.setState(nextState);
				}
			}
		}
	}

	public render(): string {
		return `
		{{!< layout}}
		<div class="auth">
			<div class="auth__registration_window">
				<h2 class="registartion__label">Регистрация</h2>
				<form class="registration_form">
				<div class="auth__input_field">
						{{{ExtendedInput
							ref="first_name"
							type="text"
							label="Имя"
							propId="first_name"
							value="${this.state.values.first_name}"
							error="${this.state.errors.first_name}"
							onBlur=onBlur
						}}}
					</div>
					<div class="auth__input_field">
						{{{ExtendedInput
							ref="second_name"
							type="text"
							label="Фамилия"
							propId="second_name"
							value="${this.state.values.second_name}"
							error="${this.state.errors.second_name}"
							onBlur=onBlur
						}}}
					</div>
					<div class="auth__input_field">
						{{{ExtendedInput
							ref="login"
							type="text"
							label="Логин"
							propId="login"
							value="${this.state.values.login}"
							error="${this.state.errors.login}"
							onBlur=onBlur
						}}}
					</div>
					<div class="auth__input_field">
						{{{ExtendedInput
							ref="email"
							type="email"
							label="E-mail"
							propId="email"
							value="${this.state.values.email}"
							error="${this.state.errors.email}"
							onBlur=onBlur
						}}}
					</div>
					<div class="auth__input_field">
						{{{ExtendedInput
							ref="password"
							type="password"
							label="Пароль"
							propId="password"
							value="${this.state.values.password}"
							error="${this.state.errors.password}"
							onBlur=onBlur
						}}}
					</div>
					<div class="auth__input_field">
						{{{ExtendedInput
							ref="phone"
							type="phone"
							label="Номер телефона"
							propId="phone"
							value="${this.state.values.phone}"
							error="${this.state.errors.phone}"
							onBlur=onBlur
						}}}
					</div>
				</form>
				<div class="registration__buttons">
					{{{Button text="Регистрация" onClick=registration}}}
				</div>
			</div>
		</div>
		`;
	}
}