import React from 'react'
import { connect } from 'react-redux'
import { fetchImages } from '../../actions/file_actions'


//This is purely an example of how you would go about grabbing assets, not actually how we're
//going to end up displaying images
export const Files = (props) => {
    return (
        <div>
            
        </div>
    )
}

const mapStateToProps = (state) => ({
    images: Object.values(state.images)
})

const mapDispatchToProps = dispatch => ({
    fetchImages: () => dispatch(fetchImages())
})

export default connect(mapStateToProps, mapDispatchToProps)(Files)
