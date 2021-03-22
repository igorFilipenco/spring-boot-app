import $ from "jquery";


export function buildUrl( url, path, parameters = undefined, raw = false, method = false ){
	let params = {};

	if (parameters) {
		params['params'] = parameters;
	}

	if (raw) {
		params['raw'] = true;
	}

	switch (method) {
		case 'POST':
		case 'PUT' :
		case 'DELETE' :
			params['method'] = method;
			break;
		default:
			params['method'] = 'GET';
	}

	return url + "?" + $.param(params);
}
