import Block from "../../common/classes/block";

export default class RegistrationPage extends Block {
	render(): string {
		return `
			<div class="profile">
				<div class="profile__link_back" title="Вернуться назад">
					<span class="profile__link_back__icon">↩</span>
				</div>
				<div class="profile__info">
					<div class="profile__info__container">
						<div class="profile__info__picture">Нет изображения</div>
						<h3>{{profile.nickname}}</h3>
						{{> profile-field label="Почта" value=profile.email}}
						{{> profile-field label="Логин" value=profile.login}}
						{{> profile-field label="Имя" value=profile.first_name}}
						{{> profile-field label="Фамилия" value=profile.last_name}}
						{{> profile-field label="Имя в чате" value=profile.nickname}}
						{{> profile-field label="Телефон" value=profile.phone_number}}
			
						<div class="profile__info__links">
							<span class="profile__info__link profile__info__link__blue">Изменить данные</span>
							<span class="profile__info__link profile__info__link__blue">Изменить пароль</span>
							<span class="profile__info__link profile__info__link__red">Выйти</span>
						</div>
					</div>
				</div>
			</div>
		`;
	}
}