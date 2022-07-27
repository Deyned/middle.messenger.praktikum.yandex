import Block from '../../common/classes/block';
import validateForm, { ValidationType } from '../../common/utils/validator';

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
						login: validateForm(ValidationType.Login, registrData.login),
						password: validateForm(ValidationType.Password, registrData.password),
						email: validateForm(ValidationType.Email, registrData.email),
						phone: validateForm(ValidationType.Phone, registrData.phone),
						first_name: validateForm(ValidationType.Name, registrData.first_name),
						second_name: validateForm(ValidationType.Name, registrData.second_name),
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
						errorText = validateForm(ValidationType.Name, event?.target?.value || '');
						break;
					case 'phone':
						errorText = validateForm(ValidationType.Phone, event?.target?.value || '');
						break;
					case 'login':
						errorText = validateForm(ValidationType.Login, event?.target?.value || '');
						break;
					case 'password':
						errorText = validateForm(ValidationType.Password, event?.target?.value || '');
						break;
					case 'email':
						errorText = validateForm(ValidationType.Email, event?.target?.value || '');
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
		const { values, errors } = this.state;
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
							value="${values.first_name}"
							error="${errors.first_name}"
							onBlur=onBlur
						}}}
					</div>
					<div class="auth__input_field">
						{{{ExtendedInput
							ref="second_name"
							type="text"
							label="Фамилия"
							propId="second_name"
							value="${values.second_name}"
							error="${errors.second_name}"
							onBlur=onBlur
						}}}
					</div>
					<div class="auth__input_field">
						{{{ExtendedInput
							ref="login"
							type="text"
							label="Логин"
							propId="login"
							value="${values.login}"
							error="${errors.login}"
							onBlur=onBlur
						}}}
					</div>
					<div class="auth__input_field">
						{{{ExtendedInput
							ref="email"
							type="email"
							label="E-mail"
							propId="email"
							value="${values.email}"
							error="${errors.email}"
							onBlur=onBlur
						}}}
					</div>
					<div class="auth__input_field">
						{{{ExtendedInput
							ref="password"
							type="password"
							label="Пароль"
							propId="password"
							value="${values.password}"
							error="${errors.password}"
							onBlur=onBlur
						}}}
					</div>
					<div class="auth__input_field">
						{{{ExtendedInput
							ref="phone"
							type="phone"
							label="Номер телефона"
							propId="phone"
							value="${values.phone}"
							error="${errors.phone}"
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