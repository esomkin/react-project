import { connect } from 'react-redux'
import Page from './../../components/category/Page'
import { fetchPageNum } from './../../actions/Category'

const mapStateToProps = (state) => {

	return {

		page_num: state.page.num,
		page_per: state.page.per,
		list_count: state.list.count
	}
}

const mapDispatchToProps = (dispatch) => {

	return {

		onPageNumClick: () => {

			dispatch(fetchPageNum())
		}
	}
}

const PageContainer = connect(

	mapStateToProps,
	mapDispatchToProps

) (Page)

export default PageContainer