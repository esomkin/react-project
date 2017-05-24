import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import SideNav from './sidenav/SideNav'
import Category from './category'
import Material from './material/Material'
import NotFound from './notfound/NotFound'
import 'whatwg-fetch'
import jQuery from 'jquery'
import 'bootstrap/dist/js/bootstrap.min'

class Application extends Component {

	constructor (props) {

		super(props)

		this.state = {

			sidenav: []
		}
	}

	componentDidMount () {

		fetch('nav.json')
			.then((response) => {

				return response.json()

			}).then((json) => {

				this.setState({

					sidenav: json
				})

			}).catch((error) => {

				console.log('Parsing failed', error)
			})
	}

	render () {

		return (<main>
	<div id="main" className="slippy-pane">
		<aside className="slippy-l">
			<div className="view-topbar">
				<div className="logo">
					<a href="/">Minimal</a>
				</div>
			</div>
			<SideNav data={this.state.sidenav}/>
		</aside>
		<aside className="slippy-r"></aside>
	</div>
	<Switch>
		<Route path="/category" component={Category}/>
		<Route path="/material" component={Material}/>
		<Route component={NotFound}/>
	</Switch>
</main>)
	}
}

export default Application