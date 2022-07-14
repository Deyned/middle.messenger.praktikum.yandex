import Block from "../../common/classes/block";


import './input.scss'

export enum InputTypes {
	text = 'text',
	email = 'email',
	password = 'password'
}

interface InputProps {
	propId: string;
	type: InputTypes;
	value: string;
	onBlur: () => void;
	onFocus: () => void;
}

export default class Input extends Block {

	constructor(props: InputProps) {
		super('div', {
			propId: props.propId,
			type: props.type,
			value: props.value,
			events: {blur: props.onBlur, focus: props.onFocus}
		});
	}

	render(): string {
		return `
            <input id="{{propId}}" class="input" type="{{type}}" value="{{value}}">
		`
	}
}