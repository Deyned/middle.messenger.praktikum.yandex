import Handlebars, { HelperOptions } from 'handlebars';
import Block from '../classes/block';

export default function registerComponent(
  componentName: string,
  component: Block,
) {
  Handlebars.registerHelper(componentName, function({ data, hash }) {
    console.log(this, arguments[0], hash, data);

    // const elem = new component(hash);

    return component.render();
  });
}
