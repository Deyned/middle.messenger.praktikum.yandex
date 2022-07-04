import Block from "../../common/classes/block";

export default class AuthPage extends Block {
	render(): string {
		return `
			<div class="auth">
				<div class="auth__window">
					<h2 class="auth__label">Авторизация</h2>
					<form class="auth__form">
						<div class="auth__input_field">
							<label class="auth__input_label" for="login">Логин</label>
							<input class="auth__input" id="login" type="text">
						</div>
						<div class="auth__input_field">
							<label class="auth__input_label" for="password">Пароль</label>
							<input class="auth__input" id="password" type="password">
						</div>
					</form>
					<div class="auth__buttons">
						{{> button label="Войти"}}
						{{> button label="Регистрация"}}
					</div>
				</div>
			</div>
		`;
	}
}