import { connect } from 'react-redux'
import { initialize } from 'redux-form'
import { fetchPagePer, fetchSortOrder, fetchListRemove, panelOpen } from './../../actions/Category'
import SlippyPane from './../../third-party/slippypane/build/slippypane.min'
import Topbar from './../../components/category/Topbar'

const mapStateToProps = (state) => {

	return {

		crumb: state.crumb,
		page_per: state.page.per,
		sort_order: state.sort.order,
		filter: state.filter
	}
}

const mapDispatchToProps = (dispatch) => {

	return {

		onCreateClick: () => {

			dispatch(initialize('create', {}, false))
			SlippyPane('#form').open({ 

				side: 'r', 
				index: 1 
			})
		},
		onPagePerClick: (per) => {

			dispatch(fetchPagePer(per))
		},
		onSortOrderClick: (order) => {

			dispatch(fetchSortOrder(order))
		},
		onRemoveClick: () => {

			dispatch(fetchListRemove())
		}
	}
}

const TopbarContainer = connect(

	mapStateToProps,
	mapDispatchToProps

) (Topbar)

export default TopbarContainer