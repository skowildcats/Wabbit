import * as FileUtil from '../util/file_util'

export const RECEIVE_IMAGES = "RECEIVE_IMAGES"

export const receiveImages = (imgs) => ({
    type: RECEIVE_IMAGES,
    imgs
})

export const fetchImages = () => dispatch => {
    console.log("Fetching images")
    return (
    FileUtil.fetchFiles().then((files) => (
        dispatch(receiveImages(files))
    ))
)}