const METHODS = {
	GET: 'GET',
	PUT: 'PUT',
	POST: 'POST',
	DELETE: 'DELETE'
};

const queryStringify = (data: any) => {
	let str='?';
	str += Object.entries(data)
		.map(entry => `${entry[0]}=${(entry[1] as any).toString()}`)
		.join('&');
	return str;
}

class HTTPTransport {
	get = (url: string, options: any) => {
		return this.request(url, {...options, method: METHODS.GET}, options.timeout);
	};
  
	put = (url: string, options: any) => {
		return this.request(url, {...options, method: METHODS.PUT}, options.timeout);
	};
  
	post = (url: string, options: any) => {
		return this.request(url, {...options, method: METHODS.POST}, options.timeout);
	};
  
	delete = (url: string, options: any) => {
		return this.request(url, {...options, method: METHODS.DELETE}, options.timeout);
	};

	// PUT, POST, DELETE

	// options:
	// headers — obj
	// data — obj
	request = (url: string, options: any, timeout = 5000) => {
		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();
			if (options.method === METHODS.GET && options.data) {
				url += `${queryStringify(options.data)}`
			}
			xhr.open(options.method, url);
			xhr.timeout = timeout;
      
			if (options.headers) {
				Object.entries(options.headers).forEach((value) => {
					xhr.setRequestHeader(value[0], value[1] as string);
				})
			}
      
			xhr.onload = function() {
				resolve(xhr);
			};
      
			xhr.onabort = reject;
			xhr.onerror = reject;
			xhr.ontimeout = reject;
      
			if (options.method === METHODS.GET || !options.data) {
				xhr.send();
			} else if (options.data) {
				xhr.send(options.data);
			}
		})
	};
}