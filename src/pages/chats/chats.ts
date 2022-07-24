import Block from '../../common/classes/block';

export default class ChatsPage extends Block {
	render(): string {
		return `
				{{!< layout}}
				<div class="chats">
				<div class="chats__left_bar">
					<a class="chats__left_bar__profile_link" href="./profile.hbs">Профиль</a>
					<input id="search" class="chats__left_bar__search_input" type="text" placeholder="Поиск">
					<div class="chats__left_bar__chats_list">
						{{!-- TODO: Вынести в отдельный компонент --}}
						<div class="chats__left_bar__chats_list__item">
							{{!-- TODO: Вынести в отдельный компонент --}}
							<div class="chat_item">
								<div style="
									min-width:55px;
									width:55px;
									display: flex;
									align-items: center;
									justify-content: center;
								">
									<div style="
										width: 45px;
										height: 45px;
										background-color: darkgrey;
										border-radius: 50%;
									">
									</div>
								</div>
								<div style="
									width: 100%;
									padding: 3px 5px
								">
									<span style="
										display: block;
										font-weight: 700;
									">Имя</span>
									<span style="
										padding-top: 3px;
										color: gray;
										text-overflow: ellipsis;
										overflow: hidden;
										display: -webkit-box;
										-webkit-line-clamp: 2;
										-webkit-box-orient: vertical;
										font-size: 15px;
									">Текст</span>
								</div>
								<div style="
									min-width:30px;
									width:30px;
									display: flex;
									flex-direction: column;
									align-items: center;
									justify-content: space-between;
									padding: 3px 0;
								">
									<span style="
										font-size: 12px;
										color: gray;
									">13:12</span>
									<span style="
										margin-bottom: 10px;
										height: 28px;
										width: 28px;
										background-color: blue;
										color: white;
										border-radius: 50%;
										display: flex;
										align-items: center;
										justify-content: center;
									">4</span>
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