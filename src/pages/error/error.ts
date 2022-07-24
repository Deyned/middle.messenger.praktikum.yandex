import Block from '../../common/classes/block';

export default class ErrorPage extends Block {
	render(): string {
		return `
		<div class="error">
			<span class="error__code">404</span>
			<span class="error__text">Не туда попали</span>
			<a class="error__link_to_chat" href="/">Назад к чатам</a>
		</div>
		`;
	}
}