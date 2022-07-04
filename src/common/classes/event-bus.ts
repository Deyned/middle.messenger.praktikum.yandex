export default class EventBus {
	private _listeners: any;

	constructor() {
		this._listeners = {};
	}

	public on(event: string, callback: () => {}) {
		if(!this._listeners[event]) {
			this._listeners[event] = [];
		}
		
		this._listeners[event].push(callback);
	}

	public off(event: string, callback: () => {}) {
		if(!this._listeners[event]) {
			throw new Error(`Нет события: ${event}`);
		}
		
		this._listeners[event] = this._listeners[event].filter(listener => listener !== callback);
	}

	public emit(event: string, ...args) {
		if(!this._listeners[event]) {
			throw new Error(`Нет события: ${event}`);
		}
		
		this._listeners[event].forEach(listener => {
			listener(...args)
		})
	}
}