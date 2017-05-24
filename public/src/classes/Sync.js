import 'whatwg-fetch'

class Sync {

	static sync (method = null, { url, params = {} }, data = {}) {

		let _url = url

		let id = data.id || null 

		if (id) {

			_url = [_url, id].join('/')
		}

		_url = Sync._prepare(new URL(_url), params)

		let _options = {}

		if (method) {

			_options = {

				method,
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ data })
			}
		}

		return fetch(_url, _options).then((response) => {

			return response.json().then((json) => {

				if ((response.status >= 200) 
					&& (response.status < 300)) {

					return new Promise((resolve) => { 

						return resolve(json) 
					})
				} 

				return new Promise((resolve, reject) => { 

					return reject({

						error: { 

							status: response.status, 
							text: response.statusText 
						}, 
						json
					})
				})
			})
		})
	}

	static _prepare (url, params) {

		Object.keys(params).forEach((element, index, list) => {

			if (typeof params[element] === 'object') {

				Sync._prepare(url, Sync._prepareObject(element, params[element]))

			} else {

				url.searchParams.append(element, params[element])
			}
		})

		return url
	}

	static _prepareObject(prefix, object) {

		let params = Object.keys(object).reduce((previous, current, index, array) => {

			// i'm disappointed :)

			previous[[prefix, current].join('_')] = object[current]

			return previous

		}, {})

		return params
	}
}

class Model {

	static read ({ url, params }, { id }) {

		return Sync.sync(null, { url }, { id })
	}

	static save ({ url, params }, data) {

		let id = data.id || null

		if (id) {

			return Model._update({ url }, data)
		}

		return Model._create({ url, params }, data)
	}

	static _create ({ url, params }, data) {

		return Sync.sync('POST', { url, params }, data)
	}

	static _update ({ url, params }, data) {

		return Sync.sync('PUT', { url, params }, data)
	}

	static destroy ({ url, params }, { id }) {

		return 
	}
}

class Collection {

	static read ({ url, params }) {

		return Sync.sync(null, { url, params })	
	}

	static swap ({ url, params }) {

		return Sync.sync('POST', { url, params })
	}

	static destroy ({ url, params }, id = []) {

		return Sync.sync('DELETE', { url, params }, { check: id })
	}
}

export { Model, Collection }