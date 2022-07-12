import Block from "../../common/classes/block";


import './button.scss'

interface ButtonProps {
	text: string
	onClick: () => void
}

export default class Button extends Block {
	constructor(props: ButtonProps) {
		super('div', {text: props.text, events: {click: props.onClick}});
	}

	render(): string {
		return `<button class="btn">{{text}}</button>`
	}
}