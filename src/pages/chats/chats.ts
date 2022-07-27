import Block from '../../common/classes/block';

export default class ChatsPage extends Block {
	render(): string {
		return `
				{{!< layout}}
				<div class="chats">
				<div class="chats__left_bar">
					<a class="chats__left_bar__profile_link" href="./profile">Профиль</a>
					<input id="search" class="chats__left_bar__search_input" type="text" placeholder="Поиск">
					<div class="chats__left_bar__chats_list">
						{{!-- TODO: Вынести в отдельный компонент --}}
						<div class="chats__left_bar__chats_list__item">
							{{!-- TODO: Вынести в отдельный компонент --}}
							<div class="chat_item">
								<div class="chat_item__photo">
									<div class="chat_item__photo__img">
									</div>
								</div>
								<div class="chat_item__message"
								>
									<span class="chat_item__message__name">Имя</span>
									<span class="chat_item__message__text">Текст</span>
								</div>
								<div class="chat_item__info">
									<span style="
										font-size: 12px;
										color: gray;
									" class="chat_item__info__time">13:12</span>
									<span class="chat_item__info__unread_count">4</span>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="chats__window">
					{{!-- TODO: Сделать заглушку при не выбранном чате --}}
					<div class="chats__window__header">
						<div class="chats__window__header__photo"></div>
						<div class="chats__window__header__name">Имя</div>
						<div class="chats__window__header__options">⁝</div>
					</div>
					<div class="chats__window__messages">
						<div class="chats__window__messages__message chats__window__messages__message__message_user">Привет</div>
						<div class="chats__window__messages__message chats__window__messages__message__message_guest">Привет</div>
					</div>
					<div class="chats__window__footer">
						<i class="chats__window__footer__attach_icon fa-solid fa-paperclip"></i>
			
						<input
							class="chats__window__footer__message_input"
							type="text"
							id="message"
							placeholder="Сообщение"
						>
			
						<button class="btn chats__window__footer__send_button">
							<i class="fa-solid fa-paper-plane"></i>
						</button>
					</div>
				</div>
			</div>
		`;
	}
}