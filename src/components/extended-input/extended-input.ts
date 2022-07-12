import Block from "../../common/classes/block";
import './extended-input.scss'

export enum InputTypes {
	text = 'text',
	email = 'email',
	password = 'password'
}

interface ExtendedInputProps {
	label: string;
	error: string;
	type: InputTypes;
	value: string;
	onBlur: () => void;
	onFocus: () => void;
}

export default class ExtendedInput extends Block {
	constructor(props: ExtendedInputProps) {
		super('div', {
			label: props.label,
			error: props.error,
			type: props.type,
			value: props.value,
			blur: props.onBlur,
			focus: props.onFocus
		});
	}

	render(): string {
		return `
			<div class="extended_input">
				<label class="extended_input__label">{{label}}</label>
				{{{Input type=type value=value onBlur=blur onFocus=focus}}}
				<span class="extended_input__error">{{error}}</span>
			</div>
		`;
	}
}