function get_blog_img_index(blog_id, imgs_length) {
    let index = null
    if (blog_id < imgs_length) {
        index = blog_id
    } else {
        index = blog_id % imgs_length
    }
    return index
}


function globalReducer(state, payload) {
    switch (payload.type) {
        case "increment":
            return { ...state, count: state.count + 1 }
        default:
            return state
    }
}

export {
    globalReducer,
    get_blog_img_index
}