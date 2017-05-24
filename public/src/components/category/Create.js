import React from 'react'
import { Field, reduxForm } from 'redux-form'
import SlippyPane from './../../third-party/slippypane/build/slippypane.min'

const validate = (values) => {

	const errors = {}

	if (!values.text) {

		errors.text = 'Required'
	}

	return errors
}

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => {

	return (<div className={"form-group" + ((touched && error) ? " has-error" : "")}>
		<input type={type} {...input} className="form-control" placeholder={label}/>
		{touched && (error && <div className="alert alert-danger">{error}</div>)}
	</div>)
}

const Create = (props) => {

	const { handleSubmit, pristine, reset, submitting } = props

	return (<div>
		<div className="view-topbar">
			<div className="row">
				<div className="col-xs-8">
					<span className="head">Создание/изменение</span>
				</div>
				<div className="col-xs-4">
					<a href="/" className="topbar-icon icon-arrow" onClick={(e) => { e.preventDefault(); SlippyPane('#form').close() }}></a>
				</div>
			</div>
		</div>
		<div className="component-tabs">
			<ul className="nav nav-tabs nav-justified">
				<li className="active">
					<a href="#create-main" data-toggle="tab">Основное</a>
				</li>
				<li>
					<a href="#create-images" data-toggle="tab">Изображения</a>
				</li>
				<li>
					<a href="#create-meta" data-toggle="tab">Meta</a>
				</li>
			</ul>
			<div className="tab-content">
				<div role="tabpanel" className="tab-pane fade in active" id="create-main">
					<div className="form">
						<form onSubmit={handleSubmit(props.onCreateSubmit)}>
							<Field component={renderField} type="text" name="text" label="Текст"/>
							<Field component={renderField} type="text" name="textAdd" label="Еще текст"/>
							<button type="submit" className="btn btn-primary" disabled={submitting}>Сохранение</button>
							<button type="button" className="btn btn-default" disabled={submitting} onClick={reset}>Сброс</button>
						</form>
					</div>
				</div>
				<div role="tabpanel" className="tab-pane fade" id="create-images">
					<div className="form">
						Изображения
					</div>
				</div>
				<div role="tabpanel" className="tab-pane fade" id="create-meta">
					<div className="form">
						Meta
					</div>
				</div>
			</div>
		</div>
	</div>)
}

export default reduxForm({

	form: 'create',
	validate

}) (Create)