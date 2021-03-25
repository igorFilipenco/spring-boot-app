

/**
 * Get parameter from router object
 * @return boolean|string
 */
export function getParameterIfExistsInUrl(routerObject, parameterName) {
	if (
		routerObject.hasOwnProperty('match')
		&& typeof routerObject.match !== 'undefined'
		&& routerObject.match.hasOwnProperty('params')
		&& typeof routerObject.match.params !== 'undefined'
		&& routerObject.match.params.hasOwnProperty(parameterName)
	) {
		return routerObject.match.params[parameterName];
	}

	return false;
}

/**
 * Check if routes are equal
 * @param routerObject
 * @param data
 * @return {*}
 */
export function routeMatch(routerObject, data) {
	if (
		routerObject
		&& routerObject.match
		&& routerObject.match.path
	) {
		let currentPath = routerObject.match.path;

		if (Array.isArray(data)) {
			return data.includes(currentPath);
		}

		return currentPath === data;
	}

	return false;
}

/**
 * Compare two url
 * @return boolean
 */
export function compareUrl(routerObject, url, equal = false) {
	if (typeof url === 'string') {
		return (
			routerObject.hasOwnProperty('match')
			&& typeof routerObject.match !== 'undefined'
			&& routerObject.match.hasOwnProperty('url')
			&& (equal ? routerObject.match.url === url : routerObject.match.url !== url)
		);
	}

	return (
		routerObject.hasOwnProperty('match')
		&& typeof routerObject.match !== 'undefined'
		&& routerObject.match.hasOwnProperty('url')
		&& url.hasOwnProperty('match')
		&& typeof url.match !== 'undefined'
		&& url.match.hasOwnProperty('url')
		&& (equal ? routerObject.match.url === url.match.url : routerObject.match.url !== url.match.url)
	);
}
