import { connect } from 'react-redux'
import Category from './../../components/category/Category'
import { fetchFilterOption, fetchListStore } from './../../actions/Category'

const mapStateToProps = (state) => {

	return {

		load: state.load
	}
}

const mapDispatchToProps = (dispatch) => {

	return {

		onSearchSubmit: (fields) => {

			dispatch(fetchFilterOption(fields))
		},
		onCreateSubmit: (fields) => {

			return dispatch(fetchListStore(fields))	
		}
	}
}

const CategoryContainer = connect(

	mapStateToProps,
	mapDispatchToProps

) (Category)

export default CategoryContainer