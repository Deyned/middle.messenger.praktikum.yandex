import Block from "../../common/classes/block";

export default class ErrorPage extends Block {
	render(): string {
		return `
            {{> error error_code="404" error_text="Не туда попали"}}
		`;
	}
}