import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import Reducers from './../../reducers/Category'
import CategoryContainer from './../../containers/category/Category'
import { fetchPageNum } from './../../actions/Category'

class CategoryModule extends Component {

	constructor (props) {

		super(props)

		const loggerMiddleware = createLogger()
		
		this.store = createStore(Reducers, {}, applyMiddleware(thunkMiddleware, loggerMiddleware))

		this.store.dispatch(fetchPageNum())
	}

	render () {

		return (

			<Provider store={this.store}>
				<CategoryContainer/>
			</Provider>
		)
	}
}

export default CategoryModule