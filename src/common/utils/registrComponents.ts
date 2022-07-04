import Handlebars, { HelperOptions } from 'handlebars';
import Block from '../classes/block';

interface BlockConstructable<Props = any> {
	new(props: Props): Block;
}

export default function registerComponent<Props>(
	Component: BlockConstructable<Props>
) {
	Handlebars.registerHelper(Component.name, function (this: Props, { hash: { ref, ...hash }, data, fn }: HelperOptions) {

		const component = new Component(hash);

    return component.render();
	});
}
