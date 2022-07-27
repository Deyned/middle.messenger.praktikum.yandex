/* eslint-disable node/no-extraneous-import */
import EventBus from './event-bus';
import Handlebars from 'handlebars';
import {v4 as makeUUID} from 'uuid';

export default class Block {
	static EVENTS = {
		INIT: 'init',
		FLOW_CDM: 'flow:component-did-mount',
		FLOW_CDU: 'flow:component-did-update',
		FLOW_RENDER: 'flow:render'
	};

	private _element!: HTMLElement;
	private _meta: any;

	public eventBus: () => EventBus;
	public props: any;
	public state: any = {};
	public refs: {[key: string]: HTMLElement} = {}

	public children: {[id: string]: Block} = {};

	public id: string;

	constructor(tagName = 'div', propsAndChildren  = {}) {
		const eventBus = new EventBus();
		const { children, props } = this._getChildren(propsAndChildren);
		this.children = children;
		this._meta = {
			tagName,
			props
		}

		this.id = makeUUID();

		this._getStateFromProps(props);

		this.props = this._makePropsProxy({...props, _id: this.id});
		this.state = this._makePropsProxy(this.state);

		this.eventBus = () => eventBus;

		this._registerEvents(eventBus);
		eventBus.emit(Block.EVENTS.INIT);
	}

	private _getChildren(propsAndChildren: any) {
		const children: any = {};
		const props: any = {};

		Object.entries(propsAndChildren).forEach(([key, value] : [string, any]) => {
			if (value instanceof Block) {
				children[key] = value;
			} else {
				props[key] = value;
			}
		});

		return { children, props };
	}

	public getStateFromProps(props: any) {
		this.state = {};
	}

	private _getStateFromProps(props: any) {
		this.getStateFromProps(props);
	}

	private _registerEvents(eventBus: any) {
		eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
		eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
		eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
		eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
	}

	private _createResources() {
		const { tagName } = this._meta;
		this._element = this._createDocumentElement(tagName);
	}
	
	public init() {
		this._createResources();
		this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
	}

	private _componentDidMount(props: any) {
		this.componentDidMount(props);
	}

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	public componentDidMount(props: any) {}

	public dispatchComponentDidMount() {
		this.eventBus().emit(Block.EVENTS.FLOW_CDM);
	}
  
	private _componentDidUpdate(oldProps: any, newProps: any) {
		const response = this.componentDidUpdate(oldProps, newProps);

		if (!response) {
			return;
		}
	
		this._render();
	}
  
	public componentDidUpdate(oldProps: any, newProps: any) {
		return true;
	}

	public get element() {
		return this._element;
	}

	private _render() {
		this._removeEvents();
		const block = this.compile();
		const newElement = block.firstElementChild as HTMLElement;
		this._element?.replaceWith(newElement);
		this._element = newElement as HTMLElement;
		this._addEvents();
	}

	public compile(): DocumentFragment {
		const fragment = this._createDocumentElement('template');

		const template = Handlebars.compile(this.render());
		fragment.innerHTML = template({ ...this.state, ...this.props, children: this.children, refs: this.refs });

		Object.entries(this.children).forEach(([id, component]) => {
			const stub = fragment.content.querySelector(`[data-id="${id}"]`);
		
			if (!stub) {
				return;
			}
		
			const stubChilds = stub.childNodes.length ? stub.childNodes : [];
		
			const content = component.getContent();
			stub.replaceWith(content);
		
			const layoutContent = content.querySelector('[data-layout="1"]');
		
			if (layoutContent && stubChilds.length) {
				layoutContent.append(...stubChilds);
			}
		});

		return fragment.content;
	}

	public getContent(): HTMLElement {
		if (this.element?.parentNode?.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
			setTimeout(() => {
				if (this.element?.parentNode?.nodeType !==  Node.DOCUMENT_FRAGMENT_NODE ) {
					this.eventBus().emit(Block.EVENTS.FLOW_CDM);
				}
			}, 100)
		}
	
		return this.element;
	}
	
	public render() {
		return '';
	}

	private _makePropsProxy(props: any) {
		// eslint-disable-next-line @typescript-eslint/no-this-alias
		const self = this;

		return new Proxy(props, {
			get(target, prop) {
				const value = target[prop];
				return typeof value === 'function' ? value.bind(target) : value;
			},
			set(target, prop, value) {
				target[prop] = value;
				self.eventBus().emit(Block.EVENTS.FLOW_CDU);
				return true;
			},
			deleteProperty() {
				throw new Error('Отказано в доступе');
			},
		}) as any
	}

	private _createDocumentElement(tagName: any) {
		return document.createElement(tagName);
	}

	public show() {
		this._element.style.display = 'block';
	}
	
	public hide() {
		this._element.style.display = 'none';
	}

	private _addEvents() {
		const {events = {}} = this.props;
		
		Object.keys(events).forEach(eventName => {
			this._element.addEventListener(eventName, events[eventName]);
		});
		
	}

	private _removeEvents() {
		const {events = {}} = this.props;

		Object.keys(events).forEach(eventName => {
			this._element.removeEventListener(eventName, events[eventName]);
		});
	}

	public setProps = (nextProps: any) => {
		if (!nextProps) {
			return;
		}
	
		Object.assign(this.props, nextProps);
	};

	public setState = (nextState: any) => {
		if (!nextState) {
			return;
		}
	
		Object.assign(this.state, nextState);
	};
}