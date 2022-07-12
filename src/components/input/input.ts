import Block from "../../common/classes/block";


import './input.scss'

export enum InputTypes {
	text = 'text',
	email = 'email',
	password = 'password'
}

interface InputProps {
	label: string;
	error: string;
	type: InputTypes;
	value: string;
	onBlur: () => void;
	onFocus: () => void;
}

export default class Input extends Block {
	constructor(props: InputProps) {
		super('div', {
			label: props.label,
			error: props.error,
			type: props.type,
			value: props.value,
			events: {blur: props.onBlur, focus: props.onFocus}
		});
	}

	render(): string {
		return `
			<div class="input">
				<label class="input__label">{{label}}</label>
				<input class="input__input" type="{{type}}" value="{{value}}">
				<span class="input__error">{{error}}</span>
			</div>
		`
	}
}