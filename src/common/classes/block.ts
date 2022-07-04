import EventBus from './event-bus';
import Handlebars from 'handlebars';

export default class Block {
	static EVENTS = {
		INIT: "init",
		FLOW_CDM: "flow:component-did-mount",
		FLOW_CDU: "flow:component-did-update",
		FLOW_RENDER: "flow:render"
	};

	private _element: HTMLElement;
	private _meta: any;

	public eventBus;
	public props;

	constructor(tagName = "div", props = {}) {
		const eventBus = new EventBus();
		this._meta = {
			tagName,
			props
		}

		this.props = this._makePropsProxy(props);

    	this.eventBus = () => eventBus;

		this._registerEvents(eventBus);
		eventBus.emit(Block.EVENTS.INIT);
	}

	private _registerEvents(eventBus) {
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

	private _componentDidMount(props) {
		this.componentDidMount(props);
	}

	public componentDidMount(props) {}

	public dispatchComponentDidMount() {
		this.eventBus().emit(Block.EVENTS.FLOW_CDM);
	}
  
	private _componentDidUpdate(oldProps, newProps) {
	  const response = this.componentDidUpdate(oldProps, newProps);
	}
  
	  // Может переопределять пользователь, необязательно трогать
	public componentDidUpdate(oldProps, newProps) {
	  return true;
	}

	public setProps = nextProps => {
		if (!nextProps) {
		  return;
		}
	
		Object.assign(this.props, nextProps);
		this.eventBus().emit(Block.EVENTS.FLOW_CDU);
	};

	public get element() {
		return this._element;
	}

	private _render() {
		const block = this.render();
		const compiled = Handlebars.compile(block);
		this._element.innerHTML = compiled({...this.props});
	}
	
	public render() {
		return '';
	}

	private _makePropsProxy(props) {
		const self = this;
		
		return new Proxy(props, {
			get(target, prop) {
				const value = target[prop];
				return typeof value === "function" ? value.bind(target) : value;
			},
			set(target, prop, value) {
				target[prop] = value;
				self.eventBus().emit(Block.EVENTS.FLOW_RENDER);
				return true;
			},
			deleteProperty() {
				throw new Error('Отказано в доступе');
			},
		});
	}

	private _createDocumentElement(tagName) {
		return document.createElement(tagName);
	}

	public show() {
		this._element.style.display = "block";
	}
	
	public hide() {
		this._element.style.display = "none";
	}
}