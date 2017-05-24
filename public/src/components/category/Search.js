import React from 'react'
import { Field, reduxForm } from 'redux-form'
import SlippyPane from './../../third-party/slippypane/build/slippypane.min'

const Search = (props) => {

	const { handleSubmit, pristine, reset, submitting } = props

	return (<div>
		<div className="view-topbar">
			<div className="row">
				<div className="col-xs-8">
					<span className="head">Поиск</span>
				</div>
				<div className="col-xs-4">
					<a href="/" className="topbar-icon icon-arrow" onClick={(e) => { e.preventDefault(); SlippyPane('#form').close() }}></a>
				</div>
			</div>
		</div>
		<div className="component-tabs">
			<ul className="nav nav-tabs nav-justified">
				<li className="active">
					<a href="#search-main" data-toggle="tab">Опции поиска</a>
				</li>
			</ul>
			<div className="tab-content">
				<div role="tabpanel" className="tab-pane fade in active" id="search-main">
					<div className="form">
						<form onSubmit={handleSubmit}>
							<div className="form-group">
								<Field component="input" type="text" name="text" className="form-control" placeholder="Текст"/>
							</div>
							<button type="submit" className="btn btn-primary" disabled={submitting}>Поиск</button>
							<button type="button" className="btn btn-default" disabled={submitting} onClick={reset}>Сброс</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>)
}

export default reduxForm({

	form: 'search'

}) (Search)