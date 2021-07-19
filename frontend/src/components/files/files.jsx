import React, {useEffect} from 'react'
import { connect } from 'react-redux'
import { fetchImages } from '../../actions/file_actions'

//This is purely an example of how you would go about grabbing assets, not actually how we're
//going to end up displaying images
export const Files = (props) => {

    useEffect(() => {
        props.fetchImages()
    }, [])
    if(!props.images.data) return null;

    const images = props.images.data.map(img => {
        return <img src={`/api/files/image/${img.filename}`} alt="" />
    })
    return (
        <div>
            {images}
        </div>
    )
}

const mapStateToProps = (state) => ({
    images: state.files
})

const mapDispatchToProps = dispatch => ({
    fetchImages: () => dispatch(fetchImages())
})

export default connect(mapStateToProps, mapDispatchToProps)(Files)
