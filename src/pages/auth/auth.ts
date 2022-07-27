import Block from '../../common/classes/block';

export default class AuthPage extends Block {
	public getStateFromProps() {
		this.state = {
			values: {
				login: '',
				password: ''
			},
			errors: {
				login: '',
				password: ''
			},
			auth: () => {
				const authData = {
					login: (this.refs.login.querySelector('input') as HTMLInputElement).value,
					password: (this.refs.password.querySelector('input') as HTMLInputElement).value
				}

				const nextState = {
					errors: {
						login: '',
						password: ''
					},
					values: { ...authData },
				}

				if(!authData.login) {
					nextState.errors.login = 'Не заполнен логин';
				}

				if(!authData.password) {
					nextState.errors.password = 'Не заполнен пароль'
				}
				
				this.setState(nextState);
				console.log(this.state);
			}
		}
	}

	public render(): string {
		return `
			{{!< layout}}
			<div class="auth">
				<div class="auth__window">
					<h2 class="auth__label">Авторизация</h2>
					<form class="auth__form">
						<div class="auth__input_field">
							{{{ExtendedInput
								ref="login"
								propId="login"
								type="text"
								label="Логин"
								value="${this.state.values.login}"
								error="${this.state.errors.login}"
							}}}
						</div>
						<div class="auth__input_field">
							{{{ExtendedInput
								ref="password"
								propId="password"
								type="password"
								label="Пароль"
								value="${this.state.values.password}"
								error="${this.state.errors.password}"
							}}}
						</div>
					</form>
					<div class="auth__buttons">
						{{{Button text="Войти" onClick=auth}}}
						{{{Button text="Регистрация"}}}
					</div>
				</div>
			</div>
		`;
	}
}