function globalReducer(state, payload) {
    switch (payload.type) {
        case "text":
            return { ...state, text: payload.value }
        case "range":
            return { ...state, range: payload.value }
        default:
            return state
    }
}


export {
    globalReducer
}