// eslint-disable-next-line node/no-extraneous-import
import Handlebars, { HelperOptions } from 'handlebars';
import Block from '../classes/block';

interface BlockConstructable<Props = any> {
	new(props: Props): Block;
}

export default function registerComponent<Props>(
	Component: BlockConstructable<Props>
) {
	Handlebars.registerHelper(Component.name, function (this: Props, { hash: { ref, ...hash }, data, fn }: HelperOptions) {
		if (!data.root.children) {
			data.root.children = {};
		}
	
		if (!data.root.refs) {
			data.root.refs = {};
		}
 
		const { children, refs } = data.root;

		const component = new Component(hash);

		children[component.id] = component;

		if (ref) {
			refs[ref] = component.getContent();
		}

		const contents = fn ? fn(this): '';

		return `<div data-id="${component.id}">${contents}</div>`;
	});
}
