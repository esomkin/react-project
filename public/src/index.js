import './index.css'

import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'
import Application from './components/Application'

const history = createBrowserHistory()

render(<Router history={history}>
	<Application/>
</Router>, document.getElementById('root'))