import Block from '../../common/classes/block';

export default class ProfilePage extends Block {
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
						<div class="profile__info__field">
							<div class="profile__info__field__label">Почта</div>
							<div class="profile__info__field__value">123@yandex.ru</div>
						</div>
						<div class="profile__info__field">
							<div class="profile__info__field__label">Логин</div>
							<div class="profile__info__field__value">Deyned</div>
						</div>
						<div class="profile__info__field">
							<div class="profile__info__field__label">Фамилия</div>
							<div class="profile__info__field__value">Петров</div>
						</div>
						<div class="profile__info__field">
							<div class="profile__info__field__label">Имя</div>
							<div class="profile__info__field__value">Пётр</div>
						</div>
						<div class="profile__info__field">
							<div class="profile__info__field__label">Никнейм</div>
							<div class="profile__info__field__value">Пользователь 123</div>
						</div>
						<div class="profile__info__field">
							<div class="profile__info__field__label">Номер телефона</div>
							<div class="profile__info__field__value">+7(999)345-34-21</div>
						</div>
			
						<div class="profile__info__links">
							<span class="profile__info__link profile__info__link__blue">Изменить данные</span>
							<span class="profile__info__link profile__info__link__blue">Изменить пароль</span>
							<a class="profile__info__link profile__info__link__red" href="./auth">Выйти</a>
						</div>
					</div>
				</div>
			</div>
		`;
	}
}